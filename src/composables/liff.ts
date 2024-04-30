import liff from '@line/liff'

export const useLiff = async() => {
  try {
    const env = useAppConfig()
    const liffId = env.liffId
    console.log(liffId)

    // LIFFの初期化
    await liff.init({ liffId: liffId })

    // 認証情報の取得
    const userInfo = liff.getProfile()
    console.log(userInfo)
  } catch (e) {
    console.error(e)
  }
}
