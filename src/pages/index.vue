<template lang="pug">
// 初期化ローディング
v-container.fit-display(
  v-if="!dialog.createUser"
  fluid
)
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
  :lineId="lineId"
)
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const lineId = useState('lineId', () => '') // line のユーザーID
const userId = useState('userId', () => '') // notion の ページID
const {
  listeners,
  getListener,
} = useDatabase()

const dialog = ref({
  createUser: false
})

onMounted(async () => {
  const profile = await useLiff()
  lineId.value = profile?.userId
  await getListener(lineId.value)

  if(!listeners.value) {
    dialog.value.createUser = true
  } else {
    userId.value = listeners.value.id
    navigateTo(`/users/${listeners.value.id}`)
  }
})
</script>

<style scoped lang="sass"></style>