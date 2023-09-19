# 类 Class 面向对象

1. 什么是对象

程序中所有操作都需要通过对象来完成，比如：操作浏览器 window 对象，操作网页 document 对象，操作控制台 console 对象。
所有对象都有两个部分：属性和方法。

2. 对象怎么用

class 基础用法

```js
// 定义 Class 类
class Person {
  name = "yqcoder"; // 实例属性，只能通过实例访问
  static age = 18; // static 静态属性，只能通过 Person.age 访问
  readonly render = '男'; // readonly 只读，不能修改

  sayHai() {} // 实例方法
  static sayBy() {} // 静态方法，只能通过 Person.sayBy() 访问
}
```

class 构造函数

```js
class Person {
  name;

  // constructor 构造函数，在对象创建时调用
  // 实例对象的 __proto__.construtor 指向构造函数
  constructor(name, age) {
    // this 指向当前构建的实例
    this.name = name;
  }
}
```

class 继承

```js
// 子类拥有父类的所有属性和方法
class Father {
  name;
  constructor(name) {
    this.name = name;
  }
  sayHi() {}
}

// 子类可以新增自己的属性和方法
class Child extends Father {
  age;
  constructor(name, age) {
    // 必须调用super()，表示父类的构造函数，不然被重写，父类的构造函数就不执行了
    super(name);
    this.age = age;
  }
  play() {}
  // 可以重写父类方法
  sayHi() {
    // 在类方法中 super 代表父类
    super.sayHi();
  }
}
```

class 抽象类

```js
// abstract 就是抽象类，不能实例对象，只能用来被其他类继承，天生父亲
abstract class Father {
  // 抽象方法，没有方法体，只能定义在抽象类中，子类必须对抽象方法重写
  abstract sayHi();
}
```
