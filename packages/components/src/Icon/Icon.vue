<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'
import { computed } from 'vue'

import type { FilterIconProps,IconProps  } from './types'

// $attrs可以拿到父组件传递的所有属性，但是默认是给到根元素的, 这里通过inheritAttrs: false, 来关闭默认行为
defineOptions({
  name: 'FKIcon',
  inheritAttrs: false,
})

const props = defineProps<IconProps>()
// 过滤掉type和color属性
const filteredProps = computed<FilterIconProps>(() => omit(props, ['type', 'color']))
// 自定义样式
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<template>
  <i 
    class="fk-icon"
    :class="{ [`fk-icon--${type}`]: type }"
    :style="customStyles" 
    v-bind="$attrs"
  >
    <FontAwesomeIcon v-bind="filteredProps" />
  </i>
</template>
