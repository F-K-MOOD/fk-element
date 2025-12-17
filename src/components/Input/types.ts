export interface InputProps {
  type?: string
  size?: 'large' | 'small'
  modelValue?: string
  clearable?: boolean
  enablePasswordToggle?: boolean
  disabled?: boolean
  placeholder?: string
  readonly?: boolean
  autoComplete?: string
  form?: string
}

export interface InputEmits {
  // input的change事件，当输入框的值发生变化, 且失去焦点时触发。
  (e: 'change', value: string): void
  // input事件，当输入框的值发生变化时触发。
  (e: 'input', value: string): void
  (e: 'clear'): void
  (e: 'focus',value:FocusEvent): void
  (e: 'blur',value:FocusEvent): void
  (e: 'update:modelValue', value: string): void
}

export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement;
}