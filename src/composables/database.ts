const listeners = ref()
const otayoris = ref()
const mailTheme = ref()

/**
 * メールテーマを配列に整形
 */
export const formatMailTheme = (contents: any) => {
  const items = []
  contents.forEach((content) => items.push({
    value: content.id,
    title: content.properties.MailTheme.title[0].text.content,
    image: content.properties.Image.files || '',
    navigation: content.properties.Navigation.rich_text[0].text.content || ''
  }))
  return items
}

/**
 * リスナー情報を整形
 */
export const formatListener = (content: any) => {
  console.log(content)
  return {
    id: content.id,
    lineId: content.properties.LineId.rich_text[0].text.content,
    postCount: content.properties.PostCount.rollup.number,
    passedCount: content.properties.PassedCount.rollup.number,
    points: content.properties.Points.formula.number,
    radioName: content.properties.RadioName.title[0].text.content,
    age: content.properties.Age.number,
    gender: content.properties.Gender.select.name
  }
}

export const useDatabase = () => {
  const env = useAppConfig()
  const databaseIdListener = env.databaseIdListener
  const databaseIdOtayori = env.databaseIdOtayori
  const databaseIdMailTheme = env.databaseIdMailTheme

  // 「リスナー」情報取得
  const getListener = async(lineId: string) => {
    const content = await $fetch('/api/getDatabase', {
      method: 'POST',
      body: {
        database_id: databaseIdListener,
        filter: {
          property: 'LineId',
          rich_text: {
            equals: lineId
          }
        }
      }
    })

    content.results.length ? listeners.value = formatListener(content.results[0]) : listeners.value = ''
  }

  // 「お便り」情報取得
  const getOtayori = async() => {
    otayoris.value = await $fetch('/api/getDatabase', {
      method: 'POST',
      body: {
        database_id: databaseIdOtayori,
      }
    })
  }

  // 「メールテーマ」情報取得
  const getMailTheme = async() => {
    const contents = await $fetch('/api/getDatabase', {
      method: 'POST',
      body: {
        database_id: databaseIdMailTheme,
        filter: {
          property: 'isRecruting',
          checkbox: {
            equals: true
          }
        }
      }
    })
    mailTheme.value = formatMailTheme(contents.results)
  }

  // 「お便り」追加
  const createOtayori = async(values: OtayoriRequest) => {
    await $fetch('/api/createPage', {
      method: 'POST',
      body: {
        parent: {
          database_id: databaseIdOtayori
        },
        properties: {
          Title: {
            title: [
              {
                text: {
                  content: values.title
                }
              }
            ]
          },
          UserId: {
            relation: [
              {
                id: values.userId
              }
            ]
          },
          MailTheme: {
            relation: [
              {
                id: values.theme
              }
            ]
          }
        },
        children: values.children,
      }
    })
  }

  // 「リスナー」追加
  const createUser = async(values: UserRequest) => {
    const result = await $fetch('/api/createPage', {
      method: 'POST',
      body: {
        parent: {
          database_id: databaseIdListener
        },
        properties: {
          RadioName: {
            title: [
              {
                text: {
                  content: values.radioName
                }
              }
            ]
          },
          Gender: {
            select: {
              name: values.gender
            }
          },
          Age: {
            number: values.age
          },
          LineId: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: values.lineId,
                  link: null
                },
              }
            ]
          }
        },
      }
    })

    return result.id
  }

  // 「リスナー」更新
  const updateUser = async(values: UserRequest, pageId: string) => {
    const result = await $fetch('/api/updatePage', {
      method: 'POST',
      body: {
        page_id: pageId,
        properties: {
          RadioName: {
            title: [
              {
                text: {
                  content: values.radioName
                }
              }
            ]
          },
          Gender: {
            select: {
              name: values.gender
            }
          },
          Age: {
            number: values.age
          }
        },
      }
    })

    return result.id
  }

  return {
    listeners,
    otayoris,
    mailTheme,
    getListener,
    getOtayori,
    getMailTheme,
    createOtayori,
    createUser,
    updateUser
  }
}