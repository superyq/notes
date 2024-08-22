# electron 官网速通

前言：参考[Electron 中文网](https://electron.nodejs.cn/)。

核心知识点：有哪些进程，进程之间的通信，electron API 分类及怎么调用。

一、快速开始

1. 新建一个 my-electron 的文件夹。
2. 运行 npm init 创建 package.json 文件。
3. 填写 author 和 description 字段，应用打包必须。
4. 运行 npm install --save-dev electron，安装依赖。

安装报错时，可参考[安装 electron 报错解决](https://blog.csdn.net/weixin_64684095/article/details/140882903)

5. 安装 Electron Forge 依赖，并使用其 import 命令来设置 Forge 的脚手架，用来打包应用。

```bash
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

6. 修改 package.json 的 scripts 对象

使用 nodemon 启动命令，可以动态更新 main.js 的修改，不用重复启服务。

```json
{
  "name": "electron-demo",
  "version": "1.0.0",
  "description": "this is a demo",
  "main": "main.js",
  "scripts": {
    "start": "nodemon --watch main.js --exec npm run build",
    "build": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make",
    "publish": "electron-forge publish"
  },
  "keywords": [],
  "author": "yqcoder",
  "license": "ISC",
  "devDependencies": {
    "@electron-forge/cli": "^7.4.0",
    "@electron-forge/maker-deb": "^7.4.0",
    "@electron-forge/maker-rpm": "^7.4.0",
    "@electron-forge/maker-squirrel": "^7.4.0",
    "@electron-forge/maker-zip": "^7.4.0",
    "@electron-forge/plugin-auto-unpack-natives": "^7.4.0",
    "@electron-forge/plugin-fuses": "^7.4.0",
    "@electron/fuses": "^1.8.0",
    "electron": "^31.3.1"
  },
  "dependencies": {
    "electron-squirrel-startup": "^1.0.1"
  }
}
```

7. 根目录创建 main.js 文件

```js
const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
};
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
```

8. 根目录创建 index.html 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- https://web.nodejs.cn/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>, Chromium
    <span id="chrome-version"></span>, and Electron
    <span id="electron-version"></span>.
    <script src="./renderer.js"></script>
  </body>
</html>
```

9. 根目录创建 preload.js 文件

```js
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
```

10. 运行项目

```bash
npm run start
```

<!-- 1 -->

11. 项目打包

```bash
npm run make
```

<!-- 2 -->

二、页面

BrowserWindow API 用于创建和管理应用窗口

1. 页面载入

每个窗口内容都是一个页面，页面可以是本地 HTML 或远程网址。

1.1 创建页面

在根目录中创建 index.html 网页：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
  </body>
</html>
```

1.2 实例化窗口加载页面

构建 createWindow() 函数，实例化窗口，并将网页通过 loadFile 方法加载进去。

```js
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
};
```

1.3 应用准备就绪后加载窗口

app API 控制应用的事件生命周期。

```js
app.whenReady().then(() => {
  createWindow();
});
```

2. 所有窗口关闭后退出应用（Windows 和 Linux）

```js
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
```

3. 如果没有打开窗口，则打开一个窗口 (macOS)

```js
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
```

三、进程间通信

1. 预加载脚本

通过预加载脚本，可以将主进程属性暴露给渲染进程。

创建 preload.js 预加载脚本将 process.versions 对象的选定属性公开给渲染器进程。

```js
// preload.js
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});
```

将脚本附加到渲染器进程，通过 webPreferences.preload 选项

```js
// main.js
const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});
```

在渲染进程使用，创建 renderer.js，载入到页面

```js
// renderer.js
const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
    <p id="info"></p>
  </body>
  <script src="./renderer.js"></script>
</html>
```

2. ipcMain 和 ipcRenderer

ipcRenderer.on(channel, listener)：监听 channel，当有新消息到达时，listener 将与 listener(event, args...) 一起调用。
ipcRenderer.send(channel, ...args)：通过 channel 向主进程发送异步消息以及参数。
ipcRenderer.invoke(channel, ...args)：通过 channel 向主进程发送消息并异步期待结果。
ipcMain.on(channel, listener)：监听 channel，当有新消息到达时，listener 将与 listener(event, args...) 一起调用。
ipcMain.handle(channel, listener)：添加 invokeable IPC 的处理程序。每当渲染器调用 ipcRenderer.invoke(channel, ...args) 时就会调用此处理程序。

2.1 渲染器到主进程（单向）

使用 ipcRenderer.send 与 ipcMain.on 配对完成。

在 main.js 中监听 set-title 事件

```js
// main.js
const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("set-title", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
```

预加载脚本定义渲染进程触发 set-title 事件方式

```js
// preload.js
const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => ipcRenderer.send("set-title", title),
});
```

渲染进程触发 set-title 事件

```js
// renderer.js
const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");
setButton.addEventListener("click", () => {
  const title = titleInput.value;
  window.electronAPI.setTitle(title);
});
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello World!</title>
  </head>
  <body>
    Title: <input id="title" />
    <button id="btn" type="button">Set</button>
    <script src="./renderer.js"></script>
  </body>
</html>
```

2.2 渲染器到主进程（双向）

使用 ipcRenderer.invoke 与 ipcMain.handle 配对完成。

```js
// preload.js
const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
});
```

```js
// main.js
const { app, BrowserWindow, ipcMain, dialog } = require("electron/main");
const path = require("node:path");

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0];
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  ipcMain.handle("dialog:openFile", handleFileOpen);
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
```

```js
// renderer.js
const btn = document.getElementById("btn");
const filePathElement = document.getElementById("filePath");

btn.addEventListener("click", async () => {
  const filePath = await window.electronAPI.openFile();
  filePathElement.innerText = filePath;
});
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Dialog</title>
  </head>
  <body>
    <button type="button" id="btn">Open a File</button>
    File path: <strong id="filePath"></strong>
    <script src="./renderer.js"></script>
  </body>
</html>
```

2.3 主要到渲染器

```js
// preload.js
const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateCounter: (callback) =>
    ipcRenderer.on("update-counter", (_event, value) => callback(value)),
  counterValue: (value) => ipcRenderer.send("counter-value", value),
});
```

```js
// main.js
const { app, BrowserWindow, Menu, ipcMain } = require("electron/main");
const path = require("node:path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send("update-counter", 1),
          label: "Increment",
        },
        {
          click: () => mainWindow.webContents.send("update-counter", -1),
          label: "Decrement",
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  ipcMain.on("counter-value", (_event, value) => {
    console.log(value); // will print value to Node console
  });
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
```

```js
// renderer.js
const counter = document.getElementById("counter");

window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + value;
  counter.innerText = newValue.toString();
  window.electronAPI.counterValue(newValue);
});
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Menu Counter</title>
  </head>
  <body>
    Current value: <strong id="counter">0</strong>
    <script src="./renderer.js"></script>
  </body>
</html>
```

2.4 渲染器到渲染器

没有直接的方法可以使用 ipcMain 和 ipcRenderer 在渲染器进程之间发送消息。为了实现这一目标，你有两种选择：

| 使用主进程作为渲染器之间的消息代理。这将涉及从一个渲染器向主进程发送消息，主进程会将消息转发到另一个渲染器。

| 将 MessagePort 从主进程传递到两个渲染器。这将允许在初始设置后渲染器之间进行直接通信。

四、API 文档

本章只做概览，详情参考[Electron API 文档](https://electron.nodejs.cn/docs/latest/api/app)

1. 主进程模块

1.1 app

控制应用的事件生命周期。内置事件、方法、属性。

1.2 autoUpdater

使应用能够自动更新。内置事件、方法。

1.3 BaseWindow

创建和控制窗口。内置实例事件、静态方法、实例属性、实例方法。

1.4 BrowserWindow

创建和控制浏览器窗口。内置实例事件、静态方法、实例属性、实例方法。

1.5 clipboard

在系统剪贴板上执行复制和粘贴操作。内置方法。

1.6 contentTracing

从 Chromium 收集跟踪数据以查找性能瓶颈和缓慢的操作。内置方法。

1.7 crashReporter

将崩溃报告提交到远程服务器。内置方法。

1.8 desktopCapturer

访问有关可用于使用 navigator.mediaDevices.getUserMedia API 从桌面捕获音频和视频的媒体源的信息。内置方法。

1.9 dialog

显示用于打开和保存文件、警报等的原生系统对话框。内置方法。

1.10 globalShortcut

当应用没有键盘焦点时检测键盘事件。内置方法。

1.11 inAppPurchase

Mac App Store 上的应用内购买。内置事件、方法。

1.12 ipcMain

从主进程到渲染器进程异步通信。内置方法。

1.13 Menu

创建原生应用菜单和上下文菜单。内置实例事件、静态方法、实例属性、实例方法。

1.14 MessageChannelMain

主进程中用于通道消息传递的通道接口。内置实例属性。

1.15 MessagePortMain

主进程中通道消息传递的端口接口。内置实例事件、实例方法。

1.16 nativeImage

使用 PNG 或 JPG 文件创建托盘、停靠栏和应用图标。内置方法、实例属性、实例方法。

1.17 nativeTheme

阅读并响应 Chromium 原生颜色主题的变化。内置事件、属性。

1.18 net

使用 Chromium 的原生网络库发出 HTTP/HTTPS 请求。内置方法、属性。

1.19 netLog

记录会话的网络事件。内置方法、属性。

1.20 Notification

创建操作系统桌面通知。内置实例事件、静态方法、实例属性、实例方法。

1.21 parentPort

与父进程通信的接口。内置事件、方法。

1.22 powerMonitor

监视电源状态变化。内置事件、方法、属性。

1.23 powerSaveBlocker

阻止系统进入低功耗（睡眠）模式。内置方法。

1.24 process

流程对象的扩展。内置事件、方法、属性。

1.25 protocol

注册自定义协议并拦截现有协议请求。内置方法。

1.26 pushNotifications

注册远程推送通知服务并接收来自远程推送通知服务的通知。内置事件、方法。

1.27 safeStorage

允许访问存储在本地计算机上的字符串的简单加密和解密。内置方法。

1.28 screen

检索有关屏幕尺寸、显示、光标位置等的信息。内置事件、方法。

1.29 session

管理浏览器会话、cookie、缓存、代理设置等。内置方法、属性、实例事件、实例属性、实例方法。

1.30 ShareMenu

在 macOS 上创建共享菜单。内置实例方法。

1.31 shell

使用默认应用管理文件和 URL。内置方法。

1.32 systemPreferences

获取系统偏好设置。内置事件、方法、属性。

1.33 TouchBar

为原生 macOS 应用创建 TouchBar 布局。内置静态属性、实例属性。

1.34 Tray

将图标和上下文菜单添加到系统的通知区域。内置实例事件、实例方法。

1.35 utilityProcess

utilityProcess 创建一个启用 Node.js 和消息端口的子进程。内置方法、实例事件、实例属性、实例方法。

1.36 webContents

渲染和控制网页。内置方法、实例事件、实例属性、实例方法。

1.37 WebContentsView

显示 WebContents 的视图。内置实例属性。

1.38 webFrameMain

控制网页和 iframe。内置实例事件、实例属性、实例方法。

1.39 View

创建和布局原生视图。内置实例事件、实例属性、实例方法。

2. 渲染器处理模块

2.1 clipboard

在系统剪贴板上执行复制和粘贴操作。内置方法。

2.2 contextBridge

在隔离的上下文之间创建安全、双向、同步的桥梁。内置方法。

2.3 crashReporter

同主进程属性一致

2.4 ipcRenderer

从渲染器进程到主进程异步通信。内置方法。

2.5 nativeImage

同主进程属性一致

2.6 webFrame

自定义当前网页的渲染。内置方法、属性。

2.7 webUtils

与 Web API 对象（文件、Blob 等）交互的实用程序层。内置方法。

3. 类

3.1 ClientRequest

发出 HTTP/HTTPS 请求。

3.2 CommandLine

操作 Chromium 读取的应用的命令行参数

3.3 Cookies

查询和修改会话的 cookie。

3.4 调试器

Chrome 远程调试协议的替代传输。

3.5 Dock

在 macOS Dock 中控制你的应用

3.6 DownloadItem

控制从远程源下载文件。

3.7 IncomingMessage

处理对 HTTP/HTTPS 请求的响应。

3.8 MenuItem

将项目添加到原生应用菜单和上下文菜单。

3.9 NavigationHistory

管理导航条目列表，代表用户在应用内的浏览历史记录。

3.10 ServiceWorkers

查询并接收来自会话活动服务工作者的事件。

3.11 触摸栏按钮

在触摸栏中为原生 macOS 应用创建一个按钮

3.12 TouchBar 颜色选择器

在触摸栏中为原生 macOS 应用创建颜色选择器

3.13 TouchBar 组

在触摸栏中为原生 macOS 应用创建一个组

3.14 TouchBar 标签

在触摸栏中为原生 macOS 应用创建标签

3.15 TouchBarOtherItemsProxy

实例化一个特殊的 "其他条目代理"，它将继承自 Chromium 的 TouchBar 元素嵌套在代理指示的空间处。

3.16 触摸栏弹出框

在触摸栏中为原生 macOS 应用创建弹出窗口

3.17 触控栏清理器

创建一个洗涤器（可滚动选择器）

3.18 TouchBar 分段控件

创建分段控件（按钮组），其中一个按钮具有选定状态

3.19 TouchBar 滑块

在触摸栏中为原生 macOS 应用创建滑块

3.20 TouchBar 垫片

在原生 macOS 应用的触摸栏中的两个项目之间创建间隔

3.21 WebRequest

在请求生命周期的各个阶段拦截并修改请求的内容。
