<template>
  <section class="section has-background-success section_height">
    <div class="container">
      <label class="label">変更する名前</label>
      <input class="input" type="text" placeholder="変更する名前">
      <label class="label">選択</label>
      <div class="select is-fullwidth">
        <select>
          <option disabled value="">Please select one</option>
          <option value="1">Business development</option>
          <option value="2">Marketing</option>
          <option value="3">Sales</option>
        </select>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import 'bulma/css/bulma.css'

@Component({
  components: {
  }
})

interface MenuInterface{
    name: string;
    value: string;
}

export default class IconScreenDefault extends Vue {
}
</script>

<style>
.section_height {
  height: 100vh;
}
</style>
