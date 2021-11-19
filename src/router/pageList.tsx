import { defineAsyncComponent, DefineComponent, defineComponent, ref, onDeactivated, onActivated } from 'vue'
import { Loading } from 'vant'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const pageRender = (name: string, Component: any): DefineComponent => {
  return defineComponent({
    name: name,
    setup () {
      const isActive = ref<boolean>(true)
      onActivated(() => {
        setTimeout(() => {
          isActive.value = true
        }, 500) // 页面数据过多导致页面过渡卡顿 故而延迟执行
      })
      onDeactivated(() => {
        isActive.value = false
      })
      return {
        isActive
      }
    },
    render () {
      const { isActive } = this
      return <div>
        <div v-show={isActive} class="fullDom">
          <Component />
        </div>
        <Loading color="#07c160" size="24px" class="page-loading" v-show={!isActive}>加载中...</Loading>
      </div>
    }
  })
}
export const songGroupList = (name: string): DefineComponent => {
  const Pages = defineAsyncComponent(() => import(/* webpackChunkName: "songGroupList" */'@/views/songGroupList/index.vue'))
  return pageRender(name, Pages)
}
export const playListDetail = (name: string): DefineComponent => {
  const Pages = defineAsyncComponent(() => import(/* webpackChunkName: "playListDetail" */'@/views/playListDetail/index.vue'))
  return pageRender(name, Pages)
}
