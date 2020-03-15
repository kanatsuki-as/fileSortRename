<template>
  <v-card>
    sette
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'

@Component({
  components: {
  }
})

export default class IndexPage extends Vue {
  drawer = false;
  items = [
    {
      icon: 'mdi-apps',
      title: '編集画面',
      to: '/'
    },
    {
      icon: 'mdi-chart-bubble',
      title: '設定画面',
      to: '/setting'
    }
  ];
}
</script>
