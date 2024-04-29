const listeners = ref()
const otayoris = ref()

export const useDatabase = () => {
  const notion = useNotion()
  
  const env = useAppConfig()
  const databaseIdListener = env.databaseIdListener
  const databaseIdOtayori = env.databaseIdOtayori

  // 「リスナー」情報取得
  const getListeners = async() => {
    listeners.value = await notion.databases.query({
      database_id: databaseIdListener,
      // filter: {
      //   property: "Landmark",
      //   rich_text: {
      //     contains: "Bridge",
      //   },
      // },
    })
  }

  // 「お便り」情報取得
  const getOtayori = async() => {
    otayoris.value = await $databaseApi.retrieve(databaseIdOtayori)
  }

  return {
    listeners,
    otayoris,
    getListeners,
    getOtayori
  }
}