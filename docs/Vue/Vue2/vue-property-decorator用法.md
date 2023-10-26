# vue-property-decorator 用法

前言：vue2.0 支持 ts，需要用到 vue-property-decorator

1. 安装

```js
npm i -D vue-property-decorator
```

2. 用法

```js
// vue, compnent 必引入，其他按需引用
import { Vue, Component, Prop, PropSync, Watch, Emit } from "vue-property-decorator";
// 必须的
@Component();
export default class Demo extends Vue {
  // Prop, ! 表示非 null，非 undefined
  @Prop({ default: 18 })
  age!: number;
  // PropSync, 实现组件双向绑定，可以修改传过来的值
  @PropSync('sex', { type: String })
  syncedsex!: string;
  // data
  name: string = 'yqcoder';
  // Watch
  @Watch('name', { immediate: true, deep: true })
  onChangeName(new, old) {}
  // computed
  get nameL() {
    return this.name.length
  }
  // Emit: this.$emit('reset-name', 'yq')
  @Emit()
  resetName() {
    return 'yq'
  }
}
```
