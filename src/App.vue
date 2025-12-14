<script setup lang="ts">
import { ref } from 'vue'

import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import type { nameType } from './components/Collapse/types'
import Tooltip from './components/Tooltip/Tooltip.vue';
const activeNames = ref<nameType[]>(['aaaa'])
const trigger = ref<'hover' | 'click'>('hover')

setTimeout(() => {
  activeNames.value = ['bbbb', 'cccc']
  trigger.value = 'click'
}, 2000)

</script>

<template>
  <div>
    <Button size="large" loading type="danger">
      主要按钮
    </Button>
    <Button size="large" icon="fa-regular fa-user" type="danger">
      主要按钮
    </Button>
    <Button size="large" type="danger">
      主要按钮
    </Button>
    <Collapse v-model:modelValue="activeNames">
      <CollapseItem name="aaaa" title="标题1">
        内容1
      </CollapseItem>
      <CollapseItem name="bbbb" title="标题2">
        内容2
      </CollapseItem>
      <CollapseItem name="cccc">
        <template #title>
          <span>自定义标题</span>
        </template>
        内容3
      </CollapseItem>
    </Collapse>
  </div>
  {{ activeNames }}
  <Tooltip content="这是一个提示框" :trigger="trigger" :openDelay="1000" :closeDelay="1000">
    鼠标悬停我
  </Tooltip>
</template>

<style scoped>
.fk-button-primary {
  background-color: var(--main-bg-color);
}
</style>
