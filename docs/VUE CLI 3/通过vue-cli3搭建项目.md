# 通过vue-cli3搭建项目

## [vue-cli3.0引入px2rem与lib-flexible 移动端适配](https://www.jianshu.com/p/191d1e21f7ed)

1. lib-flexible    

    1.1 作用：让网页根据设备dpr和宽度，利用viewport和html根元素的font-size配合rem来适配不同尺寸的移动端设备

    1.2 安装：yarn add lib-flexible

    1.3 引入：入口文件main.js中：import 'lib-flexible/flexible.js'

2. pxtorem

    2.1 作用：将项目中css的px转成rem单位，免去计算烦恼

    2.2 安装：yarn add postcss-pxtorem

    2.3 配置：package.json内，在postcss内添加：

```
"postcss": {
    "plugins": {
      "autoprefixer": {},
      "postcss-pxtorem": {
        "rootValue": 75, // 设计稿宽度的1/10,（JSON文件中不加注释，此行注释及下行注释均删除）
        "propList":["*"] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
     }
    }
  },
```
## 安装

> 查看vue版本
```bash
vue -V
```
如果版本低于3.0先卸载vue
```bash
npm uninstall vue-cli -g 或 yarn global remove vue-cli
```
再安装最新vue
```bash
npm install -g @vue/cli 或 yarn global add @vue/cli
```

## 快速原型开发

> 使用vue serve 对单个*.vue进行快速原型开发,但是需要先额外安装一个全局的扩展
```bash
npm install -g @vue/cli-service-global
```
vue serve 的缺点就是要安装全局依赖,这使得它在不同机器上的一致性不能得到保证。因此这只适用于快速原型开发。

> ### vue serve

> 你所需要的仅仅是一个 App.vue 文件
```bash
<template>
	<h1>hello!</h1>
</template>
```
然后在这个 App.vue 文件所在的目录下运行：
```bash
vue serve
```
你还可以显示指定入口文件
```bash
vue serve MyComponent.vue
```

> ### vue build

> 将目标文件构建成一个生产环境的包并用来部署
```bash 
vue build MyComponent.vue
```

## 创建一个项目

```bash
vue create <project-name>
```
> 你会被提示选取一个 preset。你可以选默认的包含了基本的 Babel + ESLint 设置的 preset，也可以选“手动选择特性”来选取需要的特性。
这个默认的设置非常适合快速创建一个新项目的原型，而手动设置则提供了更多的选项，它们是面向生产的项目更加需要的。

## 插件和 Preset

> ### 插件

> Vue CLI 使用了一套基于插件的架构。如果你查阅一个新创建项目的package.json，就会发现依赖都是以 @vue/cli-plugin- 开头的。插件可以修改 webpack 的内部配置，也可以向 vue-cli-service 注入命令。在项目创建的过程中，绝大部分列出的特性都是通过插件来实现的。

> 基于插件的架构使得 Vue CLI 灵活且可扩展。如果你对开发一个插件感兴趣，请翻阅[插件开发指南](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html)。

> ### 在现有的项目中安装插件
 
> 每个 CLI 插件都会包含一个 (用来创建文件的) 生成器和一个 (用来调整 webpack 核心配置和注入命令的) 运行时插件。当你使用 vue create 来创建一个新项目的时候，有些插件会根据你选择的特性被预安装好。如果你想在一个已经被创建好的项目中安装一个插件，可以使用 vue add 命令：
```bash
vue add @vue/eslint
```
> ### 项目本地插件

> 如果你需要在项目里直接访问插件 API 而不需要创建一个完整的插件，你可以在 package.json 文件中使用 vuePlugins.service 选项：
```bash
{
	"vuePlugins":{
		"service": ["my-commands.js"]
	}
}
```

> ### preset

> 一个 Vue CLI preset 是一个包含创建新项目所需预定义选项和插件的 JSON 对象，让用户无需在命令提示中选择它们。
在 vue create 过程中保存的 preset 会被放在你的 home 目录下的一个配置文件中 (~/.vuerc)。你可以通过直接编辑这个文件来调整、添加、删除保存好的 preset。
这里有一个 preset 的示例：
```bash
{
  "useConfigFiles": true,
  "router": true,
  "vuex": true,
  "cssPreprocessor": "sass",
  "plugins": {
    "@vue/cli-plugin-babel": {},
    "@vue/cli-plugin-eslint": {
      "config": "airbnb",
      "lintOn": ["save", "commit"]
    }
  }
}
```

## CLI服务

### 使用命令

> 启动服务

```bash
yarn serve 或 npm run serve
```

> 打包

```bash
yarn build
```

## 浏览器兼容

### browserlist

> 你会发现有 package.json 文件里的 browserslist 字段 (或一个单独的 .browserslistrc 文件)，指定了项目的目标浏览器的范围。这个值会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。
现在查阅[这里](https://github.com/browserslist/browserslist)了解如何指定浏览器范围。

## HTML 和静态资源

### HTML

> public/index.html 文件是一个会被 html-webpack-plugin 处理的模板。在构建过程中，资源链接会被自动注入。另外，Vue CLI 也会自动注入 resource hint (preload/prefetch、manifest 和图标链接 (当用到 PWA 插件时) 以及构建过程中处理的 JavaScript 和 CSS 文件的资源链接。



