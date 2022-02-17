<template>
  <div id="currency-exchange">
    <h1 class="heading">Exchange Form</h1>

    <form class="form">

      <!-- CURRENCY EXCHANGE FIELD -->
      <currency-exchange-field
        v-model="amountUserPays"
        :placeholder="'You Pay'"
        :type="'setBaseCurrency'"
        :selectedCurrency="baseCurrency"
        :currencies="currencies"
        @focusin="activeField = 'pay'"
      ></currency-exchange-field>

      <!-- CURRENCY EXCHANGE FIELD -->
      <currency-exchange-field
        v-model="amountUserGets"
        :placeholder="'You Get'"
        :type="'setQuoteCurrency'"
        :selectedCurrency="quoteCurrency"
        :currencies="currencies"
        @focusin="activeField = 'get'"
      ></currency-exchange-field>

      <!-- Result -->
      <div class="result">
        <p>Currency Exchange Rate</p>
        <div 
          :class="{'loading': loading}"
          class="rate"
        >
          <div 
            v-if="loading"
            data-placeholder 
          ></div>
          <span v-else>
            1 {{baseCurrency}} = {{rate}} {{quoteCurrency}}
          </span>
        </div>
      </div>

    </form>

  </div>
</template>

<script>
import CurrencyExchangeField from './CurrencyExchangeField'

export default {
  components: {
    CurrencyExchangeField
  },
  
  data() {
    return {
      amountUserPays: null,
      amountUserGets: null,
      activeField: null
    }
  },

  computed: {
    loading() {
      return this.$store.state.loading
    },

    baseCurrency() {
      return this.$store.state.baseCurrency
    },

    quoteCurrency() {
      return this.$store.state.quoteCurrency
    },

    currencies() {
      return this.$store.getters.currenciesDefaultList
    },

    rate() {
      if (!this.quoteCurrency || !this.baseCurrency) return 0
      return this.currencies.find(c => c[0] === this.quoteCurrency)[1]
    }
  },

  watch: {
    amountUserPays(newVal) {
      if (this.activeField === 'pay') this.amountUserGets = newVal * this.rate
    },

    amountUserGets(newVal) {
      if (this.activeField === 'get') this.amountUserPays = newVal / this.rate
    },

    rate(newVal) {
      if (newVal && this.amountUserPays) this.amountUserGets = newVal * this.amountUserPays
    },

    baseCurrency(newVal) {
      if (newVal === this.quoteCurrency) this.switch(this.quoteCurrency, 'setQuoteCurrency')
    },

    quoteCurrency(newVal) {
      if (newVal === this.baseCurrency) this.switch(this.baseCurrency, 'setBaseCurrency')
    }
  },

  created() {
    if (!this.baseCurrency) this.$store.dispatch('setBaseCurrency', this.currencies[0][0])
    if (this.quoteCurrency === this.baseCurrency || !this.quoteCurrency) this.switch(this.baseCurrency, 'setQuoteCurrency')
  },

  methods: {
    switch(val, type) {
      const element = this.currencies.find(c => c[0] === val)
      let index = this.currencies.indexOf(element) + 1
      if (this.currencies.length === index) index = 0
      this.$store.dispatch(type, this.currencies[index][0])
    }
  }
}
</script>

<style lang="scss" scoped>
#currency-exchange {
  background: $color_white;
  border-radius: $border-radius;
  padding: 1.5rem;
  margin: 0 0 2.5rem;
  .form {
    max-width: 500px;
    margin: 1rem auto;
  }
  .result {
    background: $color_light_gray;
    border-radius: $border-radius;
    padding: 1rem 0;
    p {
      margin: 0;
    }
    .rate {
      height: 20px;
      position: relative;
      overflow: hidden;
      &.loading {
        border-radius: $border_radius;
        background: $color_loader;
        width: 250px;
        margin: 0 auto;
      }
    }
  }
}
</style>