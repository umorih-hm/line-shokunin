import liff from '@line/liff'

export default defineNuxtPlugin(async () => {
  try {
    const liffId = process.env.LIFF_ID as string

    // LIFFの初期化
    await liff.init({ liffId: liffId })

    // 認証情報の取得
    const userInfo = liff.getProfile()
    console.log(userInfo)
  } catch (e) {
    console.error(e)
  }
})
