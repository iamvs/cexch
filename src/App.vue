<template>

  <!-- HEADER -->
  <the-header/>

  <!-- VIEWS -->
  <main class="container">
    <router-view/>
  </main>

  <!-- NOTIFICATIONS -->
  <app-notifications v-if="error"/>

</template>

<script>
import TheHeader from '@/components/TheHeader'
import AppNotifications from '@/components/AppNotifications'

export default {
  components: {
    TheHeader,
    AppNotifications
  },

  computed: {
    error() {
      return this.$store.state.error
    }
  }
}
</script>

<style lang="scss">
#app {
  text-align: center;
  height: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
