# typeof 和 instanceof 区别

1. typeof

typeof 用于判断一个变量的数据类型，返回一个表示数据类型的字符串。可以对如下类型进行判断：undefined、boolean、number、string、bigint、symbol、function 和 object。对 null 的判断是'object'，这是个历史遗留问题。

```js
typeof null; // 'object'
typeof undefined; // 'undefined'
typeof true; // 'boolean'
typeof 110; // 'number'
typeof "yqcoder"; // 'string'
typeof function () {}; // 'function'
typeof {}; // 'object'
typeof []; // 'object'
typeof 9007199254740999n; // 'bigint'
typeof Symbol(); // 'symbol'
```

2. instanceof

instanceof 用于判断一个对象是否属于某个类或者其父类的实例。如果对象是指定类的实例，则返回 true；否则返回 false。

```js
const time = new Date();
const reg = /^yqcoder$/;

time instanceof Date; // true
reg instanceof RegExp; // true
```

综上：typeof 用于判断基本数据类型和函数类型，而 instanceof 用于判断对象是否属于某个类的实例。
