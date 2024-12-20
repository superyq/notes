<h1 align="center">vue3.0上传npm包</h1>

## 构建包组件

### 生成 package.json

npm init,一路回车,根目录生成 package.json 文件

### 添加依赖、命令

跑服务必要：vue、@vue/cli-service、vue-template-compiler

可要可不要：node-sass、sass-loader

serve: 跑服务

build: 线上打包

build-npm：生成要上传到 npm 的包文件

重点 main 中的路径要改成 dist（打包文件名）/xxxx.common.js

```
{
  "name": "superyq-userbox",
  "version": "1.0.5",
  "description": "",
  "main": "dist/superyq-userbox.common.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "build-npm": "vue-cli-service build --target lib --name superyq-userbox ./src/index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vue": "^2.6.10"
  },
  "devDependencies": {
    "@vue/cli-service": "^3.7.0",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
    "vue-template-compiler": "^2.6.10"
  }
}
```

### 创建文件

根目录生成 src，public 文件夹，.npmignore 文件

public 下有：index.html

src 下有：app.vue、main.js、index.js

```
\\ index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>xxxx</title>
  </head>

  <body>
    <div id="app"></div>
  </body>
</html>

\\ app.vue
<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "你好"
    };
  }
};

\\ main.js
import Vue from "vue";
import App from "./app.vue";

window.App = new Vue({
  render: h => h(App)
}).$mount("#app");

\\ index.js
import mc from "./app.vue";

export default mc;

\\ .npmignore
.*
*.md
*.yml
public/
src/
node_modules/
yarn-error.log
yarn.lock
package.json
</script>
```

## 上传至 npm

包命名：@账号名/包名，例：@superyq/user-box

上传失败的情况：1. 包命名有错 2. npm 上已经存在这个命名的包

```
\\ 查看自己是否登录 npm
npm whoami

\\ 没有登录就登录，没账号先注册
npm login

\\ 上传
npm publish
```
