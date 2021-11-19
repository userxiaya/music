import { defineAsyncComponent, DefineComponent, defineComponent } from 'vue'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const pageRender = (name: string, Component: any): DefineComponent => {
  return defineComponent({
    name: name,
    setup () {
      return () => <Component/>
    }
  })
}
export const songGroupList = (name: string):DefineComponent => {
  const Pages = defineAsyncComponent(() => import(/* webpackChunkName: "songGroupList" */'@/views/songGroupList/index.vue'))
  return pageRender(name, Pages)
}
export const playListDetail = (name: string):DefineComponent => {
  const Pages = defineAsyncComponent(() => import(/* webpackChunkName: "playListDetail" */'@/views/playListDetail/index.vue'))
  return pageRender(name, Pages)
}
