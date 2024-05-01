<template lang="pug">
v-container
  // 獲得ポイント
  v-row.d-flex.flex-row.justify-center
    v-col.d-flex.flex-column(cols="6")
      h3.text-center.text-red {{ $t('pages.users.point.current_point') }}
      v-img(
        height="80px"
        src="/point_p.png"
      )
    v-col(cols="6")
      div.bg-red.rounded-lg.ma-auto(style="height: 100px")
        h1.text-center.point-number__text {{ form.points }}
        p.text-end.px-4.pt-0.point-number-unit__text {{ $t('pages.users.point.current_point_unit') }}

  // 投稿採用率
  v-row.d-flex.flex-row.justify-center
    v-col(cols="6")
      h3.text-center.text-green {{ $t('pages.users.point.pass_rate') }}
      v-img(
        height="80px"
        src="/point_mail.png"
      )
    v-col(cols="6")
      div.bg-green.rounded-lg.ma-auto(style="height: 100px")
        h1.text-center.point-number__text {{ form.passedRate * 100 }}
        h1.text-end.px-4.point-number-unit__text {{ $t('pages.users.point.pass_rate_unit') }}

  v-row.d-flex.justify-center
    v-img(
      height="240px"
      src="/point_person.png"
    )
</template>

<script setup lang="ts">
const route = useRoute()
const userId = route.params.id

const {
  listeners,
  getListener,
} = useDatabase()

const dialog = ref({
  createUser: false
})
const form = ref({
  points: 0,
  passedRate: 0
})


onMounted(async () => {
  await getListener(userId)
  form.value.points = listeners.value.points
  form.value.passedRate = listeners.value.passedRate
})
</script>

<style scoped lang="sass">
.point-number__text
  font-size: 60px

.point-number-unit__text
  font-size: 24px
</style>