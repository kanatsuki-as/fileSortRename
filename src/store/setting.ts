import { createModule, action } from 'vuex-class-component'
import { settinPettern } from '@/interface'

const VuexModule = createModule({
  namespaced: 'setting'
})

export default class extends VuexModule {
  /** 初期化済み */
  private settingList: settinPettern[] = []

  get datas () {
    return this.settingList
  }

  set datas (value) {
    this.settingList = value
  }
}
