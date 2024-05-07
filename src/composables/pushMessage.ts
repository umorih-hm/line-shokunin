import * as line from '@line/bot-sdk';
import { TextMessage } from '@line/bot-sdk';
import { convertToFlexMessage } from 'markdown-flex-message'

export const useLineClient = () => {
  const env = useAppConfig()
  const channelAccessToken = env.channelAccessToken

  const config = {
    channelAccessToken: channelAccessToken,
  }
  return new line.messagingApi.MessagingApiClient(config)
}

export const usePushMessage = () => {
  /**
   * テキストメッセージの生成
   */
  const createTextMessage = (text: string) => {
    const message: TextMessage = {
      type: 'text',
      text: text,
    }
    return message
  }

  /**
   * markdown テキストを Flex message にして返す
   */
  const createFlexMessage = async(theme: string, title: string, mdText: string) => {
    const primaryText = `■テーマ\n${theme}\n\n■件名\n${title}\n\n■本文\n`
    return await convertToFlexMessage(primaryText + mdText)
  }

  /**
   * プッシュメッセージ送信処理
   */
  const pushMessages = async(userId: string, messages: any) => {
    await $fetch('/api/pushMessage', {
      method: 'POST',
      body: {
        to: userId,
        messages: messages
      }
    })
  }

  return {
    createTextMessage,
    createFlexMessage,
    pushMessages
  }
}