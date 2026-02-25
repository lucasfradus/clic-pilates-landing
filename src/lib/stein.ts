const STEIN_BASE_URL = 'https://api.steinhq.com/v1/storages/69933325affba40a624eb247'

export interface HorarioRow {
  [key: string]: string | undefined
}

export interface ScheduleCell {
  level: string
  availability: string
}

export type ScheduleGrid = Record<string, Record<string, ScheduleCell>>

export interface ParsedSchedule {
  schedule: ScheduleGrid
  sortedTimesMF: string[]
  sortedTimesSat: string[]
  maxRows: number
  weekDays: readonly string[]
}

const WEEK_DAYS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'] as const

/**
 * Obtiene los horarios desde la API de Stein (Google Sheets).
 * @param sheetName - Nombre de la hoja/sede (ej: "office", "pilara")
 */
export async function getHorarios (sheetName: string): Promise<HorarioRow[]> {
  const url = `${STEIN_BASE_URL}/${sheetName}`
  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error(`Error al cargar los horarios para la sede ${sheetName}`)
  }

  const data = await res.json()
  return Array.isArray(data) ? data : []
}

/**
 * Parsea un string de horario (ej. "9:00 AM") a minutos desde medianoche para ordenar.
 */
export function parseTime (timeStr: string): number {
  if (!timeStr) return 0
  const str = String(timeStr).toLowerCase().trim()
  const isPm = str.includes('pm')
  const isAm = str.includes('am')
  const cleanStr = str.replace(/[^0-9:.]/g, '')
  const [h, m] = cleanStr.split(/[:.]/).map((n) => parseInt(n, 10))
  let hour = isNaN(h) ? 0 : h
  const min = isNaN(m) ? 0 : m
  if (isPm && hour < 12) hour += 12
  if (isAm && hour === 12) hour = 0
  return hour * 60 + min
}

function normalizeForMatch (s: string): string {
  return s
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Detecta las columnas por nombre.
 * Orden en el JSON de Stein: IdHorario (no usar), Dia, Horario, Nivel, Disponibilidad.
 * Importante: "Horario" es la hora de la clase; "IdHorario" es un ID interno y no debe usarse.
 */
function getColumnKeys (firstRow: HorarioRow): { dayKey: string, timeKey: string, levelKey: string, availKey: string } {
  const keys = Object.keys(firstRow)
  const normalizedKeys = keys.map((k) => ({ original: k, norm: normalizeForMatch(k) }))

  const findKey = (names: string[]): string => {
    for (const name of names) {
      const n = normalizeForMatch(name)
      const found = normalizedKeys.find(({ norm }) => norm.includes(n) || n.includes(norm))
      if (found) return found.original
    }
    return ''
  }

  // Horario: debe ser la columna "Horario", NO "IdHorario" (que también contiene "horario")
  const timeKey =
    normalizedKeys.find(({ norm }) => norm === 'horario')?.original ??
    keys[2]
  const dayKey = findKey(['dia', 'día']) || keys[1]
  const levelKey = findKey(['nivel']) || keys[3]
  const availKey = findKey(['disponibilidad']) || keys[4]

  return { dayKey, timeKey, levelKey, availKey }
}

/**
 * Convierte la respuesta de Stein en una grilla por horario y día.
 * Columnas: IdHorario (0, no se usa), Dia (1), Horario (2), Nivel (3), Disponibilidad (4).
 */
export function parseHorarios (horarios: HorarioRow[]): ParsedSchedule | null {
  if (horarios.length === 0) return null

  const { dayKey, timeKey, levelKey, availKey } = getColumnKeys(horarios[0])
  const schedule: ScheduleGrid = {}
  const timesSetMF = new Set<string>()
  const timesSetSat = new Set<string>()

  for (const row of horarios) {
    const time = row[timeKey]
    const day = row[dayKey]
    if (!time || !day) continue

    const normalizedTime = String(time).trim()
    const normalizedDay = String(day)
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    if (!schedule[normalizedTime]) schedule[normalizedTime] = {}
    schedule[normalizedTime][normalizedDay] = {
      level: row[levelKey] ?? '',
      availability: row[availKey] ?? ''
    }

    if (normalizedDay === 'sabado') {
      timesSetSat.add(normalizedTime)
    } else if (WEEK_DAYS.includes(normalizedDay as typeof WEEK_DAYS[number])) {
      timesSetMF.add(normalizedTime)
    }
  }

  const sortedTimesMF = Array.from(timesSetMF).sort((a, b) => parseTime(a) - parseTime(b))
  const sortedTimesSat = Array.from(timesSetSat).sort((a, b) => parseTime(a) - parseTime(b))
  const maxRows = Math.max(sortedTimesMF.length, sortedTimesSat.length)

  return {
    schedule,
    sortedTimesMF,
    sortedTimesSat,
    maxRows,
    weekDays: WEEK_DAYS
  }
}
