# scss 的安装和使用

前言：如果对 vue3 的语法不熟悉的，可以移步[Vue3.0 基础入门](https://blog.csdn.net/weixin_64684095/article/details/131459833?spm=1001.2014.3001.5502)，快速入门。

1. 安装依赖

```js
yarn add sass -D
// or
npm install sass -D
```

<!-- 图片 2-1 -->

2. 初始化scss

```css
/* 新建 src/assets/style/reset.scss */
/* 页面样式初始化 */
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
// table,
caption,
tbody,
tfoot,
thead,
// tr,
th,
// td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

// table {
//   border-collapse: collapse;
//   border-spacing: 0;
// }

html,
body {
  width: 100%;
  height: 100%;
  font-family: "Helvetica";
}
```

3. 共用样式 src/assets/style/common.scss

```css
::-webkit-scrollbar {
  width: 14px;
  height: 12px;
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  display: block;
  min-height: 12px;
  min-width: 8px;
  border-radius: 6px;
  background-color: rgb(217, 217, 217);
}

::-webkit-scrollbar-thumb:hover {
  display: block;
  min-height: 12px;
  min-width: 8px;
  border-radius: 6px;
  background-color: rgb(159, 159, 159);
}
```

4. 工具样式 src/assets/style/utils.scss

```css
/* 工具css style */
.c-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.c-margin-r20 {
  margin-right: 20px;
}
.c-margin-r10 {
  margin-right: 10px;
}
.c-margin-b20 {
  margin-bottom: 20px;
}
```

```css
/* 新建 src/assets/style/index.scss */
/* 共用scss的集合 */
@import "./reset.scss";
@import "./common.scss";
@import "./utils.scss";
```

<!-- 图片 2-2 -->

5. vite.config.js 中 @ 快捷键创建

```js
// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
```

6. 在 main.js 中引入 src/assets/style/index.scss

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";

import "@/assets/style/index.scss";

createApp(App).mount("#app");
```

7. 在组件中使用 scss

```vue
<!-- App.vue -->
<script setup></script>

<template>
  <div class="demo">
    <div>yqcoder</div>
  </div>
</template>

<style scoped lang="scss">
.demo {
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    margin: 20px auto;
    width: 100px;
    height: 100px;
    border: 1px solid;
  }
}
</style>
```

<!-- 图片 2-3 -->

