/*
 * @Author: ChenYu
 * @Date: 2022-03-21 21:28:50
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-10 09:43:45
 * @FilePath: \v3-vite-elementPlus-admin\src\views\login\data.ts
 * @Description: 默认的数据源
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { t } from '@/utils/d_i18n'
import { v_username } from '@/utils/v_verify'
import type { I_FormOptions } from '_c/C_Form/types/types'

// TODO: 这种定义方法 多了字段不校验，少了必须的字段才校验，比较恶心
// 业务系统不需要国际化，尽量避免这种写法把，直接约定类型
export const OPTIONS = computed<I_FormOptions[]>(() => [
  {
    type: 'input',
    value: 'admin',
    prop: 'username',
    placeholder: '请输入用户名',
    rules: v_username(t('login.usernameRule')),
    attrs: {
      clearable: true,
      prefixIcon: 'ElIconUser',
    },
  },
  {
    type: 'input',
    value: '123456',
    placeholder: '请输入密码',
    prop: 'password',
    rules: [
      {
        required: true,
        // message: '密码不能为空',
        message: t('login.passwordRule'),
        trigger: 'blur',
      },
      {
        min: 6,
        max: 15,
        message: t('login.passwordSectionRule'),
        trigger: 'blur',
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
      prefixIcon: 'ElIconLock',
    },
  },
])
