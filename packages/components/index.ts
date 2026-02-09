import './styles/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(far, fas)

import type { App } from 'vue'

import Button from './src/Button'
import Collapse from './src/Collapse'
import { CollapseItem } from './src/Collapse'
import Dropdown from './src/Dropdown'
import Form from './src/Form'
import FormItem from './src/Form/FormItem.vue'
import Icon from './src/Icon'
import Input from './src/Input'
import Message from './src/Message'
import Tooltip from './src/Tooltip'



const components = [
  Message,
  Tooltip,
  Dropdown,
  Form,
  FormItem,
  Input,
  Icon,
  Button,
  Collapse,
  CollapseItem
]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export {
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Input,
  install,
  Message,
  Tooltip
}

export default install


