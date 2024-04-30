export default defineNuxtPlugin(() => {
  if (useAppConfig().environment === 'development' || useAppConfig().environment === 'local') {
    import('vconsole').then(({ default: VConsole }) => {
      new VConsole()
    })
  }
})
