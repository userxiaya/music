<template>
  <div class="min-bar">
    <div class="content">
      <Image lazy-load round :src="image" fit="cover" class="img">
        <template v-slot:error>
          <img style="width: 100%; height: 100%;" :src="defaultPng" />
        </template>
        <template v-slot:loading>
          <img style="width: 100%; height: 100%;" :src="defaultPng" />
        </template>
      </Image>
      <Marquee
        v-if="message && message.length > 15"
        class="message"
        :delay="0.5"
        :speed="30"
        :content="message"
      >{{ message }}</Marquee>
      <div class="message" v-else>{{ message }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Marquee from '@/components/marquee.vue'
import { Image } from 'vant'
import { ref, onMounted } from 'vue'
import { isWebview } from '@/utils/tools'
import defaultPng from '@/assets/default.png'

const image = ref<string>('')
const message = ref<string>('歌名 - 歌手')
onMounted(() => {
  if (isWebview) {
    window.audioCallBack = (res) => {
      console.log(res)
      if (res.status === 'currentSong') {
        image.value = res.albumImg
        message.value = `${res.name}-${res.singerName}`
      }
    }
  }
})

</script>
<style lang="less" scoped>
.min-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: var(--min-bar-height);
  background: transparent;
  box-sizing: border-box;
  padding: 0 20px 10px 20px;
  .content {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border-radius: calc(var(--min-bar-height) - 20px);
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    .message {
      height: 100%;
      line-height: calc(var(--min-bar-height) - 15px);
      padding-left: 20px;
      width: 470px;
      font-size: 28px;
      color: #fff;
    }
  }
  .img {
    width: calc(var(--min-bar-height) - 15px);
    height: calc(var(--min-bar-height) - 15px);
  }
}
</style>
