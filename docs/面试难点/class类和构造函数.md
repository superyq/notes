# class类 和 构造函数

1. 例子

```js
class Animal {
  constructor(name) {
    this.name = name
  }

  sayName() {
    alert(this.name)
  }
}

function Animal(name) {
  this.name = name;

  this.say = function() {
    console.log(`my name is ${name}`)
  }
}
```

2. 继承

```js
class a extends Animal {
  construct(name, sex) {
    super(name); // 必须先调用这个
    this.sex = sex;
  }
}

function a(name) {
  Animal.apply(this, name)
}
```

