<template>
  <ConfigProvider :theme-vars="themeVars" class="page">
    <router-view v-slot="{ Component }" class="router-view">
      <transition :name="transitionName">
        <keep-alive :exclude="excludePages">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </ConfigProvider>
</template>
<script lang="ts" setup="home">
import { ConfigProvider } from 'vant'
import { state } from '@/router/vue-history'
import { computed } from '@vue/reactivity'
import { setPageBackPressed } from '@/utils/tools'
import { ref } from 'vue'
setPageBackPressed()
const themeVars = ref({
  navBarBackgroundColor: 'transparent', // 透明
  tabsNavBackgroundColor: 'transparent',
  navBarIconColor: '#07c160',
  navBarTitleTextColor: '#07c160',
  tabActiveTextColor: '#07c160',
  tabsBottomBarColor: '#07c160',
  tabsLineHeight: '45px' // tab 默认高度
})
const transitionName = computed(() => state.transitionName())
const excludePages = computed(() => state.excludePages())
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .router-view {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }
}

// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
//   will-change: transform;
//   transition: transform 0.25s;
//   position: fixed;
//   width: 100%;
//   opacity: 1;
//   height: 100%;
//   pointer-events: none;
// }
// .slide-right-enter-from {
//   z-index: 1;
//   transform: translateX(-100%);
// }
// .slide-right-leave-active {
//   transition-delay: 35ms;
//   transform: translateX(100%);
// }
// .slide-left-enter-from {
//   z-index: 1;
//   transform: translateX(100%);
// }
// .slide-left-leave-active {
//   transition-delay: 35ms;
//   transform: translateX(-100%);
// }

.slide-left-enter-active {
  animation-name: slide-left-in;
  animation-duration: .25s;
}
.slide-left-leave-active {
  animation-name: slide-left-out;
  animation-duration: .25s;
}
@keyframes slide-left-in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes slide-left-out {
  0% {
    opacity: 0;
    display: none;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
.slide-right-enter-active {
  animation-name: slide-right-in;
  animation-duration: 0.25s;
}
.slide-right-leave-active {
  animation-name: slide-right-out;
  animation-duration: 0.25s;
}
@keyframes slide-right-in {
  0% {
    display: none;
    opacity: 0;
  }
  100% {
    display: none;
    opacity: 0;
  }
}
@keyframes slide-right-out {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
