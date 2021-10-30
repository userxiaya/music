<template>
  <div class="detail">
    <div class="overlay" :style="contentStyle"></div>
    <StatusBar>
      <NavBar :border="false" left-arrow @click-left="emit('back')">
        <template #title>
          <Marquee class="title" :delay="0.5" :speed="20" :content="detail?.name">{{ detail?.name }}</Marquee>
        </template>
      </NavBar>
    </StatusBar>
    <div class="image">
      <Image lazy-load :src="detail?.imageUrl || ''" />
    </div>
    <div class="nickName">
      <div class="icon">
        <Image lazy-load :src="detail?.userIcon || ''" />
      </div>
      {{ detail?.userName || '' }}
    </div>
    <p class="desc" v-html="detail?.desc || ''"></p>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, StyleValue, defineEmits } from 'vue'
import { playDetail } from './type'
import StatusBar from '@/components/statusBar.vue'
import Marquee from '@/components/marquee.vue'
import { NavBar, Image } from 'vant'
defineProps<{
  detail?: playDetail,
  contentStyle?: StyleValue
}>()
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (target: 'back'): void
}>()
</script>
<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: auto;
  .title {
    width: 400px;
  }
  .image {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border-radius: 20px;
    overflow: hidden;
    margin-top: 30px;
  }
  .nickName {
    margin-top: 20px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      width: 40px;
      height: 40px;
      overflow: hidden;
      margin-right: 15px;
      border-radius: 100%;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  .desc {
    padding: 15px;
    box-sizing: border-box;
    font-size: 25px;
    letter-spacing: 3px; //字间距
    line-height: 40px;
    text-indent: 50px;
  }
}
</style>
