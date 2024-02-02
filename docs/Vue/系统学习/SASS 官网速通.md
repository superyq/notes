# SASS 官方文档速通

前言：[Sass 中文网](https://www.sass.hk/guide/)，本文档主要是在 Vue3 中用法。

一. 特色功能

Sass 是一款强化 CSS 的辅助工具，在 CSS 语法的基础上增加了变量、嵌套、混合、导入等高级功能。有助于组织管理样式文件，更高效地开发项目。

二. 语法格式

.scss 拓展名：在 CSS3 语法的基础上进行拓展。

.sass 拓展名：用 “缩进” 代替 “花括号” ，用 “换行” 代替 “分号” 。

三. 用法

1. 注释 /\* \*/ 与 //

多行注释 /\* \*/，单行注释 //，前者会被输出到编译后的 CSS 文件中，而后者则不会，例如：

```scss
/* This comment is
 * several lines long.
 * since it uses the CSS comment syntax,
 * it will appear in the CSS output. */
body {
  color: black;
}

// These comments are only one line long each.
// They won't appear in the CSS output,
// since they use the single-line comment syntax.
a {
  color: green;
}

// 编译后
/* This comment is
 * several lines long.
 * since it uses the CSS comment syntax,
 * it will appear in the CSS output. */
body {
  color: black;
}

a {
  color: green;
}
```

2. 嵌套

2.1 嵌套规则

避免重复输入父选择器，令复杂的 CSS 结构易于管理。

```scss
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}

// 编译后
#main p {
  color: #00ff00;
  width: 97%;
}
#main p .redbox {
  background-color: #ff0000;
  color: #000000;
}
```

2.2 父选择器 &

在嵌套 CSS 中，访问外层的父选择器，使用 & 代表外层的父选择器。

```scss
a {
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  body.firefox & {
    font-weight: normal;
  }
}

// 编译后
a {
  font-weight: bold;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
body.firefox a {
  font-weight: normal;
}
```

2.3 属性嵌套

如 font-family, font-size, font-weight 。为了便于管理，避免重复输入。可以这样写：

```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}

// 编译后
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

3 变量 $

以 $ 开头定义变量：

```scss
// 定义
$width: 5em;

// 使用
#main {
  width: $width;
}
```

块级变量可以通过 !global 升级为全局变量：

```scss
#main {
  $width: 5em !global;
  width: $width;
}
#sidebar {
  width: $width;
}

// 编译后
#main {
  width: 5em;
}
#sidebar {
  width: 5em;
}
```

4. 插值语句 #{}

通过 #{} 可以在选择器或属性名中使用变量：

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}

// 编译后
p.foo {
  border-color: blue;
}
```

5. @import 导入

Sass 拓展了 @import 的功能，允许其导入 SCSS 或 Sass 文件。可以使用导入文件的变量和混合指令(mixin)。

```scss
@import "foo.scss";
```

嵌套 @import

```scss
.example {
  color: red;
}
#main {
  @import "example";
}

// 编译后
#main .example {
  color: red;
}
```

6. @extend 继承

一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。提取出公用样式，然后使用 @extend 继承。

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.error.intrusion {
  background-image: url("/image/hacked.png");
}
.seriousError {
  @extend .error;
  border-width: 3px;
}

// 编译后
.error,
.seriousError {
  border: 1px #f00;
  background-color: #fdd;
}
.error.intrusion,
.seriousError.intrusion {
  background-image: url("/image/hacked.png");
}
.seriousError {
  border-width: 3px;
}
```

7. @if 条件

当 @if 的表达式返回值不是 false 或者 null 时，条件成立，输出 {} 内的代码：

```scss
p {
  @if 1 + 1 == 2 {
    border: 1px solid;
  }
  @if 5 < 3 {
    border: 2px dotted;
  }
  @if null {
    border: 3px double;
  }
}

// 编译后
p {
  border: 1px solid;
}
```

@if 后可以跟多个 @else if ，或 @else 。如果 @if 失败，Sass 将逐条执行 @else if ，如果全失败，则执行 @else 声明，例如：

```scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}

// 编译后
p {
  color: green;
}
```

8. @for 循环

@for 指令可以在限制的范围内重复输出格式。

```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}

// 编译后
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
.item-3 {
  width: 6em;
}
```

9. @each 循环

@each 遍历的是一连串的值，也就是值列表。

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url("/images/#{$animal}.png");
  }
}

// 编译后
.puma-icon {
  background-image: url("/images/puma.png");
}
.sea-slug-icon {
  background-image: url("/images/sea-slug.png");
}
.egret-icon {
  background-image: url("/images/egret.png");
}
.salamander-icon {
  background-image: url("/images/salamander.png");
}
```

10. @while 循环

@while 指令重复输出直到返回结果为 false。这样可以实现比 @for 更复杂的循环，只是很少会用到。例如：

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}

// 编译后
.item-6 {
  width: 12em;
}
.item-4 {
  width: 8em;
}
.item-2 {
  width: 4em;
}
```

11. @mixin 混合指令

混合指令（Mixin）用于定义可重复使用的样式。

11.1 @mixin 定义、@include 引入

```scss
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}

// 编译后
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 4px;
  margin-top: 10px;
}
```

11.2 参数

参数用于给混合指令中的样式设定变量。

```scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p {
  @include sexy-border(blue, 1in);
}

// 编译后
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed;
}
```

11.3 参数变量

不确定混合指令需要多少参数，可以使用参数变量 … 声明

```scss
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}
.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}

// 编译后
.shadowed {
  -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
}
```

12. @function 函数

```scss
$grid-width: 40px;
$gutter-width: 10px;
@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}
#sidebar {
  width: grid-width(5);
}

// 编译后
#sidebar {
  width: 240px;
}
```
