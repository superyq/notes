<h2>vuex笔记</h2>

#. 基础用法

```js
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

# vuex进阶

1. vuex得核心属性

```
export default: {
  state: { // 存储状态
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ],
    count: 1
  },

  getter: { // store的计算属性
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },

  mutations: { // 改变状态的唯一方法，不能异步操作
    increment (state, payload) {
      // 变更状态
      state.count += payload.amount;
    }
  },

  actions: { // 提交的mutation，可以包含异步操作
    increment ({ commit }) {
      commit('increment');
    },
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
}
```

2. 组件中引用

```
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      'count'
    }),
    ...mapGetters(['donwTodos'])
  },
  methods: {
    ...mapMutations(['increment']);
    ...mapActions(['increment']);
  }
}
```

