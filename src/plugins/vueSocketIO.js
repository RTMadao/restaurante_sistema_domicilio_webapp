import Vue from 'vue'
import store from '../store/index'
import VueSocketio from 'vue-socket.io'
import { urlApiSocket } from '../config'

export function StartSocketClient (namespace) {
  Vue.use(new VueSocketio({
    debug: true,
    connection: urlApiSocket + namespace,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  }))
  // Vue.store.commit('setSocket', Vue.$socket)
}
