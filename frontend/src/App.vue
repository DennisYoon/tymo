<template>
  <SuperRadio
    id="test"
    :settings="srr.settings"

    @receiver="srr.receiver"
  />
</template>

<script lang="ts" setup>
  import SuperRadio from "./components/SuperRadio/SuperRadio.vue";
  import { SuperRadioReceiverBuilder } from "./components/SuperRadio/SuperRadioReceiver";

  const srr = new SuperRadioReceiverBuilder()
                .setTitle("시험")
                .setContents(["대수능", "6월 모평", "9월 모평"])
                .build();

  srr.watchItems();
</script>

<style lang="scss">
</style>