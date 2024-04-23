<template lang="pug">
v-app
  v-main.bg-grey-lighten-5
    v-container.h-100
      v-row.ma-0(justify="center")
        v-col.app-col
          slot

  v-bottom-navigation(
    grow
    inverted-scroll
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
const lineId = useState('lineId', () => '')
const i18n = useI18n()
const footerMenus = [
  { title: i18n.t('layout.footer.menus.home'), value: 'home', to: `/users/${lineId}`, icon: 'mdi-home-circle-outline' },
  { title: i18n.t('layout.footer.menus.point'), value: 'point', to: `/users/${lineId}/point`, icon: 'mdi-file-powerpoint-box-outline' },
  { title: i18n.t('layout.footer.menus.settings'), value: 'settings', to: `/users/${lineId}/settings`, icon: 'mdi-cog-outline' },
]
</script>

<style scoped lang="sass">
.app-col
  max-width: 600px
  padding-left: 0
  padding-right: 0
</style>