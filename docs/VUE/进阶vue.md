## $set

1. 不调用接口，只改变一个对象的值

```js
this.$set(item, 'key', value);
```

## 经常忘的属性

1. provide / inject

用法：provide / inject 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

```js
// 祖先
provide() {
  return {
    text: this
  }
}

// 子
inject: ['text']
```