# vue3 中使用 pinia

1. 安装依赖

```js
yarn add pinia
```

2. 创建 src/store 文件夹，存放 .js 的状态

3. 例: src/store/user.js 编写

```js
import { defineStore } from "pinia";

// id：唯一Key、重复定义会失效或覆盖。
// state：状态库、必须是函数，否则会报错。
// actions：事件逻辑区，可以通过this访问state数据，也可以使用this.$path({})设置响应式状态，重要是支持异步，async、await关键字，都能被vue-devTool获取到改变。
// getters：计算属性，用于需要二次加工的属性。

export const useUserStore = defineStore({
  id: "userStore",
  state: () => {
    return {
      token: "",
    };
  },
  getters: {
    tokenLength(state) {
      return state.token.length;
    },
  },
  actions: {
    async login({ username, password }) {
      return new Promise((res, rej) => {
        // 登录接口调用
      });
    },
  },
});
```

4. main.js 编写

```js
import { createApp } from "vue";
import App from "./App.vue";

// pinia 状态管理
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia()).mount("#app");
```

5. 使用

```html
<script setup>
  import { computed } from "vue";
  import { useUserStore } from "@/store/user.js";

  let userStore = useUserStore();

  let token = computed(() => {
    return userStore.token;
  });

  let login = () => {
    userStore.login().then(() => {});
  };
</script>
<template>
  <div>
    {{ token }}
    <button @click="login">登录</button>
  </div>
</template>
```
