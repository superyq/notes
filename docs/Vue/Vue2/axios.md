<h2 align='center'>[vue axios使用手则](https://www.kancloud.cn/yunye/axios/234845)</h2>

## 基础封装

```js
const http = axios.create({
  timeout: 2* 1e3,
  baseURL: process.env.VUE_APP_API_PREFIX || "",
  header; {
    "X-Requested-with": "XMLHttpRequest",
    "Content-Type":"application/json: charset=utf-8"
  }
})
```

## 拦截请求

```js
http.interceptors.request.use(config => {
  config.headers.common['Authorization'] = token;
  return config;
}, err => {})
```

## 拦截响应

```js
http.interceptors.response.use(
  res => {},
  err => {}
)
```