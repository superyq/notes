# LogicFlow 速通

前言：参考 [LogicFlow 官网](https://site.logic-flow.cn/tutorial)，功能和 [AntV X6 图编辑引擎速通](https://blog.csdn.net/weixin_64684095/article/details/140258009) 相似。LogicFlow 是一款流程图编辑框架，本文案例在 vue3 中使用。

一、快速开始

1. 安装

```bash
npm install @logicflow/core --save

# 插件包
npm install @logicflow/extension --save
```

2. 在 APP.vue 使用

以下所有案例都在 APP.vue 中构建

2.1 构建 APP.vue 组件

```html
<script setup>
  import { ref, onMounted } from "vue";
  import LogicFlow from "@logicflow/core";
  import { Control } from "@logicflow/extension";
  import "@logicflow/core/lib/style/index.css";
  import "@logicflow/extension/lib/style/index.css";
  import { data, SilentConfig, styleConfig } from "./pluginData";

  let lf = null;
  const container = ref(null);

  onMounted(() => {
    lf = new LogicFlow({
      container: container.value,
      grid: true,
      plugins: [Control],
      ...SilentConfig,
      ...styleConfig,
    });

    lf.render(data);
  });
</script>

<template>
  <div class="container" ref="container"></div>
</template>

<style scoped>
  .container {
    width: 1000px;
    height: 500px;
  }
</style>
```

2.2 构建 pluginData.js

```js
const data = {
  /** 节点 */
  nodes: [
    {
      id: "1",
      type: "rect",
      x: 100,
      y: 100,
      text: "节点1",
    },
    {
      id: "2",
      type: "circle",
      x: 300,
      y: 100,
      text: "节点2",
    },
  ],
  /** 连线 */
  edges: [
    {
      sourceNodeId: "1",
      targetNodeId: "2",
      type: "polyline",
      text: "连线",
      startPoint: {
        x: 140,
        y: 100,
      },
      endPoint: {
        x: 250,
        y: 100,
      },
    },
  ],
};

/** 节点样式 */
const styleConfig = {
  style: {
    rect: {
      rx: 5,
      ry: 5,
      strokeWidth: 2,
    },
    circle: {
      fill: "#f5f5f5",
      stroke: "#666",
    },
  },
};

/** 操作配置 */
const SilentConfig = {
  isSilentMode: true,
  stopScrollGraph: true,
  stopMoveGraph: true,
  stopZoomGraph: true,
  adjustNodePosition: true,
};

export { data, SilentConfig, styleConfig };
```

<!-- 1 -->

二、基础教程

1. 实例

1.1 创建实例

```js
const container = ref(null);
const lf = new LogicFlow({
  container: container.value,
});
```

1.2 图数据

nodes: 包含所有的节点。
edges: 包含所有的边，通过起始 sourceNodeId 和 targetNodeId 将两个节点相连。
| type: 表示节点或者边的类型
| text: text 可以是节点文本，也可以是连线文本
| properties: 每个节点和边都有 properties 属性，包含节点样式、形状属性和业务自定义属性

```js
const graphData = {
  nodes: [
    {
      type: "",
      text: {},
      preperties: {},
    },
  ],
  edges: [],
};
```

1.3 渲染数据

```js
lf.render(graphData);
```

2. 节点 Node

2.1 基础节点

通过 type 设置基础节点：矩形 rect、圆形 circle、椭圆 ellipse、多边形 polygon、菱形 diamod、文本 text、HTML html

```js
const data = {
  nodes: [
    {
      id: "1",
      type: "rect",
      x: 100,
      y: 60,
      text: "矩形",
    },
  ],
};
```

2.2 自定义节点

创建自定义椭圆节点 customEllipse.js

model: 数据层。
view: 视图层。

```js
import { EllipseNode, EllipseNodeModel } from "@logicflow/core";

class CustomEllipseModel extends EllipseNodeModel {
  constructor(data, graphModel) {
    if (data.text && typeof data.text === "string") {
      data.text = {
        // 自定义文本坐标：向下移动40px
        value: data.text,
        x: data.x,
        y: data.y + 40,
      };
    }
    super(data, graphModel);

    // rx：x轴的半径 ry：y轴的半径，通过rx，ry控制椭圆大小
    this.rx = 50;
    this.ry = 20;
  }
}

export default {
  type: "custom-ellipse",
  view: EllipseNode,
  model: CustomEllipseModel,
};
```

注册自定义节点

```js
import CustomEllipse from "./customEllipse.js";
lf.register(CustomEllipse);
```

使用自定义节点

```js
const data = {
  nodes: [
    {
      id: "node_id_1",
      type: "custom-ellipse",
      x: 100,
      y: 60,
      text: "自定义椭圆",
    },
  ],
};
lf.render(data);
```

点击事件

```js
// node 点击事件
lf.on("node:click", ({ data }) => {
  lf.setProperties(data.id, {
    // 改变业务属性
    isClicked: !data.properties.isClicked,
    scale: 0.8, // 缩小
  });
});
```

3. 边 Edge

3.1 基础边

通过 type 设置基础边：直线 line、直线折线 polyline、贝塞尔曲线 bezier

```js
const data = {
  edges: [
    {
      sourceNodeId: "1",
      targetNodeId: "2",
      startPoint: {
        // 起始点
        x: 100,
        y: 60,
      },
      endPoint: {
        // 结束点
        x: 500,
        y: 50,
      },
      type: "polyline",
      text: "polyline",
    },
  ],
};
```

3.2 自定义边

创建自定义边 sequence.js

```js
import { PolylineEdge, PolylineEdgeModel } from "@logicflow/core";

class SequenceModel extends PolylineEdgeModel {
  // 设置边样式
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    const { properties } = this;
    if (properties.isstrokeDashed) {
      style.strokeDasharray = "4, 4";
    }
    style.stroke = "orange";
    return style;
  }

  // 设置边文本样式
  getTextStyle() {
    const style = super.getTextStyle();
    style.color = "#3451F1";
    style.fontSize = 20;
    style.background = Object.assign({}, style.background, {
      fill: "#F2F131",
    });
    return style;
  }

  // 设置 hover 轮廓样式
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = "blue";
    return style;
  }
}

export default {
  type: "sequence",
  view: PolylineEdge,
  model: SequenceModel,
};
```

注册自定义边

```js
import sequence from "./sequence.js";
lf.register(sequence);
```

使用自定义节点

```js
const data = {
  edges: [
    {
      id: "10",
      sourceNodeId: "1",
      targetNodeId: "3",
      startPoint: {
        x: 100,
        y: 60,
      },
      endPoint: {
        x: 500,
        y: 50,
      },
      text: "sequence",
      type: "sequence",
      properties: {
        isstrokeDashed: true, // 是否虚线
      },
    },
  ],
};
lf.render(data);
```

4. 主题 Theme

设置主题两种方式：1. 初始化 LogicFlow 时作为配置传入。2. 初始化后，调用实例的 setTheme 方法。

4.1 配置

```js
const config = {
  domId: 'app',
  width: 1000,
  height: 800,
  style: { // 设置默认主题样式
    rect: { ... }, // 矩形样式
    circle: { ... }, // 圆形样式
    nodeText: { ... }, // 节点文本样式
    edgeText: { ... }, // 边文本样式
    anchor: { ... }, // 锚点样式
    // ...,
  },
}
const lf = new LogicFlow(config)
```

4.2 setTheme

```js
lf.setTheme({ // 设置默认主题样式
  rect: {...}, // 矩形样式
  circle: {...}, // 圆形样式
  nodeText: {...}, // 节点文本样式
  edgeText: {...}, // 边文本样式
  anchor: {...}, // 锚点样式
  // ...
})
```

5. 网格 Grid

5.1 开启网格

```js
const lf1 = new LogicFlow({
  grid: true,
});

// 等同于默认属性如下
const lf2 = new LogicFlow({
  grid: {
    size: 20,
    visible: true,
    type: "dot",
    config: {
      color: "#ababab",
      thickness: 1,
    },
  },
});
```

6. 背景 Background

创建画布时，通过 background 选项来设置画布的背景层样式，支持透传任何样式属性到背景层。默认值为 false 表示没有背景。

```ts
const lf = new LogicFlow({
  background: false | BackgroundConfig,
});

type BackgroundConfig = {
  backgroundImage?: string,
  backgroundColor?: string,
  backgroundRepeat?: string,
  backgroundPosition?: string,
  backgroundSize?: string,
  backgroundOpacity?: number,
  filter?: string, // 滤镜
  [key: any]: any,
ts
```

7. 事件 Event

7.1 监听事件

lf 实例上提供 on 方法支持监听事件。

```js
lf.on("node:dnd-add", (data) => {});
```

LogicFlow 支持用逗号分割事件名。

```js
lf.on("node:click,edge:click", (data) => {});
```
