import { locations } from '@/lib/locations'

interface PageProps {
  params: Promise<{
    sede: string
  }>
}

async function getHorarios(sheetName: string) {
  const urlStein = `https://api.steinhq.com/v1/storages/69933325affba40a624eb247/${sheetName}`;
  
  const res = await fetch(urlStein, {
    cache: 'no-store' // Para que siempre traiga los datos frescos del Sheet
  });

  if (!res.ok) {
    throw new Error(`Error al cargar los horarios para la sede ${sheetName}`);
  }

  return res.json();
}

function parseTime(timeStr: string): number {
  if (!timeStr) return 0;
  const str = timeStr.toLowerCase().trim();
  const isPm = str.includes('pm');
  const isAm = str.includes('am');
  
  // Eliminar caracteres no numéricos excepto : y .
  const cleanStr = str.replace(/[^0-9:.]/g, '');
  let [h, m] = cleanStr.split(/[:.]/).map(n => parseInt(n, 10));
  
  if (isNaN(h)) h = 0;
  if (isNaN(m)) m = 0;

  if (isPm && h < 12) h += 12;
  if (isAm && h === 12) h = 0;
  
  return h * 60 + m;
}

export default async function SedeHorarios({ params }: PageProps) {
  const { sede } = await params
  
  const location = locations.find(loc => loc.location === sede)

  if (!location) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-red-500'>Sede no encontrada</h1>
          <p className='text-lg text-gray-600 mt-4'>La sede "{sede}" no existe en nuestro sistema.</p>
          <p className='text-sm text-gray-500 mt-2'>Sedes disponibles: {locations.map(l => l.location).join(', ')}</p>
        </div>
      </div>
    )
  }

  const horarios = await getHorarios(sede);

  if (!Array.isArray(horarios) || horarios.length === 0) {
    return (
      <main className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 capitalize text-gray-800">Horarios {sede}</h1>
          <p className="text-lg text-gray-600">No hay horarios disponibles en este momento.</p>
        </div>
      </main>
    )
  }

  // Estructura definida:
  // 0: ID (ignorar)
  // 1: Día
  // 2: Horario
  // 3: Nivel
  // 4: Disponibilidad
  const keys = Object.keys(horarios[0]);
  const dayKey = keys[1];
  const timeKey = keys[2];
  const levelKey = keys[3];
  const availKey = keys[4];

  // Agrupar datos por horario para construir la grilla
  const schedule: Record<string, Record<string, { level: string, availability: string }>> = {};
  const timesSetMF = new Set<string>();
  const timesSetSat = new Set<string>();
  const weekDays = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

  horarios.forEach((row: any) => {
    const time = row[timeKey];
    const day = row[dayKey];
    
    if (time && day) {
      const normalizedTime = time.trim();
      // Normalizar día (quitar acentos y minúsculas) para facilitar la búsqueda
      const normalizedDay = day.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      if (!schedule[normalizedTime]) {
        schedule[normalizedTime] = {};
      }
      
      schedule[normalizedTime][normalizedDay] = {
        level: row[levelKey],
        availability: row[availKey]
      };

      if (normalizedDay === 'sabado') {
        timesSetSat.add(normalizedTime);
      } else if (weekDays.includes(normalizedDay)) {
        timesSetMF.add(normalizedTime);
      }
    }
  });

  // Ordenar horarios cronológicamente
  const sortedTimesMF = Array.from(timesSetMF).sort((a, b) => parseTime(a) - parseTime(b));
  const sortedTimesSat = Array.from(timesSetSat).sort((a, b) => parseTime(a) - parseTime(b));
  const maxRows = Math.max(sortedTimesMF.length, sortedTimesSat.length);
  
  // Helper para obtener datos de un día específico en una fila de horario
  const getCellData = (timeRow: any, day: string) => timeRow ? timeRow[day] : null;

  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center capitalize text-gray-800">
          Horarios {sede}
        </h1>
        
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                {/* Columna Horario Principal */}
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider sticky left-0 bg-gray-800 z-20 shadow-md">
                  Horario
                </th>
                
                {/* Columnas Lunes a Viernes */}
                {weekDays.map((day) => (
                  <th key={day} className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[150px]">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </th>
                ))}

                {/* Sección Sábado (Horario + Sábado) */}
               
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider bg-gray-700 min-w-[150px]">
                  Sábado
                </th>
                 <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider border-l-2 border-gray-600 bg-gray-700">
                  Horario
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.from({ length: maxRows }).map((_, rowIndex) => {
                const timeMF = sortedTimesMF[rowIndex];
                const timeSat = sortedTimesSat[rowIndex];
                
                const rowDataMF = timeMF ? schedule[timeMF] : null;
                const rowDataSat = timeSat ? schedule[timeSat] : null;
                const saturdayData = getCellData(rowDataSat, 'sabado');

                return (
                  <tr 
                    key={rowIndex} 
                    className={`hover:bg-gray-50 transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    {/* Valor Horario Principal */}
                    <td className={`px-6 py-4 text-sm font-bold text-gray-900 whitespace-nowrap sticky left-0 z-10 shadow-sm ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      {timeMF || ''}
                    </td>

                    {/* Valores Lunes a Viernes */}
                    {weekDays.map((day) => {
                      const cell = getCellData(rowDataMF, day);
                      return (
                        <td key={day} className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                          {cell ? (
                            <div className="flex flex-col">
                              <span className="font-medium">{cell.level}</span>
                              {cell.availability && <span className="text-xs text-gray-500">{cell.availability}</span>} 
                            </div>
                          ) : '-'}
                        </td>
                      );
                    })}

                    {/* Valores Sábado */}
                   
                    <td className={`px-6 py-4 text-sm text-gray-700 whitespace-nowrap ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}>
                      {saturdayData ? (
                        <div className="flex flex-col">
                          <span className="font-medium">{saturdayData.level}</span>
                          {saturdayData.availability && <span className="text-xs text-gray-500">{saturdayData.availability}</span>}
                        </div>
                      ) : '-'}
                    </td>
                     <td className={`px-6 py-4 text-sm font-bold text-gray-900 whitespace-nowrap border-l-2 border-gray-200 ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}>
                      {timeSat || ''}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
