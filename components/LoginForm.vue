<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-flex text-xs-center xs12>
        <h3 class="display-1 mt-2 mb-2">
          Sign in
        </h3>
        <span class="grey--text">
          Sign in to your Minter Wallet
        </span>
      </v-flex>
      <v-flex xs12 class="mt-4">

        
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-list two-line class="pa-0" style="border: 1px solid rgb(217, 218, 223)">
              <v-list-tile v-on="on">
                <v-list-tile-avatar>
                  <v-avatar size="38" v-html="$store.getters.avatar"></v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-if="$store.state.accounts[0].type === 'web3'">Metamask</v-list-tile-title>
                <v-list-tile-title v-else>Account #{{ index + 1 }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ $store.state.accounts[0].address }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>mdi-chevron-down</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </template>
          
          <v-list two-line class="pa-0">

            <v-list-tile @click="" v-for="(account, index) in $store.getters.accounts" :key="index">
              <v-list-tile-avatar>
                <v-avatar size="38" v-html="$store.getters.avatar"></v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content style="max-width:249px">
                <v-list-tile-title v-if="account.type === 'web3'">Metamask</v-list-tile-title>
                <v-list-tile-title v-else>Account #{{ index + 1 }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ account.address }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action @click="deleteAccount(index)">
                <v-btn icon ripple>
                  <v-icon color="grey darken-1">mdi-close-circle</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>

            <v-list-tile @click="toImport">
              <v-list-tile-action class="pl-2">
                <v-icon color="blue">mdi-plus-circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content style="max-width:249px">
                <v-list-tile-title class="blue--text">Import account</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list>
        </v-menu>

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
      </v-flex>
      <v-flex xs12 v-if="showError">
        <span class="red--text">Password wrong!</span>
      </v-flex>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="decryptAccount" v-if="$store.state.accounts[0].type === 'mnemonic'">
        Accedi
      </v-btn>
      <v-btn color="primary" @click="toImportMetamask" v-else>
        Accedi
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      showPassword: false,
      showError: false,
    }
  },
  methods: {
    toImport() {
      this.$router.push('/import')
    },
    toImportMetamask(){
      this.$store.dispatch('registerWeb3')
      this.$router.push('/wallet/assets')
    },
    async savePassword () {
      let err = await this.$validator.validateAll()

      if (!err) {
        return
      }

      this.$store.commit('SET_WALLET_PASSWORD', this.password)
      this.$store.dispatch('generateWallet')
      this.$store.commit('SET_SECTION', 'create_address')
    },
    decryptAccount () {
      this.$store.commit('DECRYPT_ACCOUNT', this.password)
        this.password = ""

        if (!this.$store.state.wallet.address) {
          this.showError = true
          return
        }

      this.$router.push('/wallet/assets')
    },
    deleteAccount (account) {
      this.$store.dispatch('removeAccount', account)
    }
  },
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
