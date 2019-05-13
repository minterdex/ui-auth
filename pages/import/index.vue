<template>
  <div>
    <v-layout layout row justify-center align-center pb-4>
      <v-flex xs12 md5>
        <v-card class="pa-2" flat>
          <v-card-title primary-title>
            <v-flex text-xs-center xs12>
              <h3 class="display-1 mt-2 mb-2">
                Import accounts
              </h3>
              <span class="grey--text">
                Select where to import accounts from
              </span>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container grid-list-xl>
      <v-layout layout justify-center wrap pb-4>

      <v-flex xs12 pb-4 mx-2 v-for="method in methods" :key="method.title">
        <v-card class="pa-2" flat style="border: 1px solid #edf0f4; cursor:pointer" nuxt :to="method.to">
          <v-card-title primary-title>
            <v-flex text-xs-center xs12>
              <img :src="method.icon" height="48px" />
              <h5 class="subheading my-3" v-html="method.title"></h5>
              <span class="grey--text" v-html="method.description"></span>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>

    </v-layout>
    </v-container>

    

    <v-layout layout row justify-center align-center>

      <v-flex text-xs-center xs12 class="">
        <div class="caption my-3 grey--text text--darken-1">
          OPPURE
        </div>
        <nuxt-link to="/" class="pt-4">Torna indietro</nuxt-link>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>

export default {
  data () {
    return {
      methods: [
        { icon: 'logo-ethereum.png', to: '', title: 'Mnemonic Phrase', description: 'Import accounts from your Mnemonic Phrase' },
        { icon: 'logo-metamask.svg', to: '/import/metamask', title: 'Metamask', description: 'Import accounts from<br>Metamask' },
        { icon: 'logo-trezor.png', to: '', title: 'Trezor', description: 'Import accounts from your Trezor' },
        { icon: 'logo-ledger.svg', to: '', title: 'Ledger Nano S', description: 'Import accounts from your Ledger Nano S' },
      ]
    }
  }
}
</script>
