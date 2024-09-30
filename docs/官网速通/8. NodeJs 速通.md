# NodeJs 速通

前言：参考[Node.js 中文网](https://nodejs.cn/en)，可以通过[Node.Js V19 API 文档](https://nodejs.org/api/documentation.html)查看常用 API 。

番外

番外知识点，多学点总没坏处 😀😀😀。

1. 计算机的基本组成

计算机由 CUP、内存、硬盘、显卡、主板、散热器等组成。

1.1 CUP

中央处理器，是整个计算机运算和控制的中心

1.2 内存

是存储数据的介质，读写速度快，但是断电丢失数据。我们程序在运行时，就会载入内存当中，让 CUP 高速运行程序。

1.3 硬盘

和内存很像，用于存放数据，读写速度慢，断电不丢失数据。我们安装的应用程序就装在硬盘中，比如 QQ、微信等

1.4 显卡

处理视频信号的，当有信息需要在显示器呈现时，就要传递给显卡，显卡处理完毕后，再传输给显示器。

1.5 主板

集成电路板，上面有很多插槽，可以插入 CUP 处理器，内存条、硬盘、显卡等。

2. 程序运行基本流程

安装的程序在硬盘，运行程序在内存，CUP 从内存中拿程序执行，执行时有视频信号传给显卡，有声音信号传给声卡。

3. 进程和线程

3.1 进程

运行中的程序，每一个运行中的程序都有一个属于自己的进程，这些进程占用内存空间。

3.2 线程

进程中的任务，一个进程至少有一个任务，就是一个线程，不然你开了一个程序，但是这个程序什么都不做，那它就没有存在的意义。也可以有多个任务，就是我们常说的多线程。

4. HTTP 协议

超文本传输协议，是互联网运用最广泛的协议之一。协议是什么？协议就是双方必须遵从的一组约定。HTTP 协议是对浏览器和服务器双方的约定。

4.1 请求报文

请求报文由请求行、请求头、请求体构成。以访问百度为例。

4.1.1 请求行

由三部分组成：请求方法、URL、HTTP 协议版本号。

请求方法：GET 获取数据、POST 新增数据、PUT/PATCH 修改数据、DELETE 删除数据

URL：用来定位服务器资源，由协议、域名、端口、路径、查询字符串组成

HTTP 版本号：有 1.0、1.1、2、3 四个版本号

```js
GET https://www.baidu/com/ HTTP/1.1
```

4.1.2 请求头

由一系列的键值对组成，用来记录浏览器的相对信息和交互行为等。

```js
HTTP/1.1 200 OK
Bdpagetype: 1
Bdqid: 0x9a760cca0000e1ee
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Fri, 21 Jun 2024 03:44:22 GMT
Server: BWS/1.1
Set-Cookie: H_PS_PSSID=60297_60338_60352_60346_60364_60360; path=/; expires=Sat, 21-Jun-25 03:44:22 GMT; domain=.baidu.com
Set-Cookie: BDSVRTM=8; path=/
Set-Cookie: BD_HOME=1; path=/
Strict-Transport-Security: max-age=172800
Traceid: 1718941462054085735411130097590815744494
X-Ua-Compatible: IE=Edge,chrome=1
X-Xss-Protection: 1;mode=block
Transfer-Encoding: chunked
```

4.1.3 请求体

请求体的构成就很灵活，我们用的最多的 JSON 格式。

4.2 响应报文

响应报文由响应行、响应头、响应体构成。以访问百度为例。

4.2.1 响应行

由三部分组成：HTTP 版本号、响应状态码、响应状态描述。

HTTP 版本号：有 1.0、1.1、2、3 四个版本号

响应状态码：200 请求成功、403 禁止请求、404 找不到资源、500 服务端错误。

响应状态码五大类：1xx 信息响应、2xx 成功响应、3xx 重定向信息、4xx 客户端错误、5xx 服务端错误

响应状态描述：200 OK、403 Forbidden、404 Not Found、500 Internal Server Error

```js
HTTP/1.1 200 OK
```

4.2.2 响应头

记录服务器相关的内容。

4.2.3 响应体

响应体内容格式很灵活：HTML、CSS、JS、图片、视频、JSON

5. 网络基础概念

5.1 什么是 IP

就是你上网设备在互联网上的地址。比如：192.168.1.1

5.2 IP 有什么用

IP 用来标识网络中的设备，实现设备通信。只要设备接入互联网，就都会有一个 IP 地址。当你给你小伙伴发消息时，你发的消息就带有你的 IP 地址和你小伙伴的 IP 地址，这样才能实现通信。

5.3 IP 分类

每一个接入互联网的设备都有一个自己的 IP 地址，而互联网上的 IP 总共也才 42 亿，全球人口 80 亿+，每个人的联网设备还不止一个。有手机，电脑，手表，电视，智能家居等，这么多设备根本不够分。所以就有了共享 IP，分为区域共享 IP 或者家庭共享 IP。比如你家里有手机、笔记本、电视，然后这些设备通过 wifi 或者网线都连接到了路由器上，路由器会为每个设备分配 IP 地址，路由器本身也有 IP 地址比如 192.168.1.1，给你手机分个 IP 192.168.1.2，电脑 192.168.1.3，电视 192.168.1.4。我们的设备通过路由器连接到了一起，形成了个网络，这我们称之为局域网。路由器分配给我们的 IP 地址，称为局域网 IP。在这个网络里，我们的设备是可以通信的。但是如果你想给你远方的女友发个消息 “吃了吗”，目前的网络是不行的。需要将路由器接入互联网。如何接入互联网呢，去找电信、联通、移动办理业务。办理完业务后路由器就有了另外一个 IP，比如 180.91.213.151，这就是公网 IP。家里设备共享的 IP 就是这个公网 IP，有了这个 IP，你就可以和远方的女友通信了。

局域网 IP：192.168.0.0 ~ 192.168.255.255、172.16.0.0 ~ 172.31.255.255、10.0.0.0 ~ 10.255.255.255

公网 IP：除了局域网 IP 和本地回环 IP

本地回环 IP：127.0.0.1 ~ 127.255.255.254 这类 IP 地址是指向本机的。称为本地回环地址。

5.4 什么是端口

应用程序的数字标识，一台计算机有 65536 个端口（0 ~ 65535），一个应用程序可以使用一个或多个端口。什么是应用程序？就是你安装到计算机上的软件，比如微信、QQ、游戏等。

5.5 端口有什么用

实现不同主机应用程序之间的通信的。比如两台计算机的微信相互通信，如果只有 IP 没有端口，那计算机不知道接受到的报文，用什么程序去处理。

一、入门指南

1. Node.js 简介

1.1 什么是 Node.js

Node.js 是一个运行环境，这个运行环境是基于谷歌 v8 引擎的，用于在服务端运行 JS 代码。

Node.js 采用事件驱动、非阻塞式 I/O 的设计理念，使 JS 能高效地处理大量并发请求。

1.2 Node.js 可以做什么

开发服务器应用、工具类应用、桌面端应用。

1.2.1 服务器应用

可以对用户请求做出处理，返回资源。

1.2.2 工具类应用

Webpack、Vite、Babel

1.2.3 桌面端应用

VsCode、PostMan、Figma 都是使用 electron 开发的，electron 是基于 node 开发的

1.3 Node.js 的优、缺点

优点：因为 Node.js 采用事件驱动、非阻塞式 I/O 的设计理念，所以使 JS 能高效地处理大量并发请求。

缺点：大前端，木有缺点！

1.4 示例

使用 Node.js 启动一个 Web 服务器，首先创建一个 server.js，并在 server.js 所在文件夹点右键打开终端，运行 node server.js 命令。

```js
// server.js
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

<!-- 1 -->
<!-- 2 -->

2. 如何安装 Node.js

[点击安装 nodejs](https://nodejs.p2hp.com/download/)，推荐使用 nvm，因为 nvm 是 nodejs 的版本管理工具，便于切换 node 版本，教程[nvm 用法](https://blog.csdn.net/weixin_64684095/article/details/134266961)

3. Node.js 和浏览器的区别

可操作的 API 不同：浏览器可以操作 DOM、BOM。Node.js 不行，因为不存在这些，Node.js 有 fs、path、http 等模块可以操作，浏览器没有。

模块系统不同：浏览器只支持 ES 模块系统，Node.js 同时支持 CommonJs 和 ES 模块系统

二、npm 包管理

可以参考 [npm 包管理](https://blog.csdn.net/weixin_64684095/article/details/134256819?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522171913903616800185864591%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=171913903616800185864591&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-2-134256819-null-null.nonecase&utm_term=%E5%8C%85&spm=1018.2226.3001.4450) 和
[nvm 用法](https://blog.csdn.net/weixin_64684095/article/details/134266961)

1. npm 简介

npm 是 Node.js 的标准包管理器。我们习惯使用 yarn 或 pnpm 来代替 npm。因为可以更快安装依赖。

2. 包

就是通过 npm 下载到项目中的依赖统称为包，npm 管理项目依赖的下载。

3. 安装依赖

如果项目有一个 package.json 文件，通过运行 npm install 来安装依赖。它会将所需依赖安装到 node_modules 文件夹，如果尚不存在，则创建它。

```bash
npm install
# or
yarn install
# or
pnpm install
```

4. 安装单个包

可以通过包名来安装特定的包。

```bash
npm install <package-name>
// or
yarn add <package-name>
# or
pnpm add <package-name>
```

5. 更新软件包

npm 将检查所有软件包是否有满足版本控制约束的较新版本。

```bash
npm update
# or
yarn update
# or
pnpm update
```

6. 更新单个包

```bash
npm update <package-name>
# or
yarn update <package-name>
# or
pnpm update <package-name>
```

7. 指定安装固定版本包

指定版本有助于让每个人都使用相同的软件包版本，以便整个团队运行相同的版本。

```bash
npm install <package-name>@<version>
# or
yarn add <package-name>@<version>
# or
pnpm add <package-name>@<version>
```

8. 运行任务

package.json 文件支持一种格式，用于指定可以使用以下方式运行的命令行任务

```json
// package.json
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js"
  }
}
```

可以通过 npm run <task-name> 来代替那么长串命令。

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

9. 安装全局依赖

通过 npm root -g 查看全局安装的位置。nodemon 的作用是动态更新服务文件。

```bash
npm install -g nodemon
```

三、NodeJs 常用模块

1. Buffer 模块

Buffer 是一个固定长度的内存空间，用来处理二进制数据。

Buffer 的特点：1. 大小固定无法调整。2. 性能较好，可以直接对计算机内存进行操作。3. 每个元素的大小为 1 字节。

1.1 Buffer 的创建

Buffer 为全局属性可以直接使用，alloc 代表分配，如下给 buf 变量分配 10 个字节。

```js
let buf = Buffer.alloc(10); // <Buffer 00 00 00 00 00 00 00 00 00 00>
```

allocUnsafe 代表不安全分配，和上面运行结果一样，有什么区别勒？使用 allocUnsafe 创建的数据可能会包含旧的内存数据。

```js
let buf = Buffer.allocUnsafe(10); // <Buffer 00 00 00 00 00 00 00 00 00 00>
```

from 可以将字符串、数组转换为 buffer，每个字符都会转换为 unicode 码表码表的数字，数字转换成二进制保存在码表中。

```js
let buf = Buffer.from("yqcoder"); // <Buffer 79 71 63 6f 64 65 72>
```

1.2 Buffer 与字符串转换

使用 toString() 方法，将 buffer 转换为字符串。

```js
let buf = Buffer.from("yqcoder");
let name = buf.toString(); // yqcoder
```

1.3 Buffer 和中文转换

中文转 Buffer，一个汉字占 3 个字节

```js
let buf = Buffer.from("你好"); // <Buffer e4 bd a0 e5 a5 bd>
```

1.4 通过 [] 操作单个字符

和数组类似，通过 [] 下标的方式，实现读取和修改

```js
let buf = Buffer.from("yqcoder");
buf[0]; // 121
```

2. fs 模块

fs 可以和我们硬盘进行交互，比如文件的创建、删除、重命名、移动。文件内容的写入、读取。和文件夹相关操作。

注：fs 中的相对路径相对的是打开命令行工具的目录，而不是执行文件的目录,这就容易出问题。使用\_\_dirname 拼接绝对路径解决这个问题。\_\_dirname 表示执行文件所在文件夹的绝对路径。\_\_filename 表示执行文件的所在路径

2.1 写入文件

使用 fs.writeFile(file, data[, options], callback) 创建和写入文件，file 文件名、data 写入数据、options 可选配置、callback 回调函数。

writeFile 是一个异步操作，js 的主线程开始执行这段代码，当执行到 writeFile 时会进行磁盘的写入，并将磁盘写入操作交给 I/O 线程去完成。I/O 线程会在写入完毕后，将回调函数放入任务队列中，在主线程代码执行完毕后，再执行任务队列的函数。这就是传说中的事件循环机制。

```js
const fs = require("fs");
fs.writeFile("./demo.txt", "hello yqcoder", (err) => {
  if (err) {
    console.log("写入失败");
    return;
  }
  console.log("写入成功!");
});
```

writeFileSync 同步操作。使用和 writeFile 差不多，只是没有回调函数了，主线程执行到 writeFileSync 时，后停止执行后续代码，等 I/O 线程执行完毕后，再继续执行后续代码。如下使用 try catch 是为了防止读写失败后，阻塞程序继续运行。

```js
const fs = require("fs");
try {
  fs.writeFileSync("./demo.txt", "yqcoder");
} catch (err) {}
```

2.2 追加内容

使用 fs.appendFile(file, data[, options], callback)，参数含义同 writeFile 的参数。在文件末尾添加内容，如果文件不存在，先创建文件再添加内容。使用 \r\n 实现添加文本换行。同步操作 fs.appendFileSync。

```js
const fs = require("fs");
fs.appendFile("./demo.txt", "\r\nyqcoder", (err) => {
  if (err) {
    console.log("写入失败");
    return;
  }
  console.log("写入成功!");
});
```

也可以使用 fs.writeFile，添加配置。

```js
const fs = require("fs");
fs.writeFile("./demo.txt", "hello yqcoder", { flag: "a" }, (err) => {
  if (err) {
    console.log("写入失败");
    return;
  }
  console.log("写入成功!");
});
```

2.3 流式写入

通过 fs.createWriteStream(path[, options]) 创建一个实例，path 文件路径。options 可选配置。使用实例方法 ws.write(data) 往目标文件写入内容。和 writeFile 的区别是 writeFile 是一次性写入，createWriteStream 是打开一个通道，在通道没有关闭之前，可以断断续续的给文件写入内容。适合写入频率高的场景。

```js
const fs = require("fs");
const ws = fs.createWriteStream("./demo.txt");
ws.write("yqcoder,");
ws.write("hello");
ws.close();
```

2.4 文件读取

使用 fs.readFile(path[, options], callback) 读取文件，path 文件路径，options 可选配置，callback 回调函数。readFileSync(path[, options])同步读取。

```js
const fs = require("fs");
fs.readFile("./demo.txt", (err, data) => {
  if (err) {
    console.log("读取失败");
    return;
  }
  console.log(data); // <Buffer 79 71 63 6f 64 65 72 2c 68 65 6c 6c 6f>
  console.log(data.toString()); // yqcoder,hello
});
```

2.5 流式读取

通过 fs.createReadStream(path[, options]) 创建一个实例，path 文件路径。options 可选配置。监听 data 事件 ，ws.on('data', (chunk) => {}) 每次获取 64kb 的文件内容 chunk。读取完成后，触发 end 事件。和 readFile 的区别是 readFile 是一次性读取，createReadStream 是流失读取，能提升读取大文件效率。

```js
const fs = require("fs");
const rs = fs.createReadStream("./demo.txt");
rs.on("data", (chunk) => {
  console.log(chunk.length);
});
rs.on("end", () => {
  console.log("读取完成");
});
```

2.6 重命名和移动

使用 fs.rename(oldPath, newPath, callback) 重命名文件，oldpath 就文件地址，newPath 新文件地址，callback 回调函数。renameSync(oldPath, newPath)同步命名。

使用重命名 API 可以实现文件移动的效果。

```js
const fs = require("fs");
fs.rename("./demo.jpg", "./newDemo.jpg", (err) => {
  if (err) {
    console.log("重命名失败");
    return;
  }
  console.log("重命名成功");
});
```

2.7 文件删除

使用 fs.unlink(path, callbck) 删除文件，path 文件路径，callback 回调函数。unlinkSync(path) 同步删除。

也可以使用 fs.rm(path, callbck) 删除文件，path 文件路径，callback 回调函数。rmkSync(path) 同步删除。

```js
const fs = require("fs");

fs.unlink("./newDemo.jpg", (err) => {
  if (err) {
    console.log("删除失败");
    return;
  }
  console.log("删除成功");
});
// or
fs.rm("./newDemo.jpg", (err) => {
  if (err) {
    console.log("删除失败");
    return;
  }
  console.log("删除成功");
});
```

2.8 文件夹操作

2.8.1 创建

使用 fs.mkdir(path[, options], callback) 创建文件夹，path 文件夹路径，options 可选配置，callback 回调函数。mkdirSync(path[, options]) 同步创建。

```js
const fs = require("fs");
fs.mkdir("./demo", (err) => {
  if (err) {
    console.log("创建文件夹失败");
    return;
  }
  console.log("创建文件夹成功");
});
```

递归创建文件夹，需要添加配置 { recursive: true }

```js
const fs = require("fs");
fs.mkdir("./demo/assets/img", { recursive: true }, (err) => {
  if (err) {
    console.log("创建文件夹失败");
    return;
  }
  console.log("创建文件夹成功");
});
```

2.8.2 读取

使用 readdir(path[, options], callback) 读取文件夹有哪些文件，path 文件夹路径，options 可选配置，callback 回调函数。readdirSync(path[, options]) 同步读取。

```js
const fs = require("fs");
fs.readdir("./demo", (err, data) => {
  if (err) {
    console.log("读取文件夹失败");
    return;
  }
  console.log("读取文件夹成功", data); // 读取文件夹成功 [ 'assets' ]
});
```

读取文件夹下所有文件，需要添加配置 { recursive: true }

```js
const fs = require("fs");
fs.readdir("./demo", { recursive: true }, (err, data) => {
  if (err) {
    console.log("读取文件夹失败");
    return;
  }
  console.log("读取文件夹成功", data); // 我没有读取成功，可能 node 版本需要22以上
});
```

2.8.3 删除

使用 fs.rmdir(path[, options], callbck) 删除文件，path 文件路径，options 可选配置，callback 回调函数。rmdirSync(path[, options]) 同步删除。

注意：删除的文件夹下不能有文件。

```js
const fs = require("fs");

fs.rmdir("./demo", (err) => {
  if (err) {
    console.log("删除失败");
    return;
  }
  console.log("删除成功");
});
```

递归删除，删除文件夹包括文件夹所有文件。需要配置 { recursive: true }

```js
const fs = require("fs");

fs.rmdir("./demo", { recursive: true }, (err) => {
  if (err) {
    console.log("删除失败");
    return;
  }
  console.log("删除成功");
});
```

2.9 查看资源状态

使用 fs.stat(path[, options], callbck) 查看资源详细信息，path 文件路径，options 可选配置，callback 回调函数。查看成功后回调函数返回的 data 有两个方法，可以判断查看文件的类型，data.isFile()，data.isDirectory()。 rmdirSync(path[, options]) 同步查看。

```js
const fs = require("fs");

fs.stat("./demo.mp4", (err, data) => {
  if (err) {
    console.log("查看失败");
    return;
  }
  console.log("查看成功", data);
  //  查看成功 Stats {
  //   dev: 3603322110,
  //   mode: 33206,
  //   nlink: 1,
  //   uid: 0,
  //   gid: 0,
  //   rdev: 0,
  //   blksize: 4096,
  //   ino: 844424930382849,
  //   size: 101030174,
  //   blocks: 197328,
  //   atimeMs: 1718876089782.0842,
  //   mtimeMs: 1718876089782.0842,
  //   ctimeMs: 1718876089782.0842,
  //   birthtimeMs: 1718876088481.4133,
  //   atime: 2024-06-20T09:34:49.782Z,
  //   mtime: 2024-06-20T09:34:49.782Z,
  //   ctime: 2024-06-20T09:34:49.782Z,
  //   birthtime: 2024-06-20T09:34:48.481Z
  // }
  console.log(data.isFile()); // true
  console.log(data.isDirectory()); // false
});
```

3. path 模块

path 模块是用来操作路径的。

3.1 拼接绝对路径

使用 path.resolve(path[, path]...) 拼接路径，path 文件路径，使用 \_\_dirname 拿到当前文件所在的目录，然后拼接第二个参数，第二个参数需要是相对路径，输出结果为\拼接的路径。

```js
const path = require("path");
path.resolve(__dirname, "./demo.mp4");
// 等于
path.resolve(__dirname, "demo.mp4");
```

3.2 获取操作系统分隔符

使用 path.sep 获取操作符，不同操作系统分隔符不一样，windows \，Linux /

```js
const path = require("path");
path.sep; // \
```

3.3 解析路径

使用 path.parse(path) 解析路径，path 文件路径。可以解析文件所在盘符 root、所在文件夹 dir、文件全名 base、拓展符 ext、文件名 name

```js
const path = require("path");
path.parse(__filename);
// {
//   root: 'D:\\',
//   dir: 'D:\\xxx\\xxx\\xxx\\xxx\\dist',
//   base: 'index.js',
//   ext: '.js',
//   name: 'index'
// }
```

3.4 获取路径基础名称

使用 path.basename(path) 获取文件名，path 文件路径。

```js
const path = require("path");
console.log(__filename); // D:\xxx\xxx\xxx\xxx\dist\index.js
console.log(path.basename(__filename)); // index.js
```

3.5 获取路径目录名

使用 path.dirname(path) 获取文件名，path 文件路径。

```js
const path = require("path");
console.log(__filename); // D:\git项目\notes\docs\每日博客\dist\index.js
console.log(path.dirname(__filename)); // D:\git项目\notes\docs\每日博客\dist
```

3.6 获取路径拓展名

使用 path.extname(path) 获取文件名，path 文件路径。

```js
const path = require("path");
console.log(__filename); // D:\git项目\notes\docs\每日博客\dist\index.js
console.log(path.extname(__filename)); // .js
```

4. http 模块

4.1 创建服务对象

使用 http.createServer(callbck) 创建服务对象 server，callback 回调函数。

callback(res, req) 接受两个参数，res 请求报文、req 响应报文。

res.end(content)：设置响应内容。

res.setHeader(key, value)：设置响应头

使用 server.listen(port, callback) 监听端口，启动服务。当服务启动成功执行 listen 的回调。启动成功后 8080 端口就被我们的服务给占了，以后有程序访问我们电脑 8080 端口，我们创建服务的回调函数就会执行。

当我们的服务接受到 http 请求时，执行回调函数。浏览器可以向我们的服务发送 http 请求。

HTTP 协议默认端口 80，HTTPS 协议默认端口 443。

```js
const http = require("http");
const server = http.createServer((req, res) => {
  res.end("hello man");
});
server.listen(80, () => {
  console.log("服务启动成功:", "http://127.0.0.1:80");
});
```

4.2 获取请求报文

获取请求报文数据。

req.method：请求方法
req.url：请求路径，只包含路径和查询条件
req.headers：请求头
req.httpVersion：请求版本
req.on('data', (chunk) => {})：流式获取请求体
req.on('end', () => {})：请求体获取完成

为什么需要获取到请求报文勒？因为我们需要正确返回请求的数据。

```js
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  console.log(req.method); // GET
  console.log(req.httpVersion); // 1.1
  console.log(req.url); // /
  console.log(req.headers);
  req.on("data", (chunk) => {
    console.log(chunk);
  });
  req.on("end", () => {
    console.log("获取完毕");
  });
  res.end("ok");
});

server.listen(80, () => {
  console.log("服务启动成功:", "http://127.0.0.1:80");
});
```

4.3 获取请求体

使用 new URL(req.url, 'http://127.0.0.1') 拿到请求报文路径，pathname 输出路径，searchParams.get(key) 查询字符串

```js
// 访问 127.0.0.1/login?username='yqcoder'&password=111
const http = require("http");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  console.log(url.pathname); // /login
  console.log(url.searchParams.get("username")); // yqcoder
  res.end("hello");
});

server.listen(80, () => {
  console.log("服务启动成功:", "http://127.0.0.1:80");
});
```

4.4 设置响应报文

状态码 statusCode、状态描述 statusMessage、响应头 setHeader、响应体 write()、end()，一般我们在 write 里设置了响应体，就不会在 end 里传值了。

```js
const http = require("http");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  res.statusCode = 200;
  res.statusMessage = "成功";
  res.setHeader("Content-type", "text/html;charset=utf-8");
  res.write("name");
  res.end("你好");
});

server.listen(80, () => {
  console.log("服务启动成功:", "http://127.0.0.1:80");
});
```

4.5 设置响应体

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html;charset=utf-8");
  const html = fs.readFileSync(`${__dirname}/index.html`);
  res.end(html);
});

server.listen(80, () => {
  console.log("服务启动成功:", "http://127.0.0.1:80");
});
```

4.6 网页资源加载基本过程

输入网址按回车后，服务器首先返回 html 资源，然后根据 html 中的外部链接，继续返回相应的静态资源。静态文件一般包括 js、css、图片、视频等。

静态资源请求的路径，是启动服务文件所在路径的相对路径。举个例子，html 文件外链了 css，js，png，mp4 等资源。启动服务获取这些外联资源。

搭建一个静态资源服务

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html;charset=utf-8");
  const { pathname } = new URL(req.url, "http://127.0.0.1");
  let filename = __dirname + pathname;

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("文件读取失败");
      return;
    }
    res.end(data);
  });
});

server.listen(80, () => {
  console.log(`服务启动成功：http://127.0.0.1`);
});
```

4.7 静态资源目录和网站根目录

静态资源存在的文件夹称之为静态资源目录也被称为网站根目录。

5. url 模块

写接口时，浏览器的请求路径和查询字符串是很重要的。所以需要使用 url 模块去提取我们所需要的路径信息。

5.1 解析路径

使用 url.parse(path[, boolean]) 解析请求路径，path 请求路径，boolean 查询字符串是否以对象展示。url.parse(path) 返回一个路径对象 result。通过 result.pathname 获取路径。result.query 获取查询字符串。

```js
// 浏览器访问 http://127.0.0.1/admin/login?username=yqcoder&password=111
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  let result = url.parse(req.url, true);
  console.log(result);
  // Url {
  //   protocol: null,
  //   slashes: null,
  //   auth: null,
  //   host: null,
  //   port: null,
  //   hostname: null,
  //   hash: null,
  //   search: '?username=yqcoder&password=111',
  //   query: [Object: null prototype] { username: 'yqcoder', password: '111' },
  //   pathname: '/admin/login',
  //   path: '/admin/login?username=yqcoder&password=111',
  //   href: '/admin/login?username=yqcoder&password=111'
  // }
  res.end("hello man");
});
server.listen(80, () => {
  console.log("服务启动成功:", "http://127.0.0.1:80");
});
```

5.2 网页 URL 中的绝对路径

绝对路径可靠性强，而且容易理解，直接向目标资源发送请求，多用于网站的外链。

绝对路径有三种形式：1. http://www.baidu.com/demo.png 完全体 2. //www.baidu.com/demo.png 与页面协议拼接 3. /demo.png 与页面协议、域名、端口拼接。

我们项目中静态资源多用于第三种形式，这样部署到不同的域名，也可以直接访问到。

5.3 网页 URL 中的相对路径

相对于当前文件夹的路径。需要与当前页面 URL 进行拼接。

相对路径有三种形式：1. ./css/index.css 等于 css/index.css 2. ../js/index.js 3. ../../assets/demo.png

5.4 网页中 URL 使用场景

a 标签 href、link 标签 href、script 标签 src、img 标签的 src、video audio 标签的 src、form 标签的 action、AJAX 请求的 URL 等。

5.5 mime 类型

用来表示文档、文件、或字节流的性质和格式。格式 [type]/[subType]。

HTTP 服务设置响应头 Content-Type 来声明响应体的 MIME 类型。MIME 类型有：

```js
html: "text/html";
css: "text/css";
js: "text/javescript";
png: "image/png";
jpg: "image/jpg";
gif: "image/gif";
mp4: "video/mp4";
mp3: "audio/mpeg";
json: "application/json";
```

对未知资源使用 application/octet-stream 类型。浏览器遇到该类型的响应时，会对响应体内容进行独立储存，也就是我们常见的下载效果。

5.6 解决乱码问题

中文乱码时，通过设置响应头 Content-Type: 'mime 类型;charset=utf-8'。

5.7 GET 和 POST 区别

GET 请求情况：地址栏输入 url、a 链接、link、script、video、audio、img、form 标签 method 为 get、ajax 中的 get

POST 请求情况：form 标签 post、AJAX 的 post 请求

主要区别：

```js
作用：GET用于获取数据、POST 用于提交数据
参数位置：GET请求是一般将参数缀到 URL 之后、POST 请求一般是将参数放到请求体中
安全性：POST相较于GET安全一些。
大小限制：GET 传参一般是2K、POST 传参没限制
```

四、Express 框架

express 是一个封装好的开发框架，封装了很多功能，便于我们开发 WEB 应用。

1. express 初体验

安装依赖

```bash
npm install express
```

构建 server.js

```js
const express = require("express");
const app = express();

app.get("/home", (req, res) => {
  res.end("hello express");
});

app.listen(3000, () => {
  console.log("服务启动成功.....");
});
```

2. 路由介绍

路由确定了客户端对特定端点的请求，路由构成 app.<method>(path, callback)，请求方法、路径、回调函数。

```js
app.get("/home", (req, res) => {
  res.end("hello");
});
```

3. 路由的使用

匹配 get 请求

```js
app.get("/info", (req, res) => {});
```

匹配 post 请求

```js
app.post("/login", (req, res) => {});
```

匹配 get/post 请求。

```js
app.all("/login", (req, res) => {});
```

匹配所有请求，一般用于响应 404 页面

```js
app.all("*", (req, res) => {});
```

4. 获取请求报文

express 封装了一些 API 快速获取请求报文，req.path 路径、req.query 请求参数、req.ip 客户端 ip

```js
// 例子 /login?username=yqcoder&password=111
app.post("/login", (req, res) => {
  req.path; // /login
  req.query; // { username: 'yqcoder', password: '111' }
  req.ip; // 127.0.0.1
});
```

5. 获取路由参数

类似京东详情页 10086.tml、10011.html 等，我们使用占位符 id 去匹配这种客户端请求。通过 req.params.id 拿到。

```js
app.get("/:id.html", (req, res) => {
  // 获取 URL 路由参数
  req.params.id; //
  res.end("成功");
});
```

6. 响应设置

express 封装了一些 API 快速设置响应，并且可以链式设置。res.status 设置状态，res.set 设置响应头，res.send 设置响应体

```js
app.get("/login", (req, res) => {
  res.status(200).set("abc", "123").send("这是OK");
});
```

7. 其他响应

可以对 http 请求做出其他响应。redirect 重定向，download 下载响应，json 响应 json，sendFile 响应文件内容

```js
app.get("/login", (req, res) => {
  // 重定向;
  res.rediect("http://www.baidu.com");
  // 下载响应
  res.download(__dirname + "/demo.mp4");
  // JSON 响应
  res.json({
    name: "yqcoder",
    slogan: "yyyyy",
  });
  // 响应文件内容
  res.sendFile(__dirname + "/test.html");
});
```

8. 中间件

8.1 什么是中间件

中间件本质是一个回调函数，可以像路由回调一样访问请求对象(req)、响应对象(res)

8.2 中间件的作用

封装公共操作，简化代码

8.3 中间件的类型

中间件类型分为：全局中间件、路由中间件、静态资源中间件

全局中间件：对所有请求做处理

```js
function recordMiddleware(req, res, next) {
  let { ip, url } = req;
  console.log(ip, url);
  next();
}

app.use(recordMiddleware);
```

路由中间件：只对特定路由做处理

```js
function checkCodeMiddleware(req, res, next) {
  if (req.query.code === "521") {
    next();
  } else {
    res.send("无权限");
  }
}

app.get("/menu", checkCodeMiddleware, (req, res) => {
  res.send("后台首页");
});
```

静态资源中间件：express 内置的中间件，设置静态资源请求的路径。

```js
// dirname + '/public' 这是静态资源文件夹路径
app.use(express.static(__dirname + "/public"));
```

静态资源中间件注意事项：1. index.html 为默认打开资源。2. 静态资源与路由同时匹配，谁先匹配谁就响应。3. 路由响应动态资源，静态资源中间件响应静态资源。

9. 获取请求体

express 可以使用 body-parser 包处理请求体

9.1 安装

```bash
npm install body-parser
# or
yarn add body-parser
# or
pnpm add body-parser
```

9.2 使用

获取中间件函数，路由导入中间件。urlencoded 解析 querystring 格式请求体的中间件。json 解析 JSON 格式请求体的中间件。

```js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// 解析 querystring
const urlParser = bodyParser.urlencoded({ extended: false });
// 解析 JSON
let jsonParser = bodyParser.json();

app.post("/login", urlParser, (req, res) => {
  req.body; // 请求体
  req.body.username; // 用户名
  req.body.password; // 密码
});
```

10. 防盗链

禁止其他跨域网站访问我们的资源。请求头 referer 会携带请求资源的网址。

我们通过在中间件使用 req.get('referer') 拿到 referer 的值，然后去判断。

```js
app.use((req, res, next) => {
  let referer = req.get("referer");
  if (referer) {
    let url = new URL(referer);
    let hostname = url.hostname;
    if (hostname !== "白名单网址") {
      res.status(404).send("不给看");
      return;
    }
  }
  next();
});
```

11. 路由模块化

随着业务的增加，不可能将所有路由都写在一个文件里面，需要将不同功能的路由拆分出去，这就是路由模块化。

例如我们拆分出登录路由 login.js

```js
const express = require("express");
// 创建路由对象
const router = express.Router();

router.post("/login", (req, res) => {});

module.exports = router;
```

在 app.js 中导入 login.js

```js
const express = require("express");
const loginRouter = require("./login.js");

const app = express();

app.use(loginRouter);
```

也可以在 app.use(路由前缀, 路由模块)，使用路由前缀。就是路由模块的路由都会加上路由前缀。

```js
const express = require("express");
const loginRouter = require("./login.js");

const app = express();

app.use("/admin", loginRouter);
```

12. EJS 模板引擎

12.1 什么是模板引擎

模板引擎是用于分离用户界面和业务数据的一种技术。可用于在后端直接生成 html 页面，浏览器获取页面直接展示，这就是前后端没分离时候的开发模式。

12.1 模板引擎有什么用

SEO 搜索引擎对于后端生成的 html 有更好的搜索效果。一些推广项目页面，对 SEO 有高要求，这时就需要模板引擎，去后端直接生成 html 页面。

12.2 安装 EJS

```bash
npm install ejs
# or
yarn add ejs
# or
pnpm add ejs
```

12.3 EJS 语法

调用 ejs.render(template, data) 渲染函数，template 渲染模板，data 渲染数据对象。

12.3.1 变量

在渲染模板中使用 <%= 变量名 %> 接收变量。

```js
const ejs = require("ejs");

let result = ejs.render("my name is <%= name %>", { name: "yqcoder" });

console.log(result); // my name is yqcoder
```

12.3.2 循环

多用于列表的渲染，使用 <% list.forEach(item => { %> 列表内容 <% }) %> 循环数据

```js
const ejs = require("ejs");

let result = ejs.render(
  `
  <ul>
    <% list.forEach(item => { %>
    <li><%= item.name %></li>
    <% }) %>
  </ul>
`,
  { list: [{ name: "yqcoder" }, { name: "yy" }] }
);
```

12.3.3 条件渲染

使用 <% if(条件) {%> 结果 1 <% } else { %> 结果 2 <% } %> 判断。

```js
const ejs = require("ejs");

let isMan = true;

let result = ejs.render(
  `
  <% if(isMan) {%>
  <span>i am man</span>
  <% } else { %>
  <span>i am woman</span>
  <% } %>
  `,
  { isMan }
);
```

12.4 在 express 中使用 ejs

创建 views 文件夹存放模板文件，通过 app.set('view engine', 'ejs') 设置模板引擎，通过 app.set('views', path.resolve(\_\_dirname, './views')) 设置模板文件存放位置。通过 res.render(模板文件名, 数据) 渲染页面并返回浏览器。

```js
const express = require("express");
const ejs = require("ejs");
const path = require("path");

const app = express();

// 设置模板引擎
app.set("view engine", "ejs");
// 设置模板位置
app.set("views", path.resolve(__dirname, "./views"));

let title = "yqcoder";
app.get("/home", (req, res) => {
  res.render("home", { title });
});
```

创建 home.ejs 模板文件，必须是 ejs 后缀。不然读取不到。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="initial-scale=1.0, user-scalable=no, width=device-width"
    />
    <title>document</title>
    <style>
      body {
        background: #000;
      }
    </style>
  </head>
  <body>
    <h1><%= title %></h1>
    <script></script>
  </body>
</html>
```

五、express-generator 脚手架

可以快速搭建服务端框架。

1. 安装

全局安装 express-generator，通过 express -v 查看是否安装成功

```bash
npm install -g express-generator
```

2. 使用

通过 express 命令快速搭建服务端框架，express -e 是在框架中使用 ejs 模板引擎

```bash
express -e
```

创建成功后，安装依赖

```bash
npm install
```

依赖安装成功后，启动服务

```bash
npm run start
```

启动成功后，去浏览器访问 127.0.0.1:3000，就可以看到页面了。

<!-- 1 -->

3. 文件上传

服务端生成页面，构建两个路由，一个路由返回表单页面，一个路由处理提交数据

3.1 页面路由

返回表单页面路由，form 为 ejs 模板 form.ejs。

```js
app.get("/form", (req, res) => {
  res.rend("form");
});
```

3.2 form.ejs

构建 form.ejs 模板，文件上出 form 标签必须加 enctype="multipart/form-data" 属性

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="/form" method="post" enctype="multipart/form-data">
      名字：<input type="text" name="username" /> 头像：<input
        type="file"
        name="png"
      />
      <button>提交</button>
    </form>
  </body>
</html>
```

3.3 处理文件数据

使用 formidable 依赖处理文件数据路由，拿到上传的文件然后保存到 public 文件夹下，方便后续使用。

安装 formidable 依赖

```bash
npm install formidable@v2
# or
yarn add formidable@v2
# or
pnpm add formidable@v2
```

在 express 使用 formidable。

```js
const formidable = require("formidable");

app.post("/form", (req, res) => {
  const form = formidable({
    multiples: true,
    // 设置文件保存目录
    uploadDir: path.resolve(__dirname, "./public/images"),
    // 保存文件后缀
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files, next) => {
    if (err) {
      next(err);
      return;
    }

    // 非文件数据对象
    console.log(fields); // { username: 'yqcoder' }

    // 文件数据
    console.log(files);
    // {
    //   png: PersistentFile {
    //     _events: [Object: null prototype] { error: [Function (anonymous)] },
    //     _eventsCount: 1,
    //     _maxListeners: undefined,
    //     lastModifiedDate: 2024-06-25T01:59:25.136Z,
    //     filepath: 'D:\\node 练习\\public\\images\\af1034ff25dae9a8f38e7ef00.mp4',
    //     newFilename: 'af1034ff25dae9a8f38e7ef00.mp4',
    //     originalFilename: 'video.mp4',
    //     mimetype: 'video/mp4',
    //     hashAlgorithm: false,
    //     size: 101030174,
    //     _writeStream: WriteStream {
    //       fd: 4,
    //       path: 'D:\\node 练习\\public\\images\\af1034ff25dae9a8f38e7ef00.mp4',
    //       flags: 'w',
    //       mode: 438,
    //       start: undefined,
    //       pos: undefined,
    //       bytesWritten: 101030174,
    //       _writableState: [WritableState],
    //       _events: [Object: null prototype],
    //       _eventsCount: 1,
    //       _maxListeners: undefined,
    //       [Symbol(kFs)]: [Object],
    //       [Symbol(kIsPerformingIO)]: false,
    //       [Symbol(kCapture)]: false
    //     },
    //     hash: null,
    //     [Symbol(kCapture)]: false
    //   }
    // }

    // 数据库保存文件访问 url
    let url = `/images/${files.png.newFilename}`;
    console.log(url); // /images/af1034ff25dae9a8f38e7ef00.mp4

    res.json({ fields, files });
  });
});
```

六、Mongodb

1. Mongodb 介绍

基于分布式文件存储的数据库，什么是数据库？数据库是按照数据结构来组织、储存、管理数据的应用程序。数据库的作用？主要用来管理数据，对数据进行增、删、改、查。数据库特点是速度快、扩展性强、安全性强。为什么选择 Mongodb？操作语法与 JS 相似，易上手，学习成本低。

2. 下载/安装

[下载 Mongodb](https://www.mongodb.com/try/download/community)，选择 5.0.14 版本，然后选择 windows 平台，然后选择 zip 压缩包。

将下载好的包放到 C:Programs Files 下，然后解压。

在 C 盘下创建文件夹 data，在 data 下创建文件夹 db。这就是 mongodb 默认存放文件的位置 C:data/db。在 mongodb 的 bin 目录下启动命令，运行命令 mongod，我们就把数据库服务跑起来了。

<!-- 2 -->

同样在 bin 目录下再开一个命令，运行 mongo ，这时我们就把客户端链接到了服务端，可以向服务端发送一些请求了。为了方便，不用每次都要在 bin 目录下去启动数据库服务，我们可以把 bin 目录配置到环境变量去。

<!-- 3 -->

3. Mongodb 核心概念

有三个核心概念：数据库（database）、集合（collection）、文档（document），数据库类似一个 JSON 文件，集合类似 JSON 文件中的一个数组属性，文档类似 JSON 文件中数组属性里面的对象。

3.1 数据库（databse）

数据库是一个数据仓库，数据库服务下可以创建很多数据库，数据库中可以创建很多集合。

3.2 集合（collection）

集合类似 JS 中的数组，里面可以存放很多文档。

3.3 文档（document）

文档是数据库中的最小单位，类似 JS 中的对象。

4. 客户端操作

客户端有哪些操作可以请求服务端勒？分为数据库命令、集合命令、文档命令

4.1 数据库命令

主要就是对数据库进行一些操作

4.1.1 show dbs

显示所有数据库

<!-- 4 -->

4.1.2 use 数据库名

切换到指定数据库，如果没有就自动创建

<!-- 5 -->

4.1.3 db

显示当前所在数据库

<!-- 6 -->

4.1.4 db.dropDatabase()

删除当前数据库

4.2 集合命令

主要是对集合的一些操作

4.2.1 db.createCollection('集合名')

创建集合

4.2.2 show collections

显示当前数据库中的所有集合

4.2.3 db.集合名.drop()

删除某个集合

4.2.4 db.集合名.renameCollection('集合名')

重命名集合名

4.3 文档命令

主要是对文档的一些操作

4.3.1 db.集合名.insert('文档对象')

插入文档

4.3.2 db.集合名.find(查询条件)

查询文档

4.3.3 db.集合名.update(查询条件, 新文档)

更新文档，db.集合名.update({name: '张三'}, {$set: {age: 13}})

4.4.4 db.集合名.remove(查询条件)

删除文档

七、mongoose 包

使用 mongoose 可以在 nodeJs 中操作数据库。

1. 安装

```bash
npm install mongoose
# or
yarn add mongoose
# or
pnpm add mongoose
```

2. 导入/连接数据库

连接数据库时，要确保数据库服务是启动状态。

```js
const mongoose = require("mongoose");

// 连接 mongodb 服务中的 books 数据库，如果不存在，会自动创建
mongoose.connect("mongodb://127.0.0.1:27017/books");
```

2.1 成功回调

连接成功后，在里面做的一些操作，官网推荐使用 once 而不是 on，就是只做一次监听。如果是连接断开又重新连接是不会触发这个回调。

```js
mongoose.connection.once("open", () => {
  console.log("连接成功");
});
```

2.2 失败回调

设置连接错误的回调

```js
mongoose.connection.on("error", () => {
  console.log("连接失败");
});
```

2.3 关闭回调

设置连接关闭回调

```js
mongoose.connection.on("close", () => {
  console.log("关闭连接");
});
```

2.4 断开连接

```js
mongoose.disconnect();
```

3. 操作语法

3.1 创建结构对象

通过 new mongoose.Scheme(定义对象[, 配置]) 定义文档的结构对象。用来约束集合中文档的属性和属性类型。

```js
const BookScheme = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
});
```

3.2 创建模型对象

通过 mongoose.model("集合名", 结构对象) 创建模型对象，对文档操作的封装对象。这个对象可以完成对文档的增、删、改、查操作。

```js
const BookModel = mongoose.model("books", BookScheme);
```

3.3 新增

通过 BookModel.create(文档对象) 模型对象的方法，新增文档。

```js
BookModel.create({
  name: "金瓶梅",
  author: "yqcoder",
  price: 19.9,
});
```

3.4 删除

通过 BookModel.deleteOne(查询条件)/BookModel.deleteMany(查询条件) 模型对象的方法，删除文档。

```js
// 删除一个
const data = await BookModel.deleteOne({ name: "金瓶梅" });

// 批量删除
const data = await BookModel.deleteMany({ isShow: false });
```

3.5 修改

通过 BookModel.updateOne(查询条件, 文档对象)/BookModel.updateMany(查询条件, 文档对象) 模型对象的方法，修改文档。

```js
// 修改一个
const data = await BookModel.updateOne({ name: "金瓶梅" }, { isShow: true });

// 批量修改
const data = await BookModel.updateMany({ sex: "man" }, { love: "woman" });
```

3.6 查找

通过 BookModel.findOne(查询条件)/BookModel.findById(id) 模型对象的方法，查找文档。

```js
// 查找一个
const data = await BookModel.findOne({ name: "yqcoder" });

// 通过 id 查找
const data = await BookModel.findById(id);

// 批量获取
const data = await BookModel.find();
```

3.7 条件查询

通过运算符 $lt <, $lte <=, $gt >, $gte >=, $ne !==, $or 或, $and 与。查找

```js
// 价格小于 20
const data = await BookModel.find({ price: { $lt: 20 } });
```

使用正则查询，name 中包含 'yq' 字符串的数据

```js
const data = await BookModel.find({ name: /yq/ });
```

3.8 返回指定属性

通过 select 返回前端用的上的字段

```js
// 只返回name，author
const data = await BookModel.find({}).select({ name: 1, author: 1, _id: 0 });
```

3.9 排序

按 price 正序排列返回，1 是正序，-1 是倒序。

```js
const data = await BookModel.find().sort({ price: 1 }); // 正序
```

3.10 数据截取

通过 skip 跳过、limit 限定来做数据截取

```js
// 跳过前 10 条数据查询
const data = await BookModel.find().skip(10);

// 只截取数据的前10条
const data = await BookModel.find().limit(10);
```

4. 字段类型

mongoose 有 9 种类型：String 字符串、Number 数字、Boolean 布尔值、Array 数组、Date 日期、Buffer Buffer 对象、Mixed 任意类型、ObjectId 对象 ID、Decimal128 高精度数字

5. 字段验证

mongoose 有一些内置的验证方法 required、default、enum、unique，为什么需要字段验证？因为永远不要相信用户的输入。

5.1 required

属性是否必填

```js
let BookModel = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});
```

5.2 default

属性的默认值，如果前端没传，默认写入就是默认值

```js
let BookModel = new mongoose.Schema({
  author: {
    type: String,
    default: "yqcoder",
  },
});
```

5.3 enum

枚举值，传入的值必须是枚举值内的值

```js
let BookModel = new mongoose.Schema({
  price: {
    type: Number,
    enum: [19.9, 199],
  },
});
```

5.4 unique

唯一值，就是这个值在集合中是唯一的不可重复的。

```js
let BookModel = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
  },
});
```

八、moment 日期处理

1. 安装

```bash
npm install moment
# or
yarn add moment
# or
pnpm add moment
```

2. 导入/使用

```js
const moment = require("moment");

// 转换日期对象保存到数据库
moment("2024-5-20").toDate(); // 2024-05-19T16:00:00.000Z

// 生成固定格式日期
moment(new Date()).format("YYYY-MM-DD"); // 2024-06-26
```

九、接口

[免费接口试用](http://free-api.com/doc)

1. 什么是接口

实现前后端通信，接口一般称为 API 接口，在后端一个接口就是一个路由规则。

2. RESTful API

有编写规则的 API：1. 不能在路径中使用动词。2. 操作资源要与请求方式对于。3. 返回状态码要与返回结果对应。

3. 接口测试工具

有 apipost、postman。推荐使用 apipost。

十、会话控制

就是权限控制，不同用户不同数据不同权限。会话控制可以通过 cookie、session、token 三种方式控制。

1. cookie

cookie 是服务器发送到客户端的一小块数据，cookie 按照域名划分保存。通过响应头发送 set-cookie: name=yqcoder，浏览器解析到 set-cookie 就会将这个值保存在本地 cookie 上，下次请求就会带上。

特点：向服务器发送请求时，会自动将 cookie 设置在请求头，浏览器关闭时销毁。

1.1 安装

```bash
npm install cookie-parser
# or
yarn add cookie-parser
# or
pnpm add cookie-parser
```

1.2 使用

1.2.1 设置 cookie

```js
// 登录成功设置 cookie
app.post("/login", (req, res) => {
  res.cookie("name", "lisi", { maxAge: 1000 * 60 });
});
```

1.2.2 删除 cookie

```js
app.post("/logout", (req, res) => {
  res.clearCookie("name");
});
```

1.2.3 读取 cookie

```js
app.get("/user", (req, res) => {
  req.cookies; // { name: 'lisi' }
});
```

2. session

session 是保存在服务器的一块数据。

流程：登录后，服务器保存[{ sid: 'xxxx', username: 'lisi', user_id: '1' }]，通过设置 cookie，保存 sid 的值，下次发送请求携带 cookie，通过 sid 判断用户身份

2.1 安装

```bash
npm install express-session connect-mongo
# or
yarn add express-session connect-mongo
# or
pnpm add express-session connect-mongo
```

2.2 使用

```js
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    name: "sid", // 设置cookie的name
    secret: "yqcoder", // 参与加密的字符串
    saveUninitializad: false, // 是否为每一个请求都设置cookie用来储存session的id
    resave: true, // 是否在每次请求后重新保存session
    store: MongoStore({
      mongoUrl: "mongodb://127.0.0.1:27017/demo", // 数据库连接
    }),
    cookie: {
      httpOnly: true, // 开启后前端无法通过js操作
      maxAge: 1000 * 60, // 过期时间
    },
  })
);
```

TO BE CONTINUE

2.2.1 设置 session

```js
app.post("/login", (req, res) => {
  req.session.username = req.body.usernmae;
  req.session.password = req.body.password;
  req.session.uid = "xxxxxxxx";
});
```

2.2.2 读取 session

```js
app.get("/user", (req, res) => {
  req.session.username;
});
```

2.2.3 销毁 session

```js
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("退出成功");
  });
});
```

3. token

token 是服务端生成返回给客户端的一串加密字符串，token 中保存着用户信息，在移动端或小程序用的比较多。

特点：服务端压力更小、相对更安全、扩展性更强

3.1 安装

```bash
npm install jsonwebtoken
# or
yarn add jsonwebtoken
# or
pnpm add jsonwebtoken
```

3.2 使用

3.2.1 创建 token

通过 jwt.sign(用户数据, 加密字符串, 配置对象) 使用

```js
const jwt = require("jsonwebtoken");

app.post("/login", (req, res) => {
  let token = jwt.sign(
    {
      username: "yqcoder",
    },
    "manxxxxx",
    {
      expiresIn: 60, // 单位秒
    }
  );
});
```

3.2.2 校验 token

使用 jwt.verify(token, 加密字符串, callback)

```js
const jwt = require("jsonwebtoken");

app.get("/list", (req, res) => {
  jwt.verify(res.token, "manxxxxx", (err, data) => {});
});
```

4. cookie 和 session 的区别

cookie：存放在浏览器中，安全性较低，内容过多影响传输效率，存储大小不超过 4k。

session：存放在服务器中，安全性相对较好，不影响传输效率，存储没有限制。

十、md5 单向加密

用户密码明文存储在数据库，也不一定安全，所以需要 md5 单向加密。除了用户，谁也不知道密码是多少，数据库也只能看到一堆加密后的乱码。

1. 安装

```bash
npm install md5
# or
yarn add md5
# or
pnpm add md5
```

2. 使用

```js
const md5 = require("md5");

app.post("/login", (req, res) => {
  md5(req.body.password);
});
```
