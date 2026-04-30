# Clic Pilates Landing

## Descripción general

Este proyecto es el sitio web de **Clic Pilates**, una cadena de estudios de Pilates ubicados en Buenos Aires, Argentina. Es una aplicación web estática y de marketing construida con Next.js 15, React 19 y TypeScript.

El sitio consiste en:

- Una **landing page principal** (`/`) con múltiples secciones animadas (Hero, Quienes Somos, Niveles, Franquicias, Sucursales, etc.).
- **Páginas de sede** (`/sede/[slug]`) que muestran información y grilla horaria de cada ubicación.
- **Páginas de horarios** (`/horarios/[sede]`) que renderizan tablas de horarios obtenidas desde Google Sheets vía SteinHQ.
- Un **endpoint de API** (`/api/send-email`) para enviar consultas de franquicias por email usando Resend.

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 15.2.6 | Framework principal (App Router) |
| React | 19 | UI library |
| TypeScript | 5 | Tipado estático (strict mode) |
| Tailwind CSS | 4 | Estilos y diseño responsive |
| shadcn/ui | - | Componentes de UI base (Button, Dialog, Form, Input, Select, etc.) |
| Framer Motion | 12 | Animaciones y parallax |
| Lenis | 1.2.3 | Smooth scrolling (solo en home) |
| Blaze Slider | 1.9.3 | Carruseles de imágenes |
| react-hook-form | 7.54.2 | Manejo de formularios |
| Zod | 3.24.2 | Validación de esquemas |
| Resend | 4.1.2 | Envío de emails transaccionales |
| Lucide React | 0.477.0 | Iconografía |

## Estructura del proyecto

```
src/
├── app/
│   ├── api/send-email/route.ts   # API route para enviar emails de franquicias
│   ├── horarios/[sede]/page.tsx  # Página pública de horarios por sede
│   ├── sede/[slug]/page.tsx      # Página pública de detalle de sede
│   ├── globals.css               # Tailwind CSS v4 + variables del tema
│   ├── layout.tsx                # Root layout (metadata, fuente Poppins, Toaster)
│   ├── not-found.tsx             # Página 404 personalizada
│   └── page.tsx                  # Entry point de la landing page
├── components/
│   ├── ui/                       # Componentes de shadcn/ui
│   ├── magicui/                  # Efectos visuales reutilizables (marquee, text-animate)
│   ├── motion-primitives/        # Componentes de animación (text-shimmer-wave, progressive-blur)
│   ├── EnsurePageScroll.tsx      # Restaura scroll en subpáginas fuera del home
│   └── HorariosTable.tsx         # Tabla de horarios reutilizable
├── features/landing-page/
│   ├── LandingPage.tsx           # Orquestador de la landing page
│   └── components/               # Secciones de la landing page
│       ├── Hero.tsx
│       ├── NavBar/
│       ├── locations/
│       ├── franquicias/
│       ├── InstagramFeed/
│       └── ...
└── lib/
    ├── utils.ts                  # Utilidad `cn()` para clases de Tailwind
    ├── locations.ts              # Datos estáticos de sedes + helpers
    └── stein.ts                  # Cliente de SteinHQ + parser de horarios
```

### Convenciones de organización

- **`src/app/`**: Contiene solo layouts, páginas, estilos globales y API routes. La lógica de presentación vive en `features/`.
- **`src/components/ui/`**: Componentes generados por shadcn/ui. No deben modificarse manualmente salvo para ajustes menores.
- **`src/features/landing-page/`**: Cada sección de la landing page es un componente independiente. Los componentes se importan dinámicamente en `LandingPage.tsx` para facilitar el code splitting.
- **`src/lib/`**: Utilidades compartidas y datos estáticos. No contiene componentes React.

## Comandos de desarrollo

```bash
# Servidor de desarrollo (puerto 3000)
npm run dev

# Build de producción
npm run build

# Iniciar en producción (requiere build previo)
npm run start

# Linting con ts-standard
npm run lint

# Autofix de linting
npm run lint:fix
```

## Guía de estilo de código

### Linter y formateo

- Se usa **ts-standard** como linter y formateador (extiende `next/core-web-vitals`).
- Configuración en `package.json` bajo la clave `ts-standard`.
- Archivos ignorados por el linter: `node_modules/`, `.next/`, `out/`, `public/`, y los directorios de componentes de terceros (`src/components/ui/**`, `src/components/magicui/**`, `src/components/motion-primitives/**`).
- VS Code está configurado para ejecutar `source.fixAll.standard` al guardar.

### Convenciones de TypeScript / React

- **Tipado explícito en retornos de componentes**: preferir `React.ReactElement` o `React.JSX.Element` en funciones de componente.
- **Componentes funcionales** con arrow functions o function declarations. Se usan ambos estilos en el proyecto.
- **`'use client'`** en la primera línea cuando el componente usa hooks del cliente (`useState`, `useEffect`, `useRef`, etc.) o librerías del cliente (Framer Motion, react-hook-form).
- **Alias de importación**: usar `@/` para todo lo bajo `src/` (ej: `@/components/ui/button`, `@/lib/utils`).
- **Nombres de funciones/helpers**: se usa `camelCase` para funciones y variables; `PascalCase` para componentes e interfaces.
- **Idioma del código**: los nombres de variables, funciones e interfaces están en español cuando representan conceptos del negocio (ej: `getActiveLocations`, `parseHorarios`, `como_nos_conociste`), y en inglés para conceptos técnicos genéricos (ej: `Button`, `Form`, `HorariosTableProps`).
- **Idioma de la interfaz de usuario**: todo el contenido visible está en español, dirigido al público de Argentina.

### Estilos

- **Tailwind CSS v4** con sintaxis `@import "tailwindcss"` y `@theme inline`.
- Variables CSS personalizadas en `:root` para el tema de Clic Pilates:
  - `--cream`: `#EDECE7` (fondo principal)
  - `--nude`: `#BCAC9E` (color de acento/primary)
- Se usa `cn(...)` (de `@/lib/utils`) para combinar clases condicionalmente.
- Scrollbars ocultos globalmente (`::-webkit-scrollbar { display: none; }`).

## API externas y dependencias de datos

### SteinHQ (Google Sheets)

El proyecto consume horarios de clases desde Google Sheets a través de la API de **Stein**.

- URL base: `https://api.steinhq.com/v1/storages/69933325affba40a624eb247`
- Cada sede tiene una hoja con el nombre del slug (ej: `office`, `pilara`, `nordelta`).
- Columnas esperadas: `Dia`, `Horario`, `Nivel`, `Disponibilidad`.
- La función `parseHorarios()` en `src/lib/stein.ts` normaliza los nombres de columnas y convierte la respuesta en una grilla ordenada por horario.

### Resend (Emails)

El formulario de franquicias envía emails vía la API de Resend.

- Requiere la variable de entorno `RESEND_API_KEY`.
- El `from` debe usar un dominio verificado en Resend (`franquicias@clicpilates.com`).
- Destinatario fijo: `franquicias@clicpilates.com`.

## Variables de entorno

No hay archivo `.env` commiteado. Las variables requeridas en producción son:

| Variable | Descripción |
|---|---|
| `RESEND_API_KEY` | API key de Resend para envío de emails de franquicias |

## Consideraciones de seguridad

- **Validación de inputs**: el formulario de franquicias usa Zod en el cliente. El API route confía en los datos recibidos (no hay re-validación de Zod en el servidor actualmente).
- **Emails**: el endpoint `/api/send-email` no tiene rate limiting. En un entorno de alta exposición se recomienda agregar protección contra abuso.
- **Datos de sedes**: las sedes inactivas (`active: false`) no aparecen en la landing page ni en `/horarios/[sede]`, pero sí son accesibles vía `/sede/[slug]` (diseño intencional para mantener URLs funcionales).

## Despliegue

- El proyecto está configurado para desplegarse en **Vercel**.
- `next.config.ts` incluye optimización de imágenes (`formats: ['image/avif', 'image/webp']`) y `optimizePackageImports` para `lucide-react`.
- No hay configuración de CI/CD en el repositorio (no hay archivos `.github/workflows/`).

## Notas para agentes

- Al agregar nuevas sedes, modificar `src/lib/locations.ts`. El campo `location` actúa como slug para las rutas dinámicas.
- Si se agregan nuevas columnas en las hojas de Google Sheets, actualizar `src/lib/stein.ts` para que `getColumnKeys` las detecte correctamente.
- Los componentes de `magicui` y `motion-primitives` son de terceros; evitar modificarlos salvo que sea estrictamente necesario, ya que están excluidos del linting.
- La landing page usa Lenis para smooth scroll. Si se navega a una subpágina (`/sede/*`, `/horarios/*`), el componente `EnsurePageScroll` se encarga de restaurar el comportamiento de scroll nativo.
