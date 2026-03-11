# Guia rapida para GitHub y Vercel

## Que se sube al repositorio

Sube el codigo fuente de la aplicacion. No subas carpetas generadas ni archivos de apoyo local. El archivo `.gitignore` ya excluye lo que no hace falta.

## Paso 1. Crear el repositorio en GitHub

1. Entra a GitHub.
2. Haz clic en `New repository`.
3. Usa un nombre como `evaluacion-modulo-2-infotec`.
4. Crealo vacio, sin `README`, sin `.gitignore` y sin licencia.

## Paso 2. Conectar este proyecto con GitHub

Ejecuta estos comandos dentro de la carpeta del proyecto:

```powershell
git init -b main
git add .
git commit -m "Version lista para GitHub y Vercel"
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

Si Git te pide nombre o correo, configura primero:

```powershell
git config --global user.name "Tu nombre"
git config --global user.email "tu_correo@ejemplo.com"
```

## Paso 3. Desplegar en Vercel

1. Entra a `https://vercel.com/`.
2. Inicia sesion con tu cuenta de GitHub.
3. Elige `Add New` y luego `Project`.
4. Importa el repositorio.
5. Verifica esta configuracion:

```text
Framework Preset: Vite
Build Command: pnpm build
Output Directory: dist
```

6. Haz clic en `Deploy`.

Vercel detecta `pnpm-lock.yaml`, asi que debe instalar dependencias con `pnpm`.

## Paso 4. Que compartir con INFOTEC

Conviene compartir estas cuatro cosas:

1. Liga publica de Vercel para revision.
2. Liga del repositorio en GitHub para revision del codigo.
3. ZIP del codigo fuente limpio.
4. ZIP de la carpeta `dist` si la plataforma institucional acepta sitios estaticos.

## Nota importante sobre la informacion generada

El avance, la calificacion y el progreso de la evaluacion se guardan en el navegador de cada persona. Esos datos no se incluyen solos dentro del repositorio ni del ZIP del proyecto.

La evidencia final en PNG si se puede descargar y compartir por separado.
