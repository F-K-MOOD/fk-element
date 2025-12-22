import type {App} from 'vue'

import DropdownComponent from './Dropdown.vue'

const Dropdown = DropdownComponent as any
Dropdown.name = 'FKDropdown'

Dropdown.install = (app: App) => {
  app.component(Dropdown.name, Dropdown)
}
export default Dropdown
export * from './types'
