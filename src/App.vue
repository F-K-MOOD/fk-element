<script setup lang="ts">
import { reactive, ref } from 'vue'

import Form from './components/Form/Form.vue'
import FormItem from './components/Form/FormItem.vue'
import type { FormInstance } from './components/Form/types'
import Input from './components/Input/Input.vue'

const formRef = ref<FormInstance>()

const onValidate = async () => {
  try {
    await formRef.value?.validate()
    console.log('校验通过')
  } catch (error) {
    console.log('校验不通过')
    console.error(error)
  }
}

const resetFields = () => {
  formRef.value?.resetFields()
}

const clearValidateStatus = () => {
  formRef.value?.clearValidateStatus()
}

const model = reactive({
  username: '',
  password: '',
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})
</script>

<template>
  <div>
    <Form ref="formRef" :model="model" :rules="rules">
      <FormItem prop="username" label="用户名">
        <Input v-model="model.username" placeholder="请输入用户名" />
      </FormItem>
      <FormItem prop="password" label="密码">
        <Input v-model="model.password" placeholder="请输入密码" type="password" />
      </FormItem>
    </Form>
    <button type="button" @click="onValidate">
      提交
    </button>
    <button type="button" @click="resetFields">
      重置
    </button>
    <button type="button" @click="clearValidateStatus">
      清除校验状态
    </button>
  </div>
</template>
