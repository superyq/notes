# class 类

1. 定义

函数声明和类声明之间的一个重要区别在于，函数声明会提升，类声明不会。

```js
// 类声明
class Person {}

// 类表达式
const Person = class {};
```

2. 类构造函数

```js
// constructor 方法是一个特殊的方法，一个类只能有一个，如果没定义，默认添加一个空的constructor函数
// 使用new操作符实例化Person的操作等于使用new调用其构造函数。
class Person {
  constructor(name, age) {
    this.type = "人";
    this.name = name;
    this.age = age;
  }
  say() {
    console.log("hello");
  }
}

let yqcoder = new Person('yqcoder', 18); // Person {type: '人', name: 'yqcoder', age: 18}
```

3. getter 和 setter

```js
// 在 class 内部可以使用 get 与 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```