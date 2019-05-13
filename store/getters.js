import jdenticon from 'jdenticon'

export default {
  section(state) {
    return state.section
  },
  address(state) {
    return state.wallet.address
  },
  password(state) {
    return state.wallet.password
  },
  mnemonic(state) {
    return state.wallet.mnemonic
  },
  avatar(state) {
    return jdenticon.toSvg(state.wallet.address, 38)
  },
  accounts(state) {
    return state.accounts
  },
  isAuthorized(state) {
    return state.wallet.address ? true  : false
  }
}
