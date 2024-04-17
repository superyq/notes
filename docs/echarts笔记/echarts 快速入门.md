# echarts 快速入门

前言：本文档主要讲解 echarts 在 vue3 中的用法，及其 echarts 的一些配置参数含义及用法。

一：快速开始

1. 安装 echarts

```bash
npm install echarts
# or
pnpm add echarts
# or
yarn add echarts
```

2. 使用 echarts

```vue
<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";

const initEchart = () => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById("demo"));
  // 绘制图表
  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
};
onMounted(() => {
  initEchart();
});
</script>

<template>
  <div id="demo" style="width: 600px; height: 400px">demoEchats</div>
</template>
```

<img src="../../images/echarts/1.jpg"/>

二：基础概念

1. 图表容器及大小

1.1 设置 dom 节点宽高

推荐通过 css 设置该节点的宽高，该节点的大小默认就是图表的大小，调用 echarts.init 时必须保证容器已经有宽高了。

```html
<div id="demo" style="width: 600px; height: 400px"></div>
```

1.2 指定图表大小

如果容器未设置宽高，或你希望图表大小不等于容器大小，可以在初始化图表时设置大小。

```js
// 基于准备好的dom，初始化echarts实例
const myChart = echarts.init(document.getElementById("demo"), null, {
  width: 600,
  height: 400,
});
```

1.3 响应容器大小

有时候我们希望图表可以随容器大小的变化而变化，可以通过监听页面的 resize 事件获取浏览器大小改变的事件，然后调用 echartsInstance.resize 改变图表的大小。

```vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

let myChart = null;
const initEchart = () => {
  // 绘制图表
  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
};
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(document.getElementById("demo"));
  window.addEventListener("resize", function () {
    myChart.resize();
  });
  initEchart();
});
</script>

<template>
  <div id="demo" style="width: 100%; height: 400px">demoEchats</div>
</template>
```

<video src="../../images/echarts/2.mp4"></video>

1.4 重置图表大小

通过给 resize 传入参数，重置图表大小。

```js
myChart.resize({
  width: 800,
  height: 400,
});
```

1.5 容器节点的销毁和重建

假设页面有多个标签页，每个标签页都有图表，当切换标签页时，当前标签页的 DOM 节点被移除，再切回来时，就会发现图表"不见了"。这是因为图表的容器节点被移除导致，就算之后节点重新添加，图表所在节点也不存在了，处理方法是，在容器节点被销毁之后，调用 echartsInstance.dispose 销毁实例，在容器节点被重新添加后再次调用 echarts.init 初始化。

tips：在容器节点被销毁时，总是应调用 echartsInstance.dispose 以销毁实例释放资源，避免内存泄漏。

```vue
<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import * as echarts from "echarts";

let myChart = null;
const initEchart = () => {
  // 绘制图表
  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
};
const resize = () => {
  myChart.resize();
};
onMounted(() => {
  myChart = echarts.init(document.getElementById("demo"));
  initEchart();
  window.addEventListener("resize", resize);
});
onUnmounted(() => {
  myChart.setOption({
    echartsInstance: false,
  });
  window.removeEventListener("resize", resize);
});
</script>

<template>
  <div id="demo" style="width: 100%; height: 400px">demoEchats</div>
</template>
```

2. 样式

可以通过颜色主题、调色盘、直接样式设置、视觉映射改变图形元素或文字的颜色、明暗、大小等。

2.1 颜色主题

echarts 内置了 'dark' 主题，其他主题需自己下载。

```js
var chart = echarts.init(dom, "dark");
```

2.2 调色盘

调色盘，可以在 option 中设置。它给定了一组颜色，图形、系列会自动依次从其中选择颜色。可以设置全局的调色盘，也可以设置系列自己专属的调色盘。

```js
option = {
  // 全局调色盘。
  color: [
    "#c23531",
    "#2f4554",
    "#61a0a8",
    "#d48265",
    "#91c7ae",
    "#749f83",
    "#ca8622",
    "#bda29a",
    "#6e7074",
    "#546570",
    "#c4ccd3",
  ],

  series: [
    {
      type: "bar",
      // 此系列自己的调色盘。
      color: [
        "#dd6b66",
        "#759aa0",
        "#e69d87",
        "#8dc1a9",
        "#ea7e53",
        "#eedd78",
        "#73a373",
        "#73b9bc",
        "#7289ab",
        "#91ca8c",
        "#f49f42",
      ],
      // ...
    },
    {
      type: "pie",
      // 此系列自己的调色盘。
      color: [
        "#37A2DA",
        "#32C5E9",
        "#67E0E3",
        "#9FE6B8",
        "#FFDB5C",
        "#ff9f7f",
        "#fb7293",
        "#E062AE",
        "#E690D1",
        "#e7bcf3",
        "#9d96f5",
        "#8378EA",
        "#96BFFF",
      ],
      // ...
    },
  ],
};
```

2.3 直接样式设置

这是比较常见的设置方式，在 option 中的很多地方可以设置 itemStyle、lineStyle、areaStyle、label 等等。这些的地方可以直接设置图形元素的颜色、线宽、点的大小、标签的文字、标签的样式等等。后续配置项有详解，在这就不多叙述了。

2.4 高亮样式 emphasis

鼠标悬浮图形元素一般会出现高亮的样式，默认情况下，高亮样式是根据普通样式自动生成的，也可以通过 emphasis 自定义高亮。

```js
myChart.setOption({
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {},
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
      emphasis: {
        itemStyle: {
          // 高亮时点的颜色。
          color: "blue",
        },
        label: {
          show: true,
          // 高亮时标签的文字。
          formatter: "This is a emphasis label.",
        },
      },
    },
  ],
});
```

<video src="../../images/echarts/3.mp4"></video>

三：基础配置项

1. title 标题组件

包含主标题和副标题

2. legend 图例组件

展示不同系列的标记、颜色、名字，可以通过点击控制系列的显示和隐藏。

3. grid 绘图网格

单个 grid 最多可以放置上下两个 X 轴，左右两个 Y 轴，可以在网格上绘制折线图，柱状图，散点图。

4. xAxis x 轴

单个 grid 最多可以放置上下两个 X 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。

5. yAxis y 轴

单个 grid 最多可以放置左右两个 Y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 y 轴的重叠。

6. polar 极坐标系

用于散点图和折线图，每个极坐标系拥有一个角度轴和一个半径轴。

7. radiusAxis 极坐标系的径向轴

8. angleAxis 极坐标系的角度轴。

9. radar 雷达图坐标系

只适用于雷达图。

10. dataZoom 区域缩放

能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。

11. visualMap 视觉映射

用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。

12. tooltip 提示框

13. axisPointer 坐标轴指示器

14. toolbox 工具栏

内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。

15. brush 区域选择

用户可以选择图中一部分数据，从而便于向用户展示被选中数据，或者他们的一些统计计算结果。

16. geo 地理坐标系

地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。

17. parallel 平行坐标系

一种常用的可视化高维数据的图表。

18. parallelAxis 平行坐标系中的坐标轴

19. singleAxis 单轴

可以被应用到散点图中展现一维数据。

20. timeline

提供了在多个 ECharts option 间进行切换、播放等操作的功能。

21. graphic 原生图形元素

可以支持的图形元素包括：image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group。

22. calendar 日历坐标系

23. dataset 数据集

数据可以单独管理，被多个组件复用，并且可以自由指定数据到视觉的映射。这在不少场景下能带来使用上的方便。

24. aria

支持自动根据图表配置项智能生成描述，使得盲人可以在朗读设备的帮助下了解图表内容，让图表可以被更多人群访问。

25. series 系列列表

每个系列通过 type 决定自己的图表类型。

26. darkMode 是否是暗黑模式

默认会根据背景色 backgroundColor 的亮度自动设置。 如果是设置了容器的背景色而无法判断到，就可以使用该配置手动指定，echarts 会根据是否是暗黑模式调整文本等的颜色。该配置通常会被用于主题中。

27. color 调色盘颜色列表

如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。 默认为：['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

28. backgroundColor 背景色

默认无背景。

29. textStyle 全局的字体样式。

30. animation 是否开启动画。

31. animationThreshold 是否开启动画的阈值

当单个系列显示的图形数量大于这个阈值时会关闭动画。

32. animationDuration 初始动画的时长

支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的初始动画效果

33. animationEasing 初始动画的缓动效果

34. animationDelay 初始动画的延迟

支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的初始动画效果。

35. animationDurationUpdate 数据更新动画的时长

支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的更新动画效果。

36. animationEasingUpdate 数据更新动画的缓动效果

37. animationDelayUpdate 数据更新动画的延迟

支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果。

38. stateAnimation 状态切换的动画配置

支持在每个系列里设置单独针对该系列的配置。

39. blendMode 图形的混合模式

默认为 'source-over'。 支持每个系列单独设置。'lighter' 也是比较常见的一种混合模式，该模式下图形数量集中的区域会颜色叠加成高亮度的颜色（白色）。常常能起到突出该区域的效果。

40. hoverLayerThreshold 图形数量阈值

决定是否开启单独的 hover 层，在整个图表的图形数量大于该阈值时开启单独的 hover 层。

41. useUTC 是否使用 UTC 时间

默认取值为 false，即使用本地时间。

42. options 用于 timeline

用于 timeline 的 option 数组。数组的每一项是一个 echarts option (ECUnitOption)。

43. media 移动端自适应

四：基础应用

1. 柱状图
