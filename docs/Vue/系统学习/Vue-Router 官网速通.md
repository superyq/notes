# Vue-Router 官网速通

前言：参考[Vue Router](https://router.vuejs.org/zh/introduction.html)

一：介绍

1. 什么是 Vue Router

Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。功能包括：

嵌套路由映射
动态路由选择
模块化、基于组件的路由配置
路由参数、查询、通配符
展示由 Vue.js 的过渡系统提供的过渡效果
细致的导航控制
自动激活 CSS 类的链接
HTML5 history 模式或 hash 模式
可定制的滚动行为
URL 的正确编码

2. 安装

2.1 直接下载 / CDN

https://unpkg.com/vue-router@4

Unpkg.com 提供了基于 npm 的 CDN 链接。上述链接将始终指向 npm 上的最新版本。 你也可以通过像 https://unpkg.com/vue-router@4.0.15/dist/vue-router.global.js 这样的 URL 来使用特定的版本或 Tag。

这将把 Vue Router 暴露在一个全局的 VueRouter 对象上，例如 VueRouter.createRouter(...)。

2.2 包管理器

对于一个现有的使用 JavaScript 包管理器的项目，你可以从 npm registry 中安装 Vue Router：

```sh
npm install vue-router@4
# or
yarn add vue-router@4
# or
pnpm add vue-router@4
```

如果你打算启动一个新项目，你可能会发现使用 create-vue 这个脚手架工具更容易，它能创建一个基于 Vite 的项目，并包含加入 Vue Router 的选项：

```sh
npm create vue@latest
# or
yarn create vue
# or
pnpm create vue
```

你需要回答一些关于你想创建的项目类型的问题。如果您选择安装 Vue Router，示例应用还将演示 Vue Router 的一些核心特性。使用包管理器的项目通常会使用 ES 模块来访问 Vue Router，例如 import { createRouter } from 'vue-router'。

二：基础

1. 入门

用 Vue + Vue Router 创建单页应用非常简单：通过 Vue.js，我们已经用组件组成了我们的应用。当加入 Vue Router 时，我们需要做的就是将我们的组件映射到路由上，让 Vue Router 知道在哪里渲染它们。下面是一个基本的例子：

1.1 HTML

```html
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
```

1.1.1 router-link

请注意，我们没有使用常规的 a 标签，而是使用一个自定义组件 router-link 来创建链接。这使得 Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。我们将在后面看到如何从这些功能中获益。

1.1.2 router-view

router-view 将显示与 URL 对应的组件。你可以把它放在任何地方，以适应你的布局。

1.2 JavaScript

```js
// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
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

// 现在，应用已经启动了！
```

通过调用 app.use(router)，我们会触发第一次导航且可以在任意组件中以 this.$router 的形式访问它，并且以 this.$route 的形式访问当前路由：

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

要在 setup 函数中访问路由，请调用 useRouter 或 useRoute 函数。

在整个文档中，我们会经常使用 router 实例，请记住，this.$router 与直接使用通过 createRouter 创建的 router 实例完全相同。我们使用 this.$router 的原因是，我们不想在每个需要操作路由的组件中都导入路由。

2. 动态路由匹配

很多时候，我们需要将给定匹配模式的路由映射到同一个组件。例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数 ：

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

现在像 /users/johnny 和 /users/jolyne 这样的 URL 都会映射到同一个路由。

路径参数 用冒号 : 表示。当一个路由被匹配时，它的 params 的值将在每个组件中以 this.$route.params 的形式暴露出来。因此，我们可以通过更新 User 的模板来呈现当前的用户 ID：

```js
const User = {
  template: "<div>User {{ $route.params.id }}</div>",
};
```

你可以在同一个路由中设置有多个 路径参数，它们会映射到 $route.params 上的相应字段。例如：

匹配模式：/users/:username、/users/:username/posts/:postId
匹配路径：/users/eduardo、/users/eduardo/posts/123
$route.params：{ username: 'eduardo' }、{ username: 'eduardo', postId: '123' }

除了 $route.params 之外，$route 对象还公开了其他有用的信息，如 $route.query（如果 URL 中存在参数）、$route.hash 等。

2.1 响应路由参数的变化

使用带有参数的路由时需要注意的是，当用户从 /users/johnny 导航到 /users/jolyne 时，相同的组件实例将被重复使用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会被调用。

要对同一个组件中参数的变化做出响应的话，你可以简单地 watch $route 对象上的任意属性，在这个场景中，就是 $route.params ：

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

或者，使用 beforeRouteUpdate 导航守卫，它也可以取消导航：

```js
const User = {
  template: "...",
  async beforeRouteUpdate(to, from) {
    // 对路由变化做出响应...
    this.userData = await fetchUser(to.params.id);
  },
};
```

2.2 捕获所有路由或 404 Not found 路由

常规参数只匹配 url 片段之间的字符，用 / 分隔。如果我们想匹配任意路径，我们可以使用自定义的 路径参数 正则表达式，在 路径参数 后面的括号中加入 正则表达式 :

```js
const routes = [
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
  { path: "/user-:afterUser(.*)", component: UserGeneric },
];
```

在这个特定的场景中，我们在括号之间使用了自定义正则表达式，并将 pathMatch 参数标记为可选可重复。这样做是为了让我们在需要的时候，可以通过将 path 拆分成一个数组，直接导航到路由：

```js
this.$router.push({
  name: "NotFound",
  // 保留当前路径并删除第一个字符，以避免目标 URL 以 `//` 开头。
  params: { pathMatch: this.$route.path.substring(1).split("/") },
  // 保留现有的查询和 hash 值，如果有的话
  query: this.$route.query,
  hash: this.$route.hash,
});
```

2.3 高级匹配模式

Vue Router 使用自己的路径匹配语法，其灵感来自于 express，因此它支持许多高级匹配模式，如可选的参数，零或多个 / 一个或多个，甚至自定义的正则匹配规则。

3. 路由的匹配语法

大多数应用都会使用 /about 这样的静态路由和 /users/:userId 这样的动态路由，就像我们刚才在动态路由匹配中看到的那样，但是 Vue Router 可以提供更多的方式！

3.1 在参数中自定义正则

当定义像 :userId 这样的参数时，我们内部使用以下的正则 ([^/]+) (至少一个不是斜杠 / 的字符)来从 URL 中提取参数。这很好用，除非你需要根据参数的内容来区分两个路由。想象一下，两个路由 /:orderId 和 /:productName，两者会匹配完全相同的 URL，所以我们需要一种方法来区分它们。最简单的方法就是在路径中添加一个静态部分来区分它们：

```js
const routes = [
  // 匹配 /o/3549
  { path: "/o/:orderId" },
  // 匹配 /p/books
  { path: "/p/:productName" },
];
```

但在某些情况下，我们并不想添加静态的 /o /p 部分。由于，orderId 总是一个数字，而 productName 可以是任何东西，所以我们可以在括号中为参数指定一个自定义的正则：

```js
const routes = [
  // /:orderId -> 仅匹配数字
  { path: "/:orderId(\\d+)" },
  // /:productName -> 匹配其他任何内容
  { path: "/:productName" },
];
```

现在，转到 /25 将匹配 /:orderId，其他情况将会匹配 /:productName。routes 数组的顺序并不重要!

TIP：确保转义反斜杠( \ )，就像我们对 \d (变成\\d)所做的那样，在 JavaScript 中实际传递字符串中的反斜杠字符。

3.2 可重复的参数

如果你需要匹配具有多个部分的路由，如 /first/second/third，你应该用 \*（0 个或多个）和 +（1 个或多个）将参数标记为可重复：

```js
const routes = [
  // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
  { path: "/:chapters+" },
  // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
  { path: "/:chapters*" },
];
```

这将为你提供一个参数数组，而不是一个字符串，并且在使用命名路由时也需要你传递一个数组：

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

这些也可以通过在右括号后添加它们与自定义正则结合使用：

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

默认情况下，所有路由是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由。例如，路由 /users 将匹配 /users、/users/、甚至 /Users/。这种行为可以通过 strict 和 sensitive 选项来修改，它们既可以应用在整个全局路由上，又可以应用于当前路由上：

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 将匹配 /users/posva 而非：
    // - /users/posva/ 当 strict: true
    // - /Users/posva 当 sensitive: true
    { path: "/users/:id", sensitive: true },
    // 将匹配 /users, /Users, 以及 /users/42 而非 /users/ 或 /users/42/
    { path: "/users/:id?" },
  ],
  strict: true, // applies to all routes
});
```

3.4 可选参数

你也可以通过使用 ? 修饰符(0 个或 1 个)将一个参数标记为可选：

```js
const routes = [
  // 匹配 /users 和 /users/posva
  { path: "/users/:userId?" },
  // 匹配 /users 和 /users/42
  { path: "/users/:userId(\\d+)?" },
];
```

请注意，\* 在技术上也标志着一个参数是可选的，但 ? 参数不能重复。

4. 嵌套路由

一些应用程序的 UI 由多层嵌套的组件组成。在这种情况下，URL 的片段通常对应于特定的嵌套组件结构，例如：

```
/user/johnny/profile                     /user/johnny/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

通过 Vue Router，你可以使用嵌套路由配置来表达这种关系。

接着上节创建的 app ：

```html
<div id="app">
  <router-view></router-view>
</div>
```

```js
const User = {
  template: "<div>User {{ $route.params.id }}</div>",
};

// 这些都会传递给 `createRouter`
const routes = [{ path: "/user/:id", component: User }];
```

这里的 <router-view> 是一个顶层的 router-view。它渲染顶层路由匹配的组件。同样地，一个被渲染的组件也可以包含自己嵌套的 <router-view>。例如，如果我们在 User 组件的模板内添加一个 <router-view>：

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

要将组件渲染到这个嵌套的 router-view 中，我们需要在路由中配置 children：

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

注意，以 / 开头的嵌套路径将被视为根路径。这允许你利用组件嵌套，而不必使用嵌套的 URL。

如你所见，children 配置只是另一个路由数组，就像 routes 本身一样。因此，你可以根据自己的需要，不断地嵌套视图。

此时，按照上面的配置，当你访问 /user/eduardo 时，在 User 的 router-view 里面什么都不会呈现，因为没有匹配到嵌套路由。也许你确实想在那里渲染一些东西。在这种情况下，你可以提供一个空的嵌套路径：

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

4.1 嵌套的命名路由

在处理命名路由时，你通常会给子路由命名：

```js
const routes = [
  {
    path: "/user/:id",
    component: User,
    // 请注意，只有子路由具有名称
    children: [{ path: "", name: "user", component: UserHome }],
  },
];
```

这将确保导航到 /user/:id 时始终显示嵌套路由。

在一些场景中，你可能希望导航到命名路由而不导航到嵌套路由。例如，你想导航 /user/:id 而不显示嵌套路由。那样的话，你还可以命名父路由，但请注意重新加载页面将始终显示嵌套的子路由，因为它被视为指向路径/users/:id 的导航，而不是命名路由：

```js
const routes = [
  {
    path: "/user/:id",
    name: "user-parent",
    component: User,
    children: [{ path: "", name: "user", component: UserHome }],
  },
];
```

5. 编程式导航

除了使用 <router-link> 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

5.1 导航到不同位置

想要导航到不同的 URL，可以使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，会回到之前的 URL。

当你点击 <router-link> 时，内部会调用这个方法，所以点击 <router-link :to="..."> 相当于调用 router.push(...) ：

声明式：<router-link :to="..."> 编程式：router.push(...)

```js
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
```

注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path ：

```js
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

当指定 params 时，可提供 string 或 number 参数（或者对于可重复的参数可提供一个数组）。任何其他类型（如对象、布尔等）都将被自动字符串化。对于可选参数，你可以提供一个空字符串（""）或 null 来移除它。

由于属性 to 与 router.push 接受的对象种类相同，所以两者的规则完全相同。

router.push 和所有其他导航方法都会返回一个 Promise，让我们可以等到导航完成后才知道是成功还是失败。

5.2 替换当前位置

它的作用类似于 router.push，唯一不同的是，它在导航时不会向 history 添加新记录，正如它的名字所暗示的那样——它取代了当前的条目。

声明式：<router-link :to="..." replace>
编程式：router.replace(...)

也可以直接在传递给 router.push 的 to 参数中增加一个属性 replace: true ：

```js
router.push({ path: "/home", replace: true });
// 相当于
router.replace({ path: "/home" });
```

5.3 横跨历史

该方法采用一个整数作为参数，表示在历史堆栈中前进或后退多少步，类似于 window.history.go(n)。

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

5.4 篡改历史

你可能已经注意到，router.push、router.replace 和 router.go 是 window.history.pushState、window.history.replaceState 和 window.history.go 的翻版，它们确实模仿了 window.history 的 API。

因此，如果你已经熟悉 Browser History APIs，在使用 Vue Router 时，操作历史记录就会觉得很熟悉。

值得一提的是，无论在创建路由器实例时传递什么 history 配置，Vue Router 的导航方法 (push、replace、go) 都能始终正常工作。

6. 命名路由

除了 path 之外，你还可以为任何路由提供 name。这有以下优点：

没有硬编码的 URL
params 的自动编码/解码。
防止你在 url 中出现打字错误。
绕过路径排序（如显示一个）

```js
const routes = [
  {
    path: "/user/:username",
    name: "user",
    component: User,
  },
];
```

要链接到一个命名的路由，可以向 router-link 组件的 to 属性传递一个对象：

```html
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>
```

这跟代码调用 router.push() 是一回事：

```js
router.push({ name: "user", params: { username: "erina" } });
```

在这两种情况下，路由将导航到路径 /user/erina。

7. 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。

```html
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：

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

7.1 嵌套命名视图

我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 router-view 组件。我们以一个设置面板为例：

```
/settings/emails                                       /settings/profile
+-----------------------------------+                  +------------------------------+
| UserSettings                      |                  | UserSettings                 |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
| |     +-------------------------+ |                  | |     +--------------------+ |
| |     |                         | |                  | |     | UserProfilePreview | |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
+-----------------------------------+                  +------------------------------+
```

Nav 只是一个常规组件。
UserSettings 是一个视图组件。
UserEmailsSubscriptions、UserProfile、UserProfilePreview 是嵌套的视图组件。

注意：我们先忘记 HTML/CSS 具体的布局的样子，只专注在用到的组件上。

UserSettings 组件的 <template> 部分应该是类似下面的这段代码:

```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar />
  <router-view />
  <router-view name="helper" />
</div>
```

那么你就可以通过这个路由配置来实现上面的布局：

```js
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

8. 重定向和别名

8.1 重定向

重定向也是通过 routes 配置来完成，下面例子是从 /home 重定向到 /：

```js
const routes = [{ path: "/home", redirect: "/" }];
```

重定向的目标也可以是一个命名的路由：

```js
const routes = [{ path: "/home", redirect: { name: "homepage" } }];
```

甚至是一个方法，动态返回重定向目标：

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

请注意，导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。在上面的例子中，在 /home 路由中添加 beforeEnter 守卫不会有任何效果。

在写 redirect 的时候，可以省略 component 配置，因为它从来没有被直接访问过，所以没有组件要渲染。唯一的例外是嵌套路由：如果一个路由记录有 children 和 redirect 属性，它也应该有 component 属性。

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

9. 路由组件传参

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
