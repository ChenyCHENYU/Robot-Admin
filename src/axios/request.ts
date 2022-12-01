/*
 * @Author: ChenYu
 * @Date: 2022-04-04 01:01:00
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-12-01 15:32:56
 * @FilePath: \vue3_vite3_elementPlus_admin\src\axios\request.ts
 * @Description: axios 封装
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { s_appStore } from '@/store/app'
import { s_userStore } from '@/store/user'
import { d_isCheckTimeout } from '@/utils/d_auth'
import axios from 'axios'
import { d_ElMessage } from '_utils/d_tips'

const { NODE_ENV, VITE_BASE_URL } = import.meta.env

const service = axios.create({
  baseURL: VITE_BASE_URL as string,
  timeout: 5000,
  headers: {
    'Content-type': 'application/json',
  },
})

// TODO: 请求拦截器
service.interceptors.request.use(
  (config) => {
    const { token, logout } = s_userStore()
    const { language } = s_appStore()
    // 在这里统一注入 token
    if (token) {
      // TODO: 被动退出验证，调用接口的过程中，判断是否超时, 超时了，就退出
      if (d_isCheckTimeout()) {
        logout()
        return Promise.reject(new Error('token 已过期, 为保证安全请重新登录'))
      }
      config.headers.Authorization = `Bearer${token}`
    }
    // TODO: 告知后台我获取的数据是什么语言类型
    config.headers['Accept-Language'] = language
    return config
  },
  (error) => Promise.reject(error)
)

// TODO: 响应拦截器
service.interceptors.response.use(
  // 请求成功
  (response) => {
    const { data } = response
    // 需要判断当前请求是否成功
    // 成功返回解析后的数据
    if (response.status == 200) return Promise.resolve(data)
    // 失败(请求成功，业务失败)，给出消息提示
    else {
      d_ElMessage('调用接口失败', 'error')
      return Promise.reject(new Error('错误的Message提示'))
    }
  },
  // 请求失败
  (error) => {
    const { logout } = s_userStore()
    // FIXME: 注意 token过期了，服务端通知，多了一个状态标识，具体和后端约定，目前预设多点登录，单点登录需要额外增加一个状态码，有业务需要跟后端再沟通
    if (error?.response?.data?.code === 401) {
      // 服务端告知后，被动退出
      logout()
    }
    d_ElMessage(error.message, 'error')
    return Promise.reject(new Error('响应拦截请求失败'))
  }
)

export default service
