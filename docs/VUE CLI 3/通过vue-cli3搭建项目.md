<h1 align="center">vue-cli3 搭建项目</h1>

## vue3.0 搭建脚手架

```
\\ 查看 vue 版本
vue -V

\\ 如果版本低于 3.0 先卸载 vue
npm uninstall vue-cli -g 或 yarn global remove vue-cli

\\ 再安装最新 vue
npm install -g @vue/cli 或 yarn global add @vue/cli

\\ 创建项目
vue create <project-name>
```

## [vue3.0 移动端适配](https://www.jianshu.com/p/191d1e21f7ed)

1. 引入 lib-flexible

作用：让网页根据设备 dpr 和宽度，利用 viewport 和 html 根元素的 font-size 配合 rem 来适配不同尺寸的移动端设备

安装：yarn add lib-flexible

引入：入口文件 main.js 中：import 'lib-flexible/flexible.js'

2. 引入 pxtorem

作用：将项目中 css 的 px 转成 rem 单位，免去计算烦恼

安装：yarn add postcss-pxtorem

配置：package.json 内，在 postcss 内添加：

```
"postcss": {
  "plugins": {
    "autoprefixer": {},
    "postcss-pxtorem": {
      "rootValue": 75, // 设计稿宽度的1/10,（JSON文件中不加注释，此行注释及下行注释均删除）
      "propList":["*"] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    }
  }
}
```

## vue3.0 build 包太大导致首屏过长的解决方案

1. 路由懒加载

结合 Vue 的异步组件再结合 webpack 的代码分割，我们可以轻松的实现路由懒加载。

vue-cli 3.0 模式就使用了 Babel，我们需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。

```
// 安装插件 syntax-dynamic-import
cnpm install --save-dev @babel/plugin-syntax-dynamic-import

// 修改babel.config.js
module.exports = {
  "presets": [
    "@vue/app"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      },
      "syntax-dynamic-import"
    ]
  ]
}

// 修改路由组件的加载（router/index.js）
{
  path: '/',
  name: 'home',
  component: resolve => require(['pages/Home'], resolve)
}
```

2. 服务器开启 Gzip

Gzip 是 GNU zip 的缩写，顾名思义是一种压缩技术。它将浏览器请求的文件先在服务器端进行压缩，然后传递给浏览器，浏览器解压之后再进行页面的解析工作。在服务端开启 Gzip 支持后，我们前端需要提供资源压缩包。

通过 CompressionWebpackPlugin 插件 build 提供压缩

```
// 安装插件
cnpm i --save-dev compression-webpack-plugin

// 在vue-config.js 中加入
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

.....
module.exports = {
....
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
  }
}
```

3. 启用 CDN 加速

Gzip 已把文件的大小减少了三分之二了，加载速度从之前 2.7 秒多到现在的 1.8 秒多，但这个还是得不到满足。那我们就把那些不太可能改动的代码或者库分离出来，继续减小单个 chunk-vendors，然后通过 CDN 加载进行加速加载资源。

```
// 修改vue.config.js 分离不常用代码库
module.exports = {
  configureWebpack: config => {
    if (isProduction) {
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'moment': 'moment'
      }
    }
  }
}
// 在public文件夹的index.html 加载

<!-- CND -->
<!--
<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.runtime.min.js"></script>
-->
<script src="https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js"></script>
<script src="https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>

```

4. 修改 uglifyOptions 去除 console 来减少文件大小

```
// 安装uglifyjs-webpack-plugin
cnpm install uglifyjs-webpack-plugin --save-dev

// 修改vue.config.js
  configureWebpack: config => {
    if (isProduction) {
      .....
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      )
    }
  }
```
