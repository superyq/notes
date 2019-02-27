# 1.entry

> webpack 构建了你整个项目的依赖树，entry 用来指定打包的起始节点，webpack 会从这个节点出发将所有依赖的模块打包进来。可以指定一个或多个 entry，具体配置方法如下：

**单一入口:**

```
const config = {
  entry: './entry/file.js'
};
```

> entry 为一个字符串，指定了单一的入口.

**多入口**

> 如果需要指定多个入口，可以按下面这样配置：

```
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

> 这里指定了两个入口，这里的 app 和 vendors 作为入口的名字，在配置 output 的时候可以用到。

# 2.output

> 将所有的模块和资源打包完成后，总需要一个地方来放置它，output 就是做这个事情的，它指定了打包后的文件放置的位置，以及命名等信息。

> 可以简单地配置输出文件的路径：

```
const config = {
  output: 'bundle.js'
};
```

> 当通常都需要更多的配置，output 提供了很多可选的配置，其中涉及到文件命名，source map，jsonp，以及打包为 library 等诸多选项，可以在 [这里](https://webpack.js.org/concepts/output/) 看来 output 各项配置的含义。

# 3.loader

> webpack 将所有的资源（css, js, image 等）都看做模块，但是 webpack 能处理的只是 JavaScript，因此，需要存在一个能将其他资源转换为模块，让 webpack 能将其加入依赖树中的东西，它就是 loader。在 webpack 的配置文件中，配置一个 loader 的代码如下（这里使用了 2.0 版本的 webpack 的配置方式）：

```
rules: [
    {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
    }
]
```

> test 说明了当前 loader 能处理那些类型的文件，use 则指定了 loader 的类型。

# plugins

> loader 只能针对某种特定类型的文件进行处理，而 plugin 的功能则更为强大。在 plugin 中能够介入到整个 webpack 编译的生命周期。配置 plugin 的方式如下：

```
plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
]
```

> webpack 自身已经提供了一些很有用的 [plugin](https://webpack.js.org/plugins/)。

# 5.module

> webpack 将一切资源看做是一个个模块，然后将其加入依赖树中。那么那些东西会被当做模块呢？如下：

+ ES2015 import

+ commonjs require()

+ AMD define 与 require

+ css/scss/less 中的 @import

+ 存在于样式表中的 url() 或 html 中的 <img src=...> 的图片