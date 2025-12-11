<script lang="ts">
export default {
  name: 'FKCollapseItem',
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'

import type { CollapseItemProps } from './types'
import { collapseContextKey } from './types'

const props = defineProps<CollapseItemProps>()

const collapseContext = inject(collapseContextKey)

const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})

const handleClick = () => {
  if (!props.disabled) {
    collapseContext?.handleItemClick(props.name)
  }
}

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  'before-enter': (el) => {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  'enter': (el) => {
    el.style.height = `${el.scrollHeight}px`
  },
  'after-enter': (el) => {
    el.style.height = ''
    el.style.overflow = ''
  },
  'before-leave': (el) => {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  'leave': (el) => {
    el.style.height = '0px'
  },
  'after-leave': (el) => {
    el.style.height = ''
    el.style.overflow = ''
  },
}
</script>

<template>
  <div 
    class="fk-collapse-item" 
    :class="
      {
        'is-disabled': props.disabled,
        'is-active': isActive
      }"
  >
    <div :id="`item-header-${props.name}`" class="fk-collapse-item__header" @click="handleClick">
      <slot name="title">
        {{ props.title }}
      </slot>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div v-show="isActive" class="fk-collapse-item__content-wrapper">
        <div :id="`item-content-${props.name}`" class="fk-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>