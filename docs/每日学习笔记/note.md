<h1 align="center">每日笔记</h1>

## 一.有组织的笔记

### 数组

1. unshfit, push

arr.unshfit(i): 向数组头部添加元素

arr.push(i): 向数组尾部添加元素

3. shfit, pop

arr.shfit(): 删除并返回数组第一个元素

arr.pop(): 删除并返回数组最后一个元素

5. forEach

```
arr.forEach(i => {

})
```

6. indexOf

```
array.indexOf(item) 返回下标
```

7. splice

```
array.splice(index, 1) 删除指定元素
```

## 二.杂记

### a 标签加 javascript 意义

> 执行一段空白的 javascript 语句，返回空或者 false 值，从而防止链接跳转。跟当前 a 标签无关，这段代码始终都会执行。

```
<a href="javascript:;">
```

### 判断浏览器是否支持 ie9

```
<!--[if IE 9]>
  <link ref="stylesheet" type="text/css" href="ie9.css" />
<![endif]-->
```

### 解构

```
get({ page, limit, ...this.search }).then(({ data: { data: list = [], total = [], current_page: current = 1 } }) => {

})
```

### Object.assign()

> Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

```
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

### Promise

1. Promise.all

> Promise.all 等待所有都完成（或第一个失败）

```
Promise.all([getA({ page, limit, ...this.search }), flag && getB()])
.then(([
  {
    data: { data: list = [], total }
  },
  {
    data: cates = []
  } = {}
]) => {
  falg && (this.list = [...cates])
})
.catch(() => {

})

```

2. Promise.resolve({})

> Promise.resolve(value)方法返回一个以给定值解析后的 Promise 对象。但如果这个值是个 thenable（即带有 then 方法），返回的 promise 会“跟随”这个 thenable 的对象，采用它的最终状态（指 resolved/rejected/pending/settled）；如果传入的 value 本身就是 promise 对象，则该对象作为 Promise.resolve 方法的返回值返回；否则以该值为成功状态返回 promise 对象。

```
var promise1 = Promise.resolve(123);

promise1.then(function(value) {
  console.log(value);
  // expected output: 123
});
```

### Array.from()

> Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。

```
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```

### new Set(arr)

> 数组去重

### em

> “em”是一个相对的大小,相对所指的是相对于元素父元素的 font-size
