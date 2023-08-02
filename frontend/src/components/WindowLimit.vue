<template>
  <div id="WLcontainer">
    <div class="WLitem">
      <slot />
    </div>
  </div>
  
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
  #WLcontainer {
    display: flex;
    justify-content: center;
    height: 100vh;
  }
  .WLitem {
    width: 1400px;
    box-sizing: border-box;
  }
  
</style>