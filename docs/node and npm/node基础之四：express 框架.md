# express 框架

```js
npm i express;
// 导入
const express = require("express");
const app = express();
// 启动服务
app.listen(8080, () => {
  console.log('http://localhost:8080/')
})
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
