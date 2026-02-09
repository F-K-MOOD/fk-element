<script setup lang="ts">
import { ref } from 'vue';

import Icon from '../Icon/Icon.vue'
import type { ButtonProps } from './types'
defineOptions({
  name: 'FKButton',
})

withDefaults(defineProps<ButtonProps>(), {
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
      [`fk-button--${type}`]: type,
      [`fk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }" 
    :disabled="disabled || loading" 
    :autofocus="autofocus" 
    :type="nativeType"
  >
    <Icon v-if="loading" icon="fa-solid fa-spinner" spin />
    <Icon v-if="icon" :icon="icon" />
    <slot></slot>
  </button>
</template>



