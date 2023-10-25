# vue3 构建图片裁剪上传组件

1. 安装依赖

```js
npm i vue-img-cutter
```

2. 构建 src/components/ImgCutter.vue;

```html
<script setup>
import ImgCutter from "vue-img-cutter";
// 后端接口
import { updateAvatar } from "@/api/home.js";

let emits = defineEmits(['getUrl']);
let cutDown = (data) => {
  let formData = new FormData();
  let { blob } = data;
  formData.append("avatarfile", blob);
  updateAvatar(formData).then((res) => {
    emits('getUrl', res);
  })
}
</script>

<template>
  <img-cutter ref="imgCutterModal" label="修改头像" file-type="jpeg" :cross-origin="true" tool-bgc="none" :is-modal="true"
    :show-choose-btn="true" :lock-scroll="true" :box-width="616" :box-height="458" :cut-width="250" :cut-height="250"
    :size-change="true" :move-able="true" :img-move="true" :original-graph="false" watermark-text="vue-img-cutter"
    watermark-text-font="12px Sans-serif" watermark-text-color="#00ff00" :watermark-text-x="0.95" :watermark-text-y="0.95"
    :small-to-upload="true" :save-cut-position="true" :scale-able="true" :preview-mode="true" :quality="1"
    :tool-box-overflow="true" @cutDown="cutDown">
    <!-- <div slot="open">选择本地图片</div> -->
  </img-cutter>
</template>

<style lang="scss" scoped></style>
```
