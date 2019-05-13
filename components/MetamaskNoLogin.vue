<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-flex text-xs-center xs12>
        <v-icon size="120" color="red">mdi-close-circle</v-icon>
        <h3 class="title my-4">
          Enter password from Metamask
        </h3>
        <span class="body-1 grey--text text--darken-1">
          To continue working with Metamask, you must enter a previously-created password, or create a new one. <nuxt-link to="/import">Go back</nuxt-link>
        </span>
      </v-flex>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  mounted() {
    setInterval(()=> this.$store.dispatch('registerWeb3'), 1000);
  }
}
</script>
