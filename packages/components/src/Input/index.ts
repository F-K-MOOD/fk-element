import './style.css'

import type {App} from 'vue'

import InputComponent from './Input.vue'

const Input = InputComponent as any
Input.name = 'FKInput' 

Input.install = (app: App) => {
  app.component(Input.name, Input)
}
export default Input  
export {
  InputComponent  
}
export * from './types'
