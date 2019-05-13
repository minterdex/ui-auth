<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-flex text-xs-center xs12>
        <v-icon size="100" color="primary">mdi-pencil-lock-outline</v-icon>
        <h3 class="display-1 mt-2 mb-2">
          No Backup, No Money
        </h3>
        <span class="subheading grey--text text--darken-1">
          You must save the secret phrase. It is crucial for accessing your account.
        </span>
      </v-flex>
      <v-flex text-xs-center xs12 class="mt-4">
        <v-btn color="primary" @click="dialog = true" large>Back Up Now</v-btn>
        <div class="caption my-3 grey--text text--darken-1">
          OR
        </div>
        <nuxt-link to="/wallet/assets" class="pt-4">Do it later</nuxt-link>
      </v-flex>
    </v-card-title>

     <v-dialog
      v-model="dialog"
      width="500"
    >

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Treat your backup phrase with care!
        </v-card-title>

        <v-card-text class="grey--text text--darken-3">
          <p>Minter DEX would like to warn you about the increased frequency of scam and phishing attacks over the last month. Fraudsters are hiding their malware in their own versions of the Minter client and promising bonuses and discounts to lure in users.</p>
          <p>Please be careful and never input your SEED into these 'clients', because your account will be compromised and you will lose all of your funds.</p>
          <p>You should ONLY use the official Minter client.</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            primary
            @click="onAccept"
          >
            I understand
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    onAccept() {
      this.dialog = false
      this.$store.commit('SET_SECTION', 'create_save_mnemonic')
    }
  }
}
</script>