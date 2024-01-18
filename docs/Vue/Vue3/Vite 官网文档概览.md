# Vite 官网文档概览

一. 指引

1. 为什么选择 Vite

1.1 现实问题

在大型项目中，JS 代码量巨大，包含数千个模块，基于 JS 开发的工具就会遇到瓶颈：1. 启动开发服务慢（几分钟）。2，模块热替换（HMR）需要几秒钟才在浏览器反映出来。极大的影响了开发效率和开发幸福感。Vite 利用生态系统新进展解决上述问题：浏览器开始原生支持 ES 模块。越来越多的 JS 工具使用编译性语言编写。

1.1.1 缓慢的服务器启动

Vite 一开始将应用模块分为依赖和源码，加快了开发服务器启动时间。Vite 使用 esbuild 预构建依赖，esbuild 使用 go 编写，比 JS 编写的打包器预构建依赖块 10-100 倍。Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

1.1.2 缓慢的更新

基于打包器启动时，重建整个包的效率很低。原因显而易见：因为这样更新速度会随着应用体积增长而直线下降。

在 Vite 中，HMR 是在原生 ESM 上执行的。当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活[1]（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新。

Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。

一旦你体验到 Vite 的神速，你是否愿意再忍受像曾经那样使用打包器开发就要打上一个大大的问号了。

1.2 为什么生产环境仍需打包

尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）。为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。

要确保开发服务器和生产环境构建之间的最优输出和行为一致并不容易。所以 Vite 附带了一套 构建优化 的 构建命令，开箱即用。

1.2.1 为何不用 ESBuild 打包？

Vite 目前的插件 API 与使用 esbuild 作为打包器并不兼容。尽管 esbuild 速度更快，但 Vite 采用了 Rollup 灵活的插件 API 和基础建设，这对 Vite 在生态中的成功起到了重要作用。目前来看，我们认为 Rollup 提供了更好的性能与灵活性方面的权衡。

2. 开始

2.1 总览

Vite（法语意为 "快速的"，发音 /vit/，发音同 "veet"）是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：

一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。

一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

2.2 浏览器支持

在开发阶段，Vite 将 esnext 作为转换目标，因为我们假设使用的是现代浏览器，它支持所有最新的 JavaScript 和 CSS 特性。这样可以防止语法降级，让 Vite 尽可能地接近原始源代码。

对于生产构建，默认情况下 Vite 的目标浏览器支持 原生 ES 模块、原生 ESM 动态导入 和 import.meta。旧版浏览器可以通过官方的 @vitejs/plugin-legacy。查看 构建生产环境 了解更多细节。

2.3 在线试用 Vite

你可以通过 [StackBlitz](https://stackblitz.com/edit/vitejs-vite-heargv?file=index.html&terminal=dev) 在线试用 vite。

2.4 搭建第一个 Vite 项目

兼容性注意：Vite 需要 Node.js 版本 18+，20+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

```sh
npm create vite@latest
# or
yarn create vite
# or
pnpm create vite
```

2.5 社区模板

create-vite 是一个快速生成主流框架基础模板的工具。可以用如 degit 之类的工具，使用社区模版来搭建项目。

```sh
npx degit user/project my-project
cd my-project

npm install
npm run dev
```

如果该项目使用 main 作为默认分支, 需要在项目名后添加 #main。

```sh
npx degit user/project#main my-project
```

2.6 index.html 与项目根目录

你可能已经注意到，在一个 Vite 项目中，index.html 在项目最外层而不是在 public 文件夹内。这是有意而为之的：在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件。

Vite 将 index.html 视为源码和模块图的一部分。Vite 解析 <script type="module" src="..."> ，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的 <script type="module"> 和引用 CSS 的 <link href> 也能利用 Vite 特有的功能被解析。另外，index.html 中的 URL 将被自动转换，因此不再需要 %PUBLIC_URL% 占位符了。

与静态 HTTP 服务器类似，Vite 也有 “根目录” 的概念，即服务文件的位置，在接下来的文档中你将看到它会以 <root> 代称。源码中的绝对 URL 路径将以项目的 “根” 作为基础来解析，因此你可以像在普通的静态文件服务器上一样编写代码（并且功能更强大！）。Vite 还能够处理依赖关系，解析处于根目录外的文件位置，这使得它即使在基于 monorepo 的方案中也十分有用。

Vite 也支持多个 .html 作入口点的 多页面应用模式。

vite 以当前工作目录作为根目录启动开发服务器。你也可以通过 vite serve some/sub/dir 来指定一个替代的根目录。注意 Vite 同时会解析项目根目录下的 配置文件（即 vite.config.js），因此如果根目录被改变了，你需要将配置文件移动到新的根目录下。

2.7 命令行界面

在安装了 Vite 的项目中，可以在 npm scripts 中使用 vite 可执行文件，或者直接使用 npx vite 运行它。下面是通过脚手架创建的 Vite 项目中默认的 npm scripts：

```sh
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

2.8 使用未发布功能

如果你迫不及待想要体验最新的功能，可以自行克隆 vite 仓库 到本地机器上然后自行将其链接（将需要 pnpm）：

```sh
git clone https://github.com/vitejs/vite.git
cd vite
pnpm install
cd packages/vite
pnpm run build
pnpm link --global # 在这一步中可使用你喜欢的包管理器
```

3. 功能

对非常基础的使用来说，使用 Vite 开发和使用一个静态文件服务器并没有太大区别。然而，Vite 还通过原生 ESM 导入提供了许多主要用于打包场景的增强功能。

3.1 NPM 依赖解析和预构建

原生 ES 导入不支持下面这样的裸模块导入：

```js
import { someMethod } from "my-dep";
```

上面的代码会在浏览器中抛出一个错误。Vite 将会检测到所有被加载的源文件中的此类裸模块导入，并执行以下操作:

1. 预构建 它们可以提高页面加载速度，并将 CommonJS / UMD 转换为 ESM 格式。预构建这一步由 esbuild 执行，这使得 Vite 的冷启动时间比任何基于 JavaScript 的打包器都要快得多。

2. 重写导入为合法的 URL，例如 /node_modules/.vite/deps/my-dep.js?v=f3sf2ebd 以便浏览器能够正确导入它们。

Vite 通过 HTTP 头来缓存请求得到的依赖。

3.2 模块热更新

Vite 提供了一套原生 ESM 的 HMR API。 具有 HMR 功能的框架可以利用该 API 提供即时、准确的更新，而无需重新加载页面或清除应用程序状态。Vite 内置了 HMR 到 Vue 单文件组件（SFC） 和 React Fast Refresh 中。也通过 @prefresh/vite 对 Preact 实现了官方集成。

注意，你不需要手动设置这些 —— 当你通过 create-vite 创建应用程序时，所选模板已经为你预先配置了这些。

3.3 TS

Vite 天然支持引入 .ts 文件。

3.3.1 仅执行转译

请注意，Vite 仅执行 .ts 文件的转译工作，并不执行 任何类型检查。并假定类型检查已经被你的 IDE 或构建过程处理了。

Vite 之所以不把类型检查作为转换过程的一部分，是因为这两项工作在本质上是不同的。转译可以在每个文件的基础上进行，与 Vite 的按需编译模式完全吻合。相比之下，类型检查需要了解整个模块图。把类型检查塞进 Vite 的转换管道，将不可避免地损害 Vite 的速度优势。

Vite 的工作是尽可能快地将源模块转化为可以在浏览器中运行的形式。为此，我们建议将静态分析检查与 Vite 的转换管道分开。这一原则也适用于其他静态分析检查，例如 ESLint。

在构建生产版本时，你可以在 Vite 的构建命令之外运行 tsc --noEmit。

在开发时，如果你需要更多的 IDE 提示，我们建议在一个单独的进程中运行 tsc --noEmit --watch，或者如果你喜欢在浏览器中直接看到上报的类型错误，可以使用 vite-plugin-checker。

Vite 使用 esbuild 将 TypeScript 转译到 JavaScript，约是 tsc 速度的 20~30 倍，同时 HMR 更新反映到浏览器的时间小于 50ms。

使用 仅含类型的导入和导出 形式的语法可以避免潜在的 “仅含类型的导入被不正确打包” 的问题，写法示例如下：

```ts
import type { T } from "only/types";
export type { T };
```

3.3.2 TS 编译器选项

tsconfig.json 中 compilerOptions 下的一些配置项需要特别注意。

isolatedModules：应该设置为 true。这是因为 esbuild 只执行没有类型信息的转译，它并不支持某些特性，如 const enum 和隐式类型导入。你必须在 tsconfig.json 中的 compilerOptions 下设置 "isolatedModules": true。如此做，TS 会警告你不要使用隔离（isolated）转译的功能。然而，一些库（如：vue）不能很好地与 "isolatedModules": true 共同工作。你可以在上游仓库修复好之前暂时使用 "skipLibCheck": true 来缓解这个错误。

useDefineForClassFields：从 Vite v2.5.0 开始，如果 TypeScript 的 target 是 ESNext 或 ES2022 及更新版本，此选项默认值则为 true。若设了其他 TypeScript 目标，则本项会默认为 false。大多数库都希望 "useDefineForClassFields": true

target：Vite 默认不会转译 TypeScript，而是使用 esbuild 的默认行为。该 esbuild.target 选项可以用来代替上述行为，默认值为 esnext，以进行最小的转译。在构建中，build.target 选项优先级更高，如果需要也可以设置。

3.3.3 客户端类型

Vite 默认的类型定义是写给它的 Node.js API 的。要将其补充到一个 Vite 应用的客户端代码环境中，请添加一个 d.ts 声明文件：

```ts
/// <reference types="vite/client" />
```

或者，你也可以将 vite/client 添加到 tsconfig.json 中的 compilerOptions.types 下：

```json
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```

这将会提供以下类型定义补充：

资源导入 (例如：导入一个 .svg 文件)
import.meta.env 上 Vite 注入的环境变量的类型定义
import.meta.hot 上的 HMR API 类型定义

TIP：要覆盖默认的类型定义，请添加一个包含你所定义类型的文件，请在三斜线注释 reference vite/client 前添加定义。例如，要为 React 组件中的 \*.svg 文件定义类型：

```ts
// vite-env-override.d.ts (the file that contains your typings):
declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}
```

```ts
// The file containing the reference to vite/client
/// <reference types="./vite-env-override.d.ts" />
/// <reference types="vite/client" />
```

3.4 Vue

Vite 为 Vue 提供第一优先级支持：

Vue 3 单文件组件支持：@vitejs/plugin-vue
Vue 3 JSX 支持：@vitejs/plugin-vue-jsx
Vue 2.7 SFC 支持：@vitejs/plugin-vue2
Vue 2.7 JSX support via @vitejs/plugin-vue2-jsx

3.5 JSX

.jsx 和 .tsx 文件同样开箱即用。JSX 的转译同样是通过 esbuild。

Vue 用户应使用官方提供的 @vitejs/plugin-vue-jsx 插件，它提供了 Vue 3 特性的支持，包括 HMR，全局组件解析，指令和插槽。

3.6 CSS

3.6.1 @import 内联和变基

Vite 通过 postcss-import 预配置支持了 CSS @import 内联，Vite 的路径别名也遵从 CSS @import。换句话说，所有 CSS url() 引用，即使导入的文件在不同的目录中，也总是自动变基，以确保正确性。Sass 和 Less 文件也支持 @import 别名和 URL 变基。

3.6.2 PostCSS

如果项目包含有效的 PostCSS 配置 (任何受 postcss-load-config 支持的格式，例如 postcss.config.js)，它将会自动应用于所有已导入的 CSS。

请注意，CSS 最小化压缩将在 PostCSS 之后运行，并会使用 build.cssTarget 选项。

3.6.3 CSS Modules

任何以 .module.css 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件。导入这样的文件会返回一个相应的模块对象：

```css
/* example.module.css */
.red {
  color: red;
}
```

```js
import classes from "./example.module.css";
document.getElementById("foo").className = classes.red;
```

CSS modules 行为可以通过 css.modules 选项 进行配置。如果 css.modules.localsConvention 设置开启了 camelCase 格式变量名转换（例如 localsConvention: 'camelCaseOnly'），你还可以使用按名导入。

```js
// .apply-color -> applyColor
import { applyColor } from "./example.module.css";
document.getElementById("foo").className = applyColor;
```

3.6.4 CSS 预处理器

由于 Vite 的目标仅为现代浏览器，因此建议使用原生 CSS 变量和实现 CSSWG 草案的 PostCSS 插件（例如 postcss-nesting）来编写简单的、符合未来标准的 CSS。

话虽如此，但 Vite 也同时提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖：

```sh
# .scss and .sass
npm add -D sass

# .less
npm add -D less

# .styl and .stylus
npm add -D stylus
```

如果使用的是单文件组件，可以通过 <style lang="sass">（或其他预处理器）自动开启。

Vite 为 Sass 和 Less 改进了 @import 解析，以保证 Vite 别名也能被使用。另外，url() 中的相对路径引用的，与根文件不同目录中的 Sass/Less 文件会自动变基以保证正确性。

由于 Stylus API 限制，@import 别名和 URL 变基不支持 Stylus。

你还可以通过在文件扩展名前加上 .module 来结合使用 CSS modules 和预处理器，例如 style.module.scss。

3.6.5 禁用 CSS 注入页面

自动注入 CSS 内容的行为可以通过 ?inline 参数来关闭。在关闭时，被处理过的 CSS 字符串将会作为该模块的默认导出，但样式并没有被注入到页面中。

```js
import "./foo.css"; // 样式将会注入页面
import otherStyles from "./bar.css?inline"; // 样式不会注入页面
```

注意：自 Vite 5 起，CSS 文件的默认导入和按名导入（例如 import style from './foo.css'）将被移除。请使用 ?inline 参数代替。

3.6.6 Lightning CSS

从 Vite 4.4 开始，已经实验性地支持 Lightning CSS。可以通过在配置文件中添加 css.transformer: 'lightningcss' 并安装可选的 lightningcss 依赖项来选择使用它：

```sh
npm add -D lightningcss
```

如果启用，CSS 文件将由 Lightning CSS 处理，而不是 PostCSS。可以将 Lightning CSS 的选项传递给 css.lightingcss 选项来配置。

要配置 CSS Modules，需要使用 css.lightningcss.cssModules 而不是 css.modules（后者是用于配置 PostCSS 处理 CSS Modules 的方式）。

默认情况下，Vite 使用 esbuild 来压缩 CSS。通过 build.cssMinify: 'lightningcss' 进行配置，也可以将 Lightning CSS 用作 CSS 最小化压缩。

在使用 Lightning CSS 时，不支持 CSS 预处理器。

3.7 静态资源处理

3.8 JSON
3.9 Glob 导入
3.10 动态导入
3.11 WebAssembly
3.12 Web Workers
3.13 构建优化

1. 命令行界面
2. 使用插件
3. 依赖预构建
4. 静态资源处理
5. 构建生产版本
6. 部署静态站点
7. 环境变量与模式
8. 服务端渲染（SSR）
9. 后端集成
10. 比较
11. 故障排除
12. 性能
13. 理念
14. 从 v4 迁移

二. API

1. 插件 API
2. HMR API
3. JS API
4. 配置参考

三. 配置

1. 配置 Vite
2. 共享选项
3. 服务器选择
4. 构建选择
5. 预览选择
6. 依赖优化选择
7. SSR 选择
8. Worker 选择
