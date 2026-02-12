import './style.css'

import type {App} from 'vue'

import TooltipComponent from './Tooltip.vue'

const Tooltip = TooltipComponent as any
Tooltip.name = 'FKTooltip'

Tooltip.install = (app: App) => {
  app.component(Tooltip.name, Tooltip)
}

declare module 'vue' {
  export interface GlobalComponents {
    FKTooltip: typeof TooltipComponent
  }
}

export default Tooltip
export * from './types'
  