# date原始方法

## 获取当前时间戳

```js
Date.now() = +new Date()
```

## 基础方法

```js
let date = new Date();
let xinqi = date.getDay(); // 返回日期中星期的星期几（其中0表示星期日，6表示星期六)
let milliseconds = date.getMilliseconds(); // 返回日期中的毫秒数

let year = date.getFullYear(); // 取得4位数的年份
let month = date.getMonth(); // 返回日期中的月份，其中0表示一月，11表示十二月
let day = date.getDate(); // 返回日期月份中的天数（1到31)
let hour = date.getHours(); //返回日期中的小时数（0到23） 
let minutes = date.getMinutes(); // 返回日期中的分钟数（0到59）
let seconds = date.getSeconds(); // 返回日期中的秒数（0到59）
```