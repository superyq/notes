# npm 包管理

1. 命令

```js
// 查看是否登录
npm who am i
// 登录：输入用户名、密码、邮箱、一次性登录密码（邮箱接收）
npm login
// 创建
npm init
// 快速创建
npm init -y
// 发包
npm publish
// 发包（开源）
npm publish --access public
// 删除包
npm unpublish <包名> --force
// 查看包版本
npm version patch
// 安装最新依赖
npm install <包名>@latest
```
