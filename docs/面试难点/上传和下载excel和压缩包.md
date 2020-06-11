# 上传和下载excel和压缩包

1. 下载(VUE模式)

```js
// 通过请求接口，请求到下载地址
getDownLoad(params).then(({ url }) => {
  const $a = document.createElement('a');
  $a.href = url;
  $a.click();
})

// 或者讲excel文件保存在本地
// 注意：必须房子public/static里面，至于是为什么，我也不知道
<a ref='sensitive', href='./static/sensitive.xlsx', target='_blank', download='excel模板.xlsx', hidden></a>

this.$refs["sensitive"].click();
```

2. 上传

```js
// input 按钮
input(hidden, type="file", ref="fileInput", @change="fileChangeHandle($event)")

// input事件
fileChangeHandle(evt) {
  if (this.loading) return;
  this.loading = true;
  const files = evt.target.files || evt.dataTransfer.files;

  importSensitive(files[0])
    .then(({ message = "导入成功" }) => {
      this.$message.success(message);
      this.$refs.fileInput.value = "";
      this.updateTableData();
    })
    .catch(({ message = "导入失败！" }) => {
      this.$refs.fileInput.value = "";
      this.$message.error(message);
    })
    .finally(() => {
      this.loading = false;
    });
}

// 导入方法
importSensitive(file) {
  const params = new FormData();
  params.append("file", file);

  return http.post("sensitive/import", params, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
```

3. FormData()

FormData对象的操作方法，全部在原型中，自己本身没任何的属性及方法

```js
// 通过FormData将文件转成二进制数据
let formData = new FormData()

formData.append('user', 'zhang')
获取 formData.get('user')  //zhang
删除 formData.delete('user'
```

4. [blob对象](https://blog.csdn.net/wangguoyu1996/article/details/81610066)

```js
let blob = new Blob([content]);
elink.href = URL.createObjectURL(blob);
```