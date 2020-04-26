<template>
  <v-app>
    <v-content>
      <v-container>
         <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})

export default class IndexPage extends Vue {
}
</script>
