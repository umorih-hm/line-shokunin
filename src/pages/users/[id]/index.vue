<template lang="pug">
v-container
  v-row(justify="center")
    v-col
      v-btn.post-button__title(
        color="green"
        rounded="pill"
        height="100px"
      ) {{ $t('button.post') }}
  v-row
    p.text-center {{ $t('pages.users.index.post_list') }}
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">
.post-button__title
  font-size: 30px
</style>