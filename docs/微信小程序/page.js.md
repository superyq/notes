# page生命周期

```js
Page({
  data: { // data 是页面第一次渲染使用的初始数据。
    text: "a"
  },
  onLoad() {}, // 监听页面加载
  onShow() {}, // 监听页面显示
  onReady() {}, // 监听页面初次渲染完成
  onHide() {}, // 监听页面隐藏
  onUnload() {}, // 监听页面卸载
  onPullDownRefresh() {}, // 监听用户下拉动作
  onReachBottom() {}, // 页面上拉触底事件的处理函数
  onShareAppMessage() {}, // 用户点击右上角转发
  onPageScroll() {}, // 页面滚动触发事件的处理函数
  onResize() {}, // 页面尺寸改变时触发，详见 响应显示区域变化
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  } // 当前是 tab 页时，点击 tab 时触发
})
```
