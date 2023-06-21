# box-shadow

1. 基础属性

```css
/* box-shadow: h-shadow v-shadow blur spread color inset; */
box-shadow: 10px 10px 20 20 red inset;
```
2. 解释

boxShadow 属性把一个或多个下拉阴影添加到框上。该属性是一个用逗号分隔阴影的列表，每个阴影由 2-4 个长度值、一个可选的颜色值和一个可选的 inset 关键字来规定。省略长度的值是 0

h-shadow: 必须，水平阴影的位置，允许负值
v-shadow: 必须，垂直阴影的位置，允许负值
blur: 可选，模糊距离
spread: 可选，阴影大小
color: 可选，阴影颜色
inset: 可选，从外侧的阴影改变阴影内侧阴影