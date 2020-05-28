# 生命周期

```js
App({ // 注册小程序
  onLanuch(options) {}, // 监听小程序初始化。
  onShow(options) {}, // 监听小程序启动或切前台。
  onHide() {}, // 监听小程序切后台。
  onError(msg) {}, // 错误监听函数。
  onPageNotFound() {}, // 页面不存在监听函数。
  globalData: "I am global data"  
})

var appInstance = getApp(); // 获取到小程序全局唯一的 App 实例
console.log(appInstance.globalData) // I am global data
```