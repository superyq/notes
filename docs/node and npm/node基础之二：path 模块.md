# path 模块

概念：提供操作路径的功能

```js
const path = require("path");

// 拼接规范的绝对路径
path.resolve(__dirname, "./demo.txt");
path.resolve(__dirname, "demo.txt");

// 获取分割符 window \ linux /
path.sep;

// 解析路径
let str = "D:\\code\\notes\\docs\\node and npm\\node-demo.js";
path.parse(str); /*{
                      root: 'D:\\',
                      dir: 'D:\\code\\notes\\docs\\node and npm',
                      base: 'node-demo.js',
                      ext: '.js',
                      name: 'node-demo'
                    } */
path.basename(str); // node-demo.js
path.dirname(str); // D:\code\notes\docs\node and npm
path.extname(str); // .js
```
