# async

1. 说明

它作为一个关键字放到函数前面，用于表示函数是一个异步函数, 异步函数也就意味着该函数的执行不会阻塞后面代码的执行

2. async 函数返回的是一个promise 对象，如果要获取到promise 返回值，我们应该用then 方法， 继续修改代码

```
async function timeout() {
    return 'hello world'
}
timeout().then(result => {
    console.log(result);
})
console.log('虽然在后面，但是我先执行');

// 执行结果

虽然在后面，但是我先执行
hello world
```

3. async/await特点

async/await是一个用同步思维解决异步问题的方案（等结果出来之后，代码才会继续往下执行）