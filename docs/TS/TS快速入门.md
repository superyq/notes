# TS 快速入门

TS 函数限制

```ts
// 定义 fn，参数必须是number，返回值必须是number
let fn: (agr1: number, agr2: number) => number;

// 参数1，参数2，返回值，都被 TS 确定为必须是 number 类型，不然报错。
function fn(arg: number, arg2: number): number {
  return arg + arg2;
}
// void 表示空，表示没有返回值
function fn1(): void {}
// never 表示永远不会返回结果
function fn2(): never {
  throw new Error("报错了");
}
```

TS 数组限制

```ts
// arr 只能是字符串数组
let arr: string[];
let arr: Array<string>;
// 元组：固定长度的数组
let arr: [string, string];
```

TS 类限制

```ts
class Person {
  name: string;
}
```

3. TS 语法

TS 类型断言

```ts
// 语法：变量 as 类型
//       <类型>变量
let str = unknown;
str as string;
<stirng>str;
```

TS 枚举

```ts
enum Gender {
  Male = 1,
  Female = 2,
}
let people: { name: string; gender: Gender };
people: {
  name: 'qcoder',
  gender: Gender.Male
}
```

TS 接口

```js
// 接口就是一个规范，满足这个规范，就可以在这个场景中使用
// 接口定义类的结构，所有属性和方法都没有值
interface myInterface {
  name: string;
  sayHi(): void;
}

// 类 实现接口
class MyClass implements myInterface {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi() {}
}
```

TS 属性封装

```ts
class Person {
  // public 默认时 public 公有属性，可以在
  name: string;
  // private 只能在类内部进行修改访问，实例对象不能访问，子类也不能访问
  private age: number;
  // protected 可以在当前类，和子类中可以访问
  protected gender: string;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  // get，set 是 TS 的语法糖，就可以在外部对private属性进行访问和修改了
  get name() {
    return this.name;
  }
  set name(value: string) {
    return (this.age = value);
  }
}
```

TS 泛型

```ts
// 类型不确定时，可以使用泛型
function fn<T>(a: T): T {
  return a;
}
fn(10); // 不指定泛型，TS自动推断
fn<string>("hi"); // 指定泛型

// 多个泛型
function fn<T, K>(a: T, b: K): T {
  return a;
}
fn<number, string>(10, "hi");

// 限定泛型类型
interface Inter {
  length: number;
}
// T 泛型必须时继承了 Inter 的对象，里面必须有 length 属性
function fn<T extends Inter>(a: T): number {
  return a.length;
}
```
