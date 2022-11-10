/*
 * @Author: ChenYu
 * @Date: 2022-03-21 09:46:54
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-10 13:23:32
 * @FilePath: \vue3_vite3_elementPlus_admin\src\utils\v_verify.ts
 * @Description: 校验规则
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import type { InternalRuleItem, RuleItem } from '_c/C_Form/types/rule'

// TODO: 内部方法，仅用来处理校验函数剔除 [{}]的冗余写法hook
const _disposeVerifyHook = (obj: RuleItem) => {
  const target: RuleItem[] = []
  target.push(obj as never)
  return target
}

//TOOD: 非空判断
export const v_required = (title: string) => {
  const verify = {
    required: true,
    validator: (_rule: InternalRuleItem, value: any) => {
      if (!value) return Promise.reject(`${title}`)
      else return Promise.resolve()
    },
  }
  return _disposeVerifyHook(verify)
}

export const v_username = (title: string) => {
  const verify = {
    required: true,
    validator: (_rule: InternalRuleItem, value: any) => {
      if (!value || value.length == 0) {
        return Promise.reject(`${title}`)
      } else {
        return Promise.resolve()
      }
    },
  }
  return _disposeVerifyHook(verify)
}
