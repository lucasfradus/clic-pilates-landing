// src/lib/grilla.ts
export type Status = 'd' | 'b' | 'n' | 'p'
export type Level = 'Inicial' | 'Level Up' | 'Próx'
export type Day = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado'

export interface SlotData {
  /**
   * Nombre de la actividad tal cual viene del backend (ej. "Inicial", "Level Up", "Embarazadas", "Entrenamientos").
   * Es la fuente de verdad para mostrar la clase. Optional solo por el período de coexistencia con `l`.
   */
  activity?: string
  s: Status
  /** @deprecated Reemplazado por `activity`. Se va a retirar en el corte final del backend. */
  l?: Level
}

export type DaySchedule = Partial<Record<Day, SlotData | null>>

export interface Schedule {
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
export const WEEKDAYS: readonly Day[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

export interface SaturdaySlot {
  /** Horario real del slot de sábado (puede diferir del `rowTime` de la fila donde se ubica). */
  time: string
  slot: SlotData
}

export interface GridRow {
  /** Hora que ancla la fila — siempre un horario de clase de lun-vie. */
  rowTime: string
  /** Slots de lunes a viernes en esta fila. */
  weekday: DaySchedule
  /** Slots de sábado asignados a esta fila por cercanía. Pueden ser 0, 1 o más; se apilan en la celda. */
  saturdaySlots: SaturdaySlot[]
}

/**
 * Arma las filas de la grilla desktop combinando lun-vie con sábado.
 *
 * Cada fila representa un horario de clase de lun-vie. Cada slot de sábado se
 * asigna a la fila lun-vie con la hora más cercana, sin tolerancia. Si dos o
 * más sábados caen en la misma fila, se apilan en la celda. No se generan
 * filas extras: la cantidad de filas siempre es igual a la cantidad de
 * horarios de lun-vie con clases.
 */
export function buildGridRows (schedule: Schedule): GridRow[] {
  const weekdayTimes = sortTimes(
    Object.keys(schedule).filter((t) => WEEKDAYS.some((d) => schedule[t][d] != null))
  )

  const rows: GridRow[] = weekdayTimes.map((wt) => {
    const weekday: DaySchedule = {}
    for (const day of WEEKDAYS) weekday[day] = schedule[wt][day] ?? null
    return { rowTime: wt, weekday, saturdaySlots: [] }
  })

  if (rows.length === 0) return rows

  const saturdaySlots: SaturdaySlot[] = []
  for (const t of Object.keys(schedule)) {
    const s = schedule[t]['Sábado']
    if (s != null) saturdaySlots.push({ time: t, slot: s })
  }

  for (const sat of saturdaySlots) {
    const satNum = parseFloat(sat.time)
    let bestIdx = 0
    let bestDist = Infinity
    for (let i = 0; i < rows.length; i++) {
      const d = Math.abs(parseFloat(rows[i].rowTime) - satNum)
      if (d < bestDist) { bestDist = d; bestIdx = i }
    }
    rows[bestIdx].saturdaySlots.push(sat)
  }

  for (const row of rows) {
    row.saturdaySlots.sort((a, b) => parseFloat(a.time) - parseFloat(b.time))
  }

  return rows
}

const DEFAULT_API_BASE = 'https://app.clicpilates.com/api/v1'

/**
 * Ordena claves de horario "H.MM" numéricamente ascendente.
 * Ej.: ['10.00','8.00','9.30'] → ['8.00','9.30','10.00']
 */
export function sortTimes (times: string[]): string[] {
  return [...times].sort((a, b) => parseFloat(a) - parseFloat(b))
}

/**
 * Formatea un horario de clase como rango inicio-fin de 1 hora.
 * Ej.: "8.00" → "8.00 - 9.00 hs", "8.30" → "8.30 - 9.30 hs".
 */
export function formatTimeRange (start: string): string {
  const [h, m = '00'] = start.split('.')
  const startHour = parseInt(h, 10)
  return `${start} - ${startHour + 1}.${m} hs`
}

/** Actividades que no se muestran al público (uso interno). */
const HIDDEN_ACTIVITIES = new Set<string>(['Entrenamientos'])

/**
 * Reemplaza los slots de actividades ocultas por null y descarta filas vacías.
 */
function sanitizeSchedule (schedule: Schedule): Schedule {
  const result: Schedule = {}
  for (const [time, day] of Object.entries(schedule)) {
    const filtered: DaySchedule = {}
    let hasAny = false
    for (const [d, slot] of Object.entries(day) as Array<[Day, SlotData | null | undefined]>) {
      if (slot != null && slot.activity != null && HIDDEN_ACTIVITIES.has(slot.activity)) {
        filtered[d] = null
        continue
      }
      filtered[d] = slot ?? null
      if (slot != null) hasAny = true
    }
    if (hasAny) result[time] = filtered
  }
  return result
}

/**
 * Obtiene la grilla horaria de un centro.
 *
 * - Base URL: `NEXT_PUBLIC_GRILLA_API` si está seteada; si no, la URL de producción.
 * - 404/409 → null (centro existe pero no fue migrado todavía).
 * - Cualquier otro error de red o 5xx propaga.
 * - Filtra actividades internas (ver `HIDDEN_ACTIVITIES`) y descarta filas vacías.
 *
 * Devuelve null cuando el centro no tiene grilla disponible.
 */
export async function getGrilla (slug: string): Promise<ScheduleResponse | null> {
  const base = process.env.NEXT_PUBLIC_GRILLA_API ?? DEFAULT_API_BASE
  const res = await fetch(`${base}/centers/${slug}/schedule`, { cache: 'no-store' })
  if (res.status === 404 || res.status === 409) return null
  if (!res.ok) throw new Error(`Grilla API ${res.status} for ${slug}`)
  const data = await res.json() as ScheduleResponse
  return { ...data, schedule: sanitizeSchedule(data.schedule) }
}
