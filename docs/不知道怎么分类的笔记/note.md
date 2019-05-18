<h1 align="center">不知道怎么分类的笔记</h1>

## a 标签加 javascript 意义

执行一段空白的 javascript 语句，返回空或者 false 值，从而防止链接跳转。跟当前 a 标签无关，这段代码始终都会执行。

```
<a href="javascript:;">
```

## 判断浏览器是否支持 ie9

```
<!--[if IE 9]>
  <link ref="stylesheet" type="text/css" href="ie9.css" />
<![endif]-->
```

## Object.assign()

Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

```
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

## Promise.all

Promise.all 等待所有都完成（或第一个失败）

```
Promise.all([getA({ page, limit, ...this.search }), flag && getB()])
.then(([
  {
    data: { data: list = [], total }
  },
  {
    data: cates = []
  } = {}
]) => {
  falg && (this.list = [...cates])
})
.catch(() => {})
```

## Array.from()

Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。

```
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```

## 数组去重 new Set(arr)，返回去重后数组，不改变原来数组

```
var b = [1,2,1,2,1,2,1,2,3,1,6];
new Set(b);// [1,2,3,6]
```

## em

“em”是一个相对的大小,相对所指的是相对于元素父元素的 font-size

## 搜索表单只有一个输入框时

当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 <el-form> 标签上添加 @submit.native.prevent

```
<el-form
  size="mini"
  :inline="true"
  :model="search"
  @keyup.enter.native="updateTableData"
  @submit.native.prevent
  slot="header"
>
```

## Meta 标签中的 format-detection 属性及含义

format-detection —— 格式检测，用来检测 html 里的一些格式，主要有以下几个设置：

- meta name=”format-detection” content=”telephone=no”
- meta name=”format-detection” content=”email=no”
- meta name=”format-detection” content=”adress=no”

或者直接写成：

meta name=”format-detection” content=”telephone=no,email=no,adress=no”

1. telephone
   主要作用是是否设置自动将你的数字转化为拨号连接
   telephone=no 禁止把数字转化为拨号链接
   telephone=yes 开启把数字转化为拨号链接，默认开启

2. email
   告诉设备不识别邮箱，点击之后不自动发送
   email=no 禁止作为邮箱地址
   email=yes 开启把文字默认为邮箱地址，默认情况开启

3. adress
   adress=no 禁止跳转至地图
   adress=yes 开启点击地址直接跳转至地图的功能, 默认开启

## canvas 转 img

```
$("#Android-qrcode").qrcode("http://www.baidu.com");

function canvasToImage(el) {
  let img = new Image();
  img.src = el.toDataURL("image/png");
  return img;
}

$("#Android-qrcode").append(canvasToImage($("canvas")[0]));
```

## 字符串转数字

1. string \* 1

2. String(value)、Number(value)、Boolean(value)

3. parseInt(val)、parseFloat(val)

## 补位、保留 2 位小数

1. number.toFixed(2)

## css 倒三角

```
#triangle-bottomright {
  width: 0;
  height: 0;
  border-bottom: 100px solid red;
  border-left: 100px solid transparent;
}
```

## JSON.parse()、 JSON.stringify()

- JSON.parse()： JSON 字符串转换为对象
- JSON.stringify()： 对象转换为 JSON 字符串
