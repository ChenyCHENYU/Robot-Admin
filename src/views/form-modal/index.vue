<!--
 * @Author: ChenYu
 * @Date: 2022-03-22 23:14:44
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-10 20:55:04
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\form-modal\index.vue
 * @Description: 模态框内的表单视图页
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElButton type="primary" @click="open">open</ElButton>
  <C_FormModal
    v-model:visible="visible"
    title="编辑用户"
    width="50%"
    :options="OPTIONS"
    isScroll
  >
    <!-- 底部区域插槽 -->
    <template #footer="{ form }">
      <ElButton @click="cancel(form)">取消</ElButton>
      <ElButton type="primary" @click="confirm(form)"> 确认 </ElButton>
    </template>
    <template #uploadClick>
      <ElButton>点击上传</ElButton>
    </template>
    <template #uploadTip>
      <div style="color: #ccc">jpg/png files with a size less than 500kb</div>
    </template>
  </C_FormModal>
</template>

<script lang="ts" setup>
import type {
  I_FormInstance,
  I_FormOptions,
} from '@/components/C_Form/types/types'
import { v_required, v_username } from '@/utils/v_verify'
import { ElMessage } from 'element-plus'

const visible = ref(false)

const open = () => (visible.value = true)

const OPTIONS: I_FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    rules: v_username('用户名不能为空'),
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    placeholder: '请输入密码',
    prop: 'password',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur',
      },
      {
        min: 6,
        max: 15,
        message: '密码6-15位之间',
        trigger: 'blur',
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
  // TODO: 动态添加节点新增了3个属性，for show selectValue
  {
    type: 'select',
    value: '',
    placeholder: '请选择职位',
    prop: 'role',
    for: 'role',
    label: '职位',
    attrs: {
      style: {
        width: '100%',
      },
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'blue',
      },
    ],
    children: [
      {
        type: 'option',
        value: '1',
        label: '经理',
      },
      {
        type: 'option',
        value: '2',
        label: '主管',
      },
      {
        type: 'option',
        value: '3',
        label: '员工',
      },
    ],
  },
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'usernamenidaye',
    placeholder: '请输入用户名',
    rules: v_required('用户名不能为空'),
    attrs: {
      clearable: true,
    },
    selectValue: ['1'],
    for: 'role',
    show: false,
  },
  {
    type: 'date-picker',
    value: '',
    label: '时间选择',
    prop: 'userTimenidaye',
    placeholder: '请选择时间',
    rules: v_required('时间不能为空'),
    attrs: {
      clearable: true,
    },
    selectValue: ['2', '3'],
    for: 'role',
    show: false,
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'lick',
    label: '爱好',
    rules: v_required('爱好不能为空'),
    children: [
      {
        type: 'checkbox',
        value: '1',
        label: '蓝球',
      },
      {
        type: 'checkbox',
        label: '足球',
        value: '2',
      },
    ],
  },
  {
    type: 'radio-group',
    value: '',
    prop: 'gener',
    label: '性别',
    rules: v_required('性别不能为空'),
    children: [
      {
        type: 'radio',
        value: '1',
        label: '男',
      },
      {
        type: 'radio',
        label: '女',
        value: '2',
      },
      {
        type: 'radio',
        label: '保密',
        value: '3',
      },
    ],
  },
  {
    type: 'upload',
    prop: 'pic',
    label: '上传',
    uploadAttrs: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      multiple: true,
      limit: 2,
    },
    rules: v_required('请上传文件'),
  },
  {
    type: 'editor',
    value: '',
    label: '描述',
    prop: 'desc',
    placeholder: '请输入描述',
    rules: v_required('描述不能为空'),
  },
]

const confirm = (form: I_FormInstance) => {
  console.log('form ===>', form)
  const validate = form.validate()
  const model = form.getFormData()

  validate((valid: boolean) => {
    console.log('valid ===>', valid)
    if (valid) {
      console.log('model===>', model)

      ElMessage.success('提交成功')
    } else {
      ElMessage.error('提交失败，查看表单校验错误')
    }
  })
}
const cancel = (form: I_FormInstance) => {
  console.log('first')
}
</script>
<style lang="scss" scoped></style>
