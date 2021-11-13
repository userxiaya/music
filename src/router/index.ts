import { createWebHashHistory, RouteRecordRaw, createRouter } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/songGroupList'
  },
  {
    path: '/songGroupList',
    name: 'songGroupList',
    component: () => import(/* webpackChunkName: "songGroupList" */'@/views/songGroupList/index.vue')
  },
  {
    path: '/playListDetail/:songChannel/:id',
    name: 'playListDetail-page',
    component: () => import(/* webpackChunkName: "playListDetail" */'@/views/playListDetail/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
