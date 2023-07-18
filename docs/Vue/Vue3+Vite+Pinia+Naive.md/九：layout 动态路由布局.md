# layout 动态路由布局

如果对 vue3 的语法不熟悉的，可以移步[Vue3.0 基础入门](https://blog.csdn.net/weixin_64684095/article/details/131459833?spm=1001.2014.3001.5502)，快速入门。

1. 获取router，为什么要在store中获取，因为需要在路由跳转的时候判断，是否登录，然后去获取，如果直接在menu组件中调用接口获取routers，menu会有延迟显示。