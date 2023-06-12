css3 新属性

1. background 背景

```css
/* background-size 背景图大小 */
/* 具体值 */
background-size: 100px 100px;
/* 百分比 */
background-size: 10% 10%;
/* 拉伸铺满盒子 */
background-size: cover;
/* 拉伸图片单方向填满后，另一个方向停止 */
background-size: contain;
```

2. word-wrap 文本换行

```css
word-wrap: break-word;
```

3. text-shodow 文本阴影

```css
/* x 水平偏量、y 垂直偏量、strong 模糊度、color 阴影颜色 */
/* box-shadow: x y strong color; */
text-shadow: 10px 10px 10px red;
```

4. font-face 字体图标

```css
@font-face {
  font-family: demo;
  src: url("Sansation_Light.ttf"), url("Sansation_Light.eot"); /* IE9+ */
}

div {
  font-family: demo;
}
```

5. border-radius 圆角

```css
/* 圆角 */
border-radius: 5px;
/* 圆 */
border-radius: 50%;
```

6. box-shoadow 边框阴影

```css
/* x 水平偏量、y 垂直偏量、strong 模糊度、color 阴影颜色 */
/* box-shadow: x y strong color; */
box-shadow: 10px 10px 10px red;
```

