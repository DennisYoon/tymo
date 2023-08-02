<template>
  <WindowLimit>
    <TopBar></TopBar>
    <TypeArea></TypeArea>
  </WindowLimit>
</template>

<script lang="ts" setup>
  import WindowLimit from './components/WindowLimit.vue';
  import TopBar from './components/TopBar.vue';
  import TypeArea from "./components/TypeArea.vue";
</script>

<style lang="scss">
  div {
    border: 0.5px dashed white;
  }
</style>