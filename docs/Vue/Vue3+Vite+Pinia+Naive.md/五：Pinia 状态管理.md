# Pinia 状态管理

## 前言

如果对 vue3 的语法不熟悉的，可以移步[Vue3.0 基础入门](https://blog.csdn.net/weixin_64684095/article/details/131459833?spm=1001.2014.3001.5502)，快速入门。

Pinia 详情可移步官网参看：[Pinia 官网](https://pinia.web3doc.top/)

1. 安装依赖

```js
yarn add pinia
// or
npm install pinia
```

<!-- 图片 5-1 -->

2. 构建 src/store/user.js

```js
// src/store/user.js
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => {
    return {
      token: "888888",
      user: {
        name: "yqcoder",
        age: 18,
      },
    };
  },
  getters: {
    ageAfter(state) {
      return state.user.age + 10;
    },
  },
  actions: {
    // 登录接口
    async login() {
      return new Promise((resolve, reject) => {});
    },
    // 退出接口
    async logout() {
      return new Promise((resolve, reject) => {});
    },
    // 获取用户信息
    async getInfo() {
      return new Promise((resolve, reject) => {});
    },
  },
});
```

3. 构建 main.js

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";

// 共用样式
import "@/assets/style/index.scss";
// 路由
import router from "@/router/index.js";
// store 状态管理
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).mount("#app");
```

4. 构建 src/pages/home.vue

```vue
<!-- src/pages/home.vue -->
<script setup>
import { computed } from "vue";
import { NButton, useDialog } from "naive-ui";
import router from "@/router/index.js";
import { useUserStore } from "@/store/user.js";

let userStore = useUserStore();

let user = computed(() => {
  return userStore.user;
})

let ageAfter = computed(() => {
  return userStore.ageAfter;
})

let toPage = (name) => {
  router.push({ name });
};

let handleShowMsg = () => {
  window.$msg.success("success message");
};

const dialog = useDialog();
let handleShowDialog = () => {
  dialog.warning({
    title: "警告",
    content: "你确定？",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: () => {
      window.$msg.success("确定");
    },
    onNegativeClick: () => {
      window.$msg.error("不确定");
    },
  });
};
</script>

<template>
  <div class="home">
    home
    <n-button @click="toPage('demo')" type="primary">goDemo</n-button>
    <n-button @click="toPage('login')" type="warning">goLogin</n-button>
    <n-button @click="handleShowMsg" type="info">show message</n-button>
    <n-button @click="handleShowDialog" type="error">show dialog</n-button>
    <div class="user__info">
      <p class="name">姓名: {{ user.name }}</p>
      <p class="age">年龄: {{ ageAfter }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
```

<!-- 图片 5-2 -->


