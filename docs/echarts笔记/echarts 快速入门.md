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

3. 数据集

数据集（dataset）是专门用来管理数据的组件。虽然每个系列都可以在 series.data 中设置数据，但更推荐使用数据集来管理数据。因为这样数据可以被多个组件复用，也方便进行"数据和其他配置"分离的配置风格。

3.1 在系列中设置数据

如果数据设置在系列（series）中，优点在于适合一些特殊的数据结构（如"树"，"图"，超大数据）进行一定的数据类型定制。但缺点是，常需要用户先处理数据，把数据分割设置到各个系列中，也不利于多个系列共享同一份数据、不利于基于原始数据进行图表类型，系列的映射安排。

```js
option = {
  xAxis: {
    type: "category",
    data: ["Matcha Latte", "Milk Tea", "Cheese Cocoa", "Walnut Brownie"],
  },
  yAxis: {},
  series: [
    {
      type: "bar",
      name: "2015",
      data: [89.3, 92.1, 94.4, 85.4],
    },
    {
      type: "bar",
      name: "2016",
      data: [95.8, 89.4, 91.2, 76.9],
    },
    {
      type: "bar",
      name: "2017",
      data: [97.7, 83.1, 92.5, 78.1],
    },
  ],
};
```

<!-- 4.png -->

3.2 在数据集中设置数据

数据设置在 数据集（dataset） 中，优点：

贴近数据可视化思维方式：（I）提供数据，（II）指定数据到视觉的映射，从而形成图表。
数据和配置分离。数据常变，配置不常变。分开易于管理。
数据可以被多个系列或者组件复用。
支持更多的数据的常用格式，例如二维数组、对象数组等，一定程度上避免使用者为了数据格式而进行转换。

```js
option = {
  legend: {},
  tooltip: {},
  dataset: {
    // 提供一份数据。
    source: [
      ["product", "2015", "2016", "2017"],
      ["Matcha Latte", 43.3, 85.8, 93.7],
      ["Milk Tea", 83.1, 73.4, 55.1],
      ["Cheese Cocoa", 86.4, 65.2, 82.5],
      ["Walnut Brownie", 72.4, 53.9, 39.1],
    ],
  },
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: { type: "category" },
  // 声明一个 Y 轴，数值轴。
  yAxis: {},
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
};
```

<!-- 4.png -->

或者也可以使用常见的"对象数组"的格式

```js
option = {
  legend: {},
  tooltip: {},
  dataset: {
    // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
    // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
    // 如果不指定 dimensions，也可以通过指定 series.encode
    // 完成映射，参见后文。
    dimensions: ["product", "2015", "2016", "2017"],
    source: [
      { product: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
      { product: "Milk Tea", 2015: 83.1, 2016: 73.4, 2017: 55.1 },
      { product: "Cheese Cocoa", 2015: 86.4, 2016: 65.2, 2017: 82.5 },
      { product: "Walnut Brownie", 2015: 72.4, 2016: 53.9, 2017: 39.1 },
    ],
  },
  xAxis: { type: "category" },
  yAxis: {},
  series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
};
```

<!-- 4.png -->

3.3 数据到图形的映射

指定数据集的列（column）或行（row）映射为 系列（series）。可以通过 series.seriesLayoutBy 属性来配置。默认是按照列（column）来映射。

指定维度映射的规则：如何从 dataset 的维度（一个“维度”的意思是一行/列）映射到坐标轴（如 X、Y 轴）、提示框（tooltip）、标签（label）、图形元素大小颜色等（visualMap）。可以通过 series.encode 属性，以及 visualMap 组件来配置（如果有需要映射颜色大小等视觉维度的话）。ECharts 默认映射：X 坐标轴声明为类目轴，默认情况下会自动对应到 dataset.source 中的第一列；三个柱图系列，一一对应到 dataset.source 中后面每一列。

3.4 把数据集（dataset）的行列映射为系列（series）

有了数据表后，用户可以通过 seriesLayoutBy 配置项，改变图表对于行列的理解。seriesLayoutBy 可取值：

'column': 默认值。系列被安放到 dataset 的列上面。
'row': 系列被安放到 dataset 的行上面。

```js
option = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ["product", "2012", "2013", "2014", "2015"],
      ["Matcha Latte", 41.1, 30.4, 65.1, 53.3],
      ["Milk Tea", 86.5, 92.1, 85.7, 83.1],
      ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4],
    ],
  },
  xAxis: [
    { type: "category", gridIndex: 0 },
    { type: "category", gridIndex: 1 },
  ],
  yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
  grid: [{ bottom: "55%" }, { top: "55%" }],
  series: [
    // 这几个系列会出现在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
    { type: "bar", seriesLayoutBy: "row" },
    { type: "bar", seriesLayoutBy: "row" },
    { type: "bar", seriesLayoutBy: "row" },
    // 这几个系列会出现在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
    { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
    { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
    { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
    { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
  ],
};
```

<!-- 5.png -->

3.5 维度（dimension）

常用图表大部分是“二维表”结构，当我们把系列（series）对应到“列”时，那么每一列就称为一个“维度（dimension）”，而每一行称为数据项（item）。当我们把系列（series）对应到“行”时，那么每一行就是“维度（dimension）”，每一列就是数据项（item）。

维度可以有单独的名字，便于在图表中显示。维度名（dimension name）可以在定义在 dataset 的第一行（或者第一列）。例如上面的例子中，'score'、'amount'、'product' 就是维度名。从第二行开始，才是正式的数据。dataset.source 中第一行（列）到底包含不包含维度名，ECharts 默认会自动探测。当然也可以设置 dataset.sourceHeader: true 显示声明第一行（列）就是维度，或者 dataset.sourceHeader: false 表明第一行（列）开始就直接是数据。

维度的定义，也可以使用单独的 dataset.dimensions 或者 series.dimensions 来定义，这样可以同时指定维度名，和维度的类型（dimension type）：

```js
var option1 = {
  dataset: {
    dimensions: [
      { name: "score" },
      // 可以简写为 string ，表示 dimension name 。
      "amount",
      // 可以在 type 中指定维度类型。
      { name: "product", type: "ordinal" },
    ],
    source: [
      //...
    ],
  },
  // ...
};

var option2 = {
  dataset: {
    source: [
      // ...
    ],
  },
  series: {
    type: "line",
    // series.dimensions 会更优先于 dataset.dimension 采纳。
    dimensions: [
      null, // 可以设置为 null 表示不想设置维度名
      "amount",
      { name: "product", type: "ordinal" },
    ],
  },
  // ...
};
```

大多数情况下，我们并不需要去设置维度类型，因为 ECharts 会自动尝试判断。但是如果不足够准确时，可以手动设置维度类型。

维度类型（dimension type）可以取这些值：

'number': 默认，表示普通数据。
'ordinal': 对于类目、文本这些 string 类型的数据，如果需要能在数轴上使用，须是 'ordinal' 类型。ECharts 默认会试图自动判断这个类型。但是自动判断也可能不准确，所以使用者也可以手动强制指定。
'time': 表示时间数据。设置成 'time' 则能支持自动解析数据成时间戳（timestamp），比如该维度的数据是 '2017-05-10'，会自动被解析。如果这个维度被用在时间数轴（axis.type 为 'time'）上，那么会被自动设置为 'time' 类型。时间类型的支持参见 data。
'float': 如果设置成 'float'，在存储时候会使用 TypedArray，对性能优化有好处。
'int': 如果设置成 'int'，在存储时候会使用 TypedArray，对性能优化有好处。

3.5 数据到图形的映射（series.encode）

可以使用 series.encode 来做映射。

```js
var option = {
  dataset: {
    source: [
      ["score", "amount", "product"],
      [89.3, 58212, "Matcha Latte"],
      [57.1, 78254, "Milk Tea"],
      [74.4, 41032, "Cheese Cocoa"],
      [50.1, 12755, "Cheese Brownie"],
      [89.7, 20145, "Matcha Cocoa"],
      [68.1, 79146, "Tea"],
      [19.6, 91852, "Orange Juice"],
      [10.6, 101852, "Lemon Juice"],
      [32.7, 20112, "Walnut Brownie"],
    ],
  },
  xAxis: {},
  yAxis: { type: "category" },
  series: [
    {
      type: "bar",
      encode: {
        // 将 "amount" 列映射到 X 轴。
        x: "amount",
        // 将 "product" 列映射到 Y 轴。
        y: "product",
      },
    },
  ],
};
```

<!-- 6 -->

series.encode 声明的基本结构如下。其中冒号左边是坐标系、标签等特定名称，如 'x', 'y', 'tooltip' 等，冒号右边是数据中的维度名（string 格式）或者维度的序号（number 格式，从 0 开始计数），可以指定一个或多个维度（使用数组）。通常情况下，下面各种信息不需要所有的都写，按需写即可。

下面是 series.encode 支持的属性：

```js
// 在任何坐标系和系列中，都支持：
encode: {
  // 使用 “名为 product 的维度” 和 “名为 score 的维度” 的值在 tooltip 中显示
  tooltip: ['product', 'score']
  // 使用 “维度 1” 和 “维度 3” 的维度名连起来作为系列名。（有时候名字比较长，这可以避免在 series.name 重复输入这些名字）
  seriesName: [1, 3],
  // 表示使用 “维度2” 中的值作为 id。这在使用 setOption 动态更新数据时有用处，可以使新老数据用 id 对应起来，从而能够产生合适的数据更新动画。
  itemId: 2,
  // 指定数据项的名称使用 “维度3” 在饼图等图表中有用，可以使这个名字显示在图例（legend）中。
  itemName: 3
}

// 直角坐标系（grid/cartesian）特有的属性：
encode: {
  // 把 “维度1”、“维度5”、“名为 score 的维度” 映射到 X 轴：
  x: [1, 5, 'score'],
  // 把“维度0”映射到 Y 轴。
  y: 0
}

// 单轴（singleAxis）特有的属性：
encode: {
  single: 3
}

// 极坐标系（polar）特有的属性：
encode: {
  radius: 3,
  angle: 2
}

// 地理坐标系（geo）特有的属性：
encode: {
  lng: 3,
  lat: 2
}

// 对于一些没有坐标系的图表，例如饼图、漏斗图等，可以是：
encode: {
  value: 3
}
```

3.6 默认的 series.encode

在坐标系中（如直角坐标系、极坐标系等）：
| 如果有类目轴（axis.type 为 'category'），则将第一列（行）映射到这个轴上，后续每一列（行）对应一个系列。
| 如果没有类目轴，假如坐标系有两个轴（例如直角坐标系的 X Y 轴），则每两列对应一个系列，这两列分别映射到这两个轴上。

如果没有坐标系（如饼图）：
| 取第一列（行）为名字，第二列（行）为数值（如果只有一列，则取第一列为数值）。

3.7 常见的 series.encode 设置方式

```js
// 把第三列设置为 X 轴，第五列设置为 Y 轴
option = {
  series: {
    // 注意维度序号（dimensionIndex）从 0 开始计数，第三列是 dimensions[2]。
    encode: { x: 2, y: 4 },
    // ...
  },
};

// 第三行设置为 X 轴，第五行设置为 Y 轴
option = {
  series: {
    encode: { x: 2, y: 4 },
    seriesLayoutBy: 'row'
    // ...
  }
};

// 把第二列设置为标签
option = {
  series: {
    label: {
      // `'{@score}'` 表示 “名为 score” 的维度里的值。
      // `'{@[4]}'` 表示引用序号为 4 的维度里的值。
      formatter: 'aaa{@product}bbb{@score}ccc{@[4]}ddd';
    }
  }
};

// 让第 2 列和第 3 列显示在提示框（tooltip）
option = {
  series: {
    encode: {
      tooltip: [1, 2]
      // ...
    }
    // ...
  }
};

// 给维度取名
var option = {
  dataset: {
    dimensions: ['score', 'amount'],
    source: [
      [89.3, 3371],
      [92.1, 8123],
      [94.4, 1954],
      [85.4, 829]
    ]
  }
};

// 把第三列映射为气泡图的点的大小
var option = {
  dataset: {
    source: [
      [12, 323, 11.2],
      [23, 167, 8.3],
      [81, 284, 12],
      [91, 413, 4.1],
      [13, 287, 13.5]
    ]
  },
  visualMap: {
    show: false,
    dimension: 2, // 指向第三列（列序号从 0 开始记，所以设置为 2）。
    min: 2, // 需要给出数值范围，最小数值。
    max: 15, // 需要给出数值范围，最大数值。
    inRange: {
      // 气泡尺寸：5 像素到 60 像素。
      symbolSize: [5, 60]
    }
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter'
  }
};
```

3.8 视觉通道（颜色、尺寸等）的映射

可以使用 visualMap 组件进行视觉通道的映射。

3.9 数据的各种格式

除了二维数组还可以是 key-value 格式

```js
dataset: [
  {
    // 按行的 key-value 形式（对象数组），这是个比较常见的格式。
    source: [
      { product: "Matcha Latte", count: 823, score: 95.8 },
      { product: "Milk Tea", count: 235, score: 81.4 },
      { product: "Cheese Cocoa", count: 1042, score: 91.2 },
      { product: "Walnut Brownie", count: 988, score: 76.9 },
    ],
  },
  {
    // 按列的 key-value 形式。
    source: {
      product: ["Matcha Latte", "Milk Tea", "Cheese Cocoa", "Walnut Brownie"],
      count: [823, 235, 1042, 988],
      score: [95.8, 81.4, 91.2, 76.9],
    },
  },
];
```

3.10 多个 dataset 以及如何引用他们

可以同时定义多个 dataset。系列可以通过 series.datasetIndex 来指定引用哪个 dataset。

```js
var option = {
  dataset: [
    {
      // 序号为 0 的 dataset。
      source: [],
    },
    {
      // 序号为 1 的 dataset。
      source: [],
    },
    {
      // 序号为 2 的 dataset。
      source: [],
    },
  ],
  series: [
    {
      // 使用序号为 2 的 dataset。
      datasetIndex: 2,
    },
    {
      // 使用序号为 1 的 dataset。
      datasetIndex: 1,
    },
  ],
};
```

3.11 ECharts 3 的数据设置方式（series.data）仍正常使用

ECharts 4 之前一直以来的数据声明方式仍然被正常支持，如果系列已经声明了 series.data， 那么就会使用 series.data 而非 dataset。

一些特殊的非 table 格式的图表，如 treemap、graph、lines 等，现在仍不支持在 dataset 中设置，仍然需要使用 series.data。另外，对于巨大数据量的渲染（如百万以上的数据量），需要使用 appendData 进行增量加载，这种情况不支持使用 dataset。

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
