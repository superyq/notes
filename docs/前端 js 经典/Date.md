# Date

1. 创建对象

```js
// 获取当前时间
let nowDate = new Date(); // Wed Jun 28 2023 14:47:39 GMT+0800 (中国标准时间)
// 日期字符串
let time = new Date("2023-06-28 16:12:30") // Wed Jun 28 2023 16:12:30 GMT+0800 (中国标准时间)
// 年,月,日[,时,分,秒]
let time = new Date(2023,5,3,12,12,12) // Sat Jun 03 2023 12:12:12 GMT+0800 (中国标准时间)
// 时间戳
let time = new Date(1687935569211) // Wed Jun 28 2023 14:59:29 GMT+0800 (中国标准时间)
// +time 获取当前时间戳
time.getTime() = +time
```

2. 常用方法

```js
let date = new Date();
// 年：4位年份
let year = date.getFullYear(); // 2023
// 月：返回日期中的月份，其中0表示一月，11表示十二月
let month = date.getMonth(); // 5
// 日：返回日期月份中的天数（1到31)
let day = date.getDate(); // 28
// 时：返回日期中的小时数（0到23）
let hour = date.getHours(); // 15
// 分：返回日期中的分钟数（0到59）
let minutes = date.getMinutes(); // 16
// 秒：返回日期中的秒数（0到59）
let seconds = date.getSeconds(); // 20
// 星期：返回日期中星期的星期几（其中0表示星期日，6表示星期六)
let week = date.getDay(); // 3
```