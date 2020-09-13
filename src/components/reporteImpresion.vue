<template>
        <v-card >
          <div v-if="reporte" id="printReporte">
          <h3 class="headline alineacion pt-3">RESTAURANTE<br>{{nombreRestaurante}}</h3>
          <h5 class="alineacion">REPORTE DIARIO</h5>
          <h5 class="alineacion">{{reporte.fecha}}</h5>

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
                <tr v-for="plato in reporte.platos" :key="plato._id">
                <td><font size="1">{{ plato.nombre }}</font></td>
                <td><font size="1">{{ plato.cantidad }}</font></td>
                <td><font size="1">{{ formatoMoneda(plato.total) }}</font></td>
                </tr>
                <tr v-if="reporte.descuentos !== 0" >
                <td><font size="1">Descuentos</font></td>
                <td></td>
                <td><font size="1">{{ reporte.descuentos }}</font></td>
                </tr>
                <tr v-if="reporte.subtotalVenta !== 0" >
                <td><font size="1">SubTotal</font></td>
                <td></td>
                <td><font size="1">{{ reporte.subtotalVenta }}</font></td>
                </tr>
                <tr v-if="reporte.totalDomicilio !== 0" >
                <td><font size="1">Domicilio</font></td>
                <td></td>
                <td><font size="1">{{ reporte.totalDomicilio }}</font></td>
                </tr>
                <tr>
                <td><font size="1">Total</font></td>
                <td></td>
                <td><font size="1">{{ reporte.totalVendido }}</font></td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
          </div>
            <div class="pt-6" v-else>
                <h2 class="alineacion">Seleccione un reporte para observar vista previa</h2>
            </div>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
            bottom
            color="primary"
            text
            v-print=" 'printReporte' "
            @click="close"
            >
              Imprimir
            </v-btn>
            <v-btn
            bottom
            color="primary"
            text
            @click="close"
            >
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { printSection } from '../apis/print'

export default {
  data: () => ({
    search: '',
    TableHeight: window.innerHeight - 230
  }),
  directives: {
    print: {
      bind (el, binding) {
        printSection(el, binding)
      }
    }
  },
  computed: {
    ...mapGetters({
      headers: 'reporteModule/headers',
      lista: 'reporteModule/lista',
      nombreRestaurante: 'businessName',
      reporte: 'reporteModule/seleccionado'
    })
  },
  methods: {
    formatoMoneda (valor) {
      return '$' + new Intl.NumberFormat('es-co', { currency: 'COP' }).format(valor)
    },
    close () {
      this.$store.dispatch('changeimprimirReporteDialog')
    }
  }
}
</script>

<style>
.alineacion {
    text-align: center;
}
</style>
