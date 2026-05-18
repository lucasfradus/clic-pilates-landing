# Grilla Horaria — Design Spec

**Date:** 2026-05-18
**Scope:** Implementar una nueva página pública en el landing de CLIC Pilates que muestre la grilla horaria semanal de un centro, siguiendo el handoff de diseño `design_handoff_grilla_horaria/` (tema Crema, fidelidad pixel-perfect).
**Out of scope:** Reemplazar la página actual `/horarios/[sede]` (queda intacta hasta que el backend termine la migración de todas las sedes). Switcher de tema. Booking.

---

## Contexto

- El proyecto ya tiene `/horarios/[sede]` que consume Stein/Google Sheets vía `lib/stein.ts` y renderiza `HorariosTable`. La forma de datos actual (`{Dia, Horario, Nivel, Disponibilidad}` con `Disponibilidad` como texto libre) **no coincide** con la del handoff (`{l, s}` con `s ∈ {'d','b','n','p'}`).
- El backend va a exponer un endpoint nuevo (`GET /api/v1/centers/{slug}/schedule`) con la forma exacta del spec del handoff. Aún no existe.
- Mientras tanto, el front se construye contra un mock local con la misma forma, detrás de un fetcher que después apunta al endpoint real vía env var.
- Sedes activas hoy: 9 (definidas en `src/lib/locations.ts`).

---

## Decisiones

| Decisión | Elección |
|---|---|
| Ruta | `/grilla/[sede]` (nueva, en paralelo a `/horarios/[sede]`) |
| Fuente de datos | Endpoint nuevo (cuando exista). Por ahora, mock local con la forma exacta del spec. |
| Estrategia de mock | Fetcher `getGrilla(slug)` que usa env var `NEXT_PUBLIC_GRILLA_API` si está definida; si no, lee del mock. |
| Temas | Solo Crema. Tokens dejados como CSS vars scopeables para sumar Noche/Blanca después. |
| Estilos | Tailwind + CSS vars en `globals.css` con prefijo `--grilla-*`. |
| Responsive | Tailwind responsive classes (`hidden md:block` / `md:hidden`) — sin listener de resize. |
| Estado "sede no migrada" | `getGrilla` devuelve `null`; la página muestra el header + un placeholder amable. |
| Migración / cleanup | El código viejo de `/horarios/[sede]` queda intacto. Se borrará en otra tarea cuando todas las sedes estén migradas. |

---

## Arquitectura

### Capa de datos

**`src/lib/grilla.ts`** — tipos del spec + fetcher.

```ts
export type Status = 'd' | 'b' | 'n' | 'p';
export type Level = 'Inicial' | 'Level Up' | 'Próx';
export type Day = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';

export interface SlotData { l: Level; s: Status; }
export type DaySchedule = { [day in Day]?: SlotData | null };
export type Schedule = { [time: string]: DaySchedule };

export interface Center {
  id: number;
  name: string;
  address: string;
  slug: string;
}

export interface ScheduleResponse {
  center: Center;
  schedule: Schedule;
  updatedAt: string; // ISO 8601 UTC
}

export const DAYS: readonly Day[] = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

export async function getGrilla(slug: string): Promise<ScheduleResponse | null>;
```

Comportamiento de `getGrilla`:
- Si `process.env.NEXT_PUBLIC_GRILLA_API` está seteada → `fetch(${api}/centers/${slug}/schedule, { cache: 'no-store' })`. Mapea 404/409 a `null`. Errores 5xx propagan.
- Si no → delega a `grilla-mock.ts`.
- Si el slug no existe en `locations.ts`: devuelve `null` (el page decide qué hacer; en práctica el page valida antes con `getActiveLocationBySlug` y hace 404).

**`src/lib/grilla-mock.ts`** — datos mock.
- Un `Schedule` completo y realista para `nordelta`, replicando el del prototipo HTML.
- Resto de sedes activas: devuelve `null` (estado "todavía no disponible").
- Construye `Center` desde `locations.ts` para no duplicar (id = index+1, name = `locationName`, address = `address`, slug = `location`).
- `updatedAt`: fecha fija ISO del momento de la implementación.

### Ruta

**`src/app/grilla/[sede]/page.tsx`** — Server Component async.

Flujo:
1. `const { sede } = await params`.
2. `const location = getActiveLocationBySlug(sede)`. Si no existe → `notFound()`.
3. `const data = await getGrilla(sede)`.
4. Render:
   - Si `data` es `null` → `<main>` con `<GrillaHeader>` mostrando el centro (derivado de `location`) y un placeholder centrado "Próximamente publicamos los horarios de esta sede.".
   - Si `data` ok → `<main>` con `<GrillaHoraria data={data} />`.

### Componentes

Todos en `src/components/grilla/`. Cada uno con responsabilidad acotada.

`GrillaHoraria` lleva `'use client'` (necesita state para `activeDay`). El resto son componentes presentacionales sin hooks ni handlers propios — no marcan `'use client'`, pero como cuelgan del árbol cliente terminan bundleados en el cliente. La distinción que importa es la responsabilidad, no el directive.

| Archivo | Responsabilidad |
|---|---|
| `GrillaHoraria.tsx` (`'use client'`) | Orquesta los layouts mobile/desktop, mantiene `activeDay` para mobile. Renderiza ambos árboles con clases responsive Tailwind. |
| `GrillaHeader.tsx` | Logo + nombre del centro + dirección + label "HORARIOS Y DISPONIBILIDAD" + círculos decorativos. Padding distinto mobile/desktop con clases responsive. Usado también por el page cuando `data === null`, así que debe poder recibir solo un `Center`. |
| `GrillaLegend.tsx` | Las 4 entradas (Disponible / Baja / No disponible / Próximamente) con dot + label. Mismo markup mobile y desktop. |
| `DayTabs.tsx` | Solo mobile. Recibe `activeDay`, `onSelect`. Tabs scrolleables horizontales. Lleva `'use client'` por el `onClick`. |
| `SlotList.tsx` | Solo mobile. Recibe `daySchedule`. Renderiza la lista de horarios del día activo. |
| `SlotCard.tsx` | Card mobile con `time` + `<SlotContent>`. |
| `ScheduleTable.tsx` | Solo desktop. Tabla completa con header oscuro, filas alternadas, columnas Horario / Lun..Sáb / Horario. `min-width: 720px` y wrapper `overflow-x-auto`. |
| `SlotContent.tsx` | Renderiza una celda según `SlotData \| null`: em-dash (null), pill "Próximamente" (status `p`), o "level badge + status row" (resto). Prop `size: 'mobile' \| 'desktop'` ajusta font-sizes y paddings. |

### Estilos

**`src/app/globals.css`** — agregar bloque de tokens Crema:

```css
:root {
  /* Grilla Horaria — tema Crema */
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
  --grilla-status-d-dot: #2e8a52; --grilla-status-d-text: #1a6b3e; --grilla-status-d-bg: #e4f2ea;
  --grilla-status-b-dot: #c97c22; --grilla-status-b-text: #875200; --grilla-status-b-bg: #fdf2de;
  --grilla-status-n-dot: #c43030; --grilla-status-n-text: #8a1c1c; --grilla-status-n-bg: #fde6e6;
  --grilla-status-p-dot: #7888a8; --grilla-status-p-text: #445070; --grilla-status-p-bg: #edf0f6;

  /* Levels */
  --grilla-level-inicial-bg: #f0ece7; --grilla-level-inicial-text: #5a4f45;
  --grilla-level-levelup-bg: #2c2f34; --grilla-level-levelup-text: #dfd4ca;
}
```

En componentes: clases Tailwind con `bg-[var(--grilla-card-bg)]`, `text-[var(--grilla-muted)]`, etc. Arbitrary values para radios/spacing puntuales (`rounded-[22px]`, `px-[18px]`).

El gradiente del header y el truco `brightness(0) invert(1)` del logo van hardcoded en `GrillaHeader.tsx` (son parte del header, no del tema).

**Tipografía:** Poppins ya tiene que estar disponible en el proyecto (verificar `layout.tsx`/`next/font`). Si no, sumarla.

---

## Comportamiento

### Responsive
- Breakpoint único: `md` de Tailwind (768px).
- Ambos layouts viven en el DOM; se ocultan con `hidden md:block` y `md:hidden`. Esto evita listener de resize, mismatches de hidratación y rehidrataciones extra.

### Mobile — interacción
- `DayTabs` cambia el `activeDay` (state en `GrillaHoraria`).
- `SlotList` re-renderiza con `data.schedule` filtrado al día activo.
- Día activo por defecto: `'Lunes'`.
- Transición de tab: `transition-all duration-200` (background + font-weight).

### Desktop
- Sin interacción. Tabla estática con scroll horizontal si el viewport es angosto (`overflow-x-auto`, tabla `min-w-[720px]`).

### Estados de página
| Caso | Comportamiento |
|---|---|
| Slug no existe o sede `active: false` | `notFound()` → 404 de Next |
| `getGrilla` devuelve `null` | Header completo + placeholder centrado "Próximamente publicamos los horarios de esta sede." |
| `getGrilla` lanza error (red, 5xx) | Lo mismo que `null`, con mensaje genérico de error |
| `getGrilla` ok pero `schedule` vacío | Mismo placeholder |

---

## Assets

- Logo del header: usar el que ya está en `public/` del proyecto. Se renderiza dentro de un crop `88×38px overflow:hidden` con `filter: brightness(0) invert(1)` para que quede blanco sobre el gradiente. Verificar el filename exacto antes de implementar (probable: `/images/logo-clic.webp` o equivalente).

---

## Plan de migración futuro (fuera de scope)

1. Backend expone endpoint para todas las sedes.
2. Se setea `NEXT_PUBLIC_GRILLA_API` en el deploy.
3. Se borra `grilla-mock.ts`.
4. Se redirige `/horarios/[sede]` → `/grilla/[sede]` (o se reemplaza el contenido del page).
5. Se borra `HorariosTable.tsx` y `lib/stein.ts`.

---

## Archivos a crear

- `src/app/grilla/[sede]/page.tsx`
- `src/lib/grilla.ts`
- `src/lib/grilla-mock.ts`
- `src/components/grilla/GrillaHoraria.tsx`
- `src/components/grilla/GrillaHeader.tsx`
- `src/components/grilla/GrillaLegend.tsx`
- `src/components/grilla/DayTabs.tsx`
- `src/components/grilla/SlotList.tsx`
- `src/components/grilla/SlotCard.tsx`
- `src/components/grilla/ScheduleTable.tsx`
- `src/components/grilla/SlotContent.tsx`

## Archivos a modificar

- `src/app/globals.css` (agregar tokens `--grilla-*`)
- `src/app/layout.tsx` (solo si Poppins no está ya cargado)
