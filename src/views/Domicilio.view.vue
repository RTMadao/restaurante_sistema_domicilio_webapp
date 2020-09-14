<template>
  <v-container ref="contenedor" class="tamaño-contenedor">
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <v-card class="ma-0 ma-md-3">
        <v-card-title class="pt-3">
          <h2 class="d-none d-md-inline mt-3">Domicilio</h2>
          <v-spacer></v-spacer>
          <v-text-field
            solo
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer class="d-md-none"></v-spacer>
        </v-card-title>
        <v-data-table
        dense
        :height="TableHeight"
        disable-pagination
        disable-sort
        hide-default-footer
        :headers="headers"
        :items="lista"
        item-key="id"
        :search="search"
        >
        <template v-slot:item.acciones="{ item }">
          <v-tooltip
          bottom
          v-for="action in actions"
          :key="action.index"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="blue"
              >
                <v-icon @click="invocarAccion(item, action.index)" >{{action.icon}}</v-icon>
              </v-btn>
            </template>
            <span>{{action.name}}</span>
          </v-tooltip>
        </template>
        </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="4" class="d-none d-md-inline">
        <v-card class="ma-3">
        <v-card-title>
        <v-spacer></v-spacer>
        Nuevo Barrio
        <v-spacer></v-spacer>
        </v-card-title>
        <v-card-actions>
        <form class="d-inline-block form-container">
          <v-text-field
          v-model="nuevoBarrio.barrio"
          label="Nombre"
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
      </v-col>
    </v-row>
    <domicilioForm/>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import domicilioForm from '../components/domicilioForm'

export default {
  data: () => ({
    search: '',
    TableHeight: window.innerHeight - 230,
    nuevoBarrio: {
      id: '',
      barrio: '',
      valor: ''
    },
    estaModificando: false
  }),
  components: {
    domicilioForm
  },
  computed: {
    ...mapGetters({
      headers: 'domicilioModule/headers',
      lista: 'domicilioModule/lista',
      actions: 'domicilioModule/actions'
    })
  },
  methods: {
    ...mapActions({
      guardar: 'domicilioModule/guardar',
      eliminar: 'domicilioModule/eliminar',
      modificar: 'domicilioModule/modificar',
      selectBarrio: 'domicilioModule/selectBarrio',
      changeEstaModificando: 'domicilioModule/changeEstaModificando'
    }),
    invocarAccion (barrio, accion) {
      switch (accion) {
        case 0: // editar
          this.estaModificando = true
          if (window.innerWidth < 1280) {
            this.changeEstaModificando()
            this.$store.dispatch('changeDomicilioFormDialog')
            this.selectBarrio(barrio.id)
          }
          this.nuevoBarrio = {
            id: barrio.id,
            barrio: barrio.barrio,
            valor: parseInt(barrio.valor.replace('$', '').replace('.', ''))
          }
          break
        case 1: // eliminar item
          if (confirm('Esta seguro que desea eliminar este plato del menu')) this.eliminar(barrio.id)
          break
      }
    },
    submit () {
      if (this.estaModificando) this.modificar(this.nuevoBarrio)
      else this.guardar(this.nuevoBarrio)
      this.clear()
    },
    clear () {
      this.estaModificando = false
      this.nuevoBarrio = {
        barrio: '',
        valor: ''
      }
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
