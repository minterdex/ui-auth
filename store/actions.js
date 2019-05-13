import bip39 from 'bip39'
import { generateAccount } from '@/assets/utils'
import getWeb3 from '@/api/getWeb3'

export default {
  generateMnemonic({ state, commit }) {
    const mnemonic = bip39.generateMnemonic()

    commit('SET_WALLET_MNEMONIC', mnemonic)
  },
  async generateWallet({ state, commit, dispatch }) {
    dispatch('generateMnemonic')

    let account = generateAccount(state.wallet.mnemonic, state.wallet.password)
    
    commit('SET_WALLET_ADDRESS', account.address)
  },
  removeAccount({ state, commit, dispatch}, payload) {
    commit('REMOVE_ACCOUNT', payload)
  },
  resetPassword({ state, commit, dispatch }) {
    let password = {}
    commit('SET_WALLET_PASSWORD', password)
  },
  registerWeb3 ({ commit }) {
      getWeb3.then(result => {
        commit('REGISTER_WEB3_INSTANCE', result)
      }).catch(e => {
        commit('SET_WALLET_ERROR', e.message)
      })
  }
}
