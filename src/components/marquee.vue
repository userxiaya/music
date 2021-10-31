<template>
  <div ref="wrapRef" class="wrap">
    <div ref="contentRef" class="content" :class="animationClass" :style="contentStyle" @animationend="onAnimationEnd" @webkitAnimationEnd="onAnimationEnd">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, computed, watch, onMounted } from 'vue'
const contentRef = ref<HTMLElement | null>(null)
const wrapRef = ref<HTMLElement | null>(null)
const props = defineProps<{
  content?:string,
  delay?: number,
  speed?: number
}>()
const content = computed(() => {
  return props.content || ''
})
const delay = computed(() => {
  return props.delay || 0.5
})
const speed = computed(() => {
  return props.speed || 100
})
const wrapWidth = ref<number>(0) // 父盒子宽度
const firstRound = ref<boolean>(true) // 判断是否
const duration = ref<number>(0) // css3一次动画需要的时间
const offsetWidth = ref<number>(0) // 子盒子的宽度
const animationClass = ref<string>('') // 添加animate动画
const contentStyle = computed(() => {
  return {
    // 第一次从头开始,第二次动画的时候需要从最右边出来所以宽度需要多出父盒子的宽度
    paddingLeft: (firstRound.value ? 0 : wrapWidth.value) + 'px',
    // 只有第一次的时候需要延迟
    animationDelay: (firstRound.value ? delay.value : 0) + 's',
    animationDuration: duration.value + 's'
  }
})
const init = () => {
  const wrap = wrapRef.value
  const content = contentRef.value
  if (wrap && content) {
    wrapWidth.value = wrap.getBoundingClientRect().width
    offsetWidth.value = content.getBoundingClientRect().width
    duration.value = offsetWidth.value / speed.value
    animationClass.value = 'animate'
  }
}
watch(content, () => {
  init()
})
onMounted(() => {
  init()
})
const onAnimationEnd = () => {
  firstRound.value = false
  // 这是时候样式多出了padding-left:wrapWidth;所以要想速度一样需要重新计算时间
  duration.value = (offsetWidth.value + wrapWidth.value) / speed.value
  animationClass.value = 'animate-infinite'
}
</script>
<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 24px;
  overflow: hidden;
  position: relative;
  padding: 0;
}

.wrap .content {
  position: absolute;
  white-space: nowrap;
}

.animate {
  animation: paomadeng linear;
}

.animate-infinite {
  animation: paomadeng-infinite linear infinite;
}

@keyframes paomadeng {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes paomadeng-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
