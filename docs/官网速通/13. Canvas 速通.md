# Canvas 速通

前言：参考 [Canvas API 文档](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

一、快速开始

1. 创建 canvas 标签

canvas 的宽高，只能由 html 属性设置，如果使用 css 会导致 canvas 变形

```html
<canvas id="myCanvas" width="400" height="300"></canvas>
```

2. 设置画笔

获取 canvas 元素，拿到绘制上下文，也可以叫画笔

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```

3. 画一个正方形

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #myCanvas {
        border: 1px solid;
      }
    </style>
  </head>
  <body>
    <canvas id="myCanvas" width="400" height="300"></canvas>
    <script>
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.strokeRect(10, 10, 100, 100);
    </script>
  </body>
</html>
```

<!-- 1 -->

二、Canvas 绘制原理

Canvas 的绘制原理基于像素操作和图形上下文。

当你获取 Canvas 的绘图上下文（通常使用 `getContext('2d')` ）后，就可以通过这个上下文对象提供的方法和属性来进行各种图形的绘制。

其基本原理包括以下几个方面：

1. 坐标系统

Canvas 有自己的默认坐标系统，原点 (0, 0) 位于左上角，x 轴向右增长，y 轴向下增长。你可以通过变换操作（如平移、旋转、缩放）来改变这个坐标系统。

2. 图形绘制

利用各种绘图方法，如 rect() 绘制矩形、 arc() 绘制弧形、 lineTo() 绘制线条等。这些方法通过指定坐标和相关参数来确定图形的形状和位置。

3. 颜色和样式设置

可以设置线条颜色 strokeStyle、填充颜色 fillStyle 、线条宽度 lineWidth 等，以控制绘制图形的外观。

4. 路径操作

通过 beginPath() 开始一个新路径，使用 moveTo() 、 lineTo() 等方法构建路径，然后使用 stroke() 绘制路径边框或 fill() 填充路径内部。

5. 状态保存和恢复

可以使用 save() 保存当前绘图状态，包括坐标变换、颜色设置等，然后进行一些操作后，再使用 restore() 恢复之前保存的状态。

三、Canvas API

1. 属性

1.1 canvas

获取 canvas 元素，可以通过这个属性拿到 canvas 的宽高

```js
ctx.canvas.width;
```

1.2 direction

用来在绘制文本时，描述当前文本方向。

值：ltr 左到右、rtl 右到左、inherit 集成 canvas 或 document

```js
ctx.direction = "rtl";
```

1.3 fillStyle

指定用于形状内部的颜色、渐变或图案。默认样式为 #000（黑色）。

值：color、CanvasGradient 对象（线性或径向渐变）、CanvasPattern 对象（重复的图像）

```js
ctx.fillStyle = "blue";
```

1.4 filter

用来提供模糊、灰度等滤镜效果。

值：url() SVG 滤镜、blur() 模糊、brightness() 线性乘数、contrast() 对比度、drop-shadow() 阴影效果、grayscale() 灰度、hue-rotate() 色相旋转、invert() 反转绘图、opacity() 透明度、saturate() 饱和度、sepia() 深褐色、none 不应用滤镜

```js
ctx.filter = "blur(4px)";
```

1.5 font

绘制文字所使用的当前字体样式

值：默认字体为 10 像素的无衬线体（sans-serif）

```js
ctx.font = "bold 48px serif";
```

1.6 fontKerning

指定如何使用字体字距调整

值：auto 浏览器、normal 字体中、none 禁止

```js
ctx.fontKerning = "normal";
```

1.7 fontStretch

绘制文本时字体如何被扩展或压缩

值：ultra-condensed、extra-condensed、condensed、semi-condensed、normal（默认）、semi-expanded、expanded、extra-expanded、ultra-expanded

```js
ctx.fontStretch = "ultra-condensed";
```

1.8 fontVariantCaps

指定渲染文本的替代大写形式

值：normal 默认、small-caps 启用小型大写字母的显示...等

```js
ctx.fontVariantCaps = "small-caps";
```

1.9 globalAlpha

指定将被绘制到 canvas 上的形状或图像的 alpha（透明度）值。

值： 0.0（完全透明）到 1.0（完全不透明）

```js
ctx.globalAlpha = 0.5;
```

1.10 globalCompositeOperation

设置要在绘制新形状时应用的合成操作的类型。

值：source-over...等

```js
ctx.globalCompositeOperation = "xor";
```

1.11 imageSmoothingEnabled

设置是否对缩放后的图片进行平滑处理

值：true 表示进行平滑处理（默认值），false 表示不进行

```js
ctx.imageSmoothingEnabled = true;
```

1.12 imageSmoothingQuality

设置图像平滑度

值：low 低质量、medium 中质量、high 高质量

```js
ctx.imageSmoothingQuality = "low";
```

1.13 letterSpacing

指定绘制文本时字母之间的间距。

```js
ctx.letterSpacing = "20px";
```

1.14 lineCap

指定如何绘制每一条线段的末端

值：butt 正方形、round 圆形、square 方形

```js
ctx.lineCap = "round";
```

1.15 lineDashOffset

设置虚线偏移量或者称为“相位”

```js
ctx.lineDashOffset = 4;
```

1.16 lineJoin

设置 2 个线段如何连接在一起

值：round 圆、bevel 三角 和 miter 菱。默认值是 "miter"

```js
ctx.lineJoin = "round";
```

1.17 lineWidth

设置线宽

```js
ctx.lineWidth = 15;
```

1.18 miterLimit

设置斜接限制比例

1.19 shadowBlur

描述模糊效果程度

```js
ctx.shadowBlur = 15;
```

1.20 shadowColor

描述阴影颜色

```js
ctx.shadowColor = "red";
```

1.21 shadowOffsetX

描述阴影水平偏移距离

```js
ctx.shadowOffsetX = 25;
```

1.22 shadowOffsetY

描述阴影垂直偏移距离

```js
ctx.shadowOffsetY = 25;
```

1.23 strokeStyle

用于形状描边（轮廓）的颜色、渐变或图案。默认值是 #000（黑色）。

值：color、CanvasGradient 对象（线性或径向渐变）、CanvasPattern 对象（重复的图像）

```js
ctx.strokeStyle = "blue";
```

1.24 textAlign

描述绘制文本时文本的对齐方式

值：left 左对齐、right 右对齐、center 居中、start 界线开始、end 界线结束

```js
ctx.textAlign = "left";
```

1.25 textBaseline

描述绘制文本时使用的文本基线

值：top 顶部、hanging 悬挂基线、middle 中间、alphabetic 字母基线、ideographic 字基线、bottom 底部。

```js
ctx.textBaseline = "top";
```

1.26 textRendering

在渲染文本时向渲染引擎提供应该如何优化的相关信息。

值：auto 自动、optimizeSpeed 优先渲染速度、optimizeLegibility 有限易读性、geometricPrecision 优先精确

```js
ctx.textRendering = "optimizeSpeed";
```

1.27 wordSpacing

指定绘制文本时单词之间的间距。

```js
ctx.wordSpacing = "10px";
```

2. 方法

2.1 arc()

将一个圆弧添加到当前子路径中。

arc(x, y, radius, startAngle, endAngle, counterclockwise)

arc() 方法创建一个以坐标 (x, y) 为中心，以 radius 为半径的圆弧。路径从 startAngle 开始，到 endAngle 结束，路径方向由 counterclockwise 参数决定（默认为顺时针方向）。

```js
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
```

2.2 arcTo()

通过给定的控制点和半径向当前子路径添加一个圆弧。

arcTo(x1, y1, x2, y2, radius)

```js
ctx.arc(50, 20, 5, 0, 2 * Math.PI);
```

2.3 beginPath()

通过清空子路径列表开始一个新路径

```js
ctx.beginPath();
```

2.4 bezierCurveTo()

用于将三次贝赛尔曲线添加到当前子路径中。

bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)

```js
// 定义点的坐标 {x, y}
let start = { x: 50, y: 20 };
let cp1 = { x: 230, y: 30 };
let cp2 = { x: 150, y: 80 };
let end = { x: 250, y: 100 };

ctx.beginPath();
ctx.moveTo(start.x, start.y);
ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
ctx.stroke();
```

2.5 clearRect()

用于通过把像素设置为透明黑色以达到擦除一个矩形区域的目的。

clearRect(x, y, width, height)

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

2.6 clip()

用于将当前或给定路径转换为当前裁剪区域。

```js
ctx.arc(100, 75, 50, 0, Math.PI * 2);
ctx.clip();
```

2.7 closePath()

用于从当前点添加一条直线到当前子路径的起点。

```js
ctx.closePath();
```

2.8 createConicGradient()

围绕指定坐标点创建渐变

createConicGradient(startAngle, x, y)

```js
const gradient = ctx.createConicGradient(0, 100, 100);
gradient.addColorStop(0, "red");
gradient.addColorStop(0.25, "orange");
gradient.addColorStop(0.5, "yellow");
gradient.addColorStop(0.75, "green");
gradient.addColorStop(1, "blue");
ctx.fillStyle = gradient;
ctx.fillRect(20, 20, 200, 200);
```

2.9 createImageData()

用于创建一个新的、空白的、指定大小的 ImageData 对象

createImageData(width, height)
createImageData(width, height, settings)
createImageData(imagedata)

```js
const imageData = ctx.createImageData(100, 50);
```

2.10 createLinearGradient()

根据两个给定的坐标值所构成的线段创建渐变。

createLinearGradient(x0, y0, x1, y1)

```js
const gradient = ctx.createLinearGradient(20, 0, 220, 0);

// 添加三个色标
gradient.addColorStop(0, "green");
gradient.addColorStop(0.5, "cyan");
gradient.addColorStop(1, "green");

// 设置填充样式并绘制矩形
ctx.fillStyle = gradient;
ctx.fillRect(20, 20, 200, 100);
```

2.11 createPattern()

用于使用指定的图像或重复创建图案。

createPattern(image, repetition)

```js
const img = new Image();
img.src = "canvas_createpattern.png";
img.onload = () => {
  const pattern = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 300, 300);
};
```

2.12 createRadialGradient()

使用两个圆的坐标和大小绘制径向渐变。

createRadialGradient(x0, y0, r0, x1, y1, r1)

```js
// 创建一个径向渐变
// 内圆位于 x=110、y=90，半径为 30
// 外圆位于 x=100,、y=100，半径为 70
const gradient = ctx.createRadialGradient(110, 90, 30, 100, 100, 70);

// 添加三个色标
gradient.addColorStop(0, "pink");
gradient.addColorStop(0.9, "white");
gradient.addColorStop(1, "green");

// 设置填充样式并绘制矩形
ctx.fillStyle = gradient;
ctx.fillRect(20, 20, 160, 160);
```

2.13 drawFocusIfNeeded()

用于当指定的元素处于焦点状态时在当前或指定路径周围绘制焦点环。

drawFocusIfNeeded(element)
drawFocusIfNeeded(path, element)

```js
ctx.drawFocusIfNeeded(el);
```

2.14 drawImage()

提供了多种在画布（Canvas）上绘制图像的方式。

drawImage(image, dx, dy)
drawImage(image, dx, dy, dWidth, dHeight)
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

```js
const image = document.getElementById("source");

image.addEventListener("load", (e) => {
  ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
});
```

2.15 ellipse()

用于向当前子路径添加椭圆弧

ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise)

```js
ctx.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
```

2.16 fill()

用于根据当前的 fillStyle，填充当前或给定的路径。

```js
ctx.rect(10, 10, 150, 100);
ctx.fill();
```

2.17 fillRect()

用于绘制一个矩形，并根据当前的 fillStyle 进行填充。

fillRect(x, y, width, height)

```js
ctx.fillStyle = "green";
ctx.fillRect(20, 10, 150, 100);
```

2.18 fillText()

用于在指定的坐标上绘制文本字符串，并使用当前的 fillStyle 对其进行填充。

fillText(text, x, y[, maxWidth])

```js
ctx.font = "50px serif";
ctx.fillText("Hello world", 50, 90);
```

2.19 getContextAttributes()

返回一个包含上下文使用的属性的对象。

```js
let ctx = canvas.getContext("2d", { alpha: false });`
```

2.20 getImageData()

返回一个 ImageData 对象，用于描述 canvas 指定区域的隐含像素数据。

getImageData(sx, sy, sw, sh[, settings])

```js
const image = new Image();
image.src = "plumeria.jpg";
image.addEventListener("load", () => {
  ctx.drawImage(image, 0, 0, 233, 320);

  const imageData = ctx.getImageData(10, 20, 80, 230);
  ctx.putImageData(imageData, 260, 0);
  ctx.putImageData(imageData, 380, 50);
  ctx.putImageData(imageData, 500, 100);
});
```

2.21 getLineDash()

用于获取当前的虚线样式。

```js
ctx.setLineDash([10, 20]);
console.log(ctx.getLineDash()); // [10, 20]
```

2.22 getTransform()

用于获取当前被应用到上下文的变换矩阵。

```js
let storedTransform = ctx1.getTransform();
console.log(storedTransform);
```

2.23 isContextLost()

用于检查渲染上下文是否丢失（且尚未重置）。

```js
const ctx = canvas.getContext("2d");

if (ctx.isContextLost()) {
  console.log("上下文已丢失");
}
```

2.24 isPointInPath()

用于判断当前路径中是否包含指定点。

isPointInPath([path,] x, y[, fillRule])

```js
ctx.isPointInPath(30, 70) ? "是" : "否";
```

2.25 isPointInStroke()

用于检测某点是否在路径的描边所在的区域内。

isPointInStroke([path,] x, y)

```js
ctx.isPointInStroke(50, 10) ? "是" : "否";
```

2.26 lineTo()

将当前子路径的最后一个点与指定的 (x, y) 坐标用直线段相连，从而将一个直线段添加到当前子路径中。

lineTo(x, y)

```js
ctx.beginPath(); // 开始一个新路径
ctx.moveTo(30, 50); // 将笔移动到 (30, 50) 处
ctx.lineTo(150, 100); // 画一条线到 (150, 100) 处
ctx.stroke(); // 渲染路径
```

2.27 measureText()

返回一个包含被测量文本相关信息（例如它的宽度）的 TextMetrics 对象。

measureText(text)

```js
let text = ctx.measureText("Hello world");
console.log(text.width); // 56;
```

2.28 moveTo()

用于在给定的 (x，y) 坐标处开始一个新的子路径。

moveTo(x, y)

```js
ctx.beginPath();
ctx.moveTo(50, 50); // 开始第一条子路径
ctx.lineTo(200, 50);
ctx.moveTo(50, 90); // 开始第二条子路径
ctx.lineTo(280, 120);
ctx.stroke();
```

2.29 putImageData()

用于将数据从已有的 ImageData 对象绘制到画布上。

putImageData(imageData, dx, dy[, dirtyX, dirtyY, dirtyWidth, dirtyHeight])

```js
const imagedata = ctx.getImageData(0, 0, 100, 100);
// 使用 putImageData 函数来展示 putImageData 的工作原理
ctx.putImageData(imagedata, 150, 0);
```

2.30 quadraticCurveTo()

用于新增二次贝塞尔曲线路径。

quadraticCurveTo(cpx, cpy, x, y)

```js
// 二次贝塞尔曲线
ctx.beginPath();
ctx.moveTo(50, 20);
ctx.quadraticCurveTo(230, 30, 50, 100);
ctx.stroke();
```

2.31 rect()

将一个矩形添加到当前路径中

rect(x, y, width, height)

```js
ctx.rect(10, 20, 150, 100);
```

2.32 reset()

用于将渲染上下文重置为其默认状态，使其可以被重新使用以绘制其他内容，而无需显式地重置所有属性。

```js
ctx.reset(); // 清除上下文！
```

2.33 resetTransform()

用于使用单位矩阵重新设置当前变换。

```js
// 绘制一个旋转 45 度的矩形
ctx.rotate((45 * Math.PI) / 180);
ctx.fillRect(60, 0, 100, 30);

// 将变换矩阵重置为单位矩阵
ctx.resetTransform();
```

2.34 restore()

用于通过在绘制状态栈中弹出顶部的条目，将 canvas 恢复到最近的保存状态。

```js
// 保存当前状态
ctx.save();

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

// 恢复到最近一次调用 save() 保存的状态
ctx.restore();

ctx.fillRect(150, 40, 100, 100);
```

2.35 rotate()

用于在变换矩阵中增加旋转。

rotate(angle)

```js
ctx.rotate((45 * Math.PI) / 180);
```

2.36 roundRect()

用于在当前路径中添加一个圆角矩形。

roundRect(x, y, width, height, radii)

```js
ctx.roundRect(10, 20, 150, 100, 0);
```

2.37 save()

用于通过将当前状态放入栈中，以保存 canvas 的完整状态。

```js
// 保存当前状态
ctx.save();

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

// 恢复到最近一次调用 save() 时保存的状态
ctx.restore();

ctx.fillRect(150, 40, 100, 100);
```

2.38 scale()

用于根据水平和垂直方向，为 canvas 单位添加缩放变换。

scale(x, y)

```js
ctx.scale(9, 3);
```

2.39 setLineDash()

用于在描线时使用虚线模式。

setLineDash(segments)

```js
ctx.setLineDash([5, 15]);
```

2.40 setTransform()

用于使用单位矩阵重新设置（覆盖）当前的变换并调用变换，此变换由方法的变量进行描述。

setTransform(a, b, c, d, e, f)

```js
ctx.setTransform(1, 0.2, 0.8, 1, 0, 0);
ctx.fillRect(0, 0, 100, 100);
```

2.41 stroke()

用于根据当前的描边样式，绘制当前或指定的路径。

```js
ctx.stroke();
```

2.42 strokeRect()

根据当前的 strokeStyle 和其它设置描绘一个矩形的描边（轮廓）。

strokeRect(x, y, width, height)

```js
ctx.strokeStyle = "green";
ctx.strokeRect(20, 10, 160, 100);
```

2.43 strokeText()

用于在指定的坐标处对文本字符串的字符进行描边（即绘制轮廓）。

strokeText(text, x, y[, maxWidth])

```js
ctx.font = "50px serif";
ctx.strokeText("Hello world", 50, 90);
```

2.44 transform()

用于将由该方法的参数所描述的矩阵与当前的变换相乘。

transform(a, b, c, d, e, f)

```js
ctx.transform(1, 0.2, 0.8, 1, 0, 0);
ctx.fillRect(0, 0, 100, 100);
```

2.45 translate()

用于对当前网格添加平移变换。

translate(x, y)

```js
ctx.translate(110, 30);
```
