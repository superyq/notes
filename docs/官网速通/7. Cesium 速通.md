# cesium 在速通

前言：cesium 是基于 WebGL 的 js 库，API 可以参考[cesium 官网](http://cesium.xin/cesium/cn/Documentation1.62/index.html)，本文主要是讲 cesium 在 vue3 中的使用。创建 Vue3 + Vite 项目的流程就不做演示了，直接开搞。

1. 注册 cesium

要使用 cesium API 就需要 cesium Token，[点击注册](https://cesium.com/)，可以使用谷歌或者 github 的账号注册。注册后到 Access Tokens 目录下，复制 token 备用。

<!-- 1 -->

<!-- 2 -->

2. 安装

安装 cesium@1.99 版本的依赖，因为最新版本的 cesium ，可能文档没更新， API 对不上。

```bash
npm install cesium@1.99 vite-plugin-cesium
# or
pnpm add cesium@1.99 vite-plugin-cesium
# or
yarn add cesium@1.99 vite-plugin-cesium
```

3. 引入

在 vite.config.js 中引入 cesium

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()],
});
```

4. 使用

4.1 基础小地球

编写 App.vue 默认是谷歌的影像图层。

```html
<script setup>
  import { onMounted } from "vue";
  import * as Cesium from "cesium";

  let token = "your token";

  onMounted(() => {
    Cesium.Ion.defaultAccessToken = token;
    new Cesium.Viewer("contain");
  });
</script>

<template>
  <div id="contain"></div>
</template>

<style>
  body {
    margin: 0;
    padding: 0;
  }
  #contain {
    width: 100vw;
    height: 100vh;
  }
</style>
```

<!-- 3 -->

4.2 自定义影像图层

自定义 ArcGIS 影像图层

```js
onMounted(() => {
  const esri = new Cesium.ArcGisMapServerImageryProvider({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer", // 图层地址
    enablePickFeatures: false, // 无需与服务器通信
  });

  const viewer = new Cesium.Viewer("contain", {
    imageryProvider: esri, // 替换默认影像图层
    infoBox: false, // 右侧信息框
    selectionIndicator: false, // 选中状态隐藏
  });
});
```

<!-- 4 -->

4.3 地形图层

默认地图是平面的，没有地形图层。可以通过如下配置打开地图和水面特效。但是一般没必要可以不开，因为会损耗我们电脑 GPU，就像打游戏特效开满一样。

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {
    // 地形特效
    terrainProvider: Cesium.createWorldTerrain({
      requestWaterMask: true, // 水面特效
    }),
  });
});
```

<!-- 5 -->

4.4 控件

隐藏界面的控件，使界面看着干净整洁，因为我们交付给客户的时候，也不会让客户看到这些控件。

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {
    timeline: false, // 时间轴控件
    animation: false, // 动画控件
    geocoder: false, // 搜索按钮
    homeButton: false, // 主页按钮
    sceneModePicker: false, // 投影方式按钮
    baseLayerPicker: false, // 图层选择按钮
    navigationHelpButton: false, // 帮助手势按钮
    fullscreenButton: false, // 全屏按钮
  });
});
```

<!-- 6 -->

4.5 坐标转换

在 Cesium 中，只对笛卡尔坐标有效，所以需要我们将经纬度转换为笛卡尔坐标。

4.5.1 经纬度转笛卡尔坐标

```js
onMounted(() => {
  const cartesian = Cesium.Cartesian3.fromDegrees(110, 20, 20); // 经度 纬度 高度
});
```

4.5.2 笛卡尔坐标转弧度

```js
onMounted(() => {
  const graphic = Cesium.Cartographic.fromCartesian(cartesian);
});
```

4.5.3 弧度转经纬度

```js
onMounted(() => {
  const lon = Cesium.Math.toDegrees(graphic.longitude);
  const lat = Cesium.Math.toDegrees(graphic.latitude);
  const height = Cesium.Math.toDegrees(graphic.height);
});
```

4.6 相机

相当于我们视线的位置

4.6.1 设置目的地，视觉角度也就是相机位置

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const position = Cesium.Cartesian3.fromDegrees(110, 20, 100000);
  viewer.camera.setView({
    destination: position, // 目的地
    // 视角
    orientation: {
      heading: Cesium.Math.toRadians(0), // 左右
      pitch: Cesium.Math.toRadians(-90), // 上下
      roll: Cesium.Math.toRadians(0), // 倾斜
    },
  });
});
```

<!-- 7 -->

4.6.2 飞行动画

视线到达目的地有个过渡动画

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const position = Cesium.Cartesian3.fromDegrees(110, 20, 100000);
  viewer.camera.flyTo({
    destination: position, // 目的地
    duration: 3, // 飞行时长 3 秒
    // 视角
    orientation: {
      heading: Cesium.Math.toRadians(0), // 左右
      pitch: Cesium.Math.toRadians(-90), // 上下
      roll: Cesium.Math.toRadians(0), // 倾斜
    },
  });
});
```

<!-- 8 -->

4.6.3 视角锁定

无论怎么转动地球，视角中心在固定位置

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const position = Cesium.Cartesian3.fromDegrees(110, 20);
  viewer.camera.lookAt(
    position,
    new Cesium.HeadingPitchRange(
      Cesium.Math.toRadians(0),
      Cesium.Math.toRadians(-90),
      20000
    )
  );
});
```

4.7 entity 实体

4.7.1 设置点

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});
  const point = viewer.entities.add({
    id: "point",
    position: Cesium.Cartesian3.fromDegrees(121, 30), // 位置
    point: {
      pixelSize: 20, // 像素大小
      color: Cesium.Color.BLUE, // 颜色
    },
  });
  viewer.zoomTo(point); // 跳转到点位置
});
```

<!-- 9 -->

4.7.2 设置标注

也是广告牌，是图片地址

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const point = viewer.entities.add({
    id: "billboard",
    position: Cesium.Cartesian3.fromDegrees(120, 30, 10),
    billboard: {
      image: "/src/assets/cricel.png", // 图片地址
      scale: 1.2, // 缩放
      color: Cesium.Color.YELLOW, // 改变图片颜色
    },
  });
  viewer.zoomTo(point);
});
```

<!-- 10 -->

4.7.3 设置文字

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const label = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(120, 30),
    label: {
      text: "Cesium", // 内容
      fillColor: Cesium.Color.YELLOWGREEN, // 字体颜色
      showBackground: true, // 是否有背景颜色
      backgroundColor: new Cesium.Color(255, 255, 0), // 背景颜色
    },
  });
  viewer.zoomTo(label);
});
```

<!-- 11 -->

4.7.4 设置线

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const polyline = viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        120, 20, 121, 20, 121, 20.5,
      ]), // 线由点构成
      width: 10, // 线宽度
      material: Cesium.Color.BLACK, // 线颜色
    },
  });
  viewer.zoomTo(polyline);
});
```

4.7.5 设置面

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const polygon = viewer.entities.add({
    polygon: {
      // 面由点构成
      hierarchy: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          100, 20, 101, 20, 101, 20.5,
        ]),
      },
      material: Cesium.Color.BLUE, // 面颜色
      height: 10000, // 面距离地球高度
      extrudedHeight: 20000, // 面被拉升的高度
      outline: true, // 是否由外边线
      outlineColor: Cesium.Color.YELLOW, // 外边线颜色
      fill: true, // 是否填充立体颜色
    },
  });
  viewer.zoomTo(polygon);
});
```

<!-- 12 -->

4.7.6 设置立方体

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const box = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(119, 30, 3000), // 经度 维度 高度
    box: {
      dimensions: new Cesium.Cartesian3(2000, 1000, 3000), // 长 宽 高
      material: Cesium.Color.BLUEVIOLET,
    },
  });
  viewer.zoomTo(box);
});
```

<!-- 13 -->

4.7.7 椭圆

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const ellipse = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(118, 30),
    ellipse: {
      semiMajorAxis: 500, // 半长轴
      semiMinorAxis: 300, // 半短轴
      material: Cesium.Color.BLUE, // 填充颜色
      rotation: Math.PI / 2,
    },
  });
  viewer.zoomTo(ellipse);
});
```

<!-- 14 -->

4.7.8 矩形/立方体

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const rectangle = viewer.entities.add({
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(120, 40, 123, 45), // 左下和右上的坐标
      extrudedHeight: 30000, // 拉伸高度
      material: "/src/assets/img.jpg", // 立方体上图片
    },
  });
  viewer.zoomTo(rectangle);
});
```

<!-- 15 -->

4.7.9 组合

可以对点、线、面等进行组合

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const eneity = viewer.entities.add({
    position: new Cesium.Cartesian3.fromDegrees(120, 30, 100), // 经度 维度 高度
    billboard: {
      image: "/src/assets/cricel.png",
      scale: 1.2,
      color: Cesium.Color.ORANGE,
    },
    label: {
      text: "皇冠小区",
      font: "13px",
      fillColor: Cesium.Color.WHITE,
      pixelOffset: new Cesium.Cartesian2(0, -40), // 水平/垂直 偏移量
    },
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        120, 30, 0, 120, 30, 100,
      ]), // 垂直线是由3D点构成
      material: Cesium.Color.AQUA,
    },
  });
  viewer.zoomTo(eneity);
});
```

<!-- 16 -->

4.7.10 删除实体

entityName 为复制的实体变量，entityId 为设置的实体 ID

```js
viewer.entities.remove(entityName); // 删除指定实体

viewer.entities.removeAll(); // 删除全部实体

viewer.entities.removeById(entityId); // 删除指定ID的实体
```

4.8 动态实线

通过 Cesium.CallbackProperty (callback, isConstant) 函数视线，isConstant 为 false 有动态效果。

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const moveLine = viewer.entities.add({
    polyline: {
      positions: new Cesium.CallbackProperty(() => {
        num += 0.005;
        lon = 120 + num;
        lat = 30 + num;
        if (lon < 125) {
          return Cesium.Cartesian3.fromDegreesArray([120, 30, lon, lat]);
        } else {
          moveLine.polyline.positions = Cesium.Cartesian3.fromDegreesArray([
            120, 30, 125, 35,
          ]);
        }
      }, false),
      width: 5,
      material: Cesium.Color.AQUA,
    },
  });
});
```

<!-- 17 -->

5. DataSources 数据加载

加载 GeoJson 数据，参考 [Turf.js 中文网](https://turfjs.fenxianglu.cn/)

5.1 安装 turf

```bash
npm install @turf/turf
# or
yarn add @turf/turf
# or
pnpm add @turf/turf
```

5.2 在组件使用

```js
import { onMounted } from "vue";
import * as turf from "@turf/turf";

onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const linestring = turf.lineString([
    [-24, 63],
    [-23, 60],
    [-25, 65],
    [-20, 69],
  ]); // 线由点构成
  const pro = Cesium.GeoJsonDataSource.load(linestring); // 将 linestring 加到 Cesium
  pro.then((res) => {
    const entity = res.entities.values[0]; // 在回调函数中拿到 entity
    viewer.entities.add(entity);
    viewer.zoomTo(entity);
  });
});
```

<!-- 18 -->

5.3 多条线

可以直接通过 dataSources 加入 Cesium

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const multiLine = turf.multiLineString([
    [
      [0, 0],
      [3, 3],
    ],
    [
      [5, 5],
      [10, 10],
    ],
  ]); // 多条线由线数组构成
  Cesium.GeoJsonDataSource.load(multiLine).then((res) => {
    viewer.dataSources.add(res);
  });

  // viewer.dataSources.remove() // 清除 dataSources
});
```

5.4 多边形

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const polygon = turf.polygon([
    [
      [-5, 52],
      [-4, 56],
      [-2, 51],
      [-7, 54],
      [-5, 52],
    ],
  ]); // polygon 首尾坐标要一致

  const pro = Cesium.GeoJsonDataSource.load(polygon);
  viewer.dataSources.add(pro);
  viewer.zoomTo(pro);
});
```

<!-- 20 -->

5.5 topoJson 数据

是 GeoJson 数据的一种

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  // 加载本地 topojson 数据
  const pro = Cesium.GeoJsonDataSource.load("/src/assets/topo.topojson");
  viewer.dataSources.add(pro);
  viewer.zoomTo(pro);
});
```

<!-- 21 -->

5.6 kml 数据

拿到 .kmz 数据，使用 KmlDataSource 加入数据

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const pro = Cesium.KmlDataSource.load("/src/assets/kmz.kmz");
  viewer.dataSources.add(pro);
  viewer.zoomTo(pro);
});
```

<!-- 22 -->

5.7 czml 数据

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const pro = Cesium.CzmlDataSource.load("/src/assets/czml.czml");
  viewer.dataSources.add(pro);
  viewer.zoomTo(pro);
});
```

<!-- 23 -->

6. 3D 瓦片

去资源库添加资源，在已添加资源处，可以查看用法。

<!-- 24 -->

加载 New York City 3D Buildings

```js
onMounted(() => {
  const viewer = new Cesium.Viewer("contain", {});

  const tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(75343),
    })
  );
  viewer.flyTo(tileset);
});
```

<!-- 25 -->

总结：以上是基础入门，后续会持续更新官网 API 的使用
