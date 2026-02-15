import './style.css'

import type {App} from 'vue'

import SelectComponent from './Select.vue'

const Select = SelectComponent as any
Select.name = 'FKSelect' 

Select.install = (app: App) => {
  app.component(Select.name, Select)
}

declare module 'vue' {
  export interface GlobalComponents {
    FKSelect: typeof SelectComponent
  }
}

export default Select  
export {
  Select
}
export * from './types'
