# buffer 模块

概念：类似于数组的对象，用于表示固定长度的字节序列，专门处理二进制数据

```js
const Buffer = require("buffer");
// 创建
let buf = Buffer.alloc(10);
let buf = Buffer.allocUnsafe(10); // 不会清除旧数据
let buf = Buffer.from("hello");

// 操作
let buf = Buffer.from("hello");
buf.toString(); // 与字符串转换
```
