<template lang="pug">
v-dialog(
  v-model="dialog"
  persistent
  width="auto"
)
  v-card.pa-4(
    width="300px"
    max-width="90vw"
    rounded="lg"
    color="grey_lighten_1"
    elevation="5"
  )
    v-window(
      v-model="window"
      touch
    )
      v-window-item(
        v-for="item in windowItems"
        :key="item"
      )
        v-card-title.text-center {{ item.title }}
        p.dialog-tutorial__navigation {{ item.navigation }}
    v-divider
    v-card-actions.d-flex.flex-column.justify-center
      v-checkbox(
        v-model="checkbox"
        :label="$t('dialog.tutorial.skip_show')"
      )
      v-btn.px-4.font-weight-bold(
        color="grey"
        width="50%"
        rounded="pill"
        variant="elevated"
        @click="close"
      ) {{ $t('button.close') }}
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close', isSkip: boolean): void
}>()
const dialog = useVModel('modelValue', props, emit)
const close = () => emit('close', checkbox.value)

const i18n = useI18n()

const windowItems = [
  { title: '投稿する', navigation: 'メールテーマを選択すると投稿画面に遷移します。', image: '' },
  { title: 'ポイントを貯める', navigation: 'ポイント画面で現在のポイント数を確認できます。', image: '' },
  { title: '設定を変える', navigation: 'ユーザー情報を変更することができます。', image: '' }
]

// ref
const window = ref(false)
const checkbox = ref(false)
</script>

<style scoped lang="sass">
.dialog-tutorial__navigation
  font-size: 14px
</style>
