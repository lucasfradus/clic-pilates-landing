# Grilla Horaria Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la nueva página pública `/grilla/[sede]` siguiendo el handoff de diseño (tema Crema, fidelidad pixel-perfect), con datos provistos por un mock local detrás de un fetcher que después se enchufa al endpoint real.

**Architecture:** Server Component en la ruta. Capa de datos en `src/lib/grilla.ts` con tipos del spec + `getGrilla(slug)` que decide entre fetch real (vía env var) y mock. Mock en `src/lib/grilla-mock.ts`. UI en `src/components/grilla/` con un único Client Component (`GrillaHoraria.tsx`) que orquesta layouts mobile/desktop por clases responsive de Tailwind. Tokens del tema Crema como CSS vars `--grilla-*` en `globals.css`.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind v4, TypeScript, Poppins (next/font/google).

**Spec:** `clic-pilates-landing/docs/superpowers/specs/2026-05-18-grilla-horaria-design.md`

**Working directory for all paths below:** `clic-pilates-landing/`

---

## Notas sobre verificación

El proyecto **no tiene framework de tests** (no jest, no vitest, no playwright; `package.json` solo tiene `lint`, `dev`, `build`, `start`). Forzar setup de testing está fuera del scope de esta tarea (sería más trabajo que la feature en sí). Por eso cada task verifica con:

1. `npm run lint` — `ts-standard` + `next/core-web-vitals`. Cero warnings nuevos.
2. `npm run build` — compila TS y Next. Cero errores.
3. Cuando aplica, `npm run dev` + chequeo visual en `http://localhost:3000/grilla/nordelta`.

Todos los comandos se corren desde `clic-pilates-landing/`.

---

## File Structure (resumen)

**A crear:**
- `src/app/grilla/[sede]/page.tsx`
- `src/lib/grilla.ts`
- `src/lib/grilla-mock.ts`
- `src/components/grilla/GrillaHoraria.tsx` (`'use client'`)
- `src/components/grilla/GrillaHeader.tsx`
- `src/components/grilla/GrillaLegend.tsx`
- `src/components/grilla/DayTabs.tsx` (`'use client'`)
- `src/components/grilla/SlotList.tsx`
- `src/components/grilla/SlotCard.tsx`
- `src/components/grilla/ScheduleTable.tsx`
- `src/components/grilla/SlotContent.tsx`

**A modificar:**
- `src/app/globals.css` — agregar tokens `--grilla-*`
- `src/app/layout.tsx` — sumar pesos Poppins 300 y 500

---

### Task 1: Tokens de tema Crema + pesos de Poppins faltantes

**Files:**
- Modify: `src/app/globals.css` (agregar bloque al final del `:root` actual)
- Modify: `src/app/layout.tsx:9` (agregar pesos `'300'` y `'500'`)

- [ ] **Step 1: Agregar tokens `--grilla-*` al final del bloque `:root` en `src/app/globals.css`**

Insertar inmediatamente antes del cierre `}` del `:root` (después de `--sidebar-ring: oklch(0.708 0 0);` en la línea 104):

```css
  /* ── Grilla Horaria (tema Crema) ── */
  --grilla-page-bg: #fdfbfa;
  --grilla-card-bg: #ffffff;
  --grilla-border: #ede8e2;
  --grilla-text: #2c2f34;
  --grilla-muted: #a0928a;
  --grilla-time-bg: #f6f2ed;
  --grilla-tab-active-bg: #bcac9e;
  --grilla-tab-active-text: #ffffff;
  --grilla-tab-inactive-bg: #edece7;
  --grilla-tab-inactive-text: #5a4f45;
  --grilla-table-header-bg: #2c2f34;
  --grilla-table-header-text: #dfd4ca;
  --grilla-row-alt-bg: #faf7f4;
  --grilla-legend-bg: #f6f2ed;
  /* Status */
  --grilla-status-d-dot: #2e8a52;
  --grilla-status-d-text: #1a6b3e;
  --grilla-status-d-bg: #e4f2ea;
  --grilla-status-b-dot: #c97c22;
  --grilla-status-b-text: #875200;
  --grilla-status-b-bg: #fdf2de;
  --grilla-status-n-dot: #c43030;
  --grilla-status-n-text: #8a1c1c;
  --grilla-status-n-bg: #fde6e6;
  --grilla-status-p-dot: #7888a8;
  --grilla-status-p-text: #445070;
  --grilla-status-p-bg: #edf0f6;
  /* Levels */
  --grilla-level-inicial-bg: #f0ece7;
  --grilla-level-inicial-text: #5a4f45;
  --grilla-level-levelup-bg: #2c2f34;
  --grilla-level-levelup-text: #dfd4ca;
```

- [ ] **Step 2: Sumar pesos Poppins 300 y 500 en `src/app/layout.tsx`**

Reemplazar el array de weights (línea 9) por:

```ts
  weight: ['300', '400', '500', '600', '700'],
```

- [ ] **Step 3: Verificar build**

Run desde `clic-pilates-landing/`:
```bash
npm run lint
npm run build
```
Expected: ambos terminan con exit 0, sin errores ni warnings nuevos.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat(grilla): add Crema theme tokens and Poppins weights"
```

---

### Task 2: Tipos + fetcher (`src/lib/grilla.ts`)

**Files:**
- Create: `src/lib/grilla.ts`

- [ ] **Step 1: Crear el archivo con tipos del spec y fetcher**

```ts
// src/lib/grilla.ts
import { grillaMock } from './grilla-mock'

export type Status = 'd' | 'b' | 'n' | 'p'
export type Level = 'Inicial' | 'Level Up' | 'Próx'
export type Day = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado'

export interface SlotData {
  l: Level
  s: Status
}

export type DaySchedule = {
  [day in Day]?: SlotData | null
}

export type Schedule = {
  [time: string]: DaySchedule
}

export interface Center {
  id: number
  name: string
  address: string
  slug: string
}

export interface ScheduleResponse {
  center: Center
  schedule: Schedule
  updatedAt: string
}

export const DAYS: readonly Day[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export const STATUS_LABEL: Record<Status, string> = {
  d: 'Disponible',
  b: 'Baja disponibilidad',
  n: 'No disponible',
  p: 'Próximamente'
}

/**
 * Obtiene la grilla horaria de un centro.
 * - Si NEXT_PUBLIC_GRILLA_API está seteada, hace fetch al endpoint real y
 *   mapea 404/409 a null (centro existe pero no fue migrado).
 * - Si no, delega al mock local.
 *
 * Devuelve null cuando el centro existe pero no hay grilla disponible.
 */
export async function getGrilla (slug: string): Promise<ScheduleResponse | null> {
  const api = process.env.NEXT_PUBLIC_GRILLA_API
  if (api === undefined || api === '') {
    return grillaMock(slug)
  }

  const res = await fetch(`${api}/centers/${slug}/schedule`, { cache: 'no-store' })
  if (res.status === 404 || res.status === 409) return null
  if (!res.ok) throw new Error(`Grilla API ${res.status} for ${slug}`)
  return await res.json() as ScheduleResponse
}
```

- [ ] **Step 2: Verificar lint**

Run:
```bash
npm run lint
```
Expected: pasa (puede fallar transitoriamente porque `grilla-mock` aún no existe — si pasa eso, continuar a Task 3 sin commitear todavía).

Si lint/build fallan SOLO por el import faltante de `grilla-mock`, está esperado: lo creamos en Task 3 y commiteamos entonces. Si fallan por cualquier otra razón, arreglarlo antes de avanzar.

- [ ] **Step 3: No commitear todavía** (la verificación verde llega cuando Task 3 cree el mock).

---

### Task 3: Mock data (`src/lib/grilla-mock.ts`)

**Files:**
- Create: `src/lib/grilla-mock.ts`

- [ ] **Step 1: Crear el mock con la data de Nordelta del prototipo HTML**

```ts
// src/lib/grilla-mock.ts
import { locations } from './locations'
import type { Center, Schedule, ScheduleResponse } from './grilla'

const NORDELTA_SCHEDULE: Schedule = {
  '7.45':  { Lunes: { l: 'Level Up', s: 'd' }, Martes: { l: 'Inicial', s: 'd' }, 'Miércoles': { l: 'Inicial', s: 'd' }, Jueves: { l: 'Inicial', s: 'd' }, Viernes: { l: 'Level Up', s: 'd' }, 'Sábado': { l: 'Próx', s: 'p' } },
  '8.45':  { Lunes: { l: 'Level Up', s: 'b' }, Martes: { l: 'Inicial', s: 'b' }, 'Miércoles': { l: 'Level Up', s: 'b' }, Jueves: { l: 'Inicial', s: 'd' }, Viernes: { l: 'Level Up', s: 'b' }, 'Sábado': { l: 'Level Up', s: 'd' } },
  '9.45':  { Lunes: { l: 'Inicial', s: 'b' }, Martes: { l: 'Level Up', s: 'b' }, 'Miércoles': { l: 'Inicial', s: 'd' }, Jueves: { l: 'Level Up', s: 'b' }, Viernes: { l: 'Inicial', s: 'b' }, 'Sábado': { l: 'Inicial', s: 'd' } },
  '10.45': { Lunes: { l: 'Inicial', s: 'd' }, Martes: { l: 'Inicial', s: 'd' }, 'Miércoles': { l: 'Inicial', s: 'd' }, Jueves: { l: 'Inicial', s: 'b' }, Viernes: { l: 'Inicial', s: 'b' }, 'Sábado': { l: 'Level Up', s: 'd' } },
  '11.45': { Lunes: { l: 'Inicial', s: 'd' }, Martes: { l: 'Inicial', s: 'd' }, 'Miércoles': { l: 'Inicial', s: 'b' }, Jueves: { l: 'Inicial', s: 'd' }, Viernes: { l: 'Level Up', s: 'd' }, 'Sábado': { l: 'Inicial', s: 'b' } },
  '12.45': { Lunes: { l: 'Level Up', s: 'd' }, Martes: { l: 'Próx', s: 'p' }, 'Miércoles': { l: 'Inicial', s: 'd' }, Jueves: { l: 'Próx', s: 'p' }, Viernes: { l: 'Inicial', s: 'b' }, 'Sábado': null },
  '13.45': { Lunes: { l: 'Inicial', s: 'd' }, Martes: { l: 'Próx', s: 'p' }, 'Miércoles': { l: 'Level Up', s: 'd' }, Jueves: { l: 'Próx', s: 'p' }, Viernes: { l: 'Inicial', s: 'd' }, 'Sábado': null },
  '14.45': { Lunes: { l: 'Próx', s: 'p' }, Martes: { l: 'Próx', s: 'p' }, 'Miércoles': { l: 'Inicial', s: 'd' }, Jueves: { l: 'Próx', s: 'p' }, Viernes: { l: 'Próx', s: 'p' }, 'Sábado': null },
  '15.45': { Lunes: { l: 'Próx', s: 'p' }, Martes: { l: 'Inicial', s: 'p' }, 'Miércoles': { l: 'Inicial', s: 'p' }, Jueves: { l: 'Inicial', s: 'p' }, Viernes: { l: 'Próx', s: 'p' }, 'Sábado': null },
  '16.45': { Lunes: { l: 'Level Up', s: 'd' }, Martes: { l: 'Inicial', s: 'd' }, 'Miércoles': { l: 'Level Up', s: 'p' }, Jueves: { l: 'Inicial', s: 'p' }, Viernes: { l: 'Próx', s: 'p' }, 'Sábado': null }
}

const MOCK_UPDATED_AT = '2026-05-18T17:00:00Z'

function centerFromSlug (slug: string): Center | null {
  const idx = locations.findIndex((loc) => loc.location === slug)
  if (idx === -1) return null
  const loc = locations[idx]
  return {
    id: idx + 1,
    name: loc.locationName,
    address: loc.address,
    slug: loc.location
  }
}

/**
 * Mock local de la grilla. Hoy solo Nordelta tiene datos completos;
 * el resto de las sedes devuelve null (estado "todavía no disponible").
 */
export async function grillaMock (slug: string): Promise<ScheduleResponse | null> {
  const center = centerFromSlug(slug)
  if (center === null) return null
  if (slug !== 'nordelta') return null
  return {
    center,
    schedule: NORDELTA_SCHEDULE,
    updatedAt: MOCK_UPDATED_AT
  }
}
```

- [ ] **Step 2: Verificar lint y build**

```bash
npm run lint
npm run build
```
Expected: ambos pasan.

- [ ] **Step 3: Commit**

```bash
git add src/lib/grilla.ts src/lib/grilla-mock.ts
git commit -m "feat(grilla): add types, fetcher and mock data layer"
```

---

### Task 4: Ruta `/grilla/[sede]` con esqueleto (404 + placeholder)

**Files:**
- Create: `src/app/grilla/[sede]/page.tsx`

- [ ] **Step 1: Crear el page con 404 y placeholder temporal**

```tsx
// src/app/grilla/[sede]/page.tsx
import { notFound } from 'next/navigation'
import { getActiveLocationBySlug } from '@/lib/locations'
import { getGrilla } from '@/lib/grilla'

interface PageProps {
  params: Promise<{ sede: string }>
}

export default async function GrillaSedePage ({ params }: PageProps): Promise<React.ReactElement> {
  const { sede } = await params
  const location = getActiveLocationBySlug(sede)
  if (location === undefined) notFound()

  let data: Awaited<ReturnType<typeof getGrilla>> = null
  try {
    data = await getGrilla(sede)
  } catch {
    data = null
  }

  return (
    <main className='min-h-screen bg-[var(--grilla-page-bg)]'>
      <pre className='p-8 text-xs'>
        {JSON.stringify({ sede, location: location.locationName, hasData: data !== null }, null, 2)}
      </pre>
    </main>
  )
}
```

- [ ] **Step 2: Verificar build + smoke test en dev**

```bash
npm run lint
npm run build
```
Expected: pasan.

Después, en otra terminal:
```bash
npm run dev
```
Abrir en el navegador:
- `http://localhost:3000/grilla/nordelta` → muestra JSON con `hasData: true`.
- `http://localhost:3000/grilla/escobar` → muestra JSON con `hasData: false`.
- `http://localhost:3000/grilla/inexistente` → 404 de Next.

Cortar `npm run dev` cuando termines.

- [ ] **Step 3: Commit**

```bash
git add src/app/grilla/[sede]/page.tsx
git commit -m "feat(grilla): add /grilla/[sede] route skeleton"
```

---

### Task 5: `SlotContent` (celda compartida mobile/desktop)

**Files:**
- Create: `src/components/grilla/SlotContent.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/grilla/SlotContent.tsx
import type { SlotData } from '@/lib/grilla'

interface Props {
  slot: SlotData | null | undefined
  size: 'mobile' | 'desktop'
}

const STATUS_COLORS = {
  d: { dot: 'var(--grilla-status-d-dot)', text: 'var(--grilla-status-d-text)' },
  b: { dot: 'var(--grilla-status-b-dot)', text: 'var(--grilla-status-b-text)' },
  n: { dot: 'var(--grilla-status-n-dot)', text: 'var(--grilla-status-n-text)' },
  p: { dot: 'var(--grilla-status-p-dot)', text: 'var(--grilla-status-p-text)' }
} as const

const STATUS_LABEL = {
  d: 'Disponible',
  b: 'Baja disponibilidad',
  n: 'No disponible',
  p: 'Próximamente'
} as const

export function SlotContent ({ slot, size }: Props): React.ReactElement {
  const isMobile = size === 'mobile'

  // Sin clase
  if (slot === null || slot === undefined) {
    return (
      <span
        className={isMobile ? 'text-[14px]' : 'text-[12px]'}
        style={{ color: 'var(--grilla-muted)' }}
      >
        —
      </span>
    )
  }

  // Próximamente: solo el pill
  if (slot.s === 'p') {
    return (
      <span
        className={[
          'inline-flex items-center gap-1.5 rounded-[20px] font-medium',
          isMobile ? 'px-3 py-1 text-[12px]' : 'px-2 py-[3px] text-[10px]'
        ].join(' ')}
        style={{
          background: 'var(--grilla-status-p-bg)',
          color: 'var(--grilla-status-p-text)'
        }}
      >
        <span
          className='inline-block rounded-full'
          style={{
            width: isMobile ? 7 : 5,
            height: isMobile ? 7 : 5,
            background: 'var(--grilla-status-p-dot)'
          }}
        />
        Próximamente
      </span>
    )
  }

  // Disponible / Baja / No disponible: level badge + status row
  const levelBg = slot.l === 'Level Up' ? 'var(--grilla-level-levelup-bg)' : 'var(--grilla-level-inicial-bg)'
  const levelText = slot.l === 'Level Up' ? 'var(--grilla-level-levelup-text)' : 'var(--grilla-level-inicial-text)'
  const statusColor = STATUS_COLORS[slot.s]

  return (
    <div
      className={[
        'flex flex-col items-start',
        isMobile ? 'gap-[5px]' : 'gap-[3px]'
      ].join(' ')}
    >
      <span
        className={[
          'inline-block rounded-[20px] font-semibold uppercase tracking-[0.04em]',
          isMobile ? 'px-[11px] py-[3px] text-[10px]' : 'px-2 py-[2px] text-[10px]'
        ].join(' ')}
        style={{ background: levelBg, color: levelText }}
      >
        {slot.l}
      </span>
      <span
        className={[
          'inline-flex items-center gap-1.5 font-medium',
          isMobile ? 'text-[12px]' : 'text-[10px]'
        ].join(' ')}
        style={{ color: statusColor.text }}
      >
        <span
          className='inline-block rounded-full'
          style={{
            width: isMobile ? 7 : 6,
            height: isMobile ? 7 : 6,
            background: statusColor.dot
          }}
        />
        {STATUS_LABEL[slot.s]}
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Verificar lint**

```bash
npm run lint
```
Expected: pasa.

- [ ] **Step 3: Commit**

```bash
git add src/components/grilla/SlotContent.tsx
git commit -m "feat(grilla): add SlotContent presentational component"
```

---

### Task 6: `GrillaLegend`

**Files:**
- Create: `src/components/grilla/GrillaLegend.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/grilla/GrillaLegend.tsx
const ITEMS = [
  { dot: 'var(--grilla-status-d-dot)', label: 'Disponible' },
  { dot: 'var(--grilla-status-b-dot)', label: 'Baja disponibilidad' },
  { dot: 'var(--grilla-status-n-dot)', label: 'No disponible' },
  { dot: 'var(--grilla-status-p-dot)', label: 'Próximamente' }
] as const

export function GrillaLegend (): React.ReactElement {
  return (
    <div
      className='mx-4 mt-3 rounded-[10px] px-4 py-2.5 md:mx-6 md:mt-0 md:mb-3 md:px-6 md:py-3'
      style={{
        background: 'var(--grilla-legend-bg)',
        border: '1px solid var(--grilla-border)'
      }}
    >
      <ul className='flex flex-wrap gap-x-[18px] gap-y-2'>
        {ITEMS.map((item) => (
          <li key={item.label} className='flex items-center gap-2'>
            <span
              className='inline-block h-[7px] w-[7px] rounded-full'
              style={{ background: item.dot }}
            />
            <span className='text-[11px] font-medium' style={{ color: 'var(--grilla-text)' }}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 2: Verificar lint**

```bash
npm run lint
```
Expected: pasa.

- [ ] **Step 3: Commit**

```bash
git add src/components/grilla/GrillaLegend.tsx
git commit -m "feat(grilla): add GrillaLegend component"
```

---

### Task 7: `GrillaHeader`

**Files:**
- Create: `src/components/grilla/GrillaHeader.tsx`

- [ ] **Step 1: Crear el componente**

Nota: usa el logo SVG existente `public/icons/logo_clic.svg` con el filtro `brightness(0) invert(1)` para forzarlo blanco sobre el gradiente.

```tsx
// src/components/grilla/GrillaHeader.tsx
import type { Center } from '@/lib/grilla'

interface Props {
  center: Pick<Center, 'name' | 'address'>
}

export function GrillaHeader ({ center }: Props): React.ReactElement {
  return (
    <header
      className='relative overflow-hidden px-5 pt-[22px] pb-7 md:px-7'
      style={{ background: 'linear-gradient(145deg, #c8bab0 0%, #a8998a 100%)' }}
    >
      {/* Círculos decorativos */}
      <span
        aria-hidden
        className='pointer-events-none absolute h-[200px] w-[200px] rounded-full'
        style={{ top: -60, right: -60, background: 'rgba(255,255,255,0.04)' }}
      />
      <span
        aria-hidden
        className='pointer-events-none absolute h-[120px] w-[120px] rounded-full'
        style={{ bottom: -40, right: 40, background: 'rgba(255,255,255,0.03)' }}
      />

      {/* Logo en crop 88×38 */}
      <div className='relative mb-3 h-[38px] w-[88px] overflow-hidden'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/icons/logo_clic.svg'
          alt='CLIC Studio Pilates'
          className='block h-[88px] w-[88px] -translate-y-[25px]'
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>

      <h1
        className='font-bold leading-[1.05] tracking-[-0.03em] text-white text-[30px] md:text-[34px]'
      >
        {center.name}
      </h1>
      <p className='mt-1 text-[13px] font-light' style={{ color: 'rgba(255,255,255,0.75)' }}>
        {center.address}
      </p>
      <p
        className='mt-4 text-[11px] font-semibold uppercase tracking-[0.09em]'
        style={{ color: 'rgba(255,255,255,0.75)', opacity: 0.8 }}
      >
        Horarios y disponibilidad
      </p>
    </header>
  )
}
```

- [ ] **Step 2: Wire el header en el page para placeholder visible**

Modificar `src/app/grilla/[sede]/page.tsx` para mostrar el header tanto en el caso `data === null` como (provisoriamente) en el éxito. Reemplazar el `return` actual por:

```tsx
  const headerCenter = data?.center ?? {
    name: location.locationName,
    address: location.address
  }

  if (data === null) {
    return (
      <main className='min-h-screen' style={{ background: 'var(--grilla-page-bg)' }}>
        <GrillaHeader center={headerCenter} />
        <div className='flex min-h-[40vh] items-center justify-center px-6 py-16 text-center'>
          <p className='text-[14px]' style={{ color: 'var(--grilla-muted)' }}>
            Próximamente publicamos los horarios de esta sede.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className='min-h-screen' style={{ background: 'var(--grilla-page-bg)' }}>
      <GrillaHeader center={data.center} />
      <pre className='p-8 text-xs'>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
```

Y al tope del archivo agregar el import:
```ts
import { GrillaHeader } from '@/components/grilla/GrillaHeader'
```

- [ ] **Step 3: Verificar build + smoke test visual**

```bash
npm run lint
npm run build
npm run dev
```
Visitar:
- `http://localhost:3000/grilla/nordelta` → header con gradiente, logo blanco, "Nordelta" + dirección, label "HORARIOS Y DISPONIBILIDAD". Debajo, el JSON crudo (provisorio).
- `http://localhost:3000/grilla/escobar` → mismo header con "ESCOBAR" + dirección, debajo el mensaje "Próximamente publicamos los horarios de esta sede.".

Cortar `npm run dev`.

- [ ] **Step 4: Commit**

```bash
git add src/components/grilla/GrillaHeader.tsx src/app/grilla/[sede]/page.tsx
git commit -m "feat(grilla): add GrillaHeader and wire it into the route"
```

---

### Task 8: `ScheduleTable` (vista desktop)

**Files:**
- Create: `src/components/grilla/ScheduleTable.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/grilla/ScheduleTable.tsx
import { DAYS, type Schedule } from '@/lib/grilla'
import { SlotContent } from './SlotContent'

interface Props {
  schedule: Schedule
}

function endTime (start: string): string {
  // "7.45" → "8", "10.45" → "11", etc. La clase dura ~1h.
  const hour = parseInt(start.split('.')[0], 10)
  return `${hour + 1}`
}

export function ScheduleTable ({ schedule }: Props): React.ReactElement {
  const times = Object.keys(schedule)

  return (
    <div className='overflow-x-auto px-6 pb-10'>
      <table
        className='w-full border-collapse'
        style={{ minWidth: 720, color: 'var(--grilla-text)' }}
      >
        <thead>
          <tr>
            <th
              className='px-3.5 py-[11px] text-left text-[10px] font-semibold uppercase tracking-[0.09em]'
              style={{
                background: 'var(--grilla-table-header-bg)',
                color: 'var(--grilla-table-header-text)',
                borderRadius: '8px 0 0 0',
                minWidth: 80
              }}
            >
              Horario
            </th>
            {DAYS.map((day) => (
              <th
                key={day}
                className='px-3.5 py-[11px] text-left text-[10px] font-semibold uppercase tracking-[0.09em]'
                style={{
                  background: 'var(--grilla-table-header-bg)',
                  color: 'var(--grilla-table-header-text)',
                  borderLeft: '1px solid var(--grilla-border)',
                  minWidth: 130
                }}
              >
                {day}
              </th>
            ))}
            <th
              className='px-3.5 py-[11px] text-left text-[10px] font-semibold uppercase tracking-[0.09em]'
              style={{
                background: 'var(--grilla-table-header-bg)',
                color: 'var(--grilla-table-header-text)',
                borderRadius: '0 8px 0 0',
                borderLeft: '1px solid var(--grilla-border)',
                minWidth: 80
              }}
            >
              Horario
            </th>
          </tr>
        </thead>
        <tbody>
          {times.map((time, rowIdx) => {
            const rowBg = rowIdx % 2 === 0 ? 'var(--grilla-card-bg)' : 'var(--grilla-row-alt-bg)'
            const daySchedule = schedule[time]
            return (
              <tr key={time} style={{ background: rowBg }}>
                <td
                  className='px-3.5 py-[9px] text-[13px] font-semibold'
                  style={{
                    background: 'var(--grilla-time-bg)',
                    borderBottom: '1px solid var(--grilla-border)'
                  }}
                >
                  {time} hs
                </td>
                {DAYS.map((day) => (
                  <td
                    key={day}
                    className='px-3.5 py-[9px] align-middle'
                    style={{
                      borderBottom: '1px solid var(--grilla-border)',
                      borderLeft: '1px solid var(--grilla-border)'
                    }}
                  >
                    <SlotContent slot={daySchedule[day]} size='desktop' />
                  </td>
                ))}
                <td
                  className='px-3.5 py-[9px] text-[13px] font-semibold'
                  style={{
                    background: 'var(--grilla-time-bg)',
                    borderBottom: '1px solid var(--grilla-border)',
                    borderLeft: '1px solid var(--grilla-border)'
                  }}
                >
                  {endTime(time)} hs
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 2: Verificar lint**

```bash
npm run lint
```
Expected: pasa.

- [ ] **Step 3: Commit**

```bash
git add src/components/grilla/ScheduleTable.tsx
git commit -m "feat(grilla): add ScheduleTable (desktop view)"
```

---

### Task 9: `SlotCard` (card individual mobile)

**Files:**
- Create: `src/components/grilla/SlotCard.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/grilla/SlotCard.tsx
import type { SlotData } from '@/lib/grilla'
import { SlotContent } from './SlotContent'

interface Props {
  time: string
  slot: SlotData | null | undefined
}

export function SlotCard ({ time, slot }: Props): React.ReactElement {
  return (
    <li
      className='flex items-center gap-3 rounded-[12px] px-4 py-[13px]'
      style={{
        background: 'var(--grilla-card-bg)',
        border: '1px solid var(--grilla-border)'
      }}
    >
      <span
        className='text-[15px] font-bold tracking-[-0.02em]'
        style={{ color: 'var(--grilla-text)' }}
      >
        {time}
        <span className='ml-1 text-[11px] font-normal'>hs</span>
      </span>
      <span className='ml-auto'>
        <SlotContent slot={slot} size='mobile' />
      </span>
    </li>
  )
}
```

- [ ] **Step 2: Verificar lint**

```bash
npm run lint
```
Expected: pasa.

- [ ] **Step 3: Commit**

```bash
git add src/components/grilla/SlotCard.tsx
git commit -m "feat(grilla): add SlotCard (mobile)"
```

---

### Task 10: `SlotList` (lista mobile para el día activo)

**Files:**
- Create: `src/components/grilla/SlotList.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/grilla/SlotList.tsx
import type { Day, Schedule } from '@/lib/grilla'
import { SlotCard } from './SlotCard'

interface Props {
  schedule: Schedule
  activeDay: Day
}

const DAY_FULL_LABEL: Record<Day, string> = {
  Lunes: 'Lunes',
  Martes: 'Martes',
  'Miércoles': 'Miércoles',
  Jueves: 'Jueves',
  Viernes: 'Viernes',
  'Sábado': 'Sábado'
}

export function SlotList ({ schedule, activeDay }: Props): React.ReactElement {
  const times = Object.keys(schedule)
  return (
    <>
      <h2
        className='px-4 pb-2 pt-3.5 text-[12px] font-semibold uppercase tracking-[0.07em]'
        style={{ color: 'var(--grilla-muted)' }}
      >
        {DAY_FULL_LABEL[activeDay]}
      </h2>
      <ul className='flex flex-col gap-2 px-4 pb-10'>
        {times.map((time) => (
          <SlotCard key={time} time={time} slot={schedule[time][activeDay]} />
        ))}
      </ul>
    </>
  )
}
```

- [ ] **Step 2: Verificar lint**

```bash
npm run lint
```
Expected: pasa.

- [ ] **Step 3: Commit**

```bash
git add src/components/grilla/SlotList.tsx
git commit -m "feat(grilla): add SlotList (mobile)"
```

---

### Task 11: `DayTabs` (tabs scrolleables mobile)

**Files:**
- Create: `src/components/grilla/DayTabs.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/grilla/DayTabs.tsx
'use client'

import type { Day } from '@/lib/grilla'
import { DAYS } from '@/lib/grilla'

interface Props {
  activeDay: Day
  onSelect: (day: Day) => void
}

const SHORT_LABEL: Record<Day, string> = {
  Lunes: 'Lun',
  Martes: 'Mar',
  'Miércoles': 'Mié',
  Jueves: 'Jue',
  Viernes: 'Vie',
  'Sábado': 'Sáb'
}

export function DayTabs ({ activeDay, onSelect }: Props): React.ReactElement {
  return (
    <div
      className='flex gap-2 overflow-x-auto px-4 pt-3.5'
      style={{ scrollbarWidth: 'none' }}
    >
      {DAYS.map((day) => {
        const isActive = day === activeDay
        return (
          <button
            key={day}
            type='button'
            onClick={() => onSelect(day)}
            className='whitespace-nowrap rounded-[22px] px-[18px] py-[9px] text-[13px] transition-all duration-200'
            style={{
              background: isActive ? 'var(--grilla-tab-active-bg)' : 'var(--grilla-tab-inactive-bg)',
              color: isActive ? 'var(--grilla-tab-active-text)' : 'var(--grilla-tab-inactive-text)',
              fontWeight: isActive ? 600 : 400,
              letterSpacing: isActive ? '-0.01em' : 'normal'
            }}
          >
            {SHORT_LABEL[day]}
          </button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Verificar lint**

```bash
npm run lint
```
Expected: pasa.

- [ ] **Step 3: Commit**

```bash
git add src/components/grilla/DayTabs.tsx
git commit -m "feat(grilla): add DayTabs (mobile)"
```

---

### Task 12: `GrillaHoraria` (orquestador) + wire en el page

**Files:**
- Create: `src/components/grilla/GrillaHoraria.tsx`
- Modify: `src/app/grilla/[sede]/page.tsx`

- [ ] **Step 1: Crear el orquestador**

```tsx
// src/components/grilla/GrillaHoraria.tsx
'use client'

import { useState } from 'react'
import type { Day, ScheduleResponse } from '@/lib/grilla'
import { DayTabs } from './DayTabs'
import { GrillaHeader } from './GrillaHeader'
import { GrillaLegend } from './GrillaLegend'
import { ScheduleTable } from './ScheduleTable'
import { SlotList } from './SlotList'

interface Props {
  data: ScheduleResponse
}

export function GrillaHoraria ({ data }: Props): React.ReactElement {
  const [activeDay, setActiveDay] = useState<Day>('Lunes')

  return (
    <>
      <GrillaHeader center={data.center} />

      {/* Mobile */}
      <div className='md:hidden'>
        <DayTabs activeDay={activeDay} onSelect={setActiveDay} />
        <GrillaLegend />
        <SlotList schedule={data.schedule} activeDay={activeDay} />
      </div>

      {/* Desktop */}
      <div className='hidden md:block'>
        <GrillaLegend />
        <ScheduleTable schedule={data.schedule} />
      </div>
    </>
  )
}
```

- [ ] **Step 2: Reemplazar el page para usar `GrillaHoraria` en el happy path**

Reemplazar el contenido COMPLETO de `src/app/grilla/[sede]/page.tsx` por:

```tsx
import { notFound } from 'next/navigation'
import { getActiveLocationBySlug } from '@/lib/locations'
import { getGrilla } from '@/lib/grilla'
import { GrillaHeader } from '@/components/grilla/GrillaHeader'
import { GrillaHoraria } from '@/components/grilla/GrillaHoraria'

interface PageProps {
  params: Promise<{ sede: string }>
}

export default async function GrillaSedePage ({ params }: PageProps): Promise<React.ReactElement> {
  const { sede } = await params
  const location = getActiveLocationBySlug(sede)
  if (location === undefined) notFound()

  let data: Awaited<ReturnType<typeof getGrilla>> = null
  try {
    data = await getGrilla(sede)
  } catch {
    data = null
  }

  if (data === null) {
    return (
      <main className='min-h-screen' style={{ background: 'var(--grilla-page-bg)' }}>
        <GrillaHeader center={{ name: location.locationName, address: location.address }} />
        <div className='flex min-h-[40vh] items-center justify-center px-6 py-16 text-center'>
          <p className='text-[14px]' style={{ color: 'var(--grilla-muted)' }}>
            Próximamente publicamos los horarios de esta sede.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className='min-h-screen' style={{ background: 'var(--grilla-page-bg)' }}>
      <GrillaHoraria data={data} />
    </main>
  )
}
```

- [ ] **Step 3: Verificar build + smoke visual**

```bash
npm run lint
npm run build
npm run dev
```
Visitar:
- `http://localhost:3000/grilla/nordelta` (desktop width ≥ 768px) → header + leyenda + tabla completa con 10 filas (7.45 → 16.45), 6 columnas de días, columnas Horario a izquierda y derecha. Status pills/dots con los colores correctos.
- Mismo URL, viewport mobile (< 768px) → header + tabs Lun/Mar/Mié/Jue/Vie/Sáb (Lun activo por defecto) + leyenda + lista de horarios del día activo. Tap en otro día cambia la lista.
- `http://localhost:3000/grilla/escobar` → header + mensaje "Próximamente publicamos los horarios de esta sede.".
- `http://localhost:3000/grilla/no-existe` → 404.

Cortar `npm run dev`.

- [ ] **Step 4: Commit**

```bash
git add src/components/grilla/GrillaHoraria.tsx src/app/grilla/[sede]/page.tsx
git commit -m "feat(grilla): wire GrillaHoraria orchestrator into the route"
```

---

### Task 13: QA final + checklist contra spec

**Files:** ninguno (verificación)

- [ ] **Step 1: Recorrer el checklist visual**

Levantar `npm run dev` y verificar contra el HTML del handoff (`design_handoff_grilla_horaria/Grilla Horaria.html`) abierto al lado, en `http://localhost:3000/grilla/nordelta`:

Desktop:
- [ ] Header: gradiente, logo blanco crop 88×38, nombre "Nordelta" 34px, dirección 13px, label "HORARIOS Y DISPONIBILIDAD" 11px uppercase
- [ ] Círculos decorativos visibles en header
- [ ] Leyenda con los 4 items y dots con los 4 colores correctos
- [ ] Tabla header oscuro `#2c2f34`, texto `#dfd4ca` uppercase tracking ancho
- [ ] Filas alternadas blanco / `#faf7f4`
- [ ] Columnas Horario (izq + der) con fondo `#f6f2ed`, fuente bold 13px
- [ ] Celdas con level badge (Inicial fondo crema / Level Up fondo oscuro) + status dot+label
- [ ] Slots "Próximamente" se ven como pill solo
- [ ] Slots null se ven como em-dash gris
- [ ] Borde 1px `#ede8e2` entre celdas, radius 8px en esquinas superiores

Mobile (viewport < 768px):
- [ ] Tabs scrolleables horizontal, tab activo `#bcac9e` blanco bold
- [ ] Leyenda igual que desktop
- [ ] Label del día activo en `#a0928a` semibold uppercase
- [ ] Cards con borde, radius 12px, time bold 15px + "hs" 11px
- [ ] Cambiar tab cambia la lista, transición suave
- [ ] Tap en "Sáb" muestra correctamente los slots null como em-dash

Otras sedes:
- [ ] `/grilla/escobar` → header + placeholder
- [ ] `/grilla/inexistente` → 404 nativo de Next

- [ ] **Step 2: Lint y build final**

```bash
npm run lint
npm run build
```
Expected: ambos pasan limpio.

- [ ] **Step 3: Verificar git status limpio**

```bash
git status
```
Expected: working tree clean.

- [ ] **Step 4: No commit** — esta task es solo verificación; si surge cualquier fix visual, hacerlo en commits puntuales con mensaje descriptivo (`fix(grilla): ...`).

---

## Self-Review (post-plan)

**Spec coverage:**
- ✅ Ruta `/grilla/[sede]` → Task 4 + Task 12
- ✅ Tipos del spec → Task 2
- ✅ Fetcher con env var → Task 2
- ✅ Mock con Nordelta + resto null → Task 3
- ✅ Tokens Crema en globals.css → Task 1
- ✅ Pesos Poppins → Task 1
- ✅ GrillaHoraria orquestador `'use client'` → Task 12
- ✅ GrillaHeader (reusable en null state) → Task 7
- ✅ GrillaLegend → Task 6
- ✅ DayTabs `'use client'` → Task 11
- ✅ SlotList + SlotCard → Tasks 10, 9
- ✅ ScheduleTable desktop → Task 8
- ✅ SlotContent compartido → Task 5
- ✅ Responsive con `hidden md:*` (sin listener resize) → Task 12
- ✅ Estado "sede no migrada" placeholder → Task 7 + Task 12
- ✅ 404 sede no existe → Task 4
- ✅ Manejo error fetch → Task 4 (try/catch → null)

**Placeholder scan:** Sin TBD/TODO. Cada step tiene código completo o comando exacto.

**Type consistency:** `Day`, `Schedule`, `SlotData`, `ScheduleResponse`, `Center` definidos en Task 2 y usados consistentemente en todas las tasks siguientes. `DAYS` exportado en Task 2 y consumido en Task 8 y Task 11. `STATUS_LABEL` queda duplicado en `lib/grilla.ts` (Task 2) y `SlotContent.tsx` (Task 5) — voluntario, son tablas chicas que viven cerca de su uso visual; si molesta se puede deduplicar en una mejora posterior (no bloquea este plan).
