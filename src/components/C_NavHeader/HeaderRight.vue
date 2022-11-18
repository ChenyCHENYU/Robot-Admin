<!--
 * @Author: ChenYu
 * @Date: 2022-04-06 17:18:01
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-18 19:32:19
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_NavHeader\HeaderRight.vue
 * @Description: Header组件右侧区域
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="header-right">
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
    <!-- <ElIconTools class="header-right-tools" />   -->
  </div>
</template>

<script lang="ts" setup>
import { s_userStore } from '@/store/user/index'
import { d_ElMessageBox } from '@/utils/d_tips'

const {
  userInfo: { avatar, username },
  logout,
} = s_userStore()

const clickLogout = () => d_ElMessageBox(logout, null, '确定要退出登录吗?')
</script>
<style lang="scss">
.header-right {
  display: flex;
  justify-content: right;
  .username {
    padding-top: 16px;
    margin-right: 14px;
  }
  svg {
    margin-top: 1em;
    margin-right: 12px;
    width: 1em;
    height: 1em;
  }

  &-tools {
    margin-left: 12px;
  }
}
</style>
a
