import * as line from '@line/bot-sdk';

export default defineEventHandler(async (event) => {
  const config = {
    channelAccessToken: '4+Lokhp+WFEJzDBQpZX9UojkWYegbBUKnG8zBmmQy0X2ngMW/6R+e2lQMSlk6oyo28o4w//YcfxQJbvdmIlf/UKOENVYq0dUNDtGNq4uxIDDgRx1fytl1cqMByoo00DdgV+aIGT0eW5BbeIDC21kJQdB04t89/1O/w1cDnyilFU=',
  }
  const client = new line.messagingApi.MessagingApiClient(config)
  const params = await readBody(event)
  await client.pushMessage(params)
})