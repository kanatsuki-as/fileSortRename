<template>
  <PerfectScrollbar>
    <draggable v-model='app.renameInfoList' class="grid">
      <div v-for="(fileInfo, index) in app.renameInfoList" :key="index" @click.right.prevent.stop="handleClick($event, index)" @click.left.prevent.stop="$emit('selectFiles', {event: $event, index: index})" :style="{ background: fileInfo.color}">
        <v-card>
          <v-img aspect-ratio="1" :src="fileInfo.path"></v-img>
          <div class="content">
            <p class="">{{fileInfo.name}}</p>
            <p class="">パターン:{{fileInfo.petternName}}</p>
          </div>
        </v-card>
      </div>
    </draggable>
  <vue-simple-context-menu
  :elementId="'screenDefault'"
  :options="options"
  :ref="'vueSimpleContextMenu'"
  @option-clicked="optionClicked"/>
  </PerfectScrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import { proxies } from './../store'

@Component({
  components: {
    draggable,
    PerfectScrollbar,
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
      this.$emit('remove', event.item)
    } else {
      // TODO: 選択されていなかったら処理を実行する必要あり
      this.$emit('rightSelect', event.option.name)
    }
  }
}
</script>

<style>
.grid {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
