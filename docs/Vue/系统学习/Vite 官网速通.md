# Vite 官网文档速通

前言：参考 [Vite 官网](https://cn.vitejs.dev/)

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

8. 部署静态站点

默认打包文件 dist，可通过 build.outDir 修改。vite preview 只作预览本地构建，不应作为生产服务器。Vite 构建的项目已经配置好了 npm scripts：

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

8.1 构建应用

运行 npm run build 打包，默认打包到 dist 文件夹，可以将 dist 文件夹部署到你喜欢的平台。构建完成后通过 npm run preview 在本地启动一个静态 wbe 服务器，将 dist 文件夹运行在 http://localhost:4173，这样可以在本地查看构建产物是否正常运行。可以通过 --port 配置端口。

```sh
# 打包
npm run build

# 预览
npm run preview
# or
npm run preview --port 8080
```

8.2 GitHub Pages

在 vite.config.js 中配置 base，设置部署根目录。比如部署到 https://<USERNAME>.github.io/，base 设置为'/'，如果部署到 https://<USERNAME>.github.io/<REPO>/，base 设置为'/<REPO>/'。

```html
<!-- base: 'admin' -->
<script
  type="module"
  crossorigin
  src="/admin/assets/index-qcvr7oK4.js"
></script>
<link rel="stylesheet" crossorigin href="/admin/assets/index-ICKpZ_al.css" />

<!-- base: '/' -->
<script type="module" crossorigin src="/assets/index-qcvr7oK4.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-ICKpZ_al.css" />
```

9. 环境变量与模式

9.1 内置环境变量

```js
import = {
  meta: {
    env: {
      // 运行模式
      MODE: 'development',
      // 部署的基本 URL
      BASE_URL: '/',
      // 是否运行在生产环境
      PROD: false,
      // 是否运行在开发环境
      DEV: true,
      // 是否运行在 server 上
      SSR: false
    }
  }
}
```

9.2 .env 文件

Vite 使用 dotenv 加载额外的环境变量，指定模式的优先级(.env.development)高于通用模式(.env)，并通过 import.meta.env 暴露给客户端，变量命名必须以 VITE\_为前缀才会被暴露出去，

```sh
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

随着环境变量越来越多，我们希望 TS 可以给出智能提示，可以通过在 src 下创建 env.d.ts，然后定义如下代码实现：

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

9.3 在 HTML 中使用

任何命名的环境变量可以在 HTML 中使用，用法 %ENV_NAME%：

```html
<h1>Vite is running in %MODE%</h1>
<p>Using data from %VITE_API_URL%</p>
```

9.4 模式

vite 加载 .env.development 的环境变量，vite build 加载的 .env.prodution 的环境变量，可以通过 --mode 替换加载的环境变量，比如在 staging(预发布)模式下构建应用加载 .env.staing 的环境变量：

```sh
vite build --mode staging
```

10. 性能优化

10.1 减少解析操作

Vite 支持通过 resolve.extensions 选项“猜测”导入路径，该选项默认为 ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']。当使用 import './Component' 导入 ./Component.jsx 时，Vite 将运行以下步骤来解析它：

| 检查 ./Component 是否存在，不存在。
| 检查 ./Component.mjs 是否存在，不存在。
| 检查 ./Component.js 是否存在，不存在。
| 检查 ./Component.mts 是否存在，不存在。
| 检查 ./Component.ts 是否存在，不存在。
| 检查 ./Component.jsx 是否存在，存在！

如上，导入一个文件需要进行 6 次文件系统检查。隐式导入越多，解析所需的时间就越多。所以明确导入路径，例如：import './Component.jsx' 可以减速解析时间。

10.2 避免使用桶文件

桶文件（barrel files）是重新导出同一目录下其他文件 API 的文件。例如：

```js
// src/utils/index.js
export * from "./color.js";
export * from "./dom.js";
export * from "./slash.js";
```

导入一个单独的 API，import { slash } from './utils'，需要获取和转换桶文件中的所有文件。这意味着在初始页面加载时，加载的文件比所需的要更多，导致页面加载速度变慢。所以应避免使用桶文件（barrel files），直接导入单独 API：import { slash } from './utils/slash.js'

二. 配置

1. 配置 Vite

运行 vite 时会自动解析项目根目录下名为 vite.config.js 的配置文件。可以通过 --config 命令行选项指定一个配置文件

```sh
vite --config my-config.js
```

1.1 情景配置

如果配置文件需要基于（dev/serve 或 build）命令或者不同的 模式 来决定选项：

```js
// 开发参数：{ development, serve, false, false }
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

Vite 默认是不加载环境变量，可以通过 loadEnv 函数来加载指定的 .env 文件。

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

打包入口 index.html 文件位置。默认在上项目根目录（index.html 文件所在的位置）。

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

解决程序包中 情景导出时的其他允许条件。

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

指定服务器应该监听哪个 IP 地址。如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。也可以通过 --host 0.0.0.0 或 --host 来设置。

3.2 server.port

类型：number，默认：5173

指定开发服务器端口。

3.3 server.strictPort

类型：boolean

设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。

3.4 server.https

类型：https.ServerOptions

启用 TLS + HTTP/2。当 server.proxy 选项也被使用时，将会仅使用 TLS。

3.5 server.open

类型：boolean | string

开发服务器启动时，自动在浏览器中打开应用程序。

3.6 server.proxy

类型：Record<string, string | ProxyOptions>

为开发服务器配置自定义代理规则。changeOrigin：true 时浏览器会将请求设置为 targte 的值。

```js
export default defineConfig({
  server: {
    proxy: {
      // 字符串写法：http://localhost:5173/foo -> http://localhost:4567/foo
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

此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target。

4.8 build.cssMinify

类型：string | string[]，默认：与 build.target 一致

允许用户覆盖 CSS 最小化压缩的配置

4.9 build.sourcemap

类型：boolean | 'inline' | 'hidden'，默认：false

构建后是否生成 source map 文件。

4.10 build.rollupOptions

类型：RollupOptions

自定义底层的 Rollup 打包配置。

4.11 build.commonjsOptions

类型：RollupCommonJSOptions

传递给 @rollup/plugin-commonjs 插件的选项。

4.12 build.dynamicImportVarsOptions

类型：RollupDynamicImportVarsOptions

传递给 @rollup/plugin-dynamic-import-vars 的选项。

4.13 build.lib

类型：{ entry: string | string[] | { [entryAlias: string]: string }, name?: string, formats?: ('es' | 'cjs' | 'umd' | 'iife')[], fileName?: string | ((format: ModuleFormat, entryName: string) => string) }

构建为库。

4.14 build.manifest

类型：boolean | string，默认：false

可以为一些服务器框架渲染时提供正确的资源引入链接。

4.15 build.ssrManifest

类型：boolean | string，默认值： false

为 true 时，构建也将生成 SSR 的 manifest 文件。

4.16 build.ssr

类型：boolean | string，默认值： false

生成面向 SSR 的构建。

4.17 build.ssrEmitAssets

类型：boolean，默认：false

4.18 build.minify

类型：boolean | 'terser' | 'esbuild'，默认：'esbuild'

用来指定使用哪种混淆器。

4.19 build.terserOptions

类型：TerserOptions

指定最大的工作线程数。

4.20 build.write

类型：boolean，默认：true

设置为 false 来禁用将构建后的文件写入磁盘。

4.21 build.emptyOutDir

类型：boolean，默认：若 outDir 在 root 目录下，则为 true

构建时清空该目录。

4.22 build.copyPublicDir

类型：boolean，默认：true

默认情况下，Vite 会在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中。可以通过设置该选项为 false 来禁用该行为。

4.23 build.reportCompressedSize

类型：boolean，默认：true

启用/禁用 gzip 压缩大小报告。

4.23 build.chunkSizeWarningLimit

类型：number，默认：500

规定触发警告的 chunk 大小（以 kB 为单位）。

4.24 build.watch

类型：WatcherOptions| null，默认：null

设置为 {} 则会启用 rollup 的监听器。

5. 预览选择

5.1 preview.host

类型：string | boolean，默认：server.host

为开发服务器指定 ip 地址。

5.2 preview.port

类型：number，默认：4173

指定开发服务器端口。

5.3 preview.strictPort

类型：boolean，默认：server.strictPort

设置为 true 时，如果端口已被使用，则直接退出

5.4 preview.https

类型：boolean | https.ServerOptions，默认：server.https

启用 TLS + HTTP/2。

5.5 preview.open

类型：boolean | string，默认：server.open

开发服务器启动时，自动在浏览器中打开应用程序。

5.6 preview.proxy

类型：Record<string, string | ProxyOptions>，默认：server.proxy

配置自定义代理规则。

5.7 preview.cors

类型：boolean | CorsOptions，默认：server.cors

配置 CORS。

5.8 preview.headers

类型：OutgoingHttpHeaders

指明服务器返回的响应头。

6. 依赖优化选择

6.1 optimizeDeps.entries

类型： string | string[]

默认情况下，Vite 会抓取你的 index.html 来检测需要预构建的依赖项。

6.2 optimizeDeps.exclude

类型： string[]

在预构建中强制排除的依赖项。

6.3 optimizeDeps.include

类型： string[]

默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。

6.4 optimizeDeps.esbuildOptions

类型： EsbuildBuildOptions

在依赖扫描和优化过程中传递给 esbuild 的选项。

6.5 optimizeDeps.force

类型： boolean

设置为 true 可以强制依赖预构建。

6.6 optimizeDeps.disabled

类型： boolean | 'build' | 'dev'，默认： 'build'

禁用依赖优化，值为 true 将在构建和开发期间均禁用优化器。

6.7 optimizeDeps.needsInterop

类型: string[]

当导入这些依赖项时，会强制 ESM 转换。
