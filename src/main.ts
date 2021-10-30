import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VConsole from 'vconsole'
import { Lazyload } from 'vant'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const vConsole = new VConsole()

createApp(App).use(store).use(router).use(Lazyload).mount('#app')
