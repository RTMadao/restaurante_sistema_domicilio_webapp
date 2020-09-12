import { peticiones } from '../../apis/httpRequest'

export const menuModule = {
  namespaced: true,
  state: {
    encabezadoTabla: [
      { text: 'Plato', value: 'nombre' },
      { text: 'Precio', value: 'precio' },
      { text: 'Acciones', value: 'acciones' }
    ],
    actions: [
      { index: 0, name: 'modificar', icon: 'mdi-pencil' },
      { index: 1, name: 'eliminar', icon: 'mdi-delete' }
    ],
    menu: [],
    platoSeleccionado: {},
    estaModificando: false
  },
  getters: {
    lista: state => state.menu.map(plato => {
      return {
        id: plato._id,
        nombre: plato.nombre,
        precio: '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(plato.precio)
      }
    }),
    listaSinple: state => state.menu,
    headers: state => state.encabezadoTabla,
    actions: state => state.actions,
    platoSeleccionado: state => state.platoSeleccionado,
    estaModificando: state => state.estaModificando
  },
  mutations: {
    SOCKET_menu (state, menu) {
      state.menu = menu
    },
    setLista (state, menu) {
      state.menu = menu
    },
    setEstaModificando (state) {
      state.estaModificando = !state.estaModificando
    },
    setSelectedMenu (state, id) {
      state.platoSeleccionado = state.menu.find(plato => plato._id === id)
    }
  },
  actions: {
    guardar ({ commit, rootState }, nuevoPlato) {
      commit('setMenuComponentLoading', true, { root: true })

      peticiones.registrar(nuevoPlato, rootState.businessInformation.name, 'menu')
        .then(response => {
          commit('setMenuComponentLoading', false, { root: true })
          alert('Guardado exitosamente')
        })
        .catch(err => {
          commit('setMenuComponentLoading', false, { root: true })
          alert('Ocurrio un error al intentar guardar')
          console.log(err)
        })
    },
    selectPlato ({ commit }, id) {
      commit('setSelectedMenu', id)
    },
    changeEstaModificando ({ commit }, id) {
      commit('setEstaModificando')
    },
    modificar ({ commit, rootState }, nuevoPlato) {
      commit('setMenuComponentLoading', true, { root: true })
      peticiones.modificar('menu', rootState.businessInformation.name, nuevoPlato.id, nuevoPlato)
        .then(response => {
          commit('setMenuComponentLoading', false, { root: true })
          alert('Guardado exitosamente')
        })
        .catch(err => {
          commit('setMenuComponentLoading', false, { root: true })
          alert('Ocurrio un error al intentar guardar')
          console.log(err)
        })
    },
    eliminar ({ commit, rootState }, id) {
      commit('setMenuComponentLoading', true, { root: true })

      peticiones.eliminar('menu', rootState.businessInformation.name, '/' + id)
        .then(response => {
          commit('setMenuComponentLoading', false, { root: true })
        })
        .catch(err => {
          commit('setMenuComponentLoading', false, { root: true })
          alert('Ocurrio un error al intentar guardar')
          console.log(err)
        })
    }
  }
}
