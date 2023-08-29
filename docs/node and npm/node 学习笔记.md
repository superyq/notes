# node 学习笔记

前言：可以让别人访问我们的网页，可以开发服务端应用、工具类应用、桌面端应用（electron）

1. Buffer

概念：类似于数组的对象，用于表示固定长度的字节序列，专门处理二进制数据

```js
// 创建
let buf = Buffer.alloc(10);
let buf = Buffer.allocUnsafe(10); // 不会清除旧数据
let buf = Buffer.from("hello");

// 操作
let buf = Buffer.from("hello");
buf.toString(); // 与字符串转换
```

2. 计算机基础

概念：CPU 内存 硬盘 主板 显卡

3. 进程和线程

概念：进程是一个程序的执行，线程组合形成进程

4. fs 模块

概念：文件的创建、删除、重命名、移动、写入、读取等

```js
const fs = require("fs");

// 写入
fs.writeFile("./demo.txt", "hello", (err) => {});
fs.writeFileSync();

// 追加
fs.appendFile("./demo.txt", "hello", (err) => {});
fs.appendFileSync();
fs.writeFile("./demo.txt", "hello", { flag: "a" }, (err) => {});

// 流式写入
const ws = fs.createWriteStream("./demo.txt");
wx.write("hello\r\n");
wx.close();

// 读取
fs.readFile("./demo.txt", (err, data) => {});
fs.readFileSync("./demo.txt");

// 流式读取
const rs = fs.createReadStream("./demo.txt");
rs.on("data", (chunk) => {}); // 读取一块数据后执行回调
re.on("end", () => {});

// 重命名/移动
fs.rename("./demo.txt", "./new.txt", (err) => {});
fs.renameSync();

// 删除
fs.unlink("./demo.txt", (err) => {});
fs.unlinkSync();
fs.rm("./demo.txt", (err) => {});
fs.rmSync();

// 创建文件夹
fs.mkdir("./demo", (err) => {});
fs.mkdir("./a/b/c", { recursive: true }, (err) => {});

// 读取文件夹
fs.readdir("./demo", (err, data) => {});

// 删除文件夹
fs.rmdir("./demo", (err) => {});
fs.rmdir("./demo", { recursive: true }, (err) => {});
fs.rm("./demo", { recursive: true }, (err) => {});

// 查看资源状态
fs.stat("./demo.txt", (err, data) => {});

// 路径
__dirname; // 所在文件所在目录的绝对路径 D:\code\notes\docs\node and npm
__filename; // 文件的绝对路径           D:\code\notes\docs\node and npm\node-demo.js
```

5. path 模块

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

6. IP

概念：32 位的二进制
