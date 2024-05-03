<template lang="pug">
v-dialog(
  v-model="dialog"
  width="auto"
)
  v-card(
    v-if="!isSubmit"
    width="300px"
    max-width="90vw"
    rounded="lg"
    color="grey_lighten_1"
    elevation="5"
  )
    div.d-flex.flex-column.py-6
      p.text-center.text-pre-wrap.dialog-update-user__title {{ $t('dialog.update_user.title') }}
      p.pt-4.text-center.text-pre-wrap.dialog-update-user__navigation {{ $t('dialog.update_user.navigation') }}

    v-container.pt-0.pb-8
      v-row.d-flex.flex-row.justify-center
        // ラジオネーム
        v-col(cols="12")
          v-text-field(
            v-model="form.radioName"
            :label="$t('dialog.create_user.form.radio_name')"
            variant="underlined"
            prepend-icon="mdi-format-text-variant-outline"
          )
        // 性別
        v-col(cols="12")
          v-select(
            v-model="form.gender"
            :label="$t('dialog.create_user.form.gender')"
            prepend-icon="mdi-account"
            :items="gender"
            variant="underlined"
          )
        // 年齢
        v-col(cols="12")
          v-text-field(
            v-model.number="form.age"
            type="number"
            max="300"
            :label="$t('dialog.create_user.form.age')"
            variant="underlined"
            prepend-icon="mdi-numeric"
          )

    v-card-actions.d-flex.flex-row.justify-center
      v-btn.px-4.font-weight-bold(
        color="grey"
        width="45%"
        rounded="pill"
        variant="elevated"
        @click="dialog = false"
      ) {{ $t('button.cancel') }}
      v-btn.px-4.font-weight-bold(
        color="green"
        width="45r%"
        rounded="pill"
        variant="elevated"
        :disabled="!form.radioName || !form.gender || !form.age"
        :loading="loading.update"
        @click="submit"
      ) {{ $t('button.update') }}

  v-card(
    v-else
    width="300px"
    max-width="90vw"
    rounded="lg"
    color="grey_lighten_1"
    elevation="5"
  )
    div.d-flex.flex-column.py-6
      p.pt-4.text-center.text-pre-wrap.dialog-update-user-result__navigation {{ label }}
    v-card-actions.d-flex.flex-row.justify-center
      v-btn.px-4.font-weight-bold(
        color="green"
        width="50%"
        rounded="pill"
        variant="elevated"
        @click="navigateToUser"
      ) {{ $t('button.ok') }}
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  userId: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
const dialog = useVModel('modelValue', props, emit)

const i18n = useI18n()
const id = useState('userId', () => '')

const {
  updateUser
} = useDatabase()

const gender = [
  { value: '男性', title: '男性' },
  { value: '女性', title: '女性' },
  { value: '回答しない', title: '回答しない'}
]

// ref
const form = ref({
  radioName: '',
  gender: '',
  age: null,
})
const loading = ref({
  update: false
})
const isSubmit = ref(false)
const label = ref('')
const userId = ref('')

// methods
const submit = async() => {
  loading.value.update = true
  if(!form.value.radioName || !form.value.gender || !form.value.age) return

  try {
    await updateUser(unref(form), props.userId)

    label.value = i18n.t('dialog.update_user.result.success')
    isSubmit.value = true
  } catch(e: any) {
    console.log('エラー', e)

    label.value = i18n.t('dialog.update_user.result.error')
    isSubmit.value = true
  } finally {
    loading.value.update = false
  }
}

/**
 * index に戻る
 */
const navigateToUser = () => navigateTo('/')
</script>

<style scoped lang="sass">
.dialog-update-user__title
  font-size: 18px

.dialog-update-user__navigation
  font-size: 12px

.dialog-update-user-result__navigation
  font-size: 18px
</style>
