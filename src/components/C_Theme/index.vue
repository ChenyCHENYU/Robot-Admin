<!--
 * @Author: ChenYu
 * @Date: 2022-04-16 09:39:22
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-18 09:01:10
 * @FilePath: \v3-el-components\src\components\C_Theme\index.vue
 * @Description: 主题组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElDropdown v-bind="$attrs" trigger="click" @command="handleSetTheme">
    <div v-pointer>
      <ElTooltip :content="$t('navBar.themeChange')">
        <C_Icon iconName="change-theme" isCustomIcon style="margin-top: 4px" />
      </ElTooltip>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem command="color">{{
          $t('theme.themeColorChange')
        }}</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
  <!-- 弹出层 -->
  <div>
    <SelectColor v-model="selectColorVisible" />
  </div>
</template>

<script lang="ts" setup>
const selectColorVisible = ref(false)
const handleSetTheme = (command) => {
  selectColorVisible.value = true
}
</script>
