# 微信自带API

```js
var app = getApp(); // 获取小程序实例

wx.getStorageSync('key'); // 本地存储
wx.setStorageSync('key', val);

wx.login({ // 登录
  success: res => {
    // 发送 res.code 到后台换取 openId, sessionKey, unionId
    console.log(res.code);
  }
})

wx.getSetting({ // 获取用户的当前设置
  success: res => {
    // 请求过的权限可以通过res.authSetting拿到
    console.log(res.authSetting);
  }
})

wx.getUserInfo({ // 获取用户信息
  success: res => {
    console.log(res.userInfo);
  }
})

wx.canIUse(String); // 判断小程序的API，回调，参数，组件等是否在当前版本可用。

wx.navigateTo({ // 页面之间跳转
  url: "'../logs/logs'"
})
```