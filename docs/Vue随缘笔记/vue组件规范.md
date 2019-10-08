# vue组件规范

```
export default {
  name: 'component-name',
  components: {
    VFoo,
    TheBar
  },
  props: {
    foo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mixins: [],
  directives: {
    focus: {
      inserted(el) {}
    }
  },
  data() {},
  computed() {},
  watch() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {}
}
```