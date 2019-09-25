# vue 中date处理

1. elment 时间组件,监听时间

```
computed: {
  time: {
    get() {
      const { start, end } = this.search;
      return start && end ? [start, end] : '';
    },
    set(value) {
      const [start = '', end = ''] = value || [];
      this.search.start = start;
      this.search.end = end;
    }
  }
}
```

2. 格式化时间

```
Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds() //秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

// 获取当前时间
new Date().format("yyyy-MM-dd hh:mm:ss")

// 获取当天时间0点
new Date(new Date().toLocaleDateString()).format("yyyy-MM-dd hh:mm:ss")
```