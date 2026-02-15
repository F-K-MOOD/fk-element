import type { VNode } from 'vue'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  modelValue: string
  options: SelectOption[]
  filterable?: boolean
  customFilter?: CustomFilterFunction
  remoteLoad?: boolean
  placeholder: string
  disabled: boolean
  clearable?: boolean
  renderLabel?: RenderLabelFunction
  remoteLoadFunction?: RemoteLoadFunction
}

export interface SelectEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'visible-change', value: boolean): void
  (e: 'clear'): void
}

export interface SelectState {
  inputValue: string
  selectedOption: SelectOption | null
  mouseHover: boolean
  loading: boolean
  highlightIndex: number
}

export type RenderLabelFunction = (option: SelectOption) => VNode
export type CustomFilterFunction = (query: string) => SelectOption[]
export type RemoteLoadFunction = (query: string) => Promise<SelectOption[]>