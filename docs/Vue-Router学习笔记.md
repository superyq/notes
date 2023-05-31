<h1 align="center">vue-router</h1>

vue-router 版本为4的是为vue3准备的
如果是vue2 安装版本为vue-router@3

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

export default router;

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

## 路由组件传参

```js
const User = {
  // 请确保添加一个与路由参数完全相同的 prop 名
  props: ["id"],
  template: "<div>User {{ id }}</div>",
};
const routes = [{ path: "/user/:id", component: User, props: true }];

// 有命名视图得路由
const routes = [
  {
    path: "/user/:id",
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false },
  },
];
```

## 导航守卫

```js
const router = createRouter({ ... })
router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

```js
// false: 取消当前的导航。
// 一个路由地址: 通过一个路由地址跳转到一个不同的地址。
// 如果什么都没有，undefined 或返回 true，则导航是有效的
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

```js
// 全局解析守卫, 确保用户可以访问自定义 meta 属性
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

```js
// 全局后置钩子,它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath);
});
```

## 路由元信息

```js
// 有时，你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等,并且它可以在路由地址和导航守卫上都被访问到
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // 只有经过身份验证的用户才能创建帖子
        meta: { requiresAuth: true }
      },
      {
        path: ':id',
        component: PostsDetail
        // 任何人都可以阅读文章
        meta: { requiresAuth: false }
      }
    ]
  }
]

router.beforeEach((to, from) => {
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    }
  }
})
```

## 过渡效果

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
  <!-- 使用任何自定义过渡和回退到 `fade` -->
  <transition :name="route.meta.transition || 'fade'">
    <component :is="Component" />
  </transition>
</router-view>
```

```css
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-left-enter-active {
  transition: all 0.3s ease-out;
}

.slide-left-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* 动画 */
.slide-left-enter-active {
  animation: bounce-in 0.5s;
}
.slide-left-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

## 滚动行为

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

// 你也可以通过 el 传递一个 CSS 选择器或一个 DOM 元素。在这种情况下，top 和 left 将被视为该元素的相对偏移量。
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 始终在元素 #main 上方滚动 10px
    return {
      // 也可以这么写
      // el: document.getElementById('main'),
      el: '#main',
      top: -10,
    }
  },
})

// 如果你的浏览器支持滚动行为，你可以让它变得更流畅
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  }
})
```
