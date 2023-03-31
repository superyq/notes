<h1 align="center">vue-router</h1>

## 基础用法

```js
// router -> index.js
import { createRouter, createWebHistory } from "vue-router";

let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
    },
  ],
  scrollBehavior() {
    return {
      el: "#app",
      top: 0,
      behavior: "smooth",
    };
  },
});

// main.js
import router from "./router/index.js";
const app = createApp(App);
app.use(router);
```

```html
<!-- App.vue -->
<router-view></router-view>;
```

## 路由跳转

```html
<router-link to="/">Go to Home</router-link>
<router-link to="/about">Go to About</router-link>
```

```js
import { useRouter } from "vue-router";
let router = useRouter();

// 字符串路径
router.push("/users/eduardo");

// 带有路径的对象
router.push({ path: "/users/eduardo" });

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: "user", params: { username: "eduardo" } });

// 带查询参数，结果是 /register?plan=private
router.push({ path: "/register", query: { plan: "private" } });

// 带 hash，结果是 /about#team
router.push({ path: "/about", hash: "#team" });

// 注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path
const username = "eduardo";
// 我们可以手动建立 url，但我们必须自己处理编码
router.push(`/user/${username}`); // -> /user/eduardo
// 同样
router.push({ path: `/user/${username}` }); // -> /user/eduardo
// 如果可能的话，使用 `name` 和 `params` 从自动 URL 编码中获益
router.push({ name: "user", params: { username } }); // -> /user/eduardo
// `params` 不能与 `path` 一起使用
router.push({ path: "/user", params: { username } }); // -> /user
```

## 动态路由

```js
// router->index.js
const routes = [{ path: "/user/:id", component: User }];

// User组件 获取参数 url: user/1
import { useRoute } from "vue-router";
let route = useRoute();
console.log(route.params); // { id: 1 }
```

```html
<!-- template 中获取url参数 -->
{{ $route.params }}
```

## 嵌套路由

```js
const routes = [
  {
    path: "/user/:id",
    component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: "profile",
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: "posts",
        component: UserPosts,
      },
    ],
  },
];
```

## 命名路由

```js
// 除了 path 之外，你还可以为任何路由提供 name
const routes = [
  {
    path: "/user/:username",
    name: "user",
    component: User,
  },
];
```

## 命名视图

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      components: {
        default: Home,
        // LeftSidebar: LeftSidebar 的缩写
        LeftSidebar,
        // 它们与 `<router-view>` 上的 `name` 属性匹配
        RightSidebar,
      },
    },
  ],
});
```

```html
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

## 重定向

```js
const routes = [{ path: "/home", redirect: "/" }];
const routes = [{ path: "/home", redirect: { name: "homepage" } }];
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: "/search/:searchText",
    redirect: (to) => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: "/search", query: { q: to.params.searchText } };
    },
  },
  {
    path: "/search",
    // ...
  },
];
const routes = [
  {
    // 将总是把/users/123/posts重定向到/users/123/profile。
    path: "/users/:id/posts",
    redirect: (to) => {
      // 该函数接收目标路由作为参数
      // 相对位置不以`/`开头
      // 或 { path: 'profile'}
      return "profile";
    },
  },
];
```

## 别名

```js
// 当用户访问 /home 时，URL 仍然是 /home，但会被匹配为用户正在访问 /
const routes = [{ path: "/", component: Homepage, alias: "/home" }];
```
