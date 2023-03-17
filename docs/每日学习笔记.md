<h1 align="center">每日笔记</h1>

## 判断浏览器是否支持ie9

```
<!--[if IE 9]>
  <link ref="stylesheet" type="text/css" href="ie9.css" />
<![endif]-->
```

## export、export deafult、exports、module exports区别

```
1. 定义
    export、export default：ES6导出模块变量语法
    exports、module exports: node导出模块变量语法

2. export用法(外部模块需要知道main.js的变量名)
    <!-- main.js -->
    let a = 1
    function fun() {}
    export { a, fun }
    <!-- test.js -->
    import { a, fun } from './main.js'

3. export default用法(默认导出，外部模块无需知道变量名)
  <!-- 注意：一个模块中只能有一个默认导出，所以使用import导入时，后面无需加{  }； -->
    <!-- main.js -->
    export default function funx() {}
    <!-- test.js -->
    import fu from "./main.js"
```

## 启本地服务

```js
全局安装：npm install anywhere -g
启动本地服务：anywhere -p 8080
```

## AMD,CMD,common.js,require.js

```
客户端: AMD: 异步模块加载机制，AMD规范简单到只有一个API，define函数，require.js就是AMD规范
        CMD: 和AMD相似,sea.js
客户端: commonjs: 基于服务端node应用的
requirejs:  说明：1.模块化组织JS，2.异步加载JS
            用法：1.通过require.config配置。2.require([js模块], function() {})
```

