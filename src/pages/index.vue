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

// ユーザー作成
dialog-create-user(
  v-model="dialog.createUser"
)
</template>

<script setup lang="ts">
const {
  listeners,
  getListener,
} = useDatabase()

const dialog = ref({
  createUser: false
})

onMounted(async () => {
  const profile = await useLiff()
  const lineId = profile?.userId
  await getListener(lineId)

  if(!listeners.value) {
    dialog.value.createUser = true
  } else {
    navigateTo(`/users/${listeners.value.id}`)
  }
})
</script>

<style scoped lang="sass"></style>