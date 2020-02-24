<template>
  <perfect-scrollbar>
    <draggable class="columns is-multiline">
      <div class="column is-one-quarter" v-for="(fileInfo, index) in fileInfoList" :key="index">
        <div class="card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="fileInfo.path">
            </figure>
          </div>
          <div class="card-content message is-primary">
            <div class="media-content">
              <p class="title is-6">{{fileInfo.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </draggable>
  </perfect-scrollbar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import IconScreenBase from './IconScreenBase.vue'
import 'bulma/css/bulma.css'
import draggable from 'vuedraggable'
import PerfectScrollbar from 'perfect-scrollbar'

@Component({
  components: {
    draggable
  }
})

export default class IconScreenDefault extends IconScreenBase {
}
</script>
