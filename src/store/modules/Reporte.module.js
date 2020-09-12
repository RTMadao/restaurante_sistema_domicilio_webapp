import { peticiones } from '../../apis/httpRequest'
import { formatoFecha } from '../../formatData/time'

export const reporteModule = {
  namespaced: true,
  state: {
    encabezadoTabla: [
      { text: 'Fecha', value: 'fecha' },
      { text: 'SubTotal', value: 'subtotalVenta' },
      { text: 'Total Domicilios', value: 'totalDomicilio' },
      { text: 'Total', value: 'totalVendido' }
    ],
    listaReportes: [],
    Seleccionado: undefined
  },
  getters: {
    lista: state => state.listaReportes.map(reporte => {
      return {
        id: reporte._id,
        fecha: formatoFecha(reporte.fecha),
        subtotalVenta: (!reporte.subtotalVenta) ? '$0' : '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(reporte.subtotalVenta),
        totalDomicilio: (!reporte.totalDomicilio) ? '$0' : '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(reporte.totalDomicilio),
        totalVendido: (!reporte.totalVendido) ? '$0' : '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(reporte.totalVendido)
      }
    }),
    headers: state => state.encabezadoTabla,
    seleccionado: state => {
      if (state.Seleccionado === undefined) return undefined
      else {
        return {
          id: state.Seleccionado._id,
          fecha: formatoFecha(state.Seleccionado.fecha),
          platos: state.Seleccionado.platosVendidos,
          subtotalVenta: (!state.Seleccionado.subtotalVenta) ? '$0' : '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(state.Seleccionado.subtotalVenta),
          descuentos: (!state.Seleccionado.descuentos) ? '$0' : '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(state.Seleccionado.descuentos),
          totalDomicilio: (!state.Seleccionado.totalDomicilio) ? '$0' : '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(state.Seleccionado.totalDomicilio),
          totalVendido: (!state.Seleccionado.totalVendido) ? '$0' : '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(state.Seleccionado.totalVendido)
        }
      }
    }
  },
  mutations: {
    SOCKET_reportes (state, reportes) {
      state.listaReportes = reportes
    },
    setLista (state, listaReportes) {
      state.listaReportes = listaReportes
    },
    setReporte (state, reporte) {
      state.Seleccionado = reporte
    },
    setEstaModificando (state) {
      state.estaModificando = !state.estaModificando
    },
    setSelectedReporte (state, id) {
      state.Seleccionado = state.listaReportes.find(reporte => reporte._id === id)
    }
  },
  actions: {
    select ({ commit }, id) {
      commit('setSelectedReporte', id)
    },
    generarReporte ({ commit, rootState }) {
      peticiones.generar('reporte', rootState.businessInformation.name + '/generar/' + false)
        .then(respuesta => {
          console.log(respuesta)
          if (respuesta.ok) commit('setReporte', respuesta.reporte)
          else {
            peticiones.generar('reporte', rootState.businessInformation.name + '/generar/' + confirm(respuesta.mensaje))
              .then(respuesta => {
                if (respuesta.ok) commit('setReporte', respuesta.reporte)
              })
          }
        })
    }
  }
}
