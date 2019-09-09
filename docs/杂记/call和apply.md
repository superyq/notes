# call 和 apply

1. 说明

就是函数继承，属性或者方法

2. 举例

```
function Animal(name) {
  this.name = name;
  this.showName = funciton() {
    console.log(this.name);
  }
}

function Cat(name) {
  <!-- Animal.apply(this, [name]) -->
  Animal.call(this, name);
}

var cat = new Cat('red cat');

cat.showName() // red cat
```
