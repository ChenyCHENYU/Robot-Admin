/*
 * @Description:
 * @Author: Cheny ycyplus@gmail.com
 * @Date: 2022-12-12 11:58:12
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-12 11:58:30
 * @FilePath: \vue3_vite3_elementPlus_admin\src\config\piniaPersist.ts
 * Copyright (c) 2022 西安天智 AgileTeam by Cheny email: ycyplus@gmail.com, All Rights Reserved.
 */
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'

/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: window.localStorage,
    // storage: window.sessionStorage,
    paths,
  }
  return persist
}

export default piniaPersistConfig
