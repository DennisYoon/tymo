<template>
  <SuperRadio
    v-for="srr in srrs"
    :key="srr.toString()"
    id="test"
    :settings="srr.settings"
    @receiver="srr.receiver"
  />
</template>

<script lang="ts" setup>
  import SuperRadio from "./components/SuperRadio/SuperRadio.vue";
  import { SuperRadioReceiverBuilder } from "./components/SuperRadio/SuperRadioReceiver";

  const srrs = [
    new SuperRadioReceiverBuilder()
      .setTitle("시험")
      .setContents(["대수능", "6월 모평", "9월 모평"])
      .setTitleWidth(200)
      .build(),
    new SuperRadioReceiverBuilder()
      .setTitle("exam")
      .setContents(["csat", "june mock", "sept mock"])
      .setTitleWidth(200)
      .build()
  ];
</script>

<style lang="scss">
</style>