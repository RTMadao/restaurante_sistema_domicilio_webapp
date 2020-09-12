<template>
  <v-container ref="contenedor" class="tamaño-contenedor">
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <pedidoTableDesktop/>
      </v-col>
      <v-col cols="4" class="d-none d-md-inline">
        <pedidoForm/>
      </v-col>
    </v-row>
    <facturaComponent/>
  </v-container>
</template>

<script>
import pedidoTableDesktop from '../components/pedidoTable.desktop'
import pedidoForm from '../components/pedidoForm'
import facturaComponent from '../components/facturaImpresion'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
  }),
  watch: {
  },
  components: {
    pedidoTableDesktop,
    pedidoForm,
    facturaComponent
  },
  computed: {
    ...mapGetters({
      formularioPedidoMovilDialogIsVisible: 'formularioPedidoMovilDialogIsVisible'
    })
  },
  methods: {
  }
}
</script>

<style>
.tamaño-contenedor{
  width: 95%;
  max-width: 100%;
}
</style>
