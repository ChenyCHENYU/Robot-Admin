/*
 * @Author: 杨晨誉
 * @Date: 2022-03-25 09:25:48
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 15:20:55
 * @FilePath: \vue3_vite3_elementPlus_admin\src\directives\index.ts
 * @Description: 指令全局注册
 *
 */

import type { App } from 'vue'
import copy from './modules/copy'
import debounce from './modules/debounce'
import draggable from './modules/draggable'
import longpress from './modules/longpress'
import throttle from './modules/throttle'
import waterMarker from './modules/waterMarker'

// TODO: 节流锁
const lock = {
  mounted(el: any, binding: any) {
    el.addEventListener('click', () => {
      el.classList.add('is-disabled')
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
        el.classList.remove('is-disabled')
      }, binding.value || 2000)
    })
  },
}
const pointer = {
  mounted(el: any, binding: any) {
    el.style.cursor = binding.value || 'pointer'
  },
}

const directivesList: any = {
  // Custom directives
  copy,
  waterMarker,
  draggable,
  debounce,
  throttle,
  longpress,
  lock,
  pointer,
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) =>
      // 注册所有自定义指令
      app.directive(key, directivesList[key])
    )
  },
}

export default directives
