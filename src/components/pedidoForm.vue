<template>
    <v-card :height="altura" class="ma-3" :loading="loadinPedidoFormComponent" >
        <v-card-title>
        <v-spacer></v-spacer>
        Nuevo Pedido
        <v-spacer></v-spacer>
        </v-card-title>
        <v-card-actions>
        <form class="d-inline-block form-container">
          <v-row>
              <v-col cols="6">
                <v-text-field
                v-model="nuevoPedido.cliente.nombre"
                label="Nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="nuevoPedido.cliente.telefono"
                label="Telefono"
                ></v-text-field>
              </v-col>
          </v-row>
          <v-row>
              <v-col cols="4">
                  <v-autocomplete
                  v-model="selectedBarrio"
                  label="Barrio"
                  :items="listaDomicilios"
                  item-text="barrio"
                  return-object
                  :loading="loadinDomicilioComponent"
                  @blur="agregarItemDomicilio('domicilio','Barrio','Valor')"
                  @change="selectBarrio"
                  @click="selectedBarrio = undefined"
                  ></v-autocomplete>
              </v-col>
              <v-col cols="8">
                  <v-text-field
                  v-model="nuevoPedido.cliente.direccion"
                  label="Direccion"
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-virtual-scroll
            :items="nuevoPedido.pedido.platos"
            :item-height="50"
            height="100"
            >
              <template v-slot="{ item }">
                <v-list>
                <v-list-item>
                    <v-list-item-icon>
                    {{item.cantidad}}
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title v-text="item.nombre"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                    <v-btn @click="eliminarPlato(nuevoPedido.pedido.platos.indexOf(item), plato.total)" fab x-small elevation="0">
                        <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                    </v-list-item-icon>
                </v-list-item>
                </v-list>
              </template>
            </v-virtual-scroll>
            <v-row>
            <v-col cols="8">
                <v-autocomplete
                v-model="NuevoPlato.platoMenu"
                label="Plato"
                :items="menu"
                item-text="nombre"
                return-object
                :loading="loadinMenuComponent"
                @blur="agregarItemMenu('menu','Nombre','Precio')"
                @click="NuevoPlato.platoMenu = undefined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="2">
                <v-text-field
                type="number"
                v-model="NuevoPlato.cantidad"
                label="cant"
                @keyup.enter="agregarPlato"
                ></v-text-field>
            </v-col>
            <v-col class="btn-anadir-platos" cols="2">
                <v-btn @click="agregarPlato" fab dark x-small color="blue">
                <v-icon dark >mdi-plus</v-icon>
                </v-btn>
            </v-col>
            </v-row>
            <v-text-field
            v-model="nuevoPedido.pedido.comentario"
            label="Observaciones"
            ></v-text-field>
            <v-row>
              <v-col cols="6">
                  <v-text-field
                  prefix="$"
                  type="number"
                  v-model="nuevoPedido.pedido.descuento"
                  label="Descuento"
                  ></v-text-field>
              </v-col>
              <v-col cols="6">
                  <v-text-field
                  prefix="$"
                  type="number"
                  v-model="nuevoPedido.pedido.valorDomicilio"
                  label="Domicilio"
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
            <v-col cols="6">
                <h2 class="text-right" >Total:</h2>
            </v-col>
            <v-col cols="6">
                <h2>${{totalNuevoPedido}}</h2>
            </v-col>
            </v-row>
            <v-row class="mt-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-12"
            @click="submit">Guardar</v-btn>
            <v-btn @click="clear">Cancelar</v-btn>
            <v-spacer></v-spacer>
            </v-row>
        </form>
        </v-card-actions>
        <agregarItem
        :item-type="itemAgregar.itemType"
        :label1="itemAgregar.label1"
        :label2="itemAgregar.label2"
        />
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import agregarItem from './agregarItem'

export default {
  data: () => ({
    altura: window.innerHeight - 112,
    nuevoPedido: {
      cliente: {
        nombre: '',
        barrio: '',
        direccion: '',
        telefono: ''
      },
      pedido: {
        platos: [],
        valorDomicilio: 0,
        comentario: '',
        descuento: 0,
        subtotal: 0,
        total: 0
      }
    },
    NuevoPlato: {
      platoMenu: '',
      cantidad: ''
    },
    selectedBarrio: '',
    itemAgregar: {
      itemType: '',
      label1: '',
      label2: ''
    }
  }),
  components: {
    agregarItem
  },
  computed: {
    ...mapGetters({
      headers: 'pedidoModule/headers',
      listaPedidos: 'pedidoModule/listaTabla',
      actions: 'pedidoModule/actions',
      listaDomicilios: 'domicilioModule/listaSimple',
      menu: 'menuModule/listaSinple',
      loadinPedidoFormComponent: 'loadinPedidoFormComponent',
      loadinDomicilioComponent: 'loadinDomicilioComponent',
      loadinMenuComponent: 'loadinMenuComponent'
    }),
    totalNuevoPedido: function () {
      return parseInt(this.nuevoPedido.pedido.valorDomicilio) + parseInt(this.nuevoPedido.pedido.subtotal) + parseInt(this.nuevoPedido.pedido.descuento)
    }
  },
  methods: {
    agregarItemDomicilio (itemType, label1, label2) {
      if (!this.selectedBarrio) {
        this.itemAgregar.itemType = itemType
        this.itemAgregar.label1 = label1
        this.itemAgregar.label2 = label2
        this.$store.dispatch('changeAgregarItemDialog')
      }
    },
    agregarItemMenu (itemType, label1, label2) {
      if (!this.NuevoPlato.platoMenu) {
        this.itemAgregar.itemType = itemType
        this.itemAgregar.label1 = label1
        this.itemAgregar.label2 = label2
        this.$store.dispatch('changeAgregarItemDialog')
      }
    },
    agregarPlato () {
      this.nuevoPedido.pedido.platos.push({
        nombre: this.NuevoPlato.platoMenu.nombre,
        cantidad: this.NuevoPlato.cantidad,
        total: this.NuevoPlato.cantidad * this.NuevoPlato.platoMenu.precio
      })
      this.nuevoPedido.pedido.subtotal += this.NuevoPlato.cantidad * this.NuevoPlato.platoMenu.precio
      this.NuevoPlato.platoMenu = ''
      this.NuevoPlato.cantidad = ''
    },
    eliminarPlato (index, totalPlato) {
      this.nuevoPedido.pedido.subtotal -= totalPlato
      this.nuevoPedido.pedido.platos.splice(index, 1)
    },
    selectBarrio () {
      this.nuevoPedido.cliente.barrio = this.selectedBarrio.barrio
      this.nuevoPedido.pedido.valorDomicilio = this.selectedBarrio.valor
    },
    submit () {
      this.$store.dispatch('guardarNuevoPedido', this.nuevoPedido)
      this.clear()
    },
    clear () {
      this.nuevoPedido = {
        cliente: {
          nombre: '',
          barrio: '',
          direccion: '',
          telefono: ''
        },
        pedido: {
          platos: [],
          valorDomicilio: 0,
          comentario: '',
          descuento: 0,
          subtotal: 0,
          total: 0
        }
      }
      this.NuevoPlato = {
        platoMenu: '',
        cantidad: ''
      }
      this.selectedBarrio = ''
    }
  }
}
</script>

<style>
.form-container{
  width: 100%;
  padding: 5px;
}
.btn-anadir-platos{
  padding-top: 30px;
}
</style>
