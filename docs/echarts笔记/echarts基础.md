# echarts学习笔记

1. 基础用法（vue中）

```
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
    this.chart.setOption(this.options);
  },
  resizeChart() {
    this.chart.resize();
  }
},
mounted() {
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

