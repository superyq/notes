# Naive UI 组件库的安装和使用

## 前言

如果对 vue3 的语法不熟悉的，可以移步[Vue3.0 基础入门](https://blog.csdn.net/weixin_64684095/article/details/131459833?spm=1001.2014.3001.5502)，快速入门。

UI 组件请参考官网：[Naive Ui 官网](https://www.naiveui.com/zh-CN/light)

1. 安装依赖

```js
yarn add naive-ui -D
// or
npm install naive-ui -D
```

<!-- 图片 4-1 -->

2. 在 SFC (单文件组件) 中使用

直接引入（推荐），你可以直接导入组件并使用它。这种情况下，只有导入的组件才会被打包。

```vue
<!-- 构建 src/pages/login.vue -->
<script setup>
import router from "@/router/index.js";
import { NButton } from "naive-ui";

let handleLogin = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="login">
    <n-button type="primary" size="small" @click="handleLogin">登录</n-button>
  </div>
</template>

<style lang="scss" scoped></style>
```

<!-- 图片 4-2 -->

3. 构建 App.vue

```vue
<!-- App.vue -->
<script setup>
import MessageApi from "@/components/MessageApi.vue";
import {
  NMessageProvider,
  NDialogProvider,
  NConfigProvider,
  zhCN,
  dateZhCN,
} from "naive-ui";
</script>

<template>
  <!-- 如果你想使用信息，你需要把调用其方法的组件放在 n-message-provider 内部并且使用 useMessage 去获取 API。 -->
  <n-message-provider>
    <!-- 将 message API 通过 message-api 组件注入 window.$msg，之后在其他 SFC 可以直接使用 window.$msg -->
    <message-api></message-api>
  </n-message-provider>

  <!-- 如果你想使用对话框，你需要把调用其方法的组件放在 n-dialog-provider 内部并且使用 useDialog 去获取 API。 -->
  <n-dialog-provider>
    <!-- 将 n-config-provider 的 locale 设为从 naive-ui 导入的 zhCN 来设定全局中文。 -->
    <!-- 将 n-config-provider 的 date-locale 设为从 naive-ui 导入的 dateZhCN 来设定全局日期中文。 -->
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <router-view></router-view>
    </n-config-provider>
  </n-dialog-provider>
</template>

<style scoped></style>
```

4. 构建 src/components/MessageApi.vue

```vue
<!-- src/components/MessageApi.vue -->
<script setup>
import { useMessage } from 'naive-ui'

window.$msg = useMessage();
</script>

<template>
  <div></div>
</template>
```

5. 构建 src/pages/home.vue

```vue
<!-- 构建 src/pages/home.vue -->
<script setup>
import router from "@/router/index.js";
import { NButton, useDialog } from "naive-ui";

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
  </div>
</template>

<style lang="scss" scoped></style>
```

<!-- 图片 4-2 -->
<!-- 图片 4-3 -->