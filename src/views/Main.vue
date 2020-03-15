<template>
  <v-card>
    <v-btn @click='test'>test</v-btn>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import { ipcRenderer } from 'electron'

@Component({
  components: {
  }
})
export default class Main extends Vue {
  test () {
    ipcRenderer.send('test')
    ipcRenderer.on('test-replay', (event, arg) => {
      alert(arg)
    })
  }
}
</script>
