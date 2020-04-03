<template>
  <v-container>
    <v-row>
      <v-col cols="6">
          <v-text-field label="変更後の名前" placeholder="任意の文字列を入力してください" v-model="renameValue"></v-text-field>
      </v-col>
      <v-col cols="3" v-if="selectRenameType.value === 'digitPaddingFirst' || selectRenameType.value === 'digitPaddingLast'">
        <v-text-field label="桁数" type="number" counter="1" placeholder="1～9の数字を入力してください" v-model="digit"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class Main extends Vue {
  isDrag = false
  renameValue = ''
  digit = ''

  @Prop()
  selectRenameType

  @Watch('renameValue')
  onChangerenameValue () {
    this.$emit('renameValue', this.renameValue)
  }

  @Watch('digit')
  onChangedigit () {
    this.$emit('digit', this.digit)
  }
}
</script>
