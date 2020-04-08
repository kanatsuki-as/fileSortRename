import { action, createModule } from 'vuex-class-component'
import { renameData, fileInfo } from '@/interface'

const VuexModule = createModule({
  namespaced: ''
})

const selectColor = '#cce8ffcc'

export default class extends VuexModule {
  /** 初期化済み */
  renameInfoList: renameData[] = []
  selectBeforeIndex = -1
  selectType = 'Select'

  get getGenameInfoList () {
    return this.renameInfoList
  }

  // ファイルセット
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
        petternColor: '',
        isSelect: false
      })
    }
  }

  // クリック時の選択処理
  @action
  public async selectFiles (evnets) {
    // 押されたキーの判断
    const event = evnets.event
    // 選択されたアイテム
    const index = evnets.index

    // コントロールとシフトキー
    if (event.ctrlKey && event.shiftKey) {
      if (this.selectBeforeIndex !== -1) {
        let min = this.selectBeforeIndex < index ? this.selectBeforeIndex : index
        const max = this.selectBeforeIndex > index ? this.selectBeforeIndex + 1 : index + 1
        for (min; min < max; min++) {
          this.renameInfoList[min].isSelect = !this.renameInfoList[index].isSelect
          this.renameInfoList[min].color = this.selectType === 'Select' ? selectColor : '#FFFFFF'
        }
      }
    // ctrlキー
    } else if (event.ctrlKey) {
      // trueかfalseで選択か解除を行う
      this.renameInfoList[index].isSelect = !this.renameInfoList[index].isSelect
      this.selectType = this.renameInfoList[index].isSelect ? 'Select' : 'Release'
      this.renameInfoList[index].color = this.selectType === 'Select' ? selectColor : '#ffffff'
      this.selectBeforeIndex = index
    // シフトキー
    } else if (event.shiftKey) {
      // 初回選択はクリックと同じ
      if (this.selectBeforeIndex === -1) {
        this.renameInfoList[index].isSelect = true
        this.selectBeforeIndex = index
      // 初回選択じゃない場合はクリックしたものの間にあるもの全て選択
      } else {
        this.renameInfoList.forEach((item) => {
          item.isSelect = false
          item.color = '#ffffff'
        })
        let min = this.selectBeforeIndex < index ? this.selectBeforeIndex : index
        const max = this.selectBeforeIndex > index ? this.selectBeforeIndex + 1 : index + 1
        for (min; min < max; min++) {
          this.renameInfoList[min].isSelect = true
          this.renameInfoList[min].color = selectColor
        }
      }
    // ただのクリック時
    } else {
      this.click(index)
    }
  }

  @action
  public async click (index: number) {
    this.renameInfoList[index].isSelect = true
    this.renameInfoList[index].color = selectColor
    this.renameInfoList.forEach((item, i) => {
      if (i !== index) {
        item.isSelect = false
        item.color = '#ffffff'
      }
    })
    this.selectBeforeIndex = index
  }

  // 削除
  @action
  public async remove (index: number) {
    this.renameInfoList.splice(index, 1)
  }

  // パターンリスト
  @action
  public async petternSet ({ name, color }) {
    this.renameInfoList.forEach((item) => {
      if (item.isSelect) {
        item.petternName = name
        item.petternColor = color
        item.isSelect = false
      }
    })
  }
}
