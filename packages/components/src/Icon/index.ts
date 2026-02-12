import type {App} from 'vue'

import IconComponent from './Icon.vue'

const Icon = IconComponent as any
Icon.name = 'FKIcon'

Icon.install = (app: App) => {
  app.component(Icon.name, Icon)
}
export default Icon
export * from './types'
