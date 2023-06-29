# node

## 基础模块

```js
// 1.events模块：事件触发与事件监听器
// 创建对象
let EventEmitter = require("events").EventEmitter;
let event = new EventEmitter();

event.on("eventname", (arg1,arg2) => {}); // 绑定事件 arg 为参数
event.emit("eventname", arg1, arg2); // 触发事件
event.addListener("eventname", () => {}); // 添加监听器
event.once("eventname", () => {}) // 只触发一次的监听器
event.removeListener("eventname", listener) // 移除监听器，必须给监听器命名，才能移除
event.removeAllListeners([event]) // 移除监听器 
event.setMaxListeners(n) // 改变默认监听器限制数量，默认值为10
event.listeners(event) // 返回指定事件的监听器数组

// 2.Buffer(缓冲区)：处理TCP流、文件流必须使用二进制，buffer创建一个专门存放二进制数据的缓存区
Buffer.alloc(size[, fill[, encoding]]) // 创建缓存区, 返回一个指定大小的Buffer实例,如果没有设置fill，默认填满0
Buffer.allocUnsafe(size) // 创建缓存区, 返回一个指定大小的Buffer实例，不会被初始化，所以它可能包含敏感数据
Buffer.allocUnsafeSlow(size) // 创建缓存区
Buffer.from(array) // 创建缓存区, 返回一个被array值初始化的Buffer实例，array必须是数字，不然被0覆盖
Buffer.from(arrayBuffer[, byteOffset[, length]]) // 创建缓存区, 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer
Buffer.from(buffer) // 创建缓存区, 传入buffer实例数据，返回一个新buffer
Buffer.from(string[, encoding]) // 创建缓存区, 返回一个被string值初始化的Buffer实例
Buffer.concat(list[, totalLength]) // 缓存区合并, list: 合并buffer数组。totalLength: 合并后buffer长度

buf.write(string[, offset[, length[, encoding]]]) // 写入数据 string: 写入字段。offset：开始写入索引，默认0。length: 写入字节数，默认buffer.length。encoding: 使用编码, 默认"utf-8"
buf.toString([encoding[, start[, end]]]) // 读取数据 encoding: 使用编码, 默认"utf-8"。start：开始读取位置，默认0。end: 结束位置，默认为缓冲区末尾
buf.toJSON() // 转换成json对象
buf.compare(otherbuf) // 缓存区比较。返回体：0：相同。1：之后。-1：之前
buf.copy(targetbuf[, targetstart[, sourcestart[, sourceend]]]) //拷贝缓存区。 buf插入targetbuf
buf.slice([start[, end]]) // 剪切缓存区。返回一个新buf。
buf.length // 返回缓存区长度

// 3.Stream(流)：四种流类型：Readable可读，Writable可写，Duplex可读可写，Transform操作被写入数据，读出结果
//               四种事件：data，end，error，finish。
let fs = require("fs");
let zlib = require("zlib");

let readStream = fs.createReadStream("demo.txt") // 创建可读流
readStream.on("data", chunk => {}) // demo.txt有内容时，触发
readStream.on("end", () => {}) // demo.txt没有内容时，触发
readStream.on("error", () => {}) // 读取错误时，触发

let writeStream = fs.createWriteStream("demo.txt") // 创建写入流
writeStream.write("yqcoder") // 写入数据
readStream.on("finish", () => {}) // 写入完成时促发

readerStream.pipe(writerStream); // 管道流：读取一个文件内容并将内容写入到另外一个文件中

fs.createReadStream("demo.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("demo.txt.gz")) // 链式流：一般用于管道操作。创建压缩文件夹

// 4.模块系统：Node.js的文件可以相互调用，一个 Node.js 文件就是一个模块，这个文件可能是js代码、JSON 或者编译过的C/C++ 扩展
exports.word = function() {} // exports: 模块公开的接口
module.exports = { word } // module.exports：默认导出,module.exports和exports同时存在时，通过require引入模块时，exports暴露的属性和方法被忽略
let hello = require("./hello") // require: 模块获取接口。默认后缀为.js

// node.js存在4类模块（原生模块和3种文件模块），优先级：文件模块缓存区 > 原生模块缓存区 > 原生模块 > 文件模块

// 5.函数：一个函数可以作为另一个函数的参数。

// 6.路由：根据请求的 URL 和 GET 及 POST 参数来执行相应的代码

// 7.全局对象：浏览器window,Node.js中是global
__filename // 输出文件所在位置的绝对路径
__dirname // 脚本所在目录

process // 全局变量
process.argv // 返回数组 [node, 脚本文件名, 脚本文件的参数]



JSON.stringify(buf) // 字符串化buf，隐式调用toJSON



var fs = require("fs");

fs.mkdir(path, err => {}) // 创建文件夹
fs.writeFile(path, content, err => {}) // 创建文件
fs.readFile(path, 'utf-8', (err, data) => {}) // 读取文件内容
```
