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
