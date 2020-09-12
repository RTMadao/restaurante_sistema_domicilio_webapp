<template>
    <v-card class="ma-0 ma-md-3">
        <v-card-title class="pt-0">
          <h2 class="d-none d-md-inline mt-3">Pedidos</h2>
          <v-spacer class="d-none d-md-inline"></v-spacer>
          <v-select
          class="pt-6"
            v-model="EstadoSelected"
            solo
            :items="filtrosTabla"
            item-value="index"
            item-text="value"
            label="Estado de pedido"
            style="width: 15px;"
          ></v-select>
          <v-spacer></v-spacer>
          <div class="text-center">
            <v-menu
            open-on-hover
            offset-y
            bottom
            origin="center center"
            transition="slide-y-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="mostrarBuscadorTabla">
                  <v-list-item-title>Mostrar/ocultar buscador</v-list-item-title>
                </v-list-item>
                <v-list-item @click="eliminarTodos">
                  <v-list-item-title>Eliminar todos los pedidor</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-card-title>
        <v-card-subtitle>
          <v-text-field
            v-if="buscadorTablaEsVisible"
            solo
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-subtitle>
        <v-data-table
        dense
        :height="TableHeight"
        :single-expand="expandTable"
        show-expand
        :expanded.sync="expanded"
        disable-pagination
        disable-sort
        hide-default-footer
        :headers="headers"
        :items="listaPedidosFiltrados"
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
              :disabled="pedidoEntregado(item.pendiente, action)"
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
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
            <v-row dense>
                <v-col cols="6" md="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Telefono</v-list-item-title>
                    <v-list-item-subtitle>{{item.telefono}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-col>
                <v-col cols="6" md="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Domicilio</v-list-item-title>
                    <v-list-item-subtitle>{{item.domicilio}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-col>
                <v-col cols="6" md="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Descuento</v-list-item-title>
                    <v-list-item-subtitle>{{item.descuento}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-col>
            </v-row>
            <v-row dense>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Observaciones</v-list-item-title>
                    <v-list-item-subtitle>{{item.comentario}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
            </v-row>
            </td>
        </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    search: '',
    TableHeight: window.innerHeight - 230,
    expandTable: true,
    expanded: [],
    filtrosTabla: [
      { index: true, value: 'Pendientes' },
      { index: false, value: 'Entregados' }
    ],
    EstadoSelected: true,
    buscadorTablaEsVisible: false
  }),
  watch: {
  },
  computed: {
    ...mapGetters({
      headers: 'pedidoModule/headers',
      listaPedidos: 'pedidoModule/listaTabla',
      actions: 'pedidoModule/actions',
      loadinPedidoTableComponent: 'loadinPedidoTableComponent'
    }),
    listaPedidosFiltrados: function () {
      return this.listaPedidos.filter(pedido => pedido.pendiente === this.EstadoSelected)
    }
  },
  methods: {
    ...mapActions({
      eliminar: 'pedidoModule/eliminarPedido',
      marcarPedidoEnviado: 'pedidoModule/marcarPedidoEnviado',
      seleccionarPedido: 'pedidoModule/selectPedido',
      changeImprimirFacturaDialog: 'changeImprimirFacturaDialog'
    }),
    pedidoEntregado (estaPendiente, accion) {
      return !estaPendiente && accion.name === 'marcarEnviado'
    },
    invocarAccion (pedido, accion) {
      switch (accion) {
        case 0: // enviar pedido
          this.marcarPedidoEnviado(pedido.id)
          break
        case 1: // imprimir
          this.seleccionarPedido(pedido.id)
          this.changeImprimirFacturaDialog()
          break
        case 2: // eliminar item
          if (confirm('Esta seguro que desea eliminar este pedido')) this.eliminar(pedido.id)
          break
      }
    },
    eliminarTodos () {
      if (confirm('Esta seguro que desea eliminar TODOS los pedido')) this.eliminar()
    },
    mostrarBuscadorTabla () {
      this.buscadorTablaEsVisible = !this.buscadorTablaEsVisible
    }
  }
}
</script>

<style>
.tarjeta{
  overflow: scroll;
  height: 100%;
}
</style>
