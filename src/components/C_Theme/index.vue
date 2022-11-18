<!--
 * @Author: ChenYu
 * @Date: 2022-04-16 09:39:22
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-18 19:33:16
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Theme\index.vue
 * @Description: 主题组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElDropdown
    v-bind="$attrs"
    trigger="hover"
    @command="handleSetTheme"
    size="small"
  >
    <div v-pointer>
      <IconTheme />
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
const handleSetTheme = (command) => (selectColorVisible.value = true)
</script>
