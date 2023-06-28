# transition 过渡和 animation 动画

1. transition 过渡动画

给 dom 元素添加变形、变形的过程添加动画

```css
/* 元素变形种类 2D */
/* 移动：translate(100px, 100px) 水平和垂直方向各移动100px。*/
/* 旋转：rotate(60deg) 顺时针旋转60度 */
/* 缩放：scale(0.5) 缩小一半， 1表示不表，大于1是放大 */
/* 倾斜：skew(30deg, 30deg) 水平和垂直方向和顺时针倾斜30度。*/
.active {
  transform: translate(100px, 100px) rotate(60deg) scale(0.5) skew(30deg, 30deg);
  /* transition: 过渡的属性 完成时间(s) 运动曲线 延迟时间 */
  /* 运动曲线: ease：减速、linear：匀速、ease-in：加速、ease-out：减速、*/
  /*          ease-in-out：先加后减、cubic-bezier(n,n,n,n)：三次贝塞尔定义 */
  transition: all 3s linear 0s;
}

/* 元素变形种类 3D */
/* 3D 变形首先要给变形DOM一个父级DOM，并且父级DOM设置 perspective， 添加透视效果*/
/* 旋转：rotateX(), rotateY()，rotateZ() 围绕X,Y,Z轴旋转 */
/* 移动：translateX()，translateY（），translateZ（） 延X,Y,Z轴平移*/
.father {
  perspective: 500px;
}
```

2. keyframes 自定义动画

```css
/* 定义动画 */
@keyframes demo {
  0% {
    transform: translate(0px);
  }
  100% {
    transform: translate(200px);
  }
}
/* or */
@keyframes demo {
  from {
    transform: translate(0px);
  }
  to {
    transform: translate(200px);
  }
}

/* 使用动画 */
div {
  /* 简写 */
  /* animation：动画名称 动画时长（有这两个即可以完成动画，其它未设置，有默认值） */
  animation: demo 2s;
  /* animation：动画名称 动画时长 动画运动速度 延迟时间 执行次数 往返动画 */
  animation: demo 2s linear 0 infinite;

  /* 详写 */
  /* 动画名称 */
  animation-name: demo;
  /* 持续时间 */
  animation-duration: 1s;
  /* 运动曲线 和 transition 的运动曲线一样 */
  animation-timing-function: linear;
  /* 何时开始 */
  animation-delay: 0;
  /* 重复次数 iteration 重复的   count 次数  infinite无限 */
  animation-iteration-count: infinite;
  /* 是否反方向播放  默认normal  想反方向就写alternate*/
  animation-direction: alternate;
  /* 动画结束后状态默认backwards  回到起始状态 我们可以让他停留在结束状态forwards */
  animation-fill-mode: forwards;
}
```
