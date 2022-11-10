/*
 * @Author: ChenYu
 * @Date: 2022-04-13 09:40:40
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-13 19:10:41
 * @FilePath: \v3-el-components\src\components\C_Form\Effect.ts
 * @Description: 处理特殊情况 比如副作用
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

export const _dynamicAddType = (monitorVal, prop, options, index, addData) => {
  const saveOptions = JSON.parse(JSON.stringify(options.value))
  watch(
    () => monitorVal[prop],
    (val) => {
      addData.forEach((item) => {
        if (val === item.selectIndex.toString()) {
          _disposeNodeData(options, item.prop)
          options.value.splice(index + 1, 0, item)
          // TODO: 如果是单选操作，并且存在相互排它性，需要这样处理一下
          if (options.value.length - saveOptions.length > 1) {
            options.value.splice(index + 2, 1)
          }
        }
      })
    }
  )
}

const _disposeNodeData = (options, prop) => {
  options.value.forEach(function (item, index) {
    if (item.prop === prop) {
      options.value.splice(index, 1) // 删除这个重复的元素
    }
  })
}
