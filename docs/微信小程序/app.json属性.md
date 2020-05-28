# app.json属性介绍

```js
{
  "pages": [ // 用于指定小程序由哪些页面组成，数组的第一项代表小程序的初始页面（首页）。小程序中新增/减少页面，都需要对 pages 数组进行修改。
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window": {
    "navigationStyle": "custom", // 导航栏样式，只保留右上角胶囊按纽扣
    "enablePullDownRefresh": true, // 是否开启全局的下拉刷新。
    "pageOrientation": "auto" // 屏幕旋转设置
  },
  "tabBar": {
    "color": "",
    "selectedColor": "",
    "backgroundColor": "",
    "borderStyle": "",
    "list": [
      {
        "pagePath": "",
        "text": "",
        "iconPath": "",
        "selectedIconPath": ""
      },
      {}
    ],
    "position": "",
    "custom": true
  },
  "networkTimeout": {}, // 各类网络请求的超时时间，单位均为毫秒
  "debug": true, // 可以在开发者工具中开启 debug 模式
  "functionalPages": {}, // 插件所有者小程序需要设置这一项来启用插件功能页。
  "subpackages": [], // 启用分包加载时，声明项目分包结构。
  "workers": "", // 使用 Worker 处理多线程任务时，设置 Worker 代码放置的目录
  "requiredBackgroundModes": [], // 申明需要后台运行的能力，类型为数组。目前支持以下项目：1.audio: 后台音乐播放 2.location: 后台定位
  "plugins": {}, // 声明小程序需要使用的插件。
  "preloadRule": {}, // 声明分包预下载的规则。
  "resizable": "", // 在 iPad 上运行的小程序可以设置支持屏幕旋转.
  "navigateToMiniProgramAppIdList": {}, // 当小程序需要使用 wx.navigateToMiniProgram 接口跳转到其他小程序时，需要先在配置文件中声明需要跳转的小程序 appId 列表，最多允许填写 10 个。
  "usingComponents": {
    "c-icon": "/components/c-icon/c-icon"
  }, // 在此处声明的自定义组件视为全局自定义组件，在小程序内的页面或自定义组件中可以直接使用而无需再声明。
  "permission": {}, // 小程序接口权限相关设置
  "sitemapLocation": "", // 指明 sitemap.json 的位置；默认为 'sitemap.json' 即在 app.json 同级目录下名字的 sitemap.json 文件
  "style": "", // app.json 中配置 "style": "v2"可表明启用新版的组件样式
  "useExtendedLib": {}, // 指定需要引用的扩展库
}
```