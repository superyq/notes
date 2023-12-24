# Vue3 官方文档概览

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

3.2 为什么使用 ref

为什么我们需要使用带有 .value 的 ref，而不是普通的变量？为了解释这一点，我们需要简单地讨论一下 Vue 的响应式系统是如何工作的。

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

4. 计算属性
5. 类与样式绑定
6. 条件渲染
7. 列表渲染
8. 事件处理
9. 表单输入绑定
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
