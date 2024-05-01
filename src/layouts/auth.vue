<template lang="pug">
v-app
  v-app-bar.border-b-lg.border-red(elevation="0")
    v-app-bar-title.text-center.text-red.font-weight-bold.header-title(:text="$t('layout.header.title')")

  v-main.bg-grey-lighten-5
    v-container.h-100
      v-row.ma-0(justify="center")
        v-col.app-col
          slot
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">
.header-title
  font-size: 28px
.app-col
  max-width: 600px
  padding-left: 0
  padding-right: 0
</style>