<template>
  <header id="header">
    <div class="container">
      
      <!-- ROUTER LINKS -->
      <nav class="nav">
        <router-link 
          v-for="link in links"
          :key="link.key"
          :to="link.path"
          class="menu-link"
        >
          {{link.name}}
        </router-link>
      </nav>

    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {name: 'Currencies', path: '/'},
        {name: 'Exchange', path: '/exchange'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  background: $color_white;
  box-shadow: 0 0 5px #ccc;
  margin-bottom: 2.5rem;
  .container {
    justify-content: center;
  }
}

.nav {
  display: flex;
  height: 45px;
  justify-content: center;
  .menu-link {
    color: #444;
    margin: 0 .5rem;
    padding: 1rem .5rem;
    text-decoration: none;
    &.exact-active {
      border-bottom: 2px solid $color_blue;
    }
  }
}
</style>