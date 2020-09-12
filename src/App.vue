<template>
  <v-app>
    <NavigationMenu/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavigationMenu from './components/NavigationMenu'

export default {
  name: 'App',

  components: {
    NavigationMenu
  },

  data: () => ({
    //
  })
}

</script>

<style>
html {
}
</style>
