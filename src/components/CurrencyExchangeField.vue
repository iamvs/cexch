<template>
  <div 
    class="field"
    :class="{'opacity-40': loading}"
  >

    <!-- Input -->
    <input 
      :value="getValue(modelValue)"
      @input="updateValue($event.target.value)"
      :placeholder="placeholder"
      ref="input"
      type="text"
      autocomplete="off"
      :disabled="loading || error"
    />

    <!-- Select -->
    <select 
      class="button dark"
      @change="setBaseCurrency($event.target.value)"
      :disabled="error"
    >
      <option
        v-for="currency in currencies"
        :key="currency.key"
        :selected="selectedCurrency === currency[0]"
      >
        {{currency[0]}}  
      </option>
    </select>

  </div>
</template>

<script>
export default {
  props: {
    modelValue: Number,
    placeholder: String,
    type: String,
    selectedCurrency: String,
    currencies: Array
  },

  computed: {
    loading() {
      return this.$store.state.loading
    },

    error() {
      return this.$store.state.error
    }
  },

  methods: {
    updateValue(val) {
      if (isNaN(val)) {
        this.$refs.input.value = null
        return
      }
      this.$emit('update:modelValue', Number(val))
    },

    setBaseCurrency(currency) {
      this.$store.dispatch(this.type, currency)
    },

    getValue(val) {
      if (val) return Number(val).toFixed(10).replace(/\.?0+$/,'')
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  position: relative;
  margin: 0 0 2rem;
  .button {
    position: absolute;
    right: 0;
  }
}
</style>