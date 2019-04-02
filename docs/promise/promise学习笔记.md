<h2 align="center">promise学习笔记</h2>

## Promise 是什么？

> Promise 是一个表示异步操作最终完成或失败的对象，可以直接向其添加回调函数，而不必将回调函数传进方法。

Promise 有三种状态：Pending、Fullfilled、Rejected。

    初始是 Pendding 状态，表示异步操作正在执行。
    调用 resolve 方法可以让其状态从 Pending 变为 Fullfilled，此时 then 方法中的第一个回调函数被触发；
    调用 reject 方法可以让其状态从 Pending 变为 Rejected 状态，此时 then 方法中的第二个回调函数被触发。

```
const promise = new Promise(function(resolve, reject) {
    // 异步操作，返回之后
        // 判断异步操作的结果
        if (/* 成功 */) {
            resolve("Fullfilled");
        } else {            reject("Rejected");
        }
})

promise.then(onFullfilled, onRejected)
             .catch(e => handleError(e));

// 异步操作成功的回调
function onFullfilled(result) {
    console.log(result);
}

// 异步操作失败的回调
function onRejected(reason) {
    console.log(reason);
}

// 异常处理函数
function handleError(e) {
    throw new Error("Error");
}

```
