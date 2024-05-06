<template lang="pug">
v-container
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
        height="150px"
        rounded="lg"
        variant="plain"
        @click="navigateTo(`/users/${userId}/form?theme=${theme.value}`)"
      )
        v-img.rounded-lg(
          v-if="theme.image.length"
          width="300px"
          height="150px"
          :src="theme.image[0].file.url"
        )
        h2.text-center(v-else) {{ theme.title }}

// チュートリアル
dialog-tutorial(
  v-model="dialog.tutorial"
  @close="closeTutorial"
)
</template>

<script setup lang="ts">
const config = useConfig()
const route = useRoute()
const userId = route.params.id
const lineId = useState('lineId', () => '') // line のユーザーID

const {
  mailTheme,
  getMailTheme,
} = useDatabase()

// ref
const dialog = ref({
  tutorial: false
})

// methods
const closeTutorial = (isSkip: boolean) => {
  config.set('isSkipTutorial', isSkip)
  dialog.value.tutorial = false
}

onMounted(async () => {
  if(!lineId.value) return navigateTo('/')
  await getMailTheme()

  const isSkipTutorial = config.get('isSkipTutorial', '')
  if(!isSkipTutorial) dialog.value.tutorial = true
})
</script>

<style scoped lang="sass">
.post-button__title
  font-size: 30px

.mail-theme-image
  opacity: 1
</style>