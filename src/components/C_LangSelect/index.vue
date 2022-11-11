<!--
 * @Author: ChenYu
 * @Date: 2022-04-10 23:46:28
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-11 11:26:08
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_LangSelect\index.vue
 * @Description: 国际化语言选择组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElDropdown trigger="click" @command="handleSetLanguage" v-pointer>
    <span>
      <ElTooltip content="国际化" :effect="effect">
        <IconLanguage />
      </ElTooltip>
    </span>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="item of dropdownItemData"
          :key="item.language"
          :command="item.language"
          :disabled="item.language === activeVal"
        >
          {{ item.title }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { s_appStore } from '_store/app'
import { d_ElNotiy } from '_utils/d_tips'

const dropdownItemData = [
  {
    title: '中文',
    language: 'zh',
    activeVal: true,
  },
  {
    title: 'English',
    language: 'en',
  },
]

interface Props {
  effect?: 'dark' | 'light'
}

withDefaults(defineProps<Props>(), { effect: 'dark' })
const activeVal = ref('zh')
const appStore = s_appStore()
// 切换语言的方法
const i18n = useI18n()
i18n.locale.value = appStore.language
activeVal.value = appStore.language
const handleSetLanguage = (lang: any) => {
  // 切换 i18n 的 locale
  i18n.locale.value = lang
  // 修改 pinia 中保存的 language
  appStore.language = lang
  activeVal.value = lang
  // 缓存存储起来
  appStore.setLanguage(lang)
  d_ElNotiy(
    lang === 'en'
      ? 'Language switched to "English"'
      : '语言已切换为 "简体中文"',
    'success',
    '操作成功'
  )
}
</script>
