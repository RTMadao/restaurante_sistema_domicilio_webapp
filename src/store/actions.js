import { peticiones } from '../apis/httpRequest'
import router from '@/router/index'
import { StartSocketClient } from '../plugins/vueSocketIO'

export const actions = {
  authenticate (context, user, socket) {
    context.commit('setLoginComponentLoading', true)
    peticiones.authenticate({
      nombre: user.username,
      password: user.password
    }, 'login')
      .then(response => {
        context.commit('setUser', {
          username: response.usuario.nombre,
          restaurant: response.usuario.restaurant
        })
        StartSocketClient(response.usuario.restaurant)
        console.log(this._vm.$socket)
        localStorage.setItem('userSession', JSON.stringify({
          auth: true,
          username: response.usuario.nombre,
          restaurant: response.usuario.restaurant
        }))
        context.commit('setLoginComponentLoading', false)
        router.replace('/pedido')
      })
      .catch(error => {
        context.commit('setLoginError', error)
        context.commit('setLoginComponentLoading', false)
      })
  },
  getDataUser (context) {
    const user = localStorage.getItem('userSession')
    const userActivo = JSON.parse(user)

    context.commit('setUser', {
      username: userActivo.username,
      restaurant: userActivo.restaurant
    })
  },
  logout (context) {
    context.commit('setUser', {
      username: '',
      restaurant: ''
    })
    localStorage.setItem('userSession', JSON.stringify({ auth: false }))
    router.replace('/login')
  },
  clearLogin (context) {
    context.commit('clearLogin')
  },
  changeAgregarItemDialog (context) {
    context.commit('changeAgregarItemDialog')
  },
  changeImprimirFacturaDialog (context) {
    context.commit('changeImprimirFacturaDialog')
  },
  changeimprimirReporteDialog (context) {
    context.commit('changeimprimirReporteDialog')
  },
  changeDomicilioFormDialog (context) {
    context.commit('changeDomicilioFormDialog')
  },
  changeMenuFormDialog (context) {
    context.commit('changeMenuFormDialog')
  },
  guardarNuevoPedido ({ commit, state }, nuevoPedido) {
    commit('setPedidoFormComponentLoading', true)

    nuevoPedido.cliente.direccion = nuevoPedido.cliente.barrio + '.' + nuevoPedido.cliente.direccion

    nuevoPedido.pedido.total = parseInt(nuevoPedido.pedido.valorDomicilio) + parseInt(nuevoPedido.pedido.subtotal) + parseInt(nuevoPedido.pedido.descuento)

    peticiones.registrar(nuevoPedido, state.businessInformation.name, 'pedido')
      .then(response => {
        commit('setPedidoFormComponentLoading', false)
        alert('Pedido Guardado exitosamente')
      })
      .catch(err => {
        commit('setPedidoFormComponentLoading', false)
        alert('Ocurrio un error al intentar guardar el pedido')
        console.log(err)
      })
  }
}
