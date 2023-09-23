# apply、call、bind

前言：都是用来改变函数中 this 指向的。区别在于 apply、call 传参方式不一样，调用后，直接执行函数。bind 调用后，返回一个函数体，不直接执行函数。
那为什么要改变 this 指向呢。正常情况下，谁调用函数 this 就指向谁。那调用这个函数的那个谁，要访问另一个谁的属性或方法，就需要改变其 this 的指向，到另一个谁那去

```js
// 例：打印用户信息的函数
const yqcoder = {
  name: "yqcoder",
  age: 18,
  sex: "man",
};
function userInfo(addAge) {
  return `name: ${this.name},age: ${this.age + addAge},sex:${this.sex}`;
}

// 直接调用，this 指向的是 window，如同 window.userInfo
userInfo(10); // name: ,age: NaN,sex:undefined
// 用 call 改变 this 指向 yqcoder 对象
userInfo.call(yqcoder, 10); // name: yqcoder,age: 1810,sex:man
// 用 apply 改变 this 指向 yqcoder 对象
userInfo.apply(yqcoder, [10]); // name: yqcoder,age: 28,sex:man
// 用 binde 改变 this 指向 yqcoder 对象
const fn = userInfo.bind(yqcoder);
fn(10); // name: yqcoder,age: 28,sex:man
```
