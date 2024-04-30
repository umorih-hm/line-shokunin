import liff from '@line/liff'

export const useLiff = async() => {
  try {
    const env = useAppConfig()
    const liffId = env.liffId

    // LIFFの初期化
    await liff.init({ liffId: liffId })

    // ユーザープロファイルの取得
    const profile = await liff.getProfile()
    return profile
  } catch (e) {
    console.error(e)
  }
}
