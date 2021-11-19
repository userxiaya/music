<template>
  <div class="detail" ref="detailRef">
    <Loading color="#07c160" size="24px" class="page-loading" v-if="loading">加载中...</Loading>
    <template v-else-if="showType === 'index'">
      <div class="playContent" ref="contentRef">
        <div class="overlay" :style="contentStyle"></div>
        <Sticky>
          <StatusBar>
            <div class="overlay" :style="headerStyle"></div>
            <NavBar
              :border="false"
              :title="headerOpacity === 1 ? detail?.name : '歌单'"
              left-arrow
              @click-left="back"
            />
          </StatusBar>
        </Sticky>

        <div class="content">
          <div class="box">
            <div class="img">
              <Image lazy-load :src="detail?.imageUrl || ''">
                <template v-slot:loading>
                  <Loading type="spinner" size="20" />
                </template>
              </Image>
            </div>
            <div class="text">
              <div class="box">
                <div class="name van-multi-ellipsis--l2">{{ detail?.name }}</div>
                <div class="nick">
                  <Image class="icon" round lazy-load :src="detail?.userIcon || ''" />
                  <div class="nick_name">{{ detail?.userName }}</div>
                </div>
                <div class="desc" @click.stop="openDetail">
                  <div class="van-ellipsis">
                    简介：
                    <span v-html="detail?.desc" style="height: 100%; overflow: hidden;"></span>
                  </div>
                  <Icon name="arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <List finished-text="没有更多了" :finished="true">
        <SongItem v-for="item in detail?.list || []" :key="`${item.id}`" :song="item" />
      </List>
    </template>
    <Detail
      v-if="showType === 'detail'"
      :contentStyle="contentStyle"
      :detail="detail"
      @back="closeDetail"
    />
  </div>
</template>
<script lang="ts" setup>
import StatusBar from '@/components/statusBar.vue'
import SongItem from '@/components/song.vue'
import Detail from './detail.vue'
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'
import { getPlayDetail as qqDetail } from '@/api/qq'
import { getPlayDetail as netEaseDetail } from '@/api/netEase'
import { getPlayDetail as kugouDetail } from '@/api/kugou'
import { NavBar, Image, Sticky, List, Loading, Icon } from 'vant'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { playDetail } from './type'
import { useImage } from '@/utils/tools'
const route = useRoute()
const router = useRouter()
const detailRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const showType = ref<'index' | 'detail'>('index')
const loading = ref<boolean>(false)
const contentHeight = ref<number>(0)// 容器高度
const scrollTop = ref<number>(0) // 滚动位置
const detail = ref<playDetail | undefined>()
const backgroundImage = computed(() => {
  return detail.value?.imageUrl
})
const { background: contentBackGround, backgroundShow } = useImage(backgroundImage)
const contentStyle = computed(() => {
  return {
    filter: 'brightness(70%)',
    backgroundImage: contentBackGround.value
  }
})
const headerOpacity = computed(() => {
  const opacity = scrollTop.value / contentHeight.value
  return opacity > 1 ? 1 : opacity
})
const headerStyle = computed(() => {
  return {
    opacity: headerOpacity.value,
    filter: 'brightness(70%)',
    backgroundImage: backgroundShow.value
  }
})
const onScroll = () => {
  const top = detailRef.value?.scrollTop || 0
  scrollTop.value = top
}
const back = () => {
  router.go(-1)
}
const closeDetail = () => {
  showType.value = 'index'
}
const openDetail = () => {
  showType.value = 'detail'
}
onMounted(() => {
  const { params } = route
  if (params?.id) {
    const songChannel = params?.songChannel
    let api = null
    if (songChannel === 'netEase') {
      api = netEaseDetail
    } else if (songChannel === 'QQ') {
      api = qqDetail
    } else if (songChannel === 'kugou') {
      api = kugouDetail
    }
    loading.value = true
    api && api(params.id as string).then(res => {
      loading.value = false
      detail.value = res
    }).catch(e => {
      loading.value = false
      console.log(e)
    })
  }
  contentRef.value && (contentHeight.value = contentRef.value?.clientHeight)
  detailRef.value && detailRef.value.addEventListener('scroll', onScroll)
})
onBeforeUnmount(() => {
  detailRef.value && detailRef.value.removeEventListener('scroll', onScroll)
})
onBeforeRouteLeave((to, from, next) => {
  if (showType.value === 'detail') {
    // 拦截路由
    showType.value = 'index'
    next(false)
  } else {
    next(true)
  }
})
</script>
<style lang="less" scoped>
.box {
  height: 100%;
  width: 100%;
  position: relative;
}
.detail {
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .playContent {
    width: 100%;
    height: 430px;
    position: relative;
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
    }
    .content {
      padding: 0 var(--van-padding-md);
      padding-top: 20px;
      .text {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        padding-left: 230px;
        box-sizing: border-box;
        .name {
          color: #fff;
          font-size: 32px;
          line-height: 45px;
        }
        .nick {
          height: 45px;
          margin-top: 15px;
          font-size: 20px;
          color: #fff;
          position: relative;
          .icon {
            height: 45px;
            width: 45px;
          }
          .nick_name {
            display: inline-block;
            line-height: 45px;
            padding-left: 20px;
            height: 100%;
            width: auto;
            top: 0;
            position: absolute;
          }
        }
        .desc {
          position: absolute;
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-size: 20px;
          color: #fff;
          bottom: 0px;
          display: flex;
          align-items: center;
          :deep(.van-icon) {
            padding-left: 10px;
          }
          .van-ellipsis {
            max-width: 100%;
            height: 100%;
            width: auto;
            box-sizing: border-box;
            display: inline-block;
          }
        }
      }
      .img {
        overflow: hidden;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 200px;
      }
    }
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-nav-bar .van-icon) {
    color: #fff;
  }
}
</style>
