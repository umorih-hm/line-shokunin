<template lang="pug">
v-container
  // ラジオに投稿する
  v-row
    v-col.d-flex.flex-row.justify-center
      v-btn.post-button__title(
        color="green"
        rounded="pill"
        height="80px"
        :to="`/users/${lineId}/form`"
      ) {{ $t('button.post') }}
  // 過去の投稿一覧
  v-row
    v-col
      p.text-center {{ $t('pages.users.index.theme_list') }}
</template>

<script setup lang="ts">
const lineId = useState('lineId', () => '')
lineId.value = 1
</script>

<style scoped lang="sass">
.post-button__title
  font-size: 30px
</style>