# Pinia 官网速通

前言：参考 [Pinia 中文文档](https://pinia.web3doc.top/introduction.html)，在 Vue3 中的使用。

一：介绍

1. 什么是 Pinia

Pinia 是 Vue 的存储库，允许跨组件/页面共享状态。

1.1. 为什么要使用 Pinia？

dev-tools 支持：1. 跟踪动作、突变的时间线。2. Store 出现在使用它们的组件中。3. time travel 和 更容易的调试。

热模块更换：1. 在不重新加载页面的情况下修改您的 Store。2. 在开发时保持任何现有状态。

插件：使用插件扩展 Pinia 功能

为 JS 用户提供适当的 TypeScript 支持或 autocompletion

服务器端渲染支持

1.2. 基本示例

这就是使用 pinia 在 API 方面的样子（请务必查看 Getting Started 以获取完整说明）。 您首先创建一个 Store ：

```js
// stores/counter.js
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 0 };
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

然后你在一个组件中 使用 它：

```js
import { useCounterStore } from "@/stores/counter";

export default {
  setup() {
    const counter = useCounterStore();

    counter.count++;
    // 带自动补全 ✨
    counter.$patch({ count: counter.count + 1 });
    // 或使用 action 代替
    counter.increment();
  },
};
```

你甚至可以使用一个函数（类似于一个组件 setup()）来为更高级的用例定义一个 Store：

```js
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }

  return { count, increment };
});
```

1.3. 为什么是 Pinia

Pinia（发音为 /piːnjʌ/，类似于英语中的“peenya”）是最接近有效包名 piña（西班牙语中的*pineapple*）的词。 菠萝实际上是一组单独的花朵，它们结合在一起形成多个水果。 与 Store 类似，每一家都是独立诞生的，但最终都是相互联系的。 它也是一种美味的热带水果，原产于南美洲。

1.4. 一个更现实的例子

这是一个更完整的 API 示例，您将与 Pinia 一起使用即使在 JavaScript 中也具有类型。 对于某些人来说，这可能足以在不进一步阅读的情况下开始使用，但我们仍然建议您查看文档的其余部分，甚至跳过此示例，并在阅读完所有*核心概念*后返回。

```js
import { defineStore } from "pinia";

export const todos = defineStore("todos", {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: "all",
    // type 会自动推断为 number
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // 自动完成! ✨
      return state.todos.filter((todo) => todo.isFinished);
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished);
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === "finished") {
        // 自动调用其他 getter ✨
        return this.finishedTodos;
      } else if (this.filter === "unfinished") {
        return this.unfinishedTodos;
      }
      return this.todos;
    },
  },
  actions: {
    // 任何数量的参数，返回一个 Promise 或者不返回
    addTodo(text) {
      // 你可以直接改变状态
      this.todos.push({ text, id: this.nextId++, isFinished: false });
    },
  },
});
```

1.5. 与 Vuex 的比较

Pinia 最初是为了探索 Vuex 的下一次迭代会是什么样子，结合了 Vuex 5 核心团队讨论中的许多想法。最终，我们意识到 Pinia 已经实现了我们在 Vuex 5 中想要的大部分内容，并决定实现它 取而代之的是新的建议。

与 Vuex 相比，Pinia 提供了一个更简单的 API，具有更少的规范，提供了 Composition-API 风格的 API，最重要的是，在与 TypeScript 一起使用时具有可靠的类型推断支持。

1.5.1 RFC

虽然 Vuex 通过 RFC 从社区收集尽可能多的反馈，但 Pinia 没有。 我根据我开发应用程序、阅读其他人的代码、为使用 Pinia 的客户工作以及在 Discord 上回答问题的经验来测试想法。 这使我能够提供一种适用于各种情况和应用程序大小的有效解决方案。 我经常发布并在保持其核心 API 不变的同时使库不断发展。

1.5.2 与 Vuex 3.x/4.x 的比较

Pinia API 与 Vuex ≤4 有很大不同，即：

mutations 不再存在。他们经常被认为是 非常 冗长。他们最初带来了 devtools 集成，但这不再是问题。
无需创建自定义复杂包装器来支持 TypeScript，所有内容都是类型化的，并且 API 的设计方式尽可能利用 TS 类型推断。
不再需要注入、导入函数、调用函数、享受自动完成功能！
无需动态添加 Store，默认情况下它们都是动态的，您甚至都不会注意到。请注意，您仍然可以随时手动使用 Store 进行注册，但因为它是自动的，您无需担心。
不再有 modules 的嵌套结构。您仍然可以通过在另一个 Store 中导入和 使用 来隐式嵌套 Store，但 Pinia 通过设计提供平面结构，同时仍然支持 Store 之间的交叉组合方式。 您甚至可以拥有 Store 的循环依赖关系。
没有命名空间模块。鉴于 Store 的扁平架构，“命名空间” Store 是其定义方式所固有的，您可以说所有 Store 都是命名空间的。

2. 开始

2.1 安装

```sh
yarn add pinia
# 或者使用 npm
npm install pinia
```

创建一个 pinia（根存储）并将其传递给应用程序：

```js
import { createPinia } from "pinia";

app.use(createPinia());
```

2.2 什么是 Store

一个 Store （如 Pinia）是一个实体，它持有未绑定到您的组件树的状态和业务逻辑。换句话说，它托管全局状态。它有点像一个始终存在并且每个人都可以读取和写入的组件。它有三个概念，state、getters 和 actions 并且可以安全地假设这些概念等同于组件中的“数据”、“计算”和“方法”。

2.3 我什么时候应该使用 Store

存储应该包含可以在整个应用程序中访问的数据。这包括在许多地方使用的数据，例如导航栏中显示的用户信息，以及需要通过页面保留的数据，例如一个非常复杂的多步骤表格。

另一方面，您应该避免在存储中包含可以托管在组件中的本地数据，例如页面本地元素的可见性。

并非所有应用程序都需要访问全局状态，但如果您需要一个，Pania 将使您的生活更轻松。

二. 核心概念

1. 定义一个 Store

在深入了解核心概念之前，我们需要知道 Store 是使用 defineStore() 定义的，并且它需要一个唯一名称，作为第一个参数传递：

```js
import { defineStore } from "pinia";

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore("main", {
  // other options...
});
```

这个 name，也称为 id，是必要的，Pinia 使用它来将 store 连接到 devtools。 将返回的函数命名为 use... 是跨可组合项的约定，以使其符合你的使用习惯。

1.1 使用 store

我们正在 定义 一个 store，因为在 setup() 中调用 useStore() 之前不会创建 store：

```js
import { useStore } from "@/stores/counter";

export default {
  setup() {
    const store = useStore();

    return {
      // 您可以返回整个 store 实例以在模板中使用它
      store,
    };
  },
};
```

您可以根据需要定义任意数量的 store ，并且**您应该在不同的文件中定义每个 store **以充分利用 pinia（例如自动允许您的包进行代码拆分和 TypeScript 推理）。

一旦 store 被实例化，你就可以直接在 store 上访问 state、getters 和 actions 中定义的任何属性。 我们将在接下来的页面中详细介绍这些内容，但自动补全会对您有所帮助。

请注意，store 是一个用 reactive 包裹的对象，这意味着不需要在 getter 之后写.value，但是，就像 setup 中的 props 一样，我们不能对其进行解构：

```js
export default defineComponent({
  setup() {
    const store = useStore();
    // ❌ 这不起作用，因为它会破坏响应式
    // 这和从 props 解构是一样的
    const { name, doubleCount } = store;

    name; // "eduardo"
    doubleCount; // 2

    return {
      // 一直会是 "eduardo"
      name,
      // 一直会是 2
      doubleCount,
      // 这将是响应式的
      doubleValue: computed(() => store.doubleCount),
    };
  },
});
```

为了从 Store 中提取属性同时保持其响应式，您需要使用 storeToRefs()。 它将为任何响应式属性创建 refs。 当您仅使用 store 中的状态但不调用任何操作时，这很有用：

```js
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const store = useStore();
    // `name` 和 `doubleCount` 是响应式引用
    // 这也会为插件添加的属性创建引用
    // 但跳过任何 action 或 非响应式（不是 ref/reactive）的属性
    const { name, doubleCount } = storeToRefs(store);

    return {
      name,
      doubleCount,
    };
  },
});
```

2. State

大多数时候，state 是 store 的核心部分。 我们通常从定义应用程序的状态开始。 在 Pinia 中，状态被定义为返回初始状态的函数。 Pinia 在服务器端和客户端都可以工作。

```js
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

默认情况下，您可以通过 store 实例访问状态来直接读取和写入状态：

```js
const store = useStore();

store.counter++;
```

2.2 重置状态

您可以通过调用 store 上的 $reset() 方法将状态 重置 到其初始值：

```js
const store = useStore();

store.$reset();
```

2.2.1 使用选项 API

对于以下示例，您可以假设已创建以下 Store：

```js
// Example File Path:
// ./src/stores/counterStore.js

import { defineStore } from 'pinia',

const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0
  })
})
```

2.2.2 使用 setup()

虽然 Composition API 并不适合所有人，但 setup() 钩子可以使在 Options API 中使用 Pinia 更容易。 不需要额外的 map helper！

```js
import { useCounterStore } from "../stores/counterStore";

export default {
  setup() {
    const counterStore = useCounterStore();

    return { counterStore };
  },
  computed: {
    tripleCounter() {
      return counterStore.counter * 3;
    },
  },
};
```

2.2.3 不使用 setup()

如果您不使用 Composition API，并且使用的是 computed、methods、...，则可以使用 mapState() 帮助器将状态属性映射为只读计算属性：

```js
import { mapState } from "pinia";
import { useCounterStore } from "../stores/counterStore";

export default {
  computed: {
    // 允许访问组件内部的 this.counter
    // 与从 store.counter 读取相同
    ...mapState(useCounterStore, {
      myOwnName: "counter",
      // 您还可以编写一个访问 store 的函数
      double: (store) => store.counter * 2,
      // 它可以正常读取“this”，但无法正常写入...
      magicValue(store) {
        return store.someGetter + this.counter + this.double;
      },
    }),
  },
};
```

如果您希望能够写入这些状态属性（例如，如果您有一个表单），您可以使用 mapWritableState() 代替。 请注意，您不能传递类似于 mapState() 的函数：

```js
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // 允许访问组件内的 this.counter 并允许设置它
    // this.counter++
    // 与从 store.counter 读取相同
    ...mapWritableState(useCounterStore, ['counter'])
    // 与上面相同，但将其注册为 this.myOwnName
    ...mapWritableState(useCounterStore, {
      myOwnName: 'counter',
    }),
  },
}
```

2.3 改变状态

除了直接用 store.counter++ 修改 store，你还可以调用 $patch 方法。 它允许您使用部分“state”对象同时应用多个更改：

```js
store.$patch({
  counter: store.counter + 1,
  name: "Abalam",
});
```

但是，使用这种语法应用某些突变非常困难或代价高昂：任何集合修改（例如，从数组中推送、删除、拼接元素）都需要您创建一个新集合。 正因为如此，$patch 方法也接受一个函数来批量修改集合内部分对象的情况：

```js
cartStore.$patch((state) => {
  state.items.push({ name: "shoes", quantity: 1 });
  state.hasChanged = true;
});
```

这里的主要区别是$patch() 允许您将批量更改的日志写入开发工具中的一个条目中。 注意两者，state 和 $patch() 的直接更改都出现在 devtools 中，并且可以进行 time travelled（在 Vue 3 中还没有）。

2.4 替换 state

您可以通过将其 $state 属性设置为新对象来替换 Store 的整个状态：

```js
store.$state = { counter: 666, name: "Paimon" };
```

您还可以通过更改 pinia 实例的 state 来替换应用程序的整个状态。 这在 SSR for hydration 期间使用。

```js
pinia.state.value = {};
```

2.5 订阅状态

可以通过 store 的 $subscribe() 方法查看状态及其变化，类似于 Vuex 的 subscribe 方法。 与常规的 watch() 相比，使用 $subscribe() 的优点是 subscriptions 只会在 patches 之后触发一次（例如，当使用上面的函数版本时）。

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type; // 'direct' | 'patch object' | 'patch function'
  // 与 cartStore.$id 相同
  mutation.storeId; // 'cart'
  // 仅适用于 mutation.type === 'patch object'
  mutation.payload; // 补丁对象传递给 to cartStore.$patch()

  // 每当它发生变化时，将整个状态持久化到本地存储
  localStorage.setItem("cart", JSON.stringify(state));
});
```

默认情况下，state subscriptions 绑定到添加它们的组件（如果 store 位于组件的 setup() 中）。 意思是，当组件被卸载时，它们将被自动删除。 如果要在卸载组件后保留它们，请将 { detached: true } 作为第二个参数传递给 detach 当前组件的 state subscription：

```js
export default {
  setup() {
    const someStore = useSomeStore();

    // 此订阅将在组件卸载后保留
    someStore.$subscribe(callback, { detached: true });

    // ...
  },
};
```

3. Getters

Getter 完全等同于 Store 状态的 计算值。 它们可以用 defineStore() 中的 getters 属性定义。 他们接收“状态”作为第一个参数以鼓励箭头函数的使用：

```js
export const useStore = defineStore("main", {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
});
```

大多数时候，getter 只会依赖状态，但是，他们可能需要使用其他 getter。 正因为如此，我们可以在定义常规函数时通过 this 访问到 整个 store 的实例，但是需要定义返回类型（在 TypeScript 中）。 这是由于 TypeScript 中的一个已知限制，并且不会影响使用箭头函数定义的 getter，也不会影响不使用 this 的 getter：

```js
export const useStore = defineStore("main", {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // 自动将返回类型推断为数字
    doubleCount(state) {
      return state.counter * 2;
    },
    // 返回类型必须明确设置
    doublePlusOne(): number {
      return this.counter * 2 + 1;
    },
  },
});
```

然后你可以直接在 store 实例上访问 getter：

```vue
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>

<script>
export default {
  setup() {
    const store = useStore();

    return { store };
  },
};
</script>
```

3.1 访问其他 getter

与计算属性一样，您可以组合多个 getter。 通过 this 访问任何其他 getter。 即使您不使用 TypeScript，您也可以使用 JSDoc 提示您的 IDE 类型：

```js
export const useStore = defineStore("main", {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // 类型是自动推断的，因为我们没有使用 `this`
    doubleCount: (state) => state.counter * 2,
    // 这里需要我们自己添加类型（在 JS 中使用 JSDoc）。 我们还可以
    // 使用它来记录 getter
    /**
     * 返回计数器值乘以二加一。
     *
     * @returns {number}
     */
    doubleCountPlusOne() {
      // 自动完成 ✨
      return this.doubleCount + 1;
    },
  },
});
```

3.2 将参数传递给 getter

Getters 只是幕后的 computed 属性，因此无法向它们传递任何参数。 但是，您可以从 getter 返回一个函数以接受任何参数：

```js
export const useStore = defineStore("main", {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId);
    },
  },
});
```

并在组件中使用：

```js
<script>
export default {
  setup() {
    const store = useStore()

    return { getUserById: store.getUserById }
  },
}
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
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
