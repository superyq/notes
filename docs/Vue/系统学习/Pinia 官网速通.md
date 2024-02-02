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
import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  // other options...
})
```

这个 name，也称为 id，是必要的，Pinia 使用它来将 store 连接到 devtools。 将返回的函数命名为 use... 是跨可组合项的约定，以使其符合你的使用习惯。

1.1 使用 store

我们正在 定义 一个 store，因为在 setup() 中调用 useStore() 之前不会创建 store：

```js
import { useStore } from '@/stores/counter'

export default {
  setup() {
    const store = useStore()

    return {
      // 您可以返回整个 store 实例以在模板中使用它
      store,
    }
  },
}
```

您可以根据需要定义任意数量的 store ，并且**您应该在不同的文件中定义每个 store **以充分利用 pinia（例如自动允许您的包进行代码拆分和 TypeScript 推理）。

一旦 store 被实例化，你就可以直接在 store 上访问 state、getters 和 actions 中定义的任何属性。 我们将在接下来的页面中详细介绍这些内容，但自动补全会对您有所帮助。

请注意，store 是一个用reactive 包裹的对象，这意味着不需要在getter 之后写.value，但是，就像setup 中的props 一样，我们不能对其进行解构：

```js
export default defineComponent({
  setup() {
    const store = useStore()
    // ❌ 这不起作用，因为它会破坏响应式
    // 这和从 props 解构是一样的
    const { name, doubleCount } = store

    name // "eduardo"
    doubleCount // 2

    return {
      // 一直会是 "eduardo"
      name,
      // 一直会是 2
      doubleCount,
      // 这将是响应式的
      doubleValue: computed(() => store.doubleCount),
      }
  },
})
```

为了从 Store 中提取属性同时保持其响应式，您需要使用storeToRefs()。 它将为任何响应式属性创建 refs。 当您仅使用 store 中的状态但不调用任何操作时，这很有用：

```js
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useStore()
    // `name` 和 `doubleCount` 是响应式引用
    // 这也会为插件添加的属性创建引用
    // 但跳过任何 action 或 非响应式（不是 ref/reactive）的属性
    const { name, doubleCount } = storeToRefs(store)

    return {
      name,
      doubleCount
    }
  },
})
```

2. State

大多数时候，state 是 store 的核心部分。 我们通常从定义应用程序的状态开始。 在 Pinia 中，状态被定义为返回初始状态的函数。 Pinia 在服务器端和客户端都可以工作。

```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})
```

2.1 访问 “state”

默认情况下，您可以通过 store 实例访问状态来直接读取和写入状态：

```js
const store = useStore()

store.counter++
```

2.2 重置状态

您可以通过调用 store 上的 $reset() 方法将状态 重置 到其初始值：

```js
const store = useStore()

store.$reset()
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
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    tripleCounter() {
      return counterStore.counter * 3
    },
  },
}
```

2.2.3 不使用setup()

如果您不使用 Composition API，并且使用的是 computed、methods、...，则可以使用 mapState() 帮助器将状态属性映射为只读计算属性：

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // 允许访问组件内部的 this.counter
    // 与从 store.counter 读取相同
    ...mapState(useCounterStore, {
      myOwnName: 'counter',
      // 您还可以编写一个访问 store 的函数
      double: store => store.counter * 2,
      // 它可以正常读取“this”，但无法正常写入...
      magicValue(store) {
        return store.someGetter + this.counter + this.double
      },
    }),
  },
}
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
  name: 'Abalam',
})
```

但是，使用这种语法应用某些突变非常困难或代价高昂：任何集合修改（例如，从数组中推送、删除、拼接元素）都需要您创建一个新集合。 正因为如此，$patch 方法也接受一个函数来批量修改集合内部分对象的情况：

```js
cartStore.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

这里的主要区别是$patch() 允许您将批量更改的日志写入开发工具中的一个条目中。 注意两者，state 和 $patch() 的直接更改都出现在 devtools 中，并且可以进行 time travelled（在 Vue 3 中还没有）。

2.4 替换state

您可以通过将其 $state 属性设置为新对象来替换 Store 的整个状态：