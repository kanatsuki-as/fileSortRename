<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator'

@Component
export default class IconScreenBase extends Vue {
  @Prop() private fileInfoList!: any[]
  childFileInfoList: any[] = []

  moutend () {
    this.childFileInfoList = this.fileInfoList
  }

  @Watch('fileInfoList')
  listUpdate () {
    this.childFileInfoList = this.fileInfoList
  }

  onChange () {
    this.$emit('update:fileInfoList', this.childFileInfoList)
  }
}
</script>
