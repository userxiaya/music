<template>
  <div class="item" @click="select">
    <Image class="img" lazy-load :src="item?.imageUrl || ''">
      <template v-slot:loading>
        <Loading type="spinner" size="20" />
      </template>
      <template v-slot:default>
        <span class="listen">
          <Icon class="icon" :name="listenPng" />
          {{ count(item.listenCount) }}
        </span>
      </template>
    </Image>
    <div class="van-multi-ellipsis--l2 text">{{ item.name }}</div>
  </div>
</template>
<script lang="ts" setup>
import { Image, Loading, Icon } from 'vant'
import listenPng from '@/assets/listen'
import { defineProps, computed, defineEmits } from 'vue'
import { SongGroupListData } from '@/views/songGroupList/type'
const props = defineProps<{
  data: SongGroupListData
}>()
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (target: 'select', id: SongGroupListData): void
}>()
const item = computed(() => {
  return props?.data || {}
})
const count = (num: number): string => {
  if (num > 10000) {
    return `${Math.floor(num / 10000)}w+`
  } else if (num > 1000) {
    return `${Math.floor(num / 1000)}k+`
  } else {
    return 'num'
  }
}
const select = () => {
  emit('select', props.data)
}
</script>
<style lang="less" scoped>
.item {
  width: calc(100% / 3);
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
  height: auto;
  .img {
    border-radius: 17px;
    width: 100%;
    overflow: hidden;
    height: 220px;
    position: relative;
    .listen {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 23px;
      text-align: right;
      box-sizing: border-box;
      padding-right: 10px;
      color: #ffffff;
      z-index: 2;
      background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35),
        rgba(0, 0, 0, 0)
      );
      .icon {
        top: 6px;
        margin-right: 5px;
        overflow: hidden;
      }
    }
  }
  .text {
    padding-top: 5px;
    font-size: 24px;
    line-height: 35px;
    text-align: left;
  }
}
</style>
