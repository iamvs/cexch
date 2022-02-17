<template>
  <div class="toast">    
    <span class="heading">Error</span>
    <p class="description">Couldn't get exchange rates.<br/> Please try again later.</p>
  </div>
</template>

<style lang="scss" scoped>
.toast {
  background: $color_danger;
  border-radius: $border_radius;
  width: 300px;
  margin: 2rem;
  padding: 1rem;
  color: $color_white;
  position: absolute;
  bottom: 1rem;
  .heading {
    font-weight: 700;
  }
}
</style>