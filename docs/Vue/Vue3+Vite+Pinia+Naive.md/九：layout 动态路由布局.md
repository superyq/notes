# layout 动态路由布局

## 前言

如果对 vue3 的语法不熟悉的，可以移步[Vue3.0 基础入门](https://blog.csdn.net/weixin_64684095/article/details/131459833?spm=1001.2014.3001.5502)，快速入门。

1. 系统页面结构

由 menu，面包屑，用户信息，页面标签，页面内容构建

<!-- 图片 9-1 -->

2. 创建页面

创建 src/pages/layout.vue 布局页

创建 src/pages/components/layout-menu.vue menu 组件
创建 src/pages/components/layout-crumbs.vue 面包屑 组件
创建 src/pages/components/layout-user.vue 用户信息 组件
创建 src/pages/components/layout-tag.vue 页面标签 组件
创建 src/pages/components/layout-content.vue 页面内容 组件

<!-- 图片 9-2 -->

3. 构建 src/pages/layout.vue 布局页

```html
<script setup>
  import { ref } from "vue";
  import {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
  } from "naive-ui";
  // menu
  import layoutMenu from "./components/layout-menu.vue";
  // 面包屑
  import layoutCrumbs from "./components/layout-crumbs.vue";
  // 用户信息
  import layoutUser from "./components/layout-user.vue";
  // 页面标签
  import layoutTag from "./components/layout-tag.vue";
  // 页面内容
  import layoutContent from "./components/layout-content.vue";

  // 是否展开menu
  let isOpen = ref(true);
  // n-layout-sider 折叠状态发生改变时的回调函数
  function handleChangeSider(isHide) {
    if (isHide) {
      isOpen.value = !isHide;
    }
  }
  // n-layout-sider 完成展开后的回调
  function handleEnter() {
    isOpen.value = true;
  }

  // n-layout-sider 是否显示边框
  let bordered = ref(true);
  // n-layout-sider 是否反转背景色
  let inverted = ref(false);
  // n-layout-sider 是否在自身使用原生滚动条。如果设定为 false，Sider 将会对内容使用 naive-ui 风格的滚动条
  let scrollbar = ref(false);
  // n-layout-sider 折叠宽度
  let colWidth = ref(50);
  // n-layout-sider 展开宽度
  let siderWidth = ref(155);
</script>

<template>
  <!-- layout 盒子 -->
  <n-layout has-sider class="layout-box">
    <!-- 左侧导航 -->
    <n-layout-sider
      collapse-mode="width"
      show-trigger="arrow-circle"
      :bordered="bordered"
      :inverted="inverted"
      :native-scrollbar="scrollbar"
      :collapsed-width="colWidth"
      :width="siderWidth"
      @update:collapsed="handleChangeSider"
      @after-enter="handleEnter"
    >
      <layout-menu :isOpen="isOpen" :inverted="inverted"></layout-menu>
    </n-layout-sider>
    <!-- 右侧内容 -->
    <n-layout>
      <n-layout-header :bordered="bordered">
        <div class="layout-header__box">
          <layout-crumbs></layout-crumbs>
          <layout-user></layout-user>
        </div>
        <!--  -->
        <layout-tag></layout-tag>
        <div class="layout-header__shadow"></div>
      </n-layout-header>
      <n-layout-content>
        <layout-content></layout-content>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
  .layout-box {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
  }
  .layout-header__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
    height: 50px;
    border-bottom: 1px solid rgb(239, 239, 245);
  }
  .layout-header__shadow {
    width: 100%;
    height: 2px;
    background: #d9d9d9;
  }
</style>
```

4. 构建 ssrc/pages/components/layout-menu.vue menu 组件

```html
<script setup>
  import { ref, watch, computed } from "vue";
  import { useRoute } from "vue-router";
  import { NMenu } from "naive-ui";
  import { usePermissionStore } from "@/store/permission.js";
  import { useTagStore } from "@/store/tag.js";
  import router from "@/router/index.js";

  defineProps({
    isOpen: Boolean,
    inverted: Boolean,
  });

  let route = useRoute();
  let permissionStore = usePermissionStore();
  let tagStore = useTagStore();

  let menuOptions = computed(() => {
    return permissionStore.siderMenu;
  });

  let activeMenuValue = ref("");
  watch(
    () => route.name,
    () => {
      activeMenuValue.value = route.name;
      permissionStore.activeMenuValue = route.name;
    },
    { immediate: true, deep: true }
  );

  // 新增 tag
  let obj = { title: route.meta.title, key: route.name };
  tagStore.addTag(obj);

  let handleUpdateMenu = (value, item) => {
    // 新增 tag
    let { title, key } = item;
    let obj = { title, key };
    tagStore.addTag(obj);

    router.push(`/${value}`);
    activeMenuValue.value = value;
  };
</script>

<template>
  <!-- logo -->
  <div
    class="layout-sider__logo c-center"
    :class="{ isHide: !isOpen }"
    @click="$router.push('/home')"
  >
    <svg-icon name="vite"></svg-icon>
    <!-- <img src="@/assets/images/logo.png" /> -->
    <h1 v-show="isOpen">后台管理系统</h1>
  </div>
  <!-- menu组件 -->
  <n-menu
    :inverted="inverted"
    :indent="15"
    :root-indent="15"
    :options="menuOptions"
    :value="activeMenuValue"
    @update:value="handleUpdateMenu"
  ></n-menu>
</template>

<style lang="scss" scoped>
  .layout-sider__logo {
    height: 50px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    img {
      margin-right: 5px;
      width: 25px;
      object-fit: contain;
    }
    svg {
      margin-right: 5px;
    }
  }
  .isHide {
    img {
      width: 30px;
    }
  }
</style>
```

4.1 构建 src/store/permission.js 权限状态管理

根据后端返回动态路由数据，构建导航 menu 和动态路由。

```js
import { defineStore } from "pinia";
import { h } from "vue";
import { RouterLink } from "vue-router";
// 接口获取路由 自己对接口
// import { getRouters } from "@/api/menu.js";
import SvgIcon from "@/components/SvgIcon.vue";
import { routerData } from "@/mock/datas.js";

const modules = import.meta.glob("../pages/*.vue");

//  icon 标签
let renderIcon = (name) => {
  return () => h(SvgIcon, { name }, null);
};

// 单个路由
let getRouterItem = (item) => {
  let { name, path, meta, component } = item;
  let obj = {
    path,
    name,
    meta,
    component: modules[`../pages/${component}`],
  };
  return obj;
};

// 获取异步路由
// 所有异步路由都是layout的子路由，并且routers只有一层children，没有考虑很复杂的情况。
// 将所有异步路由都存放在rmenu数组中，返回。
let getAayncRouter = (routers) => {
  let rmenu = [];
  routers.forEach((item) => {
    if (item.children && item.children.length) {
      item.children.map((_item) => {
        let obj = getRouterItem(_item);
        obj.meta.parentTitle = item.meta.title;
        rmenu.push(obj);
      });
    } else {
      rmenu.push(getRouterItem(item));
    }
  });
  return rmenu;
};

// 获取侧边栏导航
let getSiderMenu = (routers) => {
  let smenu = [];

  routers.forEach((item) => {
    let children = [];
    let obj = {};

    if (item.children && item.children.length) {
      // 二级 menu
      item.children.map((_item) => {
        if (!_item.hidden) {
          children.push({
            label: () =>
              h(
                RouterLink,
                { to: _item.path },
                { default: () => _item.meta.title }
              ),
            title: _item.meta.title,
            key: _item.name,
            icon: renderIcon(_item.meta.icon),
          });
        }
      });

      obj = {
        label: item.meta.title,
        title: item.meta.title,
        key: item.name,
        icon: renderIcon(item.meta.icon),
        children,
      };
    } else {
      // 一级 menu
      obj = {
        label: () =>
          h(RouterLink, { to: item.path }, { default: () => item.meta.title }),
        title: item.meta.title,
        key: item.name,
        icon: renderIcon(item.meta.icon),
      };
    }

    smenu.push(obj);
  });
  return smenu;
};

export const usePermissionStore = defineStore({
  id: "permissionStore",
  state: () => {
    return {
      siderMenu: [],
      activeMenuValue: "",
    };
  },
  actions: {
    getRouters() {
      return new Promise((resolve, reject) => {
        this.siderMenu = getSiderMenu(routerData);
        resolve(getAayncRouter(routerData));
        // getRouters()
        //   .then(({ data }) => {
        //     this.siderMenu = getSiderMenu(data);
        //     resolve(data);
        //   })
        //   .catch((err) => {
        //     reject(err);
        //   });
      });
    },
  },
});
```

4.1.1 构建 src/mock/datas.js 虚拟路由数据

模仿后端返回动态路由数据结构

```js
export const routerData = [
  {
    name: "home",
    path: "/home",
    hidden: false,
    component: "home.vue",
    meta: {
      title: "首页",
      icon: "home",
    },
    children: null,
  },
  {
    name: "system",
    path: "/system",
    hidden: false,
    component: null,
    meta: {
      title: "系统管理",
      icon: "system",
    },
    children: [
      {
        name: "system-menu",
        path: "/system-menu",
        hidden: false,
        component: "system-menu.vue",
        meta: {
          title: "系统菜单",
          icon: "system-menu",
        },
        children: null,
      },
      {
        name: "system-dict",
        path: "/system-dict",
        hidden: false,
        component: "system-dict.vue",
        meta: {
          title: "系统字典",
          icon: "system-dict",
        },
        children: null,
      },
    ],
  },
  {
    name: "user",
    path: "/user",
    hidden: false,
    component: null,
    meta: {
      title: "用户管理",
      icon: "user",
    },
    children: [
      {
        name: "user-user",
        path: "/user-user",
        hidden: false,
        component: "user-user.vue",
        meta: {
          title: "用户管理",
          icon: "user-user",
        },
        children: null,
      },
      {
        name: "user-role",
        path: "/user-role",
        hidden: false,
        component: "user-role.vue",
        meta: {
          title: "角色管理",
          icon: "user-role",
        },
        children: null,
      },
    ],
  },
];
```

4.1.2 新增 src/assets/svg 路由图标

<!-- 图片 9-4 -->

4.2 构建 src/store/tag.js 页面标签状态管理

点击左侧导航路由，页面标签变化

```js
import { defineStore } from "pinia";

export const useTagStore = defineStore({
  id: "tag",
  state: () => {
    return {
      tags: [{ title: "首页", key: "home" }],
      activeTagIndex: 0,
    };
  },
  getters: {
    tagsKey(state) {
      let arr = [];
      state.tags.map((tag) => {
        arr.push(tag.key);
      });
      return arr;
    },
  },
  actions: {
    addTag(tag) {
      if (!this.tagsKey.includes(tag.key)) {
        this.tags.push(tag);
      }
    },
    removeTag(key) {
      let index = this.tagsKey.indexOf(key);
      this.tags.splice(index, 1);
      this.activeTagIndex = index - 1;
    },
  },
});
```

4.3 完善 src/router/index.js 路由

路由监听动态加载路由

```js
import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import baseRouters from "./baseRouter.js";
import { getToken } from "@/utils/cookie.js";
import { useUserStore } from "@/store/user.js";
import { usePermissionStore } from "@/store/permission.js";

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
  let userStore = useUserStore();
  let permissionStore = usePermissionStore();

  // 判断是否登录
  if (!!getToken()) {
    // 已登录，跳转登录页，转跳首页
    if (to.path === "/login") {
      next("");
      NProgress.done();
    } else {
      if (userStore.roles.length === 0) {
        userStore
          .getInfo()
          .then((res) => {
            // 获取动态路由
            permissionStore.getRouters().then((_res) => {
              let resetRouters = {
                path: "/layout",
                name: "layout",
                component: () => import("@/pages/layout.vue"),
                children: _res,
              };
              router.addRoute(resetRouters);

              // 这句代码，重要！重要！重要！
              // 来确保addRoute()时动态添加的路由已经被完全加载上去。没有这句，动态路由加载后无效
              next({ ...to, replace: true });
            });
          })
          .catch((err) => {
            window.$msg.error(err);
            userStore.logout().then(() => {
              next({ name: "login" });
            });
          });
      } else {
        next();
      }
    }
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

5. 构建 src/pages/components/layout-crumbs.vue 面包屑组件

```html
<script setup>
  import { watch, ref } from "vue";
  import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";
  import { useRoute } from "vue-router";

  let route = useRoute();

  // 判断是二级目录
  let getCrumList = (nowRoute) => {
    let arr = [nowRoute.meta.title];
    !!nowRoute.meta.parentTitle && arr.unshift(nowRoute.meta.parentTitle);
    return arr;
  };

  let crumbList = ref([]);
  // 监听路由，获取crumlist
  watch(
    () => route,
    (newRoute) => {
      crumbList.value = getCrumList(newRoute);
    },
    { immediate: true, deep: true }
  );
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      class="layout-crumbs-item"
      v-for="(item, index) in crumbList"
      :key="index"
      >{{ item }}</n-breadcrumb-item
    >
  </n-breadcrumb>
</template>

<style lang="scss" scoped>
  .layout-crumbs-item {
    font-size: 16px;
  }
</style>
```

6. 构建 src/pages/components/layout-user.vue 用户信息 组件

```html
<script setup>
  import { reactive, h, computed } from "vue";
  import { useDialog, NDropdown, NButton } from "naive-ui";
  import { useUserStore } from "@/store/user.js";
  import { useTagStore } from "@/store/tag.js";
  import router from "@/router/index.js";

  let userStore = useUserStore();
  let tagStore = useTagStore();

  // 登录才获取用户信息
  userStore.getInfo();
  // 获取 用户信息
  let avatar = computed(() => {
    if (!!userStore.user?.avatar) {
      return userStore.user.avatar;
    } else {
      return "";
    }
  });
  let userName = computed(() => {
    if (!!userStore.user?.userName) {
      return userStore.user.userName;
    } else {
      return "";
    }
  });

  // 下拉选项
  let baseOptions = reactive([
    {
      label: "个人信息",
      key: "userinfo",
    },
    {
      label: "修改密码",
      key: "editpassword",
    },
    {
      label: "退出系统",
      key: "logout",
    },
  ]);

  // 选择操作
  let dialog = useDialog();
  // 确认登出
  let submitLogout = () => {
    userStore.logout().then(() => {
      router.push("/home");
      dialog.destroyAll();
      window.location.reload();
    });
  };
  // 取消登出
  let cancelLogOut = () => {
    dialog.destroyAll();
  };
  let handleSelect = (key, item) => {
    if (["userinfo", "editpassword"].includes(key)) {
      // 新增 tag
      let obj = { title: item.label, key };
      tagStore.addTag(obj);

      router.push(`/${key}`);
    } else {
      dialog.warning({
        closable: false,
        showIcon: false,
        style: {
          width: "20%",
        },
        title: () => {
          return h(
            "div",
            {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                textAlign: "center",
                height: "40px",
                lineHeight: "40px",
                background: "#cee6f0",
                color: "#1d69a3",
                fontWeight: "bold",
                fontSize: "16px",
              },
            },
            "退出登录"
          );
        },
        content: () => {
          return h(
            "p",
            {
              style: {
                textAlign: "center",
                height: "80px",
                lineHeight: "108px",
                color: "#000",
                fontSize: "14px",
                fontWeight: "bolder",
                userSelect: "none",
              },
            },
            "是否退出当前账号？"
          );
        },
        action: () => {
          return h(
            "div",
            {
              style: {
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              },
            },
            [
              h(
                NButton,
                {
                  onClick: cancelLogOut,
                  style: {
                    width: "40%",
                  },
                },
                {
                  default: () => "取消",
                }
              ),
              h(
                NButton,
                {
                  onClick: submitLogout,
                  type: "info",
                  style: {
                    width: "40%",
                  },
                },
                {
                  default: () => "退出",
                }
              ),
            ]
          );
        },
      });
    }
  };
</script>

<template>
  <n-dropdown
    trigger="click"
    :options="baseOptions"
    @select="handleSelect"
    size="small"
  >
    <div class="header-right_user-box">
      <div class="header-right_user-avatar">
        <img v-if="avatar" class="header-right_avatar" :src="avatar" />
        <svg-icon v-else name="avatar" width="35" height="35"></svg-icon>
      </div>
      <div class="header-right_user-name">
        <span>{{ userName }}</span>
        <svg-icon name="down" width="10"></svg-icon>
      </div>
    </div>
  </n-dropdown>
</template>

<style lang="scss" scoped>
  .header-right_user-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
  .header-right_user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .header-right_user-name {
    span {
      margin: 0 5px;
    }
  }
</style>
```

7. 构建 src/pages/components/layout-tag.vue 页面标签 组件

```html
<script setup>
  import { computed } from "vue";
  import { NTag } from "naive-ui";
  import { useTagStore } from "@/store/tag.js";
  import { usePermissionStore } from "@/store/permission.js";
  import router from "@/router/index.js";

  let tagStore = useTagStore();
  let permissionStore = usePermissionStore();

  let tags = computed(() => {
    return tagStore.tags;
  });

  function handleClose(key) {
    tagStore.removeTag(key);

    if (permissionStore.activeMenuValue == key) {
      permissionStore.activeMenuValue = tags.value[tagStore.activeTagIndex].key;
      router.push(`/${permissionStore.activeMenuValue}`);
    }
  }
  function handleCheck(item) {
    let { key } = item;
    permissionStore.activeMenuValue = key;
    router.push(`/${key}`);
  }
</script>

<template>
  <div class="layout-header__tag">
    <n-tag
      v-for="item in tags"
      :key="item.key"
      class="tag-item"
      :closable="item.key !== 'home'"
      :type="item.key == permissionStore.activeMenuValue ? 'success' : ''"
      size="small"
      @close="handleClose(item.key)"
      @click="handleCheck(item)"
      >{{ item.title }}</n-tag
    >
  </div>
</template>

<style lang="scss" scoped>
  .layout-header__tag {
    padding-left: 10px;
    display: flex;
    align-items: center;
    height: 30px;
  }
  .tag-item {
    margin-right: 5px;
    cursor: pointer;
  }
</style>
```

8. 构建 src/pages/components/layout-content.vue 页面内容 组件

```html
<script setup></script>

<template>
  <div class="layout-content">
    <router-view v-slot="{ Component, route }">
      <transition name="mainFade" mode="out-in">
        <component :is="Component" :key="route.path"></component>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
  .layout-content {
    padding: 20px;
    margin: 20px;
    // height: auto;
    height: calc(100vh - 170px);
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.047) 0 0 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.047);
  }
  .mainFade-enter-from {
    transform: translate(-80px);
    opacity: 0;
  }

  .mainFade-leave-to {
    transform: translate(80px);
    opacity: 0;
  }

  .mainFade-leave-from,
  .mainFade-enter-to {
    transform: translate(0px);
    opacity: 1;
  }

  .mainFade-enter-active {
    transition: all 0.1s ease;
  }

  .mainFade-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.6, 0.6, 1);
  }
</style>
```

9. 创建如下内容页

src/pages/404.vue
src/pages/demo.vue
src/pages/eidtpassword.vue
src/pages/userinfo.vue
src/pages/system-dict.vue
src/pages/system-menu.vue
src/pages/user-user.vue
src/pages/user-role.vue

<!-- 图片 9-3 -->

页面基础构建如 demo.vue

```html
<script setup></script>

<template>
  <div class="demo">demo</div>
</template>

<style lang="scss" scoped></style>
```
