# async

1. async 异步函数返回的是promise
2. await 跟的也是promise，如果不是，直接转成resolve的promise

```js
const delay = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

async function f() {
    await delay(1000);
    await delay(2000);
    await delay(3000);
    return 'done'
}

f().then(data => {
    console.log(data)
})
```