<template lang="pug">
v-dialog(
  v-model="dialog"
  persistent
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
      p.pt-4.text-center.text-pre-wrap.dialog-complete-reset-settings__navigation {{ label }}
    v-card-actions.d-flex.flex-row.justify-center
      v-btn.px-4.font-weight-bold(
        color="green"
        width="50%"
        rounded="pill"
        variant="elevated"
        @click="ok"
      ) {{ $t('button.ok') }}
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  label: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'ok'): void
}>()

const dialog = useVModel('modelValue', props, emit)
const ok = () => emit('ok')
</script>

<style scoped lang="sass">
.dialog-complete-reset-settings__title
  font-size: 18px

.dialog-complete-reset-settings__navigation
  font-size: 12px
</style>
