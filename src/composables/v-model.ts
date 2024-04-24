import { computed } from 'vue'

export const useVModel = <M, K extends keyof M & string>(key: K, props: M, emit: (e: any, value: any) => void) => computed({
  get: () => props[key],
  set: updateValue => emit(`update:${key}`, updateValue),
})
