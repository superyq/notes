1. vue2

```js
// utils/components.js
import Vue from "vue";
import path from "path";

const files = require.context("@/components", false, /\.vue$/);
files.keys().forEach((key) => {
  const name = path.basename(key, ".vue");
  Vue.component(name, files(key).default || files(key));
});

// main.js
import "@/utils/components.js";
```

2. vue3
