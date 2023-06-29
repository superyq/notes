在 vue2 中构建 SvgIcon 组件

1. 组件编写 components/SvgIcon.vue

```js
<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    className: String,
    color: String,
    width: String,
    height: String,
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      let className = this.className ? `icon-${this.className}` : "";
      return ["svg-icon", className];
    },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <!-- aria-hidden: 让这个元素对浏览器隐藏 -->
  <svg
    :class="svgClass"
    :style="{ color, width, height }"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.3em;
  fill: currentColor;
  overflow: hidden;
}
</style>

```

2. 在 assets 下创建 icons/svg 文件夹， icons/index.js 文件

2.1 将svg文件保存在svg文件夹下

2.2 index.js 编写

```js
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
```

3. 安装 svg 依赖 svg-sprite-loader
   安装 path 依赖 path-browserify
```js
yarn add svg-sprite-loader
yarn add path-browserify
// or
npm install svg-sprite-loader
npm install path-browserify
```

4. vue.config.js 编写

```js
const { defineConfig } = require("@vue/cli-service");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: "admin",
  assetsDir: "static",
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
      fallback: {
        path: require.resolve("path-browserify")
      }
    },
  },
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  }
});

```

5. main.js 编写

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// svg
import "./assets/icons/index.js"; 

import SvgIcon from "@/components/SvgIcon.vue"

Vue.component('SvgIcon', SvgIcon)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

6. 使用

```html
<!-- name: 必填 svg 的文件名
className: 选填 class 类名
color: 选填 颜色
width: 选填 宽
height: 选填 高 -->

<svg-icon name="phone" color="red" width='20' height='20'></svg-icon>
```
