# JSON 对象

1. 概念

JSON 只是一种数据格式，JSON 对象中的 key 必须用双引号包裹，如下：

```json
{
  "name": "yqcoder"
}
```

2. 对象字面量转 JSON 字符串对象

```js
let yqcoder = {
  name: "yqcoder",
};
JSON.stringify(yqcoder); // '{"name":"yqcoder"}'

// 两次 JSON.stringify 加 \\
let _yqcoder = {
  name: "yqcoder",
  _name: '{"name":"yqcoder"}',
};
JSON.stringify(_yqcoder); // '{"name":"yqcoder","_name":"{\\"name\\":\\"yqcoder\\"}"}'

// 三次 JSON.stringify 加 \\\\\\
let __yqcoder = {
  name: "yqcoder",
  _name: '{"name":"yqcoder"}',
  __name: '{"name":"yqcoder","_name":"{\\"name\\":\\"yqcoder\\"}"}',
};
JSON.stringify(__yqcoder); // '{"name":"yqcoder","_name":"{\\"name\\":\\"yqcoder\\"}","__name":"{\\"name\\":\\"yqcoder\\",\\"_name\\":\\"{\\\\\\"name\\\\\\":\\\\\\"yqcoder\\\\\\"}\\"}"}'
```

3. JSON 过滤

```js
// 通过JSON删除 love，thr
let yqcoder = {
  name: "yq",
  age: 18,
  love: "dyb",
  thr: "aa",
};
JSON.stringify(yqcoder, ["name", "age"]); // '{"name":"yq","age":18}'
JSON.stringify(yqcoder, (key, value) => {
  if (["love", "thr"].includes(key)) {
    return undefined;
  } else {
    return value;
  }
}); // '{"name":"yq","age":18}'
```
