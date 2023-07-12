# utils 工具构建

## 前言

如果对 vue3 的语法不熟悉的，可以移步[Vue3.0 基础入门](https://blog.csdn.net/weixin_64684095/article/details/131459833?spm=1001.2014.3001.5502)，快速入门。

1. cookie 保存工具

1.1 安装依赖

```js
yarn add js-cookie
// or
npm install js-cookie
```

<!-- 图片 7-1 -->

1.2 编写 src/utils/cookie.js

```js
// src/utils/cookie.js
import Cookies from "js-cookie";

const TokenKey = "User-Token";
const ExpiresInKey = "User-Expires-In";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
```

2. 构建 src/utils/common.js 共用方法

```js
// src/utils/common.js
/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === "string") {
      time = time
        .replace(new RegExp(/-/gm), "/")
        .replace("T", " ")
        .replace(new RegExp(/\.[\d]{3}/gm), "");
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  let search = params;
  search.params =
    typeof search.params === "object" &&
    search.params !== null &&
    !Array.isArray(search.params)
      ? search.params
      : {};
  dateRange = Array.isArray(dateRange) ? dateRange : [];
  if (typeof propName === "undefined") {
    search.params["beginTime"] = dateRange[0];
    search.params["endTime"] = dateRange[1];
  } else {
    search.params["begin" + propName] = dateRange[0];
    search.params["end" + propName] = dateRange[1];
  }
  return search;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children",
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  return tree;
}
```

3. 构建 src/utils/erorCode.js 错误码转换

```js
//  src/utils/erorCode.js
export default {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  'default': '系统未知错误，请反馈给管理员'
}
```

4. 构建 src/utils/jsencrypt.js 数据加密

4.1 安装依赖

```js
yarn add jsencrypt
// or
npm install jsencrypt
```

<!-- 图片 7-2 -->

4.2 编写 jsencrypt.js

```js
// src/utils/jsencrypt.js
import JSEncrypt from "jsencrypt/bin/jsencrypt.min";

const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKoR8mX0rGKLqzcWmOzbfj64K8ZIgOdH\n' +
  'nzkXSOVOZbFu/TJhZ7rFAN+eaGkl3C4buccQd/EjEsj9ir7ijT7h96MCAwEAAQ=='

const privateKey = 'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAqhHyZfSsYourNxaY\n' +
  '7Nt+PrgrxkiA50efORdI5U5lsW79MmFnusUA355oaSXcLhu5xxB38SMSyP2KvuKN\n' +
  'PuH3owIDAQABAkAfoiLyL+Z4lf4Myxk6xUDgLaWGximj20CUf+5BKKnlrK+Ed8gA\n' +
  'kM0HqoTt2UZwA5E2MzS4EI2gjfQhz5X28uqxAiEA3wNFxfrCZlSZHb0gn2zDpWow\n' +
  'cSxQAgiCstxGUoOqlW8CIQDDOerGKH5OmCJ4Z21v+F25WaHYPxCFMvwxpcw99Ecv\n' +
  'DQIgIdhDTIqD2jfYjPTY8Jj3EDGPbH2HHuffvflECt3Ek60CIQCFRlCkHpi7hthh\n' +
  'YhovyloRYsM+IS9h/0BzlEAuO0ktMQIgSPT3aFAgJYwKpqRYKlLDVcflZFCKY7u3\n' +
  'UP8iWi1Qw0Y='

  // 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}
```

5. 构建 src/utils/validate.js 数据验证

```js
// src/utils/validate.js
/**
 * 判断是否外部网址
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 有效用户名
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

// 判断是否电话
export function isPhone(str) {
  return /^1[0-9]{10}$/.test(str);
}

/**
 * 是否email
 * @param {string} email
 * @returns {Boolean}
 */
export function isEmail(email) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * 判断是否网址
 * @param {string} url
 * @returns {Boolean}
 */
export function isURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * 有效小写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * 有效大写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * 是否字母
 * @param {string} str
 * @returns {Boolean}
 */
export function isAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * 是否字符串
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * 是否数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}
```

<!-- 图片 7-3 -->

6. 完善 src/api/http.js 接口逻辑

```js
// src/api/http.js
import axios from "axios";
import errorCode from "@/utils/errorCode";
import { getToken } from "@/utils/cookie.js";
import { tansParams } from "@/utils/common.js";
import { useUserStore } from "@/store/user.js";

// 请求和响应的消息主体用什么方式编码
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  // 是否需要 token
  const isToken = (config.headers || {}).isToken === true;
  if (getToken() && !isToken) {
    // 让请求携带token
    config.headers["Authorization"] = "Bearer " + getToken();
  }
  // get请求映射params参数
  if (config.method === "get" && config.params) {
    let url = config.url + "?" + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config;
});

// 响应拦截器
service.interceptors.response.use((res) => {
  let userStore = useUserStore();
  // 未设置返回码默认200
  let code = res.data.code || 200;
  // 获取错误信息
  let msg = errorCode[code] || res.data.msg || errorCode["default"];
  // 二进制数据直接返回
  if (
    res.request.responseType === "blob" ||
    res.request.responseType === "arraybuffer"
  ) {
    return res.data;
  }
  if (code === 401) {
    window.$msg.info("登录状态已过期,请重新登录");
    userStore.logout().then(() => {
      window.location.href = "/home";
    });
  }
  if (code !== 200) {
    window.$msg.error(msg);
  }
  return res.data;
});

export default service;
```

7. 完善 src/api/login.js 登录逻辑接口

```js
// src/api/login.js
import api from "./http.js";

// 登录
export function login(data) {
  return api({
    url: `/auth/login`,
    headers: {
      isToken: false,
    },
    method: "post",
    data,
  });
}

// 退出
export function logout() {
  return api({
    url: `/auth/logout`,
    method: "delete",
  });
}

// 获取用户详细信息
export function getInfo() {
  return api({
    url: `/system/user/getInfo`,
    method: "get",
  });
}
```

8. 完善 src/store/user.js 状态共享逻辑

```js
// src/store/user.js
import { defineStore } from "pinia";
import { login, logout, getInfo } from "@/api/login.js";
import { getToken, setToken, removeToken } from "@/utils/cookie.js";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => {
    return {
      token: getToken() || "",
      user: {},
    };
  },
  getters: {
    ageAfter(state) {
      return state.user.age + 10;
    },
  },
  actions: {
    // 登录接口
    async login(data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then((res) => {
            if (res.code !== 200) {
              reject(res);
            }

            const { data } = res;
            // 保存token
            setToken(data.access_token);
            this.token = data.access_token;
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 退出接口
    async logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then((res) => {
            if (res.code !== 200) {
              reject(res);
            }

            this.token = "";
            removeToken();
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 获取用户信息
    async getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(({ data }) => {
            if (res.code !== 200) {
              reject(res);
            }

            this.user = data;
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
```

9. 完善 src/router/index.js 路由跳转逻辑

9.1 安装依赖

```js
// 路由跳转顶部进度条
yarn add nprogress
// or
npm install nprogress
```

<!-- 图片 7-4 -->

9.2 编写 src/router/index.js
```js
// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import baseRouters from "./baseRouter.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/cookie.js";
const whiteList = ["/", "/login"];

const routes = [...baseRouters];
const _createRouter = () =>
  createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
      return {
        el: "#app",
        top: 0,
        behavior: "smooth",
      };
    },
  });

export function resetRouter() {
  const newRouter = _createRouter();
  router.matcher = newRouter.matcher;
}

const router = _createRouter();

// 路由监听
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (!!getToken()) {
    // 有token，跳转登录时重定向首页
    if (to.path === "/login") {
      next("");
      NProgress.done();
    }
    next();
    NProgress.done();
  } else {
    // 判断路由是否在白名单，是直接跳转
    if (whiteList.indexOf(to.path) !== -1) {
      next();
      // 未登录页面跳转，直接跳转到登录页
    } else {
      next(`/login?redirect=${to.fullPath}`);
    }
    NProgress.done();
  }
});

export default router;
```

10. 完善 src/pages/login.vue 登录逻辑

```vue
<script setup>
import { reactive } from "vue";
import router from "@/router/index.js";
import { NButton, NInput } from "naive-ui";
import { useUserStore } from "@/store/user.js";

// 用户状态管理
let userStore = useUserStore();

let loginForm = reactive({
  username: "yqcoder",
  password: "6666",
});
let handleLogin = () => {
  userStore.login(loginForm).then(() => {
    router.push({ name: "home" });
  });
};
</script>

<template>
  <div class="login">
    <n-input v-model:value="loginForm.username"></n-input>
    <n-input v-model:value="loginForm.password"></n-input>
    <n-button type="primary" size="small" @click="handleLogin">登录</n-button>
  </div>
</template>

<style lang="scss" scoped></style>
```




