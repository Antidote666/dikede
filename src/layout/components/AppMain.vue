<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
.app-main {
  /*50 = navbar  */
  // width: calc(100vw - 176px);
  // overflow-x: auto;
  position: relative;
  overflow: auto;
  // overflow-x:scroll;
  height: calc(100vh - 60px);
  &::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: hsla(0,0%,40%,.3);
    border-radius: 10px;
  }
}
.fixed-header+.app-main {
  margin-top: 60px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
