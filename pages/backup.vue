<template>
  <v-layout layout row justify-center align-center>
    <v-flex xs12 md5>
      <BackupAddressForm />
    </v-flex>
  </v-layout>
</template>

<script>
import BackupAddressForm from '@/components/BackupAddressForm'

export default {
  components: {
    BackupAddressForm
  }
}
</script>
