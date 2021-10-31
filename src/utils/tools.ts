import { ComputedRef, ref, watch, Ref } from 'vue'
import router from '@/router'
let eeTools = null
export const webViewReady = (): Promise<any> => {
  return new Promise((resolve) => {
    eeTools = window.requireModuleJs?.('eeui')
    if (eeTools) {
      resolve(eeTools)
    } else {
      const timer = setInterval(() => {
        eeTools = window.requireModuleJs?.('eeui')
        if (eeTools) {
          resolve(eeTools)
          clearInterval(timer)
        }
      }, 100)
    }
  })
}
export const isWebView = (): boolean => {
  const { userAgent } = navigator
  return userAgent.indexOf('EEUI_WEB') !== -1
}

// 处理webview返回事件
export const setPageBackPressed = (): void => {
  if (isWebView()) {
    webViewReady().then((tools) => {
      tools.setPageBackPressed('index', () => {
        const hisLen = history.length
        if (hisLen > 1) {
          console.log('物理返回键拦截')
          history.go(-1)
        }
        // 返回键触发事件
      })
    })
  }
}

export const useImage = (url: ComputedRef<string | undefined>): { width: Ref<number>, height: Ref<number>, background: Ref<string>, backgroundShow: Ref<string> } => {
  const width = ref<number>(0)
  const height = ref<number>(0)
  const background = ref<string>('')
  const backgroundShow = ref<string>('') // 背景透明度
  watch(url, (src) => {
    if (src) {
      const canvas = document.createElement('canvas')
      const ctx = canvas?.getContext('2d')
      const img = new Image()

      const url = !isWebView() ? src.replace('http://', '/').replace('https://', '/') : src
      img.src = url
      // 加载完成执行
      img.onload = function () {
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const imgData = (ctx.getImageData(0, 0, img.width, img.height)).data
          const b = `(${imgData[0]},${imgData[1]},${imgData[2]},1)`
          const c = `(${imgData[4]},${imgData[5]},${imgData[6]},0.8)`
          const cShow = `(${imgData[4]},${imgData[5]},${imgData[6]},1)`
          const d = `(${imgData[4]},${imgData[5]},${imgData[6]},0.6)`
          background.value = `linear-gradient(to bottom right,rgba${b}40%,rgba${c}60%,rgba${d}100%)`
          backgroundShow.value = `linear-gradient(to bottom right,rgba${b}40%,rgba${cShow}60%,rgba${cShow}100%)`
        }
        width.value = img.width
        height.value = img.height
      }
    } else {
      width.value = 0
      height.value = 0
      background.value = ''
    }
  })

  return {
    width,
    height,
    background,
    backgroundShow
  }
}
export const openPage = (url: string): void => {
  const isWebview = isWebView()
  if (isWebview) {
    const jumpUrl = `${window.location.href.split('#')[0]}#${url}`
    webViewReady().then(tools => {
      tools.openPage({
        url: jumpUrl,
        pageType: 'web',
        statusBarType: 'immersion'
      })
    })
    return
  }
  router.push(url)
}
