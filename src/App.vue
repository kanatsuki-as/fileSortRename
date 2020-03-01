<template>
  <div id="app">
    <!-- Alt + C -->
    <div class="columns">
      <div class="column is-3">
        <Menu :renameValue.sync="renameValue" :selectRenamePettern.sync="selectRenamePettern" @isOpen='isOpen=$event'></Menu>
      </div>
      <div class="column" v-if="isOpen">
        <Setting></Setting>
      </div>
      <div class="column" v-else>
        <section class="hero-head">
        </section>
        <section @dragleave.prevent="checkDrag($event, 'new', false)" @dragover.prevent="checkDrag($event, 'new', true)" @drop.prevent="onDrop">
          <div class="hero-body hero is-info">
            <div class="container is-fluid">
              <label for="file_selection">{{ msg1 }}{{ msg2 }}
                <input id="file_selection" type="file" accept="image/*" style="display:none;" @change="onDrop">
              </label>
            </div>
          </div>
          <IconScreenDefault :fileInfoList.sync="fileInfoList" @remove='remove' @selectFiles='selectFiles'/>
        </section>
        <section class="hero-foot">
          <button @click="renameOutput">名前変更</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IconScreenDefault from './components/IconScreenDefault.vue'
import Menu from './components/Menu.vue'
import Setting from './components/Setting.vue'

import 'bulma/css/bulma.css'
import fs from 'fs'
import path from 'path'

@Component({
  components: {
    Menu,
    IconScreenDefault,
    Setting
  }
})

export default class App extends Vue {
  msg1 = 'ここにファイルをドロップ。または'
  msg2 = 'ここをクリックして選択'
  fileInfoList: any[] = []
  workingDirectoryPath = ''
  outputDirectoryPath = ''
  isDrag = false
  renameValue = ''
  selectRenamePettern = 'digitFirst'
  isOpen = false
  selectBeforeIndex = -1
  selectType = 'Select'

  mounted () {
    // 作業用パス
    this.workingDirectoryPath = fs.realpathSync('./') + '/work'
    this.outputDirectoryPath = fs.realpathSync('./') + '/output'

    // 作業用ディレクトリがなければ作成
    this.createDirectory(this.workingDirectoryPath)
    this.createDirectory(this.outputDirectoryPath)

    // tmpディレクトリにあるファイルを削除する
    this.removeFiles(this.workingDirectoryPath)
    this.removeFiles(this.outputDirectoryPath)
  }

  createDirectory (path: string) {
    if (!fs.existsSync(path)) fs.mkdirSync(path)
  }

  removeFiles (path: string) {
    const targetRemoveFiles = fs.readdirSync(path)
    for (const fileName of targetRemoveFiles) {
      fs.unlinkSync(path + '/' + fileName)
    }
  }

  selectFiles (evnets) {
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
          this.fileInfoList[min].isSelect = this.selectType === 'Select' ? '#aafdcc' : '#FFFFFF'
          this.fileInfoList[min].color = this.selectType === 'Select' ? '#aafdcc' : '#FFFFFF'
        }
      }
    // ctrlキー
    } else if (event.ctrlKey) {
      // trueかfalseで選択か解除を行う
      this.fileInfoList[index].isSelect = !this.fileInfoList[index].isSelect
      this.selectType = this.fileInfoList[index].isSelect ? 'Select' : 'Release'
      this.fileInfoList[index].color = this.selectType === 'Select' ? '#aafdcc' : '#ffffff'
      this.selectBeforeIndex = index
    // シフトキー
    } else if (event.shiftKey) {
      // 初回選択はクリックと同じ
      if (this.selectBeforeIndex === -1) {
        this.fileInfoList[index].isSelect = true
        this.selectBeforeIndex = index
      // 初回選択じゃない場合はクリックしたものの間にあるもの全て選択
      } else {
        this.fileInfoList.forEach((item, i) => {
          item.isSelect = false
          item.color = '#ffffff'
        })
        let min = this.selectBeforeIndex < index ? this.selectBeforeIndex : index
        const max = this.selectBeforeIndex > index ? this.selectBeforeIndex + 1 : index + 1
        for (min; min < max; min++) {
          this.fileInfoList[min].isSelect = true
          this.fileInfoList[min].color = '#aafdcc'
        }
      }
    // ただのクリック時
    } else {
      this.fileInfoList[index].isSelect = true
      this.fileInfoList[index].color = '#aafdcc'
      this.fileInfoList.forEach((item, i) => {
        if (i !== index) {
          item.isSelect = false
          item.color = '#ffffff'
        }
      })
      this.selectBeforeIndex = index
    }
  }

  remove (index) {
    this.fileInfoList.splice(index, 1)
  }

  checkDrag (event: any, key: any, status: any) {
    this.isDrag = status ? key : null
    if (status) {
      this.msg1 = 'ドラッグ中'
      this.msg2 = 'ここにドロップしてください'
    } else {
      this.msg1 = 'ここにファイルをドロップ。または'
      this.msg2 = 'ここをクリックして選択'
    }
  }

  async onDrop (event: any) {
    this.isDrag = false
    const fileList = event.target.files
      ? event.target.files
      : event.dataTransfer.files

    // 現在のディレクトリにファイルをコピーしてから画面に表示する
    for (const file of fileList) {
      // TODO:ファイルを上書きしちゃうので、ファイル名を変更するかエラーにしないとダメ
      fs.copyFileSync(file.path, this.workingDirectoryPath + '/' + file.name, fs.constants.COPYFILE_EXCL)

      this.fileInfoList.push({
        path: this.workingDirectoryPath + '/' + file.name,
        name: file.name,
        id: '',
        color: '#FFFFFF',
        isSelect: false
      })
    }
    this.msg1 = 'ファイルをロードしました'
  }

  renameOutput () {
    // 出力先をフォルダの内容を削除しておく
    this.removeFiles(this.outputDirectoryPath)
    switch (this.selectRenamePettern) {
      case 'digitFirst':
      case 'digitPaddingFirst':
        this.digitFirst(this.selectRenamePettern === 'digitPaddingFirst')
        break
      case 'digitLast':
      case 'digitPaddingLast':
        this.digitLast(this.selectRenamePettern === 'digitPaddingLast')
        break
      default:
        alert('処理に問題が発生しました')
        return
    }
    alert('リネームが終了しました')
  }

  digitFirst (padding: bool) {
    let index = 1
    // TODO:桁の制御
    for (const file of this.fileInfoList) {
      const textIndex = padding ? ('000' + index).slice(-3) : index
      const newFileName = textIndex + this.renameValue + path.extname(file.path)
      fs.copyFileSync(file.path, this.outputDirectoryPath + '/' + newFileName)
      index++
    }
  }

  digitLast (padding: bool) {
    let index = 1
    // TODO:桁の制御
    for (const file of this.fileInfoList) {
      const textIndex = padding ? ('000' + index).slice(-3) : index
      const newFileName = this.renameValue + textIndex + path.extname(file.path)
      fs.copyFileSync(file.path, this.outputDirectoryPath + '/' + newFileName)
      index++
    }
  }
}
</script>
