<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ImageUpload @imageLoad="imageLoad($event)" :msg="msg"></ImageUpload>
      </v-col>
      <v-col cols="12">
        <v-select
          v-model="selectRenameType"
          label="変換パターン"
          item-text="label"
          item-value="value"
          :items="renameType"
          return-object>
        </v-select>
      </v-col>
      <v-col cols="12">
        <v-btn @click="rename">リネーム開始</v-btn>
      </v-col>
      <v-col cols="12" v-if="selectRenameType.value !== 'custom'">
        <RenameInfo :selectRenameType="selectRenameType" @renameValue="renameValue = $event" @digit="digit = $event"></RenameInfo>
      </v-col>
        <v-col cols="12" style="height:1000px; width:100%; overflow-y:scroll;">
            <ScreenDefault :selectRenameType="selectRenameType"></ScreenDefault>
        </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'
import { fileInfo, outputRenameData, renameType } from './../interface'
import ImageUpload from './../components/ImageUpload.vue'
import RenameInfo from './../components/RenameInfo.vue'
import ScreenDefault from './../components/ScreenDefault.vue'

import { proxies } from './../store'

@Component({
  components: {
    ScreenDefault,
    ImageUpload,
    RenameInfo
  }
})
export default class Main extends Vue {
  msg = ''
  renameType: renameType[] = [
    {
      value: 'digitFirst',
      label: '先頭数字埋め'
    },
    {
      value: 'digitPaddingFirst',
      label: '先頭数字埋め(桁埋めあり）'
    },
    {
      value: 'digitLast',
      label: '後ろ数字埋め'
    },
    {
      value: 'digitPaddingLast',
      label: '後ろ数字埋め(桁埋めあり）'
    },
    {
      value: 'custom',
      label: 'カスタム処理'
    }
  ]

  selectRenameType: renameType = {
    value: 'digitFirst',
    label: '先頭数字埋め'
  }

  digit = 1
  renameValue = ''

  get app () {
    return proxies.app
  }

  mounted () {
    ipcRenderer.sendSync('init')
    proxies.setting.datas = ipcRenderer.sendSync('settingFileLoad')
  }

  imageLoad (dataList: fileInfo[]) {
    console.log(dataList)
    ipcRenderer.send('imageLoad', dataList)
    ipcRenderer.on('imageLoad-replay', async (event, arg: fileInfo[]) => {
      await this.app.renameDataSetting(arg)
      this.msg = 'ファイルを読み込みました'
    })
  }

  rename () {
    if (this.digit < 1) {
      alert('数字は1～9を入力してください')
      return
    }

    console.log(this.digit)
    const data: outputRenameData = {
      renameType: this.selectRenameType.value,
      renameList: this.app.renameInfoList,
      renameValue: this.renameValue,
      digit: this.digit
    }

    ipcRenderer.sendSync('rename', data)
    alert('出力しました')
  }
}
</script>

<style>
.ps {
  height: 400px;
}
</style>
