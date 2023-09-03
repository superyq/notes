# moment 日期处理

```js
npm i moment
const moment = require("moment");
moment("2023-02-04").toDate() // 装换成日期对象保存到数据库
moment(new Date()).format("YYYY-MM-DD"); // 生成固定格式年月日
```
