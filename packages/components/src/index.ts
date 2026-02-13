// 导入基础样式（变量 & reset）
import '../styles/index.css'

// 导入 FontAwesome 图标库
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

// 注册 FontAwesome 图标
library.add(fas, far)

// 导入所有组件样式
import './Button/style.css'
import './Icon/style.css'
import './Input/style.css'
import './Form/style.css'
import './Message/style.css'
import './Tooltip/style.css'
import './Dropdown/style.css'
import './Collapse/style.css'
import './Switch/style.css'

import type { App } from 'vue'

import Button from './Button'
import Collapse, { CollapseItem } from './Collapse'
import Dropdown from './Dropdown'
import Form, { FormItem } from './Form'
import Icon from './Icon'
import Input from './Input'
import Message from './Message'
import Switch from './Switch'
import Tooltip from './Tooltip'

const components = [
  Button,
  Icon,
  Input,
  Form,
  FormItem,
  Message,
  Tooltip,
  Dropdown,
  Collapse,
  CollapseItem,
  Switch
]

const install = (app: App) => {
  components.forEach(component => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}

// 声明全局属性
declare global {
  interface Window {
    FKMessage: typeof Message
  }
}

// 将 Message 组件挂载到全局窗口对象上
if (typeof window !== 'undefined') {
  window.FKMessage = Message
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
  Message,
  Switch,
  Tooltip
}

export default {
  install
}
