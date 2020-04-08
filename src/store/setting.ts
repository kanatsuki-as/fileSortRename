import { createModule } from 'vuex-class-component'
import { settinPettern } from '@/interface'

export default class extends createModule({
  namespaced: ''
}) {
  /** 初期化済み */
  private settingList: settinPettern[] = []

  get datas () {
    return this.settingList
  }

  set datas (value) {
    this.settingList = value
  }
}
