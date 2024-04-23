<template lang="pug">
// 初期化ローディング
v-container.fit-display(fluid)
  v-card.d-flex.justify-center.align-center(
    color="#00000000"
    height="90vh"
    variant="flat"
  )
    v-progress-circular(
      color="primary"
      size="60"
      indeterminate
    )

</template>

<script setup lang="ts"></script>

<style scoped lang="sass"></style>