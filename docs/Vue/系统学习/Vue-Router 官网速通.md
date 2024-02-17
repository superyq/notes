# Vue-Router 官网速通

前言：参考[Vue Router](https://router.vuejs.org/zh/introduction.html)，本文档例子使用 vue3 语法。

一：介绍

1. 什么是 Vue Router

是 Vue.js 的官方路由。功能包括：1. 路由映射。2. 动态路由。3. 路由配置。4. 路由参数。5. 过渡效果。6. 导航控制。7. CSS 类链接。8. HTML5 模式。9. 滚动行为。10. URL 编码

2. 安装

对于一个现有使用 JS 包管理的项目，添加 Vue Router 依赖：

```sh
npm install vue-router@4
# or
yarn add vue-router@4
# or
pnpm add vue-router@4
```

通过 create-vue 脚手架创建一个基于 Vite 的新项目，加入 Vue Router 的选项：

```sh
npm create vue@latest
# or
yarn create vue
# or
pnpm create vue
```

二：基础

1. 入门

router-view 显示与 URL 对应的组件。可以放在任何地方，以适应布局。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="https://unpkg.com/vue@3"></script>
    <script src="https://unpkg.com/vue-router@4"></script>

    <div id="app">
      <h1>Hello App!</h1>
      <p>
        <!--使用 router-link 组件进行导航 -->
        <!--通过传递 `to` 来指定链接 -->
        <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
        <router-link to="/">Go to Home</router-link>
        <router-link to="/about">Go to About</router-link>
      </p>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
  </body>
  <script>
    // 1. 定义路由组件.
    const Home = { template: "<div>Home</div>" };
    const About = { template: "<div>About</div>" };

    // 2. 定义一些路由
    // 每个路由映射一个组件。
    const routes = [
      { path: "/", component: Home },
      { path: "/about", component: About },
    ];

    // 3. 创建路由实例并传递 `routes` 配置
    // 可以在这里输入更多的配置
    const router = VueRouter.createRouter({
      // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
      history: VueRouter.createWebHashHistory(),
      routes, // `routes: routes` 的缩写
    });

    // 5. 创建并挂载根实例
    const app = Vue.createApp({});
    //确保 _use_ 路由实例使
    //整个应用支持路由。
    app.use(router);

    app.mount("#app");
  </script>
</html>
```

在 Vue3 中通过调用 useRouter 和 useRoute 函数创建实例来访问。

```html
<script setup lang="ts">
  import { useRouter, useRoute } from "vue-router";

  const router = useRouter();
  const route = useRoute();

  router.push("/"); // 跳转
  route.params; // 参数
</script>
```

2. 动态路由匹配

多个匹配路由映射到同一组件，通过一个动态字段来实现，称之为路径参数，路径参数用冒号 : 表示。如下 /users/johnny 和 /users/jolyne 会映射到同一个路由。

```js
const User = {
  template: "<div>User</div>",
};

// 这些都会传递给 `createRouter`
const routes = [
  // 动态字段以冒号开始
  { path: "/users/:id", component: User },
];
```

通过 this.$route.params 来访问 URL 上的参数：

```js
const User = {
  template: "<div>User {{ $route.params.id }}</div>",
};
```

路由可以设置多个参数，在 $route.params 上相对应：

```js
const User = {
  template: "<div>User</div>",
};

// 传递给 `createRouter`
const routes = [
  // 动态字段以冒号开始
  { path: "/users/:username/posts/:postId", component: User },
];

// 匹配路由：/users/eduardo/posts/123
// $route.params：{ username: 'eduardo', postId: '123' }
```

2.1 响应路由参数的变化

同一路由的不同参数跳转，因为映射的是相同组件，所以复用组件显得更高效，但生命周期函数就不会被调用，比如从 /users/johnny 导航到 /users/jolyne。要对同一路由的参数做出响应，需要用 watch 监听：

```js
// vue3
import { watchEffect } from "vue";
watchEffect(() => {
  console.log(1, route.params, route.query);
});
```

2.2 捕获所有路由或 404 Not found 路由

想匹配任意路径，使用路径参数正则表达式，在路径参数后面的括号中加入正则表达式 :

```js
const routes = [
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
  { path: "/user-:afterUser(.*)", component: UserGeneric },
];
```

3. 路由的匹配语法

大多数应用都会使用 /about 静态路由和 /users/:userId 动态路由，但是 Vue Router 提供了更多的方式！

3.1 在参数中自定义正则

两个路由 /:orderId 和 /:productName，会匹配完全相同的 URL，需要一种方法来区分他们，最简单的方法是添加一个静态部分来区分：

```js
const routes = [
  // 匹配 /o/3549
  { path: "/o/:orderId" },
  // 匹配 /p/books
  { path: "/p/:productName" },
];
```

如果不想添加静态部分，也可以添加正则，orderId 总是一个数字，productName 可以是任何东西。以在括号中为参数指定正则，现在，/25 将匹配 /:orderId，其他情况匹配 /:productName。

```js
const routes = [
  // /:orderId -> 仅匹配数字
  { path: "/:orderId(\\d+)" },
  // /:productName -> 匹配其他任何内容
  { path: "/:productName" },
];
```

TIP：确保转义反斜杠( \ )，就像对 \d (变成\\d)所做的那样，在 JS 中实际传递字符串中的反斜杠字符。

3.2 可重复的参数

匹配 /first/second/third 路由，应该用 \*（0 个或多个）和 +（1 个或多个）将参数标记为可重复：

```js
const routes = [
  // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
  { path: "/:chapters+" },
  // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
  { path: "/:chapters*" },
];
```

提供了参数数组，而不是字符串，并且在使用命名路由时也需要你传递一个数组：

```js
// 给定 { path: '/:chapters*', name: 'chapters' },
router.resolve({ name: "chapters", params: { chapters: [] } }).href;
// 产生 /
router.resolve({ name: "chapters", params: { chapters: ["a", "b"] } }).href;
// 产生 /a/b

// 给定 { path: '/:chapters+', name: 'chapters' },
router.resolve({ name: "chapters", params: { chapters: [] } }).href;
// 抛出错误，因为 `chapters` 为空
```

可以与正则结合使用：

```js
const routes = [
  // 仅匹配数字
  // 匹配 /1, /1/2, 等
  { path: "/:chapters(\\d+)+" },
  // 匹配 /, /1, /1/2, 等
  { path: "/:chapters(\\d+)*" },
];
```

3.3 Sensitive 与 strict 路由配置

默认情况下，所有路由是不区分大小写和带尾部斜线的路由的。例如，路由 /users 将匹配 /users、/users/、/Users/。通过 strict 和 sensitive 选项来修改。

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 将匹配 /users/posva 而非：
    // - /users/posva/ 当 strict: true，尾部不能有斜线
    // - /Users/posva 当 sensitive: true，路由区分大小写
    { path: "/users/:id", sensitive: true },
    // 将匹配 /users, /Users, 以及 /users/42 而非 /users/ 或 /users/42/
    { path: "/users/:id?" },
  ],
  strict: true, // applies to all routes
});
```

3.4 可选参数

通过使用 ? 修饰符(0 个或 1 个)将一个参数标为可选：

```js
const routes = [
  // 匹配 /users 和 /users/posva
  { path: "/users/:userId?" },
  // 匹配 /users 和 /users/42
  { path: "/users/:userId(\\d+)?" },
];
```

4. 嵌套路由

顶层的 router-view 渲染顶层路由匹配的组件。一个被渲染的组件也可以包含嵌套的 <router-view>。

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `,
};
```

要将组件渲染到嵌套的 router-view 中，需要在路由中配置 children，以 / 开头的嵌套路径将被视为根路径。不必使用嵌套的 URL：

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
        // 当 /posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: "/posts",
        component: UserPosts,
      },
    ],
  },
];
```

如上配置，访问 /user/eduardo ，User 的 router-view 什么都不展示，因为没有匹配到嵌套路由。可以提供一个空的嵌套路径，来展示一些东西：

```js
const routes = [
  {
    path: "/user/:id",
    component: User,
    children: [
      // 当 /user/:id 匹配成功
      // UserHome 将被渲染到 User 的 <router-view> 内部
      { path: "", component: UserHome },

      // ...其他子路由
    ],
  },
];
```

5. 编程式导航

除了 <router-link> 定义导航链接，还可以使用 router 的实例方法来导航。router.push 返回的是 Promise。

5.1 router.push 导航

使用 router.push 方法，会向 history 栈添加一个新的记录，所以，当点击浏览器后退按钮时，会回到之前的 URL。当点击 <router-link> 时，内部会调用这个方法，所以点击 <router-link :to="..."> 相当于调用 router.push(...) ：

```js
// 字符串路径
router.push("/users/eduardo");

// 带有路径的对象
router.push({ path: "/users/eduardo" });

// 如果路由没有命名username参数，会报错，path: /user/:username?
router.push({ name: "user", params: { username: "eduardo" } });

// 带查询参数，结果是 /register?plan=private
router.push({ path: "/register", query: { plan: "private" } });

// 带 hash，结果是 /about#team
router.push({ path: "/about", hash: "#team" });
```

使用 path 跳转 params 参数会无效，query 参数适用 path 或 name 跳转：

```js
const username = "eduardo";
router.push(`/user/${username}`); // -> /user/eduardo
router.push({ path: `/user/${username}` }); // -> /user/eduardo
router.push({ name: "user", params: { username } }); // -> /user/eduardo
// `params` 不能与 `path` 一起使用
router.push({ path: "/user", params: { username } }); // -> /user
```

5.2 替换当前位置

不会向 history 添加新记录，直接取代了当前的路由。用法：

```html
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
router.push({ path: "/home", replace: true });
// 相当于
router.replace({ path: "/home" });
</script>

<template>
  <router-link :to="..." replace>
</template>
```

5.3 横跨历史

router.go(n) 用一个整数作为参数，表示在历史堆栈中前进或后退多少步，类似于 window.history.go(n)。

```js
// 向前移动一条记录，与 router.forward() 相同
router.go(1);

// 返回一条记录，与 router.back() 相同
router.go(-1);

// 前进 3 条记录
router.go(3);

// 如果没有那么多记录，静默失败
router.go(-100);
router.go(100);
```

6. 命名路由

使用 name 命名路由。优点：1. 没有硬编码的 URL。2. params 的自动编码/解码。3. 防止你在 url 中出现打字错误。4. 绕过路径排序（如显示一个）。

```js
const routes = [
  {
    path: "/user/:username",
    name: "user",
    component: User,
  },
];
```

命名路由，通过 params 传递路由参数，如下路由将导航到 /user/erina。

```vue
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleGo = () =>
  router.push({ name: "user", params: { username: "erina" } });
</script>

<template>
  <router-link :to="{ name: 'user', params: { username: 'erina' } }">
    User
  </router-link>
  <div class="home" @click="handleGo">home</div>
</template>
```

7. 命名视图

设置多个同级<router-view>，通过 name 属性确定渲染组件，默认 default：

```html
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

多个视图就需要多个组件。正确配置 components (带上 s)：

```js
const router = createRouter({
  history: createWebHistory(),
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

8. 重定向和别名

8.1 重定向

通过配置 redirect，实现路由重定向，当有 redirect 属性时，可以省略 component ，因为没有被访问，如下从 /home 重定向到 /：

```js
const routes = [{ path: "/home", redirect: "/" }];
```

也可以使用 name 重定向：

```js
const routes = [{ path: "/home", redirect: { name: "homepage" } }];
```

使用一个方法，动态返回重定向目标：

```js
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
```

8.2 别名

访问别名和访问路由一个效果，使用 alias 声明别名，以 / 开头，并可以使用数组提供多个别名：

```js
const routes = [
  {
    path: "/",
    component: Homepage,
    alias: "/home",
  },
  {
    path: "/users",
    component: UsersLayout,
    children: [
      // 为这 3 个 URL 呈现 UserList
      // - /users
      // - /users/list
      // - /people
      { path: "", component: UserList, alias: ["/people", "list"] },
    ],
  },
];
```

9. 路由组件传参

在组件中使用 $route 会与路由紧密耦合，限制了组件的灵活性，因为它只能用于特定的 URL。可以通过 props 配置来解除这种行为：

```js
const User = {
  template: "<div>User {{ $route.params.id }}</div>",
};
const routes = [{ path: "/user/:id", component: User }];

// 替换成
const User = {
  // 请确保添加一个与路由参数完全相同的 prop 名
  props: ["id"],
  template: "<div>User {{ id }}</div>",
};
const routes = [{ path: "/user/:id", component: User, props: true }];
```

9.1 命名视图

对于有命名视图的路由，必须为每个命名视图定义 props 配置：

```js
const routes = [
  {
    path: "/user/:id",
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false },
  },
];
```

9.2 函数模式

创建一个返回 props 的函数。可以将参数转换为其他类型：

```js
const routes = [
  {
    path: "/demo/:id?",
    name: "demo",
    component: Demo,
    props: (route) => {
      return { id: +route.params.id };
    },
  },
];
```

9.3 Via RouterView

```js
<RouterView v-slot="{ Component }">
  <component
    :is="Component"
    view-prop="value"
   />
</RouterView>
```

10. 不同的历史模式

在创建路由器实例时，history 配置可以选择不同的历史模式。

10.1 Hash 模式

hash 模式是用 createWebHashHistory() 创建的，会在 url 后添加哈希字符（#），对 SEO 不友好，不推荐：

```js
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  // /home#/
  history: createWebHashHistory(),
  routes: [
    //...
  ],
});
```

10.2 Memory 模式

Memory 模式是用 createMemoryHistory() 创建的，适合 Node 环境和 SSR，不推荐：

```js
import { createRouter, createMemoryHistory } from "vue-router";
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    //...
  ],
});
```

10.3 HTML5 模式

用 createWebHistory() 创建 HTML5 模式，URL 会看起来很 "正常"，推荐使用这个模式：

```js
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
});
```

三. 进阶

1. 导航守卫

导航守卫通过跳转或取消的方式守卫导航。路由导航包括：全局，单个路由，组件级。

1.1 全局前置守卫

使用 router.beforeEach 注册全局前置守卫，导航跳转前触发，接受两个参数，to 即将进入的路由，from 即将离开的路由，返回 false 是取消当前跳转，返回一个路由是跳转到返回路由中：

```js
const router = createRouter({ ... })

router.beforeEach(async (to, from) => {
  if (
    // 检查用户是否已登录
    !isAuthenticated &&
    // ❗️ 避免无限重定向
    to.name !== "Login"
  ) {
    // 将用户重定向到登录页面
    return { name: "Login" };
  }
});
```

1.2 全局解析守卫

使用 router.beforeResolve 注册全局解析守卫。解析守卫在导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用。是获取数据或执行任何其他操作（如用户无法进入页面时希望避免执行的操作）的理想位置。例如：确保用户可以访问自定义 meta 属性 requiresCamera 的路由：

```js
router.beforeResolve(async (to) => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission();
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false;
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error;
      }
    }
  }
});
```

1.3 全局后置钩子

使用 router.afterEach 注册全局后置钩子，后置钩子不会改变导航本身，可以用于分析、更改页面标题、声明页面等辅助功能以及许多其他事情：

```js
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath);
});
```

1.4 在守卫内的全局注入

使用 inject() 方法在导航守卫内注入全局属性。app.provide() 中所有内容都可以在 router.beforeEach()、router.beforeResolve()、router.afterEach() 内获取到：

```ts
// main.ts
const app = createApp(App);
app.provide("global", "hello injections");

// router.ts or main.ts
router.beforeEach((to, from) => {
  const global = inject("global"); // 'hello injections'
  // a pinia store
  const userStore = useAuthStore();
  // ...
});
```

1.5 路由独享的守卫

在路由配置上定义 beforeEnter 守卫，在进入路由时触发，不会在 params、query、hash 改变时触发：

```js
const routes = [
  {
    path: "/users/:id",
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false;
    },
  },
];
```

也可以将函数数组传给 beforeEnter，这在为不同的路由重用守卫时很有用：

```js
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash };
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: "" };
}

const routes = [
  {
    path: "/users/:id",
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: "/about",
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
];
```

1.6 组件内的守卫

在路由组件内直接定义路由导航守卫，onBeforeRouteLeave 离开组件时调用，onBeforeRouteUpdate 路由更新时调用

```js
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

onBeforeRouteLeave((to, from) => {});
onBeforeRouteUpdate((to, from) => {});
```

1.7 完整的导航解析流程

导航被触发。
在失活的组件里调用 onBeforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 onBeforeRouteUpdate 守卫(2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
调用全局的 beforeResolve 守卫(2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入

2. 路由元信息

使用 meta 定义路由元信息，可以存放任何信息，如过渡名，路由访问权限等，可以在导航守卫被访问到：

```js
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // 只有经过身份验证的用户才能创建帖子
        meta: { requiresAuth: true },
      },
      {
        path: ':id',
        component: PostsDetail
        // 任何人都可以阅读文章
        meta: { requiresAuth: false },
      }
    ]
  }
]
```

怎么访问 meta 字段呢？

```js
router.beforeEach((to, from) => {
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: "/login",
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    };
  }
});
```

2.1 TypeScript

可以继承来自 vue-router 中的 RouteMeta 来为 meta 字段添加类型：

```ts
// 添加到一个 `.d.ts` 文件中。将这个文件包含在项目的 `tsconfig.json` 中的 "file" 字段内。
import "vue-router";

// 为了确保这个文件被当作一个模块，添加至少一个 `export` 声明
export {};

declare module "vue-router" {
  interface RouteMeta {
    // 是可选的
    isAdmin?: boolean;
    // 每个路由都必须声明
    requiresAuth: boolean;
  }
}
```

3. 数据获取

获取数据可以导航后在组件生命周期获取，也可以在导航前，在路由守卫获取。

3.1 导航完成后获取数据

马上导航和渲染组件，在 created 钩子中获取数据。

```html
<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { watchEffect, reactive } from "vue";

  const route = useRoute();

  watchEffect(() => {
    fetchData(route.params.id);
  });

  const post = reactive(null);
  const fetchData = (id) => {
    getPost(id, (err, post) => {
      post = post;
    });
  };
</script>

<template>
  <div class="post">
    <div class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
```

4. 组合式 API

4.1 在 setup 中访问路由和当前路由

不能直接访问 this.$router 或 this.$route。需使用 useRouter 和 useRoute 函数，但在模板中可以访问 $router 和 $route：

```html
<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const router = useRouter();

  const handleGo = () => {
    router.push({ name: "Home", query: { ...route.query } });
  };
</script>

<template>
  <div class="demo" @click="handleGo">{{ $route.params }}</div>
</template>
```

4.2 导航守卫

onBeforeRouteLeave，onBeforeRouteUpdate 离开和更新守卫：

```html
<script setup lang="ts">
  import {
    useRouter,
    onBeforeRouteLeave,
    onBeforeRouteUpdate,
  } from "vue-router";

  const router = useRouter();

  onBeforeRouteUpdate(() => {
    console.log("更新路由");
  });

  onBeforeRouteLeave(() => {
    console.log("离开路由");
  });

  const changeRoute = () => {
    router.push("/demo/2");
  };
</script>

<template>
  <div class="demo" @click="changeRoute">改变路由</div>
</template>
```

4.3 useLink

利用 RouterLink 构建自己的 RouterLink 组件或生成自定义链接：

```html
<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import { computed } from "vue";

  const props = defineProps({
    // @ts-ignore
    ...RouterLink.props,
    inactiveClass: String,
    _target: {
      type: String,
      default: "_self",
    },
  });

  const isExternalLink = computed(
    () => typeof props.to === "string" && props.to.startsWith("http")
  );
</script>

<template>
  <a v-if="isExternalLink" :href="to" :target="_target"><slot /></a>
  <router-link v-else v-bind="$props" :to="$props.to"><slot /></router-link>
</template>
```

5. RouterView 插槽

RotuerView 暴露插槽，用来渲染路由组件：

```vue
<router-view v-slot="{ Component }">
  <component :is="Component" />
</router-view>

<!-- 等价于 -->
<router-view />
```

5.1 KeepAlive & Transition

KeepAlive 是保持路由组件活跃，而不是 RouterView 本身。所以需要将 KeepAlive 放置在插槽内：

```html
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

同理 Transition 实现路由组件之间切换的过渡效果：

```html
<router-view v-slot="{ Component }">
  <transition>
    <component :is="Component" />
  </transition>
</router-view>
```

5.2 模板引用

可以将模板引用放置在路由组件上：

```html
<router-view v-slot="{ Component }">
  <component :is="Component" ref="mainContent" />
</router-view>
```

6 过渡动效

要实现路由组件切换需要使用 <RouterView> 插槽：

```js
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
```

6.1 单个路由的过渡

使用元信息和动态 name 结合实现每个路由的不同过渡效果：

```js
const routes = [
  {
    path: "/custom-transition",
    component: PanelLeft,
    meta: { transition: "slide-left" },
  },
  {
    path: "/other-transition",
    component: PanelRight,
    meta: { transition: "slide-right" },
  },
];
```

```html
<router-view v-slot="{ Component, route }">
  <!-- 默认过渡效果 `fade` -->
  <transition :name="route.meta.transition || 'fade'">
    <component :is="Component" />
  </transition>
</router-view>
```

6.2 复用视图进行过渡

复用路由组件会忽略过渡，可以添加 key 属性来强制过渡：

```js
<router-view v-slot="{ Component, route }">
  <transition name="fade">
    <component :is="Component" :key="route.path" />
  </transition>
</router-view>
```

7. 滚动行为

通过 scrollBehavior 实现滚动效果，接收 to 和 from 路由对象：

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from) {
    // return 期望滚动到哪个的位置
    return { top: 0 }
  }
})
```

通过 el 传递 CSS 选择器或 DOM 元素。top 和 left 的偏移量相对于该元素。

```js
const router = createRouter({
  scrollBehavior(to, from) {
    // 始终在元素 #main 上方滚动 10px
    return {
      // 也可以这么写
      // el: document.getElementById('main'),
      el: "#main",
      // 在元素上 10 像素
      top: 10,
    };
  },
});
```

模拟 “滚动到锚点” 的行为：

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    }
  },
});
```

如果浏览器支持滚动行为，设置 behavior 让它变得更流畅：

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});
```

7.1 延迟滚动

通过返回一个 Promise，实现延时滚动：

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 500);
    });
  },
});
```

8. 路由懒加载

当打包时，JS 包会非常大，影响用户体验，使用动态导入代替静态导入：

```js
// 将
// import UserDetails from './views/UserDetails.vue'
// 替换成
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  // ...
  routes: [
    { path: '/users/:id', component: UserDetails }
    // 或在路由定义里直接使用它
    { path: '/users/:id', component: () => import('./views/UserDetails.vue') },
  ],
})
```

8.1 把组件按组分块

8.1.1 使用 webpack

把某个路由下的所有组件打包到同个异步块 (chunk) 中。使用命名 chunk，特殊的注释语法：

```js
const UserDetails = () =>
  import(/* webpackChunkName: "group-user" */ "./UserDetails.vue");
const UserDashboard = () =>
  import(/* webpackChunkName: "group-user" */ "./UserDashboard.vue");
const UserProfileEdit = () =>
  import(/* webpackChunkName: "group-user" */ "./UserProfileEdit.vue");
```

8.1.2 使用 Vite

使用 rollupOptions 下定义分块：

```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          "group-user": [
            "./src/UserDetails",
            "./src/UserDashboard",
            "./src/UserProfileEdit",
          ],
        },
      },
    },
  },
});
```

9. 扩展 RouterLink

自定义 RouterLink 实现导航菜单链接，处理外部链接：

```html
<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import { computed } from "vue";

  const props = defineProps({
    // @ts-ignore
    ...RouterLink.props,
    _target: {
      type: String,
      default: "_self",
    },
  });

  const isExternalLink = computed(
    () => typeof props.to === "string" && props.to.startsWith("http")
  );
</script>

<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" :target="_target"
    ><slot
  /></a>
  <router-link v-else v-bind="$props" :to="$props.to"><slot /></router-link>
</template>
```

10. 导航故障

10.1 检测导航故障

如果导航被阻，可以通过 router.push 返回的 Promise 的解判断是否离开了当前位置：

```js
const navigationResult = await router.push("/my-profile");

if (navigationResult) {
  // 导航被阻止
} else {
  // 导航成功 (包括重新导航的情况)
  this.isMenuOpen = false;
}
```

10.2 全局导航故障

使用 router.afterEach() 检测全局导航故障：

```js
router.afterEach((to, from, failure) => {
  if (failure) {
    sendToAnalytics(to, from, failure);
  }
});
```

11. 动态路由

11.1 添加/移除 路由

使用 router.addRoute() 和 router.removeRoute() 实现动态路由的添加和删除。

```js
router.addRoute({ path: "/about", component: About });
router.removeRoute("About"); // 使用 name 移除
```

11.2 在导航守卫中添加路由

通过返回新的位置来触发重定向：

```js
router.beforeEach((to) => {
  if (!hasNecessaryRoute(to)) {
    router.addRoute(generateRoute(to));
    // 触发重定向
    return to.fullPath;
  }
});
```

11.3 添加嵌套路由

将路由的 name 作为第一个参数传递给 router.addRoute()：

```js
router.addRoute({ name: "admin", path: "/admin", component: Admin });
router.addRoute("admin", { path: "settings", component: AdminSettings });
// 等价于
router.addRoute({
  name: "admin",
  path: "/admin",
  component: Admin,
  children: [{ path: "settings", component: AdminSettings }],
});
```

11.4 查看现有路由

Vue Router 提供了两个功能来查看现有的路由：

| router.hasRoute(routerName)：检查路由是否存在。
| router.getRoutes()：获取一个包含所有路由记录的数组。
