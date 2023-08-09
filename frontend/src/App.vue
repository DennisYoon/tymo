<template>
  <SuperRadio
    id="test"
    title="시험"
    :contents="srr.items"

    @receiver="srr.receiver"
  />
</template>

<script lang="ts" setup>
  import SuperRadio from "./components/SuperRadio/SuperRadio.vue";
  import SuperRadioReceiver from "./components/SuperRadio/Receiver";

  const srr = new SuperRadioReceiver(['대학수학능력시험', '6월 모의평가', '9월 모의평가']);
  srr.watchItems();
</script>

<style lang="scss">
</style>