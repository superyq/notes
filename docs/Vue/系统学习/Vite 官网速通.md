# Vite 官网文档速通

一. 指引

1. 为什么选择 Vite

1.1 现实问题

问题：当项目中 JS 代码量变多，就会导致：1. 启动开发服务慢（几分钟）。2，模块热替换（HMR）慢（几秒钟）。极大影响开发效率和体验。

解决：1. Vite 将应用模块分为依赖和源码，加快了开发服务器启动时间。Vite 使用 esbuild 预构建依赖，esbuild 使用 go 编写，比 JS 编写的打包器预构建依赖块 10-100 倍。Vite 以原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。2. Vite 使已编辑的模块与其最近的 HMR 边界之间的链失活，始终保持快速更新。、

1.2 为什么生产环境仍需打包

为了最佳的加载性能，最好将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。为什么不用 ESBuild 打包，因为 Vite 的插件 API 与 esbuild 打包器并不兼容。尽管 esbuild 速度更快，但 Vite 采用了 Rollup 打包。

2. 开始

2.1 总览

Vite 是一款前端构建工具，由两部分组成：1. 一个开发服务器。2. 一套构建指令。[在线试用 vite](https://stackblitz.com/edit/vitejs-vite-heargv?file=index.html&terminal=dev)

2.2 搭建 Vite 项目

兼容性注意：Vite 需要 Node.js 版本 18+，20+。

```sh
npm create vite@latest
# or
yarn create vite
# or
pnpm create vite
```

2.3 index.html 与项目根目录

在 Vite 项目中，index.html 在项目最外层。在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件。Vite 解析 <script type="module" src="..."> 指向 JavaScript 源码。index.html 中 URL 将被自动转换，不再需要 %PUBLIC_URL% 占位符了。

2.4 命令行界面

在通过脚手架创建的 Vite 项目中默认的 npm scripts：

```sh
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

3. 功能

Vite 通过原生 ESM 导入提供了许多主要用于打包场景的增强功能。

3.1 NPM 依赖解析和预构建

原生 ES 导入不支持下面这样的裸模块导入，Vite 将会检测到所有裸模块导入，并进行： 1. 预构建。2. 重写导入为合法的 URL

```js
import { someMethod } from "my-dep";
```

3.2 TS

Vite 天然支持引入 .ts 文件。Vite 使用 esbuild 将 TS 转译为 JS，Vite 为了将类型定义用在客户端需要设置 d.ts 文件，或者添加到 tsconfig.ts 中的 compilerOptions.types 中。设置后会提供：资源导入、import.meta.env、import.meta.hot 的类型定义补充。

```ts
// d.ts
/// <reference types="vite/client" />
```

```json
// tsconfig.ts
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```

要覆盖默认类型定义，新建一个包含你所定义类型的文件，然后在 d.ts 注释前引入。

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

3.3 CSS

以 .module.css 为后缀的 CSS 被认为是 CSS modules 文件。导入这样的文件会返回一个相应的模块对象：

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

通过 ?inline 关闭 css 注入页面，使 css 样式失效。

```js
import "../src/assets/css/index.scss?inline";
```

3.4 JSON

JSON 可以被直接导入 —— 同样支持具名导入：

```js
// 导入整个对象
import json from "./example.json";
// 根字段具名导入 —— 有效帮助 treeshaking！(只打包用到的依赖)
import { field } from "./example.json";
```

3.5 Glob 导入

import.meta.glob 函数从文件系统导入多个模块，默认是懒加载的，过动态导入实现，传入 { eager: true } 转化为直接引入。传入{ as: "raw", eager: true }转化为字符串形式。

```js
const modules = import.meta.glob("./dir/*.js");
// 转译为
const modules = {
  "./dir/foo.js": () => import("./dir/foo.js"),
  "./dir/bar.js": () => import("./dir/bar.js"),
};

const modules = import.meta.glob("./dir/*.js", { eager: true });
// 转译为
import * as __glob__0_0 from "./dir/foo.js";
import * as __glob__0_1 from "./dir/bar.js";
const modules = {
  "./dir/foo.js": __glob__0_0,
  "./dir/bar.js": __glob__0_1,
};

const modules = import.meta.glob("./dir/*.js", { as: "raw", eager: true });
// 转译为
const modules = {
  "./dir/foo.js": 'export default "foo"\n',
  "./dir/bar.js": 'export default "bar"\n',
};
```

使用数组多个匹配文件。

```js
const modules = import.meta.glob(["./dir/*.js", "./another/*.js"]);
```

使用 ！排除匹配中的一些文件

```js
const modules = import.meta.glob(["./dir/*.js", "!**/bar.js"]);
// 转译为
const modules = {
  "./dir/foo.js": () => import("./dir/foo.js"),
};
```

3.6 构建优化

CSS 代码分割

Vite 会根据异步 chunk 模块生成单独的 CSS 文件。在异步 chunk 加载完成时通过 <link> 标签载入，该异步 chunk 只在 CSS 加载完毕后执行，避免发生 FOUC (无样式内容闪烁)。通过设置 build.cssCodeSplit 为 false 来禁用 CSS 代码分割。将所有 CSS 抽取到一个文件。

异步 Chunk 加载优化

问题：在无优化的情境下，当异步 chunk A 被导入时，浏览器将必须请求和解析 A，弄清楚它也需要共用 chunk C。这会导致额外的网络往返：

```
Entry ---> A ---> C
```

解决：Vite 使用预加载步骤自动重写代码，来分割动态导入调用，以实现当 A 被请求时，C 也将 同时 被请求：

```
Entry ---> (A + C)
```

4. 命令行界面

```sh
# 启动 Vite 开发服务器
vite [root]


# 构建生产版本
vite build [root]


# 预构建依赖
vite optimize [root]

# 本地预览构建产物
vite preview [root]
```

5. 使用插件

5.1 添加插件

添加后，在 vite.config.js 配置文件中的 plugins 数组中引入它。例如，要想为传统浏览器提供支持：

```sh
$ npm add -D @vitejs/plugin-legacy
```

```js
// vite.config.js
import legacy from "@vitejs/plugin-legacy";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
});
```

5.2 按需应用

使用 apply 属性指明插件在 'build' 或 'serve' 哪种模式时调用：

```js
// vite.config.js
import typescript2 from "rollup-plugin-typescript2";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      ...typescript2(),
      apply: "build",
    },
  ],
});
```

6. 依赖预构建

首次启动 vite 时，Vite 会预构建项目依赖。目的在于：1. 将 CommonJS 或 UMD 转化为 ES 模块。2. 将许多内部模块的 ESM 依赖项转换为单个模块。

7. 构建生产版本

打包运行 vite build 命令。将 <root>/index.html 作为构建入口点，生成静态部署的应用包。

8.  部署静态站点

默认打包文件夹为 dist，可以通过 build.outDir 修改。vite preview 只用作预览本地构建，不应作为生产服务器。

你正在使用 NPM；或者 Yarn 等其他可以运行下面的脚本指令的包管理工具。
Vite 已作为一个本地开发依赖（dev dependency）安装在你的项目中，并且你已经配置好了如下的 npm scripts：

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

值得注意的是

注意：本篇指南提供了部署 Vite 静态站点的说明。Vite 也对服务端渲染（SSR）有了实验性的支持。SSR 是指支持在 Node 中运行相应应用的前端框架，预渲染成 HTML，最后在客户端激活（hydrate）。查看 SSR 指南 了解更多细节。另一方面，如果你在寻找与传统服务端框架集成的方式，那么请查看 后端集成 章节。

9.1 构建应用

你可以运行 npm run build 命令来执行应用的构建：

```sh
npm run build
```

默认情况下，构建会输出到 dist 文件夹中。你可以部署这个 dist 文件夹到任何你喜欢的平台。

当你构建完成应用后，你可以通过运行 npm run preview 命令，在本地测试该应用：

```sh
npm run build
npm run preview
```

vite preview 命令会在本地启动一个静态 Web 服务器，将 dist 文件夹运行在 http://localhost:4173。这样在本地环境下查看该构建产物是否正常可用就方便多了。

你可以通过 --port 参数来配置服务的运行端口：

```sh
{
  "scripts": {
    "preview": "vite preview --port 8080"
  }
}
```

现在 preview 命令会将服务器运行在 http://localhost:8080。

9.2 GitHub Pages

在 vite.config.js 中设置正确的 base：

如果你正要部署到 https://<USERNAME>.github.io/，或者通过 GitHub Pages 部署到一个自定义域名（例如 www.example.com），请将 base 设置为 '/'。或者，你也可以从配置中移除 base，因为它默认为 '/'。
如果你正在部署到 https://<USERNAME>.github.io/<REPO>/（例如你的仓库地址为 https://github.com<USERNAME>/<REPO>），那么请将 base 设置为 '/<REPO>/'。

进入仓库 settings 页面的 GitHub Pages 配置，选择部署来源为“GitHub Actions”，这将引导你创建一个构建和部署项目的工作流程，我们提供了一个安装依赖项和使用 npm 构建的工作流程样本：

```yml
# 将静态内容部署到 GitHub Pages 的简易工作流程
name: Deploy static content to Pages

on:
  # 仅在推送到默认分支时运行。
  push:
    branches: ["main"]

  # 这个选项可以使你手动在 Action tab 页面触发工作流
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages。
permissions:
  contents: read
  pages: write
  id-token: write

# 允许一个并发的部署
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  # 单次部署的工作描述
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "npm"
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          # Upload dist repository
          path: "./dist"
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

9.3 GitLab Pages 配合 GitLab CI

在 vite.config.js 中设置正确的 base。

如果你要部署在 https://<USERNAME or GROUP>.gitlab.io/ 上，你可以省略 base 使其默认为 '/'。
如果你要部署在 https://<USERNAME or GROUP>.gitlab.io/<REPO>/ 上，例如你的仓库地址为 https://gitlab.com/<USERNAME>/<REPO>，那么请设置 base 为 '/<REPO>/'。

在项目根目录创建一个 .gitlab-ci.yml 文件，并包含以下内容。它将使得每次你更改内容时都重新构建与部署站点：

```yaml
image: node:16.5.0
pages:
  stage: deploy
  cache:
    key:
      files:
        - package-lock.json
      prefix: npm
    paths:
      - node_modules/
  script:
    - npm install
    - npm run build
    - cp -a dist/. public/
  artifacts:
    paths:
      - public
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

10. 环境变量与模式

10.1 环境变量

Vite 在一个特殊的 import.meta.env 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量：

import.meta.env.MODE: {string} 应用运行的模式。
import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由 base 配置项决定。
import.meta.env.PROD: {boolean} 应用是否运行在生产环境（使用 NODE_ENV='production' 运行开发服务器或构建应用时使用 NODE_ENV='production' ）。
import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD 相反)。
import.meta.env.SSR: {boolean} 应用是否运行在 server 上。

10.2 .env 文件

Vite 使用 dotenv 从你的 环境目录 中的下列文件加载额外的环境变量：

```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

环境加载优先级：

一份用于指定模式的文件（例如 .env.production）会比通用形式的优先级更高（例如 .env）。

另外，Vite 执行时已经存在的环境变量有最高的优先级，不会被 .env 类文件覆盖。例如当运行 VITE_SOME_KEY=123 vite build 的时候。

.env 类文件会在 Vite 启动一开始时被加载，而改动会在重启服务器后生效。

加载的环境变量也会通过 import.meta.env 以字符串形式暴露给客户端源码。

为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE\_ 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这些环境变量：

```
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

只有 VITE_SOME_KEY 会被暴露为 import.meta.env.VITE_SOME_KEY 提供给客户端源码，而 DB_PASSWORD 则不会。

```js
console.log(import.meta.env.VITE_SOME_KEY); // 123
console.log(import.meta.env.DB_PASSWORD); // undefined
```

请注意，如果想要在环境变量中使用 $ 符号，则必须使用 \ 对其进行转义。

```
KEY=123
NEW_KEY1=test$foo   # test
NEW_KEY2=test\$foo  # test$foo
NEW_KEY3=test$KEY   # test123
```

安全注意事项：.env._.local 文件应是本地的，可以包含敏感变量。你应该将 _.local 添加到你的 .gitignore 中，以避免它们被 git 检入。由于任何暴露给 Vite 源码的变量最终都将出现在客户端包中，VITE\_\* 变量应该不包含任何敏感信息。

默认情况下，Vite 在 vite/client.d.ts 中为 import.meta.env 提供了类型定义。随着在 .env[mode] 文件中自定义了越来越多的环境变量，你可能想要在代码中获取这些以 VITE\_ 为前缀的用户自定义环境变量的 TypeScript 智能提示。

要想做到这一点，你可以在 src 目录下创建一个 env.d.ts 文件，接着按下面这样增加 ImportMetaEnv 的定义：

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

如果你的代码依赖于浏览器环境的类型，比如 DOM 和 WebWorker，你可以在 tsconfig.json 中修改 lib 字段来获取类型支持。

```json
{
  "lib": ["WebWorker"]
}
```

10.3 HTML 环境变量替换

Vite 还支持在 HTML 文件中替换环境变量。import.meta.env 中的任何属性都可以通过特殊的 %ENV_NAME% 语法在 HTML 文件中使用：

```html
<h1>Vite is running in %MODE%</h1>
<p>Using data from %VITE_API_URL%</p>
```

如果环境变量在 import.meta.env 中不存在，比如不存在的 %NON_EXISTENT%，则会将被忽略而不被替换，这与 JS 中的 import.meta.env.NON_EXISTENT 不同，JS 中会被替换为 undefined。

10.4 模式

默认情况下，开发服务器 (dev 命令) 运行在 development (开发) 模式，而 build 命令则运行在 production (生产) 模式。

这意味着当执行 vite build 时，它会自动加载 .env.production 中可能存在的环境变量：

```
# .env.production
VITE_APP_TITLE=My App
```

在你的应用中，你可以使用 import.meta.env.VITE_APP_TITLE 渲染标题。

在某些情况下，若想在 vite build 时运行不同的模式来渲染不同的标题，你可以通过传递 --mode 选项标志来覆盖命令使用的默认模式。例如，如果你想在 staging （预发布）模式下构建应用：

```sh
vite build --mode staging
```

还需要新建一个 .env.staging 文件：

```
# .env.staging
VITE_APP_TITLE=My App (staging)
```

由于 vite build 默认运行生产模式构建，你也可以通过使用不同的模式和对应的 .env 文件配置来改变它，用以运行开发模式的构建：

```
# .env.testing
NODE_ENV=development
```

11. 服务端渲染（SSR）

注意：SSR 特别指支持在 Node.js 中运行相同应用程序的前端框架（例如 React、Preact、Vue 和 Svelte），将其预渲染成 HTML，最后在客户端进行水合处理。如果你正在寻找与传统服务器端框架的集成，请查看 后端集成指南。下面的指南还假定你在选择的框架中有使用 SSR 的经验，并且只关注特定于 Vite 的集成细节。

Low-level API：这是一个底层 API，是为库和框架作者准备的。如果你的目标是构建一个应用程序，请确保优先查看 Vite SSR 章节 中更上层的 SSR 插件和工具。也就是说，大部分应用都是基于 Vite 的底层 API 之上构建的。

11.1 示例项目

Vite 为服务端渲染（SSR）提供了内建支持。create-vite-extra 包含了一些你可以用作参考的 SSR 设置示例：[Vue](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-vue)，[React](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-react)，[Svelte](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-svelte)

你也可以通过 运行 create-vite 在本地搭建这些项目，并在框架选项下选择 Others > create-vite-extra。

11.2 源码结构

一个典型的 SSR 应用应该有如下的源文件结构：

```
- index.html
- server.js # main application server
- src/
  - main.js          # 导出环境无关的（通用的）应用代码
  - entry-client.js  # 将应用挂载到一个 DOM 元素上
  - entry-server.js  # 使用某框架的 SSR API 渲染该应用
```

index.html 将需要引用 entry-client.js 并包含一个占位标记供给服务端渲染时注入：

```html
<div id="app"><!--ssr-outlet--></div>
<script type="module" src="/src/entry-client.js"></script>
```

你可以使用任何你喜欢的占位标记来替代 <!--ssr-outlet-->，只要它能够被正确替换。

11.3 情景逻辑

如果需要执行 SSR 和客户端间情景逻辑，可以使用：

```js
如果需要执行 SSR 和客户端间情景逻辑，可以使用：
```

这是在构建过程中被静态替换的，因此它将允许对未使用的条件分支进行摇树优化。

11.4 设置开发服务器

在构建 SSR 应用程序时，你可能希望完全控制主服务器，并将 Vite 与生产环境脱钩。因此，建议以中间件模式使用 Vite。下面是一个关于 express 的例子：

```js
// server.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // 以中间件模式创建 Vite 应用，并将 appType 配置为 'custom'
  // 这将禁用 Vite 自身的 HTML 服务逻辑
  // 并让上级服务器接管控制
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // 使用 vite 的 Connect 实例作为中间件
  // 如果你使用了自己的 express 路由（express.Router()），你应该使用 router.use
  app.use((req, res, next) => {
    // 当服务器重启（例如用户修改了 vite.config.js 后），
    // `vite.middlewares` 将会被重新赋值。在包装处理程序中调用
    // `vite.middlewares` 可以确保
    // 始终使用最新的 Vite 中间件。
    vite.middlewares.handle(req, res, next);
  });

  app.use("*", async (req, res) => {
    // 服务 index.html - 下面我们来处理这个问题
  });

  app.listen(5173);
}

createServer();
```

这里 vite 是 ViteDevServer 的一个实例。vite.middlewares 是一个 Connect 实例，它可以在任何一个兼容 connect 的 Node.js 框架中被用作一个中间件。

下一步是实现 \* 处理程序供给服务端渲染的 HTML：

```js
app.use("*", async (req, res, next) => {
  const url = req.originalUrl;

  try {
    // 1. 读取 index.html
    let template = fs.readFileSync(
      path.resolve(__dirname, "index.html"),
      "utf-8"
    );

    // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
    //    同时也会从 Vite 插件应用 HTML 转换。
    //    例如：@vitejs/plugin-react 中的 global preambles
    template = await vite.transformIndexHtml(url, template);

    // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
    //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
    //    并提供类似 HMR 的根据情况随时失效。
    const { render } = await vite.ssrLoadModule("/src/entry-server.js");

    // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
    //    函数调用了适当的 SSR 框架 API。
    //    例如 ReactDOMServer.renderToString()
    const appHtml = await render(url);

    // 5. 注入渲染后的应用程序 HTML 到模板中。
    const html = template.replace(`<!--ssr-outlet-->`, appHtml);

    // 6. 返回渲染后的 HTML。
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
    // 你的实际源码中。
    vite.ssrFixStacktrace(e);
    next(e);
  }
});
```

package.json 中的 dev 脚本也应该相应地改变，使用服务器脚本：

```diff
  "scripts": {
-   "dev": "vite"
+   "dev": "node server"
  }
```

11.5 生产环境构建

为了将 SSR 项目交付生产，我们需要：

正常生成一个客户端构建；
再生成一个 SSR 构建，使其通过 import() 直接加载，这样便无需再使用 Vite 的 ssrLoadModule；

```json
{
  "scripts": {
    "dev": "node server",
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --outDir dist/server --ssr src/entry-server.js"
  }
}
```

注意使用 --ssr 标志表明这将会是一个 SSR 构建。同时需要指定 SSR 的入口。

接着，在 server.js 中，通过 process.env.NODE_ENV 条件分支，需要添加一些用于生产环境的特定逻辑：

使用 dist/client/index.html 作为模板，而不是根目录的 index.html，因为前者包含了到客户端构建的正确资源链接。
使用 import('./dist/server/entry-server.js') ，而不是 await vite.ssrLoadModule('/src/entry-server.js')（前者是 SSR 构建后的最终结果）。
将 vite 开发服务器的创建和所有使用都移到 dev-only 条件分支后面，然后添加静态文件服务中间件来服务 dist/client 中的文件。

11.6 生成预加载指令

vite build 支持使用 --ssrManifest 标志，这将会在构建输出目录中生成一份 .vite/ssr-manifest.json：

```diff
- "build:client": "vite build --outDir dist/client",
+ "build:client": "vite build --outDir dist/client --ssrManifest",
```

上面的脚本将会为客户端构建生成 dist/client/.vite/ssr-manifest.json（是的，该 SSR 清单是从客户端构建生成而来，因为我们想要将模块 ID 映射到客户端文件上）。清单包含模块 ID 到它们关联的 chunk 和资源文件的映射。

为了利用该清单，框架需要提供一种方法来收集在服务器渲染调用期间使用到的组件模块 ID。

@vitejs/plugin-vue 支持该功能，开箱即用，并会自动注册使用的组件模块 ID 到相关的 Vue SSR 上下文：

```js
// src/entry-server.js
const ctx = {};
const html = await vueServerRenderer.renderToString(app, ctx);
// ctx.modules 现在是一个渲染期间使用的模块 ID 的 Set
```

我们现在需要在 server.js 的生产环境分支下读取该清单，并将其传递到 src/entry-server.js 导出的 render 函数中。这将为我们提供足够的信息，来为异步路由相应的文件渲染预加载指令！

11.7 预渲染 / SSG

如果预先知道某些路由所需的路由和数据，我们可以使用与生产环境 SSR 相同的逻辑将这些路由预先渲染到静态 HTML 中。这也被视为一种静态站点生成（SSG）的形式。

11.8 SSR 外部化

当运行 SSR 时依赖会由 Vite 的 SSR 转换模块系统作外部化。这会同时提速开发与构建。

如果依赖需要被 Vite 的管道转换，例如因为其中使用了未经过转译的 Vite 特性，那么它们可以被添加到 ssr.noExternal 中。

对于采用链接的依赖，它们将默认不会被外部化，这是为了能使其利用 Vite HMR 的优势。如果你不需要这一功效，例如，想要把这些依赖当成非链接情况来测试，你可以将其添加到 ssr.external。

使用别名：如果你为某个包配置了一个别名，为了能使 SSR 外部化依赖功能正常工作，你可能想要使用的别名应该指的是实际的 node_modules 中的包。Yarn 和 pnpm 都支持通过 npm: 前缀来设置别名。

11.9 SSR 专有插件逻辑

一些框架，如 Vue 或 Svelte，会根据客户端渲染和服务端渲染的区别，将组件编译成不同的格式。可以向以下的插件钩子中，给 Vite 传递额外的 options 对象，对象中包含 ssr 属性来支持根据情景转换：resolveId，load，transform

```js
export function mySSRPlugin() {
  return {
    name: "my-ssr",
    transform(code, id, options) {
      if (options?.ssr) {
        // 执行 ssr 专有转换...
      }
    },
  };
}
```

load 和 transform 中的 options 对象为可选项，rollup 目前并未使用该对象，但将来可能会用额外的元数据来扩展这些钩子函数。

Note：Vite 2.7 之前的版本，会提示你 ssr 参数的位置不应该是 options 对象。目前所有主要框架和插件都已对应更新，但你可能还是会发现使用过时 API 的旧文章。

11.10 SSR 构建目标

SSR 构建的默认目标为 node 环境，但你也可以让服务运行在 Web Worker 上。每个平台的打包条目解析是不同的。你可以将 ssr.target 设置为 webworker，以将目标配置为 Web Worker。

11.11 SSR 构建产物

在某些如 webworker 运行时等特殊情况中，你可能想要将你的 SSR 打包成单个 JavaScript 文件。你可以通过设置 ssr.noExternal 为 true 来启用这个行为。这将会做两件事：

将所有依赖视为 noExternal（非外部化）
若任何 Node.js 内置内容被引入，将抛出一个错误

11.12 Vite CLI

CLI 命令 $ vite dev 和 $ vite preview 也可以用于 SSR 应用：你可以将你的 SSR 中间件通过 configureServer 添加到开发服务器、以及通过 configurePreviewServer 添加到预览服务器。

注意：使用一个后置钩子，使得你的 SSR 中间件在 Vite 的中间件 之后 运行。

12. 后端集成

Note：如果你想使用传统的后端（如 Rails, Laravel）来服务 HTML，但使用 Vite 来服务其他资源，可以查看在 Awesome Vite 上的已有的后端集成列表。
如果你需要自定义集成，你可以按照本指南的步骤配置它：

在你的 Vite 配置中配置入口文件和启用创建 manifest：

```js
// vite.config.js
export default defineConfig({
  build: {
    // 在 outDir 中生成 .vite/manifest.json
    manifest: true,
    rollupOptions: {
      // 覆盖默认的 .html 入口
      input: "/path/to/main.js",
    },
  },
});
```

如果你没有禁用 module preload 的 polyfill，你还需在你的入口处添加此 polyfill：

```js
// 在你应用的入口起始处添加此 polyfill
import "vite/modulepreload-polyfill";
```

在开发环境中，在服务器的 HTML 模板中注入以下内容（用正在运行的本地 URL 替换 http://localhost:5173）：

```html
<!-- 如果是在开发环境中 -->
<script type="module" src="http://localhost:5173/@vite/client"></script>
<script type="module" src="http://localhost:5173/main.js"></script>
```

为了正确地提供资源，你有两种选项：

确保服务器被配置过，将会拦截代理资源请求给到 Vite 服务器
设置 server.origin 以求生成的资源链接将以服务器 URL 形式被解析而非一个相对路径

这对于图片等资源的正确加载是必需的。

如果你正使用 @vitejs/plugin-react 配合 React，你还需要在上述脚本前添加下面这个，因为插件不能修改你正在服务的 HTML（请将 http://localhost:5173 替换为 Vite 正在运行的本地 URL）：

```html
<script type="module">
  import RefreshRuntime from "http://localhost:5173/@react-refresh";
  RefreshRuntime.injectIntoGlobalHook(window);
  window.$RefreshReg$ = () => {};
  window.$RefreshSig$ = () => (type) => type;
  window.__vite_plugin_react_preamble_installed__ = true;
</script>
```

在生产环境中：在运行 vite build 之后，一个 .vite/manifest.json 文件将与静态资源文件一同生成。一个示例清单文件会像下面这样：

```json
{
  "main.js": {
    "file": "assets/main.4889e940.js",
    "src": "main.js",
    "isEntry": true,
    "dynamicImports": ["views/foo.js"],
    "css": ["assets/main.b82dbe22.css"],
    "assets": ["assets/asset.0ab0f9cd.png"]
  },
  "views/foo.js": {
    "file": "assets/foo.869aea0d.js",
    "src": "views/foo.js",
    "isDynamicEntry": true,
    "imports": ["_shared.83069a53.js"]
  },
  "_shared.83069a53.js": {
    "file": "assets/shared.83069a53.js"
  }
}
```

清单是一个 Record<name, chunk> 结构的对象。
对于 入口 或动态入口 chunk，键是相对于项目根目录的资源路径。
对于非入口 chunk，键是生成文件的名称并加上前缀 \_。
Chunk 将信息包含在其静态和动态导入上（两者都是映射到清单中相应 chunk 的键)，以及任何与之相关的 CSS 和资源文件。

你可以使用这个文件来渲染链接或者用散列文件名预加载指令（注意：这里的语法只是为了解释，实际使用时请你的服务器模板语言代替）：

```html
<!-- 如果是在生产环境中 -->
<link rel="stylesheet" href="/assets/{{ manifest['main.js'].css }}" />
<script type="module" src="/assets/{{ manifest['main.js'].file }}"></script>
```

13. 比较

13.1 WMR

Preact 团队的 WMR 提供了类似的特性集，而 Vite 2.0 对 Rollup 插件接口的支持正是受到了它的启发。

WMR 主要是为了 Preact 项目而设计，并为其提供了集成度更高的功能，比如预渲染。就使用范围而言，它更加贴合于 Preact 框架，与 Preact 本身一样强调紧凑的大小。如果你正在使用 Preact，那么 WMR 可能会提供更好的体验。

13.2 @web/dev-server

@web/dev-server（曾经是 es-dev-server）是一个伟大的项目，基于 koa 的 Vite 1.0 开发服务器就是受到了它的启发。

@web/dev-server 适用范围不是很广。它并未提供官方的框架集成，并且需要为生产构建手动设置 Rollup 配置。

总的来说，与 @web/dev-server 相比，Vite 是一个更有主见、集成度更高的工具，旨在提供开箱即用的工作流。话虽如此，但 @web 这个项目群包含了许多其他的优秀工具，也可以使 Vite 用户受益。

13.3 Snowpack

Snowpack 也是一个与 Vite 十分类似的非构建式原生 ESM 开发服务器。该项目已经不维护了。团队目前正在开发 Astro，一个由 Vite 驱动的静态站点构建工具。Astro 团队目前是我们生态中非常活跃的成员，他们帮助 Vite 进益良多。

除了不同的实现细节外，这两个项目在技术上比传统工具有很多共同优势。Vite 的依赖预构建也受到了 Snowpack v1（现在是 esinstall）的启发。若想了解 Vite 同这两个项目之间的一些主要区别，可以查看 Vite v2 比较指南。

14. 故障排除

14.1 CJS

错误：Vite CJS Node API deprecated

Vite 的 CJS Node API 构建已经被废弃，并将在 Vite 6 中移除。

在一个基础的 Vite 项目中，请确保：

vite.config.js 配置文件的内容使用 ESM 语法。
最近的 package.json 文件中有 "type": "module"，或者使用 .mjs/.mts 扩展名，例如 vite.config.mjs 或者 vite.config.mts。

对于其他项目，有几种常见的方法：

| 配置 ESM 为默认，如果需要则选择 CJS： 在项目 package.json 中添加 "type": "module"。所有 _.js 文件现在都被解释为 ESM，并且需要使用 ESM 语法。你可以将一个文件重命名为 .cjs 扩展名来继续使用 CJS。
| 保持 CJS 为默认，如果需要则选择 ESM： 如果项目 package.json 没有 "type": "module"，所有 _.js 文件都被解释为 CJS。你可以将一个文件重命名为 .mjs 扩展名来使用 ESM。
| 动态导入 Vite： 如果你需要继续使用 CJS，你可以使用 import('vite') 动态导入 Vite。这要求你的代码必须在一个 async 上下文中编写，但是由于 Vite 的 API 大多是异步的，所以应该还是可以管理的。

如果你不确定警告来自哪里，你可以通过 VITE_CJS_TRACE=true 标志运行你的脚本来记录堆栈跟踪：

```sh
VITE_CJS_TRACE=true vite dev
```

如果你想暂时忽略警告，你可以通过 VITE_CJS_IGNORE_WARNING=true 标志运行你的脚本：

```sh
VITE_CJS_IGNORE_WARNING=true vite dev
```

请注意，postcss 配置文件还不支持 ESM + TypeScript（"type": "module" 中的 .mts 或 .ts）。如果你有带 .ts 的 postcss 配置，并在 package.json 中添加了 "type": "module"，你还需要将 postcss 配置重命名为 .cts。

14.2 CLI

错误：Error: Cannot find module 'C:\foo\bar&baz\vite\bin\vite.js'

你的项目文件夹路径中可能包含了符号 &，这在 Windows 上无法与 npm 配合正常工作 (npm/cmd-shim#45)。

你可以选择以下两种修改方式：

| 切换另一种包管理工具（例如 pnpm 或 yarn）
| 从你的项目路径中移除符号 &

14.3 配置

错误：该包仅支持 ESM

当使用 require 导入一个仅支持 ESM 的包时，会出现以下错误。

| Failed to resolve "foo". This package is ESM only but it was tried to load by require.
| "foo" resolved to an ESM file. ESM file cannot be loaded by require.

ESM 格式的文件无法被 require 加载。

我们建议你通过以下方式将你的配置文件转换为 ESM 格式：

| 在邻近的 package.json 中添加 "type": "module"
| 将 vite.config.js/vite.config.ts 重命名为 vite.config.mjs/vite.config.mts

14.4 开发服务器

错误：请求始终停滞

如果你使用的是 Linux，文件描述符限制和 inotify 限制可能会导致这个问题。由于 Vite 不会打包大多数文件，浏览器可能会请求许多文件，而相应地需要许多文件描述符，因此超过了限制。

要解决这个问题：

| 使用 ulimit 增加文件描述符的限制

```shell
# 查看当前限制值
ulimit -Sn
# （暂时）更改限制值
ulimit -Sn 10000 # 你可能也需要更改硬性限制值
# 重启你的浏览器
```

| 通过 sysctl 提升下列 inotify 相关的限制

```shell
# 查看当前限制值
sysctl fs.inotify
# （暂时）更改限制值
sudo sysctl fs.inotify.max_queued_events=16384
sudo sysctl fs.inotify.max_user_instances=8192
sudo sysctl fs.inotify.max_user_watches=524288
```

如果通过以上步骤仍不起作用，可以尝试在以下文件中添加 DefaultLimitNOFILE=65536 配置。

| /etc/systemd/system.conf
| /etc/systemd/user.conf

对于 Ubuntu Linux 操作系统，你可能需要添加一行 \* - nofile 65536 到文件 /etc/security/limits.conf 之中，而不是更新 systemd 配置文件。请注意，这些配置会持久作用，但需要 重新启动。

错误：网络请求停止加载

使用自签名 SSL 证书时，Chrome 会忽略所有缓存指令并重新加载内容。而 Vite 依赖于这些缓存指令。

要解决此问题，请使用受信任的 SSL 证书。

macOS：您可以使用以下命令通过 CLI 安装受信任的证书：

```sh
security add-trusted-cert -d -r trustRoot -k ~/Library/Keychains/login.keychain-db your-cert.cer
```

错误：431 Request Header Fields Too Large

当服务器或 WebSocket 服务收到一个较大的 HTTP 头，该请求可能会被遗落并且会显示下面这样的警告。

| Server responded with status code 431. See https://vitejs.dev/guide/troubleshooting.html#_431-request-header-fields-too-large.

这是由于 Node.js 限制请求头大小，以减轻 CVE-2018-12121 的影响。

要避免这个问题，请尝试减小请求头大小。举个例子，如果 cookie 太长，请删除它。或者你可以使用 --max-http-header-size 来更改最大请求头大小。

14.5 HMR

错误：vite 检测到文件变化，但 HMR 不工作

你可能导入了一个拥有不同大小写的文件，例如，存在 src/foo.js 文件而 src/bar.js 导入了它：

```js
import "./Foo.js"; // 应该为 './foo.js'
```

错误：Vite 没有检测到文件变化

如果你正在 WSL2 中运行 Vite，Vite 无法在某些场景下监听文件变化。

错误 完全重新加载了，而不是 HMR

如果 HMR 不是由 Vite 或一个插件处理的，那么将进行完全的重新加载，因为这是唯一刷新状态的方式。

如果 HMR 被处理了，但是在循环依赖中，那么也会发生完全的重新加载，以恢复执行顺序。要解决这个问题，请尝试打破循环。你可以运行 vite --debug hmr 来记录循环依赖路径，如果文件变化触发了它。

14.6 构建

错误：构建产物因为 CORS 错误无法工作

如果导出的 HTML 文件是通过 file 协议打开的，那么其中的 script 将不会运行，且报告下列错误。

| Access to script at 'file:///foo/bar.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.
| Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at file:///foo/bar.js. (Reason: CORS request not http).

你需要通过 http 协议访问该文件。最简单的办法就是使用 npx vite preview。

14.7 优化依赖

错误：链接本地包时过期预构建依赖项

在 Vite 中通过一个哈希值来决定优化后的依赖项是否有效，这个值取决于包锁定的内容、应用于依赖项的补丁以及 Vite 配置文件中影响 node_modules 打包的选项。这意味着，当使用像 npm overrides 这样的功能覆盖依赖项时，Vite 将检测到，并在下一次服务器启动时重新打包您的依赖项。当您使用像 npm link 这样的功能时，Vite 不会使依赖项无效。如果您链接或取消链接一个依赖项，那么您需要使用 vite --force 在下一次服务器启动时强制重新预构建。我们建议使用 overrides，它们现在被每个包管理器所支持（还可以参见 pnpm overrides 和 yarn resolutions）。

14.8 性能瓶颈

如果你遇到应用程序性能瓶颈导致加载缓慢，可以在启动 Vite 开发服务器或在构建应用程序时使用内置的 Node.js 调试器来创建 CPU 性能分析文件：

```sh
vite --profile --open
# or
vite build --profile
```

Vite 开发服务器：一旦应用程序在浏览器中打开，请等待其完成加载，然后返回终端并按下 p 键（将停止 Node.js 调试器），然后按下 q 键停止开发服务器。

Node.js 调试器将在根文件夹中生成 vite-profile-0.cpuprofile 文件，前往 https://www.speedscope.app/ ，点击 BROWSE 按钮上传 CPU 性能分析文件以检查结果。

可以安装 vite-plugin-inspect 插件，它可以让你检查 Vite 插件转换时的中间态，并帮助你确定哪些插件或中间件是你应用的瓶颈。该插件可以在开发和构建模式下使用。

14.9 其他

错误：为了浏览器兼容性而模块外部化

当你在浏览器中使用一个 Node.js 模块时，Vite 会输出以下警告：

| Module "fs" has been externalized for browser compatibility. Cannot access "fs.readFile" in client code.

这是因为 Vite 不会自动 polyfill Node.js 的内建模块。

我们推荐你不要在浏览器中使用 Node.js 模块以减小包体积，尽管你可以为其手动添加 polyfill。如果该模块是被某个第三方库（这里意为某个在浏览器中使用的库）导入的，则建议向对应库提交一个 issue。

错误：出现 Syntax Error 或 Type Error

Vite 无法处理、也不支持仅可在非严格模式（sloppy mode）下运行的代码。这是因为 Vite 使用了 ESM 并且始终在 ESM 中使用 严格模式。

例如，你可能会看到以下错误。

| [ERROR] With statements cannot be used with the "esm" output format due to strict mode
| TypeError: Cannot create property 'foo' on boolean 'false'

如果这些代码是在依赖中被使用的，你应该使用 patch-package（或者 yarn patch、pnpm patch 工具）来做短期补丁处理。

错误：浏览器扩展程序

一些浏览器扩展程序（例如 ad-blockers 广告拦截器），可能会阻止 Vite 客户端向 Vite 开发服务器发送请求。在这种情况下，你可能会看到一个空白屏且没有错误日志。如果遇到这类问题，请尝试禁用扩展程序。

错误：Windows 上的跨驱动器链接

如果你的项目中存在跨驱动器链接，Vite 可能无法工作。

跨驱动器链接的一个例子是：

| 通过 subst 命令将虚拟驱动器链接到一个文件夹
| 通过 mklink 命令将符号链接/联接到另一个驱动器（例如 Yarn 全局缓存）

15. 性能

虽然 Vite 默认运行速度很快，但随着项目需求的增长，性能问题可能会悄然出现。本指南旨在帮助您识别并修复常见的性能问题，例如：

| 服务器启动慢
| 页面加载慢
| 构建慢

15.1 审核配置的 Vite 插件

Vite 的内部和官方插件已经优化，以在提供与更广泛的生态系统兼容性的同时做尽可能少的工作。例如，代码转换在开发中使用正则表达式，但在构建中进行完整解析以确保正确性。

然而，社区插件的性能是 Vite 无法控制的，这可能会影响开发者的体验。在使用额外的 Vite 插件时，有一些事情可以注意：

| 只在特定情况下，大型依赖项应动态导入，以减少 Node.js 的启动时间。重构示例：vite-plugin-react#212 和 vite-plugin-pwa#224。
| buildStart，config，和 configResolved 钩子不应运行过长的时间和进行大量的操作。这些钩子会在开发服务器启动期间等待，这会延迟可以在浏览器中访问站点的时间。
| resolveId，load，和 transform 钩子可能会导致一些文件加载速度比其他文件慢。虽然有时无法避免，但仍值得检查可能的优化区域。例如，检查 code 是否包含特定关键字，或 id 是否匹配特定扩展名，然后再进行完整的转换。

转换文件所需的时间越长，加载站点时在浏览器中的请求瀑布图就会越明显。

您可以使用 DEBUG="vite:plugin-transform" vite 或 vite-plugin-inspect 检查转换文件所需的时间。请注意，由于异步操作往往提供不准确的时间，应将这些数字视为粗略的估计，但它仍应揭示消耗很大的操作。

性能分析：可以运行 vite --profile，访问站点，并在终端中按 p + enter 来记录一个 .cpuprofile。然后可以使用像 speedscope 这样的工具来检查配置文件并识别瓶颈。也可以 分享配置文件 给 Vite 团队，帮助我们识别性能问题。

15.2 减少解析操作

当经常遇到最糟糕的情况时，解析导入路径可能是一项昂贵的操作。例如，Vite 支持通过 resolve.extensions 选项“猜测”导入路径，该选项默认为 ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']。

当您尝试使用 import './Component' 导入 ./Component.jsx 时，Vite 将运行以下步骤来解析它：

| 检查 ./Component 是否存在，不存在。
| 检查 ./Component.mjs 是否存在，不存在。
| 检查 ./Component.js 是否存在，不存在。
| 检查 ./Component.mts 是否存在，不存在。
| 检查 ./Component.ts 是否存在，不存在。
| 检查 ./Component.jsx 是否存在，存在！

如上所示，解析一个导入路径需要进行 6 次文件系统检查。您的隐式导入越多，解析路径所需的时间就越多。

因此，通常最好明确您的导入路径，例如 import './Component.jsx'。也可以缩小 resolve.extensions 的列表以减少一般的文件系统检查，但必须确保它也适用于 node_modules 中的文件。

如果你是插件作者，请确保只在需要时调用 this.resolve 以减少上述检查的次数。

TypeScript：如果你正在使用 TypeScript，启用 tsconfig.json 中的 compilerOptions 的 "moduleResolution": "bundler" 和 "allowImportingTsExtensions": true 以直接在代码中使用 .ts 和 .tsx 扩展名。

15.3 避免使用桶文件

桶文件（barrel files）是重新导出同一目录下其他文件 API 的文件。例如：

```js
// src/utils/index.js
export * from "./color.js";
export * from "./dom.js";
export * from "./slash.js";
```

当你只导入一个单独的 API，例如 import { slash } from './utils'，需要获取和转换桶文件中的所有文件，因为它们可能包含 slash API，也可能包含在初始化时运行的其他副作用。这意味着在初始页面加载时，你加载的文件比所需的要更多，导致页面加载速度变慢。

如果可能的话，你应该尽量避免使用桶文件（barrel files），直接导入单独的 API，例如 import { slash } from './utils/slash.js'。

15.4 预热常用文件

Vite 开发服务器只转换浏览器请求的文件，这使得它能够快速启动，并且只对使用的文件执行转换。如果预计某些文件将被短时间内请求，也可以预先转换。然而，如果某些文件的转换时间比其他文件长，仍然可能发生请求瀑布。例如：

给定一个导入图，左边的文件导入右边的文件：

```
main.js -> BigComponent.vue -> big-utils.js -> large-data.json
```

导入关系只有在文件转换后才能知道。如果 BigComponent.vue 需要一些时间来转换，big-utils.js 就必须等待它的轮次，依此类推。即使内置了预先转换，这也会导致内部瀑布。

Vite 允许预热你确定频繁使用的文件，例如 big-utils.js，可以使用 server.warmup 选项。这样，当请求时，big-utils.js 将准备好并被缓存，以便立即提供服务。

你可以通过运行 DEBUG="vite:transform" vite 并检查日志来找到频繁使用的文件：

```sh
vite:transform 28.72ms /@vite/client +1ms
vite:transform 62.95ms /src/components/BigComponent.vue +1ms
vite:transform 102.54ms /src/utils/big-utils.js +1ms
```

```js
export default defineConfig({
  server: {
    warmup: {
      clientFiles: [
        "./src/components/BigComponent.vue",
        "./src/utils/big-utils.js",
      ],
    },
  },
});
```

请注意，只应该预热频繁使用的文件，以免在启动时过载 Vite 开发服务器。

使用 --open 或 server.open 也可以提供性能提升，因为 Vite 将自动预热你的应用的入口起点或被提供的要打开的 URL。

15.4 使用更少或更原生化的工具链

保持 Vite 如此之快的关键在于减少源文件（JS/TS/CSS）的工作量。

精简工作的例子：

| 使用 CSS 而不是 Sass/Less/Stylus（可以由 PostCSS 处理嵌套）
| 不要使用 @vitejs/plugin-react-refresh，而是使用 React Fast Refresh 的原生支持。
| 当使用 @vitejs/plugin-react 时，避免配置 Babel 选项，这样它就会在构建期间跳过转换（只使用 esbuild）。

使用更原生化工具链的例子：

使用更原生化的工具链往往会带来更大的安装大小，因此在启动新的 Vite 项目时不是默认的。但对于较大的应用程序来说，这可能是值得的。

16. 从 v4 迁移

16.1 Node.js 支持

Vite 不再支持 Node.js 14 / 16 / 17 / 19，因为它们已经到了 EOL。现在需要 Node.js 18 / 20+。

16.2 Rollup 4

Vite 现在使用 Rollup 4，它也带来了一些重大的变化，特别是：

| 导入断言（assertions 属性）已被重命名为导入属性（attributes 属性）。
| 不再支持 Acorn 插件。
| 对于 Vite 插件，this.resolve 的 skipSelf 选项现在默认为 true。
| 对于 Vite 插件，this.parse 现在只支持 allowReturnOutsideFunction 选项。

如果你正在使用 TypeScript，请确保设置 moduleResolution: 'bundler'（或 node16/nodenext）因为 Rollup 4 需要它。或者你可以设置 skipLibCheck: true。

16.3 废弃 CJS Node API

CJS 的 Node API 已经被废弃。当调用 require('vite') 时，将会记录一个废弃警告。你应该更新你的文件或框架来导入 Vite 的 ESM 构建。

16.4 重新设计 define 和 import.meta.env.\* 的替换策略

在 Vite 4 中，define 和 import.meta.env.\* 特性在开发和构建中使用的是不同的替换策略：

| 在开发时，这两个特性分别作为全局变量注入到 globalThis 和 import.meta 中。
| 在构建时，这两个特性都使用正则表达式进行静态替换。

这导致在尝试访问这些变量时，开发和构建存在一致性问题，有时甚至导致构建失败。例如：

```js
// vite.config.js
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify("1.0.0"),
  },
});
```

```js
const data = { __APP_VERSION__ };
// 开发：{ __APP_VERSION__: "1.0.0" } ✅
// 构建：{ "1.0.0" } ❌

const docs = "I like import.meta.env.MODE";
// 开发："I like import.meta.env.MODE" ✅
// 构建："I like "production"" ❌
```

这个改动不应该影响大部分设置，因为已经在文档中说明了 define 的值应该遵循 esbuild 的语法：

| 为了与 esbuild 行为保持一致，表达式必须是一个 JSON 对象（null、boolean、number、string、array 或 object）或一个单一标识符字符串。

16.4 其他一般性变化

16.4.1 SSR 外部模块值现在符合生产环境行为

在 Vite 4 中，服务器端渲染的外部模块被包装为 .default 和 .\_\_esModule 处理，以实现更好的互操作性，但是它并不符合运行时环境（例如 Node.js）加载时的生产环境行为，导致难以捕获的不一致性。默认情况下，所有直接的项目依赖都是 SSR 外部化的。

Vite 5 现在删除了 .default 和 .\_\_esModule 处理，以匹配生产环境行为。在实践中，这不应影响正确打包的依赖项，但是如果你在加载模块时遇到新的问题，你可以尝试以下重构：

```js
// 之前：
import { foo } from "bar";

// 之后：
import _bar from "bar";
const { foo } = _bar;
```

```js
// 之前：
import foo from "bar";

// 之后：
import * as _foo from "bar";
const foo = _foo.default;
```

注意，这些更改符合 Node.js 的行为，因此也可以在 Node.js 中运行这些导入进行测试。如果你更喜欢坚持使用之前的方式，你可以将 legacy.proxySsrExternalModules 设置为 true。

16.4.2 worker.plugins 现在是一个函数

在 Vite 4 中，worker.plugins 接受一个插件数组 ((Plugin | Plugin[])[])。从 Vite 5 开始，它需要配置为一个返回插件数组的函数 (() => (Plugin | Plugin[])[])。这个改变是为了让并行的 worker 构建运行得更加一致和可预测。

16.4.3 允许路径包含 . 回退到 index.html

在 Vite 4 中，即使 appType 被设置为 'SPA'（默认），访问包含 . 的路径也不会回退到 index.html。从 Vite 5 开始，它将会回退到 index.html。

注意浏览器将不再在控制台中显示 404 错误消息，如果你将图片路径指向一个不存在的文件（例如 <img src="./file-does-not-exist.png">）。

二. 配置

1. 配置 Vite

运行 vite 时会自动解析 项目根目录 下名为 vite.config.js 的配置文件。

最基础的配置：

```js
// vite.config.js
export default {
  // 配置选项
};
```

通过 --config 命令行选项指定一个配置文件

```sh
vite --config my-config.js
```

1.1 情景配置

如果配置文件需要基于（dev/serve 或 build）命令或者不同的 模式 来决定选项：

```js
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // "serve" 开发环境，"build" 生产环境
  if (command === "serve") {
    return {
      // dev 独有配置
    };
  } else {
    // command === 'build'
    return {
      // build 独有配置
    };
  }
});
```

1.2 在配置中使用环境变量

环境变量通常可以从 process.env 获得。

注意：Vite 默认是不加载 .env 文件的，因为这些文件需要在执行完 Vite 配置后才能确定加载哪一个，举个例子，root 和 envDir 选项会影响加载行为。不过当你的确需要时，你可以使用 Vite 导出的 loadEnv 函数来加载指定的 .env 文件。

```js
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite 配置
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
```

2. 共享选项

2.1 root

类型：string，默认：process.cwd();

项目根目录（index.html 文件所在的位置）。

2.2 base

类型：string，默认：/

开发或生产环境服务的公共基础路径。

2.3 mode

类型：string，默认：'development' 开发，'production' 构建

配置后会将 serve 和 build 时的模式都覆盖掉。

2.4 define

类型：Record<string, any>

定义全局常量替换方式。

```js
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify("v1.0.0"),
    __API_URL__: "window.__backend_api_url",
  },
});
```

NOTE：对于使用 TypeScript 的开发者来说，请确保在 env.d.ts 或 vite-env.d.ts 文件中添加类型声明，以获得类型检查以及代码提示。

```ts
// vite-env.d.ts
declare const __APP_VERSION__: string;
```

2.5 plugins

类型：(Plugin | Plugin[] | Promise<Plugin | Plugin[]>)[]

需要用到的插件数组。

2.6 publicDir

类型：string | false，默认："public"

作为静态资源服务的文件夹。

2.7 cacheDir

类型：string，默认："node_modules/.vite"

存储缓存文件的目录。

2.8 resolve.alias

类型：Record<string, string> | Array<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }>

当使用文件系统路径的别名时，请始终使用绝对路径。

2.9 resolve.dedupe

类型：string[]

强制 Vite 始终将列出的依赖项解析为同一副本

2.10 resolve.conditions

类型：string[]

解决程序包中 情景导出 时的其他允许条件。

```json
{
  "exports": {
    ".": {
      "import": "./index.esm.js",
      "require": "./index.cjs.js"
    }
  }
}
```

2.11 resolve.mainFields

类型：string[]，默认：['browser', 'module', 'jsnext:main', 'jsnext']

package.json 中，在解析包的入口点时尝试的字段列表。

2.12 resolve.extensions

类型：string[]，默认：['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']

导入时想要省略的扩展名列表。

2.13 resolve.preserveSymlinks

类型：Boolean，默认：false

启用此选项会使 Vite 通过原始文件路径（即不跟随符号链接的路径）而不是真正的文件路径（即跟随符号链接后的路径）确定文件身份。

2.14 css.modules

配置 CSS modules 的行为。

2.15 css.postcss

类型：string | (postcss.ProcessOptions & { plugins?: postcss.AcceptedPlugin[] })

内联的 PostCSS 配置

2.16 css.preprocessorOptions

类型：Record<string, object>

指定传递给 CSS 预处理器的选项。

2.17 css.devSourcemap

类型：boolean，默认：false

在开发过程中是否启用 sourcemap。

2.18 css.transformer

类型：'postcss' | 'lightningcss'，默认：'postcss'

2.19 css.lightningcss

该选项用于配置 Lightning CSS。

2.20 json.namedExports

类型：boolean，默认：true

是否支持从 .json 文件中进行按名导入。

2.21 json.stringify

类型：boolean，默认：false

若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候。

2.22 esbuild

类型：ESBuildOptions | false

ESBuildOptions 继承自 esbuild 转换选项。

```js
export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
});
```

2.23 assetsInclude

类型：string | RegExp | (string | RegExp)[]

指定额外的 picomatch 模式 作为静态资源处理。

```js
export default defineConfig({
  assetsInclude: ["**/*.gltf"],
});
```

2.24 logLevel

类型：'info' | 'warn' | 'error' | 'silent'

调整控制台输出的级别，默认为 'info'。

2.25 customLogger

类型：使用自定义 logger 记录消息。

2.26 clearScreen

类型：boolean，默认：true

设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息。

2.27 envDir

类型：string，默认：root

用于加载 .env 文件的目录。

2.28 envPrefix

类型：string | string[]，默认：VITE\_

以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。

2.29 appType

类型：'spa' | 'mpa' | 'custom'，默认：'spa'

3. 服务器选择

3.1 server.host

类型：string | boolean，默认：'localhost'

指定服务器应该监听哪个 IP 地址。

3.2 server.port

类型：number，默认：5173

指定开发服务器端口。

3.3 server.strictPort

类型：boolean

设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。

3.4 server.https

类型：https.ServerOptions

启用 TLS + HTTP/2。

3.5 server.open

类型：boolean | string

开发服务器启动时，自动在浏览器中打开应用程序。

3.6 server.proxy

类型：Record<string, string | ProxyOptions>

为开发服务器配置自定义代理规则。

```js
export default defineConfig({
  server: {
    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      "/foo": "http://localhost:4567",
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      "^/fallback/.*": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
      },
      // 使用 proxy 实例
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        },
      },
      // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      "/socket.io": {
        target: "ws://localhost:5174",
        ws: true,
      },
    },
  },
});
```

3.7 server.cors

类型：boolean | CorsOptions

为开发服务器配置 CORS。

3.8 server.headers

类型：OutgoingHttpHeaders

指定服务器响应的 header。

3.9 server.hmr

类型：boolean | { protocol?: string, host?: string, port?: number, path?: string, timeout?: number, overlay?: boolean, clientPort?: number, server?: Server }

禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。

3.10 server.warmup

类型：{ clientFiles?: string[], ssrFiles?: string[] }

提前转换和缓存文件以进行预热。

```js
export default defineConfig({
  server: {
    warmup: {
      clientFiles: ["./src/components/*.vue", "./src/utils/big-utils.js"],
      ssrFiles: ["./src/server/modules/*.js"],
    },
  },
});
```

3.11 server.watch

类型：object | null

传递给 chokidar 的文件系统监听器选项。

3.12 server.middlewareMode

类型：'ssr' | 'html'，默认：false

以中间件模式创建 Vite 服务器。

3.13 server.fs.strict

类型：boolean，默认：true

限制为工作区 root 路径以外的文件的访问。

3.14 server.fs.allow

类型：string[]

限制哪些文件可以通过 /@fs/ 路径提供服务。

3.15 server.fs.deny

类型：string[]，默认：['.env', '.env.*', '*.{crt,pem}']

3.16 server.origin

类型：string

用于定义开发调试阶段生成资源的 origin。

```js
export default defineConfig({
  server: {
    origin: "http://127.0.0.1:8080",
  },
});
```

3.17 server.sourcemapIgnoreList

类型：false | (sourcePath: string, sourcemapPath: string) => boolean，默认：(sourcePath) => sourcePath.includes('node_modules')

是否忽略服务器 sourcemap 中的源文件，用于填充 x_google_ignoreList source map 扩展。

```js
export default defineConfig({
  server: {
    // 这是默认值，它将把所有路径中含有 node_modules 的文件
    // 添加到忽略列表中。
    sourcemapIgnoreList(sourcePath, sourcemapPath) {
      return sourcePath.includes('node_modules')
    }
  }
};
```

4. 构建选择

4.1 build.target

类型：string | string[]，默认：'modules'

设置最终构建的浏览器兼容目标。

4.2 build.modulePreload

类型：boolean | { polyfill?: boolean, resolveDependencies?: ResolveModulePreloadDependenciesFn }，默认值：{ polyfill: true }

默认情况下，一个 模块预加载 polyfill 会被自动注入。

4.3 build.outDir

类型：string，默认：dist

指定输出路径（相对于 项目根目录).

4.4 build.assetsDir

类型：string，默认：assets

指定生成静态资源的存放路径（相对于 build.outDir）。

4.5 build.assetsInlineLimit

类型：number，默认：4096

小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。

4.6 build.cssCodeSplit

类型：boolean，默认：true

启用/禁用 CSS 代码拆分。

4.7 build.cssTarget

类型：string | string[]，默认：与 build.target 一致

此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target，此处的 target 并非是用于 JavaScript 转写目标。

5. 预览选择
6. 依赖优化选择
7. SSR 选择
8. Worker 选择
