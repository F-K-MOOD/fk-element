<script setup lang="ts">
import Schema from 'async-validator'
import { isNil } from 'lodash-es'
import { computed, inject, onMounted,onUnmounted,provide,reactive } from 'vue'

import type {  FormItemContext ,FormItemInstance,FormItemProps,FormValidateFailure, ValidateStatus } from './types'
import { formContextKey } from './types'
import { formItemContextKey } from './types'

defineOptions({
  name: 'FKFormItem',
})

const props = defineProps<FormItemProps>()


// 定义校验状态, 包括状态, 错误信息, 加载状态
const validateStatus: ValidateStatus = reactive({
  loading: false,
  state: 'init',
  errorMessages: '',
})
// 定义inject, 从form中获取model和rules
const formContext = inject(formContextKey)
const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})
const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return null
  }
})
const getTriggeredRules = (trigger?: string) => {
  // 如果rule中不含有trigger, 意味着都会被触发, 如果有trigger, 那么这个规则中的trigger需要和传入的一致
  const rules = itemRules.value || []
  if(rules.length > 0)  {
    return rules.filter(rule => {
      if(!rule.trigger) return true
      return rule.trigger && rule.trigger === trigger
    }) 
  } else {
    return []
  }
}
// 定义校验方法
async function validate(trigger?: string) {
  const modelName = props.prop
  const triggeredRules = getTriggeredRules(trigger)
  if(triggeredRules.length === 0) {
    // 因为修改成了async, 所以这里返回的true, 也会被promise给包裹
    return true
  }
  if (modelName) {
    const validator = new Schema({
      modelName: triggeredRules,
    })
    validateStatus.loading = true
    return validator.validate({ modelName: innerValue.value })
      .then(() => {
        console.log('校验通过')
        validateStatus.state = 'success'
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e
        validateStatus.state = 'error'
        validateStatus.errorMessages = (errors && errors.length > 0) ? errors[0]!.message || '' : ''
        return Promise.reject(e)
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}

// 优化: 新增clear方法, 用于清空校验状态
let initialValue: any = null
const clearValidateStatus = () => {
  validateStatus.state = 'init'
  validateStatus.errorMessages = ''
  validateStatus.loading = false
}
const resetField = () => {
  clearValidateStatus()
  const model = formContext?.model
  if(model && props.prop && !isNil(initialValue)) {
    model[props.prop] = initialValue
  }
}

const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  resetField,
  clearValidateStatus,
}
provide(formItemContextKey, context)
onMounted(() => {
  initialValue = innerValue.value
  if(props.prop) {
    formContext?.addField(context)
  }
})
onUnmounted(() => {
  formContext?.removeField(context)
})

defineExpose<FormItemInstance>({
  validate,
  resetField,
  clearValidateStatus,
  validateStatus,
})
</script>

<template>
  <div 
    class="fk-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
    }"
  >
    <label class="fk-form-item__label">
      <!-- 作用域插槽 -->
      <slot name="label" :label="props.label">
        {{ props.label }}
      </slot>
    </label>
    <div class="fk-form-item__content">
      <!-- 默认插槽 -->
      <slot :validate="validate"></slot>
      <div v-if="validateStatus.state === 'error'" class="fk-form-item__error_msg">
        {{ validateStatus.errorMessages }}
      </div>
    </div>
  </div>
</template>
