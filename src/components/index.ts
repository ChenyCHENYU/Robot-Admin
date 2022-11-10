/*
 * @Author: 杨晨誉
 * @Date: 2022-03-08 13:35:22
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-02 12:28:59
 * @FilePath: \v3-el-components\src\components\index.ts
 * @Description: 导入并注册所有的组件
 *
 */

// FIXME: 注意，此处封装已弃用，现使用 vite2官方提供的插件解决全局按需注册的问题，性能更好
import { App } from 'vue'

const COMPONENTS: any[] = []

const COMPONENT_DIR_VUE_FILE = import.meta.globEager(
  '../components/*/*index.vue'
)

Object.entries(COMPONENT_DIR_VUE_FILE).forEach(([comPath, module]) => {
  COMPONENTS.push({
    install(app: App) {
      app.component(comPath.split('/')[2], module.default)
    },
  })
})

export default {
  install(app: App) {
    COMPONENTS.map((item) => app.use(item))
  },
}
