/*
 * @Author: 杨晨誉
 * @Date: 2022-03-25 09:25:48
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-21 23:08:51
 * @FilePath: \vue3_vite3_element-plus_admin\src\directives\index.ts
 * @Description: 指令全局注册
 *
 */

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

export const directives = {
  lock,
  pointer,
}
