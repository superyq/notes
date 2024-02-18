# Pinia 官网速通

前言：参考 [Pinia 中文文档](https://pinia.web3doc.top/introduction.html)，在 Vue3 配合 ts 中的使用。

一：介绍

1. 什么是 Pinia

Pinia 是 Vue 的存储库，允许跨组件/页面共享状态。

1.1. 为什么要使用 Pinia？

热模块更换、保持任何现有状态、使用插件扩展 Pinia 功能、TS 支持、服务端渲染支持。

1.2. 与 Vuex 的比较

Pinia 提供更简单的 API，具有更少的规范，mutations 不再存在。提供了 Composition-API 风格的 API，与 TS 使用时有可靠的类型推断支持。

2. 开始

2.1 安装

```sh
yarn add pinia
# or
npm install pinia
```

在 main.ts 中注册 pinia：

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(createPinia() as any);

app.mount("#app");
```

2.2 什么是 Store

托管全局状态。每个组件都可以读取和写入。它有三个概念，state、getters 和 actions 等同于组件中的“数据”、“计算”和“方法”。

2.3 什么时候使用 Store

需要保存跨组件使用的相同状态。例如导航栏中显示的用户信息。

二. 核心概念

1. 定义一个 Store

使用 defineStore() 定义的，需要一个唯一名称，作为第一个参数传递，将返回的函数命名为 use...：

```js
// @/store/demo.ts
import { defineStore } from "pinia";

export const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      name: "yq",
      age: 18,
      loves: ["book"],
    };
  },
  actions: {
    changeName() {
      this.name = "yqcoder";
    },
  },
});
```

1.1 使用 store

在组件中使用 useDemoStore 创建实例，在实例上可以直接访问 state，getter，actions 定义的属性：

```html
<script setup lang="ts">
  import { useDemoStore } from "@/store/demo.ts";

  const demoStore = useDemoStore();
  console.log(demoStore.name); // 'yq'

  const handleChange = () => {
    demoStore.changeName();
    console.log(demoStore.name); // 'yqcoder'
  };
</script>

<template>
  <div>{{ demoStore.name }}</div>
  <div @click="handleChange">change name</div>
</template>

<style lang="scss" scoped></style>
```

store 是用 reavtive 包裹的对象，可以不用.value，但也不能解构：

```html
<script setup lang="ts">
  import { useDemoStore } from "@/store/demo.ts";

  // 非响应性的
  const { name, changeName } = useDemoStore();
  console.log(name); // 'yq'

  const handleChange = () => {
    changeName();
    console.log(name); // 'yq'
  };
</script>

<template>
  <div>{{ name }}</div>
  <div @click="handleChange">change name</div>
</template>

<style lang="scss" scoped></style>
```

使用 storeToRefs() 使解构的状态变响应：

```html
<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useDemoStore } from "@/store/demo.ts";

  const demoStore = useDemoStore();
  const { name } = storeToRefs(demoStore);
  console.log(name); // yq
  const handleChange = () => {
    demoStore.changeName();
    console.log(name); // yqcoder
  };
</script>

<template>
  <div>{{ name }}</div>
  <div @click="handleChange">change name</div>
</template>

<style lang="scss" scoped></style>
```

2. State

state 是 store 的核心部分。

```ts
import { defineStore } from "pinia";

const useStore = defineStore("storeId", {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
      name: "Eduardo",
      isAdmin: true,
    };
  },
});
```

2.1 访问 “state”

可以通过 store 实例直接访问和修改状态：

```ts
const { useDemoStore } from "@/store/demo.ts";
const demoStore = useDemoStore();

demoStore.name = 'yqcoder';
```

2.2 重置状态

使用 $reset() 方法将状态重置为初始值：

```ts
import { useDemoStore } from "@/store/demo.ts";

const demoStore = useDemoStore();
demoStore.$reset();
```

2.3 改变状态

使用 $patch 方法，可以同时修改多个状态：

```ts
import { useDemoStore } from "@/store/demo.ts";

const demoStore = useDemoStore();
demoStore.$patch({
  name: "yyy",
  age: 22,
});
```

并且 $patch 也接受一个函数来批量修改状态：

```ts
import { useDemoStore } from "@/store/demo.ts";

const demoStore = useDemoStore();
demoStore.$patch((state) => {
  state.name = "yy";
  state.age = 23;
  state.loves.push("sex");
});
```

2.4 替换 state

使用 $state 来替换 Store 的整个状态：

```ts
import { useDemoStore } from "@/store/demo.ts";

const demoStore = useDemoStore();
demoStore.$state = {
  name: "yy",
  age: 33,
  loves: ["sex"],
};
```

3. Getters

Getter 等同于 Store 状态的计算值：

```ts
import { defineStore } from "pinia";

export const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      name: "yq",
      age: 18,
      loves: ["book"],
    };
  },
  actions: {
    changeName() {
      this.name = "yqcoder";
    },
  },
  getters: {
    lovesL: (state) => state.loves.length,
  },
});
```

通过 this 可以访问状态和 getter，在 TS 中，使用 this 访问状态，需要声明返回类型：

```js
import { defineStore } from "pinia";

export const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      name: "yq",
      age: 18,
      loves: ["book"],
    };
  },
  actions: {
    changeName() {
      this.name = "yqcoder";
    },
  },
  getters: {
    nameL: (state) => state.name.length,
    lovesL(): number {
      return this.nameL;
    },
  },
});
```

3.1 将参数传递给 getter

Getters 只是 computed 属性，因此无法传递任何参数。 但可以通过一个函数来接受参数：

```ts
import { defineStore } from "pinia";

export const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      name: "yq",
      age: 18,
      loves: ["book"],
    };
  },
  actions: {
    changeName() {
      this.name = "yqcoder";
    },
  },
  getters: {
    lovesL(): number {
      return this.nameL;
    },
    nameL: (state) => state.name.length,
    yearAfter: (state) => {
      return (yearNumber: number): number => state.age + yearNumber;
    },
  },
});
```

在组件中使用：

```html
<script setup lang="ts">
  import { useDemoStore } from "@/store/demo.ts";

  const deomStore = useDemoStore();
</script>

<template>
  <div>
    <!-- 输出：28 -->
    <span>{{ deomStore.yearAfter(10) }}</span>
  </div>
</template>

<style lang="scss" scoped></style>
```

请注意，在执行此操作时，getter 不再缓存，它们只是您调用的函数。 但是，您可以在 getter 本身内部缓存一些结果，这并不常见，但应该证明性能更高：

```js
export const useStore = defineStore("main", {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active);
      return (userId) => activeUsers.find((user) => user.id === userId);
    },
  },
});
```

3.3 访问其他 Store 的 getter

要使用其他存储 getter，您可以直接在 better 内部使用它：

```js
import { useOtherStore } from "./other-store";

export const useStore = defineStore("main", {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore();
      return state.localData + otherStore.data;
    },
  },
});
```

3.4 与 setup() 一起使用

您可以直接访问任何 getter 作为 store 的属性（与 state 属性完全一样）：

```js
export default {
  setup() {
    const store = useStore();

    store.counter = 3;
    store.doubleCount; // 6
  },
};
```

3.5 使用选项 API

对于以下示例，您可以假设已创建以下 store：

```js
// Example File Path:
// ./src/stores/counterStore.js
import { defineStore } from 'pinia',

const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCounter() {
      return this.counter * 2
    }
  }
})
```

3.5.1 使用 setup()

虽然 Composition API 并不适合所有人，但 setup() 钩子可以使在 Options API 中使用 Pinia 更容易。 不需要额外的 map helpers 功能！

```js
import { useCounterStore } from "../stores/counterStore";

export default {
  setup() {
    const counterStore = useCounterStore();

    return { counterStore };
  },
  computed: {
    quadrupleCounter() {
      return counterStore.doubleCounter * 2;
    },
  },
};
```

3.5.2 没有 setup()

您可以使用 previous section of state 中使用的相同 mapState() 函数映射到 getter：

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // 允许访问组件内的 this.doubleCounter
    // 与从 store.doubleCounter 中读取相同
    ...mapState(useCounterStore, ['doubleCount'])
    // 与上面相同，但将其注册为 this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCounter',
      // 您还可以编写一个访问 store 的函数
      double: store => store.doubleCount,
    }),
  },
}
```

4. Actions

Actions 相当于组件中的 methods。 它们可以使用 defineStore() 中的 actions 属性定义，并且它们非常适合定义业务逻辑：

```js
export const useStore = defineStore("main", {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++;
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random());
    },
  },
});
```

与 getters 一样，操作可以通过 this 访问 whole store instance 并提供完整类型（和自动完成 ✨）支持。 与它们不同，actions 可以是异步的，您可以在其中 await 任何 API 调用甚至其他操作！ 这是使用 Mande 的示例。 请注意，只要您获得“Promise”，您使用的库并不重要，您甚至可以使用浏览器的“fetch”函数：

```js
import { mande } from "mande";

const api = mande("/api/users");

export const useUsers = defineStore("users", {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password });
        showTooltip(`Welcome back ${this.userData.name}!`);
      } catch (error) {
        showTooltip(error);
        // 让表单组件显示错误
        return error;
      }
    },
  },
});
```

你也可以完全自由地设置你想要的任何参数并返回任何东西。 调用 Action 时，一切都会自动推断！Actions 像 methods 一样被调用：

```js
export default defineComponent({
  setup() {
    const main = useMainStore();
    // Actions 像 methods 一样被调用：
    main.randomizeCounter();

    return {};
  },
});
```

4.1 访问其他 store 操作

要使用另一个 store ，您可以直接在操作内部使用它：

```js
import { useAuthStore } from "./auth-store";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    // ...
  }),
  actions: {
    async fetchUserPreferences(preferences) {
      const auth = useAuthStore();
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences();
      } else {
        throw new Error("User must be authenticated");
      }
    },
  },
});
```

4.2 与 setup() 一起使用

您可以直接调用任何操作作为 store 的方法：

```js
export default {
  setup() {
    const store = useStore();

    store.randomizeCounter();
  },
};
```

4.3 使用选项 API

对于以下示例，您可以假设已创建以下 store：

```js
// Example File Path:
// ./src/stores/counterStore.js
import { defineStore } from 'pinia',

const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0
  }),
  actions: {
    increment() {
      this.counter++
    }
  }
})
```

4.3.1 使用 setup()

虽然 Composition API 并不适合所有人，但 setup() 钩子可以使在 Options API 中使用 Pinia 更容易。 不需要额外的 map helpers 功能！

```js
import { useCounterStore } from "../stores/counterStore";

export default {
  setup() {
    const counterStore = useCounterStore();

    return { counterStore };
  },
  methods: {
    incrementAndPrint() {
      counterStore.increment();
      console.log("New Count:", counterStore.count);
    },
  },
};
```

4.3.2 不使用 setup()

如果您根本不想使用 Composition API，可以使用 mapActions() 将操作属性映射为组件中的方法：

```js
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  methods: {
    // gives access to this.increment() inside the component
    // same as calling from store.increment()
    ...mapActions(useCounterStore, ['increment'])
    // same as above but registers it as this.myOwnName()
    ...mapActions(useCounterStore, { myOwnName: 'doubleCounter' }),
  },
}
```

4.4 订阅 Actions

可以使用 store.$onAction() 订阅 action 及其结果。 传递给它的回调在 action 之前执行。 after 处理 Promise 并允许您在 action 完成后执行函数。 以类似的方式，onError 允许您在处理中抛出错误。 这些对于在运行时跟踪错误很有用，类似于 Vue 文档中的这个提示。

这是一个在运行 action 之前和它们 resolve/reject 之后记录的示例。

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // action 的名字
    store, // store 实例
    args, // 调用这个 action 的参数
    after, // 在这个 action 执行完毕之后，执行这个函数
    onError, // 在这个 action 抛出异常的时候，执行这个函数
  }) => {
    // 记录开始的时间变量
    const startTime = Date.now();
    // 这将在 `store` 上的操作执行之前触发
    console.log(`Start "${name}" with params [${args.join(", ")}].`);

    // 如果 action 成功并且完全运行后，after 将触发。
    // 它将等待任何返回的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      );
    });

    // 如果 action 抛出或返回 Promise.reject ，onError 将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      );
    });
  }
);

// 手动移除订阅
unsubscribe();
```

默认情况下，action subscriptions 绑定到添加它们的组件（如果 store 位于组件的 setup() 内）。 意思是，当组件被卸载时，它们将被自动删除。 如果要在卸载组件后保留它们，请将 true 作为第二个参数传递给当前组件的 detach action subscription：

```js
export default {
  setup() {
    const someStore = useSomeStore();

    // 此订阅将在组件卸载后保留
    someStore.$onAction(callback, true);

    // ...
  },
};
```

5. 插件

由于是底层 API，Pania Store 可以完全扩展。 以下是您可以执行的操作列表：

向 Store 添加新属性
定义 Store 时添加新选项
为 Store 添加新方法
包装现有方法
更改甚至取消操作
实现本地存储等副作用
仅适用于特定 Store

使用 pinia.use() 将插件添加到 pinia 实例中。 最简单的例子是通过返回一个对象为所有 Store 添加一个静态属性：

```js
import { createPinia } from "pinia";

// 为安装此插件后创建的每个store添加一个名为 `secret` 的属性
// 这可能在不同的文件中
function SecretPiniaPlugin() {
  return { secret: "the cake is a lie" };
}

const pinia = createPinia();
// 将插件提供给 pinia
pinia.use(SecretPiniaPlugin);

// 在另一个文件中
const store = useStore();
store.secret; // 'the cake is a lie'
```

这对于添加全局对象（如路由器、模式或 toast 管理器）很有用。

5.1 介绍

Pinia 插件是一个函数，可以选择返回要添加到 store 的属性。 它需要一个可选参数，一个 context：

```js
export function myPiniaPlugin(context) {
  context.pinia; // 使用 `createPinia()` 创建的 pinia
  context.app; // 使用 `createApp()` 创建的当前应用程序（仅限 Vue 3）
  context.store; // 插件正在扩充的 store
  context.options; // 定义存储的选项对象传递给`defineStore()`
  // ...
}
```

然后使用 pinia.use() 将此函数传递给 pinia：

```js
pinia.use(myPiniaPlugin);
```

插件仅适用于**在将 pinia 传递给应用程序后创建的 store **，否则将不会被应用。

5.2 扩充 store

您可以通过简单地在插件中返回它们的对象来为每个 store 添加属性：

```js
pinia.use(() => ({ hello: "world" }));
```

您也可以直接在 store 上设置属性，但如果可能，请使用返回版本，以便 devtools 可以自动跟踪它们：

```js
pinia.use(({ store }) => {
  store.hello = "world";
});
```

插件的任何属性 returned 都会被 devtools 自动跟踪，所以为了让 hello 在 devtools 中可见，如果你想调试它，请确保将它添加到 store.\_customProperties 仅在开发模式 开发工具：

```js
// 从上面的例子
pinia.use(({ store }) => {
  store.hello = "world";
  // 确保您的打包器可以处理这个问题。 webpack 和 vite 应该默认这样做
  if (process.env.NODE_ENV === "development") {
    // 添加您在 store 中设置的任何 keys
    store._customProperties.add("hello");
  }
});
```

请注意，每个 store 都使用 reactive 包装，自动展开任何 Ref (ref(), computed() ， ...） 它包含了：

```js
const sharedRef = ref("shared");
pinia.use(({ store }) => {
  // 每个 store 都有自己的 `hello` 属性
  store.hello = ref("secret");
  // 它会自动展开
  store.hello; // 'secret'

  // 所有 store 都共享 value `shared` 属性
  store.shared = sharedRef;
  store.shared; // 'shared'
});
```

这就是为什么您可以在没有 .value 的情况下访问所有计算属性以及它们是响应式的原因。

5.2.1 添加新状态

如果您想将新的状态属性添加到 store 或打算在 hydration 中使用的属性，您必须在两个地方添加它：

在 store 上，因此您可以使用 store.myState 访问它
在 store.$state 上，因此它可以在 devtools 中使用，并且在 SSR 期间被序列化。

请注意，这允许您共享 ref 或 computed 属性：

```js
const globalSecret = ref("secret");
pinia.use(({ store }) => {
  // `secret` 在所有 store 之间共享
  store.$state.secret = globalSecret;
  store.secret = globalSecret;
  // 它会自动展开
  store.secret; // 'secret'

  const hasError = ref(false);
  store.$state.hasError = hasError;
  // 这个必须始终设置
  store.hasError = toRef(store.$state, "hasError");

  // 在这种情况下，最好不要返回 `hasError`，因为它
  // 将显示在 devtools 的 `state` 部分
  // 无论如何，如果我们返回它，devtools 将显示它两次。
});
```

请注意，插件中发生的状态更改或添加（包括调用 store.$patch()）发生在存储处于活动状态之前，因此不会触发任何订阅。

5.3 添加新的外部属性

当添加外部属性、来自其他库的类实例或仅仅是非响应式的东西时，您应该在将对象传递给 pinia 之前使用 markRaw() 包装对象。 这是一个将路由添加到每个 store 的示例：

```js
import { markRaw } from "vue";
// 根据您的路由所在的位置进行调整
import { router } from "./router";

pinia.use(({ store }) => {
  store.router = markRaw(router);
});
```

5.4 在插件中调用 $subscribe

您也可以在插件中使用 store.$subscribe 和 store.$onAction ：

```js
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // 在存储变化的时候执行
  });
  store.$onAction(() => {
    // 在 action 的时候执行
  });
});
```

5.5 添加新选项

可以在定义 store 时创建新选项，以便以后从插件中使用它们。 例如，您可以创建一个 debounce 选项，允许您对任何操作进行去抖动：

```js
defineStore("search", {
  actions: {
    searchContacts() {
      // ...
    },
  },

  // 稍后将由插件读取
  debounce: {
    // 将动作 searchContacts 防抖 300ms
    searchContacts: 300,
  },
});
```

然后插件可以读取该选项以包装操作并替换原始操作：

```js
// 使用任何防抖库
import debounce from "lodash/debunce";

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // 我们正在用新的action覆盖这些action
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = debounce(
        store[action],
        options.debounce[action]
      );
      return debouncedActions;
    }, {});
  }
});
```

请注意，使用设置语法时，自定义选项作为第三个参数传递：

```js
defineStore(
  "search",
  () => {
    // ...
  },
  {
    // 稍后将由插件读取
    debounce: {
      // 将动作 searchContacts 防抖 300ms
      searchContacts: 300,
    },
  }
);
```

5.6 TypeScript

上面显示的所有内容都可以通过键入支持来完成，因此您无需使用 any 或 @ts-ignore。

5.6.1 Typing 插件

Pinia 插件可以按如下方式引入：

```js
import { PiniaPluginContext } from "pinia";

export function myPiniaPlugin(context: PiniaPluginContext) {
  // ...
}
```

5.6.2 引入新的 store 属性

向 store 添加新属性时，您还应该扩展 PiniaCustomProperties 接口。

```js
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // 通过使用 setter，我们可以同时允许字符串和引用
    set hello(value: string | Ref<string>)
    get hello(): string

    // 你也可以定义更简单的值
    simpleNumber: number
  }
}
```

然后可以安全地写入和读取它：

```js
pinia.use(({ store }) => {
  store.hello = "Hola";
  store.hello = ref("Hola");

  store.number = Math.random();
  // @ts-expect-error: we haven't typed this correctly
  store.number = ref(Math.random());
});
```

PiniaCustomProperties 是一种通用类型，允许您引用 store 的属性。 想象以下示例，我们将初始选项复制为“$options”（这仅适用于选项存储）：

```js
pinia.use(({ options }) => ({ $options: options }));
```

我们可以使用 4 种通用类型的 PiniaCustomProperties 来正确输入：

```js
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $options: {
      id: Id
      state?: () => S
      getters?: G
      actions?: A
    }
  }
}
```

5.6.3 引入新状态

当添加新的状态属性（store 和 store.$state）时，您需要将类型添加到 PiniaCustomStateProperties。 与 PiniaCustomProperties 不同，它只接收 State 泛型：

```js
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    hello: string
  }
}
```

5.6.4 引入新的创建选项

在为 defineStore() 创建新选项时，您应该扩展 DefineStoreOptionsBase。 与 PiniaCustomProperties 不同，它只公开了两个泛型：State 和 Store 类型，允许您限制可以定义的内容。 例如，您可以使用操作的名称：

```js
import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // 允许为任何操作定义毫秒数
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>
  }
}
```

5.7 Nuxt.js

当在 Nuxt 使用 pinia 时，您必须先创建一个 Nuxt 插件 . 这将使您可以访问 pinia 实例：

```js
// plugins/myPiniaPlugin.js
import { PiniaPluginContext } from 'pinia'
import { Plugin } from '@nuxt/types'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // 在存储变化的时候执行
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  return { creationTime: new Date() }
}

const myPlugin: Plugin = ({ pinia }) {
  pinia.use(MyPiniaPlugin);
}
export default myPlugin
```

请注意，上面的示例使用的是 TypeScript，如果您使用的是 .js 文件，则必须删除类型注释 PiniaPluginContext 和 Plugin 以及它们的导入。

7. 在组件外使用存储

Pinia store 依靠 pinia 实例在所有调用中共享同一个 store 实例。 大多数情况下，只需调用您的“useStore()”函数即可开箱即用。 例如，在 setup() 中，您无需执行任何其他操作。 但在组件之外，情况有些不同。 在幕后，useStore() injects 你给你的 app 的 pinia 实例。 这意味着如果 pinia 实例无法自动注入，您必须手动将其提供给 useStore() 函数。 您可以根据您正在编写的应用程序的类型以不同的方式解决这个问题。

7.1 单页应用程序

如果您没有进行任何 SSR（服务器端渲染），则在使用 app.use(pinia) 安装 pinia 插件后，任何 useStore() 调用都将起作用：

```js
import { useUserStore } from "@/stores/user";
import { createApp } from "vue";
import App from "./App.vue";

// ❌  失败，因为它是在创建 pinia 之前调用的
const userStore = useUserStore();

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

// ✅ 有效，因为 pinia 实例现在处于活动状态
const userStore = useUserStore();
```

确保始终应用此功能的最简单方法是延迟调用 useStore()，方法是将它们放在安装 pinia 后始终运行的函数中。

让我们看一下这个使用 Vue Router 的导航守卫内部的 store 的例子：

```js
import { createRouter } from "vue-router";
const router = createRouter({
  // ...
});

// ❌ 根据导入的顺序，这将失败
const store = useStore();

router.beforeEach((to, from, next) => {
  // 我们想在这里使用 store
  if (store.isLoggedIn) next();
  else next("/login");
});

router.beforeEach((to) => {
  // ✅ 这将起作用，因为路由器在之后开始导航
  // 路由已安装，pinia 也将安装
  const store = useStore();

  if (to.meta.requiresAuth && !store.isLoggedIn) return "/login";
});
```
