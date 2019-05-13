<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-flex text-xs-center xs12>
        <h3 class="display-1 mt-2 mb-2">
          Protect Your Account
        </h3>
        <span class="grey--text">
          Protect your account with a password or <nuxt-link to="/">go back</nuxt-link>
        </span>
        <v-divider class="mt-4"></v-divider>
      </v-flex>
      <v-flex xs12 class="mt-4">
        <v-text-field
            ref="password"
            v-model="password"
            v-validate="'required|min:8|max:86'"
            outline
            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
            :type="showPassword ? 'text' : 'password'"
            data-vv-name="password"
            :error-messages="errors.collect('password')"
            label="Inserisci la password"
            @click:append="showPassword = !showPassword"
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field
            ref="password_confirmation"
            v-model="password_confirmation"
            v-validate="'required|min:8|max:86|confirmed:password'"
            outline
            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
            :type="showPassword ? 'text' : 'password'"
            data-vv-name="password_confirmation"
            :error-messages="errors.collect('password_confirmation')"
            label="Conferma la password"
            @click:append="showPassword = !showPassword"
          />
        </v-flex>
      </v-flex>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-2" dark @click="savePassword">
        Continue
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      password: "",
      password_confirmation: "",
      showPassword: false
    }
  },
  methods: {
    async savePassword () {
      let err = await this.$validator.validateAll()

      if (!err) {
        return
      }

      this.$store.commit('SET_WALLET_PASSWORD', this.password)
      this.$store.dispatch('generateWallet')
      this.$store.commit('SET_SECTION', 'create_address')
    }
  }
}
</script>

<style>
.v-carousel {
  box-shadow: none!important;
}
.create_address {
  background-color: #f8f9fb;
  padding: 15px;
  border: 1px solid #dae1e9;
  border-radius: 4px;
  font-size: 16px;
  color: #2d2d2d
}
</style>
