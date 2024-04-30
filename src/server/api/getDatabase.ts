import { useNotion } from '@/composables/notion'

export default defineEventHandler(async (event) => {
  const notion = useNotion()
  const params = await readBody(event);
  const getDatabaseContents = await notion.databases.query(params);

  return getDatabaseContents;
})