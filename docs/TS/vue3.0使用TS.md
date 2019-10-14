<h1 align="center">vue3.0使用TS</h1>

## [引入 vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

```ts
// 统一引用，下面的例子就不引用了
import { Component, Prop, Vue, PropSync, Watch, Emit } from "vue-property-decorator";
```

1. 组件

```ts
@Component({
    components: { componentA, componentB }
})
```

2. Prop

```ts
@Prop(Number) readonly propA: number | undefined;
@Prop({ default: 'default value' }) readonly propB!: string;
@Prop([String, Boolean]) readonly propC: string | boolean | undefined;
// 等价于
props: {
    propA: {
        type: Number
    },
    propB: {
        default: 'default value'
    },
    propC: {
        type: [ String | Boolean]
    }
}
```

3. PropSync

```ts
@PropSync('name', { type: String }) syncedName!: string
//等价于
props: {
    name: {
        type: String
    }
},
compouted: {
    syncedName: {
        get() {
            return this.name;
        },
        set() {
            this.$emit('update:name', value)
        }
    }
}
```

4. Watch

```ts
@Watch('child')
onChildChanged(val: string, oldVal: string) {}
@Watch('person', { immediate: true, deep: true })
onPersonChanged1(val: Person, oldVal: Person) {}
@Watch('person')
onPersonChanged2(val: Person, oldVal: Person) {}
// 等价于
watch: {
    child: [
        handler: 'onChildChanged',
        immediate: false,
        deep: false
    ],
    person: [
        {
        handler: 'onPersonChanged1',
        immediate: true,
        deep: true
        },
        {
            handler: 'onPersonChanged2',
            immediate: false,
            deep: false
        }
    ]
},
methods: {
    onChildChanged(val, oldVal) {},
    onPersonChanged1(val, oldVal) {},
    onPersonChanged2(val, oldVal) {}
}
```

5. Emit

```ts
@Emit()
addToCount(n: number) {
    this.count += n
}
@Emit('reset')
resetCount() {
    this.count = 0
}
@Emit()
returnValue() {
    return 10
}
@Emit()
onInputChange(e) {
    return e.target.value
}
@Emit()
promise() {
return new Promise(resolve => {
    setTimeout(() => {
        resolve(20)
        }, 0)
    })
}
// 等价于
addToCount(n) {
    this.count += n
    this.$emit('add-to-count', n)
},
resetCount() {
    this.count = 0
    this.$emit('reset')
},
returnValue() {
    this.$emit('return-value', 10)
},
onInputChange(e) {
    this.$emit('on-input-change', e.target.value, e)
},
promise() {
    const promise = new Promise(resolve => {
    setTimeout(() => {
        resolve(20)
    }, 0)
    })

    promise.then(value => {
        this.$emit('promise', value)
    })
}
```
