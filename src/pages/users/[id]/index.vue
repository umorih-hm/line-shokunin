<template lang="pug">
v-container
  // ラジオに投稿する
  v-row
    v-col.d-flex.flex-row.justify-center
      v-btn.post-button__title(
        color="green"
        rounded="pill"
        height="100px"
        @click="overlay.form = true"
      ) {{ $t('button.post') }}
        v-overlay(
          v-model="overlay.form"
        )
          window-form(
            @back="overlay.form = false"
            @send="dialog.sendForm = true"
          )
  // 過去の投稿一覧
  v-row
    v-col
      p.text-center {{ $t('pages.users.index.theme_list') }}

// 送信確認
dialog-send-form(
  v-model="dialog.sendForm"
  @ok="submit"
)
</template>

<script setup lang="ts">
const lineId = useState('lineId', () => '')
lineId.value = 1

const form = ref({
  theme: ''
})
const overlay = ref({
  form: false
})
const dialog = ref({
  sendForm: false
})

// methods
const submit = () => {
  console.log('test')
  dialog.value.sendForm = false
  overlay.value.form = false
}
</script>

<style scoped lang="sass">
.post-button__title
  font-size: 30px
</style>