<template lang="pug">
v-card.overflow-y-auto(
  width="100vw"
  height="100vh"
)
  v-container
    v-row
      v-col.d-flex.flex-row.justify-space-evenly
        // 戻る
        v-btn.form-button__title(
          color="grey"
          rounded="pill"
          height="40px"
          @click="back"
        ) {{ $t('button.back') }}
        // 送信する
        v-btn.form-button__title(
          color="green"
          rounded="pill"
          height="40px"
          @click="send"
        ) {{ $t('button.send') }}
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'back'): void
  (e: 'send'): void
}>()
const back = () => emit('back')
const send = () => emit('send')
</script>

<style scoped lang="sass">
.form-button__title
  font-size: 24px
</style>