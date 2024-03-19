# 数组常用方法总结

一：不改变原数组的方法

1. join 数组拼接

```js
let arr = [1, 2, 3];
// 默认拼接
arr.join(""); // 默认 ',' 拼接，返回：'1,2,3'
// 使用 - 拼接
arr.join("-"); // 返回：'1-2-3'
```

2. concat 尾部插入

```js
let arr = [1, 2, 3];
// 尾部插入 4
arr.concat(4); // 返回：[1,2,3,4]

// 尾部依次插入 5，6
arr.concat(5, 6); // 返回：[1,2,3,5,6]
```

3. slice 裁切

slice(start?, end?)，start：开始下标，end：结束下标。

```js
let arr = [1, 2, 3, 4, 5, 6];

// 从下标 1 开始，裁切到尾部
arr.slice(1); // 返回 [2,3,4,5,6]

// 从下标 1 开始，裁切到下标 2
arr.slice(1, 2); // 返回 [2]

// 从数组倒数第 1 开始，裁切到尾部
arr.slice(-1); // 返回 [6]

// 从数组倒数第 2 开始，裁切到数组倒数第 1 位
arr.slice(-2, -1); // 返回 [5]
```

二：改变原数组的方法

1. push 尾部插入

```js
let arr = [1, 2, 3];

// 尾部插入 4
arr.push(4); // arr：[1,2,3,4] 返回：数组长度 4

// 尾部依次插入 5，6
arr.push(5, 6); // arr：[1,2,3,4,5,6] 返回：数组长度 6
```

2. unshift 头部插入

```js
let arr = [1, 2, 3];

// 从头部插入 0
arr.unshift(0); // arr：[0,1,2,3] 返回：数组长度 4

// 从头部插入 -1，-2
arr.unshift(-2, -1); // arr：[-2,-1,0,1,2,3] 返回：数组长度 6
```

3. pop 尾部移除

```js
let arr = [1, 2, 3];
arr.pop(); // arr：[1,2] 返回：移除项 3
```

4. shift 头部移除

```js
let arr = [1, 2, 3];
arr.shift(); // arr：[2,3] 返回：移除项 1
```

5. splice 删除，添加，替换

5.1 删除

splice(start?, num?)，start：开始下标，num：删除长度

```js
// 从下标 0 开始，删除 1 位
let arr = [1, 2, 3];
arr.splice(0, 1); // arr：[2,3] 返回：[1]

// 从下标 0 开始，删除到数组尾部
let arr = [1, 2, 3];
arr.splice(0); // arr：[] 返回：[1,2,3]

// 从数组最后一位，删除到数组尾部
let arr = [1, 2, 3];
arr.splice(-1); // arr: [1,2] 返回：[3]
```

5.2 添加

splice(start, 0, arg\*?)，start：开始下标，0：删除 0 长度，arg：插入项

```js
// 从下标 0 开始，插入 4
let arr = [1, 2, 3];
splice(0, 0, 4); // arr：[4,1,2,3] 返回：[]

// 从下标 2 开始，依次插入 4，5，6
let arr = [1, 2, 3];
splice(2, 0, 4, 5, 6); // arr：[1,2,3,4,5,6] 返回：[]
```

 <!-- 数组方法 -->

```js
// 删除指定项 参数1：开始下标，参数2：结束下标
arr.splice(1, 2); // 返回删除项：[2, 3]，改变数组 [1]

// 替换
arr.splice(1, 1, 4, 5); // 返回替换项：[2]，改变数组 [1,4,5,3]

// 查找 参数1：查找项，参数2：开始下标
arr.indexOf(2, 1); // 返回下标：1
arr.lastIndexOf(2, 1); // 返回下标：1

// 排序 从大到小
arr.sort((num1, num2) => num1 - num2); // 返回：[1,2,3]，改变原数组 [1,2,3]

// 反转排序
arr.reverse(); // 返回：[3,2,1]，改变原数组 [3,2,1]

// 将数组的所有元素"缩减"为一个单独的值
// reduce()方法接受一个回调函数作为参数，该回调函数可以接受四个参数：累加器（accumulator）、当前值（current value）、当前索引（current index）和原始数组（original array）。
// reduce()方法可选第二个参数是累加器默认值，默认为0。
// 回调函数通过对每个元素的操作来更新累加器的值，并返回更新后的累加器。
arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0); // 6
```

<!-- 数组遍历 -->

```js
// item：子项，index：下标，self：遍历的数组
arr.map((item, index, self) => item + 1) // 返回：[2,3,4]
arr.filter((item, index, self) => item > 1) // 返回：[2,3]
arr.every((item, index, self) => item > 1) // 返回：false
arr.some((item, index.self) => item > 1) // 返回：true
arr.forEach((item, index self) => { item + 2 }) // 没有返回体，只是遍历数组
```
