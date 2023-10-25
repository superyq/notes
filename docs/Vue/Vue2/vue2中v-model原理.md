# 自定义 v-model

1. input 中的 v-model

```html
<!-- 表单双向绑定 -->
<input :value="username" @input="username = $event.target.value" />
<!-- 等于 -->
<input v-model="username" />
```

2. 自定义组件 v-model

```vue
<!-- 组件双向绑定 -->
<!-- 子 -->
<script>
export default {
  props: {
    value: {
      required: true,
    },
  },
  watch: {
    value(newValue) {
      this.my_input = newValue;
    },
  },
  data() {
    return {
      my_input: this.value,
    };
  },
  methods: {
    handleChange() {
      this.$emit("input", this.my_input);
    },
  },
};
</script>
<template>
  <el-input v-model="my_input" @change="handleChange"></el-input>
</template>

<!-- 父 -->
<my-component v-model="username" />
```
