import store from '@/store'
import { ref } from 'vue'
import { createRouter, RouteLocationNormalized, Router, RouterOptions } from 'vue-router'
const isBack = ref<boolean>(false)
export const initRouter = (options: RouterOptions): Router => {
  const router = createRouter(options)
  const { push: routerPush, replace: routerReplace, go: routerGo, forward: routerForward, back: routerBack } = router
  const setActionName = function (name: string) {
    store.dispatch('router/setActionName', name)
  }
  // 添加
  router.push = function (to) {
    setActionName('push')
    return routerPush(to)
  }
  // 替换
  router.replace = function (to) {
    setActionName('replace')
    return routerReplace(to)
  }
  // 前进后退
  router.go = function (delta) {
    if (delta > 0) {
      setActionName('forward') // 保留动作，暂无作用
    }
    if (delta < 0) {
      setActionName('back') // 保留动作，暂无作用
    }
    routerGo(delta)
  }
  // 前进
  router.forward = function () {
    setActionName('forward')
    routerForward()
  }
  // 后退
  router.back = function () {
    setActionName('back')
    routerBack()
  }
  router.afterEach((to, from) => {
    if (isBack.value === true) {
      store.dispatch('router/addExclude', from)
      setTimeout(() => {
        isBack.value = false
      }, 300) // 等待动画结束 过渡动画时间为0.25s
    }
    store.dispatch('router/addHistory', to)
  })
  return router
}
window.addEventListener('popstate', () => {
  isBack.value = true
})
interface State {
  historyPages: () => RouteLocationNormalized[];
  excludePages: () => string[];
  transitionName: () => '' | 'slide-right' | 'slide-left';
}
export const state: State = {
  historyPages () {
    return (store.state as any).router.historyPages
  },
  excludePages () {
    return (store.state as any).router.excludePages
  },
  transitionName () {
    return isBack.value ? 'slide-right' : (store.state as any).router.transitionName
  }
}
