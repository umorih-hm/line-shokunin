<template lang="pug">
v-app
  v-app-bar.border-b-lg.border-red(elevation="0")
    v-app-bar-title.text-center.text-red.font-weight-bold.header-title(:text="$t('layout.header.title')")

  v-main.bg-grey-lighten-5
    v-container.h-100
      v-row.ma-0(justify="center")
        v-col.app-col
          slot

  v-bottom-navigation(
    grow
    inverted-scroll
    bg-color="red"
    data-test-id="footer"
  )
    v-btn(
      v-for="menu in footerMenus"
      :key="menu.to"
      :to="menu.to"
      exact
    )
      v-icon(v-if="menu.icon" size="24" ) {{ menu.icon }}
      span {{ menu.title }}
</template>

<script setup lang="ts">
const lineId = useState('lineId', () => '') // line のユーザーID
const userId = useState('userId', () => '')
const i18n = useI18n()
const footerMenus = [
  { title: i18n.t('layout.footer.menus.home'), value: 'home', to: `/users/${userId.value}`, icon: 'mdi-home-circle-outline' },
  { title: i18n.t('layout.footer.menus.point'), value: 'point', to: `/users/${userId.value}/point`, icon: 'mdi-file-powerpoint-box-outline' },
  { title: i18n.t('layout.footer.menus.user'), value: 'user', to: `/users/${userId.value}/user`, icon: 'mdi-account-outline' },
]

onMounted(async () => {
  if(!userId.value || !lineId.value) return navigateTo('/')
})
</script>

<style scoped lang="sass">
.header-title
  font-size: 28px
.app-col
  max-width: 600px
  padding-left: 0
  padding-right: 0
</style>