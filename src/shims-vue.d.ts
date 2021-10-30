/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.png'
declare module '*.js'
declare var requireModuleJs = (module: string) => any
declare module 'jsonp';
type songChannel = 'QQ' | 'netEase' | 'kugou' | 'kuwo'