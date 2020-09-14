import { peticiones } from '../../apis/httpRequest'

export const domicilioModule = {
  namespaced: true,
  state: {
    encabezadoTabla: [
      { text: 'Barrio', value: 'barrio' },
      { text: 'Valor', value: 'valor' },
      { text: 'Acciones', value: 'acciones' }
    ],
    actions: [
      { index: 0, name: 'modificar', icon: 'mdi-pencil' },
      { index: 1, name: 'eliminar', icon: 'mdi-delete' }
    ],
    listaDomicilios: [],
    barrioSeleccionado: {},
    estaModificando: false
  },
  getters: {
    lista: state => state.listaDomicilios.map(domicilio => {
      return {
        id: domicilio._id,
        barrio: domicilio.barrio,
        valor: '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(domicilio.valor)
      }
    }),
    listaSimple: state => state.listaDomicilios,
    headers: state => state.encabezadoTabla,
    actions: state => state.actions,
    barrioSeleccionado: state => state.barrioSeleccionado,
    estaModificando: state => state.estaModificando
  },
  mutations: {
    SOCKET_domicilio (state, domicilio) {
      state.listaDomicilios = domicilio
    },
    setLista (state, domicilio) {
      state.listaDomicilios = domicilio
    },
    setEstaModificando (state) {
      state.estaModificando = !state.estaModificando
    },
    setSelectedDomicilio (state, id) {
      state.barrioSeleccionado = state.listaDomicilios.find(barrio => barrio._id === id)
    }
  },
  actions: {
    guardar ({ commit, rootState }, nuevoBarrio) {
      commit('setDomicilioComponentLoading', true, { root: true })

      peticiones.registrar(nuevoBarrio, rootState.businessInformation.name, 'domicilio')
        .then(response => {
          commit('setDomicilioComponentLoading', false, { root: true })
        })
        .catch(err => {
          commit('setDomicilioComponentLoading', false, { root: true })
          alert('Ocurrio un error al intentar guardar')
          console.log(err)
        })
    },
    selectBarrio ({ commit }, id) {
      commit('setSelectedDomicilio', id)
    },
    changeEstaModificando ({ commit }, id) {
      commit('setEstaModificando')
    },
    modificar ({ commit, rootState }, nuevoBarrio) {
      commit('setDomicilioComponentLoading', true, { root: true })
      peticiones.modificar('domicilio', rootState.businessInformation.name, nuevoBarrio.id, nuevoBarrio)
        .then(response => {
          commit('setDomicilioComponentLoading', false, { root: true })
        })
        .catch(err => {
          commit('setDomicilioComponentLoading', false, { root: true })
          alert('Ocurrio un error al intentar guardar')
          console.log(err)
        })
    },
    eliminar ({ commit, rootState }, id) {
      commit('setDomicilioComponentLoading', true, { root: true })

      peticiones.eliminar('domicilio', rootState.businessInformation.name, '/' + id)
        .then(response => {
          commit('setDomicilioComponentLoading', false, { root: true })
        })
        .catch(err => {
          commit('setDomicilioComponentLoading', false, { root: true })
          alert('Ocurrio un error al intentar guardar')
          console.log(err)
        })
    }
  }
}
