<h2 align="center">[grid栅格学习笔记](https://matiji.cn/post/5c98b5e8996f307d572c0a8c)</h2>

## 容器属性

### 容器的类型为块元素还是行内元素

```
.container {
    display: grid | inline-grid
}
```

### 栅格轨道的数量以及宽度

```
\\ auto：默认情况下该栅格轨道会充满栅格容器的富余空间

.container {
    display: grid;
    grid-template-columns: 100px auto 100px;
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
}
```

### 给栅格单元命名，同名的栅格单元自动成为一个栅格区域。

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
        'header header header'
        'sidebar main main'
        'footer footer footer';
}
```

命名之后有什么用呢？栅格项目有一个 grid-area 属性，它来瓜分栅格区域。

```
.item {
    grid-area: header;
}
```

这个意思是说，名字叫 header 的栅格区域都是我的，撒尿为证。

缺省名字：不知道叫什么的时候就用.代替。

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
        'main main sidebar'
        'main main .';
}
```

### 长度的取值种类

1. fr：富余空间为总长度，以声明的 fr 数量总和为分母，以自身声明的 fr 数量为分子

```
.container {
    display: grid;
    grid-template-columns: 100px repeat(2, 1fr);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
}
```

2. minmax()：它有两个参数，分别是最小值和最大值。当栅格单元需要压缩时，最小值就是栅格项目被压缩的最小极限，当栅格单元有剩余空间时，最大值就是栅格项目扩张的最大极限。

```
.container {
    display: grid;
    grid-template-columns: minmax(100px, 200px) 300px 300px;
}
```

3. fit-content()：当内容小于 200px 时，以内容为长度，当内容大于 200px 时，以 200px 为长度。

```
.container {
    display: grid;
    grid-template-columns: repeat(3, fit-content(200px));
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
}
```

4. repeat()第一个参数取值 auto-fill 和 auto-fit

auto-fill 和 auto-fit 的共同点在于它们会保证栅格系统不溢出栅格容器。因为如果你写死了重复多少个，栅格容器空间不够的话只能溢出了。

而不同点在于，auto-fill 会生成尽可能多的栅格轨道，即便这些轨道看起来没什么用；auto-fit 则会生成尽可能少的栅格轨道，以便让那些自适应的栅格单元尽可能占用更多空间。

所以区别在于，auto-fill 想让栅格轨道尽可能多，auto-fit 想让栅格单元尽可能大。

```
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

这里的意思是说，自适应布局，每个栅格项目长度等分，但最小不低于 300px。最大不超过 600px，因为超过 600px 就是两个 300px。

### 栅格单元之间的空隙

```
.container {
    grid-column-gap: <length>;
    grid-row-gap: <length>;
    grid-gap: <length>;
}
```

### 项目相对于区域的对齐方式

```
.container {
    // 水平对齐方式
    justify-items: stretch /*default*/ | start | end | center;

    // 垂直对齐方式
    align-items: stretch /*default*/ | start | end | center;

}
```

### 栅格系统相对于栅格容器的水平对齐方式。

```
.container {
    // 水平对齐方式
    justify-content: start /*default*/ | end | center | stretch | space-around | space-between | space-evenly;

    // 垂直对齐方式
    align-content: start /*default*/ | end | center | stretch | space-around | space-between | space-evenly;
}
```

### 编外栅格单元的高度和宽度。

```
.container {
    grid-auto-columns: <length> <length> <length>;
    grid-auto-rows: <length> <length> <length>;
}
```

### 栅格项目应该如何依次排列

```
.container {
    //row：水平排  column：垂直排
    grid-auto-flow: row /*default*/ | column | dense | row dense | column dense;
}
```

## 项目属性

### 栅格项目占据哪个栅格区域。

```
item{
    grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}
```

### 这是两个集合属性，它们可以同时声明在某个方向开始和结束的位置。

```
.item {
    grid-column: <start> / <end>;
    grid-row: <start> / <end>;
}
```

### 栅格项目相对于栅格区域对齐方式, 覆盖栅格容器

```
.item {
    // 水平对齐方式
    justify-self: stretch /*default*/ | start | end | center;

    // 垂直对齐方式
    align-self: stretch /*default*/ | start | end | center;
}
```
