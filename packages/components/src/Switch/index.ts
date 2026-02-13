import './style.css'

import type {App} from 'vue'

import SwitchComponent from './Switch.vue'

const Switch = SwitchComponent as any
Switch.name = 'FKSwitch' 

Switch.install = (app: App) => {
  app.component(Switch.name, Switch)
}

declare module 'vue' {
  export interface GlobalComponents {
    FKSwitch: typeof SwitchComponent
  }
}

export default Switch  
export {
  Switch  
}
export * from './types'
