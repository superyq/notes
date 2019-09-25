# [vue axios使用手则](https://www.kancloud.cn/yunye/axios/234845)

1. 前言

同步请求和异步请求的区别

同步：提交请求->等待服务器处理->处理完毕返回 这个期间客户端浏览器不能干任何事

异步: 请求通过事件触发->服务器处理（这是浏览器仍然可以作其他事情）->处理完毕

1）Content-Type

application/json：JSON数据格式
multipart/form-data：需要在表单中进行文件上传时，就需要使用该格式

2. 基础封装

```
const http = axios.create({
  timeout: 5 * 1e3,
  baseURL: process.env.VUE_APP_API_PREFIX || "",
  header: {
    // 异步请求
    "X-Requested-with": "XMLHttpRequest",
    // 数据类型
    "Content-Type": "application/json; charset=utf-8"
  }
})
```

3. 拦截请求

```
http.interceptors.request.use(config => {
  // 注入token
  config.headers.common["Authorization"] = token;
  return config;
}, Promise.reject);
```

4. 拦截响应

```
http.interceptors.response.use(
  res => {
    const { data, config: { format = true } } = res;
    const response = { ...data, message: data.msg };
    if(!format) return res;
    return data.code === 0 ? response : Promise.reject(response);
  },
  error => {
    const err = { code: 400, data: null, message: "请求失败！" };

    if(!error.response) {
      const { status = 500, message = "网络错误!" } = error;
      err['code'] = status;
      err['message'] = message;
    } else {
      const { status } = error.response;

      switch (status) {
        case 401:
          err["message"] = "登录失效!";
          auth.logout("登录失效，是否前往登录页重新登录？", "重新登录", {
            confirmButtonText: "重新登录",
            showCancelButton: false
          });
          break;
      }

    }

    return Promise.reject(err);
  })
```

5. 打开接口

```
export default http
```