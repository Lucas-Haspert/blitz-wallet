import { createStore } from 'vuex'
import loading from './loading.module'
import transaction from './transaction.module'
import exchange from './exchange.module'
import account from './account.module'
import forex from './forex.module'
import coin from './coin.module'

export default createStore({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    loading,
    transaction,
    exchange,
    account,
    forex,
    coin,
  }
})
