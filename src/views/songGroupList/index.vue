<template>
  <div class="page">
    <StatusBar>
      <NavBar :border="false" title="歌单" left-arrow>
        <template #right>
          <Icon name="search" size="18" />
        </template>
      </NavBar>
    </StatusBar>
    <Tabs v-model:active="activeName" animated>
      <Tab v-for="tab in tabList" :key="tab.name" :name="tab.name" :title="tab.title">
        <div class="content">
          <List v-if="activeName === tab.name" :get-list="getApi(tab.name)" />
          <!-- <List v-if="cacheList.indexOf(tab.name)!!==-1" :get-list="getApi(tab.name)"/> -->
        </div>
      </Tab>
    </Tabs>
  </div>
</template>
<script lang="ts" setup>
import StatusBar from '@/components/statusBar.vue'
import { Tab, Tabs, NavBar, Icon } from 'vant'
import { ref, watch } from 'vue'
import List from './list.vue'
import { getSongGroupList as getSongGroupListQQ } from '@/api/qq'
import { getSongGroupList as getSongGroupListNetEase } from '@/api/netEase'
import { getSongGroupList as getSongGroupListKugou } from '@/api/kugou'

const activeName = ref('qq')

type tabs = {
  title: string,
  name: string
}
const cacheList = ref<string[]>(['qq'])
const tabList = ref<tabs[]>([
  { title: 'QQ音乐', name: 'qq' },
  { title: '网易云', name: 'netEase' },
  { title: '酷狗', name: 'kugou' }
])
watch(activeName, (name: string) => {
  if (cacheList.value.indexOf(name) === -1) {
    cacheList.value.push(name)
  }
})
const getApi = (name: string): any => {
  let result = null
  switch (name) {
    case 'qq':
      result = getSongGroupListQQ
      break
    case 'netEase':
      result = getSongGroupListNetEase
      break
    case 'kugou':
      result = getSongGroupListKugou
      break
    default:
      result = null
  }
  return result
}
</script>
<style lang="less" scoped>
.page {
  display: flex;
  flex-direction: column;
  :deep(.van-tabs) {
    width: 100%;
    flex: 1;
    overflow: hidden;
  }
  :deep(.van-tabs__content) {
    height: calc(100% - var(--van-tabs-line-height));
  }
  :deep(.van-tab__pane) {
    width: 100%;
    height: 100%;
  }
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 15px;
    box-sizing: border-box;
  }
}
</style>
