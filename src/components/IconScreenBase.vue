<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import 'bulma/css/bulma.css'
import draggable from 'vuedraggable'

@Component
export default class IconScreenBase extends Vue {
  @Prop() private fileInfoList: any[]
}
</script>
