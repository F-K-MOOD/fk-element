import './style.css'

import type { App } from 'vue'

import MessageComponent from './Message.vue'
import { createMessage } from './method'
import type { createMessageProps } from './types'

const Message = MessageComponent as any
Message.name = 'FKMessage'

Message.install = (app: App) => {
  app.component(Message.name, Message)
}

// 添加静态方法
Message.success = (options: createMessageProps | string) => {
  return createMessage(typeof options === 'string' ? { message: options, type: 'success' } : { ...options, type: 'success' })
}

Message.warning = (options: createMessageProps | string) => {
  return createMessage(typeof options === 'string' ? { message: options, type: 'warning' } : { ...options, type: 'warning' })
}

Message.info = (options: createMessageProps | string) => {
  return createMessage(typeof options === 'string' ? { message: options, type: 'info' } : { ...options, type: 'info' })
}

Message.error = (options: createMessageProps | string) => {
  return createMessage(typeof options === 'string' ? { message: options, type: 'danger' } : { ...options, type: 'danger' })
}

Message.closeAll = () => {
  // 实现关闭所有消息的逻辑
}

export default Message
export {
  createMessage,
}
export * from './types'