1. 定义和用法

```
background-color     | 背景颜色

background-position   | 背景图片位置

background-size    | 背景图片大小

background-repeat     |  背景图片重复填充

background-origin    |  background-position属性应该是相对位置。

background-clip  |  背景的绘制区域

background-attachment   |  背景图片是否滚动

background-image    |  背景图片

如果不设置其中的某个值，也不会出问题，比如 background:#ff0000 url('smiley.gif'); 也是允许的。

通常建议使用这个属性，而不是分别使用单个属性，因为这个属性在较老的浏览器中能够得到更好的支持，而且需要键入的字母也更少。
```

2. background-attachment：设置背景图像是否固定或者随着页面的其余部分滚动

```
srcoll：背景图像随页面的其余部分滚动，这是默认
fixed：背景图像是固定的
inherit：设置继承父级
local：随滚动元素滚动
```

3. 背景层混合模式

```
background-color: mode

normal: 默认值
multiply: 正片垫底
screen: 滤色
overlay: 叠加
darken: 变暗
lighten: 变亮
```

