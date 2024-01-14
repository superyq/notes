# Vue3 官方文档概览

前言：参考[Vue 官方文档](https://cn.vuejs.org/guide/introduction.html)，之后文章主要学习组合式 API。

一 开始

1. 简介

1.1 什么是 Vue？

一款 JS 框架，并有两个核心功能：声明式渲染、响应性。

1.2 渐进式框架

根据不同的需求场景，使用不同方式的 Vue，比如：

| 无需构建步骤，直接引入 vuejs。
| 在任何页面中作为 Web Components 嵌入
| 使用构建步骤，单页应用 (SPA)
| 全栈 / 服务端渲染 (SSR)
| Jamstack / 静态站点生成 (SSG)
| 开发桌面端、移动端、WebGL，甚至是命令行终端中的界面

Vue 为什么可以称为“渐进式框架”：它是一个可以与你共同成长、适应你不同需求的框架。

1.3 单文件组件

单文件组件是 Vue 的标志性功能。

\*.vue、SFC 就是单文件组件：将一个组件的逻辑 (JS)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里。

1.4 API 风格

选项式 API（Options API）：包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。

组合式 API（Composition API）：使用导入的 API 函数来描述组件逻辑。通常会与 <script setup> 搭配使用。

综上：两种 API 是同一个底层系统构建的。选项式 API 是在组合式 API 的基础上实现的！

2. 快速上手

2.1 创建一个 Vue 应用

```js
// 安装并执行 create-vue，它是 Vue 官方的项目脚手架工具。
npm create vue@latest
```

2.2 通过 CDN 使用 Vue

可以用于增强静态的 HTML 或与后端框架集成。但将无法使用单文件组件 (SFC) 语法。

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

通过 CDN 以及原生 ES 模块使用 Vue：

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

使用导入映射表 (Import Maps) 来告诉浏览器如何定位到导入的 vue：

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

分割代码成单独的 JS 文件，以便管理。

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

注意：直接点击 index.html，会抛错误，因为 ES 模块不能通过 file:// 协议工作。只能通过 http:// 协议工作。需要启动一个本地的 HTTP 服务器，通过命令行在 HTML 文件所在文件夹下运行 npx serve。

二 基础

1. 创建一个 Vue 应用

1.1 应用实例

通过 createApp 函数创建 Vue 应用实例：

```js
import { createApp } from "vue";

const app = createApp({
  /* 根组件选项 */
});
```

1.2 根组件

createApp 需要传入一个根组件，其他组件将作为其子组件。

```js
import { createApp } from "vue";
// 从一个单文件组件中导入根组件
import App from "./App.vue";

const app = createApp(App);
```

1.3 挂载应用

调用 .mount() 方法，传入一个 DOM 元素或是 CSS 选择器。它的返回值是根组件实例而非应用实例。

```html
<div id="app"></div>
```

```js
app.mount("#app");
```

1.4 应用配置

注意：确保在挂载应用实例之前完成所有应用配置！

```js
// 应用实例的 .config 对象可以进行一些配置，例如配置错误处理器：用来捕获所有子组件上的错误：
app.config.errorHandler = (err) => {
  /* 处理错误 */
};

// 全局挂载组件
app.component("TodoDeleteButton", TodoDeleteButton);

// 全局属性的对象。
app.config.globalProperties.msg = "hello";
// 通过 this 访问
export default {
  mounted() {
    console.log(this.msg); // 'hello'
  },
};
```

1.5 多个应用实例

每个应用都拥有自己的用于配置和全局资源的作用域。

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

2.1 文本插值

最基本的数据绑定是文本插值，使用“Mustache”语法 (即双大括号)：

```html
<span>Message: {{ msg }}</span>
```

2.2 原始 HTML

双大括号会将数据解释为纯文本，若想插入 HTML，需要使用 v-html 指令。

安全警告：动态渲染 HTML 是很危险的，容易造成 XSS 漏洞。仅在内容安全可信时再使用 v-html，并且永远不要使用用户提供的 HTML 内容。

```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

2.3 Attribute 绑定

绑定 attribute，使用 v-bind 指令。

```html
<div v-bind:id="dynamicId"></div>
<!-- 简写 -->
<div :id="dynamicId"></div>
```

绑定多个值，通过不带参数的 v-bind。

```js
const objectOfAttrs = {
  id: "container",
  class: "wrapper",
};
```

```html
<div v-bind="objectOfAttrs"></div>
```

2.4 使用 JS 表达式

数据绑定都支持完整的 JS 表达式，也就是一段能够被求值的 JS 代码。一个简单的判断方法是是否可以合法地写在 return 后面。

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

2.5 指令 Directives

指 v- 前缀的特殊 attribute。它的值为 JS 表达式（v-for、v-on、v-slot 除外），指令值变化时响应式的更新 DOM，比如 v-if。

```html
<p v-if="seen">Now you see me</p>
```

带参数的指令，用':'隔开。

```html
<a v-bind:href="url"> ... </a>
<!-- 简写 -->
<a :href="url"> ... </a>
```

指令的参数，也可以动态绑定，用'[]'包裹。

```html
<a v-bind:[attributeName]="url"> ... </a>
<!-- 简写 -->
<a :[attributeName]="url"> ... </a>
```

带修饰符的指令，用'.'隔开。

```html
<!-- 触发的事件调用 event.preventDefault() -->
<form @submit.prevent="onSubmit">...</form>
```

3. 响应式基础

3.1 声明响应式状态

官方推荐使用 ref() 函数来声明响应式状态。

```js
import { ref } from "vue";

const count = ref(0);
```

ref() 接收参数，并返回一个带有 .value 属性的 ref 对象。

```js
const count = ref(0);

console.log(count); // { value: 0 }
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
```

在模板中使用 ref 变量，不需要添加 .value。ref 会自动解包。也可以直接在事件监听器中改变一个 ref。

```html
<button @click="count++">{{ count }}</button>
```

通过单文件组件（SFC），使用 <script setup> 来大幅度地简化代码。

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

为什么使用 ref，而不是普通的变量。这是因为 Vue 需要通过.value 属性来实现状态响应性。基础原理是在 getter 中追踪，在 setter 中触发。

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

reactive()，参数只能是对象类型，返回的是一个原始对象的 Proxy，它和原始对象是不相等的。

```js
const raw = {};
const proxy = reactive(raw);

// 代理对象和原始对象不是全等的
console.log(proxy === raw); // false
```

reactive() API 有一些局限性,官方建议使用 ref() 作为声明响应式状态的主要 API。博主个人还是喜欢 ref，reactive 混着用，注意哪些局限性就可以了。

局限性包括：只能用于对象类型（对象，数组，Map，Set）、不能替换整个对象、对结构操作不友好。

```js
// 不能替换整个对象
let state = reactive({ count: 0 });
// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({ count: 1 });

// 对解构不友好
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

一个 ref 会在作为响应式对象的属性被访问或修改时自动解包。

```js
const count = ref(0);
const state = reactive({
  count,
});

console.log(state.count); // 0

state.count = 1;
console.log(count.value); // 1
```

4. 计算属性

4.1 基础示例

computed() 方法期望接收一个 getter 函数，返回值为一个计算属性 ref。

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

计算属性值会基于其响应式依赖被缓存。方法调用则总会在重新渲染时再次执行。

4.3 可写计算属性

计算属性默认是只读的。但可以通过设置 get 和 set 函数变成可读可写。

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

使用计算属性，不要在里面做异步请求和修改 DOM。并且尽量保持只读。

5. 类与样式绑定

5.1 绑定 HTML class

通过对象来动态切换 class。

```html
<div :class="{ active: isActive }"></div>
```

可以直接绑定一个对象。

```js
const classObject = reactive({
  active: true,
  "text-danger": false,
});
```

```vue
<div :class="classObject"></div>
```

通过数组渲染多个 class。

```js
const activeClass = ref("active");
const errorClass = ref("text-danger");
```

```vue
<div :class="[activeClass, errorClass]"></div>
```

数组中也可以使用 JS 表达式。

```vue
<div :class="[isActive ? activeClass : '', errorClass]"></div>
<!-- 等于 -->
<div :class="[{ activeClass: isActive }, errorClass]"></div>
```

如果组件有多个根元素，透传的 class 需要通过组件的 $attrs 属性来实现指定。

```vue
<MyComponent class="baz" />
```

```vue
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

```vue
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

5.2 绑定内联样式

值为对象，对应的是 style 属性。

```js
const activeColor = ref("red");
const fontSize = ref(30);
```

```vue
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

直接绑定一个样式对象使模板更加简洁.

```js
const styleObject = reactive({
  color: "red",
  fontSize: "13px",
});
```

```vue
<div :style="styleObject"></div>
```

还可以绑定一个包含多个样式对象的数组。

```vue
<div :style="[baseStyles, overridingStyles]"></div>
```

6. 条件渲染

6.1 v-if、v-else、v-else-if

v-if 指令用于条件性地渲染内容。当值为真时才被渲染。

```vue
<h1 v-if="awesome">Vue is awesome!</h1>
```

v-else 为 v-if 添加一个“else 区块”。并且必须跟在一个 v-if 或者 v-else-if 元素后面。

```vue
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

v-else-if 提供的是相应于 v-if 的“else if 区块”。可以连续多次使用。并且必须跟在一个 v-if 或者 v-else-if 元素后面。

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

可以使用 <template> 包裹想要一起切换的元素块，渲染的结果并不会包含这个 <template> 元素。v-else、v-else-if 同理。

```vue
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

6.2 v-show

v-show 仅切换了元素上 display 的 CSS 属性。且不支持在 <template> 元素上使用，也不能和 v-else 搭配使用。

6.3 v-if vs v-show

v-if 切换的组件都会被销毁与重建。但是如果初始条件为 false，则不会做任何事，有更高的切换开销。

v-show 切换的组件只有 display 属性被修改，但初始化都会渲染。有更高的渲染开销。

综上：如果切换频繁用 v-show，反之用 v-if。

6.4 v-if 和 v-for

v-if 和 v-for 不推荐同时使用，因为这样二者的优先级不明显。如果二者同时存在一个元素上，v-if 优先执行。

7. 列表渲染

7.1 v-for

v-for 指令基于一个数组来渲染一个列表。

```js
const parentMessage = ref("Parent");
const items = ref([{ message: "Foo" }, { message: "Bar" }]);
```

```vue
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

可以使用 of 替代 in。

```vue
<div v-for="item of items"></div>
```

7.2 v-for 与对象

v-for 可以遍历对象属性

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

v-for 可以接受一个整数。从 1~n 开始遍历

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

在同一节点上，v-if 比 v-for 优先级更高。意味着 v-if 的条件无法访问到 v-for 中的变量。

```html
<!-- 会抛出一个错误，因为v-if访问不到属性 todo -->
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo.name }}</li>

<!-- 解决方法:包裹一层template -->
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">{{ todo.name }}</li>
</template>
```

7.6 通过 key 管理状态

Vue 默认的 “就地更新” 策略是高效的，但当数据源的顺序改变时，Vue 不会随之移动 DOM 顺序，而是就地更新每个元素。解决这一问题需要给每个元素添加一个 Key 值，官方推荐使用 v-for 都添加 key 值。

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

7.7 数组变化侦测

Vue 能侦听响应式数组的变化。改变原数组的方法：push()，pop()，shift()，unshift()，splice()，sort()，reverse()。不改变元素组：filter()，concat()，slice()。

7.8 展示过滤或排序后的结果

使用 computed，在不修改数据源的前提下，展示过滤或排序后的数据。

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

使用 v-on 指令 (简写 @) 来监听 DOM 事件

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

8.4 事件传参

```js
function say(message) {
  alert(message);
}
```

```html
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

8.5 在方法中访问原生 DOM

通过 $event 变量访问原生 DOM，或使用内联箭头函数中的 event 形参

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

修饰符是用 . 表示的指令后缀，包含：.stop，.prevent，.self，.capture，.once，.passive

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

v-model 数据双向绑定

```html
<input v-model="text" />
<!-- 等价于 -->
<input :value="text" @input="event => text = event.target.value" />
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

Vue 组件实例的创建到销毁，一些列的生命周期钩子函数，可以让我们特定阶段运行自己的代码。最常用的是 onMounted、onUpdated 和 onUnmounted

```html
<script setup>
  import { onMounted, onUpdated, onUnmounted } from "vue";

  // 初始渲染、创建 DOM 节点后
  onMounted(() => {
    console.log(`the component is now mounted.`);
  });

  // 组件更新 DOM 树之后。
  onUpdated(() => {
    // 文本内容应该与当前的 `count.value` 一致
    console.log(document.getElementById("count").textContent);
  });

  // 组件实例被卸载之后。
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

watch 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组。

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

重点：不能直接监听对象的属性。

```js
const obj = reactive({ count: 0 });
// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`);
});

// 解决：提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`);
  }
);
```

11.2 深层侦听器

给 watch() 传入一个响应式对象，会监听对象的所有属性。

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

watch 默认是懒执行的：仅当数据源变化时，才会执行回调。可以通过设置immediate：true，立即执行一遍回调。

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

当不使用构建步骤时，一个 Vue 组件以一个包含 Vue 特定选项的 JS 对象来定义：

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
<!-- 因为这是一个 JS 表达式而不是一个字符串 -->
<BlogPost :likes="42" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :likes="post.likes" />

<!-- 仅写上 prop 但不传值，会隐式转换为 `true` -->
<BlogPost is-published />

<!-- 虽然 `false` 是静态的值，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JS 表达式而不是一个字符串 -->
<BlogPost :is-published="false" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :is-published="post.isPublished" />

<!-- 虽然这个数组是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JS 表达式而不是一个字符串 -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :comment-ids="post.commentIds" />

<!-- 虽然这个对象字面量是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JS 表达式而不是一个字符串 -->
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
// JS 钩子逻辑...
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

<Suspense> 有两个默认插槽：#default 和#fallback。

在初始渲染时，展示默认插槽内容，当遇到异步依赖，则会进入挂起状态。挂起状态展示#fallbck 内容。

进入完成状态后，只有默认插槽的根节点被替换时，<Suspense>才会重新挂起。组件树中新的深层次的异步依赖不会造成<Suspense>回退到挂起状态。

发生回退时，后备内容不会立即展示出来，相反，在等待新内容和异步依赖完成时，会展示#defalut 内容，可以 timeout prop 进行配置，等待超时，才会展示后备内容，如果 timeout 为 0 将导致替换内容时立即显示后备内容。

```vue
<Suspense>
  <!-- 具有深层异步依赖的组件 -->
  <Dashboard />

  <!-- 在 #fallback 插槽中显示 “正在加载中” -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

5.3 事件

有三个事件：1. pending 进入挂起状态时触发。2. resolve default 插槽完成获取新内容触发。3. fallback fallback 插槽的内容显示时触发。

可以使用这些事件，在加载新组件时在之前的 DOM 最上层显示一个加载指示器。

5.4 错误处理

<Suspense> 组件自身目前还不提供错误处理，不过你可以使用 errorCaptured 选项或者 onErrorCaptured() 钩子，在使用到 <Suspense> 的父组件中捕获和处理异步错误。

5.5 和其他组件结合

通常会与 <Transition>、<KeepAlive>、<RouterView>等组件结合使用。这些组件的嵌套顺序很重要。

```vue
<RouterView v-slot="{ Component }">
  <template v-if="Component">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense>
          <!-- 主要内容 -->
          <component :is="Component"></component>

          <!-- 加载中状态 -->
          <template #fallback>
            正在加载...
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </template>
</RouterView>
```

六 应用规模化

1. 单文件组件

1.1 介绍

Vue 的单文件组件简称 SFC，是一种特殊的文件格式，使我们可以将 Vue 组件的模板、逻辑、样式封装在 SFC 中。如下：

```vue
<script setup>
import { ref } from "vue";
const greeting = ref("Hello World!");
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

1.2 为什么使用 SFC

使用 SFC 必须使用构建工具，作为回报带来了以下有点：

| 编写模块化的组件
| 让本来就强相关的关注点自然内聚
| 预编译模板，避免运行时的编译开销
| 组件作用域的 CSS
| 在使用组合式 API 时语法更加简单
| 通过交叉分析模板和逻辑代码能进行更多编译时优化
| 更好的 IDE 支持，提供自动补全和对模板表达式的类型检查
| 开箱即用的模块热更新(HMR)支持

SFC 是 Vue 框架提供的一个功能，下列场景都是官方推荐的项目组织方式：

| 单页面应用（SPA）
| 静态站点构建（SSG）
| 任何值得引入构建步骤以获得更好的开发体验（DX）的项目

1.3 SFC 是如何工作的

Vue SFC 是一个框架的文件格式，必须交由@vue/compiler-sfc 编译为标准的 JS 和 CSS，一个编译后的 SFC 是一个标准的 JS（ES）模块，意味着你可以像导入其他 ES 模块一样导入 SFC

```js
import MyComponent from "./MyComponent.vue";

export default {
  components: {
    MyComponent,
  },
};
```

1.4 如何看待关注点分离

前端开发的关注点不是完全基于文件类型分离的。前端工程化的最终目的都是为了能够更好地维护代码。

关注点分离不应该是教条式的按文件类型区分和分离，这并不能帮助我们提高开发效率。

在现代的 UI 开发中，建议将他们划分为松散耦合的组件，再按需组合起来。在一个组件中其模板、逻辑、样式就是又内在联系的、是耦合的，将他们放在一起使组件更具有内聚行和可维护性。

2. 工具链

2.1 在线尝试

[Vue SFC 演练场](https://play.vuejs.org/#eNp9kUFLwzAUx7/KM5cqzBXZbXQDlYF6UFHBSy6je+sy0yQkL3NQ+t19SdncYezW9//9X/pL24l758a7iGIqqlB75QgCUnRzaVTrrCfowOMaelh720LB1UIaaWprAkEbGpglfl08odYWvq3Xq6viRpqqHI7jg3ggbJ1eEvIEUG3u5l2Xl/u+KnnKqTIuEuxuW7tCPZOCuRRQMqzKk30xEhT49WvVjLfBGjbv0r4UtW2d0ujfHCnWk2IKmSS2ZLvfl5yRjzg65PUG658z+TbsUybFu8eAfodSHBktfYM04MXnK+75+QjZPmpuX4AfGKyOyXGoPUSzYu2TXrZ9zt9fmeYrLPaEJhwulURTs899KfifPF64+r/uZDzJe9L0ov8DExSnNA==)

[StackBlitz 中的 Vue + Vite](https://stackblitz.com/edit/vitejs-vite-avew3m?file=index.html&terminal=dev)

2.2 项目脚手架

[Vite](https://cn.vitejs.dev/)是一个轻量级的、速度极快的构建工具，对 Vue SFC 提供第一优先级支持，作者是尤雨溪，也是 VUE 的作者。

使用 Vite 创建项目，这个命令会安装和执行 create-vue，它是 Vue 提供的官方脚手架工具。跟随命令行的提示继续操作即可。

```js
npm create vue@latest
```

[Vue CLI](https://cli.vuejs.org/zh/)是官方提供基于 webpack 的 Vue 工具链，现在处于维护阶段，官方建议使用 Vite 开始新项目。

浏览器内模板编译注意事项

当无构建步骤使用 Vue 时，组件模板要么写在 HTML 中，要么内联到 JS 中，Vue 都需要将模板编译器运行到浏览器中

当使用构建步骤时，提前编译了模板，就不需要在浏览器运行了。

Vue 提供了[多种格式的“构建文件”](https://unpkg.com/browse/vue@3.4.6/dist/)以适配不同场景的优化。

| 前缀为 vue.runtime.\*的文件只包含运行时的版本：不含编译器，使用这个版本时，所有模板都需要由构建步骤预先编译。
| 名称中不包含.runtime 的文件时完整版：包含编译器，支持在浏览器中直接编译模板，体积也会增长 14kb。

默认的工具链中使用仅含运行时的版本，因为所有 SFC 都被预编译了。如果因为某些原因，在有构建步骤时，还需要再浏览器中编译模板，就需要更改构建工具配置，将 vue 改为相应版本 vue/dist/vue.esm-bundler.js。

2.3 IDE 支持

推荐使用的 IDE 是 VSCode，配合 Volar 插件，提供语法高亮。

2.4 浏览器开发者插件

[Chrome 扩展商店页](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)，安装这个插件可能需要科学上网，安装后我们可以浏览一个 Vue 应用的组件树，查看各组件的状态，追踪状态管理的事件。

2.5 TS

Volar 插件能够为<script lang="ts">块提供类型检测，也能对模板表达式和组件之间的 props 提供自动补全和类型检测

使用 vue-tsc 可以在命令行中执行相同的类型检查，通常用来生成单文件组件的 d.ts 文件

2.6 测试

[Vitest](https://vitest.dev/)是一个追求更快运行速度的测试运行器，由 Vue/Vite 团队开发，主要针对基于 Vite 的应用设计，可以为组件提供即时响应的测试反馈。

2.7 代码规范

Vue 团队维护 eslint-plugin-vue 项目，是一个 ESLint 插件，会提供 SFC 相应规则定义。

基于 Vite 构建，官方一般推荐：

| npm install -D eslint eslint-plugin-vue，按[指引](https://eslint.vuejs.org/user-guide/#usage)配置
| 启用 ESLint IDE 插件，比如 ESLint for VSCode，然后在开发时就可以进行规范检查
| 将 ESLint 格式检查作为一个生产构建的步骤，保证最后的打包能获得完整的规范检查
| （可选）启用类似 lint-staged 一类工具在 git commit 提交时自动执行代码规范检查

2.8 格式化

Volar VSCode 插件提供了开箱即用的格式化功能

Prettier 提供了格式化支持

2.9 SFC 自定义块集成

自定义块被编译成导入到同一 Vue 文件的不同请求查询。取决于底层构建工具如何处理这类导入请求。

| 使用 Vite，需要一个自定义 Vite 插件将自定义块转换为可执行的 JS 代码。[示例](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)。
| 如果使用 Vue CLI 或只是 webpack，需要使用一个 loader 来配置如何转换匹配到的自定义块。[示例](https://vue-loader.vuejs.org/zh/guide/custom-blocks.html#example)。

2.10 底层库

[@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)这个包是 Vue 核心 monorepo 的一部分，提供了处理 Vue SFC 的底层的功能。

[@vitejs/plugin-vue]()为 Vite 提供 Vue SFC 支持的官方插件。

[vue-loader](https://vue-loader.vuejs.org/zh/)为 webpack 提供 Vue SFC 支持的官方 loader。可以看看[如何在 Vue CLI 中更改 vue-loader 选项的文档](https://cli.vuejs.org/zh/guide/webpack.html#%E4%BF%AE%E6%94%B9-loader-%E9%80%89%E9%A1%B9)

2.11 其他在线演练场

[VueUse Playground](https://play.vueuse.org/)
[Vue + Vite on Repl.it](https://replit.com/@replit/VueJS)
[Vue on CodeSandbox](https://codesandbox.io/s/vue-3)
[Vue on Codepen](https://codepen.io/pen/editor/vue)
[Vue on Components.studio](https://app.components.studio/create/vue3)
[Vue on WebComponents.dev](https://studio.webcomponents.dev/create/cevue)

3. 路由

3.1 客户端 vs 服务端路由

服务端路由指的是服务器根据用户访问的 URL 路径返回不同的响应结果。

客户端路由指在单页面应用中，客户端的 JS 可以拦截页面的跳转请求，动态获取新的数据，然后在无需重新加载的情况下更新当前页面。可以给用户带来更流畅的体验。

3.2 官方路由

[Vue Router 的文档](https://router.vuejs.org/zh/)

3.3 从头开始实现一个简单的路由

通过监听浏览器 hashchange 事件或使用 History API 更新当前组件。

```vue
<script setup>
import { ref, computed } from "vue";
import Home from "./Home.vue";
import About from "./About.vue";
import NotFound from "./NotFound.vue";
const routes = {
  "/": Home,
  "/about": About,
};
const currentPath = ref(window.location.hash);
window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || NotFound;
});
</script>
<template>
  <a href="#/">Home</a> | <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

4. 状态管理

4.1 什么是状态管理

多个组件共享一个共同的状态，应用场景：

| 多个视图可能都依赖于同一份状态。
| 来自不同视图的交互也可能需要更改同一份状态。

可行方法 1：将共享状态“提升”到共同的祖先组件上去，再通过 props 传递下来。如果组件数结构很深，会导致 Prop 逐级透传问题。

可行方法 2：通过模板引用获取父子组件实例，会导致代码难以维护。

最简单直接的方法：抽取共享状态放在全局单例中管理。

4.2 用响应式 API 做简单状态管理

用 reactive() 来创建一个响应式对象，并将它导入到多个组件中：

```js
// store.js
import { reactive } from "vue";

export const store = reactive({
  count: 0,
});
```

```vue
<!-- ComponentA.vue -->
<script setup>
import { store } from "./store.js";
</script>

<template>From A: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script setup>
import { store } from "./store.js";
</script>

<template>From B: {{ store.count }}</template>
```

但是这样做有个问题，任意一个导入了 store 的组件都可以随意修改它的状态，是不太容易维护的。

建议在 store 上定义方法，方法的名称应该要能表达出行动的意图：

```js
// store.js
import { reactive } from "vue";

export const store = reactive({
  count: 0,
  increment() {
    this.count++;
  },
});
```

```vue
<template>
  <button @click="store.increment()">From B: {{ store.count }}</button>
</template>
```

4.3 SSR 相应细节

服务端渲染 (SSR) 的应用，由于 store 是跨多个请求共享的单例，上述模式可能会导致问题。

4.4 Pinia

手动状态管理解决方案在简单的场景中已经足够了，但是在大规模的生产应用中还有很多其他事项需要考虑：

| 更强的团队协作约定
| 与 Vue DevTools 集成，包括时间轴、组件内部审查和时间旅行调试
| 模块热更新 (HMR)
| 服务端渲染支持

Pinia 都实现了，有 Vue 核心团队维护。官方建议使用 Pinia。Pinia 提供了更简洁直接的 API，并提供了组合式风格的 API，最重要的是，在使用 TypeScript 时它提供了更完善的类型推导。

5. 测试

5.1 为什么需要测试

自动化测试能够预防无意引入的 bug，并鼓励开发者将应用分解为可测试、可维护的函数、模块、类和组件。

这能够帮助你和你的团队更快速、自信地构建复杂的 Vue 应用。

5.2 何时测试

越早越好！官方建议你尽快开始编写测试。拖得越久，应用就会有越多的依赖和复杂性，想要开始添加测试也就越困难。

5.3 测试的类型

单元测试：检查给定函数、类或组合式函数的输入是否产生预期的输出或副作用。

组件测试：检查你的组件是否正常挂载和渲染、是否可以与之互动，以及表现是否符合预期。

端到端测试：检查跨越多个页面的功能，并对生产构建的 Vue 应用进行实际的网络请求。这些测试通常涉及到建立一个数据库或其他后端。

5.4 总览

我们将简要地讨论这些测试是什么，以及如何在 Vue 应用中实现它们，并提供一些普适性建议。

5.5 单元测试

编写单元测试是为了验证小的、独立的代码单元是否按预期工作。

单元测试侧重于逻辑上的正确性，只关注应用整体功能的一小部分。

单元测试将捕获函数的业务逻辑和逻辑正确性的问题。

以这个 increment 函数为例：

```js
// helpers.js
export function increment(current, max = 10) {
  if (current < max) {
    return current + 1;
  }
  return current;
}
```

如果任何一条断言失败了，那么问题一定是出在 increment 函数上。

```js
// helpers.spec.js
import { increment } from "./helpers";

describe("increment", () => {
  test("increments the current number by 1", () => {
    expect(increment(0, 10)).toBe(1);
  });

  test("does not increment the current number over the max", () => {
    expect(increment(10, 10)).toBe(10);
  });

  test("has a default max of 10", () => {
    expect(increment(10)).toBe(10);
  });
});
```

单元测试通常适用于独立的业务逻辑、组件、类、模块或函数，不涉及 UI 渲染、网络请求或其他环境问题。

一个组件可以通过两种方式测试：

| 白盒：单元测试，白盒测试知晓一个组件的实现细节和依赖关系。它们更专注于将组件进行更 独立 的测试。这些测试通常会涉及到模拟一些组件的部分子组件，以及设置插件的状态和依赖性（例如 Pinia）。

| 黑盒：组件测试，黑盒测试不知晓一个组件的实现细节。这些测试尽可能少地模拟，以测试组件在整个系统中的集成情况。它们通常会渲染所有子组件，因而会被认为更像一种“集成测试”。请查看下方的组件测试建议作进一步了解。

[Vitest](https://cn.vitest.dev/) 正是一个针对此目标设计的单元测试框架，它由 Vue / Vite 团队成员开发和维护。在 Vite 的项目集成它会非常简单，而且速度非常快。

5.6 组件测试

组件测试应该捕捉组件中的 prop、事件、提供的插槽、样式、CSS class 名、生命周期钩子，和其他相关的问题。

当进行测试时，请记住，测试这个组件做了什么，而不是测试它是怎么做到的。

5.7 端到端（E2E）测试

端到端测试的重点是多页面的应用表现，针对你的应用在生产环境下进行网络请求。他们通常需要建立一个数据库或其他形式的后端，甚至可能针对一个预备上线的环境运行。

端到端测试通常会捕捉到路由、状态管理库、顶级组件（常见为 App 或 Layout）、公共资源或任何请求处理方面的问题。如上所述，它们可以捕捉到单元测试或组件测试无法捕捉的关键问题。

5.8 用例指南

添加 Vitest 到项目中

```sh
npm install -D vitest happy-dom @testing-library/vue
```

更新 Vite 配置

```js
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  // ...
  test: {
    // 启用类似 jest 的全局测试 API
    globals: true,
    // 使用 happy-dom 模拟 DOM
    // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
    environment: "happy-dom",
  },
});
```

接着，创建名字以 \*.test.js 结尾的文件。放在项目根目录下的 test 目录中，或者放在源文件旁边的 test 目录中。Vitest 会使用命名规则自动搜索它们。

```js
// MyComponent.test.js
import { render } from "@testing-library/vue";
import MyComponent from "./MyComponent.vue";

test("it should work", () => {
  const { getByText } = render(MyComponent, {
    props: {
      /* ... */
    },
  });

  // 断言输出
  getByText("...");
});
```

最后，在 package.json 之中添加测试命令，然后运行它：

```js
{
  // ...
  "scripts": {
    "test": "vitest"
  }
}
```

```sh
npm run test
```

6. 服务端渲染（SSR）

6.1 总览

6.1.1 什么是 SSR？

Vue 也支持将组件在服务端直接渲染成 HTML 字符串，作为服务端响应返回给浏览器，最后在浏览器端将静态的 HTML“激活”(hydrate) 为能够交互的客户端应用。

6.1.2 为什么要用 SSR？

更快的首屏加载：服务端渲染的 HTML 无需等到所有的 JS 都下载并执行完成之后才显示，所以你的用户将会更快地看到完整渲染的页面。更快的数据库连接。

统一的心智模型：你可以使用相同的语言以及相同的声明式、面向组件的心智模型来开发整个应用，而不需要在后端模板系统和前端框架之间来回切换。

更好的 SEO：搜索引擎爬虫可以直接看到完全渲染的页面。

6.1.3 SSR 的弊端

开发限制：浏览器端特定的代码只能在某些生命周期钩子中使用；一些外部库可能需要特殊处理才能在服务端渲染的应用中运行。

更多的构建、部署要求：服务端渲染的应用需要一个能让 Node.js 服务器运行的环境，不像完全静态的 SPA 那样可以部署在任意的静态文件服务器上。

更高的服务端负载：在 Node.js 中渲染一个完整的应用要比仅仅托管静态文件更加占用 CPU 资源，因此如果你预期有高流量，请为相应的服务器负载做好准备，并采用合理的缓存策略。

6.1.4 SSR vs. SSG

静态站点生成 (Static-Site Generation，缩写为 SSG)，也被称为预渲染，是另一种流行的构建快速网站的技术。

如果用服务端渲染一个页面所需的数据对每个用户来说都是相同的，那么我们可以只渲染一次，提前在构建过程中完成，而不是每次请求进来都重新渲染页面。预渲染的页面生成后作为静态 HTML 文件被服务器托管。

SSG 保留了和 SSR 应用相同的性能表现：它带来了优秀的首屏加载性能。同时，它比 SSR 应用的花销更小，也更容易部署，因为它输出的是静态 HTML 和资源文件。这里的关键词是静态：SSG 仅可以用于消费静态数据的页面，即数据在构建期间就是已知的，并且在多次部署期间不会改变。每当数据变化时，都需要重新部署。

如果你调研 SSR 只是为了优化为数不多的营销页面的 SEO (例如 /、/about 和 /contact 等)，那么你可能需要 SSG 而不是 SSR。SSG 也非常适合构建基于内容的网站，比如文档站点或者博客。

6.2 基础教程

6.2.1 渲染一个应用

创建一个新的文件夹，cd 进入
执行 npm init -y
在 package.json 中添加 "type": "module" 使 Node.js 以 ES modules mode 运行
执行 npm install vue
创建一个 example.js 文件：

```js
// 此文件运行在 Node.js 服务器上
import { createSSRApp } from "vue";
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from "vue/server-renderer";

const app = createSSRApp({
  data: () => ({ count: 1 }),
  template: `<button @click="count++">{{ count }}</button>`,
});

renderToString(app).then((html) => {
  console.log(html);
});
```

接着运行：

```sh
node example.js
```

它应该会在命令行中打印出如下内容：

```js
<button>1</button>
```

然后我们可以把 Vue SSR 的代码移动到一个服务器请求处理函数里，它将应用的 HTML 片段包装为完整的页面 HTML。接下来的几步我们将会使用 express：

执行 npm install express
创建下面的 server.js 文件：

```js
import express from "express";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

const server = express();

server.get("/", (req, res) => {
  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`,
  });

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `);
  });
});

server.listen(3000, () => {
  console.log("ready");
});
```

最后，执行 node server.js，访问 http://localhost:3000。你应该可以看到页面中的按钮了。

6.2.2 客户端激活

点击按钮是无效的，因为这段 HTML 在客户端是完全静态的，浏览器中没有加载 Vue。

为了让按钮可以交互，让 Vue 创建一个与服务端完全相同的应用实例，并将每个组件与它应该控制的 DOM 节点相匹配，并添加 DOM 事件监听器。

使用 createSSRApp()：

```js
// 该文件运行在浏览器中
import { createSSRApp } from "vue";

const app = createSSRApp({
  // ...和服务端完全一致的应用实例
});

// 在客户端挂载一个 SSR 应用时会假定
// HTML 是预渲染的，然后执行激活过程，
// 而不是挂载新的 DOM 节点
app.mount("#app");
```

6.2.3 代码结构

服务器和客户端共享相同的应用代码，称它们为通用代码。将应用的创建逻辑拆分到一个单独的文件 app.js 中：

```js
// app.js (在服务器和客户端之间共享)
import { createSSRApp } from "vue";

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`,
  });
}
```

客户端导入通用代码

```js
// client.js
import { createApp } from "./app.js";

createApp().mount("#app");
```

服务器导入通用代码

```js
// server.js (不相关的代码省略)
import { createApp } from "./app.js";

server.get("/", (req, res) => {
  const app = createApp();
  renderToString(app).then((html) => {
    // ...
  });
});
```

在浏览器中加载客户端文件，还需要：

| 添加 server.use(express.static('.')) 到 server.js，托管客户端文件。
| 将 <script type="module" src="/client.js"></script> 添加到 HTML 外壳以加载客户端入口文件。
| 通过在 HTML 外壳中添加 Import Map 以支持在浏览器中使用 import \* from 'vue'。

6.3 更通用的解决方案

生产就绪一个完整的 SSR 应用，实现会非常复杂，官方推荐[Nuxt](https://nuxt.com/)，一个构建于 Vue 生态系统之上的全栈框架，官方强烈建议你试一试。

6.4 书写 SSR 友好的代码

遵循以下原则：

| 响应性在服务端是不必要的。默认情况是禁用的。
| 避免在 setup() 或者 <script setup> 的根作用域中使用会产生副作用且需要被清理的代码。如 setInterval
| 通用代码不能访问平台特有的 API，如 window 或 document
| SSR 环境下应用模块通常只在服务器启动时初始化一次。如果我们用单个用户特定的数据对共享的单例状态进行修改，那么这个状态可能会意外地泄露给另一个用户的请求。我们把这种情况称为跨请求状态污染。
| 如果预渲染的 HTML 的 DOM 结构不符合客户端应用的期望，就会出现激活不匹配。
| 服务端自定义指令和客户端不一样，服务器是 getSSRProps 指令钩子。

七 最佳实践

1. 生产部署

1.1 开发环境 vs 生产环境

开发环境中提供了许多功能来提升开发体验，这些功能在生产环境中并不会被使用，应该移除所有未使用的。

1.2 不使用构建工具

不适用构建工具，从 CDN 或其他源来加载 Vue，使用的是生产环境版本（以 .prod.js 结尾的构建文件）。

1.3 使用构建工具

通过 create-vue（基于 Vite）或是 Vue CLI（基于 webpack）搭建的项目都已经预先做好了针对生产环境的配置。

1.4 追踪运行时错误

```js
import { createApp } from 'vue'
const app = createApp(...)
app.config.errorHandler = (err, instance, info) => {
  // 向追踪服务报告错误
}
```

2. 性能优化

2.1 概述

Vue 很优秀了，一般不用优化，但遇到特殊场景需要微调。

页面加载性能：首次访问时，应用展示出内容与达到可交互状态的速度。

更新性能：应用响应用户输入更新的速度。

2.2 分析选项

为了提高性能，我们首先需要知道如何衡量它。

生产部署的负载性能分析：[PageSpeed Insights](https://pagespeed.web.dev/)、[WebPageTest](https://www.webpagetest.org/)

本地开发性能分析：[Chrome 开发者工具“性能”面板](https://developer.chrome.com/docs/devtools/evaluate-performance/)

2.3 页面加载优化

| 如果用例对页面加载性能很敏感，请避免将其部署为纯客户端的 SPA，而是让服务器直接发送包含用户想要查看的内容的 HTML 代码。纯客户端渲染存在首屏加载缓慢的问题，这可以通过服务器端渲染 (SSR) 或静态站点生成 (SSG) 来缓解。
| 尽可能的采用构建步骤
| 引入新的依赖项时要小心包体积膨胀！
| 代码分割：按需加载文件。页面加载时需要的功能可以立即下载，而额外的块只在需要时才加载，从而提高性能。

2.4 更新优化

在 Vue 之中，一个子组件只会在其至少一个 props 改变时才会更新。所以尽量让传给子组件的 props 尽量保持稳定。

v-once 是一个内置的指令，可以用来渲染依赖运行时数据但无需再更新的内容。它的整个子树都会在未来的更新中被跳过。

v-memo 是一个内置指令，可以用来有条件地跳过某些大型子树或者 v-for 列表的更新。

2.5 通用优化

渲染大型列表，会变得很慢，可以通过列表虚拟化来提升性能。现有库[vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)、[vue-virtual-scroll-grid](https://github.com/rocwang/vue-virtual-scroll-grid)、[vueuc/VVirtualList](https://github.com/07akioni/vueuc)

3. 无障碍访问

3.1 跳过链接

你应该在每个页面的顶部添加一个直接指向主内容区域的链接，这样用户就可以跳过在多个网页上重复的内容。通常这个链接会放在 App.vue 的顶部。

3.2 内容结构

确保设计可以支持易于访问的实现是无障碍访问最重要的部分之一。设计不仅要考虑颜色对比度、字体选择、文本大小和语言，还要考虑应用中的内容是如何组织的。

3.3 语义化表单

当创建一个表单，你可能使用到以下几个元素：<form>、<label>、<input>、<textarea> 和 <button>。标签通常放置在表格字段的顶部或左侧。

3.4 规范

万维网联盟 (W3C) Web 无障碍访问倡议 (WAI) 为不同的组件制定了 Web 无障碍性标准

4. 安全

4.1 报告漏洞

建议始终使用最新版本的 Vue 及其官方配套库，以确保你的应用尽可能地安全。

4.2 首要规则：不要使用无法信赖的模板

使用 Vue 时最基本的安全规则就是不要将无法信赖的内容作为你的组件模板。

使用无法信赖的模板相当于允许任意的 JS 在你的应用中执行。

更糟糕的是，如果在服务端渲染时执行了这些代码，可能会导致服务器被攻击。举例来说：

```js
Vue.createApp({
  template: `<div>` + userProvidedString + `</div>`, // 永远不要这样做！
}).mount("#app");
```

4.3 Vue 自身的安全机制

无论是使用模板还是渲染函数，内容都是自动转义的。从而防止脚本注入。这意味着在这个模板中：

```vue
<h1>{{ userProvidedString }}</h1>
```

如果 userProvidedString 包含了：

```js
'<script>alert("hi")</script>';
```

那么它将被转义为如下的 HTML：

```html
&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;
```

4.4 潜在的危险

在任何 Web 应用中，允许以 HTML、CSS 或 JS 形式执行未经无害化处理的、用户提供的内容都有潜在的安全隐患，因此这应尽可能避免。

4.5 最佳实践

最基本的规则就是只要你允许执行未经无害化处理的、用户提供的内容 (无论是 HTML、JS 还是 CSS)，你就可能面临攻击。无论是使用 Vue、其他框架，或是不使用框架，道理都是一样的。

建议你熟读这些资源：[HTML5 安全手册](https://html5sec.org/),[OWASP 的跨站脚本攻击 (XSS) 防护手册](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

4.6 后端协调

类似跨站请求伪造 (CSRF/XSRF) 和跨站脚本引入 (XSSI) 这样的 HTTP 安全漏洞，主要由后端负责处理，因此它们不是 Vue 职责范围内的问题。

4.7 服务端渲染（SSR）

在使用 SSR 时请确保遵循[SSR 文档](https://cn.vuejs.org/guide/scaling-up/ssr.html)给出的最佳实践来避免产生漏洞。

八 进阶主题

1. 使用 Vue 的多种方式

世上没有一种方案可以解决所有问题，所以 Vue 被设计成灵活的框架。

1.1 独立脚本

Vue 可以以一个单独 JS 文件的形式使用，无需构建步骤！

1.2 作为 Web Component 嵌入

你可以用 Vue 来构建标准的 Web Component，这些 Web Component 可以嵌入到任何 HTML 页面中，无论它们是如何被渲染的。

1.3 单页面应用（SPA）
一些应用在前端需要具有丰富的交互性、较深的会话和复杂的状态逻辑。

1.4 全栈/SSR

纯客户端的 SPA 在首屏加载和 SEO 方面有显著的问题，

1.5 JAMStack/SSR

如果所需的数据是静态的，那么服务端渲染可以提前完成。这一技术通常被称为静态站点生成 (SSG)，也被称为 JAMStack。

1.6 Web 以外

Vue 可以构建桌面应用、移动端应用、3DWebGL

2. 组合式 Api 常见问答

2.1 什么是组合式 API

组合式 API (Composition API) 是一系列 API 的集合，使我们可以使用函数而不是声明选项的方式书写 Vue 组件

| 响应式 API：例如 ref() 和 reactive()
| 生命周期钩子：例如 onMounted() 和 onUnmounted()
| 依赖注入：例如 provide() 和 inject()

2.2 为什么要有组合式 API

更好的逻辑复用、更灵活的代码组织、更好的类型推导、更小的生产包体积

2.3 与选项式 API 的关系

在写组合式 API 的代码时也运用上所有普通 JS 代码组织的最佳实践。

组合式 API 能够覆盖所有状态逻辑方面的需求。

2.4 与 ClassApi 的关系

我们不再推荐在 Vue 3 中使用 Class API，因为组合式 API 提供了很好的 TypeScript 集成，并具有额外的逻辑重用和代码组织优势。

2.5 与 React Hooks 的对比

React Hooks 在组件每次更新时都会重新调用。

3. 深入响应式系统

Vue 最标志性的功能就是其低侵入性的响应式系统。

3.1 什么是响应性

这个 update() 函数会产生一个副作用，或者就简称为作用 (effect)，因为它会更改程序里的状态

A0 和 A1 被视为这个作用的依赖 (dependency)，因为它们的值被用来执行这个作用。因此这次作用也可以说是一个它依赖的订阅者 (subscriber)。

```js
let A2;

function update() {
  A2 = A0 + A1;
}
```

whenDepsChange() 函数有如下的任务：

| 当一个变量被读取时进行追踪。例如我们执行了表达式 A0 + A1 的计算，则 A0 和 A1 都被读取到了。
| 如果一个变量在当前运行的副作用中被读取了，就将该副作用设为此变量的一个订阅者。例如由于 A0 和 A1 在 update() 执行时被访问到了，则 update() 需要在第一次调用之后成为 A0 和 A1 的订阅者。
| 探测一个变量的变化。例如当我们给 A0 赋了一个新的值后，应该通知其所有订阅了的副作用重新执行。

```js
whenDepsChange(update);
```

3.2 Vue 中响应性是怎么工作的

在 JS 中有两种劫持 property 访问的方式：getter / setters 和 Proxies。Vue 2 使用 getter / setters，Vue 3 中则使用了 Proxy 来创建响应式对象。

```js
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key);
    },
  });
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, "value");
      return value;
    },
    set value(newValue) {
      value = newValue;
      trigger(refObject, "value");
    },
  };
  return refObject;
}
```

4. 渲染机制

4.1 虚拟 DOM

虚拟 DOM (Virtual DOM，简称 VDOM) 是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”地表示出来，保存在内存中，然后将真实的 DOM 与之保持同步。

这里所说的 vnode 即一个纯 JS 的对象 (一个“虚拟节点”)，它代表着一个 <div> 元素。它包含我们创建实际元素所需的所有信息。它还包含更多的子节点，这使它成为虚拟 DOM 树的根节点。

一个运行时渲染器将会遍历整个虚拟 DOM 树，并据此构建真实的 DOM 树。这个过程被称为挂载 (mount)。

如果我们有两份虚拟 DOM 树，渲染器将会有比较地遍历它们，找出它们之间的区别，并应用这其中的变化到真实的 DOM 上。这个过程被称为更新 (patch)，又被称为“比对”(diffing) 或“协调”(reconciliation)。

```js
const vnode = {
  type: "div",
  props: {
    id: "hello",
  },
  children: [
    /* 更多 vnode */
  ],
};
```

4.2 渲染管线

Vue 组件挂载时会发生如下几件事：编译：Vue 模板被编译为渲染函数、挂载：运行时渲染器调用渲染函数，遍历返回的虚拟 DOM 树、更新：当一个依赖发生变化后，副作用会重新运行，这时候会创建一个更新后的虚拟 DOM 树。

4.3 模板 vs 渲染函数

Vue 模板会被预编译成虚拟 DOM 渲染函数。

5. 渲染函数 & JSX

5.1 基础用法

Vue 提供了一个 h() 函数用于创建 vnodes：

```js
import { h } from "vue";

const vnode = h(
  "div", // type
  { id: "foo", class: "bar" }, // props
  [
    /* children */
  ]
);
```

h() 函数的使用方式非常的灵活：

```js
// 除了类型必填以外，其他的参数都是可选的
h("div");
h("div", { id: "foo" });

// attribute 和 property 都能在 prop 中书写
// Vue 会自动将它们分配到正确的位置
h("div", { class: "bar", innerHTML: "hello" });

// 像 `.prop` 和 `.attr` 这样的的属性修饰符
// 可以分别通过 `.` 和 `^` 前缀来添加
h("div", { ".name": "some-name", "^width": "100" });

// 类与样式可以像在模板中一样
// 用数组或对象的形式书写
h("div", { class: [foo, { bar }], style: { color: "red" } });

// 事件监听器应以 onXxx 的形式书写
h("div", { onClick: () => {} });

// children 可以是一个字符串
h("div", { id: "foo" }, "hello");

// 没有 props 时可以省略不写
h("div", "hello");
h("div", [h("span", "hello")]);

// children 数组可以同时包含 vnodes 与字符串
h("div", ["hello", h("span", "hello")]);
```

得到的 vnode 为如下形式：

```js
const vnode = h("div", { id: "foo" }, []);

vnode.type; // 'div'
vnode.props; // { id: 'foo' }
vnode.children; // []
vnode.key; // null
```

5.2 JSX/TSX

JSX 是 JS 的一个类似 XML 的扩展，有了它，我们可以用以下的方式来书写代码：

```js
const vnode = <div>hello</div>;
```

在 JSX 表达式中，使用大括号来嵌入动态值：

```js
const vnode = <div id={dynamicId}>hello, {userName}</div>;
```

5.3 渲染函数案例

```js
// v-if
h('div', [ok.value ? h('div', 'yes') : h('span', 'no')])
// 等价于
<div>
  <div v-if="ok">yes</div>
  <span v-else>no</span>
</div>

// v-for
h(
  'ul',
  // assuming `items` is a ref with array value
  items.value.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)
// 等价于
<ul>
  <li v-for="{ id, text } in items" :key="id">
    {{ text }}
  </li>
</ul>

// v-on
h(
  'button',
  {
    onClick(event) {
      /* ... */
    }
  },
  'click me'
)
// 等价于
<button @click="">
  click me
</button>

// 事件修饰符
h('input', {
  onClickCapture() {
    /* 捕捉模式中的监听器 */
  },
  onKeyupOnce() {
    /* 只触发一次 */
  },
  onMouseoverOnceCapture() {
    /* 单次 + 捕捉 */
  }
})
// 等价于
<input @click.capture="" @keyup.once='' @mouseover.once.capture=""/>

// 组件
import Foo from './Foo.vue'
import Bar from './Bar.jsx'

function render() {
  return h('div', [h(Foo), h(Bar)])
}
// 等价于
<div>
  <Foo />
  <Bar />
</div>

// 传递插槽
// 单个默认插槽
h(MyComponent, () => 'hello')
// 等价于
<MyComponent>hello</MyComponent>

// 具名插槽
// 注意 `null` 是必需的
// 以避免 slot 对象被当成 prop 处理
h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
})
// 等价于
<MyComponent>
  <template #default>default slot</template>
  <template #foo>
    <div>foo</div>
  </template>
  <template #bar>
    <span>one</span>
    <span>two</span>
  </template>
</MyComponent>

// 内置组件
import { h, KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'
export default {
  setup () {
    return () => h(Transition, { mode: 'out-in' }, /* ... */)
  }
}
// 等价于
<Transition mode='out-in'></Transition>

// v-model
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h(SomeComponent, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value)
      })
  }
}
// 等价于
<SomeComponent v-model=""></SomeComponent>

// 自定义指令
import { h, withDirectives } from 'vue'

// 自定义指令
const pin = {
  mounted() { /* ... */ },
  updated() { /* ... */ }
}

// <div v-pin:top.animate="200"></div>
const vnode = withDirectives(h('div'), [
  [pin, 200, 'top', { animate: true }]
])

// 模板引用
import { h, ref } from 'vue'

export default {
  setup() {
    const divEl = ref()

    // <div ref="divEl">
    return () => h('div', { ref: divEl })
  }
}
```

6. Vue 与 Web Components

Web Components 是一组 web 原生 API 的统称，允许开发者创建可复用的自定义元素 (custom elements)。

自定义元素的主要好处是，它们可以在使用任何框架，甚至是在不使用框架的场景下使用。

6.1 在 Vue 中使用自定义元素

默认情况下，Vue 会将非原生的 HTML 标签优先当作 Vue 组件处理，而将“渲染一个自定义元素”作为后备选项。要让 Vue 知晓特定元素应该被视为自定义元素并跳过组件解析，我们可以指定 compilerOptions.isCustomElement 这个选项。

```js
// 仅在浏览器内编译时才会工作
// 如果使用了构建工具，请看下面的配置示例
app.config.compilerOptions.isCustomElement = (tag) => tag.includes("-");
```

```js
// vite.config.js
import vue from "@vitejs/plugin-vue";

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
  ],
};
```

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // 将所有以 ion- 开头的标签都视为自定义元素
          isCustomElement: (tag) => tag.startsWith("ion-"),
        },
      }));
  },
};
```

6.2 使用 Vue 构建自定义元素

Vue 提供了一个和定义一般 Vue 组件几乎完全一致的 defineCustomElement 方法来支持创建自定义元素。这个方法接收的参数和 defineComponent 完全相同。但它会返回一个继承自 HTMLElement 的自定义元素构造器：

```vue
<my-vue-element></my-vue-element>
```

```js
import { defineCustomElement } from "vue";

const MyVueElement = defineCustomElement({
  // 这里是同平常一样的 Vue 组件选项
  props: {},
  emits: {},
  template: `...`,

  // defineCustomElement 特有的：注入进 shadow root 的 CSS
  styles: [`/* inlined css */`],
});

// 注册自定义元素
// 注册之后，所有此页面中的 `<my-vue-element>` 标签
// 都会被升级
customElements.define("my-vue-element", MyVueElement);

// 你也可以编程式地实例化元素：
// （必须在注册之后）
document.body.appendChild(
  new MyVueElement({
    // 初始化 props（可选）
  })
);
```

6.3 Web Components vs Vue Components

自定义元素和 Vue 组件之间确实存在一定程度的功能重叠：它们都允许我们定义具有数据传递、事件发射和生命周期管理的可重用组件。然而，Web Components 的 API 相对来说是更底层的和更基础的。

7. 动画技巧

Vue 除了 <Transition> 和 <TransitionGroup>，还有其他的方式制作动画。

7.1 基于 Css class 的动画

对于那些不是正在进入或离开 DOM 的元素，可以通过给它们动态添加 CSS class 来触发动画：

```js
const disabled = ref(false);

function warnDisabled() {
  disabled.value = true;
  setTimeout(() => {
    disabled.value = false;
  }, 1500);
}
```

```vue
<div :class="{ shake: disabled }">
  <button @click="warnDisabled">Click me</button>
  <span v-if="disabled">This feature is disabled!</span>
</div>
```

```css
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
```

7.2 状态驱动的动画

有些过渡效果可以通过动态插值来实现，比如在交互时动态地给元素绑定样式。看下面这个例子：

```js
const x = ref(0);
function onMousemove(e) {
  x.value = e.clientX;
}
```

```vue
<div
  @mousemove="onMousemove"
  :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
  class="movearea"
>
  <p>Move your mouse across this div...</p>
  <p>x: {{ x }}</p>
</div>
```

```css
.movearea {
  transition: 0.3s background-color ease;
}
```

7.3 基于侦听器的动画

通过发挥一些创意，我们可以基于一些数字状态，配合侦听器给任何东西加上动画。例如，我们可以将数字本身变成动画：

```js
import { ref, reactive, watch } from "vue";
import gsap from "gsap";
const number = ref(0);
const tweened = reactive({
  number: 0,
});
watch(number, (n) => {
  gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 });
});
```

```vue
Type a number:
<input v-model.number="number" />
<p>{{ tweened.number.toFixed(0) }}</p>
```
