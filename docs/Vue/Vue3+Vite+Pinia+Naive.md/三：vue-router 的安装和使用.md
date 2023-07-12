# vue-router 的安装和使用

## 前言

如果对 vue3 的语法不熟悉的，可以移步[Vue3.0 基础入门](https://blog.csdn.net/weixin_64684095/article/details/131459833?spm=1001.2014.3001.5502)，快速入门。

如果对 vue-router 语法不熟悉的，可以移步[Vue3 系列：vue-router](https://blog.csdn.net/weixin_64684095/article/details/131458466)

1. 安装依赖

```js
yarn add vue-router
// or
npm install vue-router
```

<!-- 图片 3-1 -->

2. 构建 src/router/index.js

```js
import { createRouter, createWebHistory } from "vue-router";
import baseRouters from "./baseRouter.js";

const routes = [...baseRouters];
const _createRouter = () =>
  createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
      return {
        el: "#app",
        top: 0,
        behavior: "smooth",
      };
    },
  });

export function resetRouter() {
  const newRouter = _createRouter();
  router.matcher = newRouter.matcher;
}

const router = _createRouter();

export default router;
```

3. 构建 src/router/baseRouter.js

```js
export default [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/pages/layout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/pages/home.vue"),
      },
      {
        path: "/demo",
        name: "demo",
        component: () => import("@/pages/demo.vue"),
      },
    ],
  },
];
```

4. main.js 编写

```js
import { createApp } from "vue";
import App from "./App.vue";

// 共用样式
import "@/assets/style/index.scss";
// 路由
import router from "@/router/index.js";

createApp(App).use(router).mount("#app");
```

5. App.vue 编写

```vue
<script setup></script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="scss"></style>
```

6. 创建页面

<!-- 图片 3-2 -->

```vue
<!-- 创建 src/pages/login.vue -->
<script setup>
import router from "@/router/index.js";

let handleLogin = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="login">
    <button @click="handleLogin">登录</button>
  </div>
</template>

<style lang="scss" scoped></style>
```

```vue
<!-- 创建 src/pages/layout.vue -->
<script setup></script>

<template>
  <div class="layout">
    <div class="asider">asdier</div>
    <div class="main">
      <div class="header">header</div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
}
.asider {
  box-sizing: border-box;
  height: 100vh;
  width: 40px;
  border: 1px solid;
}
.header {
  box-sizing: border-box;
  height: 40px;
  width: calc(100vw - 40px);
  border: 1px solid;
}
.content {
  box-sizing: border-box;
  margin: 20px;
  height: calc(100vh - 80px);
  border: 1px solid;
}
</style>
```

```vue
<!-- 创建 src/pages/home.vue -->
<script setup>
import router from "@/router/index.js";

let toPage = (name) => {
  router.push({ name });
};
</script>

<template>
  <div class="home">
    home
    <button @click="toPage('demo')">goDemo</button>
    <button @click="toPage('login')">goLogin</button>
  </div>
</template>

<style lang="scss" scoped></style>
```

```vue
<!-- 创建 src/pages/demo.vue -->
<script setup>
import router from "@/router/index.js";

let toPage = (name) => {
  router.push({ name });
};
</script>

<template>
  <div class="demo">
    demo
    <button @click="toPage('home')">goHome</button>
    <button @click="toPage('login')">goLogin</button>
  </div>
</template>

<style lang="scss" scoped></style>
```

<!-- 图片 3-3 -->
<!-- 图片 3-4 -->

