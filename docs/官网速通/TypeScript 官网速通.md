# TypeScript 速通

前言：博主看了很多关于 TypeScript 的文档和视频，都是将 TypeScript 讲的特别详细和复杂，恨不得将 JavaScript 是怎么来的都讲解出来，这导致博主根本看不下去，找不到学习重点。博主就想着自己写一篇简洁易懂的入门 TypeScript 的基础用法，更深层次的用法根据实际项目需求去找，博主觉得更有益于学习的循序渐进，一次性灌输太多深层次的知识概念，会导致初学者的兴趣和学习动力大减，这篇博客是参考[TypeScript 中文网](https://www.tslang.cn/index.html)概括基础性知识和用法的文章，看完这篇博客，再次面对 TypeScript，我们也会有一战之力。

一、TypeScript 有什么用

JavaScript 是一门灵活性很高的语言，对变量的类型没有强定义，什么意思呢？就是说一个变量声明之后，无论后续你给这个变量赋予什么类型的值都是可以的。

这就诞生了一些问题。比如你定义一个函数，这个函数是为了计算传入参数的总和。那么我们传入的参数肯定都是 Number 类型的值，但是在 JavaScript 中，你可以传入任何类型的值，并且不会在编译时报错，只会在执行的时候报错。如果这个函数内部还有很多其他操作，执行代码在函数的第 200 行，那么开发人员维护和体验都是很不好的。

这个时候 TypeScript 就体现出他的强大了，可以对变量进行类型声明，在编译时，如果传入的值和声明的类型不一致，就会报错，而不是到执行时才报错，可以让我们及时发现错误并修复。

```js
// index.js
function allPrice(price, count) {
  return price * count;
}
```

```ts
// index.ts
// 对函数参数类型和返回类型进行了声明，如果调用这个函数时，传入参数和定义类型不一致，就会马上报错，并不会到执行的时候才报错。
function allPrice(price: number, count: number): number {
  return price * Count;
}
```

简而言之就是 TypeScript 可以对变量进行类型的强约束。

二、TypeScript 怎么用

TypeScript 并不能直接运行在浏览器、node 环境、微信小程序中。是需要进行编译的。所以需要我们手动安装编译插件 typescript，有些通过脚手架创建的项目，自身已经安装了针对 typescript 的编译器，就不用我们手动安装了。

用 TypeScript 对变量进行了类型强约束后，如果重新赋值不同类型，就会导致报错，通知开发人员及时进行漏洞修复。

1. 全局安装 typescript

安装完成后，通过 tsc -v 查看版本，判断是否安装成功

```bash
npm install -g typescript
```

查看版本

```bash
tsc -v
# Version 5.5.2
```

2. 使用 TS

创建一个练习文件夹 "ts 练习" 名字自取，在文件夹里创建一个 index.ts，内容如下

```ts
// index.ts
let price: number = 118;
let count: number = 20;

const totalPrice = (price: number, count: number): number => {
  return price * count;
};
```

在 "ts 练习" 文件夹下运行命令 tsc index.ts 编译 ts 文件生成 js 文件。生成 index.js 内容如下。

```js
// index.js
var price = 118;
var count = 20;
var totalPrice = function (price, count) {
  return price * count;
};
```

三、TypeScript 语法

基础类型、对象、接口、数组、函数、联合类型、类型别名、字面量、元组、枚举、void、any 等等

1. 基础类型

我们可以根据基础类型直接约束变量的赋值类型，基础类型有：数字 number、字符串 string、布尔值 boolean、Null null、Undefined undefined、对象 object 等类型。

用法：let 变量名: 基础类型 = 变量值

例子：定义不同变量约束不同的类型

```ts
// 数字
let count: number = 10;
// 字符串
let username: string = "yqcoder";
// 布尔值
let isTop: boolean = true;
// Null
let loves: null = null;
// Undefined
let phone: undefined = undefined;
// 对象
let user: object = {};
```

编译后

```js
// 数字
var count = 10;
// 字符串
var username = "yqcoder";
// 布尔值
var isTop = true;
// Null
var loves = null;
// Undefined
var phone = undefined;
// 对象
var user = {};
```

2. 联合类型

一个变量可以接受不同的基础类型，我们就需要用到联合类型。

用法：类型 | 类型 | 类型 | ....

例子：定义一个变量 userId 可以赋值 string 类型、number 类型、null。

```ts
let userId: string | number | null = 1;
```

编译后

```js
var userId = 1;
```

3. 类型别名

有多个变量接受同一种联合类型，可以将联合类型赋值给类型别名，便于维护。

用法：type 类型别名 = 联合类型

例子：定义 3 个变量 userName，userPhone，userEmail 同时接受同一种联合类型。

```ts
type StrOrNull = string | null;

let userName: StrOrNull = "yqcoder";
let userPhone: StrOrNull = null;
let userEmail: StrOrNull = null;
```

编译后

```js
var userName = "yqcoder";
var userPhone = null;
var userEmail = null;
```

4. 字面量

有一个变量只能赋值固定的字符串，这些字符串我们可以称之为字面量，字面量一般配合联合类型和类型别名使用。

用法：type 类型别名 = 字面量 | 字面量 | ....

例子：定义 sex 变量，只能赋值 'male' 和 'female'

```ts
type Sex = "male" | "female";

let sex: Sex = "male";
```

编译后

```js
var sex = "male";
```

5. 接口

5.1 基础用法

接口一般用来定义对象内部属性的类型。

用法：interface 接口名 { 属性名: 类型 }

例子：定义一个 user 对象，name 和 sex 都是 string 类型和 age 是 number 类型。

```ts
interface IUser {
  name: string;
  sex: string;
  age: number;
}

let user: IUser = {
  name: "yqcoder",
  sex: "male",
  age: 18,
};
```

编译后

```js
var user = {
  name: "yqcoder",
  sex: "male",
  age: 18,
};
```

5.2 属性修饰符

接口定义对象属性时，还可以添加修饰符，比如可选属性、只读属性。

可选属性：属性后面加一个 ? 符号，表示该属性可选。

只读属性：属性名前加 readonly，表示该属性只读。

例子：定义一个 user 对象，name 和 sex 都是 string 类型，age 如果存在是 number 类型，也可以不存在。其中 sex 不可修改。

```ts
interface IUser {
  name: string;
  readonly sex: string;
  age?: number;
}

let user: IUser = {
  name: "yqcoder",
  sex: "male",
};
```

编译后

```js
var user = {
  name: "yqcoder",
  sex: "male",
};
```

5.3 任意类型属性

有些时候，对象里面还有一些其他属性我们是不知道的，同时类型也是无法定义的，这时候我们可以使用 [propName: string]: any 表示任意类型的属性

例子：定义一个 user 对象，只能确定里面有 name 属性，类型是 string。其他的属性是不确定的。

```ts
interface IUser {
  name: string;
  [propName: string]: any;
}

let user: IUser = {
  name: "yqcoder",
  loves: ["吃", "喝", "玩", "乐"],
};
```

编译后

```js
var user = {
  name: "yqcoder",
  loves: ["吃", "喝", "玩", "乐"],
};
```

5.4 函数接口

可以通过接口定义函数参数类型和返回值

用法：interface 接口名 { (参数名: 类型): 类型 }

例子：构建一个计算面积的函数，参数是长、宽，返回值是面积。

```ts
interface IGetArea {
  (w: number, h: number): number;
}

const getArea: IGetArea = (w, h) => {
  return w * h;
};
getArea(10, 20); // 200
```

编译后

```js
var getArea = function (w, h) {
  return w * h;
};
getArea(10, 20); // 200
```

5.5 接口继承

一个接口可以继承多个接口，创建出多个接口的合成接口

用法：interface 接口名 extends 接口名, 接口名, ... {}

例子：定义两个接口，使用第三个接口继承前两个接口

```ts
type TSex = "male" | "female";

interface IName {
  name: string;
}

interface IAge {
  age: number;
}

interface IUser extends IName, IAge {
  sex: TSex;
}

let user: IUser = {
  name: "yqcoder",
  age: 18,
  sex: "male",
};
```

编译后

```js
var user = {
  name: "yqcoder",
  age: 18,
  sex: "male",
};
```

5.6 混合类型（用的少）

让变量同时作为函数和对象使用。

```ts
interface IMixDemo {
  (arg: string): void;
  defaultStr: string;
}

function demo(): IMixDemo {
  let x = <IMixDemo>function (str) {
    console.log(str);
  };
  x.defaultStr = "yqcoder";
  return x;
}

const yq = demo();
console.log(yq.defaultStr); // yqcoder
console.log(yq("good")); // good
```

编译后

```js
function demo() {
  var x = function (str) {
    console.log(str);
  };
  x.defaultStr = "yqcoder";
  return x;
}
var yq = demo();
console.log(yq.defaultStr); // yqcoder
console.log(yq("good")); // good
```
