es6 新特性

1. let、const

不存在变量提升、const 定义常量后不能修改

2. symbol

Symbol 是 ES6 中引入的一种新的基本数据类型，用于表示一个独一无二的值。解决命名冲突。

3. 模板字符串

```js
let name = "yqcoder";
let msg = `${name} is super man`;
```

4. 解构

```js
let obj = { name: "yqcoder" };
let { name } = obj;
```

5. 箭头函数

```js
// 当个表达式，默认return
// this永远指向其父级对象的this
let say = (a, b) => {
  a + b;
};
```

6. 类

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(`${this.name} is big man`);
  }
}

let yq = new Person("yq");
yq.say();
```

7. 模块化

代码的可复用性

```js
// 导入
import '模块名' from '路径';
import '路径';
// 导出
export function a() {} // 引入名必须与导出名相同
export default function a() {} // 默认导出：引入名随便写
```
