<template>
  <v-layout layout row justify-center align-center>
    <v-flex xs12 md5>
      <v-slide-x-transition mode="out-in">
        <CreatePasswordForm v-if="section === 'create_password'" />
        <CreateAddressForm v-if="section === 'create_address'" />
        <BackupAddressForm v-if="section === 'create_backup'" />
        <SaveMnemonicForm v-if="section === 'create_save_mnemonic'" />
        <ConfirmMnemonicForm v-if="section === 'create_confirm_mnemonic'" />
      </v-slide-x-transition>
    </v-flex>
  </v-layout> 
</template>

<script>
import { mapGetters } from 'vuex'
import CreatePasswordForm from '@/components/CreatePasswordForm'
import CreateAddressForm from '@/components/CreateAddressForm'
import BackupAddressForm from '@/components/BackupAddressForm'
import SaveMnemonicForm from '@/components/SaveMnemonicForm'
import ConfirmMnemonicForm from '@/components/ConfirmMnemonicForm'

export default {
  components: {
    CreateAddressForm,
    CreatePasswordForm,
    BackupAddressForm,
    SaveMnemonicForm,
    ConfirmMnemonicForm
  },
  mounted() {
    if (!this.password) {
      this.$store.commit('SET_SECTION', 'create_password')
    }
  },
  computed: {
    ...mapGetters([
      'password',
      'address',
      'section'
    ])
  }
}
</script>
