<template>
  <section class="section has-background-success section_height">
    <div class="container">
      <label class="label">変更する名前</label>
      <input class="input" type="text"  @change="$emit('update:renameValue', $event.target.value)" placeholder="変更する名前" v-model="renameValue">
      <label class="label">選択</label>
      <div class="select is-fullwidth">
        <select @change="$emit('update:selectRenamePettern', $event.target.value)">
          <option disabled value="">Please select one</option>
          <option value="digitFirst">先頭数字埋め</option>
          <option value="digitPaddingFirst">先頭数字埋め(桁埋めあり）</option>
          <option value="digitLast">後ろ数字埋め</option>
          <option value="digitPaddingLast">後ろ数字埋め(桁埋めあり）</option>
          <option value="custom">カスタム処理</option>
        </select>
      </div>
    </div>
    <div>
      <button @click="$emit('isOpen', true)">設定画面</button>
      <button @click="$emit('isOpen', false)">戻る</button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator'
import 'bulma/css/bulma.css'

@Component({
  components: {
  }
})

export default class IconScreenDefault extends Vue {
  petternList: any[]!

   @PropSync()
   renameValue!: string;

   @PropSync()
   selectRenamePettern!: string;

  // TODO: 出来ることならパターンカラーをユーザーにカラーコードから選ばせる
  // 桁埋めも設定画面必須
}
</script>

<style>
.section_height {
  height: 100vh;
}
</style>
