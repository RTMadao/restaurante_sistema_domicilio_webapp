import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'

TimeAgo.addLocale(es)
const timeAgo = new TimeAgo('es')

export const getTimeAgo = (time) => timeAgo.format(time)

export const formatoFecha = (fecha) => new Date(fecha).toLocaleDateString('es-CO', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

export const formatoFechaFactura = (fecha) => new Date(fecha).toLocaleDateString('es-CO', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false
})
