# Grilla Sábado Independiente — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mostrar los horarios del sábado en una tabla propia adyacente a la grilla de lunes a viernes, sin filas vacías ni desalineación cuando los horarios no coinciden.

**Architecture:** Se parte el `Schedule` en dos sub-schedules (`weekdays` y `saturday`) mediante un helper puro en `grilla.ts`. `ScheduleTable` pasa a renderizar dos tablas adyacentes, cada una con su propio conjunto de horarios. Cambios sólo en desktop; mobile no se toca.

**Tech Stack:** Next.js (App Router), TypeScript, React, ts-standard (lint), CSS variables existentes para tema.

**Spec:** [docs/superpowers/specs/2026-05-20-grilla-saturday-column-design.md](../specs/2026-05-20-grilla-saturday-column-design.md)

**Note on testing:** Este repo no tiene framework de tests unitarios (ver `package.json`). Verificación: `npm run lint` + `npm run build` + smoke test manual en navegador. Sigue el patrón establecido en trabajo previo de grilla.

**Note on cwd:** Todos los comandos `npm` corren desde `clic-pilates-landing/` (no desde la raíz `clic-pilates-web/`). Ver memoria 3427.

---

## File Structure

- **Modify** [src/lib/grilla.ts](../../src/lib/grilla.ts): exportar `WEEKDAYS` y agregar `splitWeekdaysAndSaturday()`.
- **Modify** [src/components/grilla/ScheduleTable.tsx](../../src/components/grilla/ScheduleTable.tsx): refactor a dos tablas adyacentes. Extraer una sub-tabla reusable internamente.

No se crean archivos nuevos. No se tocan: `GrillaHoraria.tsx`, `SlotList.tsx`, `SlotCard.tsx`, `DayTabs.tsx`, `GrillaHeader.tsx`, `GrillaLegend.tsx`, `SlotContent.tsx`, `page.tsx`.

---

### Task 1: Exportar constante `WEEKDAYS` en grilla.ts

**Files:**
- Modify: `src/lib/grilla.ts` (después de la línea `export const DAYS: readonly Day[] = [...]`)

- [ ] **Step 1: Agregar la constante**

Editar [src/lib/grilla.ts](../../src/lib/grilla.ts), inmediatamente después de la línea actual:

```ts
export const DAYS: readonly Day[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
```

Agregar:

```ts
export const WEEKDAYS: readonly Day[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
```

- [ ] **Step 2: Verificar lint**

```bash
npm run lint
```

Expected: sin errores nuevos.

- [ ] **Step 3: Commit**

```bash
git add src/lib/grilla.ts
git commit -m "feat(grilla): export WEEKDAYS constant"
```

---

### Task 2: Agregar helper `splitWeekdaysAndSaturday`

**Files:**
- Modify: `src/lib/grilla.ts` (al final del archivo, después de `getGrilla`)

- [ ] **Step 1: Agregar el helper**

Agregar al final de [src/lib/grilla.ts](../../src/lib/grilla.ts):

```ts
/**
 * Parte un `Schedule` en dos sub-schedules independientes:
 *  - `weekdays`: sólo días Lunes a Viernes. Descarta filas donde ningún día tiene slot no nulo.
 *  - `saturday`: sólo día Sábado. Descarta filas donde el slot es null/undefined.
 *
 * Permite renderizar el sábado en una tabla aparte cuando sus horarios no
 * coinciden con los de entre semana.
 */
export function splitWeekdaysAndSaturday (schedule: Schedule): { weekdays: Schedule, saturday: Schedule } {
  const weekdays: Schedule = {}
  const saturday: Schedule = {}

  for (const [time, day] of Object.entries(schedule)) {
    const weekdayRow: DaySchedule = {}
    let hasWeekday = false
    for (const d of WEEKDAYS) {
      const slot = day[d] ?? null
      weekdayRow[d] = slot
      if (slot != null) hasWeekday = true
    }
    if (hasWeekday) weekdays[time] = weekdayRow

    const satSlot = day['Sábado'] ?? null
    if (satSlot != null) saturday[time] = { Sábado: satSlot }
  }

  return { weekdays, saturday }
}
```

- [ ] **Step 2: Verificar lint y build**

```bash
npm run lint
npm run build
```

Expected: lint sin errores nuevos; build OK.

- [ ] **Step 3: Commit**

```bash
git add src/lib/grilla.ts
git commit -m "feat(grilla): add splitWeekdaysAndSaturday helper"
```

---

### Task 3: Refactor `ScheduleTable` a dos tablas adyacentes

**Files:**
- Modify: `src/components/grilla/ScheduleTable.tsx` (reemplazo completo del componente)

- [ ] **Step 1: Reemplazar el archivo completo**

Reemplazar el contenido entero de [src/components/grilla/ScheduleTable.tsx](../../src/components/grilla/ScheduleTable.tsx) con:

```tsx
import { formatTimeRange, sortTimes, splitWeekdaysAndSaturday, WEEKDAYS, type Day, type Schedule } from '@/lib/grilla'
import { SlotContent } from './SlotContent'

interface Props {
  schedule: Schedule
}

export function ScheduleTable ({ schedule }: Props): React.ReactElement {
  const { weekdays, saturday } = splitWeekdaysAndSaturday(schedule)
  const hasWeekdays = Object.keys(weekdays).length > 0
  const hasSaturday = Object.keys(saturday).length > 0

  return (
    <div className='flex gap-4 overflow-x-auto px-6 pb-10'>
      {hasWeekdays && <SubTable schedule={weekdays} days={WEEKDAYS} minWidthPx={760} />}
      {hasSaturday && <SubTable schedule={saturday} days={['Sábado']} minWidthPx={260} />}
    </div>
  )
}

interface SubTableProps {
  schedule: Schedule
  days: readonly Day[]
  minWidthPx: number
}

function SubTable ({ schedule, days, minWidthPx }: SubTableProps): React.ReactElement {
  const times = sortTimes(Object.keys(schedule))
  const lastDayIdx = days.length - 1

  return (
    <table
      className='border-collapse'
      style={{ minWidth: minWidthPx, color: 'var(--grilla-text)' }}
    >
      <thead>
        <tr>
          <th
            className='px-3.5 py-[11px] text-center text-[10px] font-semibold uppercase tracking-[0.09em]'
            style={{
              background: 'var(--grilla-table-header-bg)',
              color: 'var(--grilla-table-header-text)',
              borderRadius: '8px 0 0 0',
              minWidth: 140
            }}
          >
            Horario
          </th>
          {days.map((day, idx) => (
            <th
              key={day}
              className='px-3.5 py-[11px] text-center text-[10px] font-semibold uppercase tracking-[0.09em]'
              style={{
                background: 'var(--grilla-table-header-bg)',
                color: 'var(--grilla-table-header-text)',
                borderLeft: '1px solid var(--grilla-border)',
                borderRadius: idx === lastDayIdx ? '0 8px 0 0' : undefined,
                minWidth: 130
              }}
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {times.map((time, rowIdx) => {
          const rowBg = rowIdx % 2 === 0 ? 'var(--grilla-card-bg)' : 'var(--grilla-row-alt-bg)'
          const daySchedule = schedule[time]
          return (
            <tr key={time} style={{ background: rowBg }}>
              <td
                className='px-3.5 py-[9px] text-center text-[13px] font-semibold whitespace-nowrap'
                style={{
                  background: 'var(--grilla-time-bg)',
                  borderBottom: '1px solid var(--grilla-border)'
                }}
              >
                {formatTimeRange(time)}
              </td>
              {days.map((day) => (
                <td
                  key={day}
                  className='px-3.5 py-[9px] text-center align-middle'
                  style={{
                    borderBottom: '1px solid var(--grilla-border)',
                    borderLeft: '1px solid var(--grilla-border)'
                  }}
                >
                  <SlotContent slot={daySchedule[day]} size='desktop' />
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
```

Notas:
- Se mantiene exactamente el styling (clases Tailwind, vars CSS, anchos mínimos, radios) del componente original.
- El contenedor pasa de `overflow-x-auto px-6 pb-10` a `flex gap-4 overflow-x-auto px-6 pb-10` para alojar las dos tablas lado a lado con un gap de 16px.
- Se reduce `minWidth` de la tabla de sábado a 260px (140 del horario + 130 del día + holgura) para que no fuerce ancho innecesario.
- Si no hay sábado, sólo se renderiza la tabla izquierda; ocupa el ancho disponible.
- Si no hay días de entre semana (caso degenerado), sólo se renderiza la de sábado.

- [ ] **Step 2: Verificar lint**

```bash
npm run lint
```

Expected: sin errores.

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Expected: build OK, sin errores de tipos.

- [ ] **Step 4: Smoke test manual**

Levantar el server prod:

```bash
npm run start
```

Abrir en navegador:
- `/grilla/hollywood` → ver dos tablas: lunes-viernes a la izquierda con horarios 7.45/8.45/9.45/10.45/14.00/…, y sábado a la derecha con sus propios horarios (9.00, 10.00, 11.00, …). No deben quedar filas vacías en la tabla de lun-vie.
- Probar otra sede que no tenga sábado (si existe) → sólo debe verse la tabla de lun-vie.
- Mobile (resize a <768px) → sin cambios visibles vs. antes; el tab de sábado funciona igual.

- [ ] **Step 5: Commit**

```bash
git add src/components/grilla/ScheduleTable.tsx
git commit -m "feat(grilla): split saturday into its own adjacent table"
```

---

## Self-Review

- **Spec coverage**:
  - "Tabla izquierda Lun-Vie filtrada" → Task 2 (`weekdays`) + Task 3 (SubTable izquierda). ✓
  - "Tabla derecha Sábado con horarios propios" → Task 2 (`saturday`) + Task 3 (SubTable derecha). ✓
  - "Helper `splitWeekdaysAndSaturday`" → Task 2. ✓
  - "WEEKDAYS constant" → Task 1. ✓
  - "Sin cambios mobile" → no se toca SlotList/DayTabs. ✓
  - "Sede sin sábado → tabla derecha no se renderiza" → Task 3, `hasSaturday` flag. ✓
  - "Sede sin entre semana" → Task 3, `hasWeekdays` flag. ✓
  - "Sábado con horarios que coinciden con lun-vie" → Task 2 los pone en `saturday` igualmente; aparece en tabla derecha. ✓
- **Placeholder scan**: sin TBD/TODO. Todo código completo.
- **Type consistency**: `Schedule`, `DaySchedule`, `Day`, `WEEKDAYS`, `splitWeekdaysAndSaturday`, `SlotContent` referenciados consistentemente entre tasks.
