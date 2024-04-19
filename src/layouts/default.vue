<template lang="pug">
v-app
  v-app-bar(color="primary")
    v-app-bar-title
  v-main()
    v-container.h-100(
      fluid
    )
      v-row(
        align="center"
        justify="center"
      )
        v-col.flex-grow-0
          slot
</template>

<script setup lang="ts">
</script>

<style scoped lang="sass">
</style>