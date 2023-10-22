# Object 原始方法

1. Object 属性描述符

属性描述符分为：数据描述符、存取描述符

```js
let obj = {
  name: "yqcoder",
};
Object.defineProperty(obj, "name", {
  // 数据描述符
  // 属性值，默认 undefined
  value: "yq",
  // 可写，默认 false，为 true 时可修改
  writable: true,
  // 可删除，默认 false，为 true 时可删除
  configurable: true,
  // 可枚举，默认 false，问 true 时可枚举
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

// 获取属性描述符
Object.getOwnPropertyDescriptor(obj, "name");
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

2. Object.create

创建一个新对象

```js

```

```js
// Object.defineProperty 修改对象属性值
let obj = {
  name: "yqcoder",
  _name: "yy",
};
Object.defineProperty(obj, "name", {
  value: "yq",
}); // {name: 'yq'}
Object.defineProperty(obj, "name", {
  // 禁止delete 删除name
  configurable: false,
  // 可以赋值
  writable: true,
  enumerable: true,
});
Object.defineProperty(obj, "name", {
  get() {
    return "I am " + this._name;
  },
  set(newValue) {
    this._name = newValue;
  },
});
// 定义多个属性
Object.defineProperties(obj, {
  _name: {
    value: "Tom",
    writable: true,
  },
  age: {
    value: 18,
    enumerable: false,
  },
  name: {
    get() {
      return "I am " + this._name;
    },
    set(newValue) {
      this._name = newValue;
    },
  },
});

// Object.assign 合并两个对象，更改原对象
let targetObj = {
  age: 18,
};
Object.assign(obj, targetObj); // {name: 'yq', age: 18}

// Object.keys 对象转数组
Object.keys(obj); // ['name', 'age']

// delete obj.key 删除对象属性
delete obj.name; // {age: 18}

// hasOwnProperty 判断对象是否有属性
obj.hasOwnProperty("age"); // true
```
