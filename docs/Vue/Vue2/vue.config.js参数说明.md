# 参数说明

1. publicPath

默认值：'/'
说明：部署应用包时的基本 URL，例：https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
提示：1. 当使用基于 HTML5 history.pushState 的路由时 2.当使用 pages 选项构建多页面应用时。

2. outputDir

默认值：'dist'
说明：打包目录。
提示：目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。

3. assetsDir

默认值：''
说明：放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
注意：从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。

4. indexPath

默认值：'index.html'
说明：指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。

5. pages

默认值：undefined
说明：在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。
注意：其值应该是一个对象，对象的 key 是入口的名字，value 是：1.一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；2.或一个指定其 entry 的字符串。

```js
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/subpage/main.js'
  }
}
```

6. lintOnSave

默认值：true
说明：是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。

7. devServer

Type：String
说明：devServer.proxy 可以是一个指向开发环境 API 服务器的字符串

```js
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000'
  }
}
```

8. chainWebpack

Type: Function
说明：是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
