<template>
  <SuperRadio id="exam" class="superradio" :settings="exam.settings" @receiver="exam.receiver" />
  <SuperRadio id="year" class="superradio" :settings="year.settings" @receiver="year.receiver" />
  <SuperRadio id="mode" class="superradio" :settings="mode.settings" @receiver="mode.receiver" />
  <div id="info">Space 키 누르는 행위는 "시작" 버튼을 클릭하는 행위와 같습니다.</div>
</template>

<script lang="ts" setup>
  import SuperRadio from "./components/SuperRadio/SuperRadio.vue";
  import { Mode, SuperRadioReceiverBuilder } from "./components/SuperRadio/SuperRadioReceiver";

  const exam = new SuperRadioReceiverBuilder()
    .setTitle("시험")
    .setContents(["대수능", "6월 모평", "9월 모평"])
    .setTitleSize(30)
    .setContentSize(25)
    .setTitleMargin([20, 0])
    .setContentMargin([40, 12])
    .setFullWidth(1600)
    .setContentGap(10)
    .setAniDuration(300)
    .build();

  const year = new SuperRadioReceiverBuilder()
    .setTitle("년도")
    .setContents(Array(10).fill(14).map((v, i) => (v + i).toString()))
    .setTitleSize(30)
    .setContentSize(25)
    .setTitleMargin([20, 0])
    .setContentMargin([40, 12])
    .setFullWidth(1600)
    .setContentGap(10)
    .setAniDuration(400)
    .build();

  const mode = new SuperRadioReceiverBuilder()
    .setTitle("모드")
    .setContents(["지문 단위", "문장 단위", "단어 단위"])
    .setTitleSize(30)
    .setContentSize(25)
    .setTitleMargin([20, 0])
    .setContentMargin([40, 12])
    .setContentGap(10)
    .setAniDuration(500)
    .setMode(Mode.Single)
    .build();

  exam.watchContents("exam:");
  year.watchContents("year:");
  mode.watchContents("mode:");

  window.addEventListener("keydown", event => {
    if (event.key === " ") {
      alert("pressed space!!");
    }
  });
</script>

<style lang="scss">
  .superradio {
    position: absolute;
    left: 140px;
    opacity: 0;
    transform: translate(0, -50%);
  }

  #exam {
    top: 35vh;
    animation: exam .5s forwards;
    animation-delay: 0ms;
  }

  #year {
    top: 45vh;
    animation: year .5s forwards;
    animation-delay: 100ms;
  }

  #mode {
    top: 55vh;
    animation: mode .5s forwards;
    animation-delay: 200ms;
  }

  #info {
    font-family: 'SUIT';
    color: rgb(223, 223, 223);
    position: absolute;
    transform: translate(0, -50%);
    top: 62vh;
    opacity: 0;
    left: 1300px;
    animation: info .5s forwards;
    animation-delay: 300ms;
    user-select: none;
  }

  @keyframes exam {
    0% {
      top: 35vh;
      opacity: 0;
    }

    100% {
      top: 40vh;
      opacity: 1;
    }
  }

  @keyframes year {
    0% {
      top: 45vh;
      opacity: 0;
    }

    100% {
      top: 50vh;
      opacity: 1;
    }
  }

  @keyframes mode {
    0% {
      top: 55vh;
      opacity: 0;
    }

    100% {
      top: 60vh;
      opacity: 1;
    }
  }

  @keyframes info {
    0% {
      top: 62vh;
      opacity: 0;
    }

    100% {
      top: 65vh;
      opacity: 1;
    }
  }
</style>