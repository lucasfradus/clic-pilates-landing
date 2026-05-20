# Grilla Horaria — Columna independiente para Sábado

## Contexto

La grilla horaria muestra una sola columna `HORARIO` compartida entre todos los días. Algunas sedes (ej. Hollywood) tienen clases de sábado en horarios que no coinciden con los de lunes a viernes (sábado a las 9.00, 10.00, 11.00; semana a las 7.45, 8.45, 9.45, 10.45). El resultado actual es una tabla con muchas celdas vacías y filas que mezclan tiempos de distintos días en la misma columna `HORARIO`, lo que confunde al usuario.

## Objetivo

Mostrar los horarios reales del sábado sin desalinear ni dejar huecos en la grilla de lunes a viernes.

## Diseño

### Desktop ([ScheduleTable.tsx](../../src/components/grilla/ScheduleTable.tsx))

Reemplazar la tabla única por dos tablas adyacentes dentro del mismo contenedor scrollable:

- **Tabla izquierda — Semana**: columna `HORARIO` + columnas Lunes a Viernes. Sólo filas cuyos horarios tienen al menos un slot no nulo en algún día de lunes a viernes.
- **Tabla derecha — Sábado**: columna `HORARIO` + columna `SÁBADO`. Sólo filas cuyo horario tiene un slot no nulo en sábado.

Cada tabla mantiene su propio listado de horarios y altura de filas. No se alinean filas entre ambas tablas. Se separan por un gap chico para leerse como dos bloques.

Estilo (header oscuro, bordes, radios, colores) idéntico al actual. Se reutiliza el componente `SlotContent` sin cambios.

### Lógica de datos ([grilla.ts](../../src/lib/grilla.ts))

Agregar helper:

```ts
export function splitWeekdaysAndSaturday(schedule: Schedule): {
  weekdays: Schedule  // sólo días Lun-Vie, sin filas vacías
  saturday: Schedule  // sólo día Sábado, sin filas vacías
}
```

- `weekdays`: para cada `time` en `schedule`, conserva los días Lunes a Viernes; descarta la fila si ninguno tiene slot no nulo.
- `saturday`: para cada `time` en `schedule`, conserva sólo `Sábado`; descarta la fila si el slot es null/undefined.

Mantiene el tipo `Schedule` existente. No se introducen nuevos tipos.

### Constantes de días

`DAYS` actualmente exporta los seis días. Para `ScheduleTable` necesitamos iterar sólo sobre Lun-Vie en la tabla izquierda. Opciones:

- Agregar `WEEKDAYS: readonly Day[]` (Lun-Vie) junto a `DAYS` y usarlo en la tabla izquierda. La tabla derecha hardcodea `'Sábado'` como única columna.

Elegimos esta opción para mantener `DAYS` intacto (puede ser usado en otros lugares) y evitar `DAYS.filter(...)` repetido.

### Mobile

Sin cambios. `SlotList` / `DayTabs` ya muestran cada día por separado, y el tab de Sábado renderiza sus propios horarios.

### Edge cases

- **Sede sin clases de sábado**: `saturday` queda vacío → tabla derecha no se renderiza; izquierda ocupa todo el ancho.
- **Sede sin clases entre semana** (improbable): `weekdays` vacío → no se renderiza la tabla izquierda.
- **Horarios de sábado que coinciden con lun-vie** (ej. 9.45): aparecen en su propia fila en la tabla derecha; no se mezclan con la izquierda.
- **Empty state global** (ya manejado en page.tsx): no cambia.

## No incluido

- Cambios en mobile.
- Refactor del orquestador `GrillaHoraria` más allá de pasar los datos partidos a `ScheduleTable`.
- Cambios en backend o en `getGrilla`.
- Tipos nuevos para "weekday-only schedule" / "saturday-only schedule".
