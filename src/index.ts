import './styles/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(far, fas)

import type {App} from 'vue'

import Button from './components/Button'
import Dropdown from './components/Dropdown'
import Form from './components/Form'
import FormItem from './components/Form/FormItem.vue'
import Icon from './components/Icon'
import Input from './components/Input'
import Message from './components/Message'
import Tooltip from './components/Tooltip'

const components = [
  Message,
  Tooltip,
  Dropdown,
  Form,
  FormItem,
  Input,
  Icon,
  Button
]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export {
  Button,
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


