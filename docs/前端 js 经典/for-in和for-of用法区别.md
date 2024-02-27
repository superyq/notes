# for-in 和 for-of 用法区别

1. for-in

对于 string, object, array 类型使用 for-in

```js
const str = "qwe";
const arr = ["yqcoder", "db"];
const obj = {
  name: "yqcoder",
  age: 18,
};

for (let i in str) {
  console.log(i); // 0 1 2
}
for (let i in arr) {
  console.log(i); // 0 1
}
for (let i in obj) {
  console.log(i); // name age
}
```

2. for-of

对于 string, object, array 类型使用 for-of

```js
const str = "qwe";
const arr = ["yqcoder", "db"];
const obj = {
  name: "yqcoder",
  age: 18,
};

for (let i of str) {
  console.log(i); // q w e
}
for (let i of arr) {
  console.log(i); // yqcoder db
}
for (let i of obj) {
  console.log(i); // obj is not iterable
}
```

综上：for-in 可遍历 string，object，array 类型，遍历的是下标或 key，for-of 只能遍历 string, array 类型，遍历的是 value 值
