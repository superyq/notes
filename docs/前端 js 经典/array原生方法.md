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

// 尾部插入 5，6
arr.concat(5, 6); // 返回：[1,2,3,5,6]

// 尾部插入 7，8
arr.concat([7, 8]); // 返回：[1,2,3,4,5,6,7,8]
```

3. slice 裁切

slice(start?, end?)，start：开始下标，end：结束下标。

结束下标大于开始下标，裁切值不包括结束下标的值。

```js
let arr = [1, 2, 3, 4, 5, 6];

// 全部裁切
arr.slice(); // 返回：[1,2,3,4,5,6]

// 从下标 1 开始，裁切到尾部
arr.slice(1); // 返回：[2,3,4,5,6]

// 从下标 1 开始，裁切到下标 2
arr.slice(1, 2); // 返回：[2]

// 从数组倒数第 1 开始，裁切到尾部
arr.slice(-1); // 返回：[6]

// 从数组倒数第 2 开始，裁切到数组倒数第 1 位
arr.slice(-2, -1); // 返回：[5]
```

4. indexOf 查找

indexOf(item, start?)，item：查找项，start：从哪个下标开始，如果找到返回元素所在下标

```js
let arr = [1, 2, 3, 1];

// 从头开始查找元素 1 所在下标
arr.indexOf(1); // 返回：0

// 从下标为 1 开始查找元素 1 所在下标
arr.indexOf(1, 1); // 返回：3

// 从最后一项开始查找元素为 1 所在下标
arr.indexOf(1, -1); // 返回：3
```

5. lastIndexOf 从数组尾部往头部查找

lastIndexOf(item, start?)，item：查找项，start：从哪个下标开始，如果找到返回元素所在下标

```js
let arr = [1, 2, 3, 1];

// 从尾开始查找元素 1 所在下标
arr.lastIndexOf(1); // 返回：3

// 从尾部开始第 2 项开始查找元素 1 所在下标
arr.lastIndexOf(1, 1); // 返回：0

// 从下标为 1 开始查找元素 1 所在下标
arr.lastIndexOf(1, -1); // 返回：3
```

6. reduce 高阶函数

reduce(callback(total, curValue, curIndex?, arr?), initValue?)，callback：叠加器，参数：total 叠加值，curValue 当前值，curIndex 当前下标，arr 原数组，initValue：初始值。当没有 initValue 是，total 的初始值为 arr[0]。

6.1 数组求和

```js
let arr = [1, 2, 3];
arr.reduce((total, curValue) => total + curValue); // 返回：6
```

6.2 初始值 10，数组求和

```js
let arr = [1, 2, 3];
arr.reduce((total, curValue) => total + curValue, 10); // 返回：16
```

6.3 数组去重

```js
let arr = [
  { id: 1, name: "小明" },
  { id: 2, name: "小红" },
  { id: 1, name: "小明" },
  { id: 2, name: "小红" },
];
arr.reduce((total, curValue) => {
  const has = total.filter((item) => item.id == curValue.id);
  if (!has.length) {
    total.push(curValue);
  }
  return total;
}, []); // 返回：[{ id: 1, name: "小明" },{ id: 2, name: "小红" }]
```

6.4 二维转一维

```js
let arr = [1, [2, 3], [4, 5, 6]];
arr.reduce((total, curValue) => total.concat(curValue), []); // 返回： [1, 2, 3, 4, 5, 6]
```

6.5 多维转一维

```js
let arr = [1, [2, 3], [4, [5, 6]]];
const flatArr = (arr) => {
  return arr.reduce((total, curValue) => {
    return total.concat(Array.isArray(curValue) ? flatArr(curValue) : curValue);
  }, []);
};
flatArr(arr); // 返回：[1, 2, 3, 4, 5, 6]
```

7. map 遍历

map(callback(curValue, curIndex?, arr?))，curValue 当前值，curIndex 当前下标，arr 原数组

```js
let arr = [1, 2, 3];
arr.map((item) => item + 1); // 返回：[2,3,4]
```

8. filter 筛选

filter(callback(curValue, curIndex?, arr?))，curValue 当前值，curIndex 当前下标，arr 原数组。

满足筛选条件，callback 内返回 true，filter 返回满足条件元素组成的数组。

```js
let arr = [1, 2, 3];
arr.filter((item) => item > 1); // 返回：[2,3]
```

9. every 判断

every(callback(curValue, curIndex?, arr?))，curValue 当前值，curIndex 当前下标，arr 原数组。

判断所用数组元素满足规定条件，满足返回 true，有一个不满足返回 false

```js
let arr = [1, 2, 3];
arr.every((item) => item > 1); // 返回：false
```

10. some 判断

some(callback(curValue, curIndex?, arr?))，curValue 当前值，curIndex 当前下标，arr 原数组。

判断数组元素是否有一个满足规定条件，都不满足返回 false，有满足返回 true

```js
let arr = [1, 2, 3];
arr.some((item) => item > 1); // 返回：true
```

11. forEach 纯遍历，无返回

forEach(callback(curValue, curIndex?, arr?))，curValue 当前值，curIndex 当前下标，arr 原数组。

```js
let arr = [1, 2, 3];
arr.forEach((item) => {
  // TODO
});
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

5.3 替换

splice(start, num, arg\*？)，start：开始下标，num：替换长度，arg：替换项，注意：num 替换长度和替换项数目最好一致。

```js
// 将 2，3 替换成 4，5
let arr = [1, 2, 3];
arr.splice(1, 2, 4, 5); // arr：[1,4,5] 返回：[2,3]
```

6. sort 排序

sort(callback?)，callback：可选参数，规定排序顺序，必须是函数。

可用于对数字，字母进行排序，数字优先级高于字母。

如果需要按照其他规则排序，需要提供函数，函数一般有两个参数：a，b。数组中 a 的下标小于 b。比较两个参数，如果需要换位置则返回大于 0 的值。

6.1 默认排序，不会区分各十百位

```js
let arr = [2, 1, 21, 11, 4, 31, 3];
arr.sort(); // arr：[1,11,2,21,3,32,4] 返回：[1,11,2,21,3,32,4]
```

6.2 从小到大排序

```js
let arr = [2, 1, 21, 11, 4, 31, 3];
arr.sort((a, b) => a - b); // arr：[1,2,3,4,11,21,31] 返回：[1,2,3,4,11,21,31]
```

6.3 从大到小排序

```js
let arr = [2, 1, 21, 11, 4, 31, 3];
arr.sort((a, b) => b - a); // arr：[31,21,11,4,3,2,1] 返回：[31,21,11,4,3,2,1]
```

6.4 按 sort 从小到大排序

```js
let arr = [
  { name: "小明", sort: 10 },
  { name: "小红", sort: 1 },
  { name: "小李", sort: 21 },
];
arr.sort((a, b) => a.sort - b.sort); // arr：[{name: "小红",sort: 1},{name: "小明",sort: 10},{name: "小李",sort: 21}] 返回：[{name: "小红",sort: 1},{name: "小明",sort: 10},{name: "小李",sort: 21}]
```

7. reverse 顺序颠倒

```js
let arr = [1, 2, 3];
arr.reverse(); // arr：[3,2,1] 返回：[3,2,1]
```
