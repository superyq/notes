# Vue-Router 官网速通

前言：参考[Vue Router](https://router.vuejs.org/zh/introduction.html)

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

将组件映射到路由上，让 Vue Router 知道在哪里渲染它们。

使用 router-link 未直接使用 a 标签来创建链接。好处：1. 在不重新加载页面的情况下更改 URL。2. 处理 URL 的生成以及编码。

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

在 Vue2 中可以通过 this.router 跳转路由和 this.$route 访问当前路由。

```js
// Home.vue
export default {
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username;
    },
  },
  methods: {
    goToDashboard() {
      if (isAuthenticated) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/login");
      }
    },
  },
};
```

在 Vue3 的 setup 函数中通过调用 useRouter 和 useRoute 函数创建实例来访问。

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
const User = {
  template: "...",
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
      }
    );
  },
};
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

8.2 相对重定向

也可以重定向到相对位置：

```js
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

8.3 别名

重定向是指当用户访问 /home 时，URL 会被 / 替换，然后匹配成 /。那么什么是别名呢？

将 / 别名为 /home，意味着当用户访问 /home 时，URL 仍然是 /home，但会被匹配为用户正在访问 /。

上面对应的路由配置为：

```js
const routes = [{ path: "/", component: Homepage, alias: "/home" }];
```

通过别名，你可以自由地将 UI 结构映射到一个任意的 URL，而不受配置的嵌套结构的限制。使别名以 / 开头，以使嵌套路径中的路径成为绝对路径。你甚至可以将两者结合起来，用一个数组提供多个别名：

```js
const routes = [
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

如果你的路由有参数，请确保在任何绝对别名中包含它们：

```js
const routes = [
  {
    path: "/users/:id",
    component: UsersByIdLayout,
    children: [
      // 为这 3 个 URL 呈现 UserDetails
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: "profile", component: UserDetails, alias: ["/:id", ""] },
    ],
  },
];
```

1. 路由组件传参

在你的组件中使用 $route 会与路由紧密耦合，这限制了组件的灵活性，因为它只能用于特定的 URL。虽然这不一定是件坏事，但我们可以通过 props 配置来解除这种行为：

我们可以将下面的代码

```js
const User = {
  template: "<div>User {{ $route.params.id }}</div>",
};
const routes = [{ path: "/user/:id", component: User }];
```

替换成

```js
const User = {
  // 请确保添加一个与路由参数完全相同的 prop 名
  props: ["id"],
  template: "<div>User {{ id }}</div>",
};
const routes = [{ path: "/user/:id", component: User, props: true }];
```

这允许你在任何地方使用该组件，使得该组件更容易重用和测试。

9.1 布尔模式

当 props 设置为 true 时，route.params 将被设置为组件的 props。

9.2 命名视图

对于有命名视图的路由，你必须为每个命名视图定义 props 配置：

```js
const routes = [
  {
    path: "/user/:id",
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false },
  },
];
```

9.3 对象模式

当 props 是一个对象时，它将原样设置为组件 props。当 props 是静态的时候很有用。

```js
const routes = [
  {
    path: "/promotion/from-newsletter",
    component: Promotion,
    props: { newsletterPopup: false },
  },
];
```

9.4 函数模式

你可以创建一个返回 props 的函数。这允许你将参数转换为其他类型，将静态值与基于路由的值相结合等等。

```js
const routes = [
  {
    path: "/search",
    component: SearchUser,
    props: (route) => ({ query: route.query.q }),
  },
];
```

URL /search?q=vue 将传递 {query: 'vue'} 作为 props 传给 SearchUser 组件。

请尽可能保持 props 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 props，请使用包装组件，这样 vue 才可以对状态变化做出反应。

9.5 Via RouterView

```js
<RouterView v-slot="{ Component }">
  <component
    :is="Component"
    view-prop="value"
   />
</RouterView>
```

10. 不同的历史模式

在创建路由器实例时，history 配置允许我们在不同的历史模式中进行选择。

10.1 Hash 模式

hash 模式是用 createWebHashHistory() 创建的：

```js
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
});
```

它在内部传递的实际 URL 之前使用了一个哈希字符（#）。由于这部分 URL 从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理。不过，它在 SEO 中确实有不好的影响。如果你担心这个问题，可以使用 HTML5 模式。

10.2 Memory 模式

Memory 模式不会假定自己处于浏览器环境，因此不会与 URL 交互也不会自动触发初始导航。这使得它非常适合 Node 环境和 SSR。它是用 createMemoryHistory() 创建的，并且需要你在调用 app.use(router) 之后手动 push 到初始导航。

```js
import { createRouter, createMemoryHistory } from "vue-router";
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    //...
  ],
});
```

虽然不推荐，你仍可以在浏览器应用程序中使用此模式，但请注意它不会有历史记录，这意味着你无法后退或前进。

10.3 HTML5 模式

用 createWebHistory() 创建 HTML5 模式，推荐使用这个模式：

```js
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
});
```

当使用这种历史模式时，URL 会看起来很 "正常"，例如 https://example.com/user/id。漂亮!

不过，问题来了。由于我们的应用是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问 https://example.com/user/id，就会得到一个 404 错误。这就尴尬了。

不用担心：要解决这个问题，你需要做的就是在你的服务器上添加一个简单的回退路由。如果 URL 不匹配任何静态资源，它应提供与你的应用程序中的 index.html 相同的页面。漂亮依旧!

10.4 服务器配置示例

注意：以下示例假定你正在从根目录提供服务。如果你部署到子目录，你应该使用 Vue CLI 的 publicPath 配置和相关的路由器的 base 属性。你还需要调整下面的例子，以使用子目录而不是根目录（例如，将 RewriteBase/ 替换为 RewriteBase/name-of-your-subfolder/）。

10.4.1 Apache

```
<IfModule mod_negotiation.c>
  Options -MultiViews
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

也可以使用 FallbackResource 代替 mod_rewrite。

10.4.2 nginx

```
location / {
  try_files $uri $uri/ /index.html;
}
```

10.4.3 原生 Node.js

```js
const http = require("http");
const fs = require("fs");
const httpPort = 80;

http
  .createServer((req, res) => {
    fs.readFile("index.html", "utf-8", (err, content) => {
      if (err) {
        console.log('We cannot open "index.html" file.');
      }

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });

      res.end(content);
    });
  })
  .listen(httpPort, () => {
    console.log("Server listening on: http://localhost:%s", httpPort);
  });
```

10.4.4 Express + Node.js

对于 Node.js/Express，可以考虑使用 connect-history-api-fallback 中间件。

10.4.5 Internet Information Services (IIS)

安装 IIS UrlRewrite
在网站的根目录下创建一个 web.config 文件，内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Handle History Mode and custom 404/500" stopProcessing="true">
          <match url="(.*)" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

10.4.6 Caddy v2

```
try_files {path} /
```

10.4.7 Caddy v1

```
rewrite {
    regexp .*
    to {path} /
}
```

10.4.8 Firebase hosting

将此添加到你的 firebase.json 中：

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

10.4.9 Netlify

创建一个 \_redirects 文件，包含在你的部署文件中：

```js
/* /index.html 200
```

在 vue-cli、nuxt 和 vite 项目中，这个文件通常放在名为 static 或 public 的目录下。

你可以在 Netlify 文档中找到更多关于语法的信息。你也可以创建一个 netlify.toml 来结合其他 Netlify 功能的重定向。

10.4.10 Vercel

在项目根目录创建一个 vercel.json 文件，内容如下：

```json
{
  "rewrites": [{ "source": "/:path*", "destination": "/index.html" }]
}
```

10.5 附加说明

这有一个注意事项。你的服务器将不再报告 404 错误，因为现在所有未找到的路径都会显示你的 index.html 文件。为了解决这个问题，你应该在你的 Vue 应用程序中实现一个万能的路由来显示 404 页面。

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/:pathMatch(.*)", component: NotFoundComponent }],
});
```

另外，如果你使用的是 Node.js 服务器，你可以通过在服务器端使用路由器来匹配传入的 URL，如果没有匹配到路由，则用 404 来响应，从而实现回退。查看 Vue 服务器端渲染文档了解更多信息。

三. 进阶

1. 导航守卫

正如其名，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。这里有很多方式植入路由导航中：全局的，单个路由独享的，或者组件级的。

1.1 全局前置守卫

你可以使用 router.beforeEach 注册一个全局前置守卫：

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于等待中。

每个守卫方法接收两个参数：

to: 即将要进入的目标 用一种标准化的方式
from: 当前导航正要离开的路由 用一种标准化的方式

可以返回的值如下:

false: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

一个路由地址: 通过一个路由地址重定向到一个不同的地址，如同调用 router.push()，且可以传入诸如 replace: true 或 name: 'home' 之类的选项。它会中断当前的导航，同时用相同的 from 创建一个新导航。

```js
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

如果遇到了意料之外的情况，可能会抛出一个 Error。这会取消导航并且调用 router.onError() 注册过的回调。

如果什么都没有，undefined 或返回 true，则导航是有效的，并调用下一个导航守卫
以上所有都同 async 函数 和 Promise 工作方式一样：

```js
router.beforeEach(async (to, from) => {
  // canUserAccess() 返回 `true` 或 `false`
  const canAccess = await canUserAccess(to);
  if (!canAccess) return "/login";
});
```

1.1.1 可选的第三个参数 next

在之前的 Vue Router 版本中，还可以使用 第三个参数 next 。这是一个常见的错误来源，我们经过 RFC 讨论将其移除。然而，它仍然是被支持的，这意味着你可以向任何导航守卫传递第三个参数。在这种情况下，确保 next 在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。这里有一个在用户未能验证身份时重定向到/login 的错误用例：

```js
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next();
});
```

下面是正确的版本:

```js
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
});
```

1.2 全局解析守卫

你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，因为它在每次导航时都会触发，不同的是，解析守卫刚好会在导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用。这里有一个例子，确保用户可以访问自定义 meta 属性 requiresCamera 的路由：

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

router.beforeResolve 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

1.3 全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：

```js
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath);
});
```

它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。

它们也反映了 navigation failures 作为第三个参数：

```js
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath);
});
```

1.4 在守卫内的全局注入

从 Vue 3.3 开始，你可以在导航守卫内使用 inject() 方法。这在注入像 pinia stores 这样的全局属性时很有用。在 app.provide() 中提供的所有内容都可以在 router.beforeEach()、router.beforeResolve()、router.afterEach() 内获取到：

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

你可以直接在路由配置上定义 beforeEnter 守卫：

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

beforeEnter 守卫 只在进入路由时触发，不会在 params、query 或 hash 改变时触发。例如，从 /users/2 进入到 /users/3 或者从 /users/2#info 进入到 /users/2#projects。它们只有在 从一个不同的 路由导航时，才会被触发。

你也可以将一个函数数组传递给 beforeEnter，这在为不同的路由重用守卫时很有用：

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

请注意，你也可以通过使用路径 meta 字段和全局导航守卫来实现类似的行为。

1.6 组件内的守卫

最后，你可以在路由组件内直接定义路由导航守卫(传递给路由配置的)

1.6.1 可用的配置 API

你可以为路由组件添加以下配置：

beforeRouteEnter
beforeRouteUpdate
beforeRouteLeave

```js
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
};
```

beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数：

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持 传递回调，因为没有必要了：

```js
beforeRouteUpdate (to, from) {
  // just use `this`
  this.name = to.params.name
}
```

这个 离开守卫 通常用来预防用户在还未保存修改前突然离开。该导航可以通过返回 false 来取消。

```js
beforeRouteLeave (to, from) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (!answer) return false
}
```

1.6.2 使用组合 API

如果你正在使用组合 API 和 setup 函数来编写组件，你可以通过 onBeforeRouteUpdate 和 onBeforeRouteLeave 分别添加 update 和 leave 守卫。

1.7 完整的导航解析流程

导航被触发。
在失活的组件里调用 beforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫(2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入

2. 路由元信息

有时，你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等。这些事情可以通过接收属性对象的 meta 属性来实现，并且它可以在路由地址和导航守卫上都被访问到。定义路由的时候你可以这样配置 meta 字段：

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

那么如何访问这个 meta 字段呢？

首先，我们称呼 routes 配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，它可能匹配多个路由记录。

例如，根据上面的路由配置，/posts/new 这个 URL 将会匹配父路由记录 (path: '/posts') 以及子路由记录 (path: 'new')。

一个路由匹配到的所有路由记录会暴露为 $route 对象(还有在导航守卫中的路由对象)的$route.matched 数组。我们需要遍历这个数组来检查路由记录中的 meta 字段，但是 Vue Router 还为你提供了一个 $route.meta 方法，它是一个非递归合并所有 meta 字段（从父字段到子字段）的方法。这意味着你可以简单地写

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

也可以继承来自 vue-router 中的 RouteMeta 来为 meta 字段添加类型：

```ts
// 这段可以直接添加到你的任何 `.ts` 文件中，例如 `router.ts`
// 也可以添加到一个 `.d.ts` 文件中。确保这个文件包含在
// 项目的 `tsconfig.json` 中的 "file" 字段内。
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

有时候，进入某个路由后，需要从服务器获取数据。例如，在渲染用户信息时，你需要从服务器获取用户的数据。我们可以通过两种方式来实现：

导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。

导航完成之前获取：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

从技术角度讲，两种方式都不错 —— 就看你想要的用户体验是哪种。

3.1 导航完成后获取数据

当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 created 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。

假设我们有一个 Post 组件，需要基于 $route.params.id 获取文章数据：

```html
<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
```

```js
export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    };
  },
  created() {
    // watch 路由的参数，以便再次获取数据
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData();
      },
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      { immediate: true }
    );
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      // replace `getPost` with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.post = post;
        }
      });
    },
  },
};
```

3.2 在导航完成前获取数据

通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法：

```js
export default {
  data() {
    return {
      post: null,
      error: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    getPost(to.params.id, (err, post) => {
      // `setData` 方法定义在下面的代码中
      next((vm) => vm.setData(err, post));
    });
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  async beforeRouteUpdate(to, from) {
    this.post = null;
    try {
      this.post = await getPost(to.params.id);
    } catch (error) {
      this.error = error.toString();
    }
  },
  methods: {
    setData(error, post) {
      if (error) {
        this.error = error;
      } else {
        this.post = post;
      }
    },
  },
};
```

在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒。

4. 组合式 API

引入 setup 和 Vue 的组合式 API，开辟了新的可能性，但要想充分发挥 Vue Router 的潜力，我们需要使用一些新的函数来代替访问 this 和组件内导航守卫。

4.1 在 setup 中访问路由和当前路由

因为我们在 setup 里面没有访问 this，所以我们不能再直接访问 this.$router 或 this.$route。作为替代，我们使用 useRouter 和 useRoute 函数：

```js
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    function pushWithQuery(query) {
      router.push({
        name: "search",
        query: {
          ...route.query,
          ...query,
        },
      });
    }
  },
};
```

route 对象是一个响应式对象，所以它的任何属性都可以被监听，但你应该避免监听整个 route 对象。在大多数情况下，你应该直接监听你期望改变的参数。

```js
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

export default {
  setup() {
    const route = useRoute();
    const userData = ref();

    // 当参数更改时获取用户信息
    watch(
      () => route.params.id,
      async (newId) => {
        userData.value = await fetchUser(newId);
      }
    );
  },
};
```

请注意，在模板中我们仍然可以访问 $router 和 $route，所以不需要在 setup 中返回 router 或 route。

4.2 导航守卫

虽然你仍然可以通过 setup 函数来使用组件内的导航守卫，但 Vue Router 将更新和离开守卫作为 组合式 API 函数公开：

```js
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    // 与 beforeRouteLeave 相同，无法访问 `this`
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      // 取消导航并停留在同一页面上
      if (!answer) return false;
    });

    const userData = ref();

    // 与 beforeRouteUpdate 相同，无法访问 `this`
    onBeforeRouteUpdate(async (to, from) => {
      //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
      if (to.params.id !== from.params.id) {
        userData.value = await fetchUser(to.params.id);
      }
    });
  },
};
```

组合式 API 守卫也可以用在任何由 <router-view> 渲染的组件中，它们不必像组件内守卫那样直接用在路由组件上。

4.3 useLink

Vue Router 将 RouterLink 的内部行为作为一个组合式函数 (composable) 公开。它接收一个类似 RouterLink 所有 prop 的响应式对象，并暴露底层属性来构建你自己的 RouterLink 组件或生成自定义链接：

```js
import { RouterLink, useLink } from "vue-router";
import { computed } from "vue";

export default {
  name: "AppLink",

  props: {
    // 如果使用 TypeScript，请添加 @ts-ignore
    ...RouterLink.props,
    inactiveClass: String,
  },

  setup(props) {
    const {
      // 解析出来的路由对象
      route,
      // 用在链接里的 href
      href,
      // 布尔类型的 ref 标识链接是否匹配当前路由
      isActive,
      // 布尔类型的 ref 标识链接是否严格匹配当前路由
      isExactActive,
      // 导航至该链接的函数
      navigate,
    } = useLink(props);

    const isExternalLink = computed(
      () => typeof props.to === "string" && props.to.startsWith("http")
    );

    return { isExternalLink, href, navigate, isActive };
  },
};
```

注意在 RouterLink 的 v-slot 中可以访问与 useLink 组合式函数相同的属性。

5. RouterView 插槽

RotuerView 组件暴露了一个插槽，可以用来渲染路由组件：

```vue
<router-view v-slot="{ Component }">
  <component :is="Component" />
</router-view>
```

上面的代码等价于不带插槽的 <router-view />，但是当我们想要获得其他功能时，插槽提供了额外的扩展性。

5.1 KeepAlive & Transition

当在处理 KeepAlive 组件时，我们通常想要保持路由组件活跃，而不是 RouterView 本身。为了实现这个目的，我们可以将 KeepAlive 组件放置在插槽内：

```html
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

类似地，插槽允许我们使用一个 Transition 组件来实现在路由组件之间切换时实现过渡效果：

```html
<router-view v-slot="{ Component }">
  <transition>
    <component :is="Component" />
  </transition>
</router-view>
```

我们也可以在 Transition 组件内使用 KeepAlive 组件：

```html
<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
```

5.2 传递 props 和插槽

我们可以利用其插槽给路由组件传递 props 或插槽：

```html
<router-view v-slot="{ Component }">
  <component :is="Component" some-prop="a value">
    <p>Some slotted content</p>
  </component>
</router-view>
```

实践中通常不会这么做，因为这样会导致所有路由组件都使用相同的 props 和插槽。

5.3 模板引用

使用插槽可以让我们直接将模板引用放置在路由组件上：

```html
<router-view v-slot="{ Component }">
  <component :is="Component" ref="mainContent" />
</router-view>
```

而如果我们将引用放在 <router-view> 上，那引用将会被 RouterView 的实例填充，而不是路由组件本身。

6 过渡动效

想要在你的路径组件上使用转场，并对导航进行动画处理，你需要使用 <RouterView> 插槽：

```js
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
```

6.1
单个路由的过渡

上面的用法会对所有的路由使用相同的过渡。如果你想让每个路由的组件有不同的过渡，你可以将元信息和动态的 name 结合在一起，放在<transition> 上：

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

```js
<router-view v-slot="{ Component, route }">
  <!-- 使用任何自定义过渡和回退到 `fade` -->
  <transition :name="route.meta.transition || 'fade'">
    <component :is="Component" />
  </transition>
</router-view>
```

6.2 基于路由的动态过渡

也可以根据目标路由和当前路由之间的关系，动态地确定使用的过渡。使用和刚才非常相似的片段：

```js
<!-- 使用动态过渡名称 -->
<router-view v-slot="{ Component, route }">
  <transition :name="route.meta.transition">
    <component :is="Component" />
  </transition>
</router-view>
```

我们可以添加一个 after navigation hook，根据路径的深度动态添加信息到 meta 字段。

```js
router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transition = toDepth < fromDepth ? "slide-right" : "slide-left";
});
```

6.3 强制在复用的视图之间进行过渡

Vue 可能会自动复用看起来相似的组件，从而忽略了任何过渡。幸运的是，可以添加一个 key 属性来强制过渡。这也允许你在相同路由上使用不同的参数触发过渡：

```js
<router-view v-slot="{ Component, route }">
  <transition name="fade">
    <component :is="Component" :key="route.path" />
  </transition>
</router-view>
```

7. 滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

注意: 这个功能只在支持 history.pushState 的浏览器中可用。

当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```

scrollBehavior 函数接收 to 和 from 路由对象，如 Navigation Guards。第三个参数 savedPosition，只有当这是一个 popstate 导航时才可用（由浏览器的后退/前进按钮触发）

该函数可以返回一个 ScrollToOptions 位置对象:

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});
```

你也可以通过 el 传递一个 CSS 选择器或一个 DOM 元素。在这种情况下，top 和 left 将被视为该元素的相对偏移量。

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
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

如果返回一个 falsy 的值，或者是一个空对象，那么不会发生滚动。

返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
```

如果你要模拟 “滚动到锚点” 的行为：

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

如果你的浏览器支持滚动行为，你可以让它变得更流畅：

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

有时候，我们需要在页面中滚动之前稍作等待。例如，当处理过渡时，我们希望等待过渡结束后再滚动。要做到这一点，你可以返回一个 Promise，它可以返回所需的位置描述符。下面是一个例子，我们在滚动前等待 500ms：

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

我们可以将其与页面级过渡组件的事件挂钩，以使滚动行为与你的页面过渡很好地结合起来，但由于使用场景可能存在的差异和复杂性，我们只是提供了这个基础来实现特定的用户场景。

8. 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

Vue Router 支持开箱即用的动态导入，这意味着你可以用动态导入代替静态导入：

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

component (和 components) 配置接收一个返回 Promise 组件的函数，Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。这意味着你也可以使用更复杂的函数，只要它们返回一个 Promise ：

```js
const UserDetails = () =>
  Promise.resolve({
    /* 组件定义 */
  });
```

一般来说，对所有的路由都使用动态导入是个好主意。

注意：不要在路由中使用异步组件。异步组件仍然可以在路由组件中使用，但路由组件本身就是动态导入的。

如果你使用的是 webpack 之类的打包器，它将自动从代码分割中受益。

如果你使用的是 Babel，你将需要添加 syntax-dynamic-import 插件，才能使 Babel 正确地解析语法。

8.1 把组件按组分块

8.1.1 使用 webpack

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)：

```js
const UserDetails = () =>
  import(/* webpackChunkName: "group-user" */ "./UserDetails.vue");
const UserDashboard = () =>
  import(/* webpackChunkName: "group-user" */ "./UserDashboard.vue");
const UserProfileEdit = () =>
  import(/* webpackChunkName: "group-user" */ "./UserProfileEdit.vue");
```

webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。

8.1.2 使用 Vite

在 Vite 中，你可以在 rollupOptions 下定义分块：

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

RouterLink 组件提供了足够的 props 来满足大多数基本应用程序的需求，但它并未尝试涵盖所有可能的用例，在某些高级情况下，你可能会发现自己使用了 v-slot。在大多数中型到大型应用程序中，值得创建一个（如果不是多个）自定义 RouterLink 组件，以在整个应用程序中重用它们。例如导航菜单中的链接，处理外部链接，添加 inactive-class 等。

RouterLink 组件提供了足够的 props 来满足大多数基本应用程序的需求，但它并未尝试涵盖所有可能的用例，在某些高级情况下，你可能会发现自己使用了 v-slot。在大多数中型到大型应用程序中，值得创建一个（如果不是多个）自定义 RouterLink 组件，以在整个应用程序中重用它们。例如导航菜单中的链接，处理外部链接，添加 inactive-class 等。

```html
<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </router-link>
</template>

<script>
  import { RouterLink } from "vue-router";

  export default {
    name: "AppLink",
    inheritAttrs: false,

    props: {
      // 如果使用 TypeScript，请添加 @ts-ignore
      ...RouterLink.props,
      inactiveClass: String,
    },

    computed: {
      isExternalLink() {
        return typeof this.to === "string" && this.to.startsWith("http");
      },
    },
  };
</script>
```

如果你喜欢使用渲染函数或创建 computed 属性，你可以使用 Composition API 中的 useLink ：

```js
import { RouterLink, useLink } from "vue-router";

export default {
  name: "AppLink",

  props: {
    // 如果使用 TypeScript，请添加 @ts-ignore
    ...RouterLink.props,
    inactiveClass: String,
  },

  setup(props) {
    // `props` 包含 `to` 和任何其他可以传递给 <router-link> 的 prop
    const { navigate, href, route, isActive, isExactActive } = useLink(props);

    // profit!

    return { isExternalLink };
  },
};
```

在实践中，你可能希望将你的 AppLink 组件用于应用程序的不同部分。例如，使用 Tailwind CSS，你可以用所有的类创建一个 NavLink.vue 组件：

```html
<template>
  <AppLink
    v-bind="$attrs"
    class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
    active-class="border-indigo-500 text-gray-900 focus:border-indigo-700"
    inactive-class="text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
  >
    <slot />
  </AppLink>
</template>
```

10. 导航故障

当使用 router-link 组件时，Vue Router 会自动调用 router.push 来触发一次导航。虽然大多数链接的预期行为是将用户导航到一个新页面，但也有少数情况下用户将留在同一页面上：

用户已经位于他们正在尝试导航到的页面
一个导航守卫通过调用 return false 中断了这次导航
当前的导航守卫还没有完成时，一个新的导航守卫会出现了
一个导航守卫通过返回一个新的位置，重定向到其他地方 (例如，return '/login')
一个导航守卫抛出了一个 Error

如果我们想在一个导航完成后做一些事情，我们需要一个在调用 router.push 后进行等待的方法。想象一下，我们有一个移动手机菜单，它允许我们进入不同的页面，而我们只想在导航到新页面后隐藏菜单，我们可能想这样做：

```js
router.push("/my-profile");
this.isMenuOpen = false;
```

但是这样做会马上关闭菜单，因为 导航是异步的，我们需要 await router.push 返回的 promise ：

```js
await router.push("/my-profile");
this.isMenuOpen = false;
```

现在，一旦导航完成，菜单就会关闭，但如果导航被阻止，它也会关闭。我们需要一种方法来检测我们是否真的改变了页面。

10.1 检测导航故障

如果导航被阻止，导致用户停留在同一个页面上，由 router.push 返回的 Promise 的解析值将是 Navigation Failure。否则，它将是一个 falsy 值(通常是 undefined)。这样我们就可以区分我们导航是否离开了当前位置：

```js
const navigationResult = await router.push("/my-profile");

if (navigationResult) {
  // 导航被阻止
} else {
  // 导航成功 (包括重新导航的情况)
  this.isMenuOpen = false;
}
```

Navigation Failure 是带有一些额外属性的 Error 实例，这些属性为我们提供了足够的信息，让我们知道哪些导航被阻止了以及为什么被阻止了。要检查导航结果的性质，请使用 isNavigationFailure 函数：

```js
import { NavigationFailureType, isNavigationFailure } from "vue-router";

// 试图离开未保存的编辑文本界面
const failure = await router.push("/articles/2");

if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
  // 给用户显示一个小通知
  showToast("You have unsaved changes, discard and leave anyway?");
}
```

TIP:如果你忽略第二个参数： isNavigationFailure(failure)，那么就只会检查这个 failure 是不是一个 Navigation Failure。

10.2 全局导航故障

你可以用 router.afterEach() 导航守卫检测全局导航故障：

```js
router.afterEach((to, from, failure) => {
  if (failure) {
    sendToAnalytics(to, from, failure);
  }
});
```

10.3 鉴别导航故障

正如我们在一开始所说的，有不同的情况会导致导航的中止，所有这些情况都会导致不同的 Navigation Failure。它们可以用 isNavigationFailure 和 NavigationFailureType 来区分。总共有三种不同的类型：

aborted：在导航守卫中返回 false 中断了本次导航。
cancelled： 在当前导航完成之前又有了一个新的导航。比如，在等待导航守卫的过程中又调用了 router.push。
duplicated：导航被阻止，因为我们已经在目标位置了。

10.4 导航故障的属性

所有的导航失败都会暴露 to 和 from 属性，以反映失败导航的当前位置和目标位置：

```js
// 正在尝试访问 admin 页面
router.push("/admin").then((failure) => {
  if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
    failure.to.path; // '/admin'
    failure.from.path; // '/'
  }
});
```

在所有情况下，to 和 from 都是规范化的路由地址。

10.5 检测重定向

当在导航守卫中返回一个新的位置时，我们会触发一个新的导航，覆盖正在进行的导航。与其他返回值不同的是，重定向不会阻止导航，而是创建一个新的导航。因此，通过读取路由地址中的 redirectedFrom 属性，对其进行不同的检查：

```js
await router.push("/my-profile");
if (router.currentRoute.value.redirectedFrom) {
  // redirectedFrom 是解析出的路由地址，就像导航守卫中的 to和 from
}
```

11. 动态路由

对路由的添加通常是通过 routes 选项来完成的，但是在某些情况下，你可能想在应用程序已经运行的时候添加或删除路由。具有可扩展接口(如 Vue CLI UI )这样的应用程序可以使用它来扩展应用程序。

11.1 添加路由

动态路由主要通过两个函数实现。router.addRoute() 和 router.removeRoute()。它们只注册一个新的路由，也就是说，如果新增加的路由与当前位置相匹配，就需要你用 router.push() 或 router.replace() 来手动导航，才能显示该新路由。我们来看一个例子：

想象一下，只有一个路由的以下路由：

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/:articleName", component: Article }],
});
```

进入任何页面，/about，/store，或者 /3-tricks-to-improve-your-routing-code 最终都会呈现 Article 组件。如果我们在 /about 上添加一个新的路由：

```js
router.addRoute({ path: "/about", component: About });
```

页面仍然会显示 Article 组件，我们需要手动调用 router.replace() 来改变当前的位置，并覆盖我们原来的位置（而不是添加一个新的路由，最后在我们的历史中两次出现在同一个位置）：

```js
router.addRoute({ path: "/about", component: About });
// 我们也可以使用 this.$route 或 route = useRoute() （在 setup 中）
router.replace(router.currentRoute.value.fullPath);
```

记住，如果你需要等待新的路由显示，可以使用 await router.replace()。

11.2 在导航守卫中添加路由

如果你决定在导航守卫内部添加或删除路由，你不应该调用 router.replace()，而是通过返回新的位置来触发重定向：

```js
router.beforeEach((to) => {
  if (!hasNecessaryRoute(to)) {
    router.addRoute(generateRoute(to));
    // 触发重定向
    return to.fullPath;
  }
});
```

上面的例子有两个假设：第一，新添加的路由记录将与 to 位置相匹配，实际上导致与我们试图访问的位置不同。第二，hasNecessaryRoute() 在添加新的路由后返回 false，以避免无限重定向。

因为是在重定向中，所以我们是在替换将要跳转的导航，实际上行为就像之前的例子一样。而在实际场景中，添加路由的行为更有可能发生在导航守卫之外，例如，当一个视图组件挂载时，它会注册新的路由。

11.3 删除路由

有几个不同的方法来删除现有的路由：

| 通过添加一个名称冲突的路由。如果添加与现有途径名称相同的途径，会先删除路由，再添加路由：

```js
router.addRoute({ path: "/about", name: "about", component: About });
// 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
router.addRoute({ path: "/other", name: "about", component: Other });
```

| 通过调用 router.addRoute() 返回的回调：

```js
const removeRoute = router.addRoute(routeRecord);
removeRoute(); // 删除路由如果存在的话
```

当路由没有名称时，这很有用。

| 通过使用 router.removeRoute() 按名称删除路由：

```js
router.addRoute({ path: "/about", name: "about", component: About });
// 删除路由
router.removeRoute("about");
```

需要注意的是，如果你想使用这个功能，但又想避免名字的冲突，可以在路由中使用 Symbol 作为名字。

当路由被删除时，所有的别名和子路由也会被同时删除

11.4 添加嵌套路由

要将嵌套路由添加到现有的路由中，可以将路由的 name 作为第一个参数传递给 router.addRoute()，这将有效地添加路由，就像通过 children 添加的一样：

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

11.5 查看现有路由

Vue Router 提供了两个功能来查看现有的路由：

| router.hasRoute()：检查路由是否存在。
| router.getRoutes()：获取一个包含所有路由记录的数组。

四：从 Vue2 迁移

在 Vue Router API 从 v3（Vue2）到 v4（Vue3）的重写过程中，大部分的 Vue Router API 都没有变化，但是在迁移你的程序时，你可能会遇到一些破坏性的变化。本指南将帮助你了解为什么会发生这些变化，以及如何调整你的程序，使其与 Vue Router4 兼容。

1. 破坏性变化

变化的顺序是按其用途排列的。因此，建议按照这个清单的顺序进行。

1.1 new Router 变成 createRouter

Vue Router 不再是一个类，而是一组函数。现在你不用再写 new Router()，而是要调用 createRouter:

```js
// 以前是
// import Router from 'vue-router'
import { createRouter } from "vue-router";

const router = createRouter({
  // ...
});
```

1.2 新的 history 配置取代 mode

mode: 'history' 配置已经被一个更灵活的 history 配置所取代。根据你使用的模式，你必须用适当的函数替换它：

"history": createWebHistory()
"hash": createWebHashHistory()
"abstract": createMemoryHistory()

下面是一个完整的代码段：

```js
import { createRouter, createWebHistory } from "vue-router";
// 还有 createWebHashHistory 和 createMemoryHistory

createRouter({
  history: createWebHistory(),
  routes: [],
});
```

在 SSR 上使用时，你需要手动传递相应的 history：

```js
// router.js
let history = isServer ? createMemoryHistory() : createWebHistory();
let router = createRouter({ routes, history });
// 在你的 server-entry.js 中的某个地方
router.push(req.url); // 请求 url
router.isReady().then(() => {
  // 处理请求
});
```

原因：为未使用的 history 启用摇树，以及为高级用例（如原生解决方案）实现自定义 history。

1.3 移动了 base 配置

现在，base 配置被作为 createWebHistory (其他 history 也一样)的第一个参数传递：

```js
import { createRouter, createWebHistory } from "vue-router";
createRouter({
  history: createWebHistory("/base-directory/"),
  routes: [],
});
```

11.4 删除了 fallback 属性

创建路由时不再支持 fallback 属性：

```js
-new VueRouter({
+createRouter({
-  fallback: false,
// other options...
})
```

原因: Vue 支持的所有浏览器都支持 HTML5 History API，因此我们不再需要使用 location.hash，而可以直接使用 history.pushState()。

11.5 删除了 \*（星标或通配符）路由

现在必须使用自定义的 regex 参数来定义所有路由(_、/_)：

```js
const routes = [
  // pathMatch 是参数的名称，例如，跳转到 /not/found 会得到
  // { params: { pathMatch: ['not', 'found'] } }
  // 这要归功于最后一个 *，意思是重复的参数，如果你
  // 打算直接使用未匹配的路径名称导航到该路径，这是必要的
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  // 如果你省略了最后的 `*`，在解析或跳转时，参数中的 `/` 字符将被编码
  { path: "/:pathMatch(.*)", name: "bad-not-found", component: NotFound },
];
// 如果使用命名路由，不好的例子：
router.resolve({
  name: "bad-not-found",
  params: { pathMatch: "not/found" },
}).href; // '/not%2Ffound'
// 好的例子:
router.resolve({
  name: "not-found",
  params: { pathMatch: ["not", "found"] },
}).href; // '/not/found'
```

11.6 将 onReady 改为 isReady

现有的 router.onReady() 函数已被 router.isReady() 取代，该函数不接受任何参数并返回一个 Promise：

```js
// 将
router.onReady(onSuccess, onError);
// 替换成
router.isReady().then(onSuccess).catch(onError);
// 或者使用 await:
try {
  await router.isReady();
  // 成功
} catch (err) {
  // 报错
}
```

11.7 scrollBehavior 的变化

scrollBehavior 中返回的对象与 ScrollToOptions 类似：x 改名为 left，y 改名为 top。

原因：使该对象类似于 ScrollToOptions，以使其感觉更像原生 JS API，并有可能启用将来的新配置。

11.8 <router-view>、<keep-alive> 和 <transition>

transition 和 keep-alive 现在必须通过 v-slot API 在 RouterView 内部使用：

```js
<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
```

11.9 删除 <router-link> 中的 append 属性

<router-link> 中的 append 属性已被删除。你可以手动将值设置到现有的 path 中：

```js
// 将
<router-link to="child-route" append>to relative child</router-link>
// 替换成
<router-link :to="append($route.path, 'child-route')">
  to relative child
</router-link>
```

你必须在 App 实例上定义一个全局的 append 函数：

```js
app.config.globalProperties.append = (path, pathToAppend) =>
  path + (path.endsWith("/") ? "" : "/") + pathToAppend;
```

原因：append 使用频率不高，用户可以很容易地实现。

11.10 删除 <router-link> 中的 event 和 tag 属性

<router-link> 中的 event 和 tag 属性都已被删除。你可以使用 v-slot API 来完全定制 <router-link>：

```js
// 将
<router-link to="/about" tag="span" event="dblclick">About Us</router-link>
// 替换成
<router-link to="/about" custom v-slot="{ navigate }">
  <span @click="navigate" @keypress.enter="navigate" role="link">About Us</span>
</router-link>
```
