# Message 组件消失机制分析

本文档详细分析 v-element 项目中 Message 组件实例消失的机制，包括从 DOM 中移除和视觉隐藏两个方面。

## 消息实例的生命周期

### 1. 创建阶段

在 `method.ts` 文件中，`createMessage` 函数负责创建消息实例：

```typescript
export const createMessage = (props: createMessageProps) => {
  const container = document.createElement('div')
  const id = `fk-message-${seed++}`
  const { nextZIndex } = useZIndex()

  const destroy = () => {
    const index = instances.findIndex((item) => item.id === id)
    if (index !== -1) {
      instances.splice(index, 1)
    }
  }
  const manualDestroy = () => {
    const instance = instances.find((item) => item.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }

  const newProps: MessageProps = {
    ...props,
    id,
    onDestroy: destroy,
    zIndex:  nextZIndex(),
  }
  const vnode = h(Message, newProps)

  render(vnode, container)
  // 挂载到 body 上, 并设置偏移量
  document.body.appendChild(container.firstElementChild!)

  // 保存实例
  const vm = vnode.component!
  const instance = {
    id,
    props: newProps,
    vnode,
    vm,
    destroy: manualDestroy
  }
  instances.push(instance)
  return instance
}
```

### 2. 显示阶段

在 `Message.vue` 中，组件挂载后设置 `visible.value = true` 并启动定时器：

```typescript
onMounted(async () => {
  visible.value = true;
  startTimer();
  await nextTick()
  height.value = messageRef.value?.getBoundingClientRect().height || 0
})
```

### 3. 隐藏阶段

消息隐藏有以下几种触发方式：

#### 3.1 自动隐藏（定时器）

```typescript
const startTimer = () => {
  if (props.duration) {
    setTimeout(() => {
      visible.value = false;
    }, props.duration)
  }
}
```

#### 3.2 按 Escape 键

```typescript
useEventListener(document, 'keydown', (e:Event) => {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false;
  }
})
```

#### 3.3 点击关闭按钮

模板中的关闭按钮点击事件：

```html
<div v-if="showClose" class="fk-message__close">
  <Icon icon="xmark" @click.stop="visible = false" />
</div>
```

#### 3.4 手动调用 destroy 方法

通过 `createMessage` 返回的实例调用 `destroy` 方法：

```typescript
const manualDestroy = () => {
  const instance = instances.find((item) => item.id === id)
  if (instance) {
    instance.vm.exposed!.visible.value = false
  }
}
```

## 核心问题：消息是如何「消失」的？

### 分两个阶段分析：

#### 阶段一：视觉隐藏（不显示）

当 `visible.value = false` 时，由于模板中使用了 `v-show="visible"`：

```html
<div 
  v-show="visible" 
  ef="messageRef" 
  class="fk-message" :style="cssStyle" 
  <!-- 其他属性 -->
>
```

这会导致元素被添加 `display: none` 样式，元素在视觉上不可见，但**仍然存在于 DOM 中**。

#### 阶段二：从 DOM 中移除

当 `visible` 变为 `false` 时，`watch` 监听器会触发：

```typescript
watch(visible, (newVal) => {
  if (!newVal) {
    props.onDestroy()
  }
})
```

这里调用的 `props.onDestroy()` 对应 `method.ts` 中的 `destroy` 函数：

```typescript
const destroy = () => {
  const index = instances.findIndex((item) => item.id === id)
  if (index !== -1) {
    instances.splice(index, 1)
  }
}
```

**重要发现**：此 `destroy` 函数只从 `instances` 数组中移除了实例引用，但**没有从 DOM 中移除元素**。

## 结论

1. **视觉消失**：通过 `v-show="visible"` 实现，当 `visible` 变为 `false` 时，元素添加 `display: none` 样式，视觉上不可见。

2. **DOM 移除**：代码中存在缺陷 - 当消息隐藏时，虽然调用了 `destroy` 函数，但该函数仅从 `instances` 数组中移除了实例引用，**没有实际从 DOM 中移除消息元素**。

3. **内存泄漏风险**：由于消息元素没有从 DOM 中移除，随着消息数量增加，DOM 节点会不断累积，可能导致内存泄漏。

## 代码优化建议

为了彻底解决消息消失问题，建议修改 `destroy` 函数，添加从 DOM 中移除元素的逻辑：

```typescript
const destroy = () => {
  const index = instances.findIndex((item) => item.id === id)
  if (index !== -1) {
    // 1. 从 instances 数组中移除
    instances.splice(index, 1)
    
    // 2. 从 DOM 中移除元素
    const element = document.getElementById(id)
    if (element) {
      element.remove()
    }
  }
}
```

同时，需要在 `Message.vue` 的根元素上添加 id 属性：

```html
<div 
  v-show="visible" 
  :id="id"
  ref="messageRef" 
  class="fk-message" 
  :style="cssStyle"
>
```

这样才能确保消息组件在隐藏后能完全从 DOM 中移除，避免潜在的内存泄漏问题。