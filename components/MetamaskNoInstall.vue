<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-flex text-xs-center xs12>
        <img src="~/static/logo-metamask.svg" height="120" />
        <h3 class="title my-4">
          Non possiedi Metamask?
        </h3>
        <span class="body-1 grey--text text--darken-1">
          Dopo l'installazione, crea un account, accedi, e quindi ricarica la pagina per continuare
        </span>
      </v-flex>
      <v-flex text-xs-center xs12 class="mt-4">
        <v-btn color="primary" large @click="toMetamaskChrome">Installa</v-btn>
        <div class="caption my-3 grey--text text--darken-1">
          OPPURE
        </div>
        <nuxt-link to="/import" class="pt-4">Torna indietro</nuxt-link>
      </v-flex>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  methods: {
    toMetamaskChrome () {
      window.location.replace("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn")
    }
  }
}
</script>
