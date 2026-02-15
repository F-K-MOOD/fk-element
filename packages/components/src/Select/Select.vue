<script setup lang="ts">
import { debounce, isFunction } from "lodash-es";
import { computed, onMounted, reactive, ref, watch } from "vue";

import RenderVNode from "../Common/RenderVnode.ts"; // 注意：你可能是 .vue 文件
import Icon from "../Icon/index.ts";
import Input from "../Input/index.ts";
import type { InputInstance } from "../Input/types";
import Tooltip from "../Tooltip/index.ts";
import type {
  SelectEmits,
  SelectOption,
  SelectProps,
  SelectState,
} from "./types";

// Props & Emits
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  disabled: false,
  placeholder: "",
  clearable: false,
  filterable: false,
  remoteLoad: false,
});
const emits = defineEmits<SelectEmits>();

// 工具函数
function findOptionByValue(
  value: string | null | undefined,
): SelectOption | null {
  if (value == null || value === "") return null;
  return props.options.find((item) => item.value === value) ?? null;
}

// 内部 model 值（始终是 value 字符串）
const innerValue = ref<string>("");

// 状态
const states = reactive<SelectState>({
  inputValue: "",
  selectedOption: null,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
});

// 同步外部 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal ?? "";
    const option = findOptionByValue(newVal);
    states.selectedOption = option;
    states.inputValue = option?.label ?? "";
  },
  { immediate: true },
);

// refs
const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null);
const inputRef = ref<InputInstance | null>(null);
const isDropdownShow = ref(false);

// 控制下拉显隐
function controlDropdown(isShow: boolean) {
  if (isShow) {
    if (props.filterable) {
      states.inputValue = "";
      generateFilteredOptions("");
    }
    tooltipRef.value?.show?.();
  } else {
    if (props.filterable) {
      states.inputValue = states.selectedOption?.label ?? "";
    }
    tooltipRef.value?.hide?.();
    states.highlightIndex = -1;
  }
  isDropdownShow.value = isShow;
  emits("visible-change", isShow);
}

function toggleDropdown() {
  if (props.disabled) return;
  controlDropdown(!isDropdownShow.value);
}

function itemSelect(item: SelectOption) {
  if (item.disabled) return;
  innerValue.value = item.value;
  states.selectedOption = item;
  states.inputValue = item.label;
  emits("update:modelValue", item.value);
  emits("change", item.value);
  controlDropdown(false);
  inputRef.value?.ref?.focus?.();
}

// 清除
const showClearIcon = computed(() => {
  return (
    props.clearable &&
    states.selectedOption !== null &&
    states.mouseHover &&
    innerValue.value !== ""
  );
});

function clearSelectedOption(e: Event) {
  e.stopPropagation();
  states.selectedOption = null;
  innerValue.value = "";
  states.inputValue = "";
  emits("update:modelValue", "");
  emits("change", "");
  emits("clear");
}

// 过滤相关
const filteredOptions = ref<SelectOption[]>([]);

const filterPlaceholder = computed(() => {
  if (props.filterable && states.selectedOption && isDropdownShow.value) {
    return ""; // 搜索时清空 placeholder
  }
  return props.placeholder;
});

// 监听 options 变化
watch(
  () => props.options,
  (newVal) => {
    filteredOptions.value = newVal;
    // 如果当前选中项不在新 options 中，清空
    if (
      states.selectedOption &&
      !newVal.some((opt) => opt.value === states.selectedOption!.value)
    ) {
      states.selectedOption = null;
      if (!props.filterable) {
        innerValue.value = "";
        states.inputValue = "";
      }
    }
  },
  { immediate: true },
);

// 远程/本地过滤逻辑
async function generateFilteredOptions(searchValue: string) {
  if (!props.filterable) {
    filteredOptions.value = props.options;
    return;
  }

  if (props.customFilter && isFunction(props.customFilter)) {
    filteredOptions.value = props.customFilter(searchValue);
  } else if (
    props.remoteLoad &&
    props.remoteLoadFunction &&
    isFunction(props.remoteLoadFunction)
  ) {
    states.loading = true;
    try {
      filteredOptions.value = await props.remoteLoadFunction(searchValue);
    } catch (e) {
      console.error("Remote load failed:", e);
      filteredOptions.value = [];
    } finally {
      states.loading = false;
    }
  } else {
    filteredOptions.value = props.options.filter((item) =>
      item.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }
}

// ✅ 正确的防抖函数：只创建一次
let debouncedFilterFn: (() => void) | null = null;

onMounted(() => {
  const timeout = props.remoteLoad ? 300 : 0;
  debouncedFilterFn = debounce(() => {
    generateFilteredOptions(states.inputValue);
  }, timeout);
});

function onFilter() {
  if (debouncedFilterFn) {
    debouncedFilterFn();
  } else {
    // fallback（极端情况）
    generateFilteredOptions(states.inputValue);
  }
}

// 键盘导航
function handleKeydown(e: KeyboardEvent) {
  if (!isDropdownShow.value && !["Enter", "ArrowDown"].includes(e.key)) return;

  switch (e.key) {
    case "Enter":
      e.preventDefault();
      if (!isDropdownShow.value) {
        controlDropdown(true);
      } else if (
        states.highlightIndex >= 0 &&
        filteredOptions.value[states.highlightIndex]
      ) {
        itemSelect(filteredOptions.value[states.highlightIndex]);
      } else {
        controlDropdown(false);
      }
      break;
    case "Escape":
      e.preventDefault();
      if (isDropdownShow.value) controlDropdown(false);
      break;
    case "ArrowUp":
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        states.highlightIndex =
          states.highlightIndex <= 0
            ? filteredOptions.value.length - 1
            : states.highlightIndex - 1;
      }
      break;
    case "ArrowDown":
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        states.highlightIndex =
          states.highlightIndex >= filteredOptions.value.length - 1
            ? 0
            : states.highlightIndex + 1;
      }
      break;
  }
}

// hover 用于 clear icon
function handleMouseEnter() {
  states.mouseHover = true;
}
function handleMouseLeave() {
  states.mouseHover = false;
}
</script>

<template>
  <div
    class="fk-select"
    :class="{ 'is-disabled': props.disabled }"
    @click="toggleDropdown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <Tooltip
      ref="tooltipRef"
      placement="bottom-start"
      manual
      @click-outside="controlDropdown(false)"
    >
      <!-- 注意：如果你的 Tooltip 不支持 popper-options，先移除 -->
      <Input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="props.disabled"
        :placeholder="filterPlaceholder"
        :readonly="!props.filterable"
        @input="onFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <Icon
            v-if="showClearIcon"
            icon="fa-solid fa-xmark"
            class="fk-input__clear"
            @click.stop="clearSelectedOption"
          />
          <Icon
            v-else
            icon="fa-solid fa-angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          />
        </template>
      </Input>
      <template #content>
        <div v-if="states.loading" class="fk-select__loading">
          <Icon icon="fa-solid fa-spinner" />
        </div>
        <div
          v-else-if="props.filterable && filteredOptions.length === 0"
          class="fk-select__nodata"
        >
          no match data
        </div>
        <ul v-else class="fk-select__menu">
          <li
            v-for="item in filteredOptions"
            :key="item.value"
            class="fk-select__menu-item"
            :class="{
              'is-disabled': item.disabled,
              'is-selected': states.selectedOption?.value === item.value,
              'is-highlight':
                states.highlightIndex === filteredOptions.indexOf(item),
            }"
            @click.stop="itemSelect(item)"
          >
            <RenderVNode
              :v-node="props.renderLabel ? props.renderLabel(item) : item.label"
            />
          </li>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<style scoped>
/* 请保留你的样式 */
</style>
