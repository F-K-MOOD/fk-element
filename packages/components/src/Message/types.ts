import type { ComponentInternalInstance, VNode } from 'vue'

export interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'info' | 'warning' | 'danger';
  onDestroy: () => void;
  id: string;
  offset?: number;
  zIndex?: number;
}

export type createMessageProps = Omit<MessageProps, 'onDestroy'| 'id'| 'zIndex'>

export interface MessageContext {
  id: string;
  props: MessageProps
  vnode: VNode
  vm: ComponentInternalInstance,
  destroy: () => void,
}