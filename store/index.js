import Vuex from "vuex"

import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters"

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      section: null,
      accounts: [],
      wallet: {
        web3: null,
        type: null,
        password: null,
        mnemonic: null,
        address: null,
        error: null
      }
    }),
    actions,
    mutations,
    getters
  })
}

export default createStore
