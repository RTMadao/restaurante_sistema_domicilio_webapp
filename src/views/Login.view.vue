<template>
  <v-card
  class="d-inline-block px-5 py-5 ma-5 align-center justify-center"
  elevation="2"
  :loading="loadinLoginComponent"
  >
    <h2 class="v-flex text-center">Login</h2>
    <v-alert type="error" v-if="thereIsAnErrorLogin">
      {{errorLogin}}
    </v-alert>
    <v-row>
        <v-card-actions>
            <form>
                <v-text-field
                v-model="userData.username"
                label="Nombre de Usuario"
                required
                ></v-text-field>
                <v-text-field
                v-model="userData.password"
                label="Contraseña"
                :append-icon="passwordIsShown ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwordIsShown ? 'text' : 'password'"
                required
                @click:append="passwordIsShown = !passwordIsShown"
                ></v-text-field>
                <v-spacer></v-spacer>
                <div class="d-flex px-4 mt-4">
                    <v-btn class="mr-4" color="primary" @click="submit">Ingresar</v-btn>
                    <v-btn @click="clear">Cancelar</v-btn>
                </div>
            </form>
        </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    userData: {
      username: '',
      password: ''
    },
    passwordIsShown: false
  }),
  computed: {
    ...mapGetters(['loadinLoginComponent', 'thereIsAnErrorLogin', 'errorLogin'])
  },
  methods: {
    submit () {
      this.$store.dispatch('authenticate', this.userData)
    },
    clear () {
      this.userData.username = ''
      this.userData.password = ''
      this.$store.dispatch('clearLogin')
    }
  }
}
</script>
