# vuex基础

1. 基础用法

```
// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  strict: true
})

// main.js
import store from "./store";
new Vue({
  store
})
```