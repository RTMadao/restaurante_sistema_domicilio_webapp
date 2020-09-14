<template>
    <v-dialog
      v-model="domicilioFormDialogIsVisible"
      persistent
      max-width="300"
    >
    <v-card class="pa-3">
        <v-card-title>
        <v-spacer></v-spacer>
        Nuevo Barrio
        <v-spacer></v-spacer>
        </v-card-title>
        <v-card-actions>
        <form class="d-inline-block form-container">
          <v-text-field
          v-model="nuevoBarrio.barrio"
          label="Barrio"
          ></v-text-field>
          <v-text-field
          prefix="$"
          type="number"
          v-model="nuevoBarrio.valor"
          label="Valor"
          ></v-text-field>
          <v-row class="my-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-12"
            @click="submit" color="primary">Guardar</v-btn>
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
    nuevoBarrio: {
      id: '',
      barrio: '',
      valor: ''
    }
  }),
  watch: {
    'seleccionado' (seleccionado) {
      this.nuevoBarrio.id = seleccionado._id
      this.nuevoBarrio.barrio = seleccionado.barrio
      this.nuevoBarrio.valor = seleccionado.valor
    }
  },
  computed: {
    ...mapGetters({
      seleccionado: 'domicilioModule/barrioSeleccionado',
      estaModificando: 'domicilioModule/estaModificando',
      domicilioFormDialogIsVisible: 'domicilioFormDialogIsVisible'
    })
  },
  methods: {
    ...mapActions({
      guardar: 'domicilioModule/guardar',
      modificar: 'domicilioModule/modificar',
      changeDomicilioFormDialog: 'changeDomicilioFormDialog',
      changeEstaModificando: 'domicilioModule/changeEstaModificando'
    }),
    submit () {
      if (this.estaModificando) this.modificar(this.nuevoBarrio)
      else this.guardar(this.nuevoBarrio)
      this.clear()
    },
    clear () {
      this.nuevoBarrio = {
        barrio: '',
        valor: ''
      }
      if (this.estaModificando) this.changeEstaModificando()
      this.$store.dispatch('changeDomicilioFormDialog')
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
