const cache: Record<string, any> = {}

const config = {
  get: (key: string, defaultValue: any = '') => {
    if (cache[key]) return cache[key]

    // localStorage が空であればデフォルト値、存在すればその値を返す
    return JSON.parse(localStorage.getItem(`config.${key}`) ?? '""') === '' ? defaultValue : JSON.parse(localStorage.getItem(`config.${key}`) ?? '""')
  },

  set: (key: string, value: any) => {
    cache[key] = value
    localStorage.setItem(`config.${key}`, JSON.stringify(value ?? ''))
  },

  remove: (key: string) => {
    delete cache[key]
    localStorage.removeItem(`${key}`)
  },
}

export const useConfig = () => config
