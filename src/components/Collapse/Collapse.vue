<script lang="ts">
  export default {
    name: 'FKCollapse',
  }
</script>
<script setup lang="ts">
import { provide,ref,watch } from 'vue'

import type { CollapseEmits,CollapseProps, nameType } from './types'
import { collapseContextKey } from './types'


const collapseProps = defineProps<CollapseProps>()
const collapseEmits = defineEmits<CollapseEmits>()
const activeNames = ref(collapseProps.modelValue || [])

watch(() => collapseProps.modelValue, (newVal) => {
  activeNames.value = newVal || []
})

if(collapseProps.accordion) {
  if(activeNames.value.length > 0) {
    console.log('accordion模式下，只能展开一个项')
  }
}

const handleItemClick = (name: nameType) => {
  if(collapseProps.accordion && activeNames.value.length > 0) {
   if(activeNames.value[0] === name) {
    activeNames.value = []
   } else {
    activeNames.value = [name]
   }
  }
  else if (activeNames.value.includes(name)) {
    activeNames.value = activeNames.value.filter((item) => item !== name)
  } else {
    activeNames.value.push(name)
  }
  collapseEmits('update:modelValue', activeNames.value)
  collapseEmits('change', activeNames.value)
}


provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>

<template>
  <div class="fk-collapse">
    <slot></slot>
  </div>
</template>

