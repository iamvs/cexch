<template>
  <div class="top">
    <div 
      class="date"
      title="Last time updated"
    >
      {{date}}
    </div>

    <!-- BASE CURRENCY SWITCHER -->
    <currency-base-switcher></currency-base-switcher>
  </div>

  <!-- RATES TABLE -->
  <currency-rates-table></currency-rates-table>
</template>

<script>
import CurrencyBaseSwitcher from '@/components/CurrencyBaseSwitcher'
import CurrencyRatesTable from '@/components/CurrencyRatesTable'

export default {
  components: {
    CurrencyBaseSwitcher,
    CurrencyRatesTable
  },

  computed: {
    date() {
      const [, month, day, year, time] = new Date().toString().split(' ')
      return day + ' ' + month + ' ' + year + ' at ' + time
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 2.5rem;
  .date {
    font-weight: 300;
    font-size: 1.4rem;
  }
}
</style>
