<script lang="ts" setup>
defineOptions({
  name: 'FKDropdown',
})
import { ref } from 'vue';

import RenderVnode from '../Common/RenderVnode.ts'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { DropdownEmits, DropdownInstance, DropdownProps, MenuOption } from './types'

const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterSelect: true
})

const emits = defineEmits<DropdownEmits>()

const tooltipRef = ref<DropdownInstance>()

const handleVisibleChange = (visible: boolean) => {
  emits('visible-change', visible)
}

const itemClick = (item: MenuOption) => {
  if (!item.disabled) {
    emits('select', item)
    if (props.hideAfterSelect) {
      tooltipRef.value?.hide()
    }
  }
}

defineExpose({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide(),
})
</script>

<template>
  <div class="fk-dropdown">
    <Tooltip 
      ref="tooltipRef" :trigger="props.trigger" :placement="props.placement"
      :popper-options="props.popperOptions" :open-delay="props.openDelay" :close-delay="props.closeDelay"
      @visible-change="handleVisibleChange"
    >
      <slot></slot>
      <template #content>
        <ul class="fk-dropdown__menu">
          <template v-for="item in props.menuOptions" :key="item.key">
            <li v-if="item.divided" class="divided-placeholder" role="separator">
              {{ item.label }}
            </li>
            <li 
              :id="`dropdown-item-${item.key}`" 
              class="fk-dropdown__item" 
              :class="{
                'is-disabled': item.disabled,
                'is-divided': item.divided
              }" @click="() => itemClick(item)"
            >
              <RenderVnode :v-node="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
