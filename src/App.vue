<script setup lang="ts">
import { h, onMounted, ref } from 'vue'

import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import type { nameType } from './components/Collapse/types'
import Dropdown from './components/Dropdown/Dropdown.vue';
import Input from './components/Input/Input.vue';
const activeNames = ref<nameType[]>(['aaaa'])
const trigger = ref<'hover' | 'click'>('hover')

import { createMessage } from './components/Message/method'

const modelValue = ref('')

const vNode = [
  {
    label: h('button', {}, '按钮1'),
    key: 'aaaa',
    disabled: false,
    divided: false,
  },
  {
    label: h('button', {}, '按钮2'),
    key: 'bbbb',
    disabled: false,
    divided: false,
  },
  {
    label: h('button', {}, '按钮3'),
    key: 'cccc',
    disabled: false,
    divided: false,
  },
  {
    label: h('button', {}, '按钮4'),
    key: 'dddd',
    disabled: false,
    divided: false,
  },
]

onMounted(() => {
  createMessage({
    message: '0: 这是一条消息',
    type: 'info',
    duration: 0,
    showClose: true,
    offset: 30,
  })
  createMessage({
    message: '1:这是一条消息',
    type: 'info',
    duration: 0,
    showClose: true,
    offset: 20,
  })
})

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
  <Dropdown content="这是一个提示框" :trigger="trigger" :open-delay="1000" :close-delay="1000" :menu-options="vNode">
    <h1>鼠标悬停我</h1>
  </Dropdown>
  <Input placeholder="请输入" v-model="modelValue" :enable-password-toggle="true"  clearable size="large" />
</template>

<style scoped>
.fk-button-primary {
  background-color: var(--main-bg-color);
}
</style>