<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-flex text-xs-center xs12>
        <v-carousel hide-controls hide-delimiters height="280">
          <v-carousel-item>
            <v-icon size="100" color="orange darken-3">mdi-cube-outline</v-icon>
            <h3 class="display-1 mt-2 mb-2">
              Get Started with Minter
            </h3>
            <span class="subheading grey--text text--darken-1">
              Become part of a fast-growing area of the crypto world.<br>You are the only person who can access your crypto assets.
            </span>
          </v-carousel-item>
          <v-carousel-item>
            <v-icon size="100" color="orange darken-3">mdi-wallet</v-icon>
            <h3 class="display-1 mt-2 mb-2">
              Wallet
            </h3>
            <span class="subheading grey--text text--darken-1">
              Store, manage and receive interest<br>on your digital assets balance, easily and securely.
            </span>
          </v-carousel-item>
          <v-carousel-item>
            <v-icon size="100" color="orange darken-3">mdi-call-split</v-icon>
            <h3 class="display-1 mt-2 mb-2">
              Decentralised Exchange
            </h3>
            <span class="subheading grey--text text--darken-1">
              Trade quickly and securely. You retain complete control over your funds<br>when trading them on our decentralised exchange.
            </span>
          </v-carousel-item>
        </v-carousel>
        <v-btn color="green darken-2" dark nuxt to="/create" large>Get Started</v-btn>
        <div class="caption my-3 grey--text text--darken-1">
          OR
        </div>
        <nuxt-link to="/import" class="pt-4">Import account</nuxt-link>
      </v-flex>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  
}
</script>

<style>
.v-carousel {
  box-shadow: none!important;
}
</style>
