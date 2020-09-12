<template>
    <v-dialog
      v-model="menuFormDialogIsVisible"
      max-width="300"
    >
    <v-card class="pa-3">
        <v-card-title>
        <v-spacer></v-spacer>
        Nuevo Plato
        <v-spacer></v-spacer>
        </v-card-title>
        <v-card-actions>
        <form class="d-inline-block form-container">
          <v-text-field
          v-model="nuevoPolato.nombre"
          label="Nombre"
          ></v-text-field>
          <v-text-field
          prefix="$"
          type="number"
          v-model="nuevoPolato.precio"
          label="Precio"
          ></v-text-field>
          <v-row class="my-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-12"
            @click="submit">Guardar</v-btn>
            <v-btn @click="clear">Cancelar</v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </form>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    TableHeight: window.innerHeight - 230,
    nuevoPolato: {
      id: '',
      nombre: '',
      precio: ''
    }
  }),
  watch: {
    'platoSeleccionado' (platoSeleccionado) {
      this.nuevoPolato.id = platoSeleccionado._id
      this.nuevoPolato.nombre = platoSeleccionado.nombre
      this.nuevoPolato.precio = platoSeleccionado.precio
    }
  },
  computed: {
    ...mapGetters({
      platoSeleccionado: 'menuModule/platoSeleccionado',
      estaModificando: 'menuModule/estaModificando',
      menuFormDialogIsVisible: 'menuFormDialogIsVisible'
    })
  },
  methods: {
    ...mapActions({
      guardarMenu: 'menuModule/guardar',
      modificar: 'menuModule/modificar',
      changeMenuFormDialog: 'changeMenuFormDialog',
      changeEstaModificando: 'menuModule/changeEstaModificando'
    }),
    submit () {
      if (this.estaModificando) this.modificar(this.nuevoPolato)
      else this.guardarMenu(this.nuevoPolato)
      this.clear()
    },
    clear () {
      this.estaModificando = false
      this.nuevoPolato = {
        nombre: '',
        precio: ''
      }
      this.$store.dispatch('changeMenuFormDialog')
      this.changeEstaModificando()
    }
  }
}
</script>

<style>
.form-container{
  width: 100%;
  padding: 5px;
}
</style>
