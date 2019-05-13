<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-flex text-xs-center xs12>
        <h3 class="display-1 mt-2 mb-2">
          Create New Account
        </h3>
        <span class="grey--text">
          <nuxt-link to="/">Sign in</nuxt-link> to your wallet or <nuxt-link to="/import/restore">restore an account</nuxt-link> from a backup
        </span>
        <v-divider class="mt-4"></v-divider>
      </v-flex>
      <v-flex xs12 class="mt-4">
        <div class="subheading grey--text text--darken-3">Account address:</div>
        <div class="create_address">{{ $store.state.wallet.address }}</div>
        <v-checkbox color="primary" v-model="remember">
            <span slot="label">
              Keep the account on this computer
            </span>
          </v-checkbox>
      </v-flex>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onLogin">
        Continue
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      remember: false
    }
  },
  methods: {
    onLogin () {
      if (this.remember) {
        this.$store.commit('ADD_ACCOUNT')

      }

      this.$store.commit('SET_SECTION', 'create_backup')
    }
  }
}
</script>

<style>
.v-carousel {
  box-shadow: none!important;
}
</style>
