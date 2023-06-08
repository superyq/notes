Vue2 使用 axios

1. 安装依赖

```js
yarn add axios
```

2. main.js 接口请求地址映射

```js
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 80,
    open: true,
    proxy: {
      "/dev-api": {
        target: `http://1.1.1.1:8080`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ["^/dev-api"]: "",
        },
      },
      "/dev-api/file": {
        target: `http://1.1.1.1:9300`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ["^/dev-api"]: "",
        },
      },
    },
  },
};
```

3. src/api/http.js 构建

```js
import axios from "axios";

// 登录获取的 token (自己根据登录接口去替换)
let token = "666";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
const service = axios.create({
  baseURL: "/dev-api",
  timeout: 10000,
});

// 请求拦截
service.interceptors.request.use((config) => {
  const isToken = (config.headers || {}).isToken == true;
  if (token && isToken) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截
service.interceptors.request.use((res) => {
  const code = res.data.code || 200;
  const msg = res.data.msg;

  if (code == 401) {
    // 没权限登出
  } else {
    return res.data;
  }
});

export default service;
```

4. 使用 src/api/login.js

```js
import api from "./http.js";

// 登录
export function login({ username, password }) {
  return api({
    url: `/login`,
    headers: {
      isToken: false,
    },
    method: "post",
    data: {
      username,
      password,
    },
  });
}

// 获取用户详细信息
export function getInfo() {
  return api({
    url: `/getInfo`,
    method: "get",
  });
}
```

5. 组件中使用

```js
<template>
  <div class="login">
    <button @click="handleLogin">login</button>
  </div>
</template>

<script>
import { login } from "@/api/login.js";

export default {
  name: "Login",
  data() {
    return {
    };
  },
  methods: {
    handleLogin() {
      login({username: 'yqcoder', password: '123456'}).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
};
</script>
```
