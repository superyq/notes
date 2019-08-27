<h1 align="center">vue3.0使用pug学习笔记</h1>

## 安装

```
yarn add vue-cli-plugin-pug --dev
```

## 基础用法

1. 类名/ID

```
a.button 或 a(class="button")
```

2. 属性

> 属性可以使用()包裹起来,属性值之间用逗号隔开,比如:

```
a(href="google.com",title="google")
```

3. 文本内容

```
a(href="google.com",title="google") Hello word

\\ 多行文本
style.
  body{ color: red}
  .pug{ width: 200px; height: 200px; border: 1px solid #000}

\\ 或者
p
  | sadf
  | asdf
  | asdf
```

4. 变量

```
-var Pug="hello world"
 title #{Pug}
```

5. 转义

```
\#{{id}}
```

6. extends 扩展：允许模板来扩展一个布局或父模板，它可以覆盖某些预定义内容块。例：

```
//- index.pug
extends layout.pug

block title
  title article title

block content
  h1 my article

//- layout
doctype html
html
  head
    block title
      title Default title
  body
    block content

// 编译结果
<html>
  <head>
    <title>article title</title>
  </head>

  <body>
    <h1>my article</h1>
  </body>

</html>
```

