import type { App } from 'vue'

import CollapseComponent from './Collapse.vue'
import CollapseItemComponent from './CollapseItem.vue'

const Collapse = CollapseComponent as any
CollapseComponent.name = 'FKCollapse'

const CollapseItem = CollapseItemComponent as any
CollapseItem.name = 'FKCollapseItem'

Collapse.install = (app: App) => {
  app.component(Collapse.name, Collapse)  
}
CollapseItem.install = (app: App) => {
  app.component(CollapseItem.name, CollapseItem)
}

export default Collapse
export { CollapseItem }
export * from './types'
