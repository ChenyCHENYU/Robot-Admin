/*
 * @Author: ChenYu
 * @Date: 2022-03-20 23:10:04
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-16 09:53:35
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Form\types\types.ts
 * @Description: 配置表单的类型约束
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import type { ValidateFieldsError } from 'async-validator'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import type { CSSProperties } from 'vue'
import type { RuleItem } from './rule'
// TODO: 表单每一项的配置选项
export interface I_FormOptions {
  // 表单显示的组件元素 根据实际情况 +++++
  type:
    | 'cascader'
    | 'checkbox'
    | 'checkbox-group'
    | 'checkbox-button'
    | 'color-picker'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'radio'
    | 'radio-group'
    | 'radio-button'
    | 'rate'
    | 'select'
    | 'option'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'
    | 'editor'
  // 表单项的值
  value?: any // 因为upload中没有value
  // 表单label
  label?: string
  // 表单的标识
  prop?: string
  // 表单项的验证规则
  rules?: RuleItem[]
  // 表单相占位符，默认提示语
  placeholder?: string
  // 表单元素特有的属性, 暂时为 any
  attrs?: {
    clearable?: boolean
    showPassword?: boolean
    disabled?: boolean
    prefixIcon?: string
    // css类名样式 和 style行内样式
    className?: string
    style?: CSSProperties
    activeText?: string
    inactiveText?: string
    inlinePrompt?: boolean
  }
  // 表单项的子元素
  children?: I_FormOptions[]
  // 处理上传组件的属性和方法
  uploadAttrs?: {
    action: string
    headers?: object
    method?: 'post' | 'put' | 'patch'
    multiple?: boolean
    data?: any
    name?: string
    withCredentials?: boolean
    showFileList?: boolean
    drag?: boolean
    accept?: string
    thumbnailMode?: boolean
    fileList?: UploadFile[]
    listType?: 'text' | 'picture' | 'picture-card'
    autoUpload?: boolean
    disabled?: boolean
    limit?: number
  }
  // TODO: 动态选择表单配置项
  selectValue?: string[] // 选择性动态表单，选择的哪一个
  for?: string // 选择组件和动态添加的组件产生的唯一关联同字段
  show?: boolean // 默认是否显示，默认为 false
}

export interface I_ValidateFieldCallback {
  (message?: string, invalidFields?: ValidateFieldsError): void
}

// TODO: ElementPlus 中对于 Form的类型约束
export interface I_FormInstance {
  registerLabelWidth(width: number, oldWidth: number): void
  deregisterLabelWidth(width: number): void
  autoLabelWidth: string | undefined
  emit: (evt: string, ...args: any[]) => void
  labelSuffix: string
  inline?: boolean
  model?: Record<string, unknown>
  size?: string
  showMessage?: boolean
  labelPosition?: string
  labelWidth?: string
  rules?: Record<string, unknown>
  statusIcon?: boolean
  hideRequiredAsterisk?: boolean
  disabled?: boolean
  validate: (callback?: Callback) => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void
}
