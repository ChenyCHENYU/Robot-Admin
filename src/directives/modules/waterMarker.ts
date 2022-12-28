/*
  需求：给整个页面添加背景水印。

  思路：
    1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
    2、将其设置为背景图片，从而实现页面或组件水印效果
    3、监听新旧父元素宽高，让水印填充满
  使用：
  text-水印文案
  textColor-水印颜色
  font-水印字体
  textXGap-水印水平密度
  textYGap-水印垂直密度
  <div v-waterMarker="{
    text:'版权所有',
    textColor:'rgba(180, 180, 180, 0.4)'}
    font:'12px Vedana'}
    textXGap:300}
    textYGap:150}
     "></div>
*/

import type { DirectiveBinding } from 'vue'
function createBase64(
  str: string,
  textSize: number,
  textColor: string,
  textXGap: number,
  textYGap: number
) {
  const can = document.createElement('canvas')
  const width = textXGap || 300
  const height = textYGap || width / 3
  Object.assign(can, { width, height })
  const cans = can.getContext('2d')
  if (cans) {
    cans.rotate((-20 * Math.PI) / 120)
    cans.font = textSize + 'px Microsoft JhengHei' || '16px Microsoft JhengHei'
    cans.fillStyle = textColor || 'rgba(0, 0, 0, 0.15)'
    cans.textAlign = 'left'
    cans.textBaseline = 'middle'
    cans.fillText(str, width / 10, height)
  }
  return can.toDataURL('image/png')
}
const addWaterMarker = (
  str: string,
  parentNode: any,
  textSize: number,
  textColor: string,
  textXGap: number,
  textYGap: number
) => {
  const el = parentNode
  const waterMarkerlist = document.getElementsByClassName('waterMarker-box')
  if (waterMarkerlist.length) {
    for (let i = 0; i < waterMarkerlist.length; i++) {
      el.removeChild(waterMarkerlist[i])
    }
  }
  el.style.position = 'relative'
  const { clientHeight: height, clientWidth: width } = el
  const div = document.createElement('div')
  div.style.pointerEvents = 'none'
  div.className = 'waterMarker-box'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.position = 'absolute'
  div.style.height = height + 'px'
  div.style.width = width + 'px'
  div.style.zIndex = '100000'
  div.style.background = `url(${createBase64(
    str,
    textSize,
    textColor,
    textXGap,
    textYGap
  )}) left top repeat`
  el.appendChild(div)
}
const waterMarker = {
  mounted(el: any, binding: DirectiveBinding) {
    let width = '',
      height = ''
    function isReize() {
      const style = document.defaultView.getComputedStyle(el)
      if (width !== style.width || height !== style.height) {
        addWaterMarker(
          binding.value.text,
          el,
          binding.value.textSize,
          binding.value.textColor,
          binding.value.textXGap,
          binding.value.textYGap
        )
      }
      width = style.width
      height = style.height
    }
    el.__vueSetInterval__ = setInterval(isReize, 300)
  },
}

export default waterMarker
