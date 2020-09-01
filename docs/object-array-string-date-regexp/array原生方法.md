<h2>array原生方法</h2>

## 遍历方法

```js
arr.map() // 有返回值，对数组没影响，返回一个又新数组
arr.find() // 返回满足条件得第一个元素
arr.every() // 返回boolean
arr.filter() //对数组没影响，返回新数组
arr.forEach() // 没有返回值，对数组没有影响
```

## 转字符串

```js
arr.join("-") // 不改变数组，返回字符串
```

## 头尾处理

```js
arr.push() // 返回修改后数组的长度
arr.pop() // 返回移除的项
arr.shift() // 返回删除元素的值
arr.unshift() // 返回数组的长度
```

## 排序

```js
arr.sort() // 原数组改变

// 升序 -1 不换位置 1 换位置
function up(val1, val2) {
  if(val1 < val2) {
    return -1u
  }else if( val1 > val2 ) {
    return 1
  }else {
    return 0
  }
}
// 降序
function down(val1, val2) {
  if(val1 < val2) {
    return 1
  }else if(val1 > val2) {
    return -1
  }else {
    return 0
  }
}
```

## 倒叙

```js
arr.reverse() //改变原数组
```

## 拼接

```js
arr.concat() // 未改变原数组
```

## 删除、插入、替换

```js
arr.splice()
```

## 截取

```js
arr.slice()
```

## 查找

```js
arr.indexOf()
arr.lastIndexOf()
```

## 去重

```js
new Set(arr)
```

## 归并

```js
let a = function(pre, cur, index, arr) {
  return pre + cur
}
arr.reduce(a, 10)
```