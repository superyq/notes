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
