<template>
    <v-dialog
      persistent
      v-model="imprimirFacturaDialogIsVisible"
      max-width="350"
      max-height="600"
    >
      <v-card height="600">
        <div id="printFactura">
        <h4 class="headline alineacion pt-3">RESTAURANTE<br>{{nombreRestaurante}}</h4>
        <h6 class="alineacion">FACTURA DE VENTA</h6>
        <h6 class="alineacion">FACTURA Nº {{factura.pedido.consecutivo}}</h6>
        <h6 class="alineacion">{{formatofecha(factura.pedido.fechaHora)}}</h6>

        <h6 v-if="factura.cliente.nombre !== ''" class="alineacion mt-3">Cliente: {{factura.cliente.nombre}}</h6>
        <h6 v-if="factura.cliente.direccion !== '.'" class="alineacion">Direccion: {{factura.cliente.direccion}}</h6>
        <h6 v-if="factura.cliente.telefono !== ''" class="alineacion">Telefono: {{factura.cliente.telefono}}</h6>
        <v-simple-table dense class="mt-5 px-2">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left"><font size="1">Descripcion</font></th>
                <th class="text-left"><font size="1">Cant</font></th>
                <th class="text-left"><font size="1">Total</font></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="plato in factura.pedido.platos" :key="plato._id">
                <td><font size="1">{{ plato.nombre }}</font></td>
                <td><font size="1">{{ plato.cantidad }}</font></td>
                <td><font size="1">{{ formatoMoneda(plato.total) }}</font></td>
                </tr>
                <tr v-if="factura.pedido.valorDomicilio !== 0" >
                <td><font size="1">Domicilio</font></td>
                <td></td>
                <td><font size="1">{{ formatoMoneda(factura.pedido.valorDomicilio) }}</font></td>
                </tr>
                <tr v-if="factura.pedido.descuento !== 0" >
                <td><font size="1">Descuemto</font></td>
                <td></td>
                <td><font size="1">{{ formatoMoneda(factura.pedido.descuento) }}</font></td>
                </tr>
                <tr>
                <td><font size="1">Total</font></td>
                <td></td>
                <td><font size="1">{{ formatoMoneda(factura.pedido.total) }}</font></td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <h6 class="alineacion mt-5">GRACIAS POR SU COMPRA</h6>
        <h6 class="alineacion">DOCUMENTO EQUIVALENTE</h6>
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
      nombreRestaurante: 'businessName',
      encabezadoTablaImpresion: 'pedidoModule/encabezadoTablaImpresion'
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
.itemTabla {
  overflow: hidden;
}
.alineacion {
    text-align: center;
}
</style>
