## 变形

```css
/* transform主要有：旋转rotate、缩放scale、移动translate、扭曲skew、矩阵变形matrix */
div {
  tranform: rotate(10deg) scale(1.2) translate(10px, 10px);
}

/* 3d 转换，在变换盒子的父级添加透视效果 */
.father {
  perspective: 500px;
}
div {
  transform: rotateX(100deg) translateZ(17.5px);
}
```

## 过渡

```css
/* 过度和动画的过度曲线有：ease：慢-快-慢、linear：匀速、ease-in：慢-快、ease-out：快-慢、ease-in-out：慢-快-慢、cubic-bezier(n,n,n,n)：三次贝塞尔定义 */
/* transition属性有4个基本要素，分别是要过度的属性，动画时长，动画演变速度，延迟时间。 */
div {
  transition: width 1s linear 0s;
}
/* 什么属性，动画时长，变化速度曲线，延迟时间 */
```

## 动画

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
