# Object 常用原生方法

```js
// Object.defineProperty 修改对象属性值
let obj = {
  name: "yqcoder",
  _name: 'yy'
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
    value: 'Tom',
    writable: true
  },
  age: {
    value: 18,
    enumerable: false,
  },
  name: {
    get() {
      return 'I am ' + this._name
    },
    set(newValue) {
      this._name = newValue
    },
  },
})	

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
