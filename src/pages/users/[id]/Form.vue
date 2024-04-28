<template lang="pug">
v-container.py-0
  v-row.d-flex.flex-row.justify-center
    // メールテーマ
    v-col(cols="12")
      div.bg-red.rounded-pill.ma-auto.text-center.form-title(
        style="height: 30px; width: 70vw; max-width: 400px;"
      ) {{ $t('pages.users.form.mail_theme') }}
    v-col(cols="12")
      v-select(
        width="80vw"
        max-width="400px"
        prepend-icon="mdi-email-outline"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        variant="underlined"
      )

    // 本文
    v-col(cols="12")
      div.bg-red.rounded-pill.ma-auto.text-center.form-title(
        style="height: 30px; width: 70vw; max-width: 400px;"
      ) {{ $t('pages.users.form.content') }}
    // 添付ファイル
    v-col(cols="12")
      div.bg-red.rounded-pill.ma-auto.text-center.form-title(
        style="height: 30px; width: 70vw; max-width: 400px;"
      ) {{ $t('pages.users.form.attachment') }}
    v-col(cols="12")
      v-file-input(
        variant="underlined"
      )
    v-col.d-flex.flex-row.justify-space-evenly
      // 戻る
      v-btn.form-button__title(
        color="grey"
        rounded="pill"
        height="40px"
        :to="`/users/${lineId}`"
      ) {{ $t('button.back') }}
      // 送信する
      v-btn.form-button__title(
        color="green"
        rounded="pill"
        height="40px"
        @click="dialog.sendForm = true"
      ) {{ $t('button.send') }}

// 送信確認
dialog-send-form(
  v-model="dialog.sendForm"
  @ok="submit"
)
</template>

<script setup lang="ts">
const route = useRoute()
const lineId = route.params.id

const dialog = ref({
  sendForm: false
})

// methods
const submit = () => {
  console.log('test')
  dialog.value.sendForm = false
  navigateTo(`/users/${lineId}`)
}
</script>

<style scoped lang="sass">
.form-title
  font-size: 18px

.form-button__title
  font-size: 20px
</style>