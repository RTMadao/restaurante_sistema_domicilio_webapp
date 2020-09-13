import { getTimeAgo } from '../../formatData/time'
import { peticiones } from '../../apis/httpRequest'

export const pedidoModule = {
  namespaced: true,
  state: {
    encabezadoTabla: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Barrio', value: 'barrio' },
      { text: 'Total', value: 'total' },
      { text: 'Hora', value: 'fechaHora' },
      { text: 'Acciones', value: 'acciones' },
      { text: '', value: 'data-table-expand' }
    ],
    actions: [
      { index: 0, name: 'marcar como entregado', icon: 'mdi-send' },
      { index: 1, name: 'imprimir', icon: 'mdi-printer' },
      { index: 2, name: 'eliminar', icon: 'mdi-delete' }
    ],
    encabezadoTablaImpresion: [
      { text: 'Descripcion', value: 'nombre' },
      { text: 'Cant', value: 'cantidad' },
      { text: 'Total', value: 'total' }
    ],
    listaPedidos: [],
    selectedPedido: {}
  },
  getters: {
    listaTabla: state => {
      return state.listaPedidos.map(pedido => {
        return {
          id: pedido._id,
          nombre: pedido.cliente.nombre,
          barrio: pedido.cliente.direccion.split('.')[0],
          telefono: (pedido.cliente.telefono) ? pedido.cliente.telefono : '',
          domicilio: (pedido.pedido.valorDomicilio) ? '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(pedido.pedido.valorDomicilio) : 0,
          descuento: (pedido.pedido.descuento) ? '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(pedido.pedido.descuento) : '0',
          total: '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(pedido.pedido.total),
          fechaHora: getTimeAgo(new Date(pedido.pedido.fechaHora)),
          pendiente: pedido.pedido.pendiente,
          comentario: pedido.pedido.comentario
        }
      })
    },
    encabezadoTablaImpresion: state => state.encabezadoTablaImpresion,
    ObtenerPedido: state => state.selectedPedido,
    headers: state => state.encabezadoTabla,
    actions: state => state.actions
  },
  mutations: {
    SOCKET_pedido (state, pedidos) {
      state.listaPedidos = pedidos
    },
    setLista (state, pedidos) {
      state.listaPedidos = pedidos
    },
    setSelectedPedido (state, id) {
      state.selectedPedido = state.listaPedidos.find(pedido => pedido._id === id)
    }
  },
  actions: {
    eliminarPedido ({ commit, rootState }, id) {
      commit('setPedidoTableComponentLoading', true, { root: true })

      peticiones.eliminar('pedido', rootState.businessInformation.name, (id === undefined) ? '' : '/' + id)
        .then(response => {
          console.log(response)
          commit('setPedidoTableComponentLoading', false, { root: true })
        })
        .catch(err => {
          commit('setPedidoTableComponentLoading', false, { root: true })
          alert('Ocurrio un error al intentar eliminar')
          console.log(err)
        })
    },
    selectPedido ({ commit }, id) {
      commit('setSelectedPedido', id)
    },
    marcarPedidoEnviado ({ commit, state, rootState }, id) {
      commit('setSelectedPedido', id)

      state.selectedPedido.pedido.pendiente = false

      peticiones.modificar('pedido', rootState.businessInformation.name, id, state.selectedPedido)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          alert('Ocurrio un error al intentar eliminar')
          console.log(err)
        })
    }
  }
}
