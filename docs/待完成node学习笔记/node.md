<h2 align="center">node学习笔记</h2>

## 得到本地用户名

```
git config user.name
```

## fs

```
var fs = require("fs);

<!-- 阻塞: 文件读取完后才执行完程序 -->
var data = fs.readFileSync("input.text");
console.log(data.toString());

<!-- 非阻塞: 读取文件时同时执行接下来的代码，大大提高了程序的性能 -->
fs.readFile('input.text', function(err, data) {
  if(err) return console.log(err);
  console.log(data.toString());
})
```
