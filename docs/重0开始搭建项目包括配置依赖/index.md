<h2 align='center'>重0开始搭建项目包括配置依赖</h2>

## 请按部就班

1. 根据VUE CLI 3笔记创建基础项目

2. 安装依赖

注意：加-D是开发环境下需要的依赖，在线上环境就不需要了

```
\\ 安装scss,一定要一起装，不然装不了node-sass，我也不晓得为啥
yarn add sass-loader node-sass -D

\\ 安装pug
yarn add vue-cli-plugin-pug -D

\\ 安装vue-router
yarn add vue-router

\\ 安装svg
yarn add svg-sprite-loader -D

\\ 安装axios
yarn add axios

\\ 安装element-UI
yarn add element-ui

```

3. 配置vue.config.js(没有就自己建一个)

```
\\ 引入用@
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))

    \\配置svg
    config.module.rules.delete("svg");
    config.module
        .rule('svg-smart')
        .test(/\.svg$/)
        .include
        .add(resolve('src/assets/svg'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: '[name]'
        })
  }
}
```

4. 配置main.js

```
\\ 引入element
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Element, { size: "medium" });

```