/*
 * @Author: ChenYu
 * @Date: 2022-04-10 23:12:54
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-12 00:28:09
 * @FilePath: \v3-el-components\src\types\globle.d.ts
 * @Description: 全局申明文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

declare function $t(key: string, params?: any): string
declare function defineProps<T extends Record<string, any>>(obj?: any): T
declare function withDefaults<T>(
  props: T,
  defaults: { [P in keyof T]?: T[P] | (() => T[P]) }
): T
declare function defineEmits<T extends { (e: string, ...args: any[]): void }>(
  event?: string[]
): (e: string, ...args: any[]) => void
declare function defineExpose(obj: any): void
