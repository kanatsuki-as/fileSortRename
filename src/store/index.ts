import Vue from 'vue'
import Vuex from 'vuex'
import { createProxy, extractVuexModule } from 'vuex-class-component'
import app from './app'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(app)
  }
})

export const proxies = {
  app: createProxy(store, app)
}

// declare module 'vue/types/vue' {
//   interface Vue {
//     $vx: typeof proxies;
//   }
// }

// export default () => store
