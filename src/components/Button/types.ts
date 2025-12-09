export type ButtonType = 'primary' | 'danger' | 'success' | 'info' | 'warning'
export type ButtonSize = 'small' | 'large'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  nativeType?: NativeType
  plain?: boolean
  round?: boolean
  circle?: boolean
  autofocus?: boolean
  disabled?: boolean
}


export interface ButtonInstance {
  ref: HTMLButtonElement | null
}

// 考虑到原生button带的属性, disabled, autofocus, NativeType