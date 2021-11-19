<template>
   <div class="content" ref="scrollRef">
     <div class="wrapper">
       <slot></slot>
     </div>
   </div>
</template>
<script lang="ts" setup>
import BScroll from '@better-scroll/core'
import { ref, onMounted, defineProps, watch, computed, nextTick } from 'vue'
const scrollRef = ref<HTMLElement|null>(null)
let bs: any = null
const props = defineProps<{
  data:any
}>()
const data = computed(() => {
  return props.data
})
onMounted(() => {
  if (scrollRef.value) {
    bs = new BScroll(scrollRef.value, {
      pullUpLoad: true,
      wheel: true,
      click: true,
      scrollbar: true
    })
    nextTick(() => {
      bs.refresh()
    })
  }
})
watch(data, () => {
  bs && bs.refresh()
})
</script>
<style lang="less" scoped>
.content {
  overflow: hidden;
  .wrapper {
    width: 100%;
    height: auto;
  }
}
</style>
