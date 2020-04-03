<template>
  <div>
    <draggable v-model='app.renameInfoList' class="grid">
      <div v-for="(fileInfo, index) in app.renameInfoList" :key="index" @click.right.prevent.stop="handleClick($event, index)" @click.left.prevent.stop="app.selectFiles({event: $event, index: index})">
        <v-card class="mx-auto"  :style="{ background: fileInfo.color}">
          <v-img aspect-ratio="1.5" contain :src="fileInfo.path"></v-img>
          <div class="content">
            <v-card-title>{{fileInfo.name}}</v-card-title>
            <v-card-text class="text--primary title">
              <p class="title">パターン:{{fileInfo.petternName}}</p>
            </v-card-text>
          </div>
        </v-card>
      </div>
    </draggable>
    <vue-simple-context-menu
    :elementId="'screenDefault'"
    :options="options"
    :ref="'vueSimpleContextMenu'"
    @option-clicked="optionClicked"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import { proxies } from './../store'

@Component({
  components: {
    draggable,
    VueSimpleContextMenu
  }
})
export default class IconScreenDefault extends Vue {
  options = [
    {
      id: 'remove',
      name: '削除',
      class: ''
    }
  ]

  get app () {
    return proxies.app
  }

  handleClick (event, item) {
    this.$refs.vueSimpleContextMenu.showMenu(event, item)
  }

  optionClicked (event) {
    if (event.option.id === 'remove') {
      this.app.remove(event.item)
    } else {
      // TODO: 選択されていなかったら処理を実行する必要あり
      this.app.petternSet(event.option.name)
    }
  }
}
</script>

<style>
.grid {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.title {
  text-align: center;
}
</style>
