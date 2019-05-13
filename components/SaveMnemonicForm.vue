<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-flex text-xs-center xs12>
        <h3 class="display-1 mt-2 mb-2">
          Save backup phrase
        </h3>
        <span class="grey--text">
          Since only you control your money, you’ll need to save your backup phrase in case this app is deleted or <span @click="back" class="link">go back</span>
        </span>
        <v-divider class="mt-4"></v-divider>
      </v-flex>
      <v-flex xs12 class="mt-4">
        <div class="subheading grey--text text--darken-3">Please carefully write down these 12 words </div>
        <div class="seed-container">
          <span v-for="sentence in generatedMnemonic">{{ sentence }}</span>
        </div>
        <div class="subheading grey--text text--darken-3 mt-4">You will confirm this phrase on the next screen.</div>
      </v-flex>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onContinue">
        I've written it down
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  computed: {
    generatedMnemonic() {
      return this.$store.state.wallet.mnemonic.split(" ")
    }
  },
  methods: {
    onContinue() {
      this.$store.commit('SET_SECTION', 'create_confirm_mnemonic')
    },
    back() {
      this.$store.commit('SET_SECTION', 'create_backup')
    },
  }
}
</script>

<style>
.v-carousel {
  box-shadow: none!important;
}
.seed-container {
  background-color: #f8f9fb;
  padding: 15px;
  border: 1px solid #dae1e9;
  border-radius: 4px;
  font-size: 16px;
  color: #2d2d2d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  height:178px;
  align-items: center;
}
.seed-container > span {
  padding:5px 8px;
}
</style>
