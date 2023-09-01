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

概念：本质 32 bit 的二进制，每 8bit 一组，转换成 10 进制，例如：192.168.0.1，表示 2 的 32 次方的 IP 地址，最多可以构成 42.9 亿的 IP 地址。全球 80 亿人口，每人一个 IP 地址是不够用的，为了解决就有了家庭共用 IP，区域共用 IP。

本地回环 IP ： 127.0.0.1 ~ 127.255.255.254
局域网 IP ：192.168.0.0 ~ 192.168.255.255、172.16.0.0 ~ 172.31.255.255、10.0.0.0 ~ 10.255.255.255
公网 IP ：除上述以外

端口：应用程序的数值标识，实现不同主机之间应用程序的通信。有 65536 个端口 0~65535

7. HTTP 模块

```js
// 1. 导入模块
const http = require("http");
// 2. 创建服务
const server = http.createServer((request, response) => {
  // 获取请求方法
  request.method;
  // 获取请求 url（只包含url中的路径和查询字符串）
  request.url;
  // 获取 HTTP 协议版本号
  request.httpVersion;
  // 获取 HTTP 请求头
  request.headers;

  // 提取路径与参数
  let url = new URL(Request.url, "http://127.0.0.1");
  // 路径
  url.pathname;
  // 参数
  url.searchParams.get("keyword");

  // 设置响应报文
  // 响应状态码
  response.statusCode = 200;
  // 响应状态描述
  response.statusMessage = "msg";
  // 响应头
  response.setHeader("key", "value");
  // 响应体
  response.write();
  response.end();

  // 设置响应头处理中文乱码
  response.setHeader("content-type", "text/html;charset=utf-8");
  // 设置响应体
  response.end("hello");
});

// 3. 启服务
server.listen(9000, () => {
  console.log("已启动");
});
```

8. 模块化

require("demo"): 导入文件夹，首先会检测文件夹下的 package.json 中的 main 属性对应的文件，如果 main 属性对应的文件不存在则报错，如果存在则导入，如果 main 属性不存在，或者 package.json 不存在，导入文件夹下的 index.js 和 index.json

9. 包管理

```js
// 创建包
npm init
// 快速创建
npm init -y
// 指定版本包
npm i <包名@版本号>
// 删除
npm remove <包名>
```

windows 执行策略：1. 管理员身份打开 powershell 2. 输入命令 set-ExecutionPolicy remoteSigned

10. express 框架

```js
// 导入
const express = require("express");
const app = express();
// 创建路由
app.get("/home", (req, res) => {});
// 获取参数
req.path; // /demo
req.query; // { name: 'yq' }
req.ip; // ::ffff:127.0.0.1
req.get("host"); // 127.0.0.1:3000
// 获取id
app.get("/:id", (req, res) => {
  req.params.id;
});
// 响应
res.status(500); // 状态码
res.set("xxx", "xxx"); // 响应头
res.send("demo"); // 响应体
// 其他响应
res.redirect("http://www.baidu.com"); // 重定向
res.download(__dirname + "./demo.js"); // 下载
res.json({ name: "yq" }); // json
res.sendFile(__dirname + "./demo.js"); // 文件

// express 中间件
// 全局中间件
function middleware(req, res, next) {
  // 获取 url 和 ip
  let { url, ip } = req;
  fs.appendFileSync(__dirname + "./demo.json", `${url} ${ip}\r\n`);
  next();
}
app.use(middleware);
// 路由中间件
app.get("/home", middleware, (req, res) => {});
// 静态资源中间件设置
app.use(express.static(__dirname + "/public")); // 页面上访问静态资源

// 获取请求体
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json(); // 解析Json格式请求体的中间件
const urlParser = bodyParser.urlencoded({ extended: false }); // 解析 querystring 格式请求体的中间件
app.post("/login", urlParser, (req, res) => {
  console.log(req.body); // { name: 'yq', password: 123 }
  res.send("success");
});

// 防盗链
app.use((req, res, next) => {
  // 检测请求头中 referer 是否为 127.0.0.1
  let referer = req.get(" ");
  if (referer) {
    let url = new URL(referer);
    let hostname = url.hostname;
    if (hostname !== "127.0.0.1") {
      res.status(500).send("404");
    }
  }
  next();
});

// 路由模块化
// adminRouter.js
const express = require("express");
const router = express.Router();
router.get("/home", (req, res) => {});
module.exports = router;

// index.js
app.use(adminRouter);
```

11. ejs 模板引擎

```js
// 生成模板
const ejs = require("ejs");
const result = ejs.render(str, { name });
// 列表渲染
<% list.forEach(item => { %>
  <li> <%= item  %> </li>
<% }) %>
// 条件渲染
<% if(isBoolean) { %>
<div> true </div>
<% }else { %>
<div>false</div>
<% } %>
```

```js
// 在 express 使用 ejs
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/home", (req, res) => {
  const name = "yqcoder";
  res.render("home", { name });
});
// views/home.ejs
```

12. express-generator 工具

```js
// 快速生成 express + ejs 的框架
npm install -g express-generator
express -e 文件名
```

13. Mongodb 数据库

下载地址：https://www.mongodb.com/try/download/community
v：5.0.20 platform：window package：zip

在 bin 目录下启动数据库 mongod, 客户端连接数据库 mongo

```js
show dbs // 所有数据库
use 数据库名 // 指定数据库,可创建
db // 当前数据库
db.dropDatabase() // 删除数据库

db.createCollection('集合名') // 创建集合
show collections // 数据库集合
db.集合名.drop() // 删除集合
db.集合名.renameCollection('new name') // 重命名集合

db.集合名.insert(新文档) // 增
db.集合名.remove(条件) // 删
db.集合名.update({name: '张三'}, {$set: {age: 13}}) // 改
db.集合名.find(条件) // 查
```

14. mongoose 操作数据库

```js
npm i mongoose;
// 导入
const mongoose = require("mongoose");
// 连接数据库，先启动数据库服务
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');
// 成功回调
mongoose.connection.once('open', () => {});
// 失败回调
mongoose.connection.on('error', () => {});
// 关闭回调
mongoose.connection.on('close', () => {});
// 断开链接
mongoose.disconnect();

// 创建文档对象
const bookScheme = new mongoose.Scheme({
  name: String,
  author: String,
  price: mongoose.Scheme.Types.Mixed // 不限制类型
})
// 创建模型对象
const bookModel = mongoose.model('books', bookScheme);
// 增
bookModel.create({
  name: '金瓶梅',
  author: 'yqcoder'
})
// 删
bookModel.deleteOne({})
bookModel.deleteMany({})
// 改
bookModel.updateOne({}, {})
bookModel.updateMany({}, {})
// 查
bookModel.findOne({});
bookModel.findById();
bookModel.find({price: {$lt: 20}}); // $lt <, $lte <=,  $gt >, $gte >=, $ne !==, $or 或, $and 与
bookModel.find().select({name: 1, author: 1, _id: 0}) // 只返回name，author 
bookModel.find().sort({price: 1}) // 正序
```
