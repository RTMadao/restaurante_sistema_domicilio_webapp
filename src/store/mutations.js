export const mutations = {
  setUser (state, user) {
    state.user.username = user.username
    state.businessInformation.name = user.restaurant
    state.user.error = false
  },
  setLoginError (state, message) {
    state.user.errorMessage = message
    state.user.error = true
  },
  setLoginComponentLoading (state, bool) {
    state.pageElements.loadingElements.loginComponent = bool
  },
  setPedidoFormComponentLoading (state, bool) {
    state.pageElements.loadingElements.pedidoFormComponent = bool
  },
  setPedidoTableComponentLoading (state, bool) {
    state.pageElements.loadingElements.pedidoTableComponent = bool
  },
  setDomicilioComponentLoading (state, bool) {
    state.pageElements.loadingElements.domicilioComponent = bool
  },
  setMenuComponentLoading (state, bool) {
    state.pageElements.loadingElements.menuComponent = bool
  },
  changeAgregarItemDialog (state) {
    state.pageElements.dialogElements.agregarItemDialog = !state.pageElements.dialogElements.agregarItemDialog
  },
  changeImprimirFacturaDialog (state) {
    state.pageElements.dialogElements.imprimirFacturaDialog = !state.pageElements.dialogElements.imprimirFacturaDialog
  },
  changeimprimirReporteDialog (state) {
    state.pageElements.dialogElements.imprimirReporteDialog = !state.pageElements.dialogElements.imprimirReporteDialog
  },
  changeDomicilioFormDialog (state) {
    state.pageElements.dialogElements.domicilioFormDialog = !state.pageElements.dialogElements.domicilioFormDialog
  },
  changeMenuFormDialog (state) {
    state.pageElements.dialogElements.menuFormDialog = !state.pageElements.dialogElements.menuFormDialog
  },
  clearLogin (state) {
    state.user.errorMessage = ''
    state.user.error = false
  },
  setSocket (state, socket) {
    state.io = socket
    console.log('Socket conectado')
  },
  SOCKET_primeraConexion (state, data) {
    state.pedidoModule.listaPedidos = data.pedidos
    state.menuModule.menu = data.menu
    state.domicilioModule.listaDomicilios = data.domicilios
    state.reporteModule.listaReportes = data.reportes
  }
}
