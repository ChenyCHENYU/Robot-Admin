/*
 * @Description: 处理一些全局 State
 * @Author: Cheny ycyplus@gmail.com
 * @Date: 2022-12-12 11:46:51
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-12 18:13:49
 * @FilePath: \vue3_vite3_elementPlus_admin\src\store\index.ts
 * Copyright (c) 2022 西安天智 AgileTeam by Cheny email: ycyplus@gmail.com, All Rights Reserved.
 */

import piniaPersistConfig from '@/config/piniaPersist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { I_GlobalState, I_ThemeConfigProps } from './types'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const s_globalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'globalState',
  // state: 返回对象的函数
  state: (): I_GlobalState => ({
    // element组件大小
    assemblySize: 'default',
    // language
    language: '',
    // themeConfig
    themeConfig: {
      // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
      layout: 'columns',
      // 默认 primary 主题颜色
      primary: '#009688',
      // 深色模式
      isDark: false,
      // 灰色模式
      isGrey: false,
      // 色弱模式
      isWeak: false,
      // 折叠菜单
      isCollapse: false,
      // 面包屑导航
      breadcrumb: true,
      // 面包屑导航图标
      breadcrumbIcon: true,
      // 标签页
      tabs: true,
      // 标签页图标
      tabsIcon: true,
      // 页脚
      footer: true,
      // 当前页面是否全屏
      maximize: false,
    },
  }),
  getters: {},
  actions: {
    // setToken
    setToken(token: string) {
      this.token = token
    },
    // setUserInfo
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    // setAssemblySizeSize
    setAssemblySizeSize(assemblySize: string) {
      this.assemblySize = assemblySize
    },
    // updateLanguage
    updateLanguage(language: string) {
      this.language = language
    },
    // setThemeConfig
    setThemeConfig(themeConfig: I_ThemeConfigProps) {
      this.themeConfig = themeConfig
    },
  },
  persist: piniaPersistConfig('GlobalState'),
})

// piniaPersist(持久化)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
