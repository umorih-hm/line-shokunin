import { Client } from "@notionhq/client"

export const useNotion = () => {
  const env = useAppConfig()
  return new Client({
    auth: env.notionToken,
  })
}
