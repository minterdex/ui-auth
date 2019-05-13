import CryptoJS from 'crypto-js'
import { generateAccount } from '@/assets/utils'

export default {
  SET_SECTION: (state, payload) => {
    state.section = payload;
  },
  SET_WALLET: (state, payload) => {
    state.wallet = payload
  },
  SET_WALLET_PASSWORD: (state, payload) => {
    state.wallet.password = payload
  },
  SET_WALLET_MNEMONIC: (state, payload) => {
    state.wallet.mnemonic = payload
  },
  SET_WALLET_ADDRESS: (state, payload) => {
    state.wallet.address = payload
  },
  SET_WALLET_WEB3: (state, payload) => {
    state.wallet.web3 = payload
  },
  SET_WALLET_TYPE: (state, payload) => {
    state.wallet.type = payload
  },
  SET_WALLET_ERROR: (state, payload) => {
    state.wallet.error = payload
  },
  ADD_ACCOUNT: (state, mnemonic) => {
    let account = {
      address: state.wallet.address,
    }

    if (state.wallet.type === 'web3') {
      account.type = 'web3'
    }

    if (mnemonic) {
      account.encryptedMnemonic = CryptoJS.AES.encrypt(state.wallet.mnemonic, state.wallet.password).toString()
      account.type = 'mnemonic'
    }

    state.accounts.push(account)
  },
  REMOVE_ACCOUNT: (state, payload) => {
    state.accounts.splice(payload, 1)
  },
  LOG_OUT: (state, payload) => {
    let wallet = {
      address: null,
      mnemonic: null,
      password: null,
      type: null,
      web3: null
    }

    state.wallet = wallet
  },
  DECRYPT_ACCOUNT: (state, payload) => {
    try {
      let mnemonic = CryptoJS.AES.decrypt(state.accounts[0].encryptedMnemonic, payload).toString(CryptoJS.enc.Utf8)
      let account = generateAccount(mnemonic, payload)

      if (account.address !== state.accounts[0].address) {
        return
      }

      state.wallet = account
    } catch (e) {
      return 
    }
  },
  REGISTER_WEB3_INSTANCE (state, payload) {
      //console.log('registerWeb3instance Mutation being executed', payload)

      let result = payload
      let web3Copy = payload.web3

      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3

      state.wallet.address = web3Copy.coinbase
      state.wallet.type = 'web3'
      state.wallet.web3 = web3Copy
    }
}