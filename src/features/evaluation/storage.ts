import type { EvaluationSnapshot } from '../../data';
import {
  createInitialSnapshot,
  createLockedSnapshot,
  DEFAULT_THEME_MODE,
  INTEGRITY_MESSAGES,
  normalizeSnapshot,
  stableStringify
} from './integrity';

const LEGACY_STORAGE_KEY = 'evaluacion-modulo2-infotec-v1';
const STORAGE_KEY = 'evaluacion-modulo2-infotec-secure-v2';
const SECURITY_DB_NAME = 'evaluacion-modulo2-infotec-security';
const SECURITY_STORE_NAME = 'records';
const KEY_RECORD_ID = 'hmac-key';
const META_RECORD_ID = 'meta';

interface StorageEnvelope {
  version: '2';
  snapshot: EvaluationSnapshot;
  signature: string;
}

interface SecurityMeta {
  id: typeof META_RECORD_ID;
  currentSequence: number;
  locked: boolean;
  lockReason: string | null;
}

function supportsSecureStorage() {
  return typeof window !== 'undefined' && typeof indexedDB !== 'undefined' && !!crypto?.subtle;
}

function createMeta(): SecurityMeta {
  return {
    id: META_RECORD_ID,
    currentSequence: 0,
    locked: false,
    lockReason: null
  };
}

function requestToPromise<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('No fue posible leer IndexedDB.'));
  });
}

function transactionDone(transaction: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error('No fue posible completar la transacción.'));
    transaction.onabort = () => reject(transaction.error ?? new Error('La transacción fue cancelada.'));
  });
}

async function openSecurityDb() {
  return await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(SECURITY_DB_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(SECURITY_STORE_NAME)) {
        database.createObjectStore(SECURITY_STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('No fue posible abrir IndexedDB.'));
  });
}

async function getRecord<T>(database: IDBDatabase, key: string) {
  const transaction = database.transaction(SECURITY_STORE_NAME, 'readonly');
  const store = transaction.objectStore(SECURITY_STORE_NAME);
  const result = await requestToPromise<T | undefined>(store.get(key));
  await transactionDone(transaction);
  return result;
}

async function putRecord(database: IDBDatabase, key: string, value: unknown) {
  const transaction = database.transaction(SECURITY_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(SECURITY_STORE_NAME);
  store.put(value, key);
  await transactionDone(transaction);
}

async function getMeta(database: IDBDatabase) {
  return (await getRecord<SecurityMeta>(database, META_RECORD_ID)) ?? createMeta();
}

async function saveMeta(database: IDBDatabase, meta: SecurityMeta) {
  await putRecord(database, META_RECORD_ID, meta);
}

async function getOrCreateSigningKey(database: IDBDatabase) {
  const storedKey = await getRecord<CryptoKey>(database, KEY_RECORD_ID);

  if (storedKey) {
    return storedKey;
  }

  const key = await crypto.subtle.generateKey({ name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
  await putRecord(database, KEY_RECORD_ID, key);
  return key;
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = '';

  for (const value of bytes) {
    binary += String.fromCharCode(value);
  }

  return btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function signSnapshot(key: CryptoKey, snapshot: EvaluationSnapshot) {
  const encoded = new TextEncoder().encode(stableStringify(snapshot));
  const signature = await crypto.subtle.sign('HMAC', key, encoded);
  return bytesToBase64(new Uint8Array(signature));
}

async function verifySnapshot(key: CryptoKey, snapshot: EvaluationSnapshot, signature: string) {
  try {
    const encoded = new TextEncoder().encode(stableStringify(snapshot));
    return await crypto.subtle.verify('HMAC', key, base64ToBytes(signature), encoded);
  } catch {
    return false;
  }
}

async function saveEnvelope(snapshot: EvaluationSnapshot, key: CryptoKey) {
  const envelope: StorageEnvelope = {
    version: '2',
    snapshot,
    signature: await signSnapshot(key, snapshot)
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
  window.localStorage.removeItem(LEGACY_STORAGE_KEY);
}

async function persistLockedSnapshot(
  database: IDBDatabase,
  key: CryptoKey,
  meta: SecurityMeta,
  themeMode: EvaluationSnapshot['themeMode'],
  message: string
) {
  const lockedSnapshot = createLockedSnapshot(themeMode, message, meta.currentSequence);
  meta.locked = true;
  meta.lockReason = message;
  await saveMeta(database, meta);
  await saveEnvelope(lockedSnapshot, key);
  return lockedSnapshot;
}

function parseEnvelope(raw: string): StorageEnvelope | null {
  try {
    const parsed = JSON.parse(raw) as Partial<StorageEnvelope>;

    if (parsed.version !== '2' || typeof parsed.signature !== 'string') {
      return null;
    }

    const snapshot = normalizeSnapshot(parsed.snapshot ?? null);

    if (!snapshot) {
      return null;
    }

    return {
      version: '2',
      snapshot,
      signature: parsed.signature
    };
  } catch {
    return null;
  }
}

function parseLegacySnapshot(raw: string) {
  try {
    const parsed = JSON.parse(raw) as Partial<EvaluationSnapshot>;
    return normalizeSnapshot(parsed);
  } catch {
    return null;
  }
}

export async function loadSnapshot(): Promise<EvaluationSnapshot> {
  if (typeof window === 'undefined') {
    return createInitialSnapshot();
  }

  if (!supportsSecureStorage()) {
    return createLockedSnapshot(DEFAULT_THEME_MODE, INTEGRITY_MESSAGES.unsupported);
  }

  const database = await openSecurityDb();
  const key = await getOrCreateSigningKey(database);
  const meta = await getMeta(database);
  const rawEnvelope = window.localStorage.getItem(STORAGE_KEY);

  if (rawEnvelope) {
    const envelope = parseEnvelope(rawEnvelope);

    if (!envelope) {
      return await persistLockedSnapshot(
        database,
        key,
        meta,
        DEFAULT_THEME_MODE,
        INTEGRITY_MESSAGES.invalidSignature
      );
    }

    if (!(await verifySnapshot(key, envelope.snapshot, envelope.signature))) {
      return await persistLockedSnapshot(
        database,
        key,
        meta,
        envelope.snapshot.themeMode,
        INTEGRITY_MESSAGES.invalidSignature
      );
    }

    if (meta.locked) {
      return await persistLockedSnapshot(
        database,
        key,
        meta,
        envelope.snapshot.themeMode,
        meta.lockReason ?? INTEGRITY_MESSAGES.invalidSignature
      );
    }

    if (envelope.snapshot.sequence < meta.currentSequence) {
      return await persistLockedSnapshot(database, key, meta, envelope.snapshot.themeMode, INTEGRITY_MESSAGES.rollback);
    }

    if (envelope.snapshot.sequence > meta.currentSequence) {
      meta.currentSequence = envelope.snapshot.sequence;
      await saveMeta(database, meta);
    }

    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    return envelope.snapshot;
  }

  const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);

  if (legacyRaw) {
    const migrated = parseLegacySnapshot(legacyRaw);

    if (!migrated || meta.locked) {
      return await persistLockedSnapshot(
        database,
        key,
        meta,
        migrated?.themeMode ?? DEFAULT_THEME_MODE,
        meta.lockReason ?? INTEGRITY_MESSAGES.invalidSignature
      );
    }

    meta.currentSequence = Math.max(meta.currentSequence, migrated.sequence);
    await saveMeta(database, meta);
    await saveEnvelope(migrated, key);
    return migrated;
  }

  if (meta.locked || meta.currentSequence > 0) {
    return await persistLockedSnapshot(
      database,
      key,
      meta,
      DEFAULT_THEME_MODE,
      meta.lockReason ?? INTEGRITY_MESSAGES.resetDetected
    );
  }

  const snapshot = createInitialSnapshot();
  await saveMeta(database, meta);
  await saveEnvelope(snapshot, key);
  return snapshot;
}

export async function saveSnapshot(snapshot: EvaluationSnapshot) {
  if (typeof window === 'undefined' || !supportsSecureStorage()) {
    return;
  }

  const database = await openSecurityDb();
  const key = await getOrCreateSigningKey(database);
  const meta = await getMeta(database);

  const normalized = normalizeSnapshot(snapshot, snapshot.themeMode);

  if (!normalized) {
    await persistLockedSnapshot(database, key, meta, DEFAULT_THEME_MODE, INTEGRITY_MESSAGES.invalidSignature);
    return;
  }

  let nextSnapshot = normalized;

  if (meta.locked && nextSnapshot.integrityStatus !== 'locked') {
    nextSnapshot = createLockedSnapshot(
      nextSnapshot.themeMode,
      meta.lockReason ?? INTEGRITY_MESSAGES.invalidSignature,
      meta.currentSequence
    );
  } else if (nextSnapshot.sequence < meta.currentSequence) {
    nextSnapshot = createLockedSnapshot(nextSnapshot.themeMode, INTEGRITY_MESSAGES.rollback, meta.currentSequence);
  }

  if (nextSnapshot.integrityStatus === 'locked') {
    meta.locked = true;
    meta.lockReason = nextSnapshot.integrityMessage ?? INTEGRITY_MESSAGES.invalidSignature;
  }

  meta.currentSequence = Math.max(meta.currentSequence, nextSnapshot.sequence);
  await saveMeta(database, meta);
  await saveEnvelope(nextSnapshot, key);
}
