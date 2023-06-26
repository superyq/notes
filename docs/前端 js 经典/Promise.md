# Promise

1. 什么是 Promise

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大,它是一个 ECMAScript 6 提供的类，目的是更加优雅地书写复杂的异步任务。

2. Promise 的用途

为了解决回调地狱问题

3. Promise 的用法

```js
// 构造函数接收了一个函数作为参数，该函数就是Promise构造函数的回调函数，该函数中有两个参数resolve和reject，这两个参数也分别是两个函数！
new Promise(function (resolve, reject) {
  // resolve 表示成功的回调
  // reject 表示失败的回调
})
  .then(function (res) {
    // 成功的函数
  })
  .catch(function (err) {
    // 失败的函数
  });

// or
let demo = new Promise((resolve, reject) => {
  let number = 10;
  setTimeout(() => {
    if (number >= 10) {
      resolve(number);
    } else {
      reject(1);
    }
  }, 1000);
});
demo
  .then((res) => {
    console.log("成功", res);
  })
  .catch((err) => {
    console.log("失败", err);
  });

// Promise.all() 接受多个promise的实例做为参数，参数必须是一个数组，promise都执行成功后，返回的是执行后的结果的一个数组，如果有一个失败了，返回的是第一个失败的返回值
let pro1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("pro1 success");
  }, 1000);
});
let pro2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("pro2 success");
  }, 2000);
});
let pro3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("pro3 faild");
  }, 1000);
});
Promise.all([pro1, pro2]).then((res) => {
  console.log(res);
}); //  ['pro1 success', 'pro2 success']
Promise.all([pro1, pro3, pro2])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("faild", err);
  }); // faild pro3 faild

// Promise.race( ) 接受多个promise的实例做为参数，参数必须是一个数组，其中一个promise完成时执行,返回结果是第一个完成的promise的返回数据
Promise.race([pro2, pro1]).then(res => {
    console.log(res)
}) // pro2 success
```
