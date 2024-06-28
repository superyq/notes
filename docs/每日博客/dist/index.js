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
