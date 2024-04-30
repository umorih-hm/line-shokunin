const listeners = ref()
const otayoris = ref()
const mailTheme = ref()

/**
 * メールテーマを配列に整形
 */
export const formatMailTheme = (contents: any) => {
  const items = []
  contents.forEach((content) => {
    items.push(content.properties.MailTheme.title[0].text.content)
  })

  return items
}

export const useDatabase = () => {
  const env = useAppConfig()
  const databaseIdListener = env.databaseIdListener
  const databaseIdOtayori = env.databaseIdOtayori
  const databaseIdMailTheme = env.databaseIdMailTheme

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

  // 「メールテーマ」情報取得
  const getMailTheme = async() => {
    const contents = await $fetch('/api/getDatabase', {
      method: 'POST',
      body: {
        database_id: databaseIdMailTheme,
      }
    })
    mailTheme.value = formatMailTheme(contents.results)
    console.log(mailTheme.value)
  }

  return {
    listeners,
    otayoris,
    mailTheme,
    getListeners,
    getOtayori,
    getMailTheme
  }
}