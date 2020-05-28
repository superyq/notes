# echarts学习笔记

1. 基础属性

title:标题组件 
tooltip:提示框组件 
legend：图例组件，展现了不同系列的标记(symbol)，颜色和名字 
xAxis：直角坐标系 grid 中的 x 轴，单个 grid 组件最多只能放上下两个 x 轴。 
yAxis:直角坐标系 grid 中的 y 轴，单个 grid 组件最多只能放左右两个 y 轴。 
series:系列列表。每个系列通过 type 决定自己的图表类型。 

2. 基础用法（vue中）

```js
\\ html
.data-chart(style='width: 100%;height: 100%;')

\\ js
data() {
  return {
    chart: null
  };
},
watch: {
  options() {
    this.reloadChart();
  }
},
methods: {
  reloadChart() {
    // 2. 设置配置
    this.chart.setOption(this.options);
  },
  resizeChart() {
    this.chart.resize();
  }
},
mounted() {
  // 1.获得节点
  this.chart = echarts.init(this.$el);

  this.$nextTick(() => {
    this.reloadChart();
    on(window, "resize", this.resizeChart);
  });
},
beforeDestroy() {
  off(window, "resize", this.resizeChart);
}
```


3. a,b,c,d代表

折线（区域）图、柱状（条形）图、K线图 : {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）

散点图（气泡）图 : {a}（系列名称），{b}（数据名称），{c}（数值数组）, {d}（无）

地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）

饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）