/*
 * @Author: ChenYu
 * @Date: 2022-04-06 13:46:43
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-06 15:54:53
 * @FilePath: \v3-el-components\src\axios\axios.d.ts
 * @Description: axios 申明文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}
