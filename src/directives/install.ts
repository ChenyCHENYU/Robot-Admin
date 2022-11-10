/*
 * @Author: ChenYu
 * @Date: 2022-04-25 16:43:42
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-25 16:43:42
 * @FilePath: \v3-el-components\src\directives\install.ts
 * @Description: 通过install 注册的指令
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import print from 'vue3-print-nb'

export default (app) => {
  app.use(print)
}
