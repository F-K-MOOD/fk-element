<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Button from './components/Button/Button.vue'
import type { ButtonInstance } from './components/Button/types'
const xi = ref<ButtonInstance | null>(null)


onMounted(async () => {
  //! 当父组件通过模板引用的方式获取到当前组件的实例，
  // 获取到的实例会像这样 { a: number, b: number } (ref 会和在普通实例中一样被自动解包)
  if (xi.value) {
    console.log(xi.value.ref)
  }
})
</script>

<template>
  <div>
    <Button ref="xi" class="fk-button-primary">
      默认按钮
    </Button>
  </div>
</template>

<style scoped>
.fk-button-primary {
  background-color: var(--main-bg-color);
}
</style>
