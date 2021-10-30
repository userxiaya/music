declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.png'
declare module '*.js'
// eslint-disable-next-line
declare var requireModuleJs = (module: string) => any
declare module 'jsonp'
type songChannel = 'QQ' | 'netEase' | 'kugou' | 'kuwo'
