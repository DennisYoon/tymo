<template>
  <div id="SIbox">
    <div id="SItitle">년도</div>
    <div id="SIvline"></div>
    <div class="SIoption" v-for="option in options" :key="option">
      {{ option }}
    </div>
    <div id=""></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const options = ref(Array<string>(10).fill("").map((_, i) => (i + 14).toString()));
</script>

<style lang="scss">
  @import "../assets/variables";

  #SIbox {
    height: 100px;
    width: 600px;
    border: 1px solid white;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    #SIvline {
      margin: 10px;
      border-left: 1px solid white; 
      height: 80px;
    }

    .SIoption {
      background-color: $gray;
      width: 30px;
      text-align: center;
      border-radius: 10px;
    }

    div {
      border: none;
    }
  }
</style>