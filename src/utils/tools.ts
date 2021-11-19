import { ComputedRef, ref, watch, Ref } from 'vue'

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
const isEEUI = (): boolean => {
  const { userAgent } = navigator
  return userAgent.indexOf('EEUI_WEB') !== -1
}
const isEEUIWeb = isEEUI()
export const isWebview = isEEUIWeb

// 处理webview返回事件
export const setPageBackPressed = (): void => {
  if (isWebview) {
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
  const background = ref<string>('linear-gradient(to right bottom, rgb(97, 119, 107) 40%, rgb(98, 120, 108) 60%, rgb(98, 120, 108) 100%)')
  const backgroundShow = ref<string>('linear-gradient(to right bottom, rgb(97, 119, 107) 40%, rgba(98, 120, 108, 0.8) 60%, rgba(98, 120, 108, 0.6) 100%)') // 背景透明度
  watch(url, (src) => {
    if (src) {
      const canvas = document.createElement('canvas')
      const ctx = canvas?.getContext('2d')
      const img = new Image()
      // 是否webview加载（webview允许跨域）
      const url = !isWebview ? src.replace('http://', '/').replace('https://', '/') : src
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
