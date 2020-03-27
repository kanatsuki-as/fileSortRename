<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card @dragleave.prevent="checkDrag($event, 'new', false)" @dragover.prevent="checkDrag($event, 'new', true)" @drop.prevent="onDrop">
          <div class="container is-fluid">
            <label for="file_selection">{{ msg1 }}{{ msg2 }}
              <input id="file_selection" type="file" accept="image/*" style="display:none;" @change="onDrop">
            </label>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12">
        <ScreenDefault></ScreenDefault>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'
import { fileInfo, renameData } from './../interface.ts'
import ScreenDefault from './../components/ScreenDefault.vue'
import { proxies } from './../store'

@Component({
  components: {
    ScreenDefault
  }
})
export default class Main extends Vue {
  msg1 = 'ここにファイルをドロップ。または'
  msg2 = 'ここをクリックして選択'
  fileInfoList: renameData[] = []
  isDrag = false
  renameValue = ''
  selectRenamePettern = 'digitFirst'
  isOpen = false
  selectBeforeIndex = -1
  selectType = 'Select'

  get app () {
    return proxies.app
  }

  mounted () {
    ipcRenderer.send('init')
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

  petternSet (name) {
    this.fileInfoList.forEach((item) => {
      if (item.isSelect) {
        item.petternName = name
        item.isSelect = false
      }
    })
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

    const dataList: fileInfo[] = []
    for (const file of fileList) {
      dataList.push({
        path: file.path,
        name: file.name
      })
    }

    ipcRenderer.send('fileLoad', dataList)
    ipcRenderer.on('fileLoad-replay', async (event, arg: fileInfo[]) => {
      await this.app.renameDataSetting(arg)
      this.msg1 = 'ファイルを読み込みました'
    })
  }
}
</script>
