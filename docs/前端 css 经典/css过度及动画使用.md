# css 过渡及动画

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
@keyframes demo {
  0% {
    width: 0px;
  }
  25% {
    width: 25px;
  }
  50% {
    width: 50px;
  }
  75% {
    width: 75px;
  }
  100% {
    width: 100px;
  }
}

div {
  animation: demo 2s ease-in-out;
}
```
