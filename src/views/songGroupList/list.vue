
<template>
  <div class="list_content" ref="listRef">
    <List class="list" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <Item v-for="item in dataList" :key="item.id" :data="item" @select="select"/>
    </List>
  </div>
</template>
<script lang="ts" setup>
import { List } from 'vant'
import { useLoadMore } from 'vue-request'
import { computed, Ref, ref, defineProps, watch, nextTick } from 'vue'
import Item from '@/components/songGroupItem.vue'
import { SongGroupData, SongGroupListData } from './type'
import { openPage } from '@/utils/tools'

const props = defineProps<{
  show: boolean,
  getList:(params?: { current?: number, pageSize?: number }) => Promise<SongGroupData>
}>()
interface getListRequest {
  loading?: Ref<boolean>
  dataList: Ref<SongGroupData['list'] | []>
  loadMore: (params?: { current?: number, pageSize?: number }) => void
}
const show = computed(() => {
  return props.show
})
const scrollTop = ref<number>(0)
const current = ref<number>(0)
const pageSize = ref<number>(30)
const total = ref<number>(0)
const listRef = ref<HTMLElement | null>(null)
const { dataList, loading, loadMore }: getListRequest = useLoadMore(() => {
  return props.getList({
    current: current.value + 1,
    pageSize: pageSize.value
  })
}, {
  listKey: 'list',
  onSuccess: (res) => {
    current.value = current.value + 1
    total.value = res.total
  }
})
const finished = computed(() => {
  const result = (pageSize.value * current.value) >= total.value
  return result && current.value > 0
})
const onLoad = () => {
  if (loading.value !== true) {
    loadMore()
  }
}
watch(show, (flag) => {
  if (flag) {
    nextTick(() => {
      if (listRef?.value && scrollTop.value) {
        listRef.value.scrollTop = scrollTop.value
      }
    })

    console.log('进入,载入滚动位置')
  } else {
    scrollTop.value = listRef.value?.scrollTop || 0
    console.log('离开,记录滚动位置', scrollTop.value)
  }
})
const select = ({ id, songChannel }: SongGroupListData) => {
  openPage(`/playListDetail/${songChannel}/${id}`)
}

</script>
<style lang="less" scoped>
.list_content {
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .list {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
  }
}
</style>
