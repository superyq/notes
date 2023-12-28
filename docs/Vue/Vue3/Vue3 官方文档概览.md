# Vue3 官方文档速通

一 开始

1. 简介

1.1 什么是 Vue？

一款 JavaScript 框架，并有两个核心功能：声明式渲染、响应性。

1.2 渐进式框架

根据你的需求场景，你可以用不同的方式使用 Vue：

无需构建步骤，渐进式增强静态的 HTML
在任何页面中作为 Web Components 嵌入
单页应用 (SPA)
全栈 / 服务端渲染 (SSR)
Jamstack / 静态站点生成 (SSG)
开发桌面端、移动端、WebGL，甚至是命令行终端中的界面

你可以根据实际场景来选择使用 Vue 的最佳方式，在各种场景下都可以保持同样的开发效率。
这就是为什么我们将 Vue 称为“渐进式框架”：它是一个可以与你共同成长、适应你不同需求的框架。

1.3 单文件组件

单文件组件是 Vue 的标志性功能。
\*.vue、SFC 就是单文件组件：会将一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里。

1.4 API 风格

选项式 API（Options API）

包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。
选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。
选项式 API 以“组件实例”的概念为中心 (即上述例子中的 this)
它将响应性相关的细节抽象出来，并强制按照选项来组织代码，从而对初学者而言更为友好。

组合式 API（Composition API）

使用导入的 API 函数来描述组件逻辑。
组合式 API 通常会与 <script setup> 搭配使用。<script setup> 中的导入和顶层变量/函数都能够在模板中直接使用。
组合式 API 的核心思想是直接在函数作用域内定义响应式状态变量，并将从多个函数中得到的状态组合起来处理复杂问题。
这种形式更加自由，也需要你对 Vue 的响应式系统有更深的理解才能高效使用。相应的，它的灵活性也使得组织和重用逻辑的模式变得更加强大。

综上：两种 API 是同一个底层系统所提供的两套不同的接口。选项式 API 是在组合式 API 的基础上实现的！

2. 快速上手

2.1 创建一个 Vue 应用

这一指令将会安装并执行 create-vue，它是 Vue 官方的项目脚手架工具。

```js
npm create vue@latest
```

2.2 通过 CDN 使用 Vue

通过 CDN 使用 Vue 时，不涉及“构建步骤”。这使得设置更加简单，并且可以用于增强静态的 HTML 或与后端框架集成。但是，你将无法使用单文件组件 (SFC) 语法。

下面的链接使用了全局构建版本的 Vue，该版本的所有顶层 API 都以属性的形式暴露在了全局的 Vue 对象上。这里有一个使用全局构建版本的例子：

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue;

  createApp({
    setup() {
      const message = ref("Hello vue!");
      return {
        message,
      };
    },
  }).mount("#app");
</script>
```

在本文档的其余部分我们使用的主要是 ES 模块语法。现代浏览器大多都已原生支持 ES 模块。因此我们可以像这样通过 CDN 以及原生 ES 模块使用 Vue：

```html
<div id="app">{{ message }}</div>

<script type="module">
  import {
    createApp,
    ref,
  } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

  createApp({
    setup() {
      const message = ref("Hello Vue!");
      return {
        message,
      };
    },
  }).mount("#app");
</script>
```

我们可以使用导入映射表 (Import Maps) 来告诉浏览器如何定位到导入的 vue：

```html
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from "vue";

  createApp({
    setup() {
      const message = ref("Hello Vue!");
      return {
        message,
      };
    },
  }).mount("#app");
</script>
```

随着对这份指南的逐步深入，我们可能需要将代码分割成单独的 JavaScript 文件，以便更容易管理。例如：

```html
<!-- index.html -->
<div id="app"></div>

<script type="module">
  import { createApp } from "vue";
  import MyComponent from "./my-component.js";

  createApp(MyComponent).mount("#app");
</script>
```

```js
// my-component.js
import { ref } from "vue";
export default {
  setup() {
    const count = ref(0);
    return { count };
  },
  template: `<div>count is {{ count }}</div>`,
};
```

注意：直接点击 index.html，会抛出错误，因为 ES 模块不能通过 file:// 协议工作。由于安全原因，ES 模块只能通过 http:// 协议工作。要启动一个本地的 HTTP 服务器，请先安装 Node.js，然后通过命令行在 HTML 文件所在文件夹下运行 npx serve。

二 基础

1. 创建一个 Vue 应用

1.1 应用实例

每个 Vue 应用都是通过 createApp 函数创建一个新的 应用实例：

```js
import { createApp } from "vue";

const app = createApp({
  /* 根组件选项 */
});
```

1.2 根组件

我们传入 createApp 的对象实际上是一个组件，每个应用都需要一个“根组件”，其他组件将作为其子组件。

```js
import { createApp } from "vue";
// 从一个单文件组件中导入根组件
import App from "./App.vue";

const app = createApp(App);
```

1.3 挂载应用

应用实例必须在调用了 .mount() 方法后才会渲染出来。该方法接收一个“容器”参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串：

```html
<div id="app"></div>
```

.mount() 方法应该始终在整个应用配置和资源注册完成后被调用。同时请注意，不同于其他资源注册方法，它的返回值是根组件实例而非应用实例。

```js
app.mount("#app");
```

根组件的模板通常是组件本身的一部分，但也可以直接通过在挂载容器内编写模板来单独提供：

当根组件没有设置 template 选项时，Vue 将自动使用容器的 innerHTML 作为模板。

DOM 内模板通常用于无构建步骤的 Vue 应用程序。它们也可以与服务器端框架一起使用，其中根模板可能是由服务器动态生成的。

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```js
import { createApp } from "vue";

const app = createApp({
  data() {
    return {
      count: 0,
    };
  },
});

app.mount("#app");
```

1.4 应用配置

应用实例会暴露一个 .config 对象允许我们配置一些应用级的选项，例如定义一个应用级的错误处理器，用来捕获所有子组件上的错误：

```js
app.config.errorHandler = (err) => {
  /* 处理错误 */
};
```

应用实例还提供了一些方法来注册应用范围内可用的资源，例如注册一个组件：

```js
app.component("TodoDeleteButton", TodoDeleteButton);
```

一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。

```js
app.config.globalProperties.msg = "hello";
```

这使得 msg 在应用的任意组件模板上都可用，并且也可以通过任意组件实例的 this 访问到：

```js
export default {
  mounted() {
    console.log(this.msg); // 'hello'
  },
};
```

注意：确保在挂载应用实例之前完成所有应用配置！

1.5 多个应用实例

应用实例并不只限于一个。createApp API 允许你在同一个页面中创建多个共存的 Vue 应用，而且每个应用都拥有自己的用于配置和全局资源的作用域。

```js
const app1 = createApp({
  /* ... */
});
app1.mount("#container-1");

const app2 = createApp({
  /* ... */
});
app2.mount("#container-2");
```

2. 模板语法

我们能够声明式地将其组件实例的数据绑定到呈现的 DOM 上。
在底层机制中，Vue 会将模板编译成高度优化的 JavaScript 代码。结合响应式系统，当应用状态变更时，Vue 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的 DOM 操作。

2.1 文本插值

最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)：

双大括号标签会被替换为相应组件实例中 msg 属性的值。

```html
<span>Message: {{ msg }}</span>
```

2.2 原始 HTML

双大括号会将数据解释为纯文本，而不是 HTML。若想插入 HTML，你需要使用 v-html 指令：

这里看到的 v-html attribute 被称为一个指令。指令由 v- 作为前缀，表明它们是一些由 Vue 提供的特殊 attribute，它们将为渲染的 DOM 应用特殊的响应式行为。

```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

安全警告：在网站上动态渲染任意 HTML 是非常危险的，因为这非常容易造成 XSS 漏洞。请仅在内容安全可信时再使用 v-html，并且永远不要使用用户提供的 HTML 内容。

2.3 Attribute 绑定

想要响应式地绑定一个 attribute，应该使用 v-bind 指令：

```html
<div v-bind:id="dynamicId"></div>
```

因为 v-bind 非常常用，所以提供了特定的简写语法：

```html
<div :id="dynamicId"></div>
```

布尔型 attribute 依据 true / false 值来决定 attribute 是否应该存在于该元素上。disabled 就是最常见的例子之一。

当 isButtonDisabled 为真值或一个空字符串 (即 <button disabled="">) 时，元素会包含这个 disabled attribute。而当其为其他假值时 attribute 将被忽略。

```html
<button :disabled="isButtonDisabled">Button</button>
```

动态绑定多个值

```js
const objectOfAttrs = {
  id: "container",
  class: "wrapper",
};
```

通过不带参数的 v-bind，你可以将它们绑定到单个元素上：

```html
<div v-bind="objectOfAttrs"></div>
```

2.4 使用 JavaScript 表达式

数据绑定都支持完整的 JavaScript 表达式，也就是一段能够被求值的 JavaScript 代码。一个简单的判断方法是是否可以合法地写在 return 后面。

```js
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

可以在绑定的表达式中使用一个组件暴露的方法：

```html
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

提示：绑定在表达式中的方法在组件每次更新时都会被重新调用，因此不应该产生任何副作用，比如改变数据或触发异步操作。

2.5 指令 Directives

指令是带有 v- 前缀的特殊 attribute。
指令 attribute 的期望值为一个 JavaScript 表达式 (除了 v-for、v-on 和 v-slot 例外)。一个指令的任务是在其表达式的值变化时响应式地更新 DOM。
以 v-if 为例：v-if 指令会基于表达式 seen 的值的真假来移除/插入该 <p> 元素

```html
<p v-if="seen">Now you see me</p>
```

某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识。

```html
<a v-bind:href="url"> ... </a>

<!-- 简写 -->
<a :href="url"> ... </a>
```

另一个例子是 v-on 指令，它将监听 DOM 事件：这里的参数是要监听的事件名称

```html
<a v-on:click="doSomething"> ... </a>

<!-- 简写 -->
<a @click="doSomething"> ... </a>
```

同样在指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内：

```html
<!--
注意，参数表达式有一些约束，
参见下面“动态参数值的限制”与“动态参数语法的限制”章节的解释
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- 简写 -->
<a :[attributeName]="url"> ... </a>
```

将一个函数绑定到动态的事件名称上：

```html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- 简写 -->
<a @[eventName]="doSomething"></a>
```

修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。
如 .prevent 修饰符会告知 v-on 指令对触发的事件调用 event.preventDefault()：

```html
<form @submit.prevent="onSubmit">...</form>
```

3. 响应式基础

3.1 声明响应式状态

在组合式 API 中，推荐使用 ref() 函数来声明响应式状态：

```js
import { ref } from "vue";

const count = ref(0);
```

ref() 接收参数，并将其包裹在一个带有 .value 属性的 ref 对象中返回：

```js
const count = ref(0);

console.log(count); // { value: 0 }
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
```

要在组件模板中访问 ref，请从组件的 setup() 函数中声明并返回它们：

```js
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);

    function increment() {
      // 在 JavaScript 中需要 .value
      count.value++;
    }

    // 不要忘记同时暴露 increment 函数
    return {
      count,
      increment,
    };
  },
};
```

在模板中使用 ref 时，我们不需要附加 .value。ref 会自动解包 (有一些注意事项)。

你也可以直接在事件监听器中改变一个 ref：

```html
<button @click="count++">{{ count }}</button>
```

在 setup() 函数中手动暴露大量的状态和方法非常繁琐。幸运的是，我们可以通过使用单文件组件 (SFC) 来避免这种情况。我们可以使用 <script setup> 来大幅度地简化代码：

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

为什么我们需要使用带有 .value 的 ref，而不是普通的变量？需要了解 Vue 的响应式系统是如何工作的。

.value 属性给予了 Vue 一个机会来检测 ref 何时被访问或修改。在其内部，Vue 在它的 getter 中执行追踪，在它的 setter 中执行触发。从概念上讲，你可以将 ref 看作是一个像这样的对象：

另一个 ref 的好处是，与普通变量不同，你可以将 ref 传递给函数，同时保留对最新值和响应式连接的访问。

```js
// 伪代码，不是真正的实现
const myRef = {
  _value: 0,
  get value() {
    track();
    return this._value;
  },
  set value(newValue) {
    this._value = newValue;
    trigger();
  },
};
```

Ref 会使它的值具有深层响应性。这意味着即使改变嵌套对象或数组时，变化也会被检测到：

提示：也可以通过 shallow ref 来放弃深层响应性。对于浅层 ref，只有 .value 的访问会被追踪。浅层 ref 可以用于避免对大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况。

```js
import { ref } from "vue";

const obj = ref({
  nested: { count: 0 },
  arr: ["foo", "bar"],
});

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++;
  obj.value.arr.push("baz");
}
```

DOM 更新时机

当你修改响应式状态时，DOM 会被自动更新。但 DOM 更新不是同步的。Vue 会在“next tick”更新周期中缓冲所有状态的修改，以确保不管进行了多少次状态修改，每个组件都只会被更新一次。

要等待 DOM 更新完成后再执行额外的代码，可以使用 nextTick() 全局 API：

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```

3.2 reactive()

响应式对象是 JavaScript 代理，其行为就和普通对象一样。不同的是，Vue 能够拦截对响应式对象所有属性的访问和修改，以便进行依赖追踪和触发更新。

reactive() 将深层地转换对象：当访问嵌套对象时，它们也会被 reactive() 包装。当 ref 的值是一个对象时，ref() 也会在内部调用它。与浅层 ref 类似，这里也有一个 shallowReactive() API 可以选择退出深层响应性。

值得注意的是，reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的：

```js
const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
```

为保证访问代理的一致性，对同一个原始对象调用 reactive() 会总是返回同样的代理对象，而对一个已存在的代理对象调用 reactive() 会返回其本身：

```js
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
```

这个规则对嵌套对象也适用。依靠深层响应性，响应式对象内的嵌套对象依然是代理：

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

reactive() API 有一些局限性,由于这些限制，我们建议使用 ref() 作为声明响应式状态的主要 API。

有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。

不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失：

```js
let state = reactive({ count: 0 })

// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({ count: 1 })
```

对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：

```js
const state = reactive({ count: 0 })

// 当解构时，count 已经与 state.count 断开连接
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
callSomeFunction(state.count)
```

3.3 额外的 ref 解包细节

一个 ref 会在作为响应式对象的属性被访问或修改时自动解包。换句话说，它的行为就像一个普通的属性：

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的 ref：

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// 原始 ref 现在已经和 state.count 失去联系
console.log(count.value) // 1
```

与 reactive 对象不同的是，当 ref 作为响应式数组或原生集合类型(如 Map) 中的元素被访问时，它不会被解包：

```js
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)
```

在模板渲染上下文中，只有顶级的 ref 属性才会被解包。

在下面的例子中，count 和 object 是顶级属性，但 object.id 不是：

```js
const count = ref(0)
const object = { id: ref(1) }
```

这个表达式按预期工作：

```html
{{ count + 1 }}
```

但这个不会

```html
{{ object.id + 1 }}
<!-- [object Object]1 -->
```

另一个需要注意的点是，如果 ref 是文本插值的最终计算值 (即 {{ }} 标签)，那么它将被解包，因此以下内容将渲染为 1：

```html
{{ object.id }}
<!-- 等价于 {{ object.id.value }}。 -->
```

4. 计算属性

4.1 基础示例

使用计算属性来描述依赖响应式状态的复杂逻辑。

computed() 方法期望接收一个 getter 函数，返回值为一个计算属性 ref。示例：

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

4.2 计算属性缓存 vs 方法

计算属性值会基于其响应式依赖被缓存。相比之下，方法调用总是会在重渲染发生时再次执行函数。

这也解释了为什么下面的计算属性永远不会更新，因为 Date.now() 并不是一个响应式依赖：

```js
const now = computed(() => Date.now())
```

4.3 可写计算属性

计算属性默认是只读的。可以通过同时提供 getter 和 setter 来创建：

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

4.4 最佳实践

计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，不要在 getter 中做异步请求或者更改 DOM！

计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。

5. 类与样式绑定

5.1 绑定 HTML class

我们可以给 :class (v-bind:class 的缩写) 传递一个对象来动态切换 class：

```html
<div :class="{ active: isActive }"></div>
```

绑定的对象并不一定需要写成内联字面量的形式，也可以直接绑定一个对象：

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

```vue
<div :class="classObject"></div>
```

我们可以给 :class 绑定一个数组来渲染多个 CSS class：

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

```vue
<div :class="[activeClass, errorClass]"></div>
```

如果你也想在数组中有条件地渲染某个 class，你可以使用三元表达式：

```vue
<div :class="[isActive ? activeClass : '', errorClass]"></div>
<!-- 等于 -->
<div :class="[{ active: isActive }, errorClass]"></div>
```

如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 $attrs 属性来实现指定：

```vue
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

```vue
<MyComponent class="baz" />
```

```vue
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

5.2 绑定内联样式

:style 支持绑定 JavaScript 对象值，对应的是 HTML 元素的 style 属性：

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

```vue
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

直接绑定一个样式对象通常是一个好主意，这样可以使模板更加简洁：

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
```

```vue
<div :style="styleObject"></div>
```

我们还可以给 :style 绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上：

```vue
<div :style="[baseStyles, overridingStyles]"></div>
```

6. 条件渲染

6.1 v-if、v-else、v-else-if

v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。

```vue
<h1 v-if="awesome">Vue is awesome!</h1>
```

你也可以使用 v-else 为 v-if 添加一个“else 区块”。

一个 v-else 元素必须跟在一个 v-if 或者 v-else-if 元素后面，否则它将不会被识别。

```vue
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

v-else-if 提供的是相应于 v-if 的“else if 区块”。它可以连续多次重复使用：

和 v-else 类似，一个使用 v-else-if 的元素必须紧跟在一个 v-if 或一个 v-else-if 元素后面。

```vue
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

如果我们想要切换不止一个元素呢？在这种情况下我们可以在一个 <template> 元素上使用 v-if，这只是一个不可见的包装器元素，最后渲染的结果并不会包含这个 <template> 元素。

v-else 和 v-else-if 也可以在 <template> 上使用。

```vue
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

6.2 v-show

另一个可以用来按条件显示一个元素的指令是 v-show。其用法基本一样。

不同之处在于 v-show 会在 DOM 渲染中保留该元素；v-show 仅切换了该元素上名为 display 的 CSS 属性。

v-show 不支持在 <template> 元素上使用，也不能和 v-else 搭配使用。

6.3 v-if vs v-show

v-if 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。

v-if 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。

相比之下，v-show 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS display 属性会被切换。

总的来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适。

6.3 v-if 和 v-for

同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显。

当 v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行。

7. 列表渲染

7.1 v-for

使用 v-for 指令基于一个数组来渲染一个列表。

```js
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

```vue
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

你也可以使用 of 作为分隔符来替代 in，这更接近 JavaScript 的迭代器语法：

```vue
<div v-for="item of items"></div>
```

7.2 v-for 与对象

你也可以使用 v-for 来遍历一个对象的所有属性。遍历的顺序会基于对该对象调用 Object.keys() 的返回值来决定。

```js
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

```vue
<!-- 第二个参数表示属性名,第三个参数表示位置索引 -->
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

7.3 在 v-for 里使用范围值

v-for 可以直接接受一个整数值。在这种用例中，会将该模板基于 1...n 的取值范围重复多次。

注意此处 n 的初值是从 1 开始而非 0。

```vue
<span v-for="n in 10">{{ n }}</span>
```

7.4 <template> 上的 v-for

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

7.5 v-for 与 v-if

当它们同时存在于一个节点上时，v-if 比 v-for 的优先级更高。这意味着 v-if 的条件将无法访问到 v-for 作用域内定义的变量别名：

```html
<!--
 这会抛出一个错误，因为属性 todo 此时
 没有在该实例上定义
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

在外新包装一层 <template> 再在其上使用 v-for 可以解决这个问题 (这也更加明显易读)：

```html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

7.6 通过 key 管理状态

Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表。当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。

默认模式是高效的，但只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况。

为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的 key attribute。

推荐在任何可行的时候为 v-for 提供一个 key attribute。

key 绑定的值期望是一个基础类型的值，例如字符串或 number 类型。不要用对象作为 v-for 的 key。

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

7.7 数组变化侦测

Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新。这些变更方法包括：push()，pop()，shift()，unshift()，splice()，sort()，reverse()。

不可变 (immutable) 方法，例如 filter()，concat() 和 slice()，这些都不会更改原数组，而总是返回一个新数组。

7.8 展示过滤或排序后的结果

有时，我们希望显示数组经过过滤或排序后的内容，而不实际变更或重置原始数据。在这种情况下，你可以创建返回已过滤或已排序数组的计算属性。

```js
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
```

```html
<li v-for="n in evenNumbers">{{ n }}</li>
```

8. 事件处理

8.1 监听事件

使用 v-on 指令 (简写为 @) 来监听 DOM 事件

内联事件处理器：事件被触发时执行的内联 JavaScript 语句 (与 onclick 类似)。

方法事件处理器：一个指向组件上定义的方法的属性名或是路径。

8.2 内联事件处理器

```js
const count = ref(0)
```

```html
<button @click="count++">Add 1</button>
```

8.3 方法事件处理器

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName)
  }
}
```

```html
<!-- `greet` 是上面定义过的方法名 -->
<button @click="greet">Greet</button>
```

模板编译器会通过检查 v-on 的值是否是合法的 JavaScript 标识符或属性访问路径来断定是何种形式的事件处理器。举例来说，foo、foo.bar 和 foo['bar'] 会被视为方法事件处理器，而 foo() 和 count++ 会被视为内联事件处理器。

8.4 在内联处理器中调用方法

允许我们向方法传入自定义参数以代替原生事件：

```js
function say(message) {
  alert(message)
}
```

```html
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

8.5 在内联事件处理器中访问事件参数

在内联事件处理器中访问原生 DOM 事件。向该处理器方法传入一个特殊的 $event 变量，或者使用内联箭头函数：

```html
<!-- 使用特殊的 $event 变量 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

```js
function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

8.6 事件修饰符

在处理事件时调用 event.preventDefault() 或 event.stopPropagation() 是很常见的。尽管我们可以直接在方法内调用，但如果方法能更专注于数据逻辑而不用去处理 DOM 事件的细节会更好。

为解决这一问题，Vue 为 v-on 提供了事件修饰符。修饰符是用 . 表示的指令后缀，包含以下这些：.stop，.prevent，.self，.capture，.once，.passive

```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>
```

.capture、.once 和 .passive 修饰符与原生 addEventListener 事件相对应：

```html
<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<!-- .passive 修饰符一般用于触摸事件的监听器，可以用来改善移动端设备的滚屏性能。 -->
<div @scroll.passive="onScroll">...</div>
```

8.7 按键修饰符

.enter，.tab，.delete (捕获“Delete”和“Backspace”两个按键)，.esc，.space，.up，.down，.left，.right

```html
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />
```

9.  表单输入绑定



10. 生命周期
11. 侦听器
12. 模板引用
13. 组件基础

三 深入组件

1. 注册
2. Props
3. 事件
4. 组件 v-model
5. 透传 Attributes
6. 插槽
7. 依赖注入
8. 异步组件

四 逻辑复用

1. 组合式函数
2. 自定义指令
3. 插件

五 内置组件

1. Transition
2. TransitionGroup
3. KeepAlive
4. Teleport
5. Suspense

六 应用规模化

1. 单文件组件
2. 工具链
3. 路由
4. 状态管理
5. 测试
6. 服务端渲染（SSR）

七 最佳实践

1. 生产部署
2. 性能优化
3. 无障碍访问
4. 安全

八 TypeScript

1. 总览
2. TS 与组合式 Api
3. Ts 与选项式 Api

九 进阶主题

1. 使用 Vue 的多种方式
2. 组合式 Api 常见问答
3. 深入响应式系统
4. 渲染机制
5. 渲染函数 & JSX
6. Vue 与 Web Components
7. 动画技巧
