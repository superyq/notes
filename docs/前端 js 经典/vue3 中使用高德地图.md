# vue3 中使用高德地图

前言：定位地图位置所需要的经纬度，可以通过 [拾取坐标](https://lbs.amap.com/tools/picker) 获取。

一：快速上手

1. 安装依赖

```bash
npm install @amap/amap-jsapi-loader
# or
pnpm add @amap/amap-jsapi-loader
# or
yarn add @amap/amap-jsapi-loader
```

2. 创建组件 src/components/Map.vue

```vue
<script setup>
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;

onMounted(() => {
  AMapLoader.load({
    key: "", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 800px;
}
</style>
```

3. 获取 key 值

[注册高德账号](https://lbs.amap.com/)，注册成功后登录，然后[添加 key 值](https://console.amap.com/dev/key/app)。复制添加后的 Key 值到组件，就可以使用了。

<!-- 1 -->
<!-- 2 -->
<!-- 3 -->

二：地图配置

参考文档[地图 JS API](https://lbs.amap.com/api/javascript-api-v2/summary)

1. 展示地图

1.1. 加载 JS API

```js
AMapLoader.load({
  key: "「你申请的应用key」", //申请好的Web端开发者key，调用 load 时必填
  version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
})
  .then((AMap) => {
    //JS API 加载完成后获取AMap对象
  })
  .catch((e) => {
    console.error(e); //加载错误提示
  });
```

1.2. 地图初始化

```js
const map = new AMap.Map("container", {
  viewMode: "2D", //默认使用 2D 模式
  zoom: 11, //地图级别
  center: [116.397428, 39.90923], //地图中心点
});
```

1.3. 主题样式

通过在地图初始化时设置 mapStyle 修改主题样式，官方主题有 amap://styles/ 后面拼接：normal、grey、whitesmoke、dark、light、graffiti

```js
map = new AMap.Map("container", {
  mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
});
```

2. 展示图层

2.1 创建图层

```js
const layer = new AMap.createDefaultLayer({
  zooms: [3, 20], //可见级别
  visible: true, //是否可见
  opacity: 1, //透明度
  zIndex: 0, //叠加层级
});
```

2.2 加载图层

```js
const map = new AMap.Map("container", {
  viewMode: "2D", //默认使用 2D 模式
  zoom: 11, //地图级别
  center: [116.397428, 39.90923], //地图中心点
  layers: [layer], //layer为创建的默认图层
});
```

2.3 创建实时交通路况图层

```js
const traffic = new AMap.TileLayer.Traffic({
  autoRefresh: true, //是否自动刷新，默认为false
  interval: 180, //刷新间隔，默认180s
});
map.add(traffic); //通过add方法添加图层
```

2.4 路况图层的显示和隐藏

```js
traffic.show(); //显示路况图层
traffic.hide(); //隐藏路况图层
```

<!-- 4 -->

3. 添加地图控件

JS API 提供了众多的控件，需要引入之后才能使用这些控件的功能。常见的地图控件有：缩放工具条 ToolBar、比例尺 Scale、定位按钮 Geolocation 等。

3.1 引入地图控件

```js
//异步加载控件
AMap.plugin("AMap.ToolBar", function () {
  var toolbar = new AMap.ToolBar(); //缩放工具条实例化
  map.addControl(toolbar);
});
```

3.2 控制地图控件显示/隐藏

```js
toolbar.show(); //缩放工具展示
toolbar.hide(); //缩放工具隐藏
```

4. 添加点标记

点标记是地图覆盖物中非常重要的要素之一，可以用来标记地图上的某个位置。

4.1 自定义 Marker

自定义 Marker 内容可以是字符串拼接的 DOM 元素。可以根据 class 名去定义样式。

```js
//点标记显示内容
const markerContent = `<div class="custom-content-marker">
<img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">
<div class="close-btn" onclick="clearMarker()">X</div>
</div>`;
```

4.2 创建 Marker 对象

```js
const position = new AMap.LngLat(116.397428, 39.90923); //Marker 经纬度
const marker = new AMap.Marker({
  position: position,
  content: markerContent, //将 html 传给 content
  offset: new AMap.Pixel(-13, -30), //以 icon 的 [center bottom] 为原点
});
```

4.3 将 Marker 添加到地图

```js
map.add(marker);
```

4.4 给 Marker 绑定事件

```js
function clearMarker() {
  map.remove(marker); //清除 marker
}
document.querySelector(".close-btn").onclick = clearMarker; //绑定点击事件
```

<!-- 5 -->

5. 添加多边形

多边形矢量图是地图覆盖物重要的地图要素之一，可以用来突出标记某个区域的形状。

5.1 创建地图

```js
const map = new AMap.Map("container", {
  center: [121.045332, 31.19884], //地图中心点
  zoom: 8.8, //地图级别
});
```

5.2 创建 Polygon 对象

AMap.Polygon 对象为用户提供在地图图面绘制多边形的能力。可以为多边形设置填充颜色 fillColor、描边颜色 strokeColor、轮廓线样式等属性。

tips: path 是多边形轮廓线的节点坐标数组。多边形支持普通多边形，带单个孔多边形，带多个孔多边形类型绘制。

```
普通多边形：path = [lnglat, lnglat ...] 或 path = [[lnglat, lnglat ...]]
带单个孔多边形：path = [[lnglat, lnglat ...], [ lnglat, lnglat ...]]
带多个孔多边形：path = [[lnglat, lnglat ...], [lnglat, lnglat ... ], [lnglat, lnglat ...] ...]
```

```js
const pathArr = [
  [
    [
      [121.7789, 31.3102],
      [121.7279, 31.3548],
      [121.5723, 31.4361],
      [121.5093, 31.4898],
      [121.5624, 31.4864],
      [121.5856, 31.4547],
      [121.7694, 31.3907],
      [121.796, 31.3456],
      [121.7789, 31.3102],
    ],
  ],
];
const polygon = new AMap.Polygon({
  path: pathArr, //多边形路径
  fillColor: "#ccebc5", //多边形填充颜色
  strokeOpacity: 1, //线条透明度
  fillOpacity: 0.5, //填充透明度
  strokeColor: "#2b8cbe", //线条颜色
  strokeWeight: 1, //线条宽度
  strokeStyle: "dashed", //线样式
  strokeDasharray: [5, 5], //轮廓的虚线和间隙的样式
});
```

5.3 给 Polygon 添加事件

```js
//鼠标移入更改样式
polygon.on("mouseover", () => {
  polygon.setOptions({
    fillOpacity: 0.7, //多边形填充透明度
    fillColor: "#7bccc4",
  });
});
//鼠标移出恢复样式
polygon.on("mouseout", () => {
  polygon.setOptions({
    fillOpacity: 0.5,
    fillColor: "#ccebc5",
  });
});
```

5.4 添加 Polygon 到地图

```js
map.add(polygon);
```

<!-- 6 -->

6. 搜索地点

AMap.PlaceSearch 地点搜索插件。

6.1 创建地图

```js
const map = new AMap.Map("container", {
  viewMode: "2D", //默认使用 2D 模式
  zoom: 11, //地图级别
  center: [116.397428, 39.90923], //地图中心点
});
```

6.2 引入插件

通过 AMap.plugin 方法按需引入插件

```js
AMap.plugin(["AMap.PlaceSearch"], function () {
  const placeSearch = new AMap.PlaceSearch({
    pageSize: 5, //单页显示结果条数
    pageIndex: 1, //页码
    city: "010", //兴趣点城市
    citylimit: true, //是否强制限制在设置的城市内搜索
    map: map, //展现结果的地图实例
    panel: "my-panel", //结果列表将在此容器中进行展示。
    autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
  });
  placeSearch.search("北京大学"); //使用插件搜索关键字并查看结果
});
```

6.3 自定义搜索结果

如果不想使用 JS API 的结果面板，panel 可以缺省或者赋值 false，然后在 search()的回调中处理自己的逻辑，自定义搜索教程前往 输入提示与 POI 搜索。

```js
//在回调函数中使用插件功能
placeSearch.search("北京大学", function (status, result) {
  //查询成功时，result 即对应匹配的 POI 信息
});
```

<!-- 7 -->

7. 路线规划

AMap.Driving 驾车路线规划插件。JS API 的路线规划种类有：驾车 AMap.Driving、公交 AMap.Transfer、步行 AMap.Walking、骑乘 AMap.Riding 和货车 AMap.TruckDriving 等。

7.1 确认规划的起点和终点信息

```js
// 使用地名确认起终点
const points = [
  { keyword: "北京市地震局（公交站）", city: "北京" }, //起始点坐标
  { keyword: "亦庄文化园（地铁站）", city: "北京" }, //终点坐标
];

// 使用经纬度确认起终点
const startLngLat = [116.379028, 39.865042]; //起始点坐标
const endLngLat = [116.427281, 39.903719]; //终点坐标
```

7.2 引入和创建驾车规划插件，获取起终点规划线路

```js
// 使用地点名称规划获取规划路线
// 引入和创建驾车规划插件
AMap.plugin(["AMap.Driving"], function () {
  const driving = new AMap.Driving({
    map: map,
    panel: "my-panel",
  });
  //获取起终点规划线路
  driving.search(points, function (status, result) {
    if (status === "complete") {
      //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
      //查询成功时，result 即为对应的驾车导航信息
      console.log(result);
    } else {
      console.log("获取驾车数据失败：" + result);
    }
  });
});

// 使用经纬度规划获取规划路线
// 引入和创建驾车规划插件
AMap.plugin(["AMap.Driving"], function () {
  const driving = new AMap.Driving({
    map: map,
    panel: "my-panel",
  });
  //获取起终点规划线路
  driving.search(startLngLat, endLngLat, function (status, result) {
    if (status === "complete") {
      //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
      //查询成功时，result 即为对应的驾车导航信息
      console.log(result);
    } else {
      console.log("获取驾车数据失败：" + result);
    }
  });
});
```

<!-- 8 -->

8. 地图生命周期

8.1 创建地图

```js
var map = new AMap.Map("container", {
  zoom: 10, //地图级别
  center: [116.397428, 39.90923], //地图中心点
  layers: [new AMap.TileLayer.Satellite()], //设置图层,可设置成包含一个或多个图层的数组
  mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
  viewMode: "2D", //设置地图模式
});
```

8.2 地图加载完成

```js
map.on("complete", function () {
  //地图图块加载完成后触发
});
```

8.3 地图运行阶段

```js
var map = new AMap.Map("container"); //初始化地图
//在运行阶段添加点标记
const marker = new AMap.Marker({
  position: new AMap.LngLat(116.39, 39.9),
});
//将创建的点标记添加到已有的地图实例：
map.add(marker);
//在运行阶段监听地图的点击事件
const clickHandler = function (e) {
  console.log(
    "您在[ " +
      e.lnglat.getLng() +
      "," +
      e.lnglat.getLat() +
      " ]的位置点击了地图！"
  );
};
map.on("click", clickHandler);
```

8.4 销毁地图对象

```js
//解绑地图的点击事件
map.off("click", clickHandler);
//销毁地图，并清空地图容器
map.destroy();
//地图对象赋值为null
map = null;
//清除地图容器的 DOM 元素
document.getElementById("container").remove(); //"container" 为指定 DOM 元素的id
```
