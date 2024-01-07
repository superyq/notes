# 数组

<!-- 创建数组 -->

```js
let arr = new Array(1, 2, 3); // [1,2,3]
let arr = [1, 2, 3];
```

 <!-- 数组方法 -->

```js
// 默认数组
let arr = [1, 2, 3];

// 拼接，默认','拼接
arr.join("-"); // "1-2-3"

// 尾部添加
arr.push(4, 5); // 返回长度：5，改变数组 [1,2,3,4,5]
arr.concat(4, 5); // [1,2,3,4,5]

// 头部添加
arr.unshift(4, 5); // 返回长度：5，改变数组 [4,5,1,2,3]

// 移除尾部
arr.pop(); // 返回移除项：3，改变数组 [1,2]

// 移除头部
arr.shift(); // 返回移除项：1，改变数组 [2,3]

// 裁切 一个参数，开始到数组结束
//      两个参数，开始到结束，不包含结束下标的项
arr.slice(1, 2); // [2]

// 删除指定项 参数1：开始下标，参数2：结束下标
arr.splice(1, 2); // 返回删除项：[2, 3]，改变数组 [1]

// 替换
arr.splice(1, 1, 4, 5); // 返回替换项：[2]，改变数组 [1,4,5,3]

// 查找 参数1：查找项，参数2：开始下标
arr.indexOf(2, 1); // 返回下标：1
arr.lastIndexOf(2, 1); // 返回下标：1

// 排序 从大到小
arr.sort((num1, num2) => num1 - num2); // 返回: [1,2,3]，改变原数组 [1,2,3]

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
