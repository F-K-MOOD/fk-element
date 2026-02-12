<script setup lang="ts">
import { provide, ref, watch } from "vue";

import type { CollapseEmits, CollapseProps, nameType } from "./types";
import { collapseContextKey } from "./types";

defineOptions({
  name: "FKCollapse",
});

const collapseProps = defineProps<CollapseProps>();
const collapseEmits = defineEmits<CollapseEmits>();

// 处理 modelValue 的初始值，支持手风琴模式的单个值
const initActiveNames = (value: any): nameType[] => {
  if (collapseProps.accordion) {
    return value ? [value] : [];
  }
  return Array.isArray(value) ? value : [];
};

const activeNames = ref(initActiveNames(collapseProps.modelValue));

watch(
  () => collapseProps.modelValue,
  (newVal) => {
    activeNames.value = initActiveNames(newVal);
  },
);

const handleItemClick = (name: nameType) => {
  // 如果开启手风琴模式，只能展开一个项
  if (collapseProps.accordion) {
    if (activeNames.value[0] === name) {
      activeNames.value = [];
      collapseEmits("update:modelValue", "");
      collapseEmits("change", "");
    } else {
      activeNames.value = [name];
      collapseEmits("update:modelValue", name);
      collapseEmits("change", name);
    }
  }
  // 如果不开启手风琴模式，点击项会展开或收起
  else if (activeNames.value.includes(name)) {
    activeNames.value = activeNames.value.filter((item) => item !== name);
    collapseEmits("update:modelValue", activeNames.value);
    collapseEmits("change", activeNames.value);
  } else {
    activeNames.value.push(name);
    collapseEmits("update:modelValue", activeNames.value);
    collapseEmits("change", activeNames.value);
  }
};

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>

<template>
  <div class="fk-collapse">
    <slot></slot>
  </div>
</template>
