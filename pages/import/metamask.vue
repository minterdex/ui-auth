<template>
  <div>
    <MetamaskNoInstall v-if="!$store.state.wallet.web3 && !$store.state.wallet.error" />
    <MetamaskNoLogin v-if="$store.state.wallet.error" />
    <MetamaskImport v-if="$store.state.wallet.web3" />
  </div>
</template>

<script>
import MetamaskNoInstall from '@/components/MetamaskNoInstall'
import MetamaskNoLogin from '@/components/MetamaskNoLogin'
import MetamaskImport from '@/components/MetamaskImport'

export default {
  components: {
    MetamaskNoInstall,
    MetamaskNoLogin,
    MetamaskImport
  },
  mounted() {
    this.$store.dispatch('registerWeb3')
  },
}
</script>