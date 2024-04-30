<template lang="pug">
v-dialog(
  v-model="dialog"
  width="auto"
)
  v-card(
    width="300px"
    max-width="90vw"
    rounded="lg"
    color="grey_lighten_1"
    elevation="5"
  )
    div.d-flex.flex-column.py-16
      p.text-center.text-pre-wrap.dialog-send-form__title {{ $t('dialog.send_form.title') }}
      p.pt-4.text-center.text-pre-wrap.dialog-send-form__navigation {{ $t('dialog.send_form.navigation') }}
    v-card-actions.d-flex.flex-row.justify-space-evenly
      v-btn.px-4.font-weight-bold(
        color="grey"
        width="45%"
        rounded="pill"
        variant="elevated"
        @click="dialog = false"
      ) {{ $t('button.cancel') }}
      v-btn.px-4.font-weight-bold(
        color="green"
        width="45%"
        rounded="pill"
        variant="elevated"
        :loading="loading"
        @click="ok"
      ) {{ $t('button.ok') }}
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  loading: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'ok'): void
}>()

const dialog = useVModel('modelValue', props, emit)
const ok = () => emit('ok')
</script>

<style scoped lang="sass">
.dialog-send-form__title
  font-size: 18px

.dialog-send-form__navigation
  font-size: 12px
</style>
