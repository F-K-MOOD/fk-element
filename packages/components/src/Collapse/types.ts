import type { InjectionKey, Ref } from 'vue'

export type nameType = string | number

export interface CollapseProps {
  modelValue?: nameType[] | nameType
  accordion?: boolean
}

export interface CollapseContext {
  activeNames: Ref<nameType[]>
  handleItemClick: (name: nameType) => void
}

export interface CollapseEmits {
  (e: 'update:modelValue', value: nameType[] | nameType | ''): void
  (e: 'change', value: nameType[] | nameType | ''): void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')

export interface CollapseItemProps {
  name: nameType
  title?: string
  disabled?: boolean
}

