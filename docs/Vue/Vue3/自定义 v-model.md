# 自定义 v-model

1. input 中的 v-model

```html
<!-- my-input.vue -->
<!-- props：value值必须用modelValue命名 -->
<!-- emits：方法必须用update:modelValue命名 -->
<script setup>
  const props = defineProps({
    modelValue: String,
  });

  let emits = defineEmits(["update:modelValue"]);
  const updateValue = (event) => {
    emits("update:modelValue", event.target.value);
  };
</script>

<template>
  <div>
    <input :value="props.modelValue" @input="updateValue" />
    <span>子组件：{{ props.modelValue }}</span>
  </div>
</template>
```

```html
<my-input v-model="value"></my-input>
```

2. naive-ui 组件二次封装 v-model

```html
<!-- my-input.vue -->
<!-- props：value值必须用modelValue命名 -->
<!-- emits：方法必须用update:modelValue命名 -->
<script setup>
  import { NInput } from "naive-ui";
  const props = defineProps({
    modelValue: String,
  });

  let emits = defineEmits(["update:modelValue"]);

  // 差别在这，直接value就是改变的值
  const updateValue = (value) => {
    emits("update:modelValue", value);
  };
</script>

<template>
  <div>
    <n-input :value="props.modelValue" @input="updateValue"></n-input>
    <span>子组件：{{ props.modelValue }}</span>
  </div>
</template>
```

```html
<my-input v-model="value"></my-input>
```
