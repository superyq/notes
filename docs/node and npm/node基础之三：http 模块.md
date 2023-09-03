# http 模块

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
