# fs 模块

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
