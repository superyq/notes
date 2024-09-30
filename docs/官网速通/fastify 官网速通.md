# Fastify 官网速通

前言：参考 [fastify 官网](https://www.fastify.cn/)

一：什么是 fastify

快速、低开销的 web 框架，专为 Node 打造。可以用来构建 web 服务，后端接口。

二：快速开始

1. 快速生成 package.json

创建文件夹 fastify-demo，在文件夹内运行命令。

```bash
pnpm init
```

2. 安装依赖

```bash
pnpm add fastify
```

3. 配置 package.json

添加 type: module，可以使用 ES 模块应用。添加 start 命令，其中 nodemon 自行安装，可参考 [使用 nodemon](https://blog.csdn.net/weixin_64684095/article/details/134244205)，作用是使 node 服务热更新。

```json
{
  "name": "fastify-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

4. 创建 server.js

```js
import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", (req, res, done) => {
  return {
    data: "hello world",
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("webserver is runing");
  } catch (err) {
    console.log(err);
  }
};
start();
```

5. 运行命令

```js
pnpm start
```

6. 使用 Apipost 调试接口

<!-- 1 -->

三：核心知识点

1. 插件

在 Fastify 中一切皆插件。

1.1 什么是插件

扩展功能的机制，如：路由处理、中间件、错误处理、日志记录等。

1.2 插件的特点

模块化、可组合性、独立性

1.3 路由插件

1.3.1 安装插件

```bash
pnpm add fastify-plugin
```

1.3.2 注册插件

使用实例的 register 方法注册插件

```js
import FastifyPlugin from "fastify-myplugin";
fastify.register(FastifyPlugin);
```

1.4 常见插件

四：常用 API

五：非常用 API
