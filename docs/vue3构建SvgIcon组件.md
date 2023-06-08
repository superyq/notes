在 vue3 中构建 SvgIcon 组件

1. 组件编写 components/SvgIcon.vue

```js
<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  className: String,
  color: String,
  width: String,
  height: String
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  let className = props.className ? `icon-${props.className}` : '';
  return ['svg-icon', className]
})

</script>
<template>
  <!-- aria-hidden: 让这个元素对浏览器隐藏 -->
  <svg :class="svgClass" :style="{ color, width, height }" aria-hidden="true" v-bind="$attrs">
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
2. 创建文件夹 assets/svg 文件夹，存放 .svg 文件

3. 安装依赖

3.1 安装 svg 依赖 vite-plugin-svg-icons
3.2 配套安装 fast-glob

```js
yarn add vite-plugin-svg-icons
yarn add fast-glob
// or
npm install vite-plugin-svg-icons
npm install fast-glob
```

4. vite.config.js 编写
   
```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定缓存文件
      iconDirs: [resolve(process.cwd(), "src/assets/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
});
```

5. main.js 编写

```js
import { createApp } from "vue";
import App from "./App.vue";
// svg 组件
import SvgIcon from "@/components/SvgIcon.vue";
import "virtual:svg-icons-register";

const app = createApp(App);
app.component("svg-icon", SvgIcon).mount("#app");
```

6. 使用

```html
<script setup>
</script>

<template>
  <div id="app">
    <!--  name: 必填 svg 的文件名
          className: 选填 class 类名
          color: 选填 颜色
          width: 选填 宽
          height: 选填 高  -->
    <svg-icon name="phone" color="red" width="50" height="50"></svg-icon>
  </div>
</template>

<style scoped>
</style>

```