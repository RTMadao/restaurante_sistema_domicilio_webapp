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
    setTimeout(() => { context.commit('changeAgregarItemDialog') }, 500)
  },
  changeImprimirFacturaDialog (context) {
    setTimeout(() => { context.commit('changeImprimirFacturaDialog') }, 500)
  },
  changeimprimirReporteDialog (context) {
    setTimeout(() => { context.commit('changeimprimirReporteDialog') }, 500)
  },
  changeDomicilioFormDialog (context) {
    setTimeout(() => { context.commit('changeDomicilioFormDialog') }, 500)
  },
  changeMenuFormDialog (context) {
    setTimeout(() => { context.commit('changeMenuFormDialog') }, 500)
  },
  guardarNuevoPedido ({ commit, state }, nuevoPedido) {
    commit('setPedidoFormComponentLoading', true)

    nuevoPedido.cliente.direccion = nuevoPedido.cliente.barrio + '.' + nuevoPedido.cliente.direccion

    nuevoPedido.pedido.total = parseInt(nuevoPedido.pedido.valorDomicilio) + parseInt(nuevoPedido.pedido.subtotal) + parseInt(nuevoPedido.pedido.descuento)

    peticiones.registrar(nuevoPedido, state.businessInformation.name, 'pedido')
      .then(response => {
        commit('setPedidoFormComponentLoading', false)
      })
      .catch(err => {
        commit('setPedidoFormComponentLoading', false)
        console.log(err)
      })
  }
}
