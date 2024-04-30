import liff from '@line/liff'

export const useLiff = async() => {
  try {
    const env = useAppConfig()
    const liffId = env.liffId

    // LIFFの初期化
    await liff.init({ liffId: liffId })

    // 認証情報の取得
    const profile = await liff.getProfile()
    console.log(profile)
  } catch (e) {
    console.error(e)
  }
}
