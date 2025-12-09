<template>
  <button ref="_ref" class="fk-button" :class="{
    [`fk-button-${type}`]: type,
    [`fk-button-${size}`]: size,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled,
  }" :disabled="disabled" :autofocus="autofocus" :type="nativeType">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { ButtonProps } from './types'

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})

const _ref = ref<HTMLButtonElement | null>(null)

// 使用泛型为defineExpose指定暴露的类型
defineExpose<import('./types').ButtonInstance>({
  ref: _ref.value
})
</script>

<style scoped></style>