<script lang="ts" setup>
defineOptions({
  name: "FKMessage",
});

// 导入模块, 类型定义, vue 相关函数
import { computed, nextTick, onMounted, ref, watch } from "vue";

import { useEventListener } from "../../hooks/useEventListener";
import RenderVnode from "../Common/RenderVnode";
import Icon from "../Icon/Icon.vue";
import { getLastBottomOffset } from "./method";
import type { MessageProps } from "./types";

// 定义 props
const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  showClose: false,
  type: "info",
  message: "",
  offset: 20,
});

// 定义响应式变量
const visible = ref(false);
const height = ref(0);
let timer: ReturnType<typeof setTimeout> | null = null;

// 定义DOM引用
const messageRef = ref<HTMLDivElement>();
const lastOffset = computed(() => getLastBottomOffset(props.id));
// 当前消息的顶部偏移量
const topOffset = computed(() => lastOffset.value + props.offset);
const cssStyle = computed(() => ({
  top: `${topOffset.value}px`,
  zIndex: props.zIndex,
}));
// 为下一个元素需要使用的bottomOffset
const bottomOffset = computed(() => topOffset.value + height.value);

// 定义交互方法
const startTimer = () => {
  if (props.duration) {
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  }
};
useEventListener(document, "keydown", (e: Event) => {
  const event = e as KeyboardEvent;
  if (event.code === "Escape") {
    visible.value = false;
  }
});
const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

watch(visible, (newVal) => {
  if (!newVal) {
    props.onDestroy();
  }
});

onMounted(async () => {
  visible.value = true;
  startTimer();
  await nextTick();
  height.value = messageRef.value?.getBoundingClientRect().height || 0;
});

defineExpose({
  bottomOffset,
  visible,
});
</script>

<template>
  <div
    v-show="visible"
    :id="props.id"
    ref="messageRef"
    :style="cssStyle"
    :class="{
      'is-close': showClose,
      [`fk-message--${type}`]: type,
    }"
    role="alert"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
    <div class="fk-message__content">
      <slot>
        <RenderVnode v-if="message" :v-node="message" />
      </slot>
    </div>
    <div v-if="showClose" class="fk-message__close">
      <Icon icon="xmark" @click.stop="visible = false" />
    </div>
  </div>
</template>
