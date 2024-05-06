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
    v-window(v-model="window")
      v-window-item(
        v-for="item in windowItems"
        :key="item"
      )
        v-card-title.text-center {{ item.title }}
        p.mb-4.text-pre-wrap.text-center.dialog-tutorial__navigation {{ item.navigation }}
        v-img.border.overflow-visible(
          :src="item.image"
        )
    v-card-actions.d-flex.flex-column.justify-center(v-if="window === 3")
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
    div.d-flex.justify-space-between
      v-btn(
        icon="mdi-arrow-left-bold-circle-outline"
        variant="plain"
        :disabled="window == 0"
        @click="window -= 1"
      )
      v-btn(
        icon="mdi-arrow-right-bold-circle-outline"
        variant="plain"
        :disabled="window == 3"
        @click="window += 1"
      )
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
  { title: i18n.t('dialog.tutorial.form_1.title'), navigation: i18n.t('dialog.tutorial.form_1.navigation'), image: '/window_home.png' },
  { title: i18n.t('dialog.tutorial.form_2.title'), navigation: i18n.t('dialog.tutorial.form_2.navigation'), image: '/window_form.png' },
  { title: i18n.t('dialog.tutorial.point.title'), navigation: i18n.t('dialog.tutorial.point.navigation'), image: '/window_point.png' },
  { title: i18n.t('dialog.tutorial.user.title'), navigation: i18n.t('dialog.tutorial.user.navigation'), image: '/window_user.png' }
]

// ref
const window = ref(0)
const checkbox = ref(false)
</script>

<style scoped lang="sass">
.dialog-tutorial__navigation
  font-size: 14px
</style>
