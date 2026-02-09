import { h, reactive, render } from 'vue'

import useZIndex from '../../hooks/useZIndex'
import Message from './Message.vue'
import type { createMessageProps, MessageContext, MessageProps } from './types'

// 保存实例
const instances: MessageContext[] = reactive([])
let seed = 1

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

export const getLastInstance = () => {
  return instances[instances.length - 1]
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((item) => item.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev?.vm?.exposed?.bottomOffset?.value || 0
  }
}


