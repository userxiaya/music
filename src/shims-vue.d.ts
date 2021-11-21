/* eslint-disable @typescript-eslint/no-unused-vars */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.png'
declare module '*.js'
declare interface Window {
  requireModuleJs: (module: string) => any
  audioCallBack: (res: any) => void
}
declare module 'jsonp'
type songChannel = 'QQ' | 'netEase' | 'kugou' | 'kuwo'
