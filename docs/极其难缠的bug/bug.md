# bug.md

1. el-upload 点击上传文件额外调用了一次接口,网页的 url 的 post 请求

解决: :before-upload="beforeUpload" 在 beforeUpload 函数最后返回 false, 阻断组件默认提交

```html
<el-upload action="" :before-upload="beforeUpload"></el-upload>

<script>
  beforeUpload() {
    return false
  }
</script>
```

2. 复杂表单填写后,跳转页面,回退已填写内容不丢失。跳转详情后,回退筛选条件不丢失

解决: 通过 keepAlive 解决

```html
<div style="height: 100vh">
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
```

```js
router = [
  {
    name: "",
    path: "",
    component: Home,
    meta: {
      keepAlive: true,
    },
  },
  {
    ame: "",
    path: "",
    component: Login,
  },
];
```

3. v-for 遍历标签赋值 ref，然后通过 this.#refs.img 拿到的是 [img] 无法找到 click 方法。

解决：通过 id，document.getElementById()解决

```vue
<template>
  <img
    v-for="(item, index) in imageArr"
    :id="`img${index}`"
    :src="item.url"
    :key="item.id"
  />
</template>

<script>
const img = document.getElementById(`img${this.imageIndex}`);
img && img.click();
</script>
```

4.
