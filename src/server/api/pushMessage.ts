import { useLineClient } from '@/composables/pushMessage'

export default defineEventHandler(async (event) => {
  const client = useLineClient()
  const params = await readBody(event)
  await client.pushMessage(params)
})