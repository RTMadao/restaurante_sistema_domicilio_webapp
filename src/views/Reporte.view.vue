<template>
  <v-container ref="contenedor" class="tamaño-contenedor">
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <v-card class="ma-0 ma-md-3">
          <v-card-title class="pt-3">
            <v-row class="d-flex justify-center">
              <v-col cols="12" md="4">
                <h3 class="d-none d-md-inline mt-3">Reportes Diarios</h3>
                <v-spacer></v-spacer>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  width="30"
                  solo
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="d-flex justify-center">
                <v-btn
                color="primary"
                @click="generar"
                >Generar Reporte</v-btn>
              </v-col>
            </v-row>
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
            @click:row="seleccionarReporte"
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="4" class="d-none d-md-inline">
        <reporteImpresion />
      </v-col>
    </v-row>
    <v-dialog
      v-model="imprimirReporteDialogIsVisible"
      max-width="350"
      max-height="600"
      persistent
      class="d-md-none"
    >
      <reporteImpresion />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import reporteImpresion from '../components/reporteImpresion'

export default {
  data: () => ({
    search: '',
    TableHeight: window.innerHeight - 230
  }),
  components: {
    reporteImpresion
  },
  computed: {
    ...mapGetters({
      headers: 'reporteModule/headers',
      lista: 'reporteModule/lista',
      nombreRestaurante: 'businessName',
      imprimirReporteDialogIsVisible: 'imprimirReporteDialogIsVisible'
    })
  },
  methods: {
    ...mapActions({
      select: 'reporteModule/select',
      generarReporte: 'reporteModule/generarReporte'
    }),
    seleccionarReporte (reporte) {
      if (window.innerWidth < 1280) { this.$store.dispatch('changeimprimirReporteDialog') }
      this.select(reporte.id)
    },
    generar () {
      this.generarReporte()
    }
  }
}
</script>

<style>
.alineacion {
  text-align: center;
}
</style>
