<template>
  <div class="menu">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <logo
          class="d-none d-md-flex"
          width="50"
          height="50"
        />
        <h1 v-if="showMenu" class="appBar-name ml-5 d-none d-md-inline" >{{businessName}}</h1>
        <h2 v-if="showMenu" class="appBar-name ml-5 d-md-none" >{{tituloPagina}}</h2>
      </div>

      <v-spacer></v-spacer>

      <v-tabs v-model="pageActive" v-if="showMenu" right class="d-none d-md-inline" optional>
        <v-tab
        v-for="menuOption in menuDesktop"
        :key="menuOption.title"
        @click="navigationsActions(menuOption.action)"
        >
        {{menuOption.title}}</v-tab>
      </v-tabs>

      <div v-if="showMenu" class="d-flex">
        <v-btn
        v-for="menuOption in menuButtonDesktop"
        :key="menuOption.title"
        @click="navigationsActions(menuOption.action)"
        icon
        class="d-none d-md-flex"
        >
          <v-icon>{{menuOption.icon}}</v-icon>
        </v-btn>

        <v-btn @click.stop="drawer = !drawer" icon class="d-md-none">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
      <template v-if="esPaginaPedido" v-slot:extension>
        <v-btn
          fab
          color="light-blue accent-4"
          bottom
          right
          absolute
          @click="openMovileDialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <logo
            width="50"
            height="50"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{businessName}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
        v-for="menuOption in menuMovil"
        :key="menuOption.title"
        @click="navigationsActions(menuOption.action)"
        >
          <v-list-item-icon>
            <v-icon>{{ menuOption.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menuOption.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import logo from './logo'

export default {
  data: () => ({
    drawer: null,
    menuOptions: [
      { index: 0, title: 'Pedido', icon: 'mdi-card-account-phone-outline', action: 'goPedido' },
      { index: 1, title: 'Menu', icon: 'mdi-silverware', action: 'goMenu' },
      { index: 2, title: 'Domicilio', icon: 'mdi-moped', action: 'goDomicilio' },
      { index: 3, title: 'Reporte', icon: 'mdi-text-box-search-outline', action: 'goReporte' },
      { index: 4, title: 'Configuraciones', icon: 'mdi-cog', action: 'goConfiguraciones' },
      { index: 5, title: 'Salir', icon: 'mdi-logout', action: 'logout' }
    ],
    showMenu: true,
    pageActive: ''
  }),
  watch: {
    '$route.name' (name) {
      if (name === 'login') this.showMenu = false
      else if (name === 'Nuevo Pedido' || name === 'Configuracion') {
        this.showMenu = true
        this.pageActive = -1
        this.$store.dispatch('getDataUser')
      } else {
        this.showMenu = true
        this.pageActive = this.menuOptions.find(option => option.title === name).index
        this.$store.dispatch('getDataUser')
      }
    }
  },
  components: {
    logo
  },
  computed: {
    ...mapGetters(['businessName']),
    menuDesktop: function () {
      return this.menuOptions.filter(option => (option.title !== 'Configuraciones' && option.title !== 'Salir'))
    },
    menuButtonDesktop: function () {
      return this.menuOptions.filter(option => (option.title === 'Configuraciones' || option.title === 'Salir'))
    },
    menuMovil: function () {
      return this.menuOptions
    },
    tituloPagina: function () {
      return this.$route.name
    },
    esPaginaPedido: function () {
      return window.innerWidth < 960 && (this.$route.name === 'Pedido' || this.$route.name === 'Menu' || this.$route.name === 'Domicilio')
    }
  },
  methods: {
    ...mapActions(['changeFormulariosMovil']),
    navigationsActions (action) {
      switch (action) {
        case 'logout':
          this.$store.dispatch('logout')
          break
        case 'goPedido':
          this.$router.replace('/pedido')
          break
        case 'goMenu':
          this.$router.replace('/menu')
          break
        case 'goDomicilio':
          this.$router.replace('/domicilio')
          break
        case 'goReporte':
          this.$router.replace('/reporte')
          break
        case 'goConfiguraciones':
          this.$router.replace('/configuracion')
          break
      }
    },
    openMovileDialog () {
      switch (this.tituloPagina) {
        case 'Pedido':
          this.$router.push('/nuevo-pedido')
          break
        case 'Menu':
          this.$store.dispatch('changeMenuFormDialog')
          break
        case 'Domicilio':
          this.$store.dispatch('changeDomicilioFormDialog')
          break
      }
    }
  }
}
</script>

<style>
  .appBar-name{
    white-space: nowrap;
  }
</style>
