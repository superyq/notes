<h1 align="center">每日笔记</h1>

## 一.有组织的笔记

### 数组

1. unshfit, push

arr.unshfit(i): 向数组头部添加元素

arr.push(i): 向数组尾部添加元素

3. shfit, pop

arr.shfit(): 删除并返回数组第一个元素

arr.pop(): 删除并返回数组最后一个元素

5. forEach

```
arr.forEach(i => {

})
```

6. indexOf

```
array.indexOf(item) 返回下标
```

7. splice

```
array.splice(index, 1) 删除指定元素
```

## 二.杂记

### a 标签加 javascript 意义

> 执行一段空白的 javascript 语句，返回空或者 false 值，从而防止链接跳转。跟当前 a 标签无关，这段代码始终都会执行。

```
<a href="javascript:;">
```

### 判断浏览器是否支持 ie9

```
<!--[if IE 9]>
  <link ref="stylesheet" type="text/css" href="ie9.css" />
<![endif]-->
```

### 解构

```
get({ page, limit, ...this.search }).then(({ data: { data: list = [], total = [], current_page: current = 1 } }) => {

})
```

### Object.assign()

> Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

```
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

### Promise

1. Promise.all

> Promise.all 等待所有都完成（或第一个失败）

```
Promise.all([getA({ page, limit, ...this.search }), flag && getB()])
.then(([
  {
    data: { data: list = [], total }
  },
  {
    data: cates = []
  } = {}
]) => {
  falg && (this.list = [...cates])
})
.catch(() => {

})

```

2. Promise.resolve({})

> Promise.resolve(value)方法返回一个以给定值解析后的 Promise 对象。但如果这个值是个 thenable（即带有 then 方法），返回的 promise 会“跟随”这个 thenable 的对象，采用它的最终状态（指 resolved/rejected/pending/settled）；如果传入的 value 本身就是 promise 对象，则该对象作为 Promise.resolve 方法的返回值返回；否则以该值为成功状态返回 promise 对象。

```
var promise1 = Promise.resolve(123);

promise1.then(function(value) {
  console.log(value);
  // expected output: 123
});
```

### Array.from()

> Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。

```
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```

### new Set(arr)

> 数组去重

### em

> “em”是一个相对的大小,相对所指的是相对于元素父元素的 font-size

### vue-cli 3.0 build 包太大导致首屏过长的解决方案

1. 路由懒加载

结合 Vue 的异步组件再结合 webpack 的代码分割，我们可以轻松的实现路由懒加载。

> ️vue-cli 3.0 模式就使用了 Babel，我们需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。

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

3.  启用 CDN 加速

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

作者：内孤
链接：https://www.jianshu.com/p/d1fb954f5713
来源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
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

如果代码中打了很 log，这个优化还是有点效果的
