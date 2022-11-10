/*
 * @Author: ChenYu
 * @Date: 2022-03-21 21:28:50
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-06 15:12:27
 * @FilePath: \v3-el-components\src\views\form\data.ts
 * @Description: 默认的数据源
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import type { I_FormOptions } from '_c/C_Form/types/types'
import { v_required, v_username } from '@/utils/v_verify'

export const OPTIONS: I_FormOptions[] = [
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
  {
    type: 'select',
    value: undefined, // FIXME: 注意，此处选择默认只能为undefined
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    attrs: {
      style: {
        width: '100%',
      },
    },
    rules: v_required('职位不能为空'),

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
    type: 'checkbox-group',
    value: undefined, // FIXME: 注意，此处选择默认只能为undefined
    placeholder: '请选择职位',
    prop: 'live',
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
        value: '2',
        label: '足球',
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
