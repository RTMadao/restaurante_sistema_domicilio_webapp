import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { StartSocketClient } from './plugins/vueSocketIO'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created () {
    const user = localStorage.getItem('userSession')
    const userActivo = (user) ? JSON.parse(user) : { auth: false }
    if (userActivo.auth) {
      console.log('entra')
      StartSocketClient(userActivo.restaurant)
    }
  },
  render: h => h(App)
}).$mount('#app')
