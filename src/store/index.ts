import Vue from 'vue'
import Vuex from 'vuex'
import { createProxy, extractVuexModule } from 'vuex-class-component'
import app from './app'
import setting from './setting'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(app),
    ...extractVuexModule(setting)
  }
})

export const proxies = {
  app: createProxy(store, app),
  setting: createProxy(store, setting)

}

// declare module 'vue/types/vue' {
//   interface Vue {
//     $vx: typeof proxies;
//   }
// }

// export default () => store
