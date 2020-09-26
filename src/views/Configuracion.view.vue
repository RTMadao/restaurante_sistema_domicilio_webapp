<template>
    <div class="mt-5 mx-16">
        <h1>Configuracion</h1>
        <v-card class="mt-3">
            <v-card-title>Informacion Restaurante</v-card-title>
            <v-row class="mx-5">
                <v-col cols="3">
                    <v-file-input
                    v-model="logo"
                    accept="image/png, image/jpeg, image/bmp"
                    prepend-icon="mdi-camera"
                    ref="image"
                    enctype="multipart/form-data"
                    label="Logo"
                    ></v-file-input>
                </v-col>
                <v-col  cols="3">
                    <v-btn
                    class="ml-3 mt-3"
                    @click="guardarLogo(logo)"
                    color="primary"
                    >Guardar Logo</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                    <v-img
                    :src="logourl.cloudinaryURL"
                    max-width="200"
                    max-height="100"
                    ></v-img>
                </v-col>
            </v-row>
            <div>
                <v-list-item>
                    <v-list-item-content>
                        <v-row class="px-3">
                            <v-col>
                                <v-list-item-title>Nombre del restaurante:</v-list-item-title>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-if="estaEditandoInfoRestaurante"
                                    solo
                                    v-model="info.nombreRestaurante"
                                    label="Nombre restaurante"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <p v-else class="text--disabled">{{nombreRestaurante}}</p>
                            </v-col>
                        </v-row>
                         </v-list-item-content>
                </v-list-item>
                        <v-list-item>
                    <v-list-item-content>
                        <v-row class="px-3">
                            <v-col>
                                <v-list-item-title>NITT:</v-list-item-title>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-if="estaEditandoInfoRestaurante"
                                    solo
                                    v-model="info.nitt"
                                    label="Nitt"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <p v-else class="text--disabled">{{nitt}}</p>
                            </v-col>
                        </v-row>
                         </v-list-item-content>
                </v-list-item>
                        <v-list-item>
                    <v-list-item-content>
                        <v-row class="px-3">
                            <v-col>
                                <v-list-item-title>Datos de contacto:</v-list-item-title>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-if="estaEditandoInfoRestaurante"
                                    solo
                                    v-model="info.datosContacto"
                                    label="Datos de contacto"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <p v-else class="text--disabled">{{datosContacto}}</p>
                            </v-col>
                        </v-row>
                    </v-list-item-content>
                </v-list-item>
                <v-btn
                class="ml-3 my-3"
                @click="pressBTNInforRestaurante"
                color="primary"
                >{{labelBTNInfoRestaurante}}</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    logo: '',
    info: {
      nombreRestaurante: '',
      nitt: '',
      datosContacto: ''
    },
    estaEditandoInfoRestaurante: false
  }),
  computed: {
    ...mapGetters({
      logourl: 'configuracionModule/logo',
      nombreRestaurante: 'configuracionModule/nombreRestaurante',
      nitt: 'configuracionModule/nitt',
      datosContacto: 'configuracionModule/datosContacto'
    }),
    labelBTNInfoRestaurante: function () {
      return (this.estaEditandoInfoRestaurante) ? 'Guardar informacion' : 'Editarm informacion'
    }
  },
  methods: {
    ...mapActions({
      guardarLogo: 'configuracionModule/guardarLogo',
      guardarInfoRestaurante: 'configuracionModule/guardarInfoRestaurante'
    }),
    pressBTNInforRestaurante () {
      if (this.estaEditandoInfoRestaurante) this.guardarInfoRestaurante(this.info)
      else {
        this.info.nombreRestaurante = this.nombreRestaurante
        this.info.nitt = this.nitt
        this.info.datosContacto = this.datosContacto
      }
      this.estaEditandoInfoRestaurante = !this.estaEditandoInfoRestaurante
    }
  }
}
</script>
