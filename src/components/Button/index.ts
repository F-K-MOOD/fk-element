import type { App } from 'vue'

import ButtonComponent from './Button.vue'

// 显式设置name属性，确保TypeScript可以识别
const Button = ButtonComponent as any
Button.name = 'FKButton'

Button.install = (app: App) => {
  app.component('FKButton', Button)
}

export default Button
export * from './types'
