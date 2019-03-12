# 通过 vue-cli3 搭建项目

## [vue-cli3.0 引入 px2rem 与 lib-flexible 移动端适配](https://www.jianshu.com/p/191d1e21f7ed)

1. lib-flexible

   1.1 作用：让网页根据设备 dpr 和宽度，利用 viewport 和 html 根元素的 font-size 配合 rem 来适配不同尺寸的移动端设备

   1.2 安装：yarn add lib-flexible

   1.3 引入：入口文件 main.js 中：import 'lib-flexible/flexible.js'

2. pxtorem

   2.1 作用：将项目中 css 的 px 转成 rem 单位，免去计算烦恼

   2.2 安装：yarn add postcss-pxtorem

   2.3 配置：package.json 内，在 postcss 内添加：

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

> 查看 vue 版本

```bash
vue -V
```

> 如果版本低于 3.0 先卸载 vue

```bash
npm uninstall vue-cli -g 或 yarn global remove vue-cli
```

> 再安装最新 vue

```bash
npm install -g @vue/cli 或 yarn global add @vue/cli
```

## 创建一个项目

```bash
vue create <project-name>
```
