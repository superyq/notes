<h1 align="center">vue3.0使用TS</h1>

## [引入 vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

```
import { Vue, Component, Prop } from "vue-property-decorator"
@Component
export default class YourComponent from Vue {

\\ @Prop
    @Prop(Number) readonly propA!: number
    @Prop({ default: 'default value' }) readonly propB!: string
    @Prop([String, Boolean]) readonly propC!: string | boolean

\\ @Model
    @Model("change", { type: String }) readonly propA!: string

\\ @Watch
    @Watch('propA')
    onPropaChange(val: string, oldVal: string) {}

\\ @Emit
    @Emit()
    addToCount(n: number) {
        this.count += n
    }
}
```
