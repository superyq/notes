<h1 align="center">不知道怎么分类的笔记</h1>

## 导出/导出 xlsx

```
\\ 导出
export function exportA() {
  return http.post(
      '接口',
      {},
      {
        format: false,
        responseType: 'blob'
      }
    )
}

this.$confirm("模板已生成，是否保存至本地", "已生成模板")
  .then(() => {
    const $a = document.createElement("a");
    $a.href = URL.createObjectURL(data);
    $a.target = "_blank";
    $a.download = "敏感词模板.xlsx";
    $a.click();
  })
  .catch(() => {
    this.loading = false;
  });

\\ 导入
export function importA() {
  const params = new FormData();
  params.append("file", file);

  return http.post("接口", params, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

fileChangeHandle(evt) {
  const files = evt.target.files || evt.dataTransfer.files;

  importSensitive(files[0])
    .then(({ message = "导入成功" }) => {
      this.$message.success(message);
      this.$refs.fileInput.value = "";
      this.updateTableData();
    })
    .catch(({ message = "导入失败！" }) => {
      this.$refs.fileInput.value = "";
      this.$message.error(message);
    })
    .finally(() => {
      this.loading = false;
    });
  }

```

## vue watch time 改为 computed time

```
computed: {
  time: {
    get() {
      const { start, end } = this.search;
      return start && end ? [start, end] : "";
    },
    set([start = "", end = ""] = []) {
      this.search.start = start;
      this.search.end = end;
    }
  }
}
```

## vue 图片上传外貌

```
el-form-item(label='等级图标', prop='icon')
  .user-grade__box(@click='chooseFile')
    i.el-icon-plus
  input(type='file', ref='fileInput', @change='fileChangeHandle($event)', hidden)

chooseFile() {
  this.$refs.fileInput.click();
},
fileChangeHandle() {},
```

## vue 子组件调用父组件的方法

```
\\ 父组件
provide() {
  return {
    updateTableHandle: this.updateTableHandle
  };
}

\\ 子组件
inject: ["updateTableHandle"]

```

## vue 插槽

```
\\ 子组件
(name="a")
(v-bind="{ data }")

\\ 父组件
(slot="a")
(slot-scope="{ data }")
```

## vue 与 router 相关

```
data() {
  return {
    active: this.$route.query.tab || "exchange"
  }
},
methods: {
  tab({ name }) {
    this.$router.push({
      name: 'goods',
      query: {
        tab: name
      }
    })
  }
}
```

## try/catch

try/catch 语句用于处理代码中可能出现的错误信息，出现异常会导致程序崩溃，而 try/catch 则可以保证程序的正常运行

```
try {
//执行代码  不报错则 正常执行 不会进入下面的catch
} catch(err){
    //当上面的代码出错时 这里可以捕获到错误信息
    console.error(err)
}
```

## async/await 在 vue 中的运用

解释：这是一个用同步思维来解决异步问题的方案，需要等到接口返回体返回时才渲染页面

async: 放到函数前面，表异步，意味该函数的执行不会阻塞后面代码的执行，返回的是一个 promise 对象

await: 等待 await 后面的函数运行完并且有了返回结果之后，才继续执行下面的代码。这正是同步的效果

```
methods: {
  async fn() {
    await fo();
  }
}
```

## 文件上传

```
import http from "./http";

export default function upload(file, config) {
  const params = new FormData();
  params.append("file", file);

  return http.post("/upload", params, {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
```

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

## cookies、sesstionStorage、localStorage 区别

cookies：存储大小 4KB。不设时间默认关闭浏览器删除保存，设置时间关闭浏览器保存数据直到设置时间。会与服务器发生交互，占用带宽，没有及时性。不安全。只能保存字符串类型。已经没怎么用了。

sesstionStorage：储存大小 5MB。及时会话，关闭浏览器数据删除。调用方法 window.sesstionStorage。H5 提供新特性。

localStorage：储存大小 5MK。不删除，数据一直保存。调用方法 window.localStorage。方法有 setItem(key, val),getItem(key),removeItem(key),clear(),key(index)
