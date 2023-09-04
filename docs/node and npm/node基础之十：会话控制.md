# 会话控制

cookie、session、token

1. cookie

cookie 是服务器发送到客户端的一小块数据
cookie 按照域名划分保存

特点：向服务器发送请求时，会自动将 cookie 设置在请求头，浏览器关闭时销毁。

```js
// 设置 cookie
res.cookie('name', 'lisi', { maxAge: 1000 * 60 })
// 删除 cookie
res.clearCookie('name');
// 获取 cookie
npm i cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());
req.cookies; // { name: 'lisi' }
```

2. session

session 是保存在服务器的一块数据

流程：登录后，服务器保存[{ sid: 'xxxx', username: 'lisi', user_id: '1' }],通过设置 cookie，保存 sid 的值，下次发送请求携带 cookie，通过 sid 判断用户身份

```js
// 设置 session 中间件，生成 sessionId
npm i express-session connect-mongo
const session = require("express-session");
const MongoStore = require("connect-mongo");
app.use(session{
  name: 'sid', // 设置cookie的name
  secret: "yqcoder", // 参与加密的字符串
  saveUninitializad: false, // 是否为每一个请求都设置cookie
  resave: true, // 是否在每次请求后重新保存session
  store: MongoStore({
    mongoUrl: 'mongodb://127.0.0.1:27017/demo'
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过js操作
    maxAge: 1000 * 60 // 过期时间
  }
})

// 设置 session 信息
// req.query.username 获取url上的参数
req.session.username = 'yqcoder';
req.session.uid = '888';

// 读取 session 信息
req.session.username

// 销毁 session
req.session.destroy(() => {})
```

3. cookie 和 session 的区别

存放位置
cookie：浏览器
session：服务器

安全性
cookie：安全性较低
session：相对较好

网络传输
cookie：内容过多，影响传输效率
session：不影响传输效率

存储限制
cookie：不超过 4k
session：没有限制

4. md5 密码单向加密

```js
npm i md5
const md5 = require("md5");
md5(req.body.password);
```

5. token

token 是服务端生成返回给客户端的一串加密字符串，token 中保存着用户信息

特点：服务端压力更小、相对更安全、扩展性更强

```js
npm i jsonwebtoken
const jwt = require("jsonwebtoken");

// 创建 token
// jwt.sign(用户数据, 加密字符串, 配置对象)
let token = jws.sign({
  username: 'lisi'
}, 'yqcoder', {
  expiresIn: 60 // 单位秒
})

// 解析 token
let token = req.get('token');
jwt.verify(token, 'yqcoder', (err, data) => {})
```
