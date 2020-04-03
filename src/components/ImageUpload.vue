<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card @dragleave.prevent="checkDrag($event, 'new', false)" @dragover.prevent="checkDrag($event, 'new', true)" @drop.prevent="onDrop">
          <div class="container is-fluid">
            <label for="file_selection">
              <p>{{ msg1 }}</p>
              <p>{{ msg2 }}</p>
              <input id="file_selection" type="file" accept="image/*" style="display:none;" @change="onDrop">
            </label>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { fileInfo } from './../interface'

@Component({
  components: {
  }
})
export default class ImageUpload extends Vue {
  msg1 = 'ここにファイルをドロップ。または'
  msg2 = 'ここをクリックして選択'
  isDrag = false

  @Prop()
  msg: string

  @Watch('msg')
  completeMsg () {
    this.msg1 = this.msg
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
    this.$emit('imageLoad', dataList)
  }
}
</script>
