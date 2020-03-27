<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-content>
      <v-container>
         <router-view></router-view>
      </v-container>
    </v-content>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
    >
      <v-list>
        <v-divider></v-divider>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})

export default class IndexPage extends Vue {
  drawer = false;
  items = [
    {
      icon: 'mdi-apps',
      title: '画像編集',
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
