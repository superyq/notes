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

let yqcoder = new Person("yqcoder", 18); // Person {type: '人', name: 'yqcoder', age: 18}
```

3. getter 和 setter

```js
// 在 class 内部可以使用 get 与 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
class Person {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }

  get nameL() {
    return this.name.length;
  }

  set nameL(value) {
    console.log("设置长度");
    this.length = value;
  }
}

let yqcoder = new Person("yqcoder"); // Person {name: 'yqcoder', length: undefined}
yqcoder.nameL; // 7
yqcoder.nameL = 9; // 设置长度
yqcoder; // Person {name: 'yqcoder', length: 9}
```

4. Generator 方法

```js
// generator 函数 具有迭代功能
class Person {
  constructor(...args) {
    this.args = args;
  }
  *generatorFn() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

let yqcoder = new Person(1, 2, 3, 4); // Person {args: Array(4)}
let generatorNext = yqcoder.generatorFn();
generatorNext.next(); // {value: 1, done: false}
generatorNext.next(); // {value: 2, done: false}
generatorNext.next(); // {value: 3, done: false}
generatorNext.next(); // {value: 4, done: false}
generatorNext.next(); // {value: undefined, done: false}
```

5. 静态属性、方法

```js
// 静态的就是类实例不能调用，只有类本身可以用。
// 属性或方法前加static关键字，就变成静态的了。
// 使用静态属性或方法就是为了阻止被类实例继承
class Person {
  constructor(name) {
    this.name = name;
  }
  static type = "person";
  static eat() {
    console.log("开饭了");
  }
}

let yqcoder = new Person("yqcoder"); // Person {name: 'yqcoder'}
yqcoder.type; // undefined
yqcoder.eat(); // yqcoder.eat is not a function
Person.type; // 'person'
Person.eat(); // 开饭了

// 类继承类，可以使用继承类里的静态属性和方法
class P1 extends Person {}
P1.type; // 'person'
P1.eat(); // 开饭了
```

6. 私有属性、方法

```js
// 私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。
// 属性或方法前加#关键字，就变成私有的了。
class Person {
  constructor(name) {
    this.name = name;
  }
  #type = "person";
  #eat() {
    console.log("开饭了");
  }
}
```

7. 类继承

```js
// 语法：class 子类 extends 父类
// 子类中声明的方法名和父类中的方法名相同时，子类中的方法将覆盖继承于父类的方法，采用自己的
// 父类
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
// 子类 super() 函数必须用
class Student extends Person {
  constructor(name, age, study) {
    super(name, age);
    this.study = study;
  }
}
```
