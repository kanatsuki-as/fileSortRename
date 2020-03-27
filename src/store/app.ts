import { action, createModule } from 'vuex-class-component'
import { renameData, fileInfo } from '@/interface'

const VuexModule = createModule({
  namespaced: 'app'
})

export default class extends VuexModule {
  /** 初期化済み */
  renameInfoList: renameData[] = []

  @action
  public async renameDataSetting (fileInfoList: fileInfo[]) {
    // 現在のディレクトリにファイルをコピーしてから画面に表示する
    for (const file of fileInfoList) {
      this.renameInfoList.push({
        path: file.path,
        name: file.name,
        id: '',
        color: '#FFFFFF',
        petternName: '',
        isSelect: false
      })
    }
  }

  @action
  public async remove (index: number) {
    this.renameInfoList.splice(index, 1)
  }
}
