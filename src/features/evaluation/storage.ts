import type { EvaluationSnapshot } from '../../data';
import { createInitialSnapshot } from './integrity';

const LEGACY_STORAGE_KEY = 'evaluacion-modulo2-infotec-v1';
const STORAGE_KEY = 'evaluacion-modulo2-infotec-secure-v2';
const SECURITY_DB_NAME = 'evaluacion-modulo2-infotec-security';

function clearLocalKeys() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  window.localStorage.removeItem(STORAGE_KEY);
}

function deleteSecurityDatabase() {
  return new Promise<void>((resolve) => {
    if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
      resolve();
      return;
    }

    const request = indexedDB.deleteDatabase(SECURITY_DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
    request.onblocked = () => resolve();
  });
}

export async function loadSnapshot(): Promise<EvaluationSnapshot> {
  clearLocalKeys();
  await deleteSecurityDatabase();
  return createInitialSnapshot();
}

export async function saveSnapshot(_snapshot: EvaluationSnapshot) {
  return;
}
