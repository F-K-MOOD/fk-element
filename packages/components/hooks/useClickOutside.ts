import { onMounted, onUnmounted, type Ref } from "vue";

export const useClickOutside = (el: Ref<HTMLElement | undefined>, callback: () => void) => {
  function handleClick(e: MouseEvent) {
    if (el.value && e.target && !el.value.contains(e.target as Node)) {
      callback();
    }
  };
  onMounted(() => {
    document.addEventListener("click", handleClick);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handleClick);
  });
};