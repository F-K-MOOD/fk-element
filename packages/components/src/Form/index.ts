import './style.css'

import type {App} from 'vue'

import FormComponent from './Form.vue'
import FormItemComponent from './FormItem.vue'

const Form = FormComponent as any
Form.name = 'FKForm'

const FormItem = FormItemComponent as any  
FormItem.name = 'FKFormItem'

Form.install = (app: App) => {
  app.component(Form.name, Form)
}
FormItem.install = (app: App) => {
  app.component(FormItem.name, FormItem)
}
export default Form
export {
  FormItem,
}
export * from './types'
