# 从0开始学习vue3.0

1. vue3.0 和 vue2.0 的区别

我们要学习 vue3，就要知道为什么要学习它，vue3 和 vue2 的区别在哪，对于我们开发的优势在哪。

vue3.0 与 2020/9/18 正式发布，vue2.0 与 2023/12/31 日停止维护。

双向数据绑定原理
   vue2: es5 中的 Object.definepropert()劫持数据，结合发布订阅模式
   vue3: es6 中的 proxyAPI
   优势: proxyAPI 可以进行全对象监听，可以检测到对象内部的数据变化
根节点
   vue2: 只能有一个根节点
   vue3: 可以有多个根节点
   优势: html 结构不需要一个无用父节点来包裹
API
   vue2: Options API（选项式 API）
   vue3: Composition API（组合式 API）
   优势: 一个功能模块的 js 代码，定义变量，方法，计算属性，都可以放在一块，更方便后期的维护和复用。同时选项式 API 是在组合式 API 的基础上实现的！

2. 创建应用

```js
// 单个应用
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
// 注册组件
app.component("component", component);
app.mount("#app");
```

```js
// 多个应用
import { createApp } from "vue";
import App1 from "./App.vue";
import App2 from "./App1.vue";

const app1 = createApp(App1);
app1.mount("#container-1");

const app2 = createApp(App2);
app2.mount("#container-2");
```

3. 模板语法

以下是 vue 中变量在 template 中的用法

```html
{{ msg }} {{ ok ? yes : no }}
<div :id="id"></div>
<div
  :id="`my-${id}`"
  @click="handleClick"
  :[attributeName]="url"
  @[eventName]="doSomething"
></div>
```

4. 响应式基础

```js
// reactive: 仅对对象类型有效
// ref: 需要.value取值
import { reactive, ref } from "vue";

let state = reactive({ count: 0 });

let count = ref(0);
console.log(count) // { value: 0 }
console.log(count.value) // 0

<div>{{ state.count }}</div>
<div>{{ count }}</div>
```

5. 计算属性

```js
// computed: 需要.value取值
import { ref, computed } from "vue";
let name = ref("yqcoder");
let nameLength = computed(() => {
  return name.value.length;
});
console.log(nameLength); // { value: 0 }
console.log(nameLength.value); // 7

<div>{{ nameLength }}</div>;
```

6. Class 与 Style 绑定

```html
<div :class="{ active: isActive, 'text-danger': hasError }"></div>
<div :class="[activeClass, errorClass]"></div>
<div :class="[isActive ? activeClass : '', errorClass]"></div>
<div :class="[{ active: isActive }, errorClass]"></div>

<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

7. 条件渲染

v-if 是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。
v-show 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS display 属性会被切换。

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-show="ok">Hello!</h1>
```

8. 列表渲染

Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表。当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。
为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的 key attribute。

```html
<li v-for="(item, index) in items" :key="index">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

9. 事件处理

```html
<button @click="say('hello')">Say hello</button>

<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />
```

10. 生命周期

beforecate 和 created，它们被 setup 方法本身所取代。

```js
// beforeCreate: 通常用于插件开发中执行一些初始化任务
// created：组件初始化完毕，可以访问各种数据，获取接口数据等

import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

// dom已创建，所以用来获取访问数据和dom元素；访问子组件等
onMounted(() => {});

// 在组件因为响应式状态变更而更新其 DOM 树之后调用
onUpdated(() => {});

// 在组件实例被卸载之后调用
onUnmounted(() => {});
```

11. 侦听器

```js
import { ref, watch } from "vue";

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
  },
  { immediate: true, deep: true }
);

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});
```

12. 模板引用

直接访问底层 DOM 元素

```html
<input ref="input" />
```

```js
import { ref, onMounted } from "vue";

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null);

onMounted(() => {
  input.value.focus();
});
```

13. 深入组件

13.1 Props 声明

```js
const props = defineProps(["foo"]);
console.log(props.foo);

// 或者
defineProps({
  title: String,
  likes: Number,
});

// 最全
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

13.2 事件

```js
const emit = defineEmits(["inFocus", "submit"]);

function buttonClick() {
  emit("submit");
}
```

13.3 插槽

```js
// 子组件
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


// 父组件
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

14. 自定义指令

```js
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}

<template>
  <input v-focus />
</template>
```

全局注册指令

```js
const app = createApp({});

// 使 v-focus 在所有组件中都可用
app.directive("focus", {
  /* ... */
});
```

一个指令的定义对象可以提供几种钩子函数 (都是可选的)

```js
// el：指令绑定到的元素。这可以用于直接操作 DOM。
// binding：一个对象。
// vnode：代表绑定元素的底层 VNode。
// prevNode：之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。
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

例子

```js
<div v-demo="{ color: 'white', text: 'hello!' }"></div>;
app.directive("demo", (el, binding) => {
  console.log(binding.value.color); // => "white"
  console.log(binding.value.text); // => "hello!"
});
```
