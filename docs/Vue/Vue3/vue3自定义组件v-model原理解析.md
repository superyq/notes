# vue3 自定义组件 v-model 原理解析

v-model 使用的语法糖

```html
<input 
  type="text" 
  :value="value" 
  @input="value=$event.target.value" 
/>
```

简单自定义 input 组件

```html
<!-- 子组件 -->
<template>
  <input 
    type="text" 
    :value="value" 
    @input="changeInput($event.target.value)" 
  />
</template>
<script setup>
  let props = defineProps({
    value: {
      type: String,
      required: true,
    },
  });
  let emits = defineEmits(["input"]);
  function changeHandle(e) {
    emits("input", e);
  }
</script>
```

```html
<!-- 父组件 -->
{{ value }}
<y-input v-model="value"></y-input>
```
