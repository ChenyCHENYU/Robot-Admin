<!--
 * @Description: 切换暗黑模式
 * @Author: Cheny ycyplus@gmail.com
 * @Date: 2022-12-13 17:33:22
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-13 17:37:05
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_SwitchDark\index.vue
 * Copyright (c) 2022 西安天智 AgileTeam by Cheny email: ycyplus@gmail.com, All Rights Reserved.
-->
<template>
  <el-switch
    v-model="themeConfig.isDark"
    @change="onAddDarkChange"
    inline-prompt
    active-color="#0a0a0a"
    inactive-color="#dcdfe6"
    :active-icon="Sunny"
    :inactive-icon="Moon"
  />
</template>

<script setup lang="ts" name="SwitchDark">
import { s_globalStore } from '@/store'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useTheme } from '_hooks/useTheme'
const globalStore = s_globalStore()

const { switchDark } = useTheme()

const themeConfig = computed(() => globalStore.themeConfig)

const onAddDarkChange = () => switchDark()
</script>
