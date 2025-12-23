import fs from "fs";
import path from "path";

// 修复Windows路径问题：使用fileURLToPath处理URL路径
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const typesDir = path.join(__dirname, "dist/types");
const outputPath = path.join(typesDir, "index.d.ts");

console.log("Merging types to:", outputPath);

// Clear existing files in the directory
if (fs.existsSync(typesDir)) {
  console.log("Clearing existing types directory:", typesDir);
  const files = fs.readdirSync(typesDir);
  for (const file of files) {
    fs.unlinkSync(path.join(typesDir, file));
  }
} else {
  console.log("Creating directory:", typesDir);
  fs.mkdirSync(typesDir, { recursive: true });
}

const content = `import './styles/index.css';
import type { App, VNode, Ref, ComputedRef, ComponentInternalInstance, InjectionKey, EventTarget, FocusEvent } from 'vue';

// 基础导出
declare const install: (app: App) => void;

export { Button, Collapse, CollapseItem, Dropdown, Form, FormItem, Icon, Input, install, Message, Tooltip };
export default install;

// Button 组件类型
export declare type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export declare type ButtonSize = 'small' | 'large';
export declare type NativeType = 'button' | 'submit' | 'reset';

export declare interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
}

export declare interface ButtonInstance {
  ref: HTMLButtonElement | null;
}

declare const Button: import('vue').DefineComponent<ButtonProps>;
export { Button };

// Collapse 组件类型
export declare type nameType = string | number;

export declare interface CollapseProps {
  modelValue?: nameType[];
  accordion?: boolean;
}

export declare interface CollapseContext {
  activeNames: Ref<nameType[]>;
  handleItemClick: (name: nameType) => void;
}

export declare const collapseContextKey: InjectionKey<CollapseContext>;

export declare interface CollapseItemProps {
  name: nameType;
  title?: string;
  disabled?: boolean;
}

declare const Collapse: import('vue').DefineComponent<CollapseProps>;
declare const CollapseItem: import('vue').DefineComponent<CollapseItemProps>;
export { Collapse, CollapseItem };

// Dropdown 组件类型
export declare interface MenuOption {
  label: string | VNode;
  key: string | number;
  disabled?: boolean;
  divided?: boolean;
}

export declare interface DropdownProps {
  trigger?: 'hover' | 'click';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  menuOptions: MenuOption[];
  hideAfterSelect?: boolean;
}

export declare interface DropdownEmits {
  (e: 'select', value: MenuOption): void;
  (e: 'visible-change', value: boolean): void;
}

export declare interface DropdownInstance {
  show: () => void;
  hide: () => void;
}

declare const Dropdown: import('vue').DefineComponent<DropdownProps>;
export { Dropdown };

// Form 组件类型
export declare interface FormItemRules {
  type?: string;
  required?: boolean;
  message?: string;
  trigger?: string;
}

export declare type FormRules = Record<string, FormItemRules[]>;

export declare interface FormProps {
  model: Record<string, any>;
  rules: FormRules;
}

export declare interface FormInstance {
  validate: () => Promise<any>;
  resetFields: (keys?: string[]) => void;
  clearValidateStatus: (key?: string[]) => void;
}

export declare interface FormContext {
  model: Record<string, any>;
  rules: FormRules;
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
}

export declare const formContextKey: InjectionKey<FormContext>;

export declare interface FormItemProps {
  label: string;
  prop?: string;
}

export declare interface ValidateStatus {
  loading: boolean;
  state: 'init' | 'success' | 'error';
  errorMessages: string;
}

export declare interface FormItemInstance {
  validate: (trigger?: string) => Promise<any>;
  resetField: () => void;
  clearValidateStatus: () => void;
  validateStatus: ValidateStatus;
}

export declare interface FormItemContext {
  validate: (trigger?: string) => Promise<any>;
  prop: string;
  resetField: () => void;
  clearValidateStatus: () => void;
}

export declare const formItemContextKey: InjectionKey<FormItemContext>;

declare const Form: import('vue').DefineComponent<FormProps>;
declare const FormItem: import('vue').DefineComponent<FormItemProps>;
export { Form, FormItem };

// Icon 组件类型
export declare interface IconProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  color?: string;
}

export declare type FilterIconProps = Omit<IconProps, 'type' | 'color'>;

declare const Icon: import('vue').DefineComponent<IconProps>;
export { Icon };

// Input 组件类型
export declare interface InputProps {
  type?: string;
  size?: 'large' | 'small';
  modelValue?: string;
  clearable?: boolean;
  enablePasswordToggle?: boolean;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  form?: string;
  autofocus?: boolean;
}

export declare interface InputEmits {
  (e: 'change', value: string): void;
  (e: 'input', value: string): void;
  (e: 'clear'): void;
  (e: 'focus', value: FocusEvent): void;
  (e: 'blur', value: FocusEvent): void;
  (e: 'update:modelValue', value: string): void;
}

export declare interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement;
}

declare const Input: import('vue').DefineComponent<InputProps>;
export { Input };

// Message 组件类型
export declare interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'info' | 'warning' | 'danger';
  onDestroy: () => void;
  id: string;
  offset?: number;
  zIndex?: number;
}

export declare type createMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>;

export declare interface MessageContext {
  id: string;
  props: MessageProps;
  vnode: VNode;
  vm: ComponentInternalInstance;
  destroy: () => void;
}

declare const Message: ((options: createMessageProps | string) => void) & {
  success: (options: createMessageProps | string) => void;
  warning: (options: createMessageProps | string) => void;
  error: (options: createMessageProps | string) => void;
  info: (options: createMessageProps | string) => void;
  closeAll: () => void;
};
export { Message };

// Tooltip 组件类型
export declare interface TooltipProps {
  trigger?: 'hover' | 'click';
  manual?: boolean;
  placement?: any; // 使用@popperjs/core的Placement类型
  content?: string;
  transition?: string;
  popperOptions?: any;
  openDelay?: number;
  closeDelay?: number;
}

export declare interface TooltipEmits {
  (e: 'visible-change', value: boolean): void;
}

export declare interface TooltipInstance {
  show: () => void;
  hide: () => void;
}

declare const Tooltip: import('vue').DefineComponent<TooltipProps>;
export { Tooltip };

// Hooks 类型
export declare function useClickOutside(target: Ref<HTMLElement | undefined>, callback: () => void): void;
export declare function useEventListener<T extends Event>(target: Ref<EventTarget | null> | EventTarget, event: string, handler: (e: T) => void): void;
export declare function useZIndex(initialValue?: number): {
  currentZIndex: ComputedRef<number>;
  nextZIndex: () => number;
  initialZIndex: Ref<number>;
};
`;

fs.writeFileSync(outputPath, content, "utf8");
console.log("Types successfully merged to:", outputPath);

// Verify the file was created
if (fs.existsSync(outputPath)) {
  console.log(
    "Verification: File exists and has",
    fs.readFileSync(outputPath, "utf8").length,
    "characters"
  );
} else {
  console.error("ERROR: File was not created!");
}
