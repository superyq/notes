# Object 常用原生方法

1. Object 属性描述符

属性描述符分为：数据描述符、存取描述符

```js
let obj = {
  name: "yqcoder",
};
// 单个属性
Object.defineProperty(obj, "name", {
  // 数据描述符
  // 属性值，默认 undefined
  value: "yq",
  // 可写，默认 false，true 时可修改
  writable: true,
  // 可删除，默认 false，true 时可删除
  configurable: true,
  // 可枚举，默认 false，true 时可枚举
  enumerable: true,

  // 存取描述符
  // 截获name的值
  get() {
    return this.value;
  },
  // 设置name的值
  set(value) {
    this.value = value;
  },
});
// 多个属性
Object.defineProperties(obj, {
  name: {
    value: "yqcoder",
    writable: true,
    configurable: true,
    enumerable: true,
  },
});

// 获取属性描述符
Object.getOwnPropertyDescriptor(obj, "name"); // {value: 'yqcoder', writable: true, enumerable: true, configurable: true}
```

2. Object.assign

合并两个对象，更改原对象

```js
let obj = {
  name: "yqcoder",
};
let _obj = {
  age: 18,
};
Object.assign({}, obj, _obj); // {name: 'yqcoder', age: 18}
```

3. Object.create

创建一个新对象

```js
let obj = Object.create(null, {
  name: {
    value: "yqcoder",
    enumerable: true,
  },
  age: {
    value: 18,
    enumerable: true,
  },
});
obj; // {name: 'yqcoder', age: 18}
```

4. Object.keys

遍历对象，返回由 key 组成的数组

```js
let obj = {
  name: "yqcoder",
  age: 18,
};
Object.keys(obj); // ['name', 'age']
```

5. obj 对象方法 

```js
let obj = {
  name: 'yqcoder',
  age: 18
}
// delete obj.key 删除对象属性
delete obj.name; // {age: 18}
// hasOwnProperty 判断对象是否有属性
obj.hasOwnProperty("age"); // true
```
