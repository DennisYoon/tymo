<template>
  <div
    id="edge"
    ref="edgeR"
    :style="{
      height: basicHeight ? basicHeight + 'px' : 'auto',
      width: basicWidth ? basicWidth + 'px' : 'auto'
    }"
  >

    <div id="title" ref="titleR">
      <div id="titleItem">
        {{ props.title }}
      </div>
    </div>

    <div id="barricade" ref="barricadeR" :style="[absolutifyAndHeight, itemStyle(1)]" :class="{disableTransition: !transition}">
      <div id="barricadeItem"  />
    </div>
    

    <div id="itemParent" ref="itemParentR">
      <div
        id="itemPadding"
        v-for="(item, index) in props.contents"
        :key="item"
        :style="[absolutifyAndHeight, itemStyle(index + 2)]"
        :class="{disableTransition: !transition}"
      >
        <div class="forFlex" :style="getBasicHeight">
          <div
            class="item"
            :class="[{
              blackify: !~isSelected(index + 2),  
              whitify: ~isSelected(index + 2),
              gapBigger: ~isSelected(index + 2)
            }]"
            :style="bgcOfItem(index + 2)"
            @click="select(index + 2)"
          >
            <div class="itemText">
              {{ item }}
            </div>
            <img class="x" :class="[{xBigger: ~isSelected(index + 2)}]" src="images/x.svg" alt="x.svg">
          </div>
        </div>
        
      </div> 
    </div>
      
    <div id="allornot" ref="allornot" :style="[absolutifyAndHeight, {width: widths!.at(-1)! + 'px'}]">
      <Transition name="slide-up">
        <div v-if="switcher" id="allornotItem" @click="selectAll" :style="absolutifyAndHeight">
          <div class="forFlex" :style="getBasicHeight">
            모두 선택
          </div>
        </div>
        <div v-else id="allornotItem" @click="selectAll" :style="absolutifyAndHeight">
          <div class="forFlex" :style="getBasicHeight">
            모두 해제
          </div>
        </div>
      </Transition>
      
    </div>

  </div>
</template>

<script lang="ts" setup>
  import { ref, computed,  onMounted, StyleValue, watch } from "vue";
  import { sum, moveElement } from "../_functions";

  interface Props {
    id: string;
    title: string;
    contents: string[];
  }
  type Html = HTMLElement;


   /* properties & emits zone */
  const props = defineProps<Props>();
  const emit = defineEmits<{
    receiver: [value: Array<string>]
}>()

  /* references zone */
  const widths = ref<number[]>(new Array);
  const order = ref<number[]>(new Array);
  const whoOnTop = ref(0);
  const absolute = ref(false);
  const basicHeight = ref(0);
  const basicWidth = ref(0);
  const transition = ref(false);
  const switcher = ref(true);

  /* HTML Elements zone */
  const edgeR = ref<Html>();
  const titleR = ref<Html>();
  const barricadeR = ref<Html>();
  const itemParentR = ref<Html>();
  const allornot = ref<Html>();

  /* computed zone */
  const itemStyle = computed(() => (locAtWidth: number) => {
    const locAtorder = order.value.indexOf(locAtWidth);
    const selectedCount = order.value.slice(1, indexOfBaricadeAtOrder()).length;
    const beforeMeCount = order.value.slice(1, isSelected(locAtWidth)).length;
    const additionalGap = (isSelected(locAtWidth) === -1 ? selectedCount : beforeMeCount) * 80;

    const essential = {
      left: sum(
        order.value
          .slice(0, locAtorder)
          .map(v => widths.value[v])
      ) + additionalGap + "px",
    };
    const additional = {
      zIndex: (whoOnTop.value === locAtWidth) ? 2 : 1,
    };
    const forBari = {
      opacity: (selectedCount === widths.value.length - 3) ? 0 : 1
    }

    if (locAtWidth === 1) {
      return {
        ...essential,
        ...forBari
      };
    }
    return {
      ...essential,
      ...additional
    };
  });

  const bgcOfItem = computed(() => (locAtWidth: number) => {
    return {
      backgroundColor: ~isSelected(locAtWidth) ? "white" : "rgb(39, 40, 41)",
    }
  })

  const absolutifyAndHeight = computed(() => {
    return {
      position: absolute.value ? "absolute" : "static",
      height: basicHeight.value ? basicHeight.value + "px" : "auto"
    } as StyleValue;
  });

  const getBasicHeight = computed(() => {
    return {
      height: basicHeight.value + 'px'
    };
  });

  /* watch zone */
  watch(order, newOrder => {
    const count = newOrder.slice(1, indexOfBaricadeAtOrder()).length;
    if (count === props.contents.length) {
      switcher.value = false;
    }
    if (count === 0) {
      switcher.value = true;
    }

    emit(
      "receiver",
      order.value
        .slice(1, indexOfBaricadeAtOrder())
        .map(v => props.contents[v - 2])
    );
  }, { deep:true });

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
    return element!.clientWidth
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
  }

  function selectAll() {
    switcher.value = !switcher.value;
    if (switcher.value) {
      moveElement(order.value, indexOfBaricadeAtOrder(), 1);
    } else {
      
      moveElement(order.value, indexOfBaricadeAtOrder(), order.value.length - 2);
    }
  }

  /* hooks zone */
  function mount() {
    /* widths에 element 너비 삽입 */
    widths.value.push(getWidth(titleR.value));
    widths.value.push(getWidth(barricadeR.value));
    for (let itemR of itemParentR.value!.children) {
      widths.value.push(getWidth(itemR as Html));
    }
    widths.value.push(getWidth(allornot.value));

    /* 요소들 배치 순서 지정 */    
    for (let i = 0; i < widths.value.length; i++) {
      order.value.push(i);
    }

    basicHeight.value = Math.max(edgeR.value!.offsetHeight, (itemParentR.value!.children[0].children[0].children[0] as Html).offsetHeight);
    basicWidth.value = edgeR.value!.offsetWidth + 80 * itemParentR.value!.children.length;

    absolute.value = true;
    setTimeout(() => {
      transition.value = true;
      moveElement(order.value, 2, 1);
    });
  }

  /* life cycles zone */
  onMounted(() => {
    mount();
  });
    
</script>

<style lang="scss">
  .disableTransition {
    transition: none !important;
  }

  .forFlex {
    display: flex;
    align-items: center;       
  }

  .slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
  }

  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }

  #edge {
    font-size: 50px;
    font-family: 'SUIT';
    // border: 1px solid black;
    border-radius: 20px;
    display: inline-flex;
    user-select: none;
    position: relative;
    color: white;

    #title {
      display: flex;
      align-items: center;
      padding-left: 60px;
      padding-right: 30px;
      font-size: 60px;
      // border: 1px solid black;
    }

    #barricade {
      display: flex;
      transition: left .5s, opacity .5s;
      transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
      z-index: 3;
      padding-left: 30px;
      padding-right: 30px;
      // border: 1px solid black;
      #barricadeItem {  
        border-left: 3px solid white;
      }
    }

    #itemParent {
      display: flex;
      #itemPadding {
        // border: 1px solid black;
        padding-left: 20px;
        padding-right: 20px;
        transition: left .5s;
        .item {
          display: flex;
          border-radius: 1000px;
          transition: background-color .2s, gap .5s;
          transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
          top: 0;
          padding-top: 20px;
          padding-bottom: 20px;
          padding-left: 40px;
          padding-right: 40px;
          align-items: center;
          gap: 0px;

          .x {
            height: 0px;
            transition: height .35s;
            transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
          }

          .xBigger {
            height: 60px;
          }
        }

        .gapBigger {
          gap: 20px;
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
    }

    #allornot {
      align-items: center;
      padding-left: 20px;
      padding-right: 20px;
      right: 0;
      color: rgb(178, 178, 178);

      #allornotItem {
        border-radius: 15px;
        transition: opacity .5s, transform .5s;
        transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
      }

      @media (hover: hover) and (pointer: fine) {
        #allornotItem:hover {
          cursor: grab;
        }
      }
    }
  } 
</style>