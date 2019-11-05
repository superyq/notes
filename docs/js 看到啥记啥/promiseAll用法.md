# Promise.All用法

```js
// 例子
 Promise.all([
  getStatisticsDetail({ module_type: "task:refund:ct", date_type }),
  getStatisticsDetail({ module_type: "task:finish:ct", date_type }),
  getStatisticsDetail({ module_type: "task:ing:ct", date_type })
])
  .then(([{ data: refund }, { data: finish }, { data: ing }]) => {
    console.log(refund, finish, ing);
  })
  .catch(({ message = "获取广场任务金额失败!" }) => {
    this.$message.error(message);
  });
```