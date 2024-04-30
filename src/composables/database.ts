const listeners = ref()
const otayoris = ref()

export const useDatabase = () => {
  const env = useAppConfig()
  const databaseIdListener = env.databaseIdListener
  const databaseIdOtayori = env.databaseIdOtayori

  // 「リスナー」情報取得
  const getListeners = async() => {
    listeners.value = await $fetch('/api/getDatabase', {
      method: 'POST',
      body: {
        database_id: databaseIdListener,
      }
    })
    console.log(listeners.value)
  }

  // 「お便り」情報取得
  const getOtayori = async() => {
    otayoris.value = await $fetch('/api/getDatabase', {
      method: 'POST',
      body: {
        database_id: databaseIdOtayori,
      }
    })
    console.log(otayoris.value)
  }

  return {
    listeners,
    otayoris,
    getListeners,
    getOtayori
  }
}