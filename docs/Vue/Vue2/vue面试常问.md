# vue 面试常问

## 是mvvm模式

```
model,view,viewModel
```

## vue底层原理

```
1. 数据劫持 + 发布订阅者模式
Observer: 数据劫持
```

## watch和computed区别

```
watch: 1.监听一个值变化而执行相应回调 2.发生改变，就调用回调 3.可以没有return 4.影响多个属性 5.可以有异步
computed: 1.计算属性 2.依赖的属性不变时，调用缓存 3.必须又return 4.受多个属性影响 5.不能有异步
```

## vue组件通信

```
1. props/$emit
    父子组件之间的传递

2. $emit/$on
    通过一个空的Vue实例作为中央事件总线
```

## vuex有什么作用

```
项目过大时，选用vuex
```