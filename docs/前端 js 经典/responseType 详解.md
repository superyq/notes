# responseType 详解

1. 什么是 responseType

responseType 是指响应类型，它用于指定 API 返回的数据格式或内容的类型。

2. responseType 用法

在不同的 API 中，responseType 可以有不同的取值，常见的包括以下几种：

文本（text）：返回纯文本格式的响应数据，通常是字符串形式。
XML（xml）：返回 XML 格式的响应数据，通常是一个结构化的文档。
表单（form）：返回表单数据，通常用于提交表单或文件上传。
JSON（json）：返回 JSON 格式的响应数据，通常是一个对象或数组。
二进制（blob）：返回二进制数据，例如图片、音频或视频等文件。

```JS
// 响应拦截器
service.interceptors.response.use(
  (res: any) => {
    // 二进制数据直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
)
```
