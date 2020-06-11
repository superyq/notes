# node

## 基础

```js
var fs = require("fs");

fs.mkdir(path, err => {}) // 创建文件夹
fs.writeFile(path, content, err => {}) // 创建文件
fs.readFile(path, 'utf-8', (err, data) => {}) // 读取文件内容
```

## 获取参数

```js
node page.js demo
process.argv[2] // demo
```