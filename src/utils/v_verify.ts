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
/**
 * @description: 手机号码校验
 */
export const v_mobile = (title: string) => {
  const regs =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  const verify = {
    required: true,
    validator: (_rule: InternalRuleItem, value: any) => {
      value = value.replace(/\s/g, '')
      if (!value || value.length == 0) {
        return Promise.reject(`请填写${title}`)
      } else {
        if (!regs.test(value)) {
          return Promise.reject(`${title}格式不正确`)
        } else {
          return Promise.resolve()
        }
      }
    },
  }
  return _disposeVerifyHook(verify)
}
/**
 * @description: 银行卡号校验
 */
export const v_bankcardno = () => {
  const regs = /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/
  const verify = {
    required: true,
    validator: (_rule: InternalRuleItem, value: any) => {
      value = value.replace(/\s/g, '')
      if (!value || value.length == 0) {
        return Promise.reject('请填写银行卡号')
      } else {
        if (!regs.test(value)) {
          return Promise.reject('银行卡号不正确')
        } else {
          return Promise.resolve()
        }
      }
    },
  }
  return _disposeVerifyHook(verify)
}
/**
 * @description: 身份证校验
 */
export const v_idcard = () => {
  const regs = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  const verify = {
    required: true,
    validator: (_rule: InternalRuleItem, value: any) => {
      value = value.replace(/\s/g, '')
      if (!value || value.length == 0) {
        return Promise.reject('请填写身份证')
      } else {
        if (!regs.test(value)) {
          return Promise.reject('身份证不正确')
        } else {
          return Promise.resolve()
        }
      }
    },
  }
  return _disposeVerifyHook(verify)
}
