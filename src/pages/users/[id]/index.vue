<template lang="pug">
v-container
  // ラジオに投稿する
  v-row
    v-col.d-flex.flex-row.justify-center
      v-btn.post-button__title(
        color="green"
        rounded="pill"
        height="80px"
        :to="`/users/${userId}/form`"
      ) {{ $t('button.post') }}
  // テーマ一覧
  v-row
    v-col(cols="12")
      p.text-center {{ $t('pages.users.index.theme_list') }}
    v-col.d-flex.flex-row.justify-center(
      cols="12"
      v-for="theme in mailTheme"
      :key="theme.value"
    )
      v-btn.border.mail-theme-image(
        width="300px"
        height="100px"
        rounded="lg"
        variant="plain"
        @click="navigateTo(`/users/${userId}/form?theme=${theme.value}`)"
      )
        v-img(
          v-if="theme.image.length"
          width="300px"
          height="100px"
          :src="theme.image[0].file.url"
        )
        h2.text-center(v-else) {{ theme.title }}
</template>

<script setup lang="ts">
const route = useRoute()
const userId = route.params.id
const lineId = useState('lineId', () => '') // line のユーザーID

const {
  mailTheme,
  getMailTheme,
} = useDatabase()

onMounted(async () => {
  if(!lineId.value) return navigateTo('/')
  await getMailTheme()
})
</script>

<style scoped lang="sass">
.post-button__title
  font-size: 30px

.mail-theme-image
  opacity: 1
</style>