# Actividad de apoyo y repaso del Módulo 2

Aplicación web de apoyo y repaso para el módulo «Economía Digital y Mercados Emergentes» del Diplomado en Gobernanza de las Telecomunicaciones de INFOTEC.

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
- Indicador de desempeño basado en primer intento menos errores acumulados
- Reporte de práctica descargable en PNG con logo INFOTEC
- Enfoque de apoyo, práctica y preparación para la actividad práctica del módulo

## Resguardo local

Esta versión sigue siendo cliente puro, sin backend, así que no puede ofrecer seguridad absoluta. Aun así, sí protege la continuidad del avance frente a manipulación común del navegador:

- Firma el estado local con `Web Crypto` mediante una clave no exportable guardada en `IndexedDB`
- Verifica integridad antes de permitir continuar
- Detecta restauraciones de progreso anterior con control anti-rollback por secuencia
- Detecta borrado del progreso después de haber iniciado la actividad
- Bloquea la sesión si encuentra alteración o reinicio fuera del flujo normal

## Límite importante

Si una persona borra por completo todos los datos del sitio en el navegador o usa técnicas avanzadas fuera del alcance de una app estática, no hay manera de impedirlo por completo sin un backend o validación del lado servidor. Esta implementación está pensada para elevar la dificultad de alteración en uso real local, no para afirmar seguridad total.
