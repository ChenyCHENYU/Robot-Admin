/*
 * @Author: ChenYu
 * @Date: 2022-03-24 22:27:32
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-11 16:17:26
 * @FilePath: \v3-el-components\src\components\C_Table\renderSlot.ts
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
// table 组件数据结构 render的扩展

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RenderSlot',
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  render() {
    return this.render!(this)
  },
})
