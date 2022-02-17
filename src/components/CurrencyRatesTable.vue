<template>
  <div class="table">
    <h1 class="heading">Exchange Rates</h1>

    <!-- Currencies Rates -->
    <div 
      v-for="currency in filteredCurrencies"
      :key="currency.key"
      class="row"
    >
      <!-- Currency Cell -->
      <div 
        class="cell left"
        :class="{'loading': loading}"
      >
        <div 
          v-if="loading"
          data-placeholder 
        ></div>
        <strong v-else>
          {{currency[0]}}
        </strong>
      </div>

      <!-- Value Cell -->
      <div 
        class="cell right"
        :class="{'loading': loading}"
      >
        <div 
          v-if="loading"
          data-placeholder 
        ></div>
        <template v-else>
          <span class="value">{{showValue(currency)}}</span> 
          <span class="currency">{{baseCurrency}}</span>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading
    },

    baseCurrency() {
      return this.$store.state.baseCurrency
    },

    filteredCurrencies() {
      return this.$store.getters.filteredCurrencies
    },
  },

  methods: {
    showValue(currency) {
      let val = 1 / Number(currency[1])
      if (this.baseCurrency === 'BTC' || this.baseCurrency === 'ETH' || this.baseCurrency === 'USDT') {
        return val.toFixed(10).replace(/\.?0+$/,'')
      }
      if (currency[0] === 'BTC' || currency[0] === 'ETH' || currency[0] === 'USDT') {
        return val.toFixed(10).replace(/\.?0+$/,'')  
      } 
      return val.toFixed(4).replace(/\.?0+$/,'')
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  background: $color_white;
  border-radius: $border-radius;
  padding: 1.5rem 3rem;
  margin: 0 0 2.5rem;
  .row {
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 50px;
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
  }
}

.cell {
  background: transparent;
  font-size: 1.4rem;
  align-self: center;
  position: relative;
  transition: background-color .3s ease;
  height: 20px;
  &.loading {
    border-radius: $border_radius;
    background: $color_loader;
  }
  &.left {
    width: 50px;
    text-align: left;
  }
  &.right {
    width: 200px;
    text-align: right;
  }
  .value {
    padding-right: 1rem;
  }
}
</style>