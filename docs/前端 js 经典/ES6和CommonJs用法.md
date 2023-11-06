# ES6 和 CommonJs 用法

1. 概念

都是 JavaScript 模块化规范，ES6 适用于浏览器端和 Node.js，CommonJs 适用于 Node.js。

2. 导出

```js
// ES6
export function demo(n1, n2) {
  return n1 + n2;
}

// CommonJS
module.exports = {
  demo: function (n1, n2) {
    return n1 + n2;
  },
};
```

3. 引入

```js
// ES6
import { demo } from "demo.js";
demo(2, 1); // 3

// CommonJs
const demo = require("demo.js");
demo.demo(2, 1); // 3
```
