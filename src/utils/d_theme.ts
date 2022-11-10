/*
 * @Author: ChenYu
 * @Date: 2022-04-16 17:03:19
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-17 23:49:30
 * @FilePath: \v3-el-components\src\utils\d_theme.ts
 * @Description: 处理主题配色的工具类
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import formula from '@/constant/formula.json'
import axios from 'axios'
import packageJson from '../../package.json'
// console.log('json =>', json.dependencies['element-plus'].replace(/\^/, ''))

/**
 * @description: 把生成的样式表写入到 style 中
 * @param {*}  elNewStyle  element-plus 的新样式
 * @param {*}  isNewStyleTag 是否生成新的 style 标签
 * @return {*}
 */

export const d_writeNewStyle = (elNewStyle) => {
  const style = document.createElement('style')
  style.innerText = elNewStyle
  document.head.appendChild(style)
}

/**
 * @description: 根据主题色，生成最新的样式表
 * @param {*} parimaryColor
 * @return {*}
 */
export const d_generateNewStyle = async (parimaryColor) => {
  // 1、根据主色生成色值表
  const colors = d_generateColors(parimaryColor)
  // 2、获取当前 element plus 的默认样式表，并且把需要进行替换的色值打上标记
  let cssText = await _getOriginalStyle()
  // 3、遍历生成的色值表，在默认样式表进行全局替换
  Object.keys(colors!).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors![key]
    )
  })
  return cssText
}

/**
 * @description: 根据主题色生成色值表
 * @param {*} primary
 * @return {*}
 */
export const d_generateColors = (primary) => {
  if (!primary) return
  const colors = { primary }

  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })

  return colors
}

// 获取当前 element plus 样式表
const _getOriginalStyle = async () => {
  const version = packageJson.dependencies['element-plus'].replace(/\^/, '')
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  // 把获取到的数据筛选为原样式模板
  return _getStyleTemplate(data)
}

// 将需要进行替换的色值打上标记
export const _getStyleTemplate = (data) => {
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9',
  }
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
