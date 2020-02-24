<template>
  <div id="app">
    <div class="columns">
      <div class="column is-3">
        <Menu></Menu>
      </div>
      <div class="column">
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
          <IconScreenDefault :fileInfoList="fileInfoList"/>
        </section>
        <section class="hero-foot">
          <button @click="rename">名前変更</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IconScreenDefault from './components/IconScreenDefault.vue'
import Menu from './components/Menu.vue'

import 'bulma/css/bulma.css'
import fs from 'fs'
import path from 'path'

@Component({
  components: {
    Menu,
    IconScreenDefault
  }
})

export default class App extends Vue {
  msg1 = 'ここにファイルをドロップ。または'
  msg2 = 'ここをクリックして選択'
  fileInfoList: any[] = []
  workingDirectoryPath = ''
  outputDirectoryPath = ''
  isDrag = false

  mounted () {
    // 作業用パス
    this.workingDirectoryPath = fs.realpathSync('./') + '/work'
    this.outputDirectoryPath = fs.realpathSync('./') + '/output'

    // 作業用ディレクトリがなければ作成
    if (!fs.existsSync(this.workingDirectoryPath)) fs.mkdirSync(this.workingDirectoryPath)
    if (!fs.existsSync(this.outputDirectoryPath)) fs.mkdirSync(this.outputDirectoryPath)

    // tmpディレクトリにあるファイルを削除する
    const targetRemoveFiles = fs.readdirSync(this.workingDirectoryPath)
    for (const fileName of targetRemoveFiles) {
      fs.unlinkSync(this.workingDirectoryPath + '/' + fileName)
    }
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
      fs.copyFileSync(file.path, this.workingDirectoryPath + '/' + file.name)

      this.fileInfoList.push({
        path: this.workingDirectoryPath + '/' + file.name,
        name: path.basename(file.path)
      })
    }
    this.msg1 = 'ファイルをロードしました'
  }

  rename () {
    let index = 0
    for (const file of this.fileInfoList) {
      fs.renameSync(file.path, this.outputDirectoryPath + '/' + index + file.name)
      index++
    }
    alert('リネームが終了しました')
  }
}
</script>
