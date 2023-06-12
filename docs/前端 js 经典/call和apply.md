# call 和 apply

1. 说明

就是函数继承，属性或者方法

2. 区别

传参的方式不一样

```js
function a() {
  console.log(1)
}
function b() {
  a.apply(this, [1,2])
}
function c() {
  a.call(this, 1, 2)
}
```

2. 举例

构造函数命名都是大写开头

```js
function Animal(name) {
  this.name = name;
  this.showName = funciton() {
    console.log(this.name);
  }
}
function Cat(name) {
  Animal.call(this, name);
}
var cat = new Cat('red cat');
cat.showName() // red cat
```
