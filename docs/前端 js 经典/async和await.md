# async 和 await

1. 什么是 async

async 作为一个关键字放到函数前面，用于表示函数是一个异步函数。异步函数也就意味着该函数的执行不会阻塞后面代码的执行。
async 函数返回的是一个 Promise 对象

2. 怎么用

```js
// 调用fn返回的是promise对象，如果我们要拿到返回值，用then，如果返回错误，用catch
async function fn(flag) {
  if (flag) {
    return "success";
  } else {
    throw "faild";
  }
}
fn(true)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

3. 什么是 await

await 后面可以放任何表达式，不过正常情况下还是放一个返回 promise 对象的表达式。
await 关键字只能放在 async 函数里

```js
// 延时函数delay
const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

// f() 异步函数就完美的解决了回调函数问题
async function f() {
  await delay(1000);
  await delay(2000);
  await delay(3000);
  return "done";
}

// 6秒后打印结果 done
f().then((data) => {
  console.log(data);
});
```

4. try...catch

await 后的 promise 对象报错怎么办，页面不可能一直卡在那不动，这对于用户体验是很不友好的。那么 try...catch 应运而生

```js
let faildPro = new Promise((resolve, reject) => {
  reject("失败啦");
});

async function resultFn() {
  try {
    let result = await faildPro;
    return result;
  } catch (err) {
    throw err;
  }
}

resultFn()
  .then((res) => {
    console.log(`返回体：${res}`);
  })
  .catch((err) => {
    console.log(`错误信息：${err}`);
  }); // 错误信息：失败啦
```
