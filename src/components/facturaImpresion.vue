<template>
    <v-dialog
      persistent
      v-model="imprimirFacturaDialogIsVisible"
      max-width="350"
      max-height="600"
    >
      <v-card height="600">
        <div id="printFactura">
        <h3 class="headline alineacion pt-3">RESTAURANTE<br>{{nombreRestaurante}}</h3>
        <h5 class="alineacion">NITT: {{nombreRestaurante}} REG. COMUN</h5>
        <h5 class="alineacion">FACTURA DE VENTA</h5>
        <h5 class="alineacion">FACTURA Nº {{factura.pedido.consecutivo}}</h5>
        <h5 class="alineacion">{{formatofecha(factura.pedido.fechaHora)}}</h5>

        <h5 v-if="factura.cliente.nombre !== ''" class="alineacion mt-3">Cliente: {{factura.cliente.nombre}}</h5>
        <h5 v-if="factura.cliente.direccion !== '.'" class="alineacion">Direccion: {{factura.cliente.direccion}}</h5>
        <h5 v-if="factura.cliente.telefono !== ''" class="alineacion">Telefono: {{factura.cliente.telefono}}</h5>

        <v-simple-table dense class="mt-3" style="overflow: hidden;">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">Descripcion</th>
                <th class="text-left">Cant</th>
                <th class="text-left">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="plato in factura.pedido.platos" :key="plato._id">
                <td>{{ plato.nombre }}</td>
                <td>{{ plato.cantidad }}</td>
                <td>{{ formatoMoneda(plato.total) }}</td>
                </tr>
                <tr v-if="factura.pedido.valorDomicilio !== 0" >
                <td>Domicilio</td>
                <td></td>
                <td>{{ formatoMoneda(factura.pedido.valorDomicilio) }}</td>
                </tr>
                <tr v-if="factura.pedido.descuento !== 0" >
                <td>Domicilio</td>
                <td></td>
                <td>{{ formatoMoneda(factura.pedido.descuento) }}</td>
                </tr>
                <tr>
                <td>Total</td>
                <td></td>
                <td>{{ formatoMoneda(factura.pedido.total) }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>

        <h5 class="alineacion mt-3">GRACIAS POR SU COMPRA</h5>
        <h5 class="alineacion">DOCUMENTO EQUIVALENTE</h5>
        </div>

        <v-card-actions absolute botton>
          <v-spacer></v-spacer>

          <v-btn class="mr-16"
          bottom
          left
          absolute
          color="primary"
          text
          v-print=" 'printFactura' "
          @click="imprimir"
          >
            Imprimir
          </v-btn>

          <v-btn
          bottom
          right
          absolute
          color="primary"
          text
          @click="close"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { printSection } from '../apis/print'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      imprimirFacturaDialogIsVisible: 'imprimirFacturaDialogIsVisible',
      factura: 'pedidoModule/ObtenerPedido',
      nombreRestaurante: 'businessName'
    })
  },
  directives: {
    print: {
      bind (el, binding) {
        printSection(el, binding)
      }
    }
  },
  methods: {
    ...mapActions({
      guardarDomicilio: 'domicilioModule/guardar',
      guardarMenu: 'menuModule/guardar'
    }),
    close () {
      this.$store.dispatch('changeImprimirFacturaDialog')
    },
    imprimir () {
      this.close()
    },
    formatoMoneda (valor) {
      return '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(valor)
    },
    formatofecha (fecha) {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }
      return new Date(fecha).toLocaleDateString('es-CO', options)
    }
  }
}
</script>

<style>
.alineacion {
    text-align: center;
}
</style>
