<!--
 * @Author: ChenYu
 * @Date: 2022-03-07 13:54:34
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-10 21:32:16
 * @FilePath: \vue3_vite3_element-plus_admin\README.md
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
-->

<p align="center" >
     <img src="https://cheny-chenyu.oss-cn-chengdu.aliyuncs.com/img/robot-left.png" />
</p>

## 介绍

**Robot Admin** 是一个使用 `vite` + `vue3` + `pinia` + `element-plus` + `typescript` 完整技术路线开发的项目，秒级开发更新启动、新的`vue3 composition api` 结合 `script setup`语法糖纵享丝滑般的开发体验、全新的 `pinia`状态管理器和优秀的设计体验（`1k`的 size）、`element+`无障碍过渡使用 UI 组件库 `element-plus`、安全高效的 `typescript`类型支持、代码规范验证、多级别的权限管理，提供开箱即用轻量级的中后台解决方案，希望通过聚焦业务场景，结合有限的 `ElementPlus` ui 框架，将基础组件封装成通用的业务组件，把通用的功能通过配置生成，可以尽量少的去写一些代码，更聚焦和关注实际的业务逻辑实现。

## 推荐的 IDE 和配置

- [VSCode](https://code.visualstudio.com/) 后续我会把插件配置集成在项目代码中，便于大家直接下载使用。

## 特性

- 🔥 **最新技术栈**：使用 **vue3**、**vite3**、**pinia** 等前端前沿技术开发
- ✨ **业务组件** 二次封装了多个常用的组件
- 🍍 **状态管理器**：`vue3`新秀 **Pinia**，犹如 `react zustand`般的体验，友好的 api 和异步处理，官方推荐下一代的 `VueX`
- 🏆 **开发语言**：拥抱 **TypeScript**，为团队协作更好的去赋能
- 🎉 **UI 组件**：`element-plus`开发者无障碍过渡使用 **element-plus**，熟悉的配方熟悉的味道，当然，还有些许的情怀
- 🎨 **css 样式**：**scss** 、`postcss`
- 📖 **代码规范**：**Eslint**、**Prettier**、**Commitlint**
- 🔒 **权限管理**：页面级、菜单级、按钮级、接口级
- ✊ **依赖按需加载**：**unplugin-auto-import**，可自动导入使用到的`vue`、`vue-router`、`pinia`等依赖
- 💪 **组件按需导入**：**unplugin-vue-components**，无论是第三方 UI 组件还是自定义组件都可实现自动按需导入以及`TS`语法提示
- 🌟 **面向业务场景的组件封装** ：我觉得这是比较棒的一个点，更方便的大家低代码的使用，这一块会持续完善拓展，当然，如果有幸，可以 x 吸引您可以加入进来一起玩，那就更棒了

## 前期准备和需要具备的能力

- [Node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 `vite` 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 `Vue` 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 `es6` 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Pinia](https://pinia.vuejs.org/) - 熟悉 `Pinia` 基本使用
- [Element-Plus](https://element-plus.org/) - `ui` 框架的基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - `mockjs` 基本语法

## 项目目录

```js
vue3_vite3_elementPlus_admin
├─ .cz-config.js
├─ .env
├─ .env.development
├─ .env.production
├─ .eslintrc-auto-import.json
├─ .eslintrc.cjs
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
├─ .gitignore
├─ .husky
│  ├─ commit-msg
│  ├─ pre-commit
│  └─ _
│     ├─ .gitignore
│     └─ husky.sh
├─ commitlint.config.js
├─ components.d.ts
├─ index.html
├─ LICENSE
├─ package.json
├─ pnpm-lock.yaml
├─ public                      // 不被构建的资源文件
├─ README.md
├─ src
│  ├─ api                      // 请求接口文件
│  ├─ App.vue
│  ├─ assets                   // 静态资源文件
│  ├─ auto-imports.d.ts
│  ├─ axios
│  ├─ components
│  │  ├─ icons                 // svgIcon
│  │  ├─ lib                   // 库
│  ├─ components.d.ts
│  ├─ constant                 // 全局常量
│  ├─ directives               // 全局指令
│  ├─ env.d.ts
│  ├─ hooks                    // 全局钩子函数
│  ├─ interface                // 全局接口
│  ├─ locales                  // 中英文
│  ├─ main.ts                  // 入口文件
│  ├─ permission.ts            // 路由守卫
│  ├─ router                   // 路由文件
│  ├─ store                    // 状态管理 Pinia
│  ├─ styles                   // 全局样式
│  ├─ types                    // 全局类型申明
│  │  └─ global.d.ts
│  ├─ utils                    // 工具函数
│  └─ views                    // 视图文件
├─ tsconfig.config.json
├─ tsconfig.json               // ts 配置文件
├─ tsconfig.node.json
└─ vite.config.ts              // vite 配置文件

```

## 项目预览图

![login](https://cheny-chenyu.oss-cn-chengdu.aliyuncs.com/robot-adminlogin.png)

![table](https://cheny-chenyu.oss-cn-chengdu.aliyuncs.com/robot-admintable.png)

更多界面请访问项目查看，目前请拉代码到本地查看功能，后续会集成部署到线上。

## 已完成功能 | The functionality is complete

- [x] Element Plus
- [x] N+1 多级菜单
- [x] Dashboard
- [x] 表格
- [x] router Tab 选项卡
- [x] 表单
- [x] 图表 :antv or echart
- [x] 导入导出 Excel
- [x] 导出 Zip 文件
- [x] 拖拽组件
- [x] 富文本编辑器
- [x] markdown 编辑器
- [x] code JSON 编辑器
- [x] 个人页
- [x] 登录/注册页
- [x] 404 / 403 / 401
- [x] 菜单管理
- [x] 角色管理
- [x] 自定义图标
- [x] 拖拽组件
- [x] 支持切换主题色:一键换肤
- [x] 自定义指令
- [x] 国际化
- [x] 项目看板

## 计划

- [ ] 完善主题功能集成
- [ ] 考虑引入 `windicss`
- [ ] 集成 `nest` 服务
- [ ] 完善环境配置 `.env.development`/`.env.production`
- [ ] 面向业务场景组件的持续扩展，文档同步更新
- [ ] ... 还有更多畅想 ...

## 工程化 | Project Tool

- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- 代码规范：[Prettier](https://prettier.io/) + [ESLint](https://eslint.org/)
- 提交规范：[Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/)
- 包管理器：[pnpm](https://github.com/pnpm/pnpm)

## 安装使用 | 快速启动

:bell: 推荐使用 pnpm 进行依赖管理

```bash
# 克隆项目

git clone https://github.com/ChenyCHENYU/Robot-Admin.git

# 进入项目

cd Robot Admin

# 安装依赖 (建议 pnpm )

pnpm install | pnpm i

# 运行

pnpm dev

# 打包构建

pnpm build

```

## git 提交 | git commit

     git add *  // add everything

     git status  // check status

     git cz  // commit change

     git push // push stage commit

    // 如果cz 命令无法找到，全局安全commitize
     npm install -g commitizen

## 更新日志

后续完善...

## 项目地址

线上地址后续部署发布，目前查看功能请拉取代码到本地

- [Robot Admin](https://www.tzagileteam.com) - 项目文档

## 🤝 如何贡献 | Contributing

期待优秀的您加入，或者获取到您宝贵的建议和经验，

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `wip` 开发中
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

## 浏览器支持

推荐使用`webkit`内核浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                             not support                                                                                              |                                                                                            last 2 versions                                                                                             |                                                                                                  last 2 versions                                                                                                  |                                                                                                last 2 versions                                                                                                |                                                                                                last 2 versions                                                                                                |

### ❓ 问题 | Issue

Contributions, issues and feature requests are welcome!.
<br />Feel free to check [issues page](https://github.com/chenyCHENYU/Robot-Admin/issues).

欢迎提 Issues

## 架构中使用的相关仓库

如果这些插件你认为不错并对你有帮助，可以给相关作者一个 star 支持下

- [vite-plugin-vue-setup-extend](https://github.com/vbenjs/vite-plugin-vue-setup-extend) - 扩展 setup 语法糖
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - 自动按需引入组件，替代手动封装的方式，性能更好
- [unplugin-icons](https://github.com/antfu/unplugin-icons) - 处理外部图标库图标的自动引入
- [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock) - 用于本地及开发环境数据 mock
- [vite-plugin-html](https://github.com/anncwb/vite-plugin-html) - 用于 html 模版转换及压缩
- [vite-plugin-theme](https://github.com/anncwb/vite-plugin-theme) - 用于在线切换主题色等颜色相关配置
- [vite-plugin-imagemin](https://github.com/anncwb/vite-plugin-imagemin) - 用于打包压缩图片资源
- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression) - 用于打包输出.gz|.brotil 文件
- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons) - 用于快速生成 svg 雪碧图

**Robot Admin** 是完全开源免费的项目，项目还在持续完善中，如果您觉得还不错，请 **Star、Fork、Watch** 一键三连 🎉🎉🎉，如果有好的想法和建议，欢迎您通过 [ycyplus@gmail.com](https://mail.google.com/mail) 跟我取得联系。

## 感谢优秀开源作者的启发和借鉴 @Vben @Archer @HalseySpicy， 同时感谢 @lili 的贡献
