<template>

  <select 
    class="button light"
    @change="setBaseCurrency($event.target.value)"
    title="select base currency"
    :disabled="error"
  >
    <option
      v-for="currency in currencies"
      :key="currency.key"
      :selected="baseCurrency === currency[0]"
    >
      {{currency[0]}}  
    </option>
  </select>
  
</template>

<script>
export default {
  computed: {
    currencies() {
      return this.$store.getters.currenciesDefaultList
    },

    baseCurrency() {
      return this.$store.state.baseCurrency
    },

    error() {
      return this.$store.state.error
    }
  },

  created() {
    if (!this.baseCurrency) this.$store.dispatch('setBaseCurrency', this.currencies[0][0])
  },

  methods: {
    setBaseCurrency(currency) {
      this.$store.dispatch('setBaseCurrency', currency)
    }
  }
}
</script>