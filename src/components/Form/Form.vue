<script setup lang="ts">
import type  { ValidateFieldsError, } from 'async-validator'
import { provide } from 'vue'

import type { FormInstance,FormItemContext,FormProps } from './types'
import { formContextKey } from './types'
import type { FormValidateFailure } from './types.ts'

defineOptions({
  name: 'FKForm',
})

// 定义props
const props = defineProps<FormProps>()

// 定义验证方法
const fields: FormItemContext[] = []
const addField = (field: FormItemContext) => {
  fields.push(field)
} 
const removeField = (field: FormItemContext) => {
  if(field.prop) {
    fields.splice(fields.indexOf(field), 1)
  }
}
const validate = async () => {
  let validateFieldsError: ValidateFieldsError = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (e:any) {
      const error = e as FormValidateFailure
      validateFieldsError = {
        ...validateFieldsError,
        ...error.fields,
      }
    }
  }
  if(Object.keys(validateFieldsError).length === 0) {
    return true
  } else {
    return Promise.reject(validateFieldsError)
  }
}

// 定义重置方法
const resetFields = (keys: string[] = []) => {
  // 过滤出需要重置的字段, 如果keys为空, 则重置所有字段
  const filterFields = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterFields.forEach(field => field.resetField())
}

// 定义清除校验状态方法
const clearValidateStatus = (keys: string[] = []) => {
  // 过滤出需要重置的字段, 如果keys为空, 则重置所有字段
  const filterFields = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterFields.forEach(field => field.clearValidateStatus())
}

provide(formContextKey, {
  model: props.model,
  rules: props.rules,
  addField,
  removeField,
})

// 定义expose
defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidateStatus,
})
</script>

<template>
  <form class="fk-form">
    <slot></slot>
  </form>
</template>

