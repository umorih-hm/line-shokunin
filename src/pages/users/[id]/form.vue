<template lang="pug">
v-container
  v-row
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
const form = ref({
  theme: ''
})
const dialog = ref({
  sendForm: false
})

// methods
const submit = () => {
  console.log('test')
  dialog.value.sendForm = false
}
</script>

<style scoped lang="sass">
.form-button__title
  font-size: 24px
</style>