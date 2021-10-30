<template>
  <div :style="statusStyle" class="contents">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
// 沉浸式导航栏
import { webViewReady } from '@/utils/tools'
import { ref, computed } from 'vue'
const statusBarHeight = ref<number>(0)
webViewReady().then((tools) => {
  const variable = tools.getStatusBarHeightPx()
  statusBarHeight.value = variable / 3
})
const statusStyle = computed(() => {
  return {
    paddingTop: `${statusBarHeight.value}px`
  }
})
</script>
<style lang="less" scoped>
.contents {
  height: auto;
  width: 100%;
}
</style>
