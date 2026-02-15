import type { Options,Placement } from '@popperjs/core'
export interface TooltipProps {
  trigger?: 'hover' | 'click'
  manual?: boolean
  placement?: Placement
  content?: string
  transition?: string
  popperOptions?: Partial<Options>
  openDelay?: number
  closeDelay?: number
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
  (e: 'clickOutside', value: boolean): void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}