<template lang="pug">
// 初期化ローディング
v-container.fit-display(fluid)
  v-card.h-100.d-flex.justify-center.align-center(
    color="#00000000"
    variant="flat"
  )
    v-progress-circular(
      color="primary"
      size="60"
      indeterminate
    )

</template>

<script setup lang="ts">
const {
  listeners,
  otayoris,
  getListeners,
  getOtayori,
  getMailTheme
} = useDatabase()

onMounted(async () => {
  await getListeners()
  await getOtayori()
  await getMailTheme()
})
</script>

<style scoped lang="sass"></style>