<template>
  <v-layout layout row justify-center align-center>
    <v-flex xs12 md5>
      <CreatePasswordForm />
    </v-flex>
  </v-layout> 
</template>

<script>
import CreatePasswordForm from '@/components/CreatePasswordForm'

export default {
  components: {
    CreatePasswordForm
  }
}
</script>
