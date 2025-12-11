<script lang="ts">
export default {
  name: 'FKButton',
}
</script>

<script setup lang="ts">
import { ref } from 'vue';

import type { ButtonProps } from './types'

const buttonProps = withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})

const _ref = ref<HTMLButtonElement | null>(null)

// 使用泛型为defineExpose指定暴露的类型
defineExpose({
  ref: _ref
})
</script>

<template>
  <button 
    ref="_ref" 
    class="fk-button" 
    :class="{
      [`fk-button--${buttonProps.type}`]: buttonProps.type,
      [`fk-button--${buttonProps.size}`]: buttonProps.size,
      'is-plain': buttonProps.plain,
      'is-round': buttonProps.round,
      'is-circle': buttonProps.circle,
      'is-disabled': buttonProps.disabled,
    }" 
    :disabled="buttonProps.disabled" 
    :autofocus="buttonProps.autofocus" 
    :type="buttonProps.nativeType"
  >
    <slot></slot>
  </button>
</template>



