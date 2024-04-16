# pnpm 用法

前言：pnpm 相较于 yarn、cnpm 是可以解决幻影依赖问题。

1. 安装和卸载

```sh
# 安装
npm install -g pnpm
# 更新
npm update -g pnpm

# 卸载
npm rm -g pnpm
```

2. 用法

```sh
# 查看npm镜像设置：默认值 https://registry.npmjs.org/
npm config get registry

# 将npm设置为淘宝镜像
npm config set registry https://registry.npm.taobao.org
npm config set registry https://registry.npmmirror.com
# or
npm config set disturl https://npm.taobao.org/dist

# 卸载淘宝镜像
npm config delete registry
# or
npm config delete disturl

# 查看当前npm镜像设置
npm config list

# 清空缓存
npm cache clean --force
```
