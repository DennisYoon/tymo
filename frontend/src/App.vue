<template>
  <SuperRadio
    id="test"
    title="시험"
    :contents="['대학수학능력시험', '6월 모의평가', '9월 모의평가']"
    @receiver="receiver"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import SuperRadio from "./components/SuperRadio.vue";

  const selected = ref(new Array<string>());
  function receiver(value: string[]) {
    selected.value = value;
  }

  // watch(selected, (newValue) => {
  //   console.log(newValue);
  // });
</script>

<style lang="scss">
</style>