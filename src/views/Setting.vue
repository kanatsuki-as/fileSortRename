<template>
  <PerfectScrollbar>
    <v-container>
        <v-row>
          <v-col cols="1">
            <v-btn @click="petternAdd">追加</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="save">保存</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="load">読み込み</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="allDelete">全件削除</v-btn>
          </v-col>
          <v-col cols="8">
          </v-col>
        <v-col cols="12">
          <v-simple-table class="table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th>パターンの識別名</th>
                  <th>パターン名</th>
                  <th>パターンカラー</th>
                  <th>削除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pettern, index) in petternList" :key="index">
                  <td><v-text-field v-model='pettern.id' placeholder="識別名"></v-text-field></td>
                  <td><v-text-field v-model='pettern.name' placeholder="リネーム時のパターン"></v-text-field></td>
                  <td><v-color-picker type="rgba" v-model="pettern.color"></v-color-picker></td>
                  <td><v-btn @click="remove(index)">削除</v-btn></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  <vue-simple-context-menu
  :elementId="'screenDefault'"
  :options="options"
  :ref="'vueSimpleContextMenu'"
  @option-clicked="optionClicked"/>
  </PerfectScrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { ipcRenderer } from 'electron'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import fs from 'fs'

@Component({
  components: {
    PerfectScrollbar,
    VueSimpleContextMenu
  }
})

export default class Setting extends Vue {
  petternList: any[] = [];

  options = [
    {
      name: '削除',
      class: ''
    }
  ]

  handleClick (event, item) {
    this.$refs.vueSimpleContextMenu.showMenu(event, item)
  }

  optionClicked (event) {
    this.petternList.splice(event.item, 1)
  }

  petternAdd () {
    this.petternList.push({
      id: '',
      name: '',
      color: { r: 255, g: 0, b: 255, a: 1 }
    })
  }

  save () {
    fs.writeFileSync('saveFile', JSON.stringify(this.petternList))
    alert('保存しました')
  }

  load () {
    ipcRenderer.send('settingFileLoad')
    ipcRenderer.on('settingFileLoad-replay', async (event, arg: any[]) => {
      this.petternList = arg
      alert('読み込みました')
    })
  }

  remove (index) {
    this.petternList.splice(index, 1)
  }

  allDelete () {
    if (window.confirm('全件削除します。よろしいですか')) {
      this.petternList = []
      alert('全件削除しました')
    }
  }
}
</script>
