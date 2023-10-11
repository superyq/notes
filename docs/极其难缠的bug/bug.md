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
