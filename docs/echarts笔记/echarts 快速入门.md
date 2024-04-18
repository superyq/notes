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

4. 数据转换

“数据转换” 这个词指的是，给定一个已有的“数据集”（dataset）和一个“转换方法”（transform），echarts 能生成一个新的“数据集”，然后可以使用这个新的“数据集”绘制图表。

4.1 数据转换基础使用

在 echarts 中，数据转换是依托于数据集（dataset）来实现的. 我们可以设置 dataset.transform 来表示，此 dataset 的数据，来自于此 transform 的结果。

下面是上述例子的效果，三个饼图分别显示了 2011、2012、2013 年的数据。

```js
var option = {
  dataset: [
    {
      // 这个 dataset 的 index 是 `0`。
      source: [
        ["Product", "Sales", "Price", "Year"],
        ["Cake", 123, 32, 2011],
        ["Cereal", 231, 14, 2011],
        ["Tofu", 235, 5, 2011],
        ["Dumpling", 341, 25, 2011],
        ["Biscuit", 122, 29, 2011],
        ["Cake", 143, 30, 2012],
        ["Cereal", 201, 19, 2012],
        ["Tofu", 255, 7, 2012],
        ["Dumpling", 241, 27, 2012],
        ["Biscuit", 102, 34, 2012],
        ["Cake", 153, 28, 2013],
        ["Cereal", 181, 21, 2013],
        ["Tofu", 395, 4, 2013],
        ["Dumpling", 281, 31, 2013],
        ["Biscuit", 92, 39, 2013],
        ["Cake", 223, 29, 2014],
        ["Cereal", 211, 17, 2014],
        ["Tofu", 345, 3, 2014],
        ["Dumpling", 211, 35, 2014],
        ["Biscuit", 72, 24, 2014],
      ],
      // id: 'a'
    },
    {
      // 这个 dataset 的 index 是 `1`。
      // 这个 `transform` 配置，表示，此 dataset 的数据，来自于此 transform 的结果。
      transform: {
        type: "filter",
        config: { dimension: "Year", value: 2011 },
      },
      // 我们还可以设置这些可选的属性： `fromDatasetIndex` 或 `fromDatasetId`。
      // 这些属性，指定了，transform 的输入，来自于哪个 dataset。例如，
      // `fromDatasetIndex: 0` 表示输入来自于 index 为 `0` 的 dataset 。又例如，
      // `fromDatasetId: 'a'` 表示输入来自于 `id: 'a'` 的 dataset。
      // 当这些属性都不指定时，默认认为，输入来自于 index 为 `0` 的 dataset 。
    },
    {
      // 这个 dataset 的 index 是 `2`。
      // 同样，这里因为 `fromDatasetIndex` 和 `fromDatasetId` 都没有被指定，
      // 那么输入默认来自于 index 为 `0` 的 dataset 。
      transform: {
        // 这个类型为 "filter" 的 transform 能够遍历并筛选出满足条件的数据项。
        type: "filter",
        // 每个 transform 如果需要有配置参数的话，都须配置在 `config` 里。
        // 在这个 "filter" transform 中，`config` 用于指定筛选条件。
        // 下面这个筛选条件是：选出维度（ dimension ）'Year' 中值为 2012 的所有
        // 数据项。
        config: { dimension: "Year", value: 2012 },
      },
    },
    {
      // 这个 dataset 的 index 是 `3`。
      transform: {
        type: "filter",
        config: { dimension: "Year", value: 2013 },
      },
    },
  ],
  series: [
    {
      type: "pie",
      radius: 50,
      center: ["25%", "50%"],
      // 这个饼图系列，引用了 index 为 `1` 的 dataset 。也就是，引用了上述
      // 2011 年那个 "filter" transform 的结果。
      datasetIndex: 1,
    },
    {
      type: "pie",
      radius: 50,
      center: ["50%", "50%"],
      datasetIndex: 2,
    },
    {
      type: "pie",
      radius: 50,
      center: ["75%", "50%"],
      datasetIndex: 3,
    },
  ],
};
```

<!-- 7 -->

4.2 数据转换的进阶使用

transform 可以被链式声明，这是一个语法糖。

```js
option = {
  dataset: [
    {
      source: [
        // 原始数据
      ],
    },
    {
      // 几个 transform 被声明成 array ，他们构成了一个链，
      // 前一个 transform 的输出是后一个 transform 的输入。
      transform: [
        {
          type: "filter",
          config: { dimension: "Product", value: "Tofu" },
        },
        {
          type: "sort",
          config: { dimension: "Year", order: "desc" },
        },
      ],
    },
  ],
  series: {
    type: "pie",
    // 这个系列引用上述 transform 的结果。
    datasetIndex: 1,
  },
};
```

在大多数场景下，transform 只需输出一个 data 。但是也有一些场景，需要输出多个 data ，每个 data 可以被不同的 series 或者 dataset 所使用。例如，在内置的 "boxplot" transform 中，除了 boxplot 系列所需要的 data 外，离群点（ outlier ）也会被生成，并且可以用例如散点图系列显示出来。例如，example。

```js
option = {
  dataset: [
    {
      // 这个 dataset 的 index 为 `0`。
      source: [
        // 原始数据
      ],
    },
    {
      // 这个 dataset 的 index 为 `1`。
      transform: {
        type: "boxplot",
      },
      // 这个 "boxplot" transform 生成了两个数据：
      // result[0]: boxplot series 所需的数据。
      // result[1]: 离群点数据。
      // 当其他 series 或者 dataset 引用这个 dataset 时，他们默认只能得到
      // result[0] 。
      // 如果想要他们得到 result[1] ，需要额外声明如下这样一个 dataset ：
    },
    {
      // 这个 dataset 的 index 为 `2`。
      // 这个额外的 dataset 指定了数据来源于 index 为 `1` 的 dataset。
      fromDatasetIndex: 1,
      // 并且指定了获取 transform result[1] 。
      fromTransformResult: 1,
    },
  ],
  xAxis: {
    type: "category",
  },
  yAxis: {},
  series: [
    {
      name: "boxplot",
      type: "boxplot",
      // Reference the data from result[0].
      // 这个 series 引用 index 为 `1` 的 dataset 。
      datasetIndex: 1,
    },
    {
      name: "outlier",
      type: "scatter",
      // 这个 series 引用 index 为 `2` 的 dataset 。
      // 从而也就得到了上述的 transform result[1] （即离群点数据）
      datasetIndex: 2,
    },
  ],
};
```

dataset.fromTransformResult 和 dataset.transform 能同时出现在一个 dataset 中，这表示，这个 transform 的输入，是上游的结果中以 fromTransformResult 获取的结果。例如：

```js
{
  fromDatasetIndex: 1,
  fromTransformResult: 1,
  transform: {
    type: 'sort',
    config: { dimension: 2, order: 'desc' }
  }
}
```

使用 transform 时，有时候我们会配不对，显示不出来结果，并且不知道哪里错了。所以，这里提供了一个配置项 transform.print 方便 debug 。这个配置项只在开发环境中生效。

```js
option = {
  dataset: [
    {
      source: [],
    },
    {
      transform: {
        type: "filter",
        config: {},
        // 配置为 `true` 后， transform 的结果
        // 会被 console.log 打印出来。
        print: true,
      },
    },
  ],
  // ...
};
```

4.3 数据转换器 "filter"

echarts 内置提供了能起过滤作用的数据转换器。我们只需声明 transform.type: "filter"，以及给出数据筛选条件。如下例：

```js
option = {
  dataset: [
    {
      source: [
        ["Product", "Sales", "Price", "Year"],
        ["Cake", 123, 32, 2011],
        ["Latte", 231, 14, 2011],
        ["Tofu", 235, 5, 2011],
        ["Milk Tee", 341, 25, 2011],
        ["Porridge", 122, 29, 2011],
        ["Cake", 143, 30, 2012],
        ["Latte", 201, 19, 2012],
        ["Tofu", 255, 7, 2012],
        ["Milk Tee", 241, 27, 2012],
        ["Porridge", 102, 34, 2012],
        ["Cake", 153, 28, 2013],
        ["Latte", 181, 21, 2013],
        ["Tofu", 395, 4, 2013],
        ["Milk Tee", 281, 31, 2013],
        ["Porridge", 92, 39, 2013],
        ["Cake", 223, 29, 2014],
        ["Latte", 211, 17, 2014],
        ["Tofu", 345, 3, 2014],
        ["Milk Tee", 211, 35, 2014],
        ["Porridge", 72, 24, 2014],
      ],
    },
    {
      transform: {
        type: "filter",
        config: { dimension: "Year", "=": 2011 },
        // 这个筛选条件表示，遍历数据，筛选出维度（ dimension ）
        // 'Year' 上值为 2011 的所有数据项。
      },
    },
  ],
  series: {
    type: "pie",
    datasetIndex: 1,
  },
};
```

config.dimension 指定了维度，能设成这样的值：
| 设定成声明在 dataset 中的维度名，例如 config: { dimension: 'Year', '=': 2011 }。不过， dataset 中维度名的声明并非强制，所以我们也可以
| 设定成 dataset 中的维度 index （index 值从 0 开始）例如 config: { dimension: 3, '=': 2011 }。

关系操作符，可以设定这些： >（gt）、>=（gte）、<（lt）、<=（lte）、=（eq）、!=（ne、<>）、reg。（小括号中的符号或名字，是别名，设置起来作用相同）。他们首先基本地能基于数值大小进行比较，然后也有些额外的功能特性：
| 多个关系操作符能声明在一个 {} 中，例如 { dimension: 'Price', '>=': 20, '<': 30 }。这表示“与”的关系，即，筛选出价格大于等于 20 小于 30 的数据项。
| data 里的值，不仅可以是数值（ number ），也可以是“类数值的字符串”（“ numeric string ”）。“类数值的字符串”本身是一个字符串，但是可以被转换为字面所描述的数值，例如 ' 123 '。转换过程中，空格（全角半角空格）和换行符都能被消除（ trim ）。
| 如果我们需要对日期对象（JS Date）或者日期字符串（如 '2012-05-12'）进行比较，我们需要手动指定 parser: 'time'，例如 config: { dimension: 3, lt: '2012-05-12', parser: 'time' }。
| 纯字符串比较也被支持，但是只能用在 = 或 != 上。而 >, >=, <, <= 并不支持纯字符串比较，也就是说，这四个操作符的右值，不能是字符串。
| reg 操作符能提供正则表达式比较。例如， { dimension: 'Name', reg: /\s+Müller\s\*$/ } 能在 'Name' 维度上选出姓 'Müller' 的数据项。

我们也支持了逻辑比较操作符 与或非（ and | or | not ）：

```js
option = {
  dataset: [
    {
      source: [
        // ...
      ],
    },
    {
      transform: {
        type: "filter",
        config: {
          // 使用 and 操作符。
          // 类似地，同样的位置也可以使用 “or” 或 “not”。
          // 但是注意 “not” 后应该跟一个 {...} 而非 [...] 。
          and: [
            { dimension: "Year", "=": 2011 },
            { dimension: "Price", ">=": 20, "<": 30 },
          ],
        },
        // 这个表达的是，选出 2011 年价格大于等于 20 但小于 30 的数据项。
      },
    },
  ],
  series: {
    type: "pie",
    datasetIndex: 1,
  },
};
```

and/or/not 自然可以被嵌套，例如：

```js
transform: {
  type: 'filter',
  config: {
    or: [{
      and: [{
        dimension: 'Price', '>=': 10, '<': 20
      }, {
        dimension: 'Sales', '<': 100
      }, {
        not: { dimension: 'Product', '=': 'Tofu' }
      }]
    }, {
      and: [{
        dimension: 'Price', '>=': 10, '<': 20
      }, {
        dimension: 'Sales', '<': 100
      }, {
        not: { dimension: 'Product', '=': 'Cake' }
      }]
    }]
  }
}
```

还可以指定“解析器”（ parser ）来对值进行解析后再做比较。现在支持的解析器有：
| parser: 'time'：把原始值解析成时间戳（ timestamp ）后再做比较。这个解析器的行为，和 echarts.time.parse 相同，即，当原始值为时间对象（ JS Date 实例），或者是时间戳，或者是描述时间的字符串（例如 '2012-05-12 03:11:22' ），都可以被解析为时间戳，然后就可以基于数值大小进行比较。如果原始数据是其他不可解析为时间戳的值，那么会被解析为 NaN。
| parser: 'trim'：如果原始数据是字符串，则把字符串两端的空格（全角半角）和换行符去掉。如果不是字符串，还保持为原始数据。
| parser: 'number'：强制把原始数据转成数值。如果不能转成有意义的数值，那么转成 NaN。在大多数场景下，我们并不需要这个解析器，因为按默认策略，“像数值的字符串”就会被转成数值。但是默认策略比较严格，这个解析器比较宽松，如果我们遇到含有尾缀的字符串（例如 '33%', 12px），我们需要手动指定 parser: 'number'，从而去掉尾缀转为数值才能比较。

这个例子显示了如何使用 parser: 'time'：

```js
option = {
  dataset: [
    {
      source: [
        ["Product", "Sales", "Price", "Date"],
        ["Milk Tee", 311, 21, "2012-05-12"],
        ["Cake", 135, 28, "2012-05-22"],
        ["Latte", 262, 36, "2012-06-02"],
        ["Milk Tee", 359, 21, "2012-06-22"],
        ["Cake", 121, 28, "2012-07-02"],
        ["Latte", 271, 36, "2012-06-22"],
        // ...
      ],
    },
    {
      transform: {
        type: "filter",
        config: {
          dimension: "Date",
          ">=": "2012-05",
          "<": "2012-06",
          parser: "time",
        },
      },
    },
  ],
};
```

4.4 数据转换器 "sort"

"sort" 是另一个内置的数据转换器，用于排序数据。目前主要能用于在类目轴（ axis.type: 'category' ）中显示排过序的数据。例如：

```js
option = {
  dataset: [
    {
      dimensions: ["name", "age", "profession", "score", "date"],
      source: [
        [" Hannah Krause ", 41, "Engineer", 314, "2011-02-12"],
        ["Zhao Qian ", 20, "Teacher", 351, "2011-03-01"],
        [" Jasmin Krause ", 52, "Musician", 287, "2011-02-14"],
        ["Li Lei", 37, "Teacher", 219, "2011-02-18"],
        [" Karle Neumann ", 25, "Engineer", 253, "2011-04-02"],
        [" Adrian Groß", 19, "Teacher", null, "2011-01-16"],
        ["Mia Neumann", 71, "Engineer", 165, "2011-03-19"],
        [" Böhm Fuchs", 36, "Musician", 318, "2011-02-24"],
        ["Han Meimei ", 67, "Engineer", 366, "2011-03-12"],
      ],
    },
    {
      transform: {
        type: "sort",
        // 按分数排序
        config: { dimension: "score", order: "asc" },
        print: true,
      },
    },
  ],
  xAxis: { type: "category" },
  yAxis: {},
  series: [
    {
      type: "bar",
      datasetIndex: 1,
      encode: {
        x: "name",
        y: "score",
      },
    },
  ],
  // ...
};
```

<!-- 9 -->

数据转换器 "sort" 还有一些额外的功能：

可以多重排序，多个维度一起排序。见下面的例子。

排序规则是这样的：
| 默认按照数值大小排序。其中，“可转为数值的字符串”也被转换成数值，和其他数值一起按大小排序。
| 对于其他“不能转为数值的字符串”，也能在它们之间按字符串进行排序。这个特性有助于这种场景：把相同标签的数据项排到一起，尤其是当多个维度共同排序时。见下面的例子。
| 当“数值及可转为数值的字符串”和“不能转为数值的字符串”进行排序时，或者它们和“其他类型的值”进行比较时，它们本身是不知如何进行比较的。那么我们称呼“后者”为“incomparable”，并且可以设置 incomparable: 'min' | 'max' 来指定一个“incomparable”在这个比较中是最大还是最小，从而能使它们能产生比较结果。这个设定的用途，比如可以是，决定空值（例如 null, undefined, NaN, '', '-'）在排序的头还是尾。

解析器 parser: 'time' | 'trim' | 'number' 可以被使用，和数据转换器 "filter" 中的情况一样。
| 如果要对时间进行排序（例如，值为 JS Date 实例或者时间字符串如 '2012-03-12 11:13:54'），我们需要声明 parser: 'time'。
| 如果需要对有后缀的数值进行排序（如 '33%', '16px'）我们需要声明 parser: 'number'。

这是一个“多维度排序”的例子。

```js
option = {
  dataset: [
    {
      dimensions: ["name", "age", "profession", "score", "date"],
      source: [
        [" Hannah Krause ", 41, "Engineer", 314, "2011-02-12"],
        ["Zhao Qian ", 20, "Teacher", 351, "2011-03-01"],
        [" Jasmin Krause ", 52, "Musician", 287, "2011-02-14"],
        ["Li Lei", 37, "Teacher", 219, "2011-02-18"],
        [" Karle Neumann ", 25, "Engineer", 253, "2011-04-02"],
        [" Adrian Groß", 19, "Teacher", null, "2011-01-16"],
        ["Mia Neumann", 71, "Engineer", 165, "2011-03-19"],
        [" Böhm Fuchs", 36, "Musician", 318, "2011-02-24"],
        ["Han Meimei ", 67, "Engineer", 366, "2011-03-12"],
      ],
    },
    {
      transform: {
        type: "sort",
        config: [
          // 对两个维度按声明的优先级分别排序。
          { dimension: "profession", order: "desc" },
          { dimension: "score", order: "desc" },
        ],
      },
    },
  ],
  series: {
    type: "bar",
    datasetIndex: 1,
  },
  //...
};
```

5. 坐标轴

5.1 x 轴、y 轴

x 轴和 y 轴都由轴线、刻度、刻度标签、轴标题四个部分组成。部分图表中还会有网格线来帮助查看和计算数据

<!-- 10 -->

普通的二维数据坐标系都有 x 轴和 y 轴，通常情况下，x 轴显示在图表的底部，y 轴显示在左侧，一般配置如下：

```js
option = {
  xAxis: {
    // ...
  },
  yAxis: {
    // ...
  },
};
```

x 轴常用来标示数据的维度，维度一般用来指数据的类别，是观察数据的角度，例如“销售时间” “销售地点” “产品名称”等。y 轴常常用来标示数据的数值，数值是用来具体考察某一类数据的数量值，也是我们需要分析的指标，例如“销售数量”和“销售金额”等。

```js
option = {
  xAxis: {
    type: "time",
    name: "销售时间",
    // ...
  },
  yAxis: {
    type: "value",
    name: "销售数量",
    // ...
  },
  // ...
};
```

当 x 轴（水平坐标轴）跨度很大，可以采用区域缩放方式灵活显示数据内容。

```js
option = {
  xAxis: {
    type: "time",
    name: "销售时间",
    // ...
  },
  yAxis: {
    type: "value",
    name: "销售数量",
    // ...
  },
  dataZoom: [
    // ...
  ],
  // ...
};
```

在二维数据中，轴也可以有多个。ECharts 中一般情况下单个 grid 组件最多只能放两个 x/y 轴，多于两个 x/y 轴需要通过配置 offset 属性防止同个位置多个轴的重叠。两个 x 轴显示在上下，两个 y 轴显示在左右两侧。

```js
option = {
  xAxis: {
    type: "time",
    name: "销售时间",
    // ...
  },
  yAxis: [
    {
      type: "value",
      name: "销售数量",
      // ...
    },
    {
      type: "value",
      name: "销售金额",
      // ...
    },
  ],
  // ...
};
```

5.2 轴线

ECharts 提供了轴线 axisLine 相关的配置，我们可以根据实际情况调整，例如轴线两端的箭头，轴线的样式等。

```js
option = {
  xAxis: {
    axisLine: {
      symbol: "arrow",
      lineStyle: {
        type: "dashed",
        // ...
      },
    },
    // ...
  },
  yAxis: {
    axisLine: {
      symbol: "arrow",
      lineStyle: {
        type: "dashed",
        // ...
      },
    },
  },
  // ...
};
```

5.3 刻度

ECharts 提供了轴线 axisTick 相关的配置，我们可以根据实际情况调整，例如刻度线的长度，样式等。

```js
option = {
  xAxis: {
    axisTick: {
      length: 6,
      lineStyle: {
        type: "dashed",
        // ...
      },
    },
    // ...
  },
  yAxis: {
    axisTick: {
      length: 6,
      lineStyle: {
        type: "dashed",
        // ...
      },
    },
  },
  // ...
};
```

5.4 刻度标签

ECharts 提供了轴线 axisLabel 相关的配置，我们可以根据实际情况调整，例如文字对齐方式，自定义刻度标签内容等。

```js
option = {
  xAxis: {
    axisLabel: {
      formatter: "{value} kg",
      align: "center",
      // ...
    },
    // ...
  },
  yAxis: {
    axisLabel: {
      formatter: "{value} 元",
      align: "center",
      // ...
    },
  },
  // ...
};
```

5.5 示例

图左侧的 y 轴代表东京月平均气温，右侧的 y 轴表示东京降水量，x 轴表示时间。两组 y 轴在一起，反映了平均气温和降水量间的趋势关系。

```js
option = {
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "cross" },
  },
  legend: {},
  xAxis: [
    {
      type: "category",
      axisTick: {
        alignWithLabel: true,
      },
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "降水量",
      min: 0,
      max: 250,
      position: "right",
      axisLabel: {
        formatter: "{value} ml",
      },
    },
    {
      type: "value",
      name: "温度",
      min: 0,
      max: 25,
      position: "left",
      axisLabel: {
        formatter: "{value} °C",
      },
    },
  ],
  series: [
    {
      name: "降水量",
      type: "bar",
      yAxisIndex: 0,
      data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3],
    },
    {
      name: "温度",
      type: "line",
      smooth: true,
      yAxisIndex: 1,
      data: [
        6.0, 10.2, 10.3, 11.5, 10.3, 13.2, 14.3, 16.4, 18.0, 16.5, 12.0, 5.2,
      ],
    },
  ],
};
```

<!-- 11 -->

6. 视觉映射

数据可视化是数据到视觉元素的映射过程（这个过程也可称为视觉编码，视觉元素也可称为视觉通道）。
ECharts 的每种图表本身就内置了这种映射过程，比如折线图把数据映射到“线”，柱状图把数据映射到“长度”。一些更复杂的图表，如关系图、事件河流图、树图也都会做出各自内置的映射。
此外，ECharts 还提供了 visualMap 组件 来提供通用的视觉映射。visualMap 组件中可以使用的视觉元素有：
| 图形类别（symbol）、图形大小（symbolSize）
| 颜色（color）、透明度（opacity）、颜色透明度（colorAlpha）、
| 颜色明暗度（colorLightness）、颜色饱和度（colorSaturation）、色调（colorHue）

6.1 数据和维度

ECharts 中的数据，一般存放于 series.data 中。根据图表类型不同，数据的具体形式也可能有些许差异。比如可能是“线性表“、“树“、“图“等。但他们都有个共性：都是“数据项（dataItem）“的集合。每个数据项含有“数据值（value）“和其他信息（如果需要的话）。每个数据值，可以是单一的数值（一维）或者一个数组（多维）。

例如，series.data 最常见的形式，是“线性表“，即一个普通数组：

```js
series: {
  data: [
    {
      // 这里每一个项就是数据项（dataItem）
      value: 2323, // 这是数据项的数据值（value）
      itemStyle: {},
    },
    1212, // 也可以直接是 dataItem 的 value，这更常见。
    2323, // 每个 value 都是“一维“的。
    4343,
    3434,
  ];
}
```

```js
series: {
  data: [
    {
      // 这里每一个项就是数据项（dataItem）
      value: [3434, 129, "圣马力诺"], // 这是数据项的数据值（value）
      itemStyle: {},
    },
    [1212, 5454, "梵蒂冈"], // 也可以直接是 dataItem 的 value，这更常见。
    [2323, 3223, "瑙鲁"], // 每个 value 都是“三维“的，每列是一个维度。
    [4343, 23, "图瓦卢"], // 假如是“气泡图“，常见第一维度映射到x轴，
    // 第二维度映射到y轴，
    // 第三维度映射到气泡半径（symbolSize）
  ];
}
```

在图表中，往往默认把 value 的前一两个维度进行映射，比如取第一个维度映射到 x 轴，取第二个维度映射到 y 轴。如果想要把更多的维度展现出来，可以借助 visualMap。最常见的情况，散点图（scatter） 使用半径展现了第三个维度。

6.2 visualMap 组件

visualMap 组件定义了把数据的哪个维度映射到什么视觉元素上。现在提供如下两种类型的 visualMap 组件，通过 visualMap.type 来区分。

其定义结构例如：

```js
option = {
  visualMap: [
    // 可以同时定义多个 visualMap 组件。
    {
      // 第一个 visualMap 组件
      type: "continuous", // 定义为连续型 visualMap
      // ...
    },
    {
      // 第二个 visualMap 组件
      type: "piecewise", // 定义为分段型 visualMap
      // ...
    },
  ],
  // ...
};
```

7. 图例

图例是图表中对内容区元素的注释、用不同形状、颜色、文字等来标示不同数据列，通过点击对应数据列的标记，可以显示或隐藏该数据列。图例虽然不是图表中的主要信息、却是了解图表信息的钥匙。

7.1 布局

图例一般放在图表的右上角、也可以放在图表的底部、同一页面中的所有图例位置保持一致，可以横排对齐也可以纵排对齐。还要综合考虑整体的图表空间是适合哪种摆放方式。当图表纵向空间紧张或者内容区量过大的时候、建议摆放在图表的下方。下面是几种图例的摆放方式：

```js
option = {
  legend: {
    // Try 'horizontal'
    orient: "vertical",
    right: 10,
    top: "center",
  },
  dataset: {
    source: [
      ["product", "2015", "2016", "2017"],
      ["Matcha Latte", 43.3, 85.8, 93.7],
      ["Milk Tea", 83.1, 73.4, 55.1],
      ["Cheese Cocoa", 86.4, 65.2, 82.5],
      ["Walnut Brownie", 72.4, 53.9, 39.1],
    ],
  },
  xAxis: { type: "category" },
  yAxis: {},
  series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
};
```

对于图例较多时，可以使用可滚动翻页的图例

```js
option = {
  legend: {
    type: "scroll",
    orient: "vertical",
    right: 10,
    top: 20,
    bottom: 20,
    data: ["图例一", "图例二", "图例三" /* ... */, , "图例n"],
    // ...
  },
  // ...
};
```

7.2 样式

在深色系背景下、为了方便阅读，建议给图例加上半透明的浅色背景层，文字颜色设置为浅色。

```js
option = {
  legend: {
    data: ["图例一", "图例二", "图例三"],
    backgroundColor: "#ccc",
    textStyle: {
      color: "#ccc",
      // ...
    },
    // ...
  },
  // ...
};
```

7.3 交互

根据场景需要，图例可支持交互操作，点击控制显示或隐藏对应的数据列；

```js
option = {
  legend: {
    data: ["图例一", "图例二", "图例三"],
    selected: {
      图例一: true,
      图例二: true,
      图例三: false,
    },
    // ...
  },
  // ...
};
```

7.4 图例注意事项

图例要注意视情况使用，有些双轴图包含了多种图表类型，不同类型的图例样式要有所区分。

```js
option = {
  legend: {
    data: [
      {
        name: "图例一",
        icon: "rect",
      },
      {
        name: "图例二",
        icon: "circle",
      },
      {
        name: "图例三",
        icon: "pin",
      },
    ],
    // ...
  },
  series: [
    {
      name: "图例一",
      // ...
    },
    {
      name: "图例二",
      // ...
    },
    {
      name: "图例三",
      // ...
    },
  ],
  // ...
};
```

8. 事件与行为

在 Apache ECharts 的图表中用户的操作将会触发相应的事件。开发者可以监听这些事件，然后通过回调函数做相应的处理，比如跳转到一个地址，或者弹出对话框，或者做数据下钻等等。

ECharts 中的事件名称对应 DOM 事件名称，均为小写的字符串，如下是一个绑定点击操作的示例。

```js
myChart.on("click", function (params) {
  // 控制台打印数据的名称
  console.log(params.name);
});
```

在 ECharts 中事件分为两种类型，一种是用户鼠标操作点击，或者 hover 图表的图形时触发的事件，还有一种是用户在使用可以交互的组件后触发的行为事件，例如在切换图例开关时触发的 'legendselectchanged' 事件（这里需要注意切换图例开关是不会触发 'legendselected' 事件的），数据区域缩放时触发的 'datazoom' 事件等等。

8.1 鼠标事件的处理

ECharts 支持常规的鼠标事件类型，包括 'click'、 'dblclick'、 'mousedown'、 'mousemove'、 'mouseup'、 'mouseover'、 'mouseout'、 'globalout'、 'contextmenu' 事件。下面先来看一个简单的点击柱状图后打开相应的百度搜索页面的示例。

```js
// 基于准备好的dom，初始化ECharts实例
// var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
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
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
// 处理点击事件并且跳转到相应的百度搜索页面
myChart.on("click", function (params) {
  window.open("https://www.baidu.com/s?wd=" + encodeURIComponent(params.name));
});
```

如何区分鼠标点击到了哪里：

```js
myChart.on("click", function (params) {
  if (params.componentType === "markPoint") {
    // 点击到了 markPoint 上
    if (params.seriesIndex === 5) {
      // 点击到了 index 为 5 的 series 的 markPoint 上。
    }
  } else if (params.componentType === "series") {
    if (params.seriesType === "graph") {
      if (params.dataType === "edge") {
        // 点击到了 graph 的 edge（边）上。
      } else {
        // 点击到了 graph 的 node（节点）上。
      }
    }
  }
});
```

8.2 组件交互的行为事件

在 ECharts 中基本上所有的组件交互行为都会触发相应的事件，常用的事件和事件对应参数在 events 文档中有列出。

下面是监听一个图例开关的示例：

```js
// 图例开关的行为只会触发 legendselectchanged 事件
myChart.on("legendselectchanged", function (params) {
  // 获取点击图例的选中状态
  var isSelected = params.selected[params.name];
  // 在控制台中打印
  console.log((isSelected ? "选中了" : "取消选中了") + "图例" + params.name);
  // 打印所有图例的状态
  console.log(params.selected);
});
```

代码触发 ECharts 中组件的行为

上面提到诸如 'legendselectchanged' 事件会由组件交互的行为触发，那除了用户的交互操作，有时候也会有需要在程序里调用方法触发图表的行为，诸如显示 tooltip，选中图例。

在 ECharts 通过调用 myChart.dispatchAction({ type: '' }) 触发图表行为，统一管理了所有动作，也可以方便地根据需要去记录用户的行为路径。

常用的动作和动作对应参数在 action 文档中有列出。

下面示例演示了如何通过 dispatchAction 去轮流高亮饼图的每个扇形。

```js
option = {
  title: {
    text: "饼图程序调用高亮示例",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

let currentIndex = -1;

setInterval(function () {
  var dataLen = option.series[0].data.length;
  // 取消之前高亮的图形
  myChart.dispatchAction({
    type: "downplay",
    seriesIndex: 0,
    dataIndex: currentIndex,
  });
  currentIndex = (currentIndex + 1) % dataLen;
  // 高亮当前图形
  myChart.dispatchAction({
    type: "highlight",
    seriesIndex: 0,
    dataIndex: currentIndex,
  });
  // 显示 tooltip
  myChart.dispatchAction({
    type: "showTip",
    seriesIndex: 0,
    dataIndex: currentIndex,
  });
}, 1000);
```

<!-- 13 -->

8.4 监听“空白处”的事件

有时候，开发者需要监听画布的“空白处”所触发的事件。比如，当需要在用户点击“空白处”的时候重置图表时。在讨论这个功能之前，我们需要先明确两种事件。zrender 事件和 echarts 事件。

```js
myChart.getZr().on("click", function (event) {
  // 该监听器正在监听一个`zrender 事件`。
});
myChart.on("click", function (event) {
  // 该监听器正在监听一个`echarts 事件`。
});
```

zrender 事件与 echarts 事件不同。前者是当鼠标在任何地方都会被触发，而后者是只有当鼠标在图形元素上时才能被触发。事实上，echarts 事件是在 zrender 事件的基础上实现的，也就是说，当一个 zrender 事件在图形元素上被触发时，echarts 将触发一个 echarts 事件给开发者。

有了 zrender 事件，我们就可以实现监听空白处的事件，具体如下：

```js
myChart.getZr().on("click", function (event) {
  // 没有 target 意味着鼠标/指针不在任何一个图形元素上，它是从“空白处”触发的。
  if (!event.target) {
    // 点击在了空白处，做些什么。
  }
});
```

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
