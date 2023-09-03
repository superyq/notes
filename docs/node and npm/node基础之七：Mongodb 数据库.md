# Mongodb 数据库

下载地址：https://www.mongodb.com/try/download/community
v：5.0.20 platform：window package：zip
复制到 c 盘/Programs Files
c 盘创建 data/db 文件夹 默认存放数据地址
在 bin 目录下启动数据库 mongod, 客户端连接数据库 mongo

```js
show dbs // 所有数据库
use 数据库名 // 指定数据库,可创建
db // 当前数据库
db.dropDatabase() // 删除数据库

db.createCollection('集合名') // 创建集合
show collections // 数据库集合
db.集合名.drop() // 删除集合
db.集合名.renameCollection('new name') // 重命名集合

db.集合名.insert(新文档) // 增
db.集合名.remove(条件) // 删
db.集合名.update({name: '张三'}, {$set: {age: 13}}) // 改
db.集合名.find(条件) // 查
```
