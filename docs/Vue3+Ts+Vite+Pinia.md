# Vue3-Ts-Pinia-Naive-ui

## 前言

这是一个基于 Vue3+Vite+TS+Pinia+naive-ui 开发的可适用于多人配合开发的大型项目的基础开发模板。
紧跟前端工程化理念，提取公用模块，组件、拆分 css，js 实现功能独特性，代码复用性。便于维护。缩减开发时间。解放生产力。

## 构建项目

```js
yarn create vite
```

## 安装依赖

```js
yarn add -S vue-router axios pinia naive-ui nprogress js-cookie
yarn add -D sass dart-sass fast-glob vite-plugin-svg-icons
```

## 在 src 下创建文件夹

views 页面

router 路由

apis 接口

store 状态

utils 工具

assets 静态文件

## eslink、prettier 实现代码规范检查

[参考文档](https://blog.csdn.net/m0_37873510/article/details/128692295?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522167944801216800227444359%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=167944801216800227444359&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-4-128692295-null-null.142^v75^insert_down38,201^v4^add_ask,239^v2^insert_chatgpt&utm_term=vue3%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83&spm=1018.2226.3001.4187)

### eslint

1.1 yarn add eslint -D // 安装依赖

1.2 yarn eslint --init // 初始化 eslint

```js
  ? How would you like to use ESLint? ...
  To check syntax and find problems

  ? What type of modules does your project use? ...
  JavaScript modules (import/export)

  ? Which framework does your project use? ...
  Vue.js

  ? Does your project use TypeScript? » No / Yes
  Yes

  ? Where does your code run? ... (用空格选中两个，回车确定)
  √ Browser
  √ Node

  ? What format do you want your config file to be in? ...
  JavaScript

  The config that you've selected requires the following dependencies:
  eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
  ? Would you like to install them now?
  yes
```

1.3 完成后项目根目录出现 eslint 的配置文件 .eslintrc.cjs，更改配置如下

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  // 配置解析vue文件
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  // 添加规则
  rules: {
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: true,
        types: {
          "{}": false,
        },
      },
    ],
  },
};
```

1.4 packae.json 添加命令 "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix"

```js
 "scripts": {
 	// 执行该命令eslint会检测当前项目下所有的.vue,.js,.ts,.jsx,.tsx文件是否符合eslint的代码规范，并尝试自动修复
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix"
  }
```

### prettier

1.1 yarn add prettier -D

1.2 创建.prettierrc.cjs

```js
// prettier的默认配置文件
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 不尾随分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 多行逗号分割的语法中，最后一行不加逗号
  trailingComma: "none",
  // 单个参数的箭头函数不加括号 x => x
  arrowParens: "avoid",
  // 对象大括号内两边是否加空格 { a:0 }
  bracketSpacing: true,
};
```

1.3 vscode 安装插件 ESLint、prettiter-code formatter

ESLint: 安装这个插件，它会自动查找项目中的 ESlint 规则，给出验证提示，ESlint 也可以对代码进行格式化

Prettier - Code formatter：安装这个插件对代码进行格式化，但并不关注代码质量潜在问题的检查

1.4 打开：File -> Preferences -> Settings -> 在 settings.json 中编辑

```js
{
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  // 每次保存的时候自动格式化
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    // 使用eslint来fix，包括格式化会自动fix和代码质量检查会给出错误提示
    "source.fixAll.eslint": true
  },
  // 把prettier设置为vscode默认的代码格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // vue文件的默认格式化工具选择prettier
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}

```

### 解决冲突

1.1 yarn add eslint-config-prettier eslint-plugin-prettier -D

eslint-config-prettier: 会关闭 ESLint 中有关代码格式化的配置

eslint-plugin-prettier: 把 Prettier 配置成 ESLint 的一个插件，让其当做一个 linter 规则来运行

1.2 在 .eslintrc.cjs 中 extends 的最后添加一个配置

```js
extends: [
  'eslint:recommended',
  'plugin:vue/vue3-essential',
  'plugin:@typescript-eslint/recommended',
  "plugin:prettier/recommended" // 解决ESlint和Prettier冲突
]
```

## vite.config.ts 配置

## router 构建

## utils 工具添加

## scss 默认样式添加

## axios 构建

## store 构建

## 常用组件构建
