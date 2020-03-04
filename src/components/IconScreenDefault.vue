<template>
  <PerfectScrollbar>
    <draggable class="columns is-multiline" @end="onChange" v-model='childFileInfoList'>
      <div class="column is-one-quarter" v-for="(fileInfo, index) in childFileInfoList" :key="index" @click.right.prevent.stop="handleClick($event, index)" @click.left.prevent.stop="$emit('selectFiles', {event: $event, index: index})">
        <div class="card" :style="{ background: fileInfo.color}" >
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="fileInfo.path">
            </figure>
          </div>
          <div class="content">
            <p class="">{{fileInfo.name}}</p>
            <p class="">パターン:{{fileInfo.petternName}}</p>
          </div>
        </div>
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
import { Component } from 'vue-property-decorator'
import IconScreenBase from './IconScreenBase.vue'
import 'bulma/css/bulma.css'
import draggable from 'vuedraggable'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import fs from 'fs'

@Component({
  components: {
    draggable,
    PerfectScrollbar,
    VueSimpleContextMenu
  }
})

export default class IconScreenDefault extends IconScreenBase {
  options = [
    {
      id: 'remove',
      name: '削除',
      class: ''
    }
  ]

  mounted () {
    if (fs.readFileSync) {
      try {
        fs.statSync('saveFile')
        const jsonValue = JSON.parse(fs.readFileSync('saveFile'))
        const petternList = jsonValue

        petternList.forEach(item => {
          this.options.push({
            id: 'select',
            name: item.name,
            class: ''
          })
        })
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log('ファイル・ディレクトリは存在しません。')
        } else {
          alert(error)
        }
      }
    }
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
