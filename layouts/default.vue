<template>
  <v-app>
    <v-toolbar id="toolbar"fixed app>
      <v-spacer />
      <img src="/logo.png" alt="Minter Dex" height="36">
      <v-spacer />
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <v-flex xs12>
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {}
</script>