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