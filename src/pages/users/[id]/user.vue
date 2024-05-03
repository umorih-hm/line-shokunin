<template lang="pug">
v-container.pt-0.pb-8
  v-row.d-flex.flex-row.justify-center
    // ラジオネーム
    v-col(cols="12")
      v-text-field(
        v-model="form.radioName"
        :label="$t('dialog.create_user.form.radio_name')"
        variant="underlined"
        prepend-icon="mdi-format-text-variant-outline"
        readonly
      )
    // 性別
    v-col(cols="12")
      v-select(
        v-model="form.gender"
        :label="$t('dialog.create_user.form.gender')"
        prepend-icon="mdi-account"
        variant="underlined"
        readonly
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
        readonly
      )

    v-col.d-flex.justify-center(cols="12")
      v-btn.px-4.font-weight-bold(
        color="green"
        width="50%"
        rounded="pill"
        variant="elevated"
        @click="dialog.createUser = true"
      ) {{ $t('button.update') }}

// ユーザー更新
dialog-update-user(
  v-model="dialog.createUser"
  :userId="userId"
)
</template>

<script setup lang="ts">
const route = useRoute()
const userId = route.params.id
const lineId = useState('lineId', () => '')

const {
  listeners,
  getListener,
} = useDatabase()

const form = ref({
  radioName: '',
  gender: '',
  age: null,
})
const dialog = ref({
  createUser: false,
})

onMounted(async () => {
  if(!lineId.value) return navigateTo('/')

  await getListener(lineId.value)
  form.value.radioName = listeners.value.radioName
  form.value.gender = listeners.value.gender
  form.value.age = listeners.value.age
})
</script>

<style scoped lang="sass"></style>