# Vue.use() 详解

1. 官方说明

>> 用于安装 Vue.js 插件。
>> 如果插件是一个对象，必须提供 install 方法。
>> 如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。当 install 方法被同一个插件多次调用，插件将只会被安装一次。

2. 例子

1) 对象

```
// directives/index.js

export default {
  install: function(Vue, opts = {}) {
    Vue.directive(name, {
      bind() {}
    })
  }
}

// main.js

import directive from "@/directives";
Vue.use(directive);

```

2) 函数

```
// components/index.js

import A from "./A.vue";
import B from "./B.vue";

const diyComponents = [A, B];

export default vue => {
  diyComponents.forEach(item => {
    vue.component(item.name, item);
  });
};

// main.js

import components from "@/components";
Vue.use(components);
```

