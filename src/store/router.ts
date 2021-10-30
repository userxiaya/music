import { RouteLocationNormalized, RouteRecordName } from 'vue-router'
import { Commit } from 'vuex'
import { nextTick } from 'vue'

type excludePage = RouteRecordName | undefined | null
interface routerState {
  actionName: string,
  historyPages: RouteLocationNormalized[],
  excludePages: excludePage[],
  transitionName: string
}
export default {
  state: {
    actionName: '',
    historyPages: [],
    excludePages: [],
    transitionName: '' // 前进后退css动画
  },
  mutations: {
    /**
     * 缓存路由状态
     * 支持页面前进后退动画
     * 支持页面前进刷新后退缓存
     * @param {RouteLocationNormalized} value route.to
     */
    ADD_HISTORY: (state: routerState, value: RouteLocationNormalized): void => {
      console.log('history')
      state.excludePages = []
      const itemIndex = (function () {
        for (let i = state.historyPages.length - 1; i >= 0; i--) {
          if (state.historyPages[i].fullPath === value.fullPath) {
            return i
          }
        }
        return -1
      }())
      // 若是替换动作，必定是前进
      if (state.actionName === 'replace') {
        const lastIndex = state.historyPages.length - 1
        const lastItem = state.historyPages[lastIndex]
        state.excludePages.push(lastItem.name)
        state.historyPages.fill(value, lastIndex)
        state.transitionName = 'slide-left' // 前进动画
        state.actionName = ''
        return
      }
      if (itemIndex > -1) {
        if (state.actionName === 'push') {
          state.historyPages.push(value)
          state.transitionName = 'slide-left' // 前进动画
        } else {
          if (state.historyPages.length > 1) {
            const i = itemIndex + 1; const n = state.historyPages.length - i
            state.excludePages = state.historyPages.map((item) => { return item.name }).slice(-n) // 返回数组最后位置开始的n个元素
            state.historyPages.splice(i, n) // 从i位置开始删除后面所有元素(包括i)
          }
          state.transitionName = 'slide-right' // 后退动画
        }
      } else {
        state.historyPages.push(value)
        if (state.historyPages.length > 1) {
          state.transitionName = 'slide-left' // 前进动画
        }
      }
      state.actionName = ''
    },
    SET_ACTION_NAME: (state: routerState, value: string): void => {
      state.actionName = value
    },
    ADD_EXClUDE: (state: routerState, value: RouteLocationNormalized): void => {
      nextTick(() => {
        if (state.excludePages.indexOf(value.name) === -1) {
          state.excludePages.push(value.name)
          setTimeout(() => {
            const index = state.excludePages.indexOf(value.name)
            state.excludePages.splice(index, 1)
          }, 0)
        }
      })
    }
  },
  actions: {
    'router/addHistory': ({ commit }: {commit: Commit}, value: string): void => {
      commit('ADD_HISTORY', value)
    },
    'router/addExclude': ({ commit }: {commit: Commit}, value: string): void => {
      commit('ADD_EXClUDE', value)
    },
    'router/setActionName': ({ commit }: {commit: Commit}, value: string):void => {
      commit('SET_ACTION_NAME', value)
    }
  }
}
