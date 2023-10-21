# box-shadow

1. 基础属性

```css
/* box-shadow: h-shadow v-shadow blur spread color inset; */
box-shadow: 10px 10px 2px 2px red inset;
```

h-shadow: 必填，水平阴影的位置，允许负值
v-shadow: 必填，垂直阴影的位置，允许负值
blur: 可选，模糊程度
spread: 可选，阴影大小
color: 可选，阴影颜色
inset: 可选，设置后为内侧阴影

2. 解释

boxShadow 可以用逗号分割多个阴影设置，每个阴影由 2-4 个长度值、一个可选的颜色值和一个可选的 inset 关键字来规定。省略长度的值是 0
例如：

```css
.box {
  box-shadow: 1px 1px 2px 2px blue, 1px 1px 2px 2px red inset;
}
```