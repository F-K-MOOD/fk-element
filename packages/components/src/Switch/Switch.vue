<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

import type { SwitchEmits, SwitchProps } from "./types";

defineOptions({
  name: "FkSwitch",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();

const internalValue = ref(props.modelValue);
const input = ref<HTMLInputElement>();
const isChecked = computed(() => internalValue.value === props.activeValue);

function switchValue() {
  if (props.disabled) {
    return;
  }
  if (isChecked.value) {
    internalValue.value = props.inactiveValue;
  } else {
    internalValue.value = props.activeValue;
  }
  emits("update:modelValue", internalValue.value);
  emits("change", internalValue.value);
}

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  },
);

watch(
  () => isChecked.value,
  (newValue) => {
    input.value!.checked = newValue;
  },
);

onMounted(() => {
  input.value!.checked = isChecked.value;
});
</script>

<template>
  <div
    class="fk-switch"
    :class="{
      [`fk-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': isChecked,
    }"
    @click="switchValue"
  >
    <input
      ref="input"
      class="fk-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="fk-switch__core">
      <div class="fk-switch__core-inner">
        <span
          v-if="activeText || inactiveText"
          class="fk-switch__core-inner-text"
        >
          {{ isChecked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="fk-switch__core-action"></div>
    </div>
  </div>
</template>
