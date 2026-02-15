import { defineComponent } from "vue";

export default defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      required: true
    }
  },
  // 在 Vue 3 的 defineComponent 中，setup() 可以返回两种东西：
  // 1. 一个渲染函数, 这个函数就是组件的渲染函数, 它会被调用来渲染组件的 DOM 树
  // 2. 一个对象，对象中的属性会被合并到组件实例中
  setup(props) {
    return () => props.vNode
  }
})
