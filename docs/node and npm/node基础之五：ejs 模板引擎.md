# ejs 模板引擎

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
```
