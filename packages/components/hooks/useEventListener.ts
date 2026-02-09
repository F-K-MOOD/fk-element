import type {Ref } from 'vue'
import { isRef, onBeforeUnmount, onMounted, unref, watch} from 'vue'
export const useEventListener = (
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => void
) => {
  if (isRef(target)) {
    watch(target, (newTarget, oldTarget) => {
      oldTarget?.removeEventListener(event, handler)
      newTarget?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }
  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}