import { markdownToBlocks } from '@tryfabric/martian'

export const useMdToNotion = (mdContent: string) => markdownToBlocks(mdContent)