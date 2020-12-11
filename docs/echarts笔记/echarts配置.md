# 配置笔记

1. 网格--grid

```js
grid: {
  show: false,   // 是否显示边框
  z: 2,   // 控制图形的前后顺序,z越大越在上
  left: 10%,   // 组件距离容器上下左右得距离
  top: 60,
  right: 10%,
  bottom: 60,
  width: auto,   // 组件得宽高
  height: auto,
  containLabel: false,   // 区域是否包含坐标轴的刻度标签
  backgroundColor: transparent,   // 网格背景色 前提： show: true
  borderColor: #ccc, // 网格边框颜色 前提： show: true
  borderWidth: 1, // 边框线宽 前提： show: true
}
```

2. x轴--xAxis

```js
xAxis: {
  type: 'category', // 坐标轴类型，value:数值，category：类目，必须设置data，time：时间，log：对数，
  axisTick: {
    show: true, // 是否显示刻度
  },
  axisLine: {
    show: true, //是否显示轴线
  }
}
```

3. 头部--legend

```js
legend: {
  left: auto, //距离容器上下左右得距离
  rop: auto,
  right: auto,
  bottom: auto,
  width: auto, // 组件得宽高
  height: auto,
  orient: 'horizontal', // 布局朝向 vertical垂直
  align: auto, // 对齐方式left, right
  padding: 5, // [5,5,5,5]上右下左内边距
  itemHeight: 10, // 改变icon大小
  itemGap: 10, // 间距
  data: [{
    name: '系列1',
    icon: 'circle',
    textStyle: {
      color: 'red'
    }
  }]
}
```

4. 提示框--tooltip

```js
tooltip: {
  trigger: "axis", // axis:多条， item：单条
  formatter: function(params) {
    var htmlStr = "";
    for (var i = 0; i < params.length; i++) {
      var param = params[i];
      var xName = param.name; //x轴的名称
      var seriesName = param.seriesName; //图例名称
      var value = param.value; //y轴值
      var color = param.color; //图例颜色

      if (i === 0) {
        htmlStr += xName + "<br/>"; //x轴的名称
      }
      htmlStr += `<div>
                    <span style='margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;border: 1px solid #fff;background-color:${color};'>
                    </span>
                    ${seriesName}：${value}
                  </div>`;
    }
    return htmlStr;
  },
  backgroundColor: "rgba(0,182,206,0.8)"
}
```