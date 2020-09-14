<template>
    <v-dialog
      v-model="agregarItemDialogIsVisible"
      persistent
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">Agregar item {{itemType}}</v-card-title>

        <v-card-text>
            <p>El item que desea ingresar no existe, por favor añadalo antes de usarlo.</p>
          <v-container>
            <v-text-field
            v-model="nombre"
            :label="label1"
            ></v-text-field>
            <v-text-field
            prefix="$"
            v-model="valor"
            :label="label2"
            ></v-text-field>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            @click="guardar(itemType)"
          >
            Guardar
          </v-btn>

          <v-btn
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

export default {
  data () {
    return {
      nombre: '',
      valor: ''
    }
  },
  props: {
    'item-type': String,
    label1: String,
    label2: String
  },
  computed: {
    ...mapGetters({
      agregarItemDialogIsVisible: 'agregarItemDialogIsVisible'
    })
  },
  methods: {
    ...mapActions({
      guardarDomicilio: 'domicilioModule/guardar',
      guardarMenu: 'menuModule/guardar'
    }),
    close () {
      this.nombre = ''
      this.valor = ''
      this.$store.dispatch('changeAgregarItemDialog')
    },
    guardar (opt) {
      switch (opt) {
        case 'domicilio':
          this.guardarDomicilio({
            barrio: this.nombre,
            valor: this.valor
          })
          break

        case 'menu':
          this.guardarMenu({
            nombre: this.nombre,
            precio: this.valor
          })
          break
      }
      this.close()
    }
  }
}
</script>
