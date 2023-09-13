# vue-property-decorator 用法

1.  示例

```ts
import { Vue, Component } from "vue-property-decorator";
// 必须有，不然@Prop失效
@Component();
export default class Demo extends Vue {
    // 变量
    variableA = 'demo'
    // 方法
    onFn() {}
    //    
}
```

2. Prop

```ts

```
