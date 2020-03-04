<template>
  <PerfectScrollbar>
    <div class="columns is-multiline">
      <div class="column">
        <button @click="petternAdd">追加</button>
      </div>
      <div class="column is-12">
        <table class="table">
          <tr>
            <th>パターンの識別名</th>
            <th>パターン名</th>
            <th>パターンカラー</th>
            <th>削除</th>

          </tr>
          <tr v-for="(pettern, index) in petternList" :key="index">
            <td><input @change="save('id', index, $event.target.value)" :value='pettern.id' placeholder="識別名を入力してください"/></td>
            <td><input @change="save('name', index, $event.target.value)" :value='pettern.name' placeholder="リネーム時のパターンをを入力してください"/></td>
            <td><input @change="save('color', index, $event.target.value)" :value='pettern.color'  placeholder="パターン選択時の色を選択してください"/><input type="color"  :value='pettern.color' @change="save('color', index, $event.target.value)" /></td>
            <td><button @click="remove(index)">削除</button></td>
          </tr>
        </table>
      </div>
    </div>
  <vue-simple-context-menu
  :elementId="'screenDefault'"
  :options="options"
  :ref="'vueSimpleContextMenu'"
  @option-clicked="optionClicked"/>
  </PerfectScrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'bulma/css/bulma.css'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
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
      color: '#FFFFFF'
    })
  }

  mounted () {
    if (fs.readFileSync) {
      try {
        fs.statSync('saveFile')
        const jsonValue = JSON.parse(fs.readFileSync('saveFile'))
        this.petternList = jsonValue
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log('ファイル・ディレクトリは存在しません。')
        } else {
          alert(error)
        }
      }
    }
  }

  save (change, index, value) {
    this.$set(this.petternList[index], change, value)
    fs.writeFileSync('saveFile', JSON.stringify(this.petternList))
  }

  remove (index) {
    this.petternList.splice(index, 1)
  }
}
</script>
