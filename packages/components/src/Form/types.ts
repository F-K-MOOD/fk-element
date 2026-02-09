import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
import type { InjectionKey } from 'vue'

export type FormRules = Record<string, FormItemRules[]>

// from属性
export interface FormProps {
  model: Record<string, any>
  rules: FormRules
}

// 对外暴露
export interface FormInstance {
  validate: () => Promise<any>
  resetFields: (keys?: string[]) => void
  clearValidateStatus: (key?: string[]) => void
}

// provide的类型
export interface FormContext {
  model: Record<string, any>
  rules: FormRules
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
}
export const formContextKey: InjectionKey<FormContext> = Symbol('formContext')

// form-item属性
export interface FormItemProps {
  label: string
  prop?: string
}

export interface ValidateStatus {
  loading: boolean
  state: 'init' | 'success' | 'error'
  errorMessages: string
}

export interface FormItemInstance {
  validate: (trigger?: string) => Promise<any>
  resetField: () => void
  clearValidateStatus: () => void
  validateStatus: ValidateStatus
}

// form-item provide类型
export interface FormItemContext {
  validate: (trigger?: string) => Promise<any>
  prop: string
  resetField: () => void
  clearValidateStatus: () => void
}
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContext')

export interface FormItemRules extends RuleItem {
  trigger?: string
}

export interface FormValidateFailure {
  errors: ValidateError[] 
  fields: ValidateFieldsError
}