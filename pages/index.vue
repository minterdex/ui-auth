<template>
  <v-layout layout row justify-center align-center>
    <v-flex xs12 md5>
      <Welcome v-if="!hasAddress" />
      <LoginForm v-else />
    </v-flex>
  </v-layout>
</template>

<script>
import Welcome from '@/components/Welcome'
import LoginForm from '@/components/LoginForm'

export default {
  components: {
    Welcome,
    LoginForm
  },
  computed: {
    hasAddress() {
      return this.$store.state.accounts.length > 0
    }
  }
}
</script>
