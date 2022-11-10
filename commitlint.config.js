/*
 * @Author: 杨晨誉
 * @Date: 2022-03-30 10:02:01
 * @LastEditors: 杨晨誉
 * @LastEditTime: 2022-03-30 10:02:16
 * @FilePath: \v3-el-components\commitlint.config.js
 * @Description:  husky + commitlint 检查提交描述是否符合规范要求配置
 * 
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build', // 打包
      ],
    ],
    // subject 大小写不做校验
    'subject-case': [0],
  },
}
