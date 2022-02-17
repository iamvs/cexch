import { createStore } from 'vuex'
import axios from 'axios'

const currenciesDefaultList = {'UAH': 0, 'USD': 0, 'EUR': 0, 'GBP': 0, 'JPY': 0, 'BTC': 0, 'ETH': 0, 'USDT': 0, 'RUB': 0, 'CAD': 0}

export default createStore({
  state: {
    loading: false,
    error: false,
    currencies: currenciesDefaultList,
    baseCurrency: null,
    quoteCurrency: null
  },

  mutations: {
    TOGGLE_LOADING(state) {
      state.loading = !state.loading
    },

    SET_BASE_CURRENCY(state, payload) {
      state.baseCurrency = payload
    },

    SET_QUOTE_CURRENCY(state, payload) {
      state.quoteCurrency = payload
    },

    SET_CURRENCIES(state, payload) {
      state.currencies = payload
    },

    SET_ERROR(state, payload) {
      state.error = payload
    }
  },

  actions: {
    setBaseCurrency({commit}, payload) {

      commit('SET_BASE_CURRENCY', payload)

      commit('TOGGLE_LOADING')
      
      axios.get('https://api.coinbase.com/v2/exchange-rates?currency=' + payload)
        .then(resp => {
          const rates = Object.entries(resp.data.data.rates)
          let currencies = Object.entries(currenciesDefaultList)
          
          currencies.forEach(c => {
            const found = rates.find(r => r[0] === c[0])
            if (found) c[1] = Number(found[1]).toFixed(10).replace(/\.?0+$/,'')
          })
          
          commit('SET_CURRENCIES', Object.fromEntries(currencies))
        })
        .catch(error => commit('SET_ERROR', error))
        .finally(() => commit('TOGGLE_LOADING'))
        
    },

    setQuoteCurrency({commit}, payload) {
      commit('SET_QUOTE_CURRENCY', payload)
    }
  },

  getters: {    
    currenciesDefaultList: state => {
      return Object.entries(state.currencies)
    },

    filteredCurrencies: state => {
      return Object.entries(state.currencies).filter(c => c[0] !== state.baseCurrency)
    }
  }
})
