//水印
export const useWatermark = (appendEl: HTMLElement) => {
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
  const el = appendEl
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
  const setWatermark = (optstr?: string) => {
    div.style.background = `url(${createBase64(optstr!)}) left top repeat`
    el.appendChild(div)
  }
  const clear = () => {
    el.removeChild(div)
  }
  return { setWatermark, clear }
}
