# class 类

1. 例子

```
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

> 可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。

2. 类添加方法

```
class Point {
  constructor(){
    // ...
  }

  toString(){
    // ...
  }

  toValue(){
    // ...
  }
}

// 等同于
Point.prototype = {
  toString(){},
  toValue(){}
};

```