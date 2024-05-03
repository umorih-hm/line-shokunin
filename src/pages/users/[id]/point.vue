<template lang="pug">
v-container
  // 獲得ポイント
  v-row.d-flex.flex-row.justify-center
    v-col.d-flex.flex-column(cols="6")
      h3.text-center.text-red.pb-2 {{ $t('pages.users.point.current_point') }}
      v-img(
        height="60px"
        src="/point_p.png"
      )
    v-col(cols="6")
      div.bg-red.rounded-lg.ma-auto.point-card(style="height: 100px")
        h1.text-center.point-number__text {{ form.points }}
        span.font-weight-bold.point-number-unit__text {{ $t('pages.users.point.current_point_unit') }}

  // これまでの投稿数
  v-row.d-flex.flex-row.justify-center.mt-6
    v-col.d-flex.flex-column(cols="6")
      h4.text-center.text-grey.pb-2 {{ $t('pages.users.point.post_count') }}
      v-img(
        height="60px"
        src="/point_person.png"
      )
    v-col(cols="6")
      div.border-lg.border-grey.rounded-lg.ma-auto.point-card(style="height: 100px")
        h1.text-grey.text-center.point-number__text {{ form.postCount }}
        span.text-grey.font-weight-bold.point-number-unit__text {{ $t('pages.users.point.post_count_unit') }}

  // 投稿採用率
  v-row.d-flex.flex-row.justify-center.mt-6
    v-col(cols="6")
      h3.text-center.text-green.pb-2 {{ $t('pages.users.point.pass_count') }}
      v-img(
        height="60px"
        src="/point_mail.png"
      )
    v-col(cols="6")
      div.border-lg.border-green.rounded-lg.ma-auto.point-card(style="height: 100px")
        h1.text-green.text-center.point-number__text {{ form.passedCount }}
        span.text-green.font-weight-bold.point-number-unit__text {{ $t('pages.users.point.post_count_unit') }}
</template>

<script setup lang="ts">
const lineId = useState('lineId', () => '')

const {
  listeners,
  getListener,
} = useDatabase()

const dialog = ref({
  createUser: false
})
const form = ref({
  postCount: 0,
  passedCount: 0,
  points: 0
})

onMounted(async () => {
  if(!lineId.value) return navigateTo('/')

  await getListener(lineId.value)
  form.value.postCount = listeners.value.postCount
  form.value.passedCount = listeners.value.passedCount
  form.value.points = listeners.value.points
})
</script>

<style scoped lang="sass">
.point-number__text
  font-size: 60px

.point-number-unit__text
  font-size: 20px
  position: absolute
  top: 67%
  right: 8%

.point-card
  position: relative
</style>