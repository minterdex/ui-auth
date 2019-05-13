<template>
  <v-layout layout row justify-center align-center>
    <v-flex xs12 md5>
      <v-card flat>
        <v-card-title primary-title>
          <v-flex text-xs-center xs12>
            <h3 class="display-1 mt-2 mb-2">
              Import Account from Metamask
            </h3>
            <v-divider class="mt-4"></v-divider>
          </v-flex>
          <v-flex xs12 class="mt-4">
            <div class="subheading grey--text text--darken-3">Indirizzo Ethereum:</div>
            <div class="create_address">{{ $store.state.wallet.address }}</div>
            <v-checkbox color="primary" v-model="remember">
                <span slot="label">
                  Mantieni l'account su questo computer
                </span>
              </v-checkbox>
          </v-flex>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onLogin">
            Accedi
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      remember: false
    }
  },
  mounted() {
    if (this.$store.state.accounts.length > 0) {
      if (this.$store.state.wallet.address === this.$store.state.accounts[0].address) {
        this.$store.dispatch('registerWeb3')

        this.$router.push('/wallet/assets')
      }
    }
  },
  methods: {
    onLogin () {
      if (this.remember) {
        this.$store.commit('ADD_ACCOUNT')
      }

      this.$router.push('/wallet/assets')
    }
  }
}
</script>