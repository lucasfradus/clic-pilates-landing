import type { ParsedSchedule } from '@/lib/stein'

interface HorariosTableProps {
  data: ParsedSchedule
  /** Clases para el contenedor (main o wrapper) */
  className?: string
  /** Si true, usa estilos más neutros (gris/blanco). Si false, usa tema del sitio (accent/background). */
  variant?: 'default' | 'neutral'
}

function getCellData (
  rowData: Record<string, { level: string; availability: string }> | null,
  day: string
): { level: string; availability: string } | null {
  return rowData?.[day] ?? null
}

export function HorariosTable ({ data, className = '', variant = 'default' }: HorariosTableProps): React.ReactElement {
  const { schedule, sortedTimesMF, sortedTimesSat, maxRows, weekDays } = data

  const isNeutral = variant === 'neutral'

  const thClass = isNeutral
    ? 'px-2 py-1.5 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider bg-gray-800 text-white'
    : 'px-2 py-1.5 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider bg-accent text-accent-foreground'
  const thSatClass = isNeutral
    ? 'px-2 py-1.5 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider bg-gray-700 text-white min-w-[70px] md:min-w-[150px]'
    : 'px-2 py-1.5 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider bg-accent/90 text-accent-foreground min-w-[70px] md:min-w-[150px]'
  const thSticky = isNeutral ? 'sticky left-0 bg-gray-800 z-20 shadow-md' : 'sticky left-0 bg-accent z-20 shadow-md'
  const tdStickyBase = isNeutral ? 'bg-white' : 'bg-background'
  const tdStickyAlt = isNeutral ? 'bg-gray-50' : 'bg-muted'
  const rowBase = isNeutral ? 'bg-white' : 'bg-background'
  const rowAlt = isNeutral ? 'bg-gray-50' : 'bg-muted/20'
  const tdSat = isNeutral ? 'bg-gray-50' : 'bg-muted/20'
  const tdSatAlt = isNeutral ? 'bg-gray-100' : 'bg-muted/30'
  const borderTable = isNeutral ? 'border-gray-200' : 'border-border'

  function CellContent ({ cell }: { cell: { level: string; availability: string } }) {
    return (
      <div className='flex flex-col min-h-[2.5rem] md:min-h-0 justify-center'>
        <span className='font-medium'>{cell.level}</span>
        {cell.availability && (
          <span className='text-[10px] md:text-xs text-muted-foreground'>{cell.availability}</span>
        )}
      </div>
    )
  }

  return (
    <div className={`overflow-x-auto rounded-lg border shadow-sm ${borderTable} ${className}`}>
      <table className='min-w-full border-collapse text-xs md:text-sm'>
        <thead>
          <tr>
            <th className={`${thClass} ${thSticky} min-w-[52px] md:min-w-[100px]`}>
              Horario
            </th>
            {weekDays.map((day) => (
              <th key={day} className={`${thClass} min-w-[70px] md:min-w-[150px]`}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </th>
            ))}
            <th className={thSatClass}>
              Sábado
            </th>
            <th className={`${thSatClass} border-l-2 ${isNeutral ? 'border-gray-600' : 'border-accent/50'}`}>
              Horario
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-border'>
          {Array.from({ length: maxRows }).map((_, rowIndex) => {
            const timeMF = sortedTimesMF[rowIndex]
            const timeSat = sortedTimesSat[rowIndex]
            const rowDataMF = timeMF ? schedule[timeMF] : null
            const rowDataSat = timeSat ? schedule[timeSat] : null
            const saturdayData = getCellData(rowDataSat, 'sabado')
            const isEven = rowIndex % 2 === 0

            return (
              <tr
                key={rowIndex}
                className={`transition-colors hover:opacity-95 ${isEven ? rowBase : rowAlt}`}
              >
                <td
                  className={`px-2 py-1.5 md:px-6 md:py-4 font-bold text-foreground whitespace-nowrap sticky left-0 z-10 shadow-sm ${isEven ? tdStickyBase : tdStickyAlt}`}
                >
                  {timeMF ?? ''} hs
                </td>
                {weekDays.map((day) => {
                  const cell = getCellData(rowDataMF, day)
                  return (
                    <td
                      key={day}
                      className='px-1 py-1 md:px-6 md:py-4 text-foreground whitespace-nowrap align-top'
                    >
                      {cell ? (
                        <CellContent cell={cell} />
                      ) : (
                        '-'
                      )}
                    </td>
                  )
                })}
                <td
                  className={`px-1 py-1 md:px-6 md:py-4 text-foreground whitespace-nowrap align-top ${isEven ? tdSat : tdSatAlt}`}
                >
                  {saturdayData ? (
                    <CellContent cell={saturdayData} />
                  ) : (
                    '-'
                  )}
                </td>
                <td
                  className={`px-2 py-1.5 md:px-6 md:py-4 font-bold text-foreground whitespace-nowrap border-l-2 border-border ${isEven ? tdSat : tdSatAlt}`}
                >
                  {timeSat ? (
                    timeSat +' hs'
                  ) : (
                    '-'
                  )}
                  
                 
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
