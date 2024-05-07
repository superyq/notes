# vue-img-cutter 图片裁剪详解

前言：[vue-img-cutter 文档](https://github.com/acccccccb/vue-img-cutter/blob/master/README-zh-CN.md)，本文档主要讲解插件在 vue3 中使用。

一：安装依赖

```bash
npm install vue-img-cutter
# or
yarn add vue-img-cutter
# or
pnpm add vue-img-cutter
```

二：构建 components/ImgCutter.vue 组件

```html
<script setup lang="ts">
  import ImgCutter from "vue-img-cutter";
  import { updateAvatar } from "@/api/user.ts";

  let emits = defineEmits(["getUrl"]);
  let cutDown = (data: any) => {
    let formData = new FormData();
    let { file } = data;
    formData.append("file", file);
    updateAvatar(formData).then((res) => {
      emits("getUrl", res);
    });
  };
</script>

<template>
  <ImgCutter @cutDown="cutDown"></ImgCutter>
</template>

<style lang="scss" scoped></style>
```

三：使用组件

```html
<script setup lang="ts">
  import ImgCutter from "@/components/ImgCutter.vue";

  const getUrl = (str: any) => {
    console.log(1, str);
  };
</script>

<template>
  <div class="index">
    <ImgCutter @getUrl="getUrl" />
  </div>
</template>
```

<!-- 1 -->
<!-- 2 -->
<!-- 3 -->

四：参数

1. isModal

是否为弹窗模式，默认 true

```vue
<ImgCutter :isModal="true" />
```

2. showChooseBtn

是否显示选择图片按钮，默认 true

```vue
<ImgCutter :showChooseBtn="true" />
```

3. lockScroll

是否在 Dialog 出现时将 body 滚动锁定，默认 true

```vue
<ImgCutter :lockScroll="true" />
```

4. label

默认打开裁剪工具按钮的显示文字，默认 “选择图片”

```vue
<ImgCutter label="选择图片" />
```

5. boxWidth

裁剪工具宽度，默认 800

```vue
<ImgCutter :boxWidth="800" />
```

6. boxHeight

裁剪工具高度，默认 400

```vue
<ImgCutter :boxHeight="400" />
```

7. cutWidth

默认裁剪宽度，默认 200

```vue
<ImgCutter :cutWidth="200" />
```

8. cutHeight

默认裁剪高度，默认 200

```vue
<ImgCutter :cutHeight="200" />
```

9. tool

是否显示工具栏，默认 true

```vue
<ImgCutter :tool="true" />
```

10. toolBgc

工具栏背景色，默认 #fff

```vue
<ImgCutter toolBgc="#fff" />
```

11. sizeChange

是否能够调整裁剪框大小，默认 true

```vue
<ImgCutter :sizeChange="true" />
```

12. moveAble

能否调整裁剪区域位置，默认 true

```vue
<ImgCutter :moveAble="true" />
```

13. imgMove

能否拖动图片，默认 true

```vue
<ImgCutter :imgMove="true" />
```

14. originalGraph

是否直接裁剪原图，默认 false

```vue
<ImgCutter :originalGraph="false" />
```

15. crossOrigin

是否设置跨域，需要服务器做相应更改，默认 false

```vue
<ImgCutter :crossOrigin="false" />
```

16. crossOriginHeader

设置跨域信息 crossOrigin 为 true 时才生效

```vue
<ImgCutter :crossOrigin="true" crossOriginHeader="" />
```

17. rate

图片比例，例："4:3"

```vue
<ImgCutter rate="4:3" />
```

18. WatermarkText

水印文字

```vue
<ImgCutter WatermarkText="水印" />
```

19. WatermarkTextFont

水印文字字体，默认 "12px Sans-serif"

```vue
<ImgCutter WatermarkTextFont="12px Sans-serif" />
```

20. WatermarkTextColor

水印文字颜色，默认 '#fff'

```vue
<ImgCutter WatermarkTextColor="#fff" />
```

21. WatermarkTextX

水印文字水平位置，默认 0.95

```vue
<ImgCutter :WatermarkTextX="0.95" />
```

22. WatermarkTextY

水印文字垂直位置，默认 0.95

```vue
<ImgCutter :WatermarkTextY="0.95" />
```

23. smallToUpload

如果裁剪尺寸固定且图片尺寸小于裁剪尺寸则不裁剪直接返回文件，默认 false

```vue
<ImgCutter :smallToUpload="false" />
```

24. saveCutPosition

是否保存上一次裁剪位置及大小，默认 false

```vue
<ImgCutter :saveCutPosition="false" />
```

25. scaleAble

是否允许滚轮缩放图片，默认 true

```vue
<ImgCutter :scaleAble="true" />
```

26. toolBoxOverflow

是否允许裁剪框超出图片范围，默认 true

```vue
<ImgCutter :toolBoxOverflow="true" />
```

27. index

自定义参数，将会同结果一起返回，默认 null

```vue
<ImgCutter index="aaaa" />
```

28. previewMode

裁剪过程中是否返回裁剪结果，如果裁剪出现卡顿时将此项设置为 false，默认 true

```vue
<ImgCutter :previewMode="true" />
```

29. fileType

返回的文件类型 ( png / jpeg / webp)，默认 png

```vue
<ImgCutter fileType="png" />
```

30. quality

图像质量，默认 1

```vue
<ImgCutter :quality="1" />
```

31. accept

图片类型，默认 'image/gif, image/jpeg ,image/png'

```vue
<ImgCutter accept="image/gif, image/jpeg ,image/png" />
```

五：钩子函数

1. cutDown

完成截图后要执行的方法，返回值：Object

```vue
<ImgCutter @cutDown="cutDown" />
```

2. error

错误回调，返回值：Error object

```vue
<ImgCutter @error="error" />
```

3. onChooseImg

选择图片后，返回值：Object

```vue
<ImgCutter @onChooseImg="onChooseImg" />
```

4. onPrintImg

在画布上绘制图片，返回值：Object

```vue
<ImgCutter @onPrintImg="onPrintImg" />
```

5. onClearAll

清空画布，返回值：null

```vue
<ImgCutter @onClearAll="onClearAll" />
```

六：插槽

1. open 或 openImgCutter

弹出裁剪框

```html
<ImgCutter>
  <template #open> 选择图片 </template>
</ImgCutter>
```

2. choose

选择本地图片

```html
<ImgCutter>
  <template #choose> 选择图片 </template>
</ImgCutter>
```

3. cancel

取消/清空

```html
<ImgCutter>
  <template #cancel> 取消 </template>
</ImgCutter>
```

4. confirm

确认裁剪

```html
<ImgCutter>
  <template #confirm> 确认裁剪 </template>
</ImgCutter>
```

5. ratio

工具栏：宽高比

```html
<ImgCutter>
  <template #ratio> 工具栏：宽高比 </template>
</ImgCutter>
```

6. scaleReset

工具栏：重置缩放

```html
<ImgCutter>
  <template #scaleReset> 取消 </template>
</ImgCutter>
```

7. turnLeft

工具栏：向左旋转

```html
<ImgCutter>
  <template #turnLeft> 工具栏：向左旋转 </template>
</ImgCutter>
```

8. turnRight

工具栏：向右旋转

```html
<ImgCutter>
  <template #turnRight> 工具栏：向右旋转 </template>
</ImgCutter>
```

9. reset

工具栏：重置旋转

```html
<ImgCutter>
  <template #reset> 工具栏：重置旋转 </template>
</ImgCutter>
```

10. flipHorizontal

工具栏：水平翻转

```html
<ImgCutter>
  <template #flipHorizontal> 工具栏：水平翻转 </template>
</ImgCutter>
```

11. flipVertically

工具栏：重置旋转

```html
<ImgCutter>
  <template #flipVertically> 工具栏：垂直翻转 </template>
</ImgCutter>
```