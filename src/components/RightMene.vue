<template>
  <section class="section has-background-success section_height">
    <div class="container">
      <label @click="remove">削除</label>
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
   @PropSync()
   index!: int;

   remove () {
     this.$emit('remove', this.index)
   }
}
</script>

<style>
.section_height {
  height: 100vh;
}
</style>
