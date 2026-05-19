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

const DEFAULT_API_BASE = 'https://app.clicpilates.com/api/v1'

/**
 * Ordena claves de horario "H.MM" numéricamente ascendente.
 * Ej.: ['10.00','8.00','9.30'] → ['8.00','9.30','10.00']
 */
export function sortTimes (times: string[]): string[] {
  return [...times].sort((a, b) => parseFloat(a) - parseFloat(b))
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
