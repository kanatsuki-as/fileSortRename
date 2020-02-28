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
          </tr>
          <tr v-for="(pettern, index) in petternList" :key="index">
            <td><input v-model="pettern.id" placeholder="識別名を入力してください"/></td>
            <td><input v-model="pettern.name" placeholder="リネーム時のパターンをを入力してください"/></td>
            <td><input v-model="pettern.color" placeholder="パターン選択時の色を選択してください"/><input type="color" v-model="pettern.color" /></td>
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

  test () {
    alert('ok')
  }

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
      color: '#000000'
    })
  }
}
</script>
