<template>
  <v-container ref="contenedor" class="tamaño-contenedor">
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <v-card class="ma-0 ma-md-3">
        <v-card-title class="pt-3">
          <h2 class="d-none d-md-inline mt-3">Menu</h2>
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
            @click="submit" color="primary">Guardar</v-btn>
            <v-btn @click="clear">Cancelar</v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </form>
        </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <menuForm/>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import menuForm from '../components/menuForm'

export default {
  data: () => ({
    search: '',
    TableHeight: window.innerHeight - 230,
    nuevoPolato: {
      id: '',
      nombre: '',
      precio: ''
    },
    estaModificando: false
  }),
  components: {
    menuForm
  },
  computed: {
    ...mapGetters({
      headers: 'menuModule/headers',
      lista: 'menuModule/lista',
      actions: 'menuModule/actions'
    })
  },
  methods: {
    ...mapActions({
      guardarMenu: 'menuModule/guardar',
      eliminar: 'menuModule/eliminar',
      modificar: 'menuModule/modificar',
      selectPlato: 'menuModule/selectPlato',
      changeEstaModificando: 'menuModule/changeEstaModificando'
    }),
    invocarAccion (plato, accion) {
      switch (accion) {
        case 0: // editar
          this.estaModificando = true
          if (window.innerWidth < 1280) {
            this.changeEstaModificando()
            this.$store.dispatch('changeMenuFormDialog')
            this.selectPlato(plato.id)
          }
          this.nuevoPolato = {
            id: plato.id,
            nombre: plato.nombre,
            precio: parseInt(plato.precio.replace('$', '').replace('.', ''))
          }
          break
        case 1: // eliminar item
          if (confirm('Esta seguro que desea eliminar este plato del menu')) this.eliminar(plato.id)
          break
      }
    },
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
