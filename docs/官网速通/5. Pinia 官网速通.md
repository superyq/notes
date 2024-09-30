# Pinia 官网速通

前言：参考 [Pinia 中文文档](https://pinia.web3doc.top/introduction.html)，在 Vue3 配合 ts 中的使用。

一：介绍

1. 什么是 Pinia

Pinia 是 Vue 的存储库，允许跨组件/页面共享状态。

1.1. 为什么要使用 Pinia？

热模块更换、保持任何现有状态、使用插件扩展 Pinia 功能、TS 支持、服务端渲染支持。

1.2. 与 Vuex 的比较

Pinia 提供更简单的 API，具有更少的规范，mutations 不再存在。提供了 Composition-API 风格的 API，与 TS 使用时有可靠的类型推断支持。

2. 开始

2.1 安装

```sh
yarn add pinia
# or
npm install pinia
```

在 main.ts 中注册 pinia：

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount("#app");
```

2.2 什么是 Store

托管全局状态。每个组件都可以读取和写入。它有三个概念，state、getters 和 actions 等同于组件中的“数据”、“计算”和“方法”。

2.3 什么时候使用 Store

需要保存跨组件使用的相同状态。例如导航栏中显示的用户信息。

二. 核心概念

1. 定义一个 Store

使用 defineStore() 定义的，需要一个唯一名称，作为第一个参数传递，将返回的函数命名为 use...：

```js
// @/store/demo.ts
import { defineStore } from "pinia";

export const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      name: "yq",
      age: 18,
      loves: ["book"],
    };
  },
  actions: {
    changeName() {
      this.name = "yqcoder";
    },
  },
});
```

1.1 使用 store

在组件中使用 useDemoStore 创建实例，在实例上可以直接访问 state，getter，actions 定义的属性：

```html
<script setup lang="ts">
  import { useDemoStore } from "@/store/demo.ts";

  const demoStore = useDemoStore();
  console.log(demoStore.name); // 'yq'

  const handleChange = () => {
    demoStore.changeName();
    console.log(demoStore.name); // 'yqcoder'
  };
</script>

<template>
  <div>{{ demoStore.name }}</div>
  <div @click="handleChange">change name</div>
</template>

<style lang="scss" scoped></style>
```

store 是用 reavtive 包裹的对象，可以不用.value，但也不能解构：

```html
<script setup lang="ts">
  import { useDemoStore } from "@/store/demo.ts";

  // 非响应性的
  const { name, changeName } = useDemoStore();
  console.log(name); // 'yq'

  const handleChange = () => {
    changeName();
    console.log(name); // 'yq'
  };
</script>

<template>
  <div>{{ name }}</div>
  <div @click="handleChange">change name</div>
</template>

<style lang="scss" scoped></style>
```

使用 storeToRefs() 使解构的状态变响应：

```html
<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useDemoStore } from "@/store/demo.ts";

  const demoStore = useDemoStore();
  const { name } = storeToRefs(demoStore);
  console.log(name); // yq
  const handleChange = () => {
    demoStore.changeName();
    console.log(name); // yqcoder
  };
</script>

<template>
  <div>{{ name }}</div>
  <div @click="handleChange">change name</div>
</template>

<style lang="scss" scoped></style>
```

2. State

state 是 store 的核心部分。

```ts
import { defineStore } from "pinia";

export const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      name: "yq",
      age: 18,
      loves: ["book"],
    };
  },
});
```

2.1 访问 “state”

可以通过 store 实例直接访问和修改状态：

```ts
const { useDemoStore } from "@/store/demo.ts";
const demoStore = useDemoStore();

demoStore.name = 'yqcoder';
```

2.2 重置状态

使用 $reset() 方法将状态重置为初始值：

```ts
import { useDemoStore } from "@/store/demo.ts";

const demoStore = useDemoStore();
demoStore.$reset();
```

2.3 改变状态

使用 $patch 方法，可以同时修改多个状态：

```ts
import { useDemoStore } from "@/store/demo.ts";

const demoStore = useDemoStore();
demoStore.$patch({
  name: "yyy",
  age: 22,
});
```

并且 $patch 也接受一个函数来批量修改状态：

```ts
import { useDemoStore } from "@/store/demo.ts";

const demoStore = useDemoStore();
demoStore.$patch((state) => {
  state.name = "yy";
  state.age = 23;
  state.loves.push("sex");
});
```

2.4 替换 state

使用 $state 来替换 Store 的整个状态：

```ts
import { useDemoStore } from "@/store/demo.ts";

const demoStore = useDemoStore();
demoStore.$state = {
  name: "yy",
  age: 33,
  loves: ["sex"],
};
```

3. Getters

Getter 等同于 Store 状态的计算值：

```ts
import { defineStore } from "pinia";

export const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      loves: ["book"],
    };
  },
  getters: {
    lovesL: (state) => state.loves.length,
  },
});
```

通过 this 可以访问状态和 getter，在 TS 中，使用 this 访问状态，需要声明返回类型：

```js
import { defineStore } from "pinia";

export const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      name: "yq",
      loves: ["book"],
    };
  },
  getters: {
    nameL: (state) => state.name.length,
    lovesL(): number {
      return this.nameL;
    },
  },
});
```

3.1 将参数传递给 getter

Getters 只是 computed 属性，因此无法传递任何参数。 但可以通过一个函数来接受参数：

```ts
import { defineStore } from "pinia";

export const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      age: 18,
    };
  },
  getters: {
    yearAfter: (state) => {
      return (yearNumber: number): number => state.age + yearNumber;
    },
  },
});
```

在组件中使用：

```html
<script setup lang="ts">
  import { useDemoStore } from "@/store/demo.ts";

  const deomStore = useDemoStore();
</script>

<template>
  <div>
    <!-- 输出：28 -->
    <span>{{ deomStore.yearAfter(10) }}</span>
  </div>
</template>

<style lang="scss" scoped></style>
```

4. Actions

Actions 相当于组件的 methods。 适合定义业务逻辑：

```js
import { defineStore } from "pinia";

export const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      name: "yq",
    };
  },
  actions: {
    changeName() {
      this.name = "yqcoder";
    },
  },
});
```

4.1 访问其他 store

访问其他 store ，直接在内部使用它：

```js
import { useAuthStore } from "./auth-store";

export const useDemoStore = defineStore("demo", {
  state: () => ({
    // ...
  }),
  actions: {
    async fetchUserPreferences(preferences) {
      const auth = useAuthStore();
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences();
      } else {
        throw new Error("User must be authenticated");
      }
    },
  },
});
```

5. 插件

使用 pinia.use() 将插件添加到 pinia 实例中：

```js
import { createApp } from "vue";
import { createPinia } from "pinia";

// 为安装此插件后创建的每个store添加一个名为 `secret` 的属性
// 这可能在不同的文件中
function SecretPiniaPlugin() {
  return { secret: "the cake is a lie" };
}

const pinia = createPinia();
// 将插件提供给 pinia
pinia.use(SecretPiniaPlugin);

const app = createApp(App);
app.use(pinia);
app.mount("#app");

// 在另一个文件中
const store = useStore();
store.secret; // 'the cake is a lie'
```

5.1 介绍

Pinia 插件是一个函数，返回要添加到 store 的属性。 有一个可选参 context：

```js
export function myPiniaPlugin(context) {
  context.pinia; // 使用 `createPinia()` 创建的 pinia
  context.app; // 使用 `createApp()` 创建的当前应用程序（仅限 Vue 3）
  context.store; // 插件正在扩充的 store
  context.options; // 定义存储的选项对象传递给`defineStore()`
  // ...
}
```

然后使用 pinia.use() 将此函数传递给 pinia：

```js
pinia.use(myPiniaPlugin);
```

5.2 扩充 store

您可以通过简单地在插件中返回它们的对象来为每个 store 添加属性：

```js
pinia.use(() => ({ hello: "world" }));
```

5.3 TS

Pinia 插件参数类型检测：

```js
import { PiniaPluginContext } from "pinia";

export function myPiniaPlugin(context: PiniaPluginContext) {
  // ...
}
```

6. 在组件外使用存储

6.1 在 main.ts 中使用 store

使用 app.use(pinia) 安装 pinia 插件后，任何 useStore() 调用都将起作用：

```js
import { useUserStore } from "@/stores/user";
import { createApp } from "vue";
import App from "./App.vue";

// ❌  失败，因为它是在创建 pinia 之前调用的
const userStore = useUserStore();

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

// ✅ 有效，因为 pinia 实例现在处于活动状态
const userStore = useUserStore();
```

6.2 在 Vue Router 中使用 store

使用 Vue Router 的导航守卫内部的 store 的例子：

```js
import { createRouter } from "vue-router";
const router = createRouter({
  // ...
});

// ❌ 根据导入的顺序，这将失败
const store = useStore();

router.beforeEach((to, from, next) => {
  // 我们想在这里使用 store
  if (store.isLoggedIn) next();
  else next("/login");
});

router.beforeEach((to) => {
  // ✅ 这将起作用，因为路由器在之后开始导航
  // 路由已安装，pinia 也将安装
  const store = useStore();

  if (to.meta.requiresAuth && !store.isLoggedIn) return "/login";
});
```
