/*
  需求：给整个页面添加背景水印。

  思路：
    1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
    2、将其设置为背景图片，从而实现页面或组件水印效果
  
  使用：设置水印文案，颜色，字体大小即可
  <div v-waterMarker="{text:'版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
*/

import type { Directive, DirectiveBinding } from 'vue'
// const addWaterMarker: Directive = (str: string, parentNode: any, font: any, textColor: string) => {
// 	// 水印文字，父元素，字体，文字颜色
// 	const can: HTMLCanvasElement = document.createElement("canvas");
// 	parentNode.appendChild(can);
// 	can.width = 205;
// 	can.height = 140;
// 	can.style.display = "none";
// 	const cans = can.getContext("2d") as CanvasRenderingContext2D;
// 	cans.rotate((-20 * Math.PI) / 180);
// 	cans.font = font || "16px Microsoft JhengHei";
// 	cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
// 	cans.textAlign = "left";
// 	cans.textBaseline = "Middle" as CanvasTextBaseline;
// 	cans.fillText(str, can.width / 10, can.height / 2);
// 	parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
// };
const addWaterMarker: Directive = (
  str: string,
  parentNode: any,
  font: any,
  textColor: string
) => {
  function createBase64(str: string) {
    const can = document.createElement('canvas')
    const width = 300
    const height = 240
    Object.assign(can, { width, height })
    const cans = can.getContext('2d')
    if (cans) {
      cans.rotate((-20 * Math.PI) / 120)
      cans.font = '15px Vedana'
      cans.fillStyle = 'rgba(0, 0, 0, 0.15)'
      cans.textAlign = 'left'
      cans.textBaseline = 'middle'
      cans.fillText(str, width / 20, height)
    }
    return can.toDataURL('image/png')
  }
  const el = parentNode
  el.style.position = 'relative'
  const { clientHeight: height, clientWidth: width } = el
  const div = document.createElement('div')
  div.style.pointerEvents = 'none'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.position = 'absolute'
  div.style.height = height + 'px'
  div.style.width = width + 'px'
  div.style.zIndex = '100000'
  div.style.font = font || '16px Microsoft JhengHei'
  div.style.color = textColor || 'rgba(180, 180, 180, 0.3)'
  div.style.background = `url(${createBase64(str!)}) left top repeat`
  el.appendChild(div)
}
const waterMarker = {
  mounted(el: DirectiveBinding, binding: DirectiveBinding) {
    addWaterMarker(
      binding.value.text,
      el,
      binding.value.font,
      binding.value.textColor
    )
  },
}

export default waterMarker
