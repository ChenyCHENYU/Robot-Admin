/*
 * @Author: 杨晨誉
 * @Date: 2022-03-30 10:32:18
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-24 16:34:41
 * @FilePath: \vue3_vite3_elementPlus_admin\.eslintrc.cjs
 * @Description: eslint配置
 *
 */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    'vue/no-multiple-template-root': ['off'],
    'vue/no-v-model-argument': ['off'],
    'vue/no-v-for-template-key': ['off'],
    'vue/no-mutating-props': ['off'],
    'vue/multi-word-component-names': ['off'],
    '@typescript-eslint/no-namespace': ['off'],
  },
  parser: 'vue-eslint-parser',
  plugins: ['vue', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
