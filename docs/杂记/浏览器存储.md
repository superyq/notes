# 浏览器存储

- cookie在浏览器请求中每次都会附加请求头中发送给服务器。用户代理(一般值浏览器)所实现的大小最少要到达4096字节;

- localStorage保存数据会一直保存没有过期时间，不会随浏览器发送给服务器。大小5M或更大

- sessionStorage仅当前页面有效一旦关闭就会被释放。也不会随浏览器发送给服务器。大小5M或更大

1. sessionStorage

1) 保存数据语法

```
sessionStorage.setItem("key", "value");
```

2) 读取数据语法

```
var lastname = sessionStorage.getItem("key");
```

3) 删除指定键的数据语法

```
sessionStorage.removeItem("key");
```

4) 删除所有数据

```
sessionStorage.clear();
```
