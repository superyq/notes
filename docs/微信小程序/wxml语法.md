# wxml语法

```html
<!-- 数据绑定 -->
<view>{{ message }}</view>
<view id="item-{{id}}"> </view>

<!-- 列表渲染 -->
<!-- 默认index为下标，item为每项 -->
<view wx:for="{{ array }}">{{index}}: {{item}}</view>
<!-- 使用 wx:for-item 可以指定数组当前元素的变量名 -->
<!-- 使用 wx:for-index 可以指定数组当前下标的变量名 -->
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>

<!-- 条件渲染 -->
<view wx:if="{{ view === 'a' }}">a</view>
<view wx:elif="{{ view === 'b' }}">b</view>
<view wx:else="{{ view === 'c' }}">c</view>

<!-- 模板 -->
<template name="staffName">
  <view>
    FirstName: {{firstName}}, LastName: {{lastName}}
  </view>
</template>

<template is="staffName" data="{{...staffA}}"></template>
<template is="staffName" data="{{...staffB}}"></template>
<template is="staffName" data="{{...staffC}}"></template>
```

```js
Page({
  data: {
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shang', lastName: 'You'},
    staffC: {firstName: 'Gideon', lastName: 'Lin'}
  }
})
```
