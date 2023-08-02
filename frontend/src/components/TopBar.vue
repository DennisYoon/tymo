<template id="TopBar">
  <div id="TBcontainer">
    <div class="TBitem">Tymo</div>
    <div class="TBitem">hello world</div>
  </div>
</template>

<style lang="scss">
  @import "../assets/variables";

  #TBcontainer {
    display: flex;
    height: 150px;
    width: 100%;

    .TBitem {
      display: flex;
      justify-content: center;
      align-items: center;

      &:nth-child(1) {
        flex-shrink: 0;
        color: $mint;
        font-size: 80px;
        width: auto;
      }

      &:nth-child(2) {
        flex-grow: 1;
      }
    }
  }
</style>