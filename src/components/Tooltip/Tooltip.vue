<script setup lang="ts">
defineOptions({
  name: 'FKTooltip',
})
// 1. 导入模块和类型定义
import type { Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import { debounce } from 'lodash-es'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'

// 导入点击外部关闭 Popper 的钩子
import { useClickOutside } from '@/hooks/useClickOutside'

import type { TooltipEmits, TooltipProps } from './types'

// 2. 定义组件的 Props 和 Emits
const props = withDefaults(defineProps<TooltipProps>(), {
  trigger: 'hover',
  placement: 'bottom',
  content: '', // 添加内容属性
  manual: false,
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
})
const emits = defineEmits<TooltipEmits>()

// 3. 定义响应式状态
const isOpen = ref(false)
const popperInstance = ref<Instance | null>(null)
const popperOptions = computed(() => ({
  placement: props.placement,
  ...props.popperOptions,
}))
const events: Record<string, () => void> = reactive({
  mouseenter: () => { },
  click: () => { },
})
const outerEvents: Record<string, () => void> = reactive({
  // 预先定义Vue事件名称
  mouseleave: () => { },
})

// 4. 定义 DOM 引用
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()

// 5. 定义交互方法
const openPopper = () => {
  isOpen.value = true
  emits('visible-change', true)
}
const closePopper = () => {
  isOpen.value = false
  emits('visible-change', false)
}
const openPopperDebounced = debounce(openPopper, props.openDelay)
const closePopperDebounced = debounce(closePopper, props.closeDelay)
const openPopperDebouncedFinal = () => {
  closePopperDebounced.cancel()
  openPopperDebounced()
}
const closePopperDebouncedFinal = () => {
  openPopperDebounced.cancel()
  closePopperDebounced()
}
const togglePopper = () => {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}
const hoverEnter = () => {
  isOpen.value = true
  emits('visible-change', isOpen.value)
}
const hoverLeave = () => {
  isOpen.value = false
  emits('visible-change', isOpen.value)
}
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events.mouseenter = hoverEnter
    outerEvents.mouseleave = hoverLeave
  } else if (props.trigger === 'click') {
    events.click = togglePopper
  }
}
useClickOutside(tooltipRef, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closePopperDebounced()
  }
})

// 6. 监听状态变化，管理 Popper 实例
watch(isOpen, (newVal) => {
  if (newVal) {
    // 确保 DOM 节点已经存在
    if (!triggerNode.value || !popperNode.value) {
      return
    }
    // 创建 Popper 实例
    popperInstance.value = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
  } else {
    // 销毁 Popper 实例
    popperInstance.value?.destroy()
  }
}, { flush: 'post' })
watch(() => props.manual, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if (newVal) {
      // 清除旧事件
      events.mouseenter = () => { }
      events.click = () => { }
      outerEvents.mouseleave = () => { }
    } else {
      attachEvents()
    }
  }
})
watch(() => props.trigger, (newVal, oldVal) => {
  if (newVal !== oldVal && !props.manual) {
    // 清除旧事件
    events.mouseenter = () => { }
    events.click = () => { }
    outerEvents.mouseleave = () => { }
    attachEvents()
  }
})

onMounted(() => {
  if (props.manual) {
    return
  }
  attachEvents()
})
onUnmounted(() => {
  // 清除旧事件
  events.mouseenter = () => { }
  events.click = () => { }
  outerEvents.mouseleave = () => { }
  // 销毁 Popper 实例
  popperInstance.value?.destroy()
})
defineExpose({
  show: openPopperDebouncedFinal,
  hide: closePopperDebouncedFinal,
})
</script>

<template>
  <div ref="tooltipRef" class="fk-tooltip" v-on="outerEvents">
    <!-- 触发元素 -->
    <div ref="triggerNode" class="fk-tooltip__trigger" v-on="events">
      <slot></slot>
    </div>
    <!-- 提示框内容 -->
    <transition :name="transition">
      <div v-if="isOpen" ref="popperNode" class="fk-tooltip__popper">
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </transition>
  </div>
</template>
