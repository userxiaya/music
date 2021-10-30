<template>
  <Cell class="cell" center :label="singerName(props.song.singer)" is-link>
    <template #title>
      <span class="van-multi-ellipsis--l2">
        {{ props.song.name }}
        <Tag type="success" round plain v-if="props.song.isVip" class="tag">vip</Tag>
      </span>
    </template>
  </Cell>
</template>
<script lang="ts" setup>
import { singerItem, songItem } from '@/views/song'
import { Cell, Tag } from 'vant'
import { defineProps } from 'vue'
const props = defineProps<{
  song: songItem
}>()
const singerName = (singer?: singerItem[]): string => {
  const list = singer || []
  const singerNameList = list.map(e => {
    return e.name
  })
  return singerNameList.join(' / ')
}
</script>
<style lang="less" scoped>
.cell {
  padding: 10px 15px;
  .tag {
    margin-left: 10px;
  }
}
</style>
