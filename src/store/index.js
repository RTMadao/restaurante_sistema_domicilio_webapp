import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions'
import { pedidoModule } from './modules/Pedido.module'
import { menuModule } from './modules/Menu.module'
import { domicilioModule } from './modules/Domicilio.module'
import { reporteModule } from './modules/Reporte.module'
import { configuracionModule } from './modules/Configuracion.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageElements: {
      loadingElements: {
        loginComponent: false,
        pedidoFormComponent: false,
        pedidoTableComponent: false,
        domicilioComponent: false,
        menuComponent: false
      },
      dialogElements: {
        agregarItemDialog: false,
        imprimirFacturaDialog: false,
        imprimirReporteDialog: false,
        menuFormDialog: false,
        domicilioFormDialog: false
      }
    },
    businessInformation: {
      name: ''
    },
    user: {
      username: '',
      error: false,
      errorMessage: ''
    },
    lista: []
  },
  getters: {
    businessName: state => state.businessInformation.name.replace('_', ' ').toUpperCase(),
    businessNamesoace: state => state.businessInformation.name,
    loadinLoginComponent: state => state.pageElements.loadingElements.loginComponent,
    loadinPedidoFormComponent: state => state.pageElements.loadingElements.pedidoFormComponent,
    loadinPedidoTableComponent: state => state.pageElements.loadingElements.pedidoTableComponent,
    loadinDomicilioComponent: state => state.pageElements.loadingElements.domicilioComponent,
    loadinMenuComponent: state => state.pageElements.loadingElements.menuComponent,
    agregarItemDialogIsVisible: state => state.pageElements.dialogElements.agregarItemDialog,
    imprimirFacturaDialogIsVisible: state => state.pageElements.dialogElements.imprimirFacturaDialog,
    imprimirReporteDialogIsVisible: state => state.pageElements.dialogElements.imprimirReporteDialog,
    menuFormDialogIsVisible: state => state.pageElements.dialogElements.menuFormDialog,
    domicilioFormDialogIsVisible: state => state.pageElements.dialogElements.domicilioFormDialog,
    thereIsAnErrorLogin: state => state.user.error,
    errorLogin: state => state.user.errorMessage
  },
  mutations,
  actions,
  modules: {
    pedidoModule,
    menuModule,
    domicilioModule,
    reporteModule,
    configuracionModule
  }
})
