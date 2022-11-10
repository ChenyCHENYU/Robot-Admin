<!--
 * @Author: ChenYu
 * @Date: 2022-03-30 23:50:51
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-10 10:05:27
 * @FilePath: \v3-vite-elementPlus-admin\src\views\login\index.vue
 * @Description: 登录页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="login-container">
    <h3>{{ $t('login.title') }} <C_LangSelect /></h3>
    <C_Form class="login-container-form" :options="OPTIONS">
      <template #action="scope">
        <ElButton
          class="login-container-form-btn"
          type="primary"
          :loading="loading"
          @click="login(scope)"
        >
          {{ $t('login.loginBtn') }}
          <!-- 外部图标 demo -->
          <!-- <i-mdi-account-reactivate style="font-size: 2em; color: red" /> -->
          <!-- <i-mdi:abugida-devanagari /> -->
          <!-- TODO: 使用一个自定义图标，通过isCustomIcon -->
          <!-- <C_Icon iconName="eye" isCustomIcon /> -->
          <!-- 测试看集成的vite2 iconify 是否好用 -->
          <C_Icon iconName="mdi-abugida-devanagari" outside />
        </ElButton>
        <!-- 提示信息 -->
        <!-- <div
          class="login-container-form-tips"
          v-html="$t('login.desc')"
        ></div> -->
      </template>
    </C_Form>
  </div>
</template>

<script lang="ts" setup>
import { s_userStore } from '_store/user/index'
import { d_ElMessage } from '_utils/d_tips'
import { OPTIONS } from './data'
import './index.scss'

const loading = ref(false)
const userStore = s_userStore()

// TODO: 下面全是自有方法 非组件及外部方法

const login = (formScope: any) => {
  const { form, model } = formScope
  form.validate((valid: boolean) => {
    if (valid) {
      // 触发登录动作
      loading.value = true
      userStore.getloginInfo(model)
    } else d_ElMessage('表单填写有误，请查看错误提示', 'error')
  })
}
</script>
