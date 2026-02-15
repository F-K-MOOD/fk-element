<script setup lang="ts">
defineOptions({
  name: "FKInput",
  inheritAttrs: false,
});
import { computed, inject, nextTick, ref, useAttrs, watch } from "vue";

import { formItemContextKey } from "../Form/types.ts";
import Icon from "../Icon/Icon.vue";
import type { InputEmits, InputProps } from "./types.ts";

// 定义 props
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  size: "small",
  clearable: false,
  enablePasswordToggle: false, //父级给的“总闸”——要不要密码切换功能。
  disabled: false,
  modelValue: "",
});

// 定义 emits
const emits = defineEmits<InputEmits>();

// 定义响应式数据
const innerValue = ref(props.modelValue || "");
const isFocus = ref(false);
const isPasswordVisible = ref(false);
// useAttrs() 是一个 Composition API 函数，用于在 <script setup> 中获取当前组件接收到的、
// 未被 props 声明消费的 attribute 集合
const attrs = useAttrs();

// 定义DOM引用
const inputRef = ref<HTMLInputElement>();

// 定义计算属性
const showClearIcon = computed(() => {
  return props.clearable && !props.disabled && !!innerValue.value;
});
const canDisplayToggleIcon = computed(() => {
  // 业务规则闸——总闸打开 且 有内容 且 非禁用才显示密码切换图标
  return props.enablePasswordToggle && !props.disabled && !!innerValue.value;
});

// 定义交互方法
const handleInput = () => {
  emits("update:modelValue", innerValue.value);
  emits("input", innerValue.value);
  runValidate("input");
};
const handleFocus = (e: FocusEvent) => {
  isFocus.value = true;
  emits("focus", e);
};
const handleBlur = (e: FocusEvent) => {
  isFocus.value = false;
  runValidate("blur");
  emits("blur", e);
};
const handleClear = () => {
  innerValue.value = "";
  emits("update:modelValue", "");
  emits("clear");
  emits("change", "");
  emits("input", "");
};
const handleChange = () => {
  emits("change", innerValue.value);
  runValidate("change");
};
const handleKeydown = (e: KeyboardEvent) => {
  emits("keydown", e);
};
const togglePasswordVisible = () => {
  // 当前是明文（true）还是密文（false）。
  isPasswordVisible.value = !isPasswordVisible.value;
};
const keepFocus = async () => {
  await nextTick();
  inputRef.value?.focus();
};
const runValidate = (trigger?: string) => {
  formItemContext?.validate(trigger).catch((e) => {
    console.log(e.errors);
  });
};

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
  },
  { immediate: true },
);

defineExpose({
  inputRef,
});

const formItemContext = inject(formItemContextKey);
</script>

<template>
  <div
    class="fk-input"
    :class="{
      [`fk-input--${props.size}`]: size,
      [`fk-input--${props.type}`]: type,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
    }"
  >
    <!-- 输入框 -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="fk-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="fk-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="fk-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          ref="inputRef"
          v-model="innerValue"
          class="fk-input__inner"
          v-bind="attrs"
          :type="
            enablePasswordToggle
              ? isPasswordVisible
                ? 'text'
                : 'password'
              : type
          "
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          @keydown="handleKeydown"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClearIcon || canDisplayToggleIcon"
          class="fk-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix"></slot>
          <Icon
            v-if="showClearIcon"
            icon="circle-xmark"
            class="fk-input__clear"
            @click="handleClear"
          />
          <Icon
            v-if="canDisplayToggleIcon && isPasswordVisible"
            icon="eye"
            class="fk-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            v-if="canDisplayToggleIcon && !isPasswordVisible"
            icon="eye-slash"
            class="fk-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="fk-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- 文本域 -->
    <template v-else>
      <textarea
        v-bind="attrs"
        ref="inputRef"
        v-model="innerValue"
        class="fk-text__wrapper"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
      </textarea>
    </template>
  </div>
</template>
