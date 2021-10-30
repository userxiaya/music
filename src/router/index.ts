import { createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { initRouter } from './vue-history'
import { songGroupList, playListDetail } from './pageList'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/songGroupList'
  },
  {
    path: '/songGroupList',
    name: 'songGroupList',
    component: songGroupList('songGroupList')
  },
  {
    path: '/playListDetail/:songChannel/:id',
    name: 'playListDetail-page',
    component: playListDetail('playListDetail-page')
  }
]

const router = initRouter({
  history: createWebHashHistory(),
  routes
})

export default router
