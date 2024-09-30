# TypeScript 速通

前言：参考[TypeScript 中文网](https://www.tslang.cn/index.html)概括基础性知识和用法的文章。

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

1. 基础类型校验

我们可以根据基础类型直接约束变量类型，基础类型有：数字 number、字符串 string、布尔值 boolean、Null null、Undefined undefined 类型。

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
```

2. 联合类型

一个变量可以接受不同的基础类型，我们就需要用到联合类型。

用法：类型 | 类型 | 类型 | ....

例子：定义一个变量 userId 可以赋值 string 类型、number 类型、null。

```ts
let userId: string | number | null = 1;
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

4. 字面量

有一个变量只能赋值固定的字符串，这些字符串我们可以称之为字面量，字面量一般配合联合类型和类型别名使用。

用法：type 类型别名 = 字面量 | 字面量 | ....

例子：定义 sex 变量，只能赋值 'male' 和 'female'

```ts
type Sex = "male" | "female";

let sex: Sex = "male";
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

6. 数组

限制数组类型，一般是限制数组内部元素的类型。比如字符串数组、数字数组，对象数组，不规则数组。

6.1 字符串数组

由字符串组成的数组

```ts
let arr: string[] = ["a", "b", "c"];
```

6.2 数字数组

由数字组成的数组

```ts
let arr: number[] = [1, 2, 3];
```

6.3 不规则数组

由任意类型元素组成的数组

```ts
let arr: any[] = [];
```

6.4 对象数组

由对象组成的数组，对象的 username，sex，status 是必有属性。[propName: string]: any; 为其他未知属性。

```ts
interface IUser {
  username: string;
  sex: string;
  status: number;
  [propName: string]: any;
}

let userList: IUser[] = [
  { username: "yqcoder", sex: "man", status: 1, createTime: "2024-12" },
  { username: "dyb", sex: "woman", status: 0, createTime: "2024-12" },
];
```

7. 元组

元组（Tuple）是一种特殊的数据结构，元组允许你定义一个固定长度的数组，其中每个元素的类型可以不同。

```ts
let arr: [string, number] = ["yqcoder", 18];
```

8. 枚举

枚举（Enum）是一种为一组数值赋予有意义名称的方式。

枚举可以让代码更具可读性和可维护性。例如，如果您有一组表示星期几的数值，使用枚举可以将数字与有意义的名称关联起来：

```ts
enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

let today: Day = Day.Monday;
```

在上述示例中，定义了一个名为 Day 的枚举，其中包含了从 Monday 到 Sunday 的值。默认情况下，枚举成员的值从 0 开始递增。

你还可以为枚举成员指定具体的值：

```ts
enum Status {
  Pending = 1,
  InProgress = 2,
  Completed = 3,
}
```

枚举还支持反向映射，也就是说您可以通过值获取到对应的名称：

```ts
enum Status {
  Pending = 1,
  InProgress = 2,
  Completed = 3,
}

console.log(Status[1]); // 输出 "Pending"
```

枚举在处理具有有限数量的、明确的、相关值的场景中非常有用。例如，状态码、方向、颜色等。

9. void

void 用于表示一个函数没有返回值，或者说返回类型为空。

使用 void 关键字来指定函数的返回类型为 void，可以帮助进行更好的类型检查和代码约束。例如：

```ts
let sayHi = (): void => {
  console.log("Hi!");
};
```

在上述例子中，函数 sayHi 没有返回值，因此使用 void 来定义其返回类型

void 类型具有以下特性：

| void 类型的变量不能被赋予除 undefined 和 null 之外的其他值。

| 当一个函数的返回类型被定义为 void 时，不能使用该函数的返回值。如果函数体内有返回语句，会产生类型错误。

| 如果一个函数没有指定返回类型，并且函数体中没有返回语句，则默认返回类型为 void。

void 类型的使用场景包括：

| 对于没有返回值的函数，使用 void 类型可以提高代码的可读性和可维护性。

| 对于需要明确表示函数没有返回值的场景，使用 void 类型可以提供更好的类型检查和约束，让其他开发者清楚地知道该函数不会返回任何值。在调用 void 类型的函数时，不需要接收返回值。

10. nerver

它表示的是值永远不会出现的一种类型。例如，一个必定抛出错误的函数，其返回值就是 never 类型：

```ts
let throwError = (message: string): never => {
  throw new Error(message);
};
```

在上述例子中，throwError 函数的输入类型为 string，但返回类型为 never，因为当函数执行时，它会抛出一个错误并终止执行，永远不会返回任何值。

never 类型的一些常见用途包括：

| 表示函数抛出异常或无法执行到终止点

| 用于类型检查，确保某些代码分支是不可达的，帮助开发者发现潜在的逻辑错误。

never 类型在联合类型和交叉类型中有特定的行为：

| never 会从联合类型中移除，类似于将零和其他数字相加时结果等于该数字。

| never 会覆盖交叉类型中的其他类型，类似于零乘其他数字时结果等于零。

需要注意的是，never 类型是所有类型的子类型，这意味着它可以赋值给任何类型（在某些情况下，可能需要特定的配置或条件）。但是，除了 never 本身，没有其他类型可以赋值给 never 类型的变量。

11. 类型断言

类型断言（Type Assertion）是一种告诉编译器“相信我，我知道这个变量的类型”的方式。

类型断言有两种形式：

| “尖括号”语法：(<类型>变量)

| as 语法：变量 as 类型

例如，如果有一个变量 maybeString ，但您确定它实际上是一个字符串，就可以使用类型断言：

```ts
let maybeString: any = "This is a string";
let length1 = (<string>maybeString).length;
let length2 = (maybeString as string).length;
```

12. 函数

普通函数限制参数类型和返回值类型

```ts
let sum = (num1: number, num2: number): number => {
  return num1 + num2;
};
```

12.1 可选参数

参数名后面接一个 ?，可选参数必须跟在必须参数后面

```ts
let square = (x: number, y: number, s?: number): number => {
  if (s) {
    return x * y * s;
  } else {
    return x * y;
  }
};
square(5, 6); // 30
square(5, 6, 2); // 60
```

12.2 默认参数

参数名后接 = 默认值

```ts
let square = (width = 6, height = 6, scale: number, cut = 10): number => {
  return width * height * scale - cut;
};
square(5, undefined, 2); // 5 * 6 * 2 - 10 = 50
```

12.3 剩余参数

表示可以接受任意数量的参数，并将它们作为一个数字数组进行处理。

```ts
let max = (a: number, b: number, ...resArr: number[]): number => {
  return Math.max(a, b, ...resArr);
};
max(10, 5, 6, 100, 200); // 200
```

13. 类

使用关键字 class 紧跟类名来定义类。类可以包含字段、构造函数和方法等模块。

```ts
class Car {
  // 字段
  engine: string;

  // 构造函数
  constructor(engine: string) {
    this.engine = engine;
  }

  // 方法
  disp(): void {
    console.log("发动机为 : " + this.engine);
  }
}
```

13.1 继承

通过 extends 关键字实现类的继承。子类可以继承父类的属性和方法，并可以重写父类的方法。子类重写父类方法时，可以通过 super 关键字引用父类的属性和方法。

```ts
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}
const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

13.2 修饰符

public（公共）：可以自由地访问类程序里定义的成员，这是默认的修饰符。如果明确地将成员标记为 public 也是可以的。
private（私有）：只能在该类的内部进行访问，实例对象和继承该类的子类都不能访问私有成员。
protected（受保护）：除了在该类的内部可以访问外，在子类中仍然可以访问，但实例对象不能访问受保护的属性。
readonly（只读）：通过 readonly 关键字声明，只读属性必须在声明时或构造函数里被初始化。
static（静态）：静态属性或方法存在于类本身上面而不是类的实例上，通过 static 关键字定义，访问静态属性需要通过“类型.静态属性”的形式。

```ts
class Square {
  static width = "100px";
}
console.log(Square.width); // 100px

class PrinterClass {
  doPrint(): void {
    console.log("父类的 doPrint() 方法。");
  }
}
class StringPrinter extends PrinterClass {
  doPrint(): void {
    super.doPrint(); // 调用父类的函数
    console.log("子类的 doPrint()方法。");
  }
}

class Person {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}
new Person("Cat").name; // 错误: 'name' 是私有的。

class Parent {
  protected property: number;
}
class Child extends Parent {
  accessProperty() {
    console.log(this.property); // 可以访问父类中受保护的属性
  }
}
```

13.3 抽象类

使用 abstract 关键字定义。抽象类不能被直接实例化，通常需要创建子类去继承它。抽象类可以包含抽象方法（没有具体实现的方法），子类必须实现这些抽象方法。

```ts
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log("roaming the earth...");
  }
}

class Cat extends Animal {
  makeSound() {
    console.log("miao miao");
  }
}
const cat = new Cat();
cat.makeSound();
cat.move();
```

总的来说，TypeScript 的类提供了一种更清晰、更结构化的方式来组织和管理代码，有助于提高代码的可维护性、可读性和可扩展性，使开发者能够更好地利用面向对象编程的优势来构建复杂的应用程序。

14. 泛型

泛型就是使用一个类型变量来表示一种类型，类型值通常是在使用的时候才会设置。泛型的使用场景很多，可以在函数、类、interface 接口中使用

14.1 函数泛型

14.1.1 单个泛型

```ts
function demo<T>(a: T): T {
  return a;
}
demo(10); // 10
demo<number>(10); //10
```

14.1.2 多个泛型

```ts
function demo<T, K>(a: T, b: K): T {
  return a;
}
demo(1, "2"); // 1
demo<number, string>(1, "2"); // 1
```

14.2 类泛型

```ts
class Demo<T> {
  name: T;
  constructor(name: T) {
    this.name = name;
  }
  say(arg: T): void {
    console.log(`${this.name}, ${arg}`);
  }
}
const yq = new Demo<string>("yqcoder"); // Demo { name: 'yqcoder' }
yq.say("你好"); // yqcoder, 你好
```

14.3 接口泛型

```ts
interface IDemo<T, K> {
  name: T;
  age: K;
  say(str: T): void;
}
const yq: IDemo<string, number> = {
  name: "yqcoder",
  age: 18,
  say(str) {
    console.log(`${this.name}, ${str}`);
  },
}; // { name: 'yqcoder', age: 18, say: [Function: say] }
yq.say("你好"); // yqcoder, 你好
```

14.4 泛型约束

泛型可以通过 extends 一个接口来实现泛型约束，写法如：<泛型变量 extends 接口>

```ts
interface IDemo {
  length: number;
}
function demo<T extends IDemo>(arg: T): void {
  console.log(arg.length);
}
demo([1, 2, 3]); // 3
demo<number[]>([1, 2, 3]); // 3
```
