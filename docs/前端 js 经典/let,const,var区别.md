# let、const、var 区别

1. 作用域

```js
if (true) {
  // var出来的变量是全局的，但是不能跨函数访问
  var a = 0;
  let b = 0;
  const c = 0;
}
console.log(a); // 0
console.log(b); // b is not defined
console.log(c); // c is not defined
```

2. 变量提升

```js
console.log(a); // 1
console.log(b); // b is not defined
console.log(c); // c is not defined

var a = 1;
let b = 2;
const c = 3;
```

3. 全局属性

```js
var a = 1;
let b = 2;
const c = 3;

console.log(window.a); // 1
console.log(window.b); // undefined
console.log(window.c); // undefined
```

4. 初始值

```js
// var, let 不用设置初始值
// const 必须设置初始值
```
