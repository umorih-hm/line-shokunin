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
const userId = useState('userId', () => '')
const i18n = useI18n()
const footerMenus = [
  { title: i18n.t('layout.footer.menus.home'), value: 'home', to: `/users/${userId.value}`, icon: 'mdi-home-circle-outline' },
  { title: i18n.t('layout.footer.menus.point'), value: 'point', to: `/users/${userId.value}/point`, icon: 'mdi-file-powerpoint-box-outline' },
  { title: i18n.t('layout.footer.menus.settings'), value: 'settings', to: `/users/${userId.value}/settings`, icon: 'mdi-cog-outline' },
]
console.log(userId.value, 'default')
</script>

<style scoped lang="sass">
.header-title
  font-size: 28px
.app-col
  max-width: 600px
  padding-left: 0
  padding-right: 0
</style>