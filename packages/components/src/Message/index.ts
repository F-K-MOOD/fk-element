import type { App } from 'vue'

import MessageComponent from './Message.vue'
import {createMessage } from './method'

const Message = MessageComponent as any
Message.name = 'FKMessage'

Message.install = (app: App) => {
  app.component(Message.name, Message)
}

export default Message  
export {
  createMessage,
}
export * from './types'