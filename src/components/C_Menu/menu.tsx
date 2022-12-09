/*
 * @Author: ChenYu
 * @Date: 2022-03-14 01:11:57
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 16:55:35
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Menu\menu.tsx
 * @Description: tsx 方式封装 无限极 menu组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import C_Icon from '_c/C_Icon/index.vue'
import { VUE_OPTIONS } from './options'
import type { I_MenuItem } from './types'
// import { s_themeStore } from '_store/theme'

// TODO: 处理要渲染的菜单
function useRenderMenuEffect(menuData: I_MenuItem[]) {
  return menuData.map((item: I_MenuItem) => {
    const { path, children, meta, name } = item
    //TODO: 处理submenu的插槽  插槽实现 #title层级的 DOM
    const slots = {
      title: () => {
        return (
          <>
            <C_Icon v-show={meta?.icon} iconName={meta?.icon} outside />
            {/* 需要路由中英文的时候，再开启或者直接在路由文件配置英文信息再启用 */}
            {/* <span>{name ? t(`route.${name}`) : meta.title}</span> */}
            <span>{meta.title}</span>
          </>
        )
      },
    }
    //TODO: 递归选择children
    if (children && children.length > 1 && !meta?.hidden) {
      return (
        <ElSubMenu index={path} v-slots={slots}>
          {useRenderMenuEffect(children)}
        </ElSubMenu>
      )
    }
    //TODO: 正常渲染普通的菜单
    if (!meta?.hidden) {
      return (
        <ElMenuItem index={path}>
          <C_Icon v-show={meta?.icon} iconName={meta?.icon} outside />
          {/* 需要路由中英文的时候，再开启或者直接在路由文件配置英文信息再启用 */}
          {/* <span>{name ? t(`route.${name}`) : meta.title}</span>   */}
          <span>{meta.title}</span>
        </ElMenuItem>
      )
    }
  })
}

export default defineComponent({
  ...VUE_OPTIONS,
  setup(props) {
    const route = useRoute()
    const activeMenu = () => {
      const { meta, path } = route
      if (meta.activeMenu) return meta.activeMenu
      return path
    }

    // const themeStore = s_themeStore()
    // background-color={themeStore.changeCssVar.menuBg}
    // text-color={'#ffffff'}
    // active-text-color={themeStore.changeCssVar.menuActiveText}
    return () => (
      <ElMenu defaultActive={activeMenu() as string} router={props.router}>
        {useRenderMenuEffect(props.MENU_DATA!)}
      </ElMenu>
    )
  },
})
