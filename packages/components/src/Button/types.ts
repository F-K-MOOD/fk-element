export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
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
  icon?: string
  loading?: boolean
}


export interface ButtonInstance {
  ref: HTMLButtonElement | null
}

// 考虑到原生button带的属性, disabled, autofocus, NativeType
// 按照目的可以得到属性: ButtonType: 'primary' | 'danger' | 'success' | 'info' | 'warning'
// 相应的还有与之对应的