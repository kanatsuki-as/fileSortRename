<template>
  <div>
    <draggable v-model='app.renameInfoList' class="grid">
      <div v-for="(fileInfo, index) in app.renameInfoList" :key="index" @click.right.prevent.stop="handleClick($event, index)" @click.left.prevent.stop="app.selectFiles({event: $event, index: index})">
        <div :style="{ background: fileInfo.color}">
          <div class="card_image">
            <v-layout justify-center>
              <v-img aspect-ratio="1.0" max-height="100" max-width="100" contain :src="fileInfo.path"></v-img>
            </v-layout>
          </div>
          <div class="card_text" :style="{ background: fileInfo.color}">
            <p>{{fileInfo.name}}</p>
            <p>パターン:</p>
            <p>{{fileInfo.petternName}}</p>
          </div>
        </div>
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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import { proxies } from './../store'
import { options, renameType } from '@/interface'

@Component({
  components: {
    draggable,
    VueSimpleContextMenu
  }
})
export default class IconScreenDefault extends Vue {
  options: options[] = []

  @Prop()
  selectRenameType: renameType

  get app () {
    return proxies.app
  }

  get refs (): any {
    return this.$refs
  }

  mounted () {
    this.rightMenuSetting()
  }

  @Watch('selectRenameType')
  isChangeSelectRenameType () {
    this.rightMenuSetting()
  }

  rightMenuSetting () {
    this.options = []
    this.options.push(
      {
        id: 'remove',
        name: '削除',
        class: '',
        color: ''
      })

    if (this.selectRenameType.value === 'custom') {
      proxies.setting.datas.forEach(item => {
        this.options.push({
          id: item.id,
          name: item.name,
          color: item.name,
          class: ''
        })
      })
    }
  }

  handleClick (event, index) {
    // 特殊キーが押されていないかつ、選択処理が行われていない画像を右クリックしていたらそのファイルのみ選択を行う
    if (!event.ctrlKey && !event.shiftKey && !this.app.renameInfoList[index].isSelect) {
      this.app.click(index)
    }
    this.refs.vueSimpleContextMenu.showMenu(event, index)
  }

  optionClicked (event) {
    if (event.option.id === 'remove') {
      this.app.remove(event.item)
    } else {
      this.app.petternSet({ name: event.option.name, color: event.option.color })
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

.card_image {
  padding: 10px;
}

.card_text {
  font-size: 10pt;
}

</style>
