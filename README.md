<!--
 * @Author: ChenYu
 * @Date: 2022-03-07 13:54:34
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-05-06 16:31:31
 * @FilePath: \v3-el-components\README.md
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
-->

![logo](https://s2.loli.net/2022/04/06/s8hvH3redWzMw1Q.png)

## 介绍

一个使用 `vite` + `vue3` + `pinia` + `element-plus` + `typescript` 完整技术路线开发的项目，秒级开发更新启动、新的`vue3 composition api` 结合 `script setup`语法糖纵享丝滑般的开发体验、全新的 `pinia`状态管理器和优秀的设计体验（`1k`的 size）、`element+`无障碍过渡使用 UI 组件库 `element-plus`、安全高效的 `typescript`类型支持、代码规范验证、多级别的权限管理，提供开箱即可轻量级的中后台前端解决方案

## 推荐的 IDE 设置

- [VSCode](https://code.visualstudio.com/) + [Volar@0.34.11](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## 特性

- 🔥 **最新技术栈**：使用 **vue3**、**vite2**、**pinia** 等前端前沿技术开发
- ✨ **业务组件** 二次封装了多个常用的组件

- 🍍 **状态管理器**：`vue3`新秀 **Pinia**，犹如 `react zustand`般的体验，友好的 api 和异步处理
- 🏆 **开发语言**：政治正确 **TypeScript**
- 🎉 **UI 组件**：`element-plus`开发者无障碍过渡使用 **element-plus**，熟悉的配方熟悉的味道
- 🎨 **css 样式**：**scss** 、`postcss`
- 📖 **代码规范**：**Eslint**、**Prettier**、**Commitlint**
- 🔒 **权限管理**：页面级、菜单级、按钮级、接口级
- ✊ **依赖按需加载**：**unplugin-auto-import**，可自动导入使用到的`vue`、`vue-router`、`pinia`等依赖
- 💪 **组件按需导入**：**unplugin-vue-components**，无论是第三方 UI 组件还是自定义组件都可实现自动按需导入以及`TS`语法提示

## 前期准备和需要具备的能力

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Element-Plus](https://element-plus.org/) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 计划

- [ ] 完善主题换肤功能，集成 menu
- [ ] 引入 `tailwindcss`
- [ ] 集成 `node` 服务
- [ ] 完善环境变量配置 `.env.development`/`.env.production`

## 项目目录

```js
├── .husky                              // husky git hooks配置目录
    ├── _                               // husky 脚本生成的目录文件
    ├── commit-msg                      // commit-msg钩子，用于验证 message格式
    ├── pre-commit                      // pre-commit钩子，主要是和eslint配合
├── config                              // 全局配置文件
    ├── vite                            // vite 相关配置
    ├── constant.ts                     // 项目配置
├── dist                                // 默认的 build 输出目录
├── mock                                // 前端数据mock
├── public                              // vite项目下的静态目录
└── src                                 // 源码目录
    ├── api                             // 接口相关
    ├── assets                          // 公共的文件（如image、css、font等）
    ├── components                      // 项目组件
    ├── directives                      // 自定义 指令
    ├── enums                           // 自定义 常量（枚举写法）
    ├── hooks                           // 自定义 hooks
    ├── router                          // 路由
    ├── store                           // 状态管理器
    ├── utils                           // 工具库
    ├── views                           // 页面模块目录
        ├── login                       // login页面模块
        ├── ...
    ├── App.vue                         // vue顶层文件
    ├── auto-imports.d.ts               // unplugin-auto-import 插件生成
    ├── components.d.d.ts               // unplugin-vue-components 插件生成
    ├── main.ts                         // 项目入口文件
    ├── shimes-vue.d.ts                 // vite默认ts类型文件
    ├── types                           // 项目type类型定义文件夹
├── .editorconfig                       // IDE格式规范
├── .eslintignore                       // eslint忽略
├── .eslintrc                           // eslint配置文件
├── .gitignore                          // git忽略
├── .npmrc                              // npm配置文件
├── .prettierignore                     // prettierc忽略
├── .prettierrc                         // prettierc配置文件
├── index.html                          // 入口文件
├── LICENSE.md                          // LICENSE
├── package.json                        // package
├── pnpm-lock.yaml                      // pnpm-lock
├── postcss.config.js                   // postcss
├── README.md                           // README
├── tsconfig.json                       // typescript配置文件
└── vite.config.ts                      // vite
```

## 效果图

![vite-vue3-3](https://s2.loli.net/2022/05/06/fqMxPiCcubHo7X3.png)

![vite-vue3-4](https://s2.loli.net/2022/05/06/u23jAEvRJYeVNUk.png)

## 安装使用

- 获取项目代码 - 需要天智前端团队授权

```bash
git clone https://gitee.com/ycyplus163/v3-el-components.git
```

- 安装依赖

```bash
cd v3-el-component

yarn install  |  npm install

```

- 运行

```bash
yarn dev | npm run dev
```

- 打包

```bash
yarn build | npm run dev
```

## 更新日志

暂无

## 项目地址

- [vue3-admin](https://) - 完整版

## 如何贡献

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE 如使用 IE 请升级 Edge

## 架构中使用的相关仓库

如果这些插件你认为不错并对你有帮助，可以给相关作者一个 star 支持下

- [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock) - 用于本地及开发环境数据 mock
- [vite-plugin-html](https://github.com/anncwb/vite-plugin-html) - 用于 html 模版转换及压缩
- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) - 用于组件库样式按需引入
- [vite-plugin-theme](https://github.com/anncwb/vite-plugin-theme) - 用于在线切换主题色等颜色相关配置
- [vite-plugin-imagemin](https://github.com/anncwb/vite-plugin-imagemin) - 用于打包压缩图片资源
- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression) - 用于打包输出.gz|.brotil 文件
- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons) - 用于快速生成 svg 雪碧图

## 感谢开源作者的启发和借鉴 @Vben @Archer
