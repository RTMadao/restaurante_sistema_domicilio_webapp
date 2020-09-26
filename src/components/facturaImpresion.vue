<template>
    <v-dialog
      persistent
      v-model="imprimirFacturaDialogIsVisible"
      max-width="350"
      max-height="600"
    >
      <v-card height="600">
        <div id="printFactura" class="factura">
        <h4 class="alineacion pt-3">RESTAURANTE<br>{{nombreRestaurante}}</h4>
        <h5 class="alineacion pt-3">Nitt: {{nitt}}</h5>
        <h5 class="alineacion mt-3">FACTURA DE VENTA</h5>
        <h5 class="alineacion">FACTURA Nº {{factura.pedido.consecutivo}}</h5>
        <h5 class="alineacion">{{formatofecha(factura.pedido.fechaHora)}}</h5>

        <h5 v-if="factura.cliente.nombre !== ''" class="alineacion mt-3">Cliente: {{factura.cliente.nombre}}</h5>
        <h5 v-if="factura.cliente.direccion !== '.'" class="alineacion">Direccion: {{factura.cliente.direccion}}</h5>
        <h5 v-if="factura.cliente.telefono !== ''" class="alineacion">Telefono: {{factura.cliente.telefono}}</h5>
        <v-simple-table dense class="mt-5 px-2">
            <template v-slot:default>
            <tbody>
              <tr>
                <th class="text-left producto"><font size="2">Descripcion</font></th>
                <th class="text-left cantidad"><font size="2">Cant</font></th>
                <th class="text-left precio"><font size="2">Total</font></th>
                </tr>
                <tr v-for="plato in factura.pedido.platos" :key="plato._id">
                <td><font size="2">{{ plato.nombre }}</font></td>
                <td><font size="2">{{ plato.cantidad }}</font></td>
                <td><font size="2">{{ formatoMoneda(plato.total) }}</font></td>
                </tr>
                <tr v-if="factura.pedido.valorDomicilio !== 0" >
                <td><font size="2">Domicilio</font></td>
                <td></td>
                <td><font size="2">{{ formatoMoneda(factura.pedido.valorDomicilio) }}</font></td>
                </tr>
                <tr v-if="factura.pedido.descuento !== 0" >
                <td><font size="2">Descuemto</font></td>
                <td></td>
                <td><font size="2">{{ formatoMoneda(factura.pedido.descuento) }}</font></td>
                </tr>
                <tr>
                <td><font size="2">Total</font></td>
                <td></td>
                <td><font size="2">{{ formatoMoneda(factura.pedido.total) }}</font></td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <h5 class="alineacion mt-5">GRACIAS POR SU COMPRA</h5>
        <h5 class="alineacion">DOCUMENTO EQUIVALENTE</h5>
        </div>
        <div>
        </div>
        <v-card-actions class="mt-5" absolute botton>
          <v-spacer></v-spacer>

          <v-btn class="mr-16"
          bottom
          left
          absolute
          v-print=" 'printFactura' "
          color="primary"
          @click="imprimir"
          >
            Imprimir
          </v-btn>

          <v-btn
          bottom
          right
          absolute
          text
          color="primary"
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
      nombreRestaurante: 'configuracionModule/nombreRestauranteFactura',
      nitt: 'configuracionModule/nitt',
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
    align-content: center;
}
.factura{
    font-size: 20px;
    font-family: 'Times New Roman';
    width: 300px;
    max-width: 300px;
    margin: auto;
}
td,
th,
tr,
table {
    border-collapse: collapse;
    border-spacing: 1px 1px;
    padding: 0%;
}

h6{
    margin: 0px;
    padding: 0px;
}

td.producto,
th.producto {
    width: 160px;
    max-width: 160px;
}

td.cantidad,
th.cantidad {
    width: 60px;
    max-width: 60px;
    word-break: break-all;
}

td.precio,
th.precio {
    width: 80px;
    max-width: 80px;
    word-break: break-all;
}

.centrado {
    text-align: center;
    align-content: center;
}

</style>
