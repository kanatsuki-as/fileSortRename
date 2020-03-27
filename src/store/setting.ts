import { action, createModule } from "vuex-class-component"
import { renameData, fileInfo } from '@/interface'

export default class extends createModule({
  namespaced: "app", target: "nuxt"
}) {
  /** 初期化済み */
  renameInfoList: renameData[] = []
}
