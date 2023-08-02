<template>
  <WindowLimit>
    <TopBar></TopBar>
    <div id="ddddisssssco">
      <SelectItem></SelectItem>
    </div>
    <TypeArea></TypeArea>
  </WindowLimit>

</template>

<script lang="ts" setup>
  import WindowLimit from './components/WindowLimit.vue';
  import TopBar from './components/TopBar.vue';
  import TypeArea from "./components/TypeArea.vue";
  import SelectItem from "./components/SelectItem.vue";
</script>

<style lang="scss">
  div {
    border: 0.5px dashed white;
  }
  #ddddisssssco {
    padding: 100px;
  }
</style>