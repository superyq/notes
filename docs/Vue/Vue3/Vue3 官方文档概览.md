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
import { nextTick } from "vue";

async function increment() {
  count.value++;
  await nextTick();
  // 现在 DOM 已经更新了
}
```

3.2 reactive()

响应式对象是 JavaScript 代理，其行为就和普通对象一样。不同的是，Vue 能够拦截对响应式对象所有属性的访问和修改，以便进行依赖追踪和触发更新。

reactive() 将深层地转换对象：当访问嵌套对象时，它们也会被 reactive() 包装。当 ref 的值是一个对象时，ref() 也会在内部调用它。与浅层 ref 类似，这里也有一个 shallowReactive() API 可以选择退出深层响应性。

值得注意的是，reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的：

```js
const raw = {};
const proxy = reactive(raw);

// 代理对象和原始对象不是全等的
console.log(proxy === raw); // false
```

为保证访问代理的一致性，对同一个原始对象调用 reactive() 会总是返回同样的代理对象，而对一个已存在的代理对象调用 reactive() 会返回其本身：

```js
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy); // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy); // true
```

这个规则对嵌套对象也适用。依靠深层响应性，响应式对象内的嵌套对象依然是代理：

```js
const proxy = reactive({});

const raw = {};
proxy.nested = raw;

console.log(proxy.nested === raw); // false
```

reactive() API 有一些局限性,由于这些限制，我们建议使用 ref() 作为声明响应式状态的主要 API。

有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。

不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失：

```js
let state = reactive({ count: 0 });

// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({ count: 1 });
```

对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：

```js
const state = reactive({ count: 0 });

// 当解构时，count 已经与 state.count 断开连接
let { count } = state;
// 不会影响原始的 state
count++;

// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
callSomeFunction(state.count);
```

3.3 额外的 ref 解包细节

一个 ref 会在作为响应式对象的属性被访问或修改时自动解包。换句话说，它的行为就像一个普通的属性：

```js
const count = ref(0);
const state = reactive({
  count,
});

console.log(state.count); // 0

state.count = 1;
console.log(count.value); // 1
```

如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的 ref：

```js
const otherCount = ref(2);

state.count = otherCount;
console.log(state.count); // 2
// 原始 ref 现在已经和 state.count 失去联系
console.log(count.value); // 1
```

与 reactive 对象不同的是，当 ref 作为响应式数组或原生集合类型(如 Map) 中的元素被访问时，它不会被解包：

```js
const books = reactive([ref("Vue 3 Guide")]);
// 这里需要 .value
console.log(books[0].value);

const map = reactive(new Map([["count", ref(0)]]));
// 这里需要 .value
console.log(map.get("count").value);
```

在模板渲染上下文中，只有顶级的 ref 属性才会被解包。

在下面的例子中，count 和 object 是顶级属性，但 object.id 不是：

```js
const count = ref(0);
const object = { id: ref(1) };
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
import { reactive, computed } from "vue";

const author = reactive({
  name: "John Doe",
  books: [
    "Vue 2 - Advanced Guide",
    "Vue 3 - Basic Guide",
    "Vue 4 - The Mystery",
  ],
});

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? "Yes" : "No";
});
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
const now = computed(() => Date.now());
```

4.3 可写计算属性

计算属性默认是只读的。可以通过同时提供 getter 和 setter 来创建：

```vue
<script setup>
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

const fullName = computed({
  // getter
  get() {
    return firstName.value + " " + lastName.value;
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});
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
  "text-danger": false,
});
```

```vue
<div :class="classObject"></div>
```

我们可以给 :class 绑定一个数组来渲染多个 CSS class：

```js
const activeClass = ref("active");
const errorClass = ref("text-danger");
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
const activeColor = ref("red");
const fontSize = ref(30);
```

```vue
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

直接绑定一个样式对象通常是一个好主意，这样可以使模板更加简洁：

```js
const styleObject = reactive({
  color: "red",
  fontSize: "13px",
});
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
const parentMessage = ref("Parent");
const items = ref([{ message: "Foo" }, { message: "Bar" }]);
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
  title: "How to do lists in Vue",
  author: "Jane Doe",
  publishedAt: "2016-04-10",
});
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
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo.name }}</li>
```

在外新包装一层 <template> 再在其上使用 v-for 可以解决这个问题 (这也更加明显易读)：

```html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">{{ todo.name }}</li>
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
const numbers = ref([1, 2, 3, 4, 5]);

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0);
});
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
const count = ref(0);
```

```html
<button @click="count++">Add 1</button>
```

8.3 方法事件处理器

```js
const name = ref("Vue.js");

function greet(event) {
  alert(`Hello ${name.value}!`);
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName);
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
  alert(message);
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
<button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>

<!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

```js
function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault();
  }
  alert(message);
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

前端处理表单时，手动连接值绑定和更改事件监听器可能会很麻烦：

```html
<input :value="text" @input="event => text = event.target.value" />
```

v-model 指令帮我们简化了这一步骤：

```html
<input v-model="text" />
```

v-model 可根据所使用的元素自动使用对应的 DOM 属性和事件组合：

```docs
文本类型的 <input> 和 <textarea> 元素会绑定 value property 并侦听 input 事件；
<input type="checkbox"> 和 <input type="radio"> 会绑定 checked property 并侦听 change 事件；
<select> 会绑定 value property 并侦听 change 事件。
```

9.1 基本用法

```html
<!-- 文本 -->
<input v-model="message" placeholder="edit me" />

<!-- 多行文本 -->
<textarea v-model="message" placeholder="add multiple lines"></textarea>

<!-- 复选框 -->
<input type="checkbox" id="checkbox" v-model="checked" />

<!-- 单选按钮 -->
<input type="radio" id="one" value="One" v-model="picked" />

<!-- 选择器 -->
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

9.2 值绑定

```html
<!-- 复选框 -->
<!-- true-value 和 false-value 是 Vue 特有的 attributes，仅支持和 v-model 配套使用。 -->
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />

<!-- 单选按钮 -->
<!-- pick 会在第一个按钮选中时被设为 first，在第二个按钮选中时被设为 second。 -->
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />

<!-- 选择器选项 -->
<!-- v-model 同样也支持非字符串类型的值绑定！在上面这个例子中，当某个选项被选中，selected 会被设为该对象字面量值 { number: 123 }。 -->
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```

9.3 修饰符

```html
<!-- .lazy -->
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />

<!-- .number -->
<!-- 让用户输入自动转换为数字 -->
<input v-model.number="age" />

<!-- .trim -->
<!-- 默认自动去除用户输入内容中两端的空格 -->
<input v-model.trim="msg" />
```

10. 生命周期

Vue 组件实例在创建时的初始化步骤，比如数据侦听，编译模板，挂载实例到 DOM，以及在数据改变时更新 DOM。
在此过程中，它也会运行被称为生命周期钩子的函数，让开发者有机会在特定阶段运行自己的代码。

10.1 注册周期钩子

最常用的是 onMounted、onUpdated 和 onUnmounted

```html
<script setup>
  import { onMounted, onUpdated, onUnmounted } from "vue";

  // onMounted 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码：
  onMounted(() => {
    console.log(`the component is now mounted.`);
  });

  // 在组件因为响应式状态变更而更新其 DOM 树之后调用。
  onUpdated(() => {
    // 文本内容应该与当前的 `count.value` 一致
    console.log(document.getElementById("count").textContent);
  });

  // 在组件实例被卸载之后调用。
  let intervalId;
  onMounted(() => {
    intervalId = setInterval(() => {
      // ...
    });
  });
  onUnmounted(() => clearInterval(intervalId));
</script>
```

11. 侦听器

11.1 基本示例

```html
<script setup>
  import { ref, watch } from "vue";

  const question = ref("");
  const answer = ref("Questions usually contain a question mark. ;-)");
  const loading = ref(false);

  // 可以直接侦听一个 ref
  watch(question, async (newQuestion, oldQuestion) => {
    if (newQuestion.includes("?")) {
      loading.value = true;
      answer.value = "Thinking...";
      try {
        const res = await fetch("https://yesno.wtf/api");
        answer.value = (await res.json()).answer;
      } catch (error) {
        answer.value = "Error! Could not reach the API. " + error;
      } finally {
        loading.value = false;
      }
    }
  });
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

watch 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组：

```js
const x = ref(0);
const y = ref(0);

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});
```

注意，你不能直接侦听响应式对象的属性值，例如:

```js
const obj = reactive({ count: 0 });

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`);
});
```

这里需要用一个返回该属性的 getter 函数：

```js
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`);
  }
);
```

11.2 深层侦听器

直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发：

```js
const obj = reactive({ count: 0 });

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
});

obj.count++;
```

11.3 即时回调的侦听器

watch 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。

```js
watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }
);
```

11.4 watchEffect()

侦听器的回调使用与源完全相同的响应式状态是很常见的。如下：

```js
const todoId = ref(1);
const data = ref(null);

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    );
    data.value = await response.json();
  },
  { immediate: true }
);
```

可以用 watchEffect 函数 来简化上面的代码。

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  );
  data.value = await response.json();
});
```

11.5 回调的触发时机

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。

默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 flush: 'post' 选项：

```js
watch(source, callback, {
  flush: "post",
});

watchEffect(callback, {
  flush: "post",
});
```

后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()：

```js
import { watchPostEffect } from "vue";

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
});
```

11.6 停止侦听器

要手动停止一个侦听器，请调用 watch 或 watchEffect 返回的函数：

```js
const unwatch = watchEffect(() => {});

// ...当该侦听器不再需要时
unwatch();
```

注意，需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：

```js
// 需要异步请求得到的数据
const data = ref(null);

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
});
```

12. 模板引用

当我们需要直接访问底层 DOM 元素。我们可以使用特殊的 ref attribute：

ref 是一个特殊的 attribute，它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。这可能很有用，比如说在组件挂载时将焦点设置到一个 input 元素上，或在一个元素上初始化一个第三方库。

```html
<input ref="input" />
```

12.1 访问模板引用

为了通过组合式 API 获得该模板引用，我们需要声明一个同名的 ref：

```html
<script setup>
  import { ref, onMounted } from "vue";

  // 声明一个 ref 来存放该元素的引用
  // 必须和模板里的 ref 同名
  const input = ref(null);

  onMounted(() => {
    input.value.focus();
  });
</script>

<template>
  <input ref="input" />
</template>
```

注意，你只可以在组件挂载后才能访问模板引用。如果你想在模板中的表达式上访问 input，在初次渲染时会是 null。这是因为在初次渲染前这个元素还不存在呢！

如果你需要侦听一个模板引用 ref 的变化，确保考虑到其值为 null 的情况：

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus();
  } else {
    // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
  }
});
```

12.2 v-for 中的模板引用

当在 v-for 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素：

```html
<script setup>
  import { ref, onMounted } from "vue";

  const list = ref([
    /* ... */
  ]);

  const itemRefs = ref([]);

  onMounted(() => console.log(itemRefs.value));
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">{{ item }}</li>
  </ul>
</template>
```

12.3 函数模板引用

除了使用字符串值作名字，ref attribute 还可以绑定为一个函数，会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数：

注意我们这里需要使用动态的 :ref 绑定才能够传入一个函数。当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数会是 null。你当然也可以绑定一个组件方法而不是内联函数。

```html
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }" />
```

12.4 组件上的 ref

如果一个子组件使用的是选项式 API 或没有使用 <script setup>，被引用的组件实例和该子组件的 this 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权。

使用了 <script setup> 的组件是默认私有的：一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西，除非子组件在其中通过 defineExpose 宏显式暴露：

当父组件通过模板引用获取到了该组件的实例时，得到的实例类型为 { a: number, b: number }

```html
<script setup>
  import { ref } from "vue";

  const a = 1;
  const b = ref(2);

  // 像 defineExpose 这样的编译器宏不需要导入
  defineExpose({
    a,
    b,
  });
</script>
```

13. 组件基础

组件允许我们将 UI 划分为独立的、可重用的部分，并且可以对每个部分进行单独的思考。

13.1 定义一个组件

当使用构建步骤时，一个单独的 .vue 文件被叫做单文件组件 (简称 SFC)：

```html
<script setup>
  import { ref } from "vue";

  const count = ref(0);
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

当不使用构建步骤时，一个 Vue 组件以一个包含 Vue 特定选项的 JavaScript 对象来定义：

```js
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);
    return { count };
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`,
  // 也可以针对一个 DOM 内联模板：
  // template: '#my-template-element'
};
```

13.2 使用组件

每一个组件都维护着自己的状态，这是因为每当你使用一个组件，就创建了一个新的实例。

通过 <script setup>，导入的组件都在模板中直接可用。

```vue
<script setup>
import ButtonCounter from "./ButtonCounter.vue";
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

在单文件组件中，推荐为子组件使用 PascalCase 的标签名，以此来和原生的 HTML 元素作区分。

```vue
<ButtonCounter />
```

在 DOM 中书写模板 (例如原生 <template> 元素的内容)，模板的编译需要遵从浏览器中 HTML 的解析行为。需要使用 kebab-case 形式并显式地关闭这些组件的标签。

```html
<button-counter></button-counter>
```

13.3 传递 props

相同的组件，展示不同的数据，就会使用到 props。

Props 是一种特别的 attributes，在组件上声明注册，要用到 defineProps 宏：

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(["title"]);
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

defineProps 是一个仅 <script setup> 中可用的编译宏命令，并不需要显式地导入。defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props：

```js
const props = defineProps(["title"]);
console.log(props.title);
```

如果你没有使用 <script setup>，props 必须以 props 选项的方式声明，props 对象会作为 setup() 函数的第一个参数被传入：

```js
export default {
  props: ["title"],
  setup(props) {
    console.log(props.title);
  },
};
```

13.4 监听事件

子组件可以通过调用内置的 $emit 方法，通过传入事件名称来抛出一个事件：

```vue
<!-- BlogPost.vue, 省略了 <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```

我们可以通过 defineEmits 宏来声明需要抛出的事件：

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(["title"]);
defineEmits(["enlarge-text"]);
</script>
```

和 defineProps 类似，defineEmits 仅可用于 <script setup> 之中，并且不需要导入，它返回一个等同于 $emit 方法的 emit 函数。它可以被用于在组件的 <script setup> 中抛出事件，因为此处无法直接访问 $emit：

```vue
<script setup>
const emit = defineEmits(["enlarge-text"]);

emit("enlarge-text");
</script>
```

如果你没有在使用 <script setup>，你可以通过 emits 选项定义组件会抛出的事件。你可以从 setup() 函数的第二个参数，即 setup 上下文对象上访问到 emit 函数：

```js
export default {
  emits: ["enlarge-text"],
  setup(props, ctx) {
    ctx.emit("enlarge-text");
  },
};
```

13.5 通过插槽来分配内容

一些情况下我们会希望能和 HTML 元素一样向组件中传递内容：

```vue
<AlertBox> Something bad happened. </AlertBox>
```

可以通过 Vue 的自定义 <slot> 元素来实现：

```vue
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

13.6 动态组件

有些场景会需要在两个组件间来回切换，比如 Tab 界面：

当使用 <component :is="..."> 来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过 <KeepAlive> 组件强制被切换掉的组件仍然保持“存活”的状态。

```vue
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```

三 深入组件

1. 注册

1.1 全局注册

使用 .component() 方法，让组件在全局可用。

```js
import { createApp } from "vue";

const app = createApp({});

app.component(
  // 注册的名字
  "MyComponent",
  // 组件的实现
  {
    /* ... */
  }
);
```

.component() 方法可以被链式调用：

```js
app
  .component("ComponentA", ComponentA)
  .component("ComponentB", ComponentB)
  .component("ComponentC", ComponentC);
```

注意：全局注册虽然很方便，但有以下几个问题：1. 如果你全局注册了一个组件，即使它并没有被实际使用，它仍然会出现在打包后的 JS 文件中。2. 全局注册使依赖关系变得不那么明确。不太容易定位子组件的实现。

1.2 局部注册

在使用 <script setup> 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：

```vue
<script setup>
import ComponentA from "./ComponentA.vue";
</script>

<template>
  <ComponentA />
</template>
```

如果没有使用 <script setup>，则需要使用 components 选项来显式注册：

```js
import ComponentA from "./ComponentA.js";

export default {
  components: {
    ComponentA,
  },
  setup() {
    // ...
  },
};
```

1.3 组件名格式

使用 PascalCase 作为组件名的注册格式。

2. Props

2.1 Props 声明

显示声明 props，用以区分 props 和透传 attribute

在 <script setup> 中，使用 defineProps() 宏来声明：

```vue
<script setup>
const props = defineProps(["foo"]);

console.log(props.foo);
</script>
```

在没有 <script setup> 中，使用 props 选项来声明：

```js
export default {
  props: ["foo"],
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.foo);
  },
};
```

可以使用对象的形式声明 prop：

```js
// 使用 <script setup>
defineProps({
  title: String,
  likes: Number,
});
```

```js
// 非 <script setup>
export default {
  props: {
    title: String,
    likes: Number,
  },
};
```

2.2 传递 prop 的细节

如果一个 prop 的名字很长，应使用 camelCase 形式

```js
defineProps({
  greetingMessage: String,
});
```

向子组件传递 props 时，通常会将其写为 kebab-case 形式

```vue
<MyComponent greeting-message="hello" />
```

传递不同类型的值

```vue
<!-- 虽然 `42` 是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :likes="42" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :likes="post.likes" />

<!-- 仅写上 prop 但不传值，会隐式转换为 `true` -->
<BlogPost is-published />

<!-- 虽然 `false` 是静态的值，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :is-published="false" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :is-published="post.isPublished" />

<!-- 虽然这个数组是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :comment-ids="post.commentIds" />

<!-- 虽然这个对象字面量是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<!-- <BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics',
  }"
/> -->
```

一个对象绑定多个 prop

```js
const post = {
  id: 1,
  title: "My Journey with Vue",
};
```

```vue
<BlogPost v-bind="post" />
<!-- 等价于： -->
<BlogPost :id="post.id" :title="post.title" />
```

2.3 单向数据流

所有的 props 都遵循着单向绑定原则，若你在子组件中去更改一个 prop，Vue 会在控制台上向你抛出警告

两个场景可能导致你想要修改 prop：1.prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。2. 需要对传入的 prop 值做进一步的转换。

2.4 Prop 校验

```js
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true,
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100,
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: "hello" };
    },
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ["success", "warning", "danger"].includes(value);
    },
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return "Default function";
    },
  },
});
```

也可以用自定义的类或者构造函数去验证，校验 author prop 的值是否是 Person 类的一个实例。

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

defineProps({
  author: Person,
});
```

2.5 Boolean 类型转换

```vue
<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```

3. 事件

3.1 触发与监听事件

在组件的模板表达式中，可以直接使用 $emit 方法触发自定义事件

```vue
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

父组件通过@来监听事件：

```vue
<MyComponent @some-event="callback" />
```

3.2 事件参数

```vue
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

```vue
<!-- <MyButton @increase-by="(n) => (count += n)" /> -->
```

3.3 声明触发的事件

通过 defineEmits() 宏来声明要触发的事件：

```vue
<script setup>
defineEmits(["inFocus", "submit"]);
</script>
```

在 <template> 中使用的 $emit 方法不能在组件的 <script setup> 部分中使用，但 defineEmits() 会返回一个相同作用的函数供我们使用：

defineEmits() 宏不能在子函数中使用。它必须直接放置在 <script setup> 的顶级作用域下。

```vue
<script setup>
const emit = defineEmits(["inFocus", "submit"]);

function buttonClick() {
  emit("submit");
}
</script>
```

如果你显式地使用了 setup 函数而不是 <script setup>，则事件需要通过 emits 选项来定义

```js
export default {
  emits: ["inFocus", "submit"],
  setup(props, ctx) {
    ctx.emit("submit");
  },
};
```

3.4 事件校验

要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 emit 的内容，返回一个布尔值来表明事件是否合法。

```vue
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true;
    } else {
      console.warn("Invalid submit event payload!");
      return false;
    }
  },
});

function submitForm(email, password) {
  emit("submit", { email, password });
}
</script>
```

4. 组件 v-model

v-model 在原生元素上的用法

```vue
<input v-model="searchText" />
<!-- 展开 -->
<input :value="searchText" @input="searchText = $event.target.value" />
```

v-model 在组件上的用法

```vue
<!-- <CustomInput
  :model-value="searchText"
  @update:model-value="newValue => searchText = newValue"
/> -->
```

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

```vue
<CustomInput v-model="searchText" />
```

```vue
<!-- CustomInput.vue -->
<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <input v-model="value" />
</template>
```

4.1 v-model 的参数

```vue
<MyComponent v-model:title="bookTitle" />
```

```vue
<!-- MyComponent.vue -->
<script setup>
defineProps(["title"]);
defineEmits(["update:title"]);
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

4.2 多个 v-model 的绑定

```html
<UserName v-model:first-name="first" v-model:last-name="last" />
```

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String,
});

defineEmits(["update:firstName", "update:lastName"]);
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

4.3 处理 v-model 修饰符

```vue
<MyComponent v-model.capitalize="myText" />
```

```vue
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) },
});

const emit = defineEmits(["update:modelValue"]);

function emitValue(e) {
  let value = e.target.value;
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }
  emit("update:modelValue", value);
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

对于又有参数又有修饰符的 v-model 绑定，生成的 prop 名将是 arg + "Modifiers"。举例来说：

```html
<MyComponent v-model:title.capitalize="myText"></MyComponent>
```

```js
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title']) console.log(props.titleModifiers) // { capitalize: true }
```

5. 透传 Attributes

5.1 Attributes 继承

“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on 事件监听器。最常见的例子就是 class、style 和 id。

5.2 禁用 Attributes 继承

最常见的需要禁用 attribute 继承的场景就是 attribute 需要应用在根节点以外的其他元素上。

通过设置 inheritAttrs 选项为 false，你可以完全控制透传进来的 attribute 被如何使用。

```vue
<script setup>
defineOptions({
  inheritAttrs: false,
});
// ...setup 逻辑
</script>

<template>
  <div class="btn-wrapper">
    <button class="btn" v-bind="$attrs">click me</button>
  </div>
</template>
```

5.3 多根节点的 Attributes 继承

多个根节点的组件没有自动 attribute 透传行为。如果 $attrs 没有被显式绑定，将会抛出一个运行时警告。

如果 $attrs 被显式绑定，则不会有警告：

```html
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

5.4 在 JS 中访问透传 Attributes

使用 useAttrs() API 来访问一个组件的所有透传 attribute：

```vue
<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
</script>
```

6. 插槽

6.1 插槽内容与出口

<slot> 元素是一个插槽出口 (slot outlet)，标示了父元素提供的插槽内容 (slot content) 将在哪里被渲染。

```html
<button class="fancy-btn">
  <slot></slot>
  <!-- 插槽出口 -->
</button>
```

```html
<FancyButton>
  Click me!
  <!-- 插槽内容 -->
</FancyButton>
```

6.2 渲染作用域

插槽内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模板中定义的。举例来说：

插槽内容无法访问子组件的数据。

```vue
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

6.3 默认内容

在外部没有提供任何内容的情况下，可以为插槽指定默认内容。

```html
<button type="submit">
  <slot>
    Submit
    <!-- 默认内容 -->
  </slot>
</button>
```

6.4 具名插槽

一个组件中包含多个插槽出口，可以使用<slot> 元素的 attribute name，没有提供 name 的 <slot> 出口会隐式地命名为“default”。

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

要为具名插槽传入内容，我们需要使用一个含 v-slot 指令的 <template> 元素，并将目标插槽的名字传给该指令：

v-slot 有对应的简写 #，因此 <template v-slot:header> 可以简写为 <template #header>。

```html
<BaseLayout>
  <template #header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

6.5 动态插槽名

```html
<base-layout>
  <template v-slot:[dynamicSlotName]> ... </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]> ... </template>
</base-layout>
```

6.6 作用域插槽

在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。

默认作用域插槽

```html
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

```html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

具名作用域插槽，插槽 props 可以作为 v-slot 指令的值被访问到：v-slot:name="slotProps"。当使用缩写时是这样：

```html
<MyComponent>
  <template #header="headerProps"> {{ headerProps }} </template>

  <template #default="defaultProps"> {{ defaultProps }} </template>

  <template #footer="footerProps"> {{ footerProps }} </template>
</MyComponent>
```

向具名插槽中传入 props：

```html
<slot name="header" message="hello"></slot>
```

7. 依赖注入

7.1 Prop 逐级透传问题

多层级嵌套的组件，某个深层的子组件需要一个较远的祖先组件中的部分数据。如果仅使用 props 则必须将其沿着组件链逐级传递下去，这一问题被称为“prop 逐级透传”。

provide 和 inject 可以帮助我们解决这一问题。

7.2 Provide（提供）

```vue
<script setup>
import { provide } from "vue";

provide(/* 注入名 */ "message", /* 值 */ "hello!");
</script>
```

```js
import { provide } from "vue";

export default {
  setup() {
    provide(/* 注入名 */ "message", /* 值 */ "hello!");
  },
};
```

7.3 应用层 Provide

除了在一个组件中提供依赖，我们还可以在整个应用层面提供依赖：

```js
import { createApp } from "vue";

const app = createApp({});

app.provide(/* 注入名 */ "message", /* 值 */ "hello!");
```

7.4 Inject（注入）

```vue
<script setup>
import { inject } from "vue";

const message = inject("message");
</script>
```

```js
import { inject } from "vue";

export default {
  setup() {
    const message = inject("message");
    return { message };
  },
};
```

在注入一个值时不要求必须有提供者，那么我们应该声明一个默认值

```js
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject("message", "这是默认值");
```

7.5 和响应数据配合使用

建议尽可能将任何对响应式状态的变更都保持在供给方组件中。

```vue
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from "vue";

const location = ref("North Pole");

function updateLocation() {
  location.value = "South Pole";
}

provide("location", {
  location,
  updateLocation,
});
</script>
```

```vue
<!-- 在注入方组件 -->
<script setup>
import { inject } from "vue";

const { location, updateLocation } = inject("location");
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

如果你想确保提供的数据不能被注入方的组件更改，你可以使用 readonly()

```vue
<script setup>
import { ref, provide, readonly } from "vue";

const count = ref(0);
provide("read-only-count", readonly(count));
</script>
```

8. 异步组件

8.1 基本用法

仅在页面需要它渲染时才会调用加载内部实际组件的函数。实现延迟加载。

与普通组件一样，异步组件可以使用 app.component() 全局注册：

```js
app.component(
  "MyComponent",
  defineAsyncComponent(() => import("./components/MyComponent.vue"))
);
```

也可以直接在父组件中直接定义它们

```vue
<script setup>
import { defineAsyncComponent } from "vue";

const AdminPage = defineAsyncComponent(() =>
  import("./components/AdminPageComponent.vue")
);
</script>

<template>
  <AdminPage />
</template>
```

8.2 加载与错误状态

异步操作不可避免地会涉及到加载和错误状态

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import("./Foo.vue"),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000,
});
```

四 逻辑复用

1. 组合式函数

1.1 什么是 “组合式函数”

“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。

例如日期格式化函数。封装了无状态的逻辑，接收一些输入立刻返回所期望的输出。lodash 或是 date-fns 就是复用无状态逻辑的库。

1.2 鼠标跟踪器示例

使用组合式 API 实现鼠标跟踪功能

```js
// mouse.js
import { ref, onMounted, onUnmounted } from "vue";

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0);
  const y = ref(0);

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  // 通过返回值暴露所管理的状态
  return { x, y };
}
```

在组件中使用的方式：

```vue
<script setup>
import { useMouse } from "./mouse.js";

const { x, y } = useMouse();
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

一个组合式函数可以调用一个或多个其他的组合式函数。这样我们就可以用多个较小且逻辑独立的单元来组合形成复杂的逻辑。实际上，这正是为什么我们决定将实现了这一设计模式的 API 集合命名为组合式 API。

举例来说，我们可以将添加和清除 DOM 事件监听器的逻辑也封装进一个组合式函数中：

```js
// event.js
import { onMounted, onUnmounted } from "vue";

export function useEventListener(target, event, callback) {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}
```

```js
// mouse.js
import { ref } from "vue";
import { useEventListener } from "./event";

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  useEventListener(window, "mousemove", (event) => {
    x.value = event.pageX;
    y.value = event.pageY;
  });

  return { x, y };
}
```

1.3 异步状态示例

在做异步数据请求时，我们常常需要处理不同的状态：加载中、加载成功和加载失败。

1.4 约定和最佳实践

组合式函数约定用驼峰命名法命名，并以“use”作为开头。

使用 toValue() 工具函数处理 ref 或 getter 的参数。

```js
import { toValue } from "vue";

function useFeature(maybeRefOrGetter) {
  // 如果 maybeRefOrGetter 是一个 ref 或 getter，
  // 将返回它的规范化值。
  // 否则原样返回。
  const value = toValue(maybeRefOrGetter);
}
```

建议使用 ref 返回值，这样解包会保持响应性

```js
// x 和 y 是两个 ref
const { x, y } = useMouse();
```

确保在 onUnmounted() 时清理副作用。举例来说，如果一个组合式函数设置了一个事件监听器，它就应该在 onUnmounted() 中被移除 (就像我们在 useMouse() 示例中看到的一样)。

1.5 通过抽取组合式函数改变代码结构

组合式 API 会给予你足够的灵活性，让你可以基于逻辑问题将组件代码拆分成更小的函数

1.6 在选项式 API 中使用组合式函数

如果你正在使用选项式 API，组合式函数必须在 setup() 中调用。且其返回的绑定必须在 setup() 中返回，以便暴露给 this 及其模板：

```js
import { useMouse } from "./mouse.js";
import { useFetch } from "./fetch.js";

export default {
  setup() {
    const { x, y } = useMouse();
    const { data, error } = useFetch("...");
    return { x, y, data, error };
  },
  mounted() {
    // setup() 暴露的属性可以在通过 `this` 访问到
    console.log(this.x);
  },
  // ...其他选项
};
```

1.7 与其他模式的比较

和 Mixin 的对比，mixins 有三个主要的短板：不清晰的数据来源、命名空间冲突、隐式的跨 mixin 交流

和无渲染组件的对比：组合式函数不会产生额外的组件实例开销。当在整个应用中使用时，由无渲染组件产生的额外组件实例会带来无法忽视的性能开销。我们推荐在纯逻辑复用时使用组合式函数，在需要同时复用逻辑和视图布局时使用无渲染组件。

2. 自定义指令

2.1 介绍

自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑。

一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus(),
};
</script>

<template>
  <input v-focus />
</template>
```

在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令。

在没有使用 <script setup> 的情况下，自定义指令需要通过 directives 选项注册：

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    },
  },
};
```

将一个自定义指令全局注册到应用层级也是一种常见的做法：

```js
const app = createApp({});

// 使 v-focus 在所有组件中都可用
app.directive("focus", {
  /* ... */
});
```

2.2 指令钩子

一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {},
};
```

指令的钩子会传递以下几种参数：

el：指令绑定到的元素。这可以用于直接操作 DOM。
binding：一个对象，包含以下属性。
| value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
| oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
| arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
| modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
| instance：使用该指令的组件实例。
| dir：指令的定义对象。
vnode：代表绑定元素的底层 VNode。
prevNode：代表之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。

例子如下：

```html
<div v-example:foo.bar="baz"></div>
```

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}
```

2.3 简化形式

一般情况下指令仅仅需要 mounted 和 updated 实现相同行为，可以直接用一个函数定义指令：

```vue
<div v-color="color"></div>
```

```js
app.directive("color", (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value;
});
```

2.4 对象字面量

指令值可以接受一个 JS 对象字面量：

```vue
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive("demo", (el, binding) => {
  console.log(binding.value.color); // => "white"
  console.log(binding.value.text); // => "hello!"
});
```

2.5 在组件上使用

不推荐

3. 插件

3.1 接受

插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。下面是如何安装一个插件的示例：

```js
import { createApp } from "vue";

const app = createApp({});

app.use(myPlugin, {
  /* 可选的选项 */
});
```

一个插件可以是一个拥有 install() 方法的对象，也可以直接是一个安装函数本身。

安装函数会接收到安装它的应用实例和传递给 app.use() 的额外选项作为参数：

```js
const myPlugin = {
  install(app, options) {
    // 配置此应用
  },
};
```

插件没有严格定义的使用范围，但是插件发挥作用的常见场景主要包括以下几种：

| 通过 app.component() 和 app.directive() 注册一到多个全局组件或自定义指令。
| 通过 app.provide() 使一个资源可被注入进整个应用。
| 向 app.config.globalProperties 中添加一些全局实例属性或方法
| 一个可能上述三种都包含了的功能库 (例如 vue-router)。

3.2 编写一个插件

编写一个翻译函数，接收一个以 . 作为分隔符的 key 字符串。

```vue
<h1>{{ $translate('greetings.hello') }}</h1>
```

这个函数应当能够在任意模板中被全局调用。这一点可以通过在插件中将它添加到 app.config.globalProperties 上来实现：

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$translate = (key) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split(".").reduce((o, i) => {
        if (o) return o[i];
      }, options);
    };
  },
};
```

用于查找的翻译字典对象则应当在插件被安装时作为 app.use() 的额外参数被传入：

```js
import i18nPlugin from "./plugins/i18n";

app.use(i18nPlugin, {
  greetings: {
    hello: "Bonjour!",
  },
});
```

插件中的 Provide / Inject

```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.provide("i18n", options);
  },
};
```

插件用户就可以组件中以 i18n 为 key 注入并访问插件的选项对象了。

```vue
<script setup>
import { inject } from "vue";

const i18n = inject("i18n");

console.log(i18n.greetings.hello);
</script>
```

五 内置组件

1. Transition

Vue 提供了两个内置组件，可以帮助你制作基于状态变化的过渡和动画：

| <Transition> 会在一个元素或组件进入和离开 DOM 时应用动画。
| <TransitionGroup> 会在一个 v-for 列表中的元素或组件被插入，移动，或移除时应用动画。

1.1 <Transition> 组件

可以直接使用，无需注册。将过渡动画应用到通过默认插槽传递给的元素或组件上。动画过渡触发条件：v-if、v-show、<component>切换组件、改变特殊的 key 属性

最基本用法的示例：

```vue
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
```

```css
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

tip：<Transition> 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。

当一个 <Transition> 组件中的元素被插入或移除时，会发生下面这些事情：

| Vue 自动检测是否有 css 动画过渡，如果有就应用
| 如果有 JS 钩子，就自动调用
| 都没有，DOM 的插入、删除就在下一个动作

1.2 基于 CSS 的过渡效果

一共有 6 个应用于进入与离开过渡效果的 CSS class。

| v-enter-from：进入动画的起始状态。
| v-enter-active：进入动画的生效状态。
| v-enter-to：进入动画的结束状态。
| v-leave-from：离开动画的起始状态。
| v-leave-active：离开动画的生效状态。
| v-leave-to：离开动画的结束状态。

使用 name prop 自定义过渡效果名

```vue
<Transition name="fade">
  ...
</Transition>
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

CSS 的 transition，显示样式是 DOM 的 css 的样式，只需定义进入前，离开后的 css 即可。

```vue
<Transition name="slide-fade">
  <p v-if="show">hello</p>
</Transition>
```

```css
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

CSS 的 animation

```vue
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Hello here is some bouncy text!
  </p>
</Transition>
```

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
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

可以自定义过渡 class，在你想集成第三方 CSS 动画库时非常有用，比如 Animate.css：

enter-from-class
enter-active-class
enter-to-class
leave-from-class
leave-active-class
leave-to-class

```vue
<!-- 假设你已经在页面中引入了 Animate.css -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>
```

在深层级的元素上触发过渡效果。

```vue
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      Hello
    </div>
  </div>
</Transition>
```

```css
/* 应用于嵌套元素的规则 */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

/* 延迟嵌套元素的进入以获得交错效果 */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

/* ... 省略了其他必要的 CSS */
```

等待所有内部元素的过渡完成，传入 duration prop 来显式指定过渡的持续时间 (以毫秒为单位)。

```vue
<Transition :duration="550">...</Transition>
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

1.3 JS 钩子

```vue
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

```js
// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el) {}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done();
}

// 当进入过渡完成时调用。
function onAfterEnter(el) {}

// 当进入过渡在完成之前被取消时调用
function onEnterCancelled(el) {}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el) {}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done();
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el) {}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el) {}
```

如果仅有 JS 控制过渡，最好手动加上:css='false'，防止 CSS 规则意外干扰过渡。

```vue
<Transition ... :css="false">
  ...
</Transition>
```

1.4 可复用过渡效果

将 <Transition> 封装成组件

```vue
<!-- MyTransition.vue -->
<script>
// JavaScript 钩子逻辑...
</script>

<template>
  <!-- 包装内置的 Transition 组件 -->
  <Transition name="my-transition" @enter="onEnter" @leave="onLeave">
    <slot></slot>
    <!-- 向内传递插槽内容 -->
  </Transition>
</template>

<style>
/*
  必要的 CSS...
  注意：避免在这里使用 <style scoped>
  因为那不会应用到插槽内容上
*/
</style>
```

```vue
<MyTransition>
  <div v-if="show">Hello</div>
</MyTransition>
```

1.5 出现时过渡

在节点初次渲染时应用过渡效果，添加 appear

```vue
<Transition appear>
  ...
</Transition>
```

1.6 元素间过渡

可以通过 v-if、v-else、v-else-if 进行元素之间的过渡，只要保证只有一个元素被渲染即可。

```vue
<Transition>
  <button v-if="docState === 'saved'">Edit</button>
  <button v-else-if="docState === 'edited'">Save</button>
  <button v-else-if="docState === 'editing'">Cancel</button>
</Transition>
```

1.7 过渡模式

在几个元素切换时，进入和离开动画时同时开始的，就会出现布局问题，可以通过 position: absolute 解决，但是可能不符合需求，可以使用 mode 来解决。

```vue
<Transition mode="out-in">
  ...
</Transition>
```

1.8 组件间过渡

```vue
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

1.9 动态过渡

可以提前定义很多 css 动画和过渡，通过 name 进行动态过渡

```vue
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

2. TransitionGroup

用于给 v-for 列表元素的插入、移除、顺序改变添加动画。

2.1 和 <Transition> 的区别

有基本相同的 props、过渡 class、JS 钩子。

区别如下：

| 默认情况，不会渲染一个容器元素，可以指定 tag prop 作为一个容器渲染
| 过渡模式不可用，因为不是在互斥元素之间切换
| 列表元素必须有独一无二的 key
| CSS 过渡实在列表元素上，不是容器元素上

2.2 进入/离开动画

```vue
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

2.3 移动动画

上面的过渡，插入和移除元素周围元素会发生跳跃性的移动，不顺滑，可以添加额外的 CSS 规则来优化。

```css
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
```

2.4 渐进延迟列表动画

通过 JS 钩子读取元素的 data，实现渐进延迟动画

```vue
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```

基于 [GreenSock library](https://gsap.com/) 的动画示例：

```js
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: "1.6em",
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}
```

3. KeepAlive

作用是缓存被移除的组件实例。

3.1 基本使用

动态组件<component :is="activeComponent" />切换时，组件实例会被销毁，组件的状态会丢失，在切回来时，状态都被重置。如果需要保留组件的状态可以使用<KeepAlive>将需要缓存的组件包裹。

```vue
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

3.2 包含/排除

<KeepAlive> 默认缓存包含的所有组件，可以通过 include 和 exclude 来定制该行为。

```vue
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

TIP: 因为是根据 name 进行匹配的，所以组件需要显示声明一个 name 选项。在<script setup> 中，会根据文件名自动生成一个 name，无需手动生成。

3.3 最大缓存实例数

通过 max 设置最大缓存组件数，如果超过指定数，则最近没有被访问的缓存实例将被销毁。

```vue
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

3.4 缓存实例的生命周期

```vue
<script setup>
import { onActivated, onDeactivated } from "vue";

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
});

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
});
</script>
```

tips：onActivated 在组件挂载时也会调用，onDeactivated 组件卸载时也会调用。两个钩子不仅对根组件有效，对缓存树下的子孙组件也有效。

4. Teleport

可以传送组件内部模板到组件外部去。

4.1 基本用法

应用场景：组件的一部分在业务逻辑上看属于这个组件，但是在视图角度看，它应该被渲染在 Vue 应用的外部的其他地方。

例子：全屏的模态框。理想情况下，我们希望模态框和按钮在同一个组件上，但这样有个问题，就是该模态框会和按钮一样渲染在 DOM 结构很很深的地方，导致模态框的 CSS 布局代码就很难写。

带问题的写法，下面例子中，如果使用 position：fixed 有个条件，就是祖先元素不能设置 transform、perspective、filter 样式属性，如果设置了会破坏模态框的布局，还有个问题是模态框的 z-index 受限于它的容器，如果有其他元素与<div class="outer">重叠并有更高的 z-index，则模态框会被覆盖。

```html
<div class="outer">
  <h3>Tooltips with Vue 3 Teleport</h3>
  <div>
    <MyModal />
  </div>
</div>
```

```vue
<script setup>
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

可以使用<Teleport>解决此类问题，接受一个 to prop 来指定传送的位置，to 值可以是 CSS 选择器，也可以是 DOM 元素，如下，就是将代码片段传送到 body 标签下。

```vue
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

TIPS: to 目标必须已经存在与 DOM 中，理想是挂载到 VUE 应用 DOM 数外的元素，如果目标元素是 Vue 渲染的，需要确保挂载 Teleport 之前挂载该元素。

4.2 搭配组件使用

<Teleport> 只改变了渲染的 DOM 结构，不影响组件间的逻辑关系，props 和触发的事件照常工作。父组件的注入也会按预期。

4.3 禁用 Teleport

桌面端和移动端需要不同的展示。

```vue
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

4.4 多个 Teleport 共享目标

多个 Teleport 组件可以挂载到相同的目标元素上，顺序就是简单的顺序叠加。

```vue
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```

渲染后

```html
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

5. Suspense

实验性功能，用来协调对异步依赖的处理。

5.1 异步依赖

如下结构，渲染这些组件需要一些异步数据，如果没有 <Suspense>，每个组件都有自己的加载、报错、完成等状态。最坏的情况下，可能看到三个加载旋转按钮，然后在不同时间报错。

有了 <Suspense> 后，可以在等待多个组件异步依赖结果时，在顶层展示加载中或加载失败状态。

<Suspense>可以等待的异步依赖有两种：1. 带有异步 setup()钩子的组件，包含使用<script setup>时有顶层 await 表达式的组件。2. 异步组件

```
<Suspense>
└─ <Dashboard>
   ├─ <Profile>
   │  └─ <FriendStatus>（组件有异步的 setup()）
   └─ <Content>
      ├─ <ActivityFeed> （异步组件）
      └─ <Stats>（异步组件）
```

async setup()

```js
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```

如果使用 <script setup>，那么顶层 await 表达式会自动让该组件成为一个异步依赖：

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

5.2 加载中状态

5.3 事件
5.4 错误处理
5.5 和其他组件结合

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
