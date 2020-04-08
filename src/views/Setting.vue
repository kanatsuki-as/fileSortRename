<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn class="ma-2" @click="petternAdd">追加</v-btn>
          <v-btn class="ma-2" @click="save">保存</v-btn>
          <v-btn class="ma-2" @click="allDelete">全件削除</v-btn>
        </v-col>
        <v-col cols="12" style="height:1000px; width:100%; overflow-y:scroll;">
          <v-simple-table class="table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th>パターン名</th>
                  <th>パターンカラー</th>
                  <th>削除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pettern, index) in listDatas" :key="index">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import { proxies } from './../store'
import { v4 as uuidv4 } from 'uuid'

@Component({
  components: {
    VueSimpleContextMenu
  }
})

export default class Setting extends Vue {
  options = [
    {
      name: '削除',
      class: ''
    }
  ]

  get listDatas () {
    return proxies.setting.datas
  }

  set listDatas (value) {
    proxies.setting.datas = value
  }

  handleClick (event, item) {
    this.$refs.vueSimpleContextMenu.showMenu(event, item)
  }

  optionClicked (event) {
    this.listDatas.splice(event.item, 1)
  }

  petternAdd () {
    this.listDatas.push({
      id: uuidv4(),
      name: '',
      color: { r: 255, g: 0, b: 255, a: 1 }
    })
  }

  save () {
    ipcRenderer.sendSync('settingFileSave', this.listDatas)
    alert('保存しました')
  }

  remove (index) {
    this.listDatas.splice(index, 1)
  }

  allDelete () {
    if (window.confirm('全件削除します。よろしいですか')) {
      this.listDatas = []
      alert('全件削除しました')
    }
  }
}
</script>
