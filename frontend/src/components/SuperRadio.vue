<template>
  <div id="edge" :style="edgeWidthC">

    <div id="title" ref="titleR">
      {{ props.title }}
    </div>

    <div
      id="barricade"
      ref="barricadeR"
      :style="[itemStyle(1), bariHeight]"
    />

    <div ref="itemParentR">
      <div
        class="item"
        :class="[{
          blackify: !~isSelected(index + 2),
          whitify: ~isSelected(index + 2)
        }]"
        :style="itemStyle(index + 2)"
        v-for="(item, index) in props.contents"
        :key="item"
        @click="select(index + 2)"
      >
        {{ item }}
      </div>
    </div> 

  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed } from "vue";
  import { sum, moveElement } from "../assets/functions";

  interface Props {
    id: string;
    title: string;
    contents: string[];
  }
  type Html = HTMLElement;


   /* properties & emits zone */
  const props = defineProps<Props>();
  const emit = defineEmits<{
    receiver: [value: string[]]
}>()

  /* references zone */
  const widths = ref<number[]>(new Array);
  const order = ref<number[]>(new Array);
  const edgeWidth = ref("10000px");
  const edgeHeight = ref(10000);
  const whoOnTop = ref(0);

  /* HTML Elements zone */
  const titleR = ref<Html>();
  const barricadeR = ref<Html>();
  const itemParentR = ref<Html>();

  /* computed zone */
  const edgeWidthC = computed(() => {
    return { width: edgeWidth.value };
  });

  const itemStyle = computed(() => (locAtWidth: number) => {
    const locAtorder = order.value.indexOf(locAtWidth);
    const essential = {
      left: sum(
        order.value
          .slice(0, locAtorder)
          .map(v => widths.value[v])
      ) + locAtorder * 30 + "px",
    };
    const additional = {
      backgroundColor: ~isSelected(locAtWidth) ? "white" : "rgb(39, 40, 41)",
      zIndex: (whoOnTop.value === locAtWidth) ? 2 : 1
    };

    if (locAtWidth === 1) {
      return essential;
    }
    return {
      ...essential,
      ...additional
    };
  });

  const bariHeight = computed(() => {
    return {
      height: edgeHeight.value + "px",
      // top: edgeHeight.value * 0.1 + "px"
    }
  });

  /* functions zone */
  function isSelected(locAtWidth: number) {
    return order.value
      .slice(0, indexOfBaricadeAtOrder())
      .indexOf(locAtWidth);
  }

  function indexOfBaricadeAtOrder() {
    return order.value.indexOf(1);
  }

  function getWidth(element: Html | undefined) {
    return element!.offsetWidth;
  }

  /* eventListeners zone */
  function select(locAtWidth: number) {
    whoOnTop.value = locAtWidth;

    const indexAtorder = order.value.indexOf(locAtWidth);

    if (~isSelected(locAtWidth)) {
      /* 셀렉 된 걸 풀기 */
      let i: number;
      for (i = order.value.length; i > indexOfBaricadeAtOrder(); i--) {
        if (locAtWidth > order.value[i]) {
          break;
        }
      }
      moveElement(order.value, indexAtorder, i);
      
    } else {
      /* x버튼 만들기 */

      /* 셀렉 안된 거 셀렉 */
      let i: number;
      for (i = 1; i < indexOfBaricadeAtOrder(); i++) {
        if (locAtWidth < order.value[i]) {
          break;
        }
      }
      moveElement(order.value, indexAtorder, i);
    }

    emit(
      "receiver",
      order.value
        .slice(1, indexOfBaricadeAtOrder())
        .map(v => props.contents[v - 2])
    );
  }

  /* life cycles zone */
  onMounted(() => {
    /* widths에 element 너비 삽입 */
    widths.value.push(getWidth(titleR.value));
    widths.value.push(getWidth(barricadeR.value));
    for (let itemR of itemParentR.value!.children) {
      widths.value.push(getWidth(itemR as Html));
    }

    /* 요소들 배치 순서 지정 */    
    for (let i = 0; i < widths.value.length; i++) {
      order.value.push(i);
    }

    /* 이 component의 너비 설정 */  
    edgeWidth.value = (sum(widths.value) + 10) + widths.value.length * 30 + "px";
    edgeHeight.value = titleR.value!.offsetHeight;
  });
</script>

<style lang="scss">
  #edge {
    font-size: 50px;
    // border: 1px solid black;
    border-radius: 20px;
    display: inline-block;
    user-select: none;
    position: relative;
    color: white;

    #title {
      display: inline-block;
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 50px;
      padding-right: 20px;
    }

    #barricade {
      display: inline-block;
      transition: left .5s;
      transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
      position: absolute;
      border-left: 1px solid white;
      z-index: 3;
    }

    .item {
      display: inline-block;
      border-radius: 1000px;
      transition: background-color .2s, left .5s, width .5s;
      transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
      top: 0;
      position: absolute;
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 30px;
      padding-right: 30px;
    }

    .blackify {
      color: white !important;
    }

    .whitify {
      color: rgb(24, 24, 25) !important;
    }

    @media (hover: hover) and (pointer: fine) {
      .blackify:hover {
        background-color: rgb(31, 32, 33) !important;
        cursor: grab;
      }

      .whitify:hover {
        background-color: rgb(227, 227, 227) !important;
        cursor: grab;
      }
    } 
  }
</style>