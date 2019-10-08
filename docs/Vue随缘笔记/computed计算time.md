# computed计算time

```
computed: {
  time: {
    get() {
      const { start, end } = this.search;
      return start && end ? [start, end] : "";
    },
    set([start = "", end = ""] = []) {
      this.search.start = start;
      this.search.end = end;
    }
  }
}
```