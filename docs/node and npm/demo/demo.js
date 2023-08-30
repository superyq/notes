// 1. 导入 express
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { url } = require("inspector");

const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({ extended: false });

// 2. 创建应用对象
const app = express();

app.post("/login", urlParser, (req, res) => {
  console.log(req.body);
  res.send("success");
});

function middleware(req, res, next) {
  // 获取 url 和 ip
  let { url, ip } = req;
  fs.appendFileSync(__dirname + "/demo.json", `${url} ${ip}\r\n`);
  next();
}
app.use(middleware);
app.use(express.static(__dirname + "/public"));

// 3. 创建路由
app.get("/home", (req, res) => {
  console.log(req.get("referer"));
  res.setHeader("content-type", "text/html;charset=utf-8");
  res.end("demo");
});

// 获取
app.get("/login", (req, res) => {
  // 获取路由
  console.log(req.path);
  // 获取参数
  console.log(req.query);
  // 获取ip
  console.log(req.ip);
  // 获取请求头
  console.log(req.get("host")); // 127.0.0.1:3000
  res.end("login");
});

// 获取id
app.get("/rep", (req, res) => {
  res.json({ name: "yq" });
});

// 4. 监听404
app.all("*", (req, res) => {
  res.end("404");
});

// 5. 监听端口，启动服务
app.listen(3000, () => {
  console.log("服务启动...");
});
