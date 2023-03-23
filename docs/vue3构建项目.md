<h1 align="center">小白进阶之《从0开始搭建vite+vue3.0项目》</h1>

1.创建项目
yarn create vite

2.安装依赖
-S
vue-router
axios
pinia
naive-ui
nprogress
js-cookie

-D
vite-plugin-svg-icons
fast-glob
sass
dart-sass

3.在src下创建文件夹
pages
router
store
utils
assets

4.构建路由
router文件下创建index.js
在vite.config.js下设置@快捷引入
在main.js下引入
在App.vue下用router-view

综上，你的项目已经可以跑起来了，下面开始为项目添加更详细的功能

5.根据依赖配置项目文件
5.1配置sass
在asstes下的style里添加scss文件
在vite.config.js里配置sass使不用再main.js引入都可以生效
5.2配置svg

