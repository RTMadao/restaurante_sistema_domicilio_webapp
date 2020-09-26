import { peticiones } from '../../apis/httpRequest'

export const configuracionModule = {
  namespaced: true,
  state: {
    configuracion: ''
  },
  getters: {
    nombreRestauranteFactura: state => state.configuracion.nombreRestaurante.toUpperCase(),
    nombreRestaurante: state => state.configuracion.nombreRestaurante,
    nitt: state => state.configuracion.nitt,
    datosContacto: state => state.configuracion.datosContacto,
    consecutivo: state => state.configuracion.consecutivo,
    logo: state => state.configuracion.logo
  },
  mutations: {
    SOCKET_configuracion (state, configuracion) {
      state.configuracion = configuracion
    }
  },
  actions: {
    guardarLogo ({ commit, rootState }, logo) {
      const formData = new FormData()
      formData.append('image', logo)
      peticiones.registrar(formData, rootState.businessInformation.name, 'configuracion/logo')
    },
    guardarInfoRestaurante ({ commit, rootState }, info) {
      peticiones.registrar({ datosRestaurante: info }, rootState.businessInformation.name, 'configuracion/info_restaurante')
    }
  }
}
