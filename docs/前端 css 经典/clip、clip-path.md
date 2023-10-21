# clip、clip-path

1. clip

1.1 clip: auto | inherit | rect

auto：默认，不裁剪
inherit：继承父级 clip 属性
rect：规则四边形裁剪

1.2 clip: rect(top, right, bottom, left)

```doc
注意：
1.裁剪只对 fixed 和 absolute 的元素有效。
2.top，right，bottom，left 都是相对于元素的左上角。
```

```css
/* 裁剪的位置由 top，left 决定，裁剪的宽由 right - left 决定，裁剪的高由 bottom - top决定 */
/* 例：裁剪一个距离左上角10px的宽200px，高200px的长方形视口 */
div {
  clip: rect(10px, 210px, 210px, 10px);
}
```

2. clip-path

2.1 clip-path: shape | source

shape 基础形状：inset 矩形，circle 圆，ellipse 椭圆，polygon 多边形
source SVG 绘制图形: path

2.2 例子

```doc
注意：
1.裁剪只对 fixed 和 absolute 的元素有效。
2.top，right，bottom，left 相对于元素的各边界。
```

```css
.box {
  /* inset 矩形：inset(top,right,bottom,left,round radius)*/
  clip-path: inset(10px 10px 10px 10px round 10px);
  /* circle 圆：circle(radius, at position)*/
  clip-path: circle(100px at 50px 100px);
  /* ellipse 椭圆：ellipse( radius-x, radius-y, at position )*/
  clip-path: ellipse(100px 50px at 50px 100px);
  /* polygon 多边形：polygon(left top, left top, left top)*/
  clip-path: polygon(50% 0%, 100% 100%, 0 100%);

  /* path SVG：path 绘制图形 */
  clip-path: path("M 0 200 L 0,75 A 5,5 0,0,1 150,75 L 100 100 z");
}
```
