# Evaluación final del módulo 2

Aplicación web para la evaluación final del módulo «Economía Digital y Mercados Emergentes» del Diplomado en Gobernanza de las Telecomunicaciones de INFOTEC.

## Requisitos

- Node.js 24 o superior
- `pnpm` disponible por `corepack`

## Ejecución local

```bash
corepack pnpm install --node-linker=hoisted --store-dir C:\codex-pnpm-store
corepack pnpm dev
```

La app queda disponible en la URL que reporte Vite, normalmente `http://localhost:5173`.

## Scripts útiles

```bash
corepack pnpm dev
corepack pnpm build
corepack pnpm test
corepack pnpm preview
```

## Qué incluye

- 100 ejercicios exactos: `25` de relación, `50` de opción múltiple y `25` de verdadero o falso
- Progreso persistente en navegador
- Modo claro y modo oscuro persistentes
- Calificación basada en primer intento menos errores acumulados
- Evidencia final descargable en PNG con logo INFOTEC

## Endurecimiento local

Esta versión sigue siendo cliente puro, sin backend, así que no puede ofrecer seguridad absoluta. Aun así, sí endurece la evaluación frente a manipulación común del navegador:

- Firma el estado local con `Web Crypto` mediante una clave no exportable guardada en `IndexedDB`
- Verifica integridad antes de permitir continuar
- Detecta restauraciones de progreso anterior con control anti-rollback por secuencia
- Detecta borrado del progreso después de haber iniciado la evaluación
- Bloquea la sesión si encuentra alteración o reinicio fuera del flujo normal

## Límite importante

Si una persona borra por completo todos los datos del sitio en el navegador o usa técnicas avanzadas fuera del alcance de una app estática, no hay manera de impedirlo por completo sin un backend o validación del lado servidor. Esta implementación está pensada para elevar la dificultad de manipulación en uso real local, no para afirmar seguridad total.
