# NodeJs 官网速通

前言：参考[Node.js 中文网](https://nodejs.cn/en)，可以通过[Node.Js V19 API 文档](https://nodejs.org/api/documentation.html)查看常用 API 。

一：入门指南

1. Node.js 简介

1.1 什么是 Node.js

Node.js 是一个运行环境，这个运行环境是基于谷歌 v8 引擎的，用于在服务端运行 JS 代码。

Node.js 采用事件驱动、非阻塞式 I/O 的设计理念，使 JS 能高效地处理大量并发请求。

Node.js 还提供了许多系统级的 API，如文件操作、网络编程等，我们可以使用 Node.js 来读取文件，发送 HTTP 请求，实现 TCP/IP 通信等。

1.2 Node.js 可以做什么

构建 Web 应用、编写 RESTful API、实时消息服务、自动化测试、持续集成(CI)、持续部署(CD)。

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

4. npm 包管理器简介

4.1 npm 简介

npm 是 Node.js 的标准包管理器。我们习惯使用 yarn 或 pnpm 来代替 npm。因为可以更快安装依赖。

4.2 包

npm 管理项目依赖的下载。

4.3 安装所有依赖

如果项目有一个 package.json 文件，通过运行 npm install 来安装依赖。它会将所需依赖安装到 node_modules 文件夹，如果尚不存在，则创建它。

```bash
npm install
# or
yarn install
# or
pnpm install
```

4.4 安装单个包

可以通过包名来安装特定的包。

```bash
npm install <package-name>
// or
yarn add <package-name>
# or
pnpm add <package-name>
```

4.5 更新软件包

npm 将检查所有软件包是否有满足版本控制约束的较新版本。

```bash
npm update
# or
yarn update
# or
pnpm update
```

4.6 更新单个包

```bash
npm update <package-name>
# or
yarn update <package-name>
# or
pnpm update <package-name>
```

4.7 指定安装固定版本包

指定版本有助于让每个人都使用相同的软件包版本，以便整个团队运行相同的版本。

```bash
npm install <package-name>@<version>
# or
yarn add <package-name>@<version>
# or
pnpm add <package-name>@<version>
```

4.8 运行任务

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

二：异步工作

1. 异步流控
2. 阻塞与非阻塞概述
3. JS 异步编程和回调
4. 理解 process.nextTick()
5. 探索 JS 定时器
6. 理解 setImmediate()
7. Node.js 事件发射器

三：操作文件

1. Node.js 文件统计信息
2. Node.js 文件路径
3. T 在 Node.js 中使用文件描述符
4. 使用 Node.js 读取文件
5. 使用 Node.js 写入文件
6. 在 Node.js 中使用文件夹

四：命令行

1. 从命令行运行 Node.js 脚本
2. 如何从 Node.js 读取环境变量
3. 如何使用 Node.js REPL
4. 使用 Node.js 输出到命令行
5. 在 Node.js 中接受来自命令行的输入

五：模块
