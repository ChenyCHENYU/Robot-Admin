<!--
 * @Author: ChenYu
 * @Date: 2022-04-06 17:18:01
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 21:29:26
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_NavHeader\HeaderRight.vue
 * @Description: Header组件右侧区域
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="header-right">
    <!-- 通知组件 -->
    <div class="notice">
      <C_Notice value="12">
        <template #default>
          <C_List
            @e_clickItem="e_clickItem"
            @e_clickAction="e_clickAction"
            :LIST="LIST"
            :ACTIONS="ACTIONS"
          />
        </template>
      </C_Notice>
    </div>
    <div class="header-right-compoent">
      <!-- 功能引导 -->
      <C_Guide />
      <!-- 是否全屏 -->
      <ElTooltip content="全屏">
        <C_ScreenFull v-pointer />
      </ElTooltip>
      <!-- 快捷搜索 -->
      <ElTooltip content="快捷搜索">
        <C_HeaderSearch v-pointer />
      </ElTooltip>
      <C_Theme class="right-menu-item hover-effect" />
      <!-- 国际化选择 -->
      <C_LangSelect />
      <!-- 右侧点击按钮 -->
      <ElDropdown trigger="hover" size="small">
        <div style="display: flex" v-pointer>
          <ElAvatar
            icon="el-icon-user"
            shape="circle"
            fit="cover"
            :src="avatar"
            :size="26"
            style="margin-top: 6px; margin-right: 4px"
          />
          <div class="username">{{ username }}</div>
        </div>

        <template #dropdown>
          <ElDropdownMenu class="user-droup">
            <RouterLink to="/">
              <ElDropdownItem icon="el-icon-home-filled">首页</ElDropdownItem>
            </RouterLink>
            <ElDropdownItem
              icon="el-icon-circle-close-filled"
              @click="clickLogout"
              >退出登录
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { s_userStore } from '_store/user'
import { d_Logout } from '_utils/d_tips'
import { ACTIONS, LIST } from './data'
import './index.scss'

const e_clickItem = (val: any) => console.log(val)
const e_clickAction = (val: any) => console.log(val)

const {
  userInfo: { avatar, username },
  logout,
} = s_userStore()

const clickLogout = () => d_Logout(logout, null, '确定要退出登录吗?')
</script>
