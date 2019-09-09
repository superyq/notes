# height, width: 固定值与auto、100%的差别

1. width、height使用固定值是一定会显示的，但是除非是小型项目或是特殊情况，最好不要使用固定值。不利于响应式开发，当从移动端看页面就会非常不美观。

2. 不设置width、height时默认为auto，当position不同时显示效果不同，浮动可能会导致其不显示，需要清除浮动。

width:auto表示宽度是可变动的，这个div的所有部分（content+margin+padding+border）相加为父元素的width大小，。

height:auto表示高度可变动的，如果div设置了auto但是却没有显示有三种可能：

① cotent里没有能将其height支撑的子元素

② 由于定位和浮动导致其不显示，清除浮动或修改定位

（3）width、height强制将子元素充满父元素的content。

width:100%子元素的width值为父元素的width值，加margin时不改变子元素width值大小，而是溢出父元素。

height:100%不显示的原因可能为没有设置父元素的height，可以通过将父元素的height设为固定值或是将父元素及父元素的父元素设置height:100%显示。
