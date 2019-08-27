<h1 align='center'>[vue-router 学习笔记](https://router.vuejs.org/zh/installation.html)</h1>

## 1. 安装

- **NPM**

```
npm install vue-router
```

如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：

```
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

## 2. **基础**

### 2.1 起步

通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由：

```
export default {
  computed: {
    username () {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
```

### 2.2 动态路由匹配

一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.\$route.params

```
{ path: '/user/:id', component: User }
```

你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 \$route.params 中。例如：

```
{ path: '/user/:username/post/:post_id', component: User }

// 例子

匹配路径: /user/evan/post/123

$route.params的值：{ username: 'evan', post_id: '123' }
```

使用路由参数时，**组件实例会被复用。这也意味着组件的生命周期钩子不会再被调用。**

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) \$route 对象：

```
watch: {
  '$route' (to, from) {
    console.log(to.params);
  }
}
```

或者使用 2.2 中引入的 beforeRouteUpdate 导航守卫：

```
beforeRouteUpdate (to, from, next) {
  console.log(to.params);
}
```

### 2.3 通配符 \*

如果想匹配任意路径，我们可以使用通配符 (\*)：

```
{
  // 会匹配所有路径
  path: '*'
},
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

当使用一个通配符时，\$route.params 内会自动添加一个名为 pathMatch 参数。它包含了 URL 通过通配符被匹配的部分：

```
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```

### 2.4 嵌套路由

需要在 VueRouter 的参数中使用 children 配置：

```
{
  path: '/user/:id', component: User,
  children: [
    {
      // 当 /user/:id 匹配成功，
      // UserHome 会被渲染在 User 的 <router-view> 中
      path: '',
      component: UserHome
    },
    {
      // 当 /user/:id/profile 匹配成功，
      // UserProfile 会被渲染在 User 的 <router-view> 中
      path: 'profile',
      component: UserProfile
    },
    {
      // 当 /user/:id/posts 匹配成功
      // UserPosts 会被渲染在 User 的 <router-view> 中
      path: 'posts',
      component: UserPosts
    }
  ]
}
```

### 2.5 编程式导航

使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL 该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

注意：如果提供了 path，params 会被忽略

```
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

router.replace：跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录

router.go(n)：这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。

```
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

### 2.6 命名路由

```
{
  path: '/user/:userId',
  name: 'user',
  component: User
}
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
router.push({ name: 'user', params: { userId: 123 }})
```

### 2.7 命名视图

如果 router-view 没有设置名字，那么默认为 default

```
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：

```
{
  path: '/',
  components: {
    default: Foo,
    a: Bar,
    b: Baz
  }
}
```

### 2.8 重定向和别名

- 重定向 redirect

```
{ path: '/a', redirect: '/b' }
{ path: '/a', redirect: { name: 'foo' }}
```

- 别名 alias

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。

```
  { path: '/a', component: A, alias: '/b' }
```

## 3. 进阶

### 3.1 导航守卫

1. 全局前置守卫

```
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

每个守卫方法接收三个参数：

- to: Route: 即将要进入的目标 路由对象

- from: Route: 当前导航正要离开的路由

- next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

- next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。

- next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

- next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

- next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

确保要调用 next 方法，否则钩子就不会被 resolved。

2. 路由独享的守卫

```
{
  path: '/foo',
  component: Foo,
  beforeEnter: (to, from, next) => {
    // ...
  }
}
```

3. 组件内路由

```
beforeRouteEnter (to, from, next) {
  // 在渲染该组件的对应路由被 confirm 前调用
  // 不！能！获取组件实例 `this`
  // 因为当守卫执行前，组件实例还没被创建
},
beforeRouteUpdate (to, from, next) {
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 可以访问组件实例 `this`
},
beforeRouteLeave (to, from, next) {
  // 导航离开该组件的对应路由时调用
  // 可以访问组件实例 `this`
}
```

### 3.2 路由元信息

定义路由的时候可以配置 meta 字段

```
{
  path: 'bar',
  component: Bar,
  // a meta field
  meta: { requiresAuth: true }
}
```

一个路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组。因此，我们需要遍历 \$route.matched 来检查路由记录中的 meta 字段。

```
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

### 3.3 过度动效

```
<transition name='fade'>
  <router-view></router-view>
</transition>
```

### 3.4 滚动行为

当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：

```
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```

### 3.5 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

```
{ path: '/user', component: () => import('@/views/user') }
```
