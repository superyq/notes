<h2 align="center">pug笔记</h2>

## 安装

```
yarn add vue-cli-plugin-pug --dev
```

## 1.类名/ID

```
a.button 或 a(class="button")

<!-- 编译后 -->
<a class="button"></a>
```

## 2.属性

> 属性可以使用()包裹起来,属性值之间用逗号隔开,比如:

```
a(href="google.com",title="google")

<!-- 编译后 -->
<a href="google.com" title="google">
```

## 3.文本内容

```
a(href="google.com",title="google") Hello word
```

> 多行文本

```
style.
  body{ color: red}
  .pug{ width: 200px; height: 200px; border: 1px solid #000}

<!-- 或者 -->

p
  | sadf
  | asdf
  | asdf
```

> 文本含标签

```
p
  asdf<strong> hey </strong>
  asdf
  asdf
```

## 4.注释

> 非缓冲注释

```
//- will not output within markup
```

## 5.变量

```
-var Pug="hello world"
 title #{Pug}
```

## 6.转义

```
\#{{id}}
```
