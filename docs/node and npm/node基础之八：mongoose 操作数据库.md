# mongoose 操作数据库

```js
npm i mongoose;
// 导入
const mongoose = require("mongoose");
// 连接数据库，先启动数据库服务
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');
// 成功回调
mongoose.connection.once('open', async () => {});
// 失败回调
mongoose.connection.on('error', () => {});
// 关闭回调
mongoose.connection.on('close', () => {});
// 断开链接
mongoose.disconnect();

// 创建文档对象
const bookScheme = new mongoose.Scheme({
  name: String,
  author: String,
  price: mongoose.Scheme.Types.Mixed // 不限制类型
}, {
    timestamps: true, // 添加创建 更新时间字段
  }
)
// 创建模型对象
const bookModel = mongoose.model('books', bookScheme);
// 增
const data = await bookModel.create({
  name: '金瓶梅',
  author: 'yqcoder'
})
// 删
const data = await bookModel.deleteOne({});
const data = await bookModel.deleteMany({});
// 改
const data = await bookModel.updateOne({}, {});
const data = await bookModel.updateMany({}, {});
// 查
const data = await bookModel.findOne({});
const data = await bookModel.findById();
const data = await bookModel.find({price: {$lt: 20}}); // $lt <, $lte <=,  $gt >, $gte >=, $ne !==, $or 或, $and 与
const data = await bookModel.find().select({name: 1, author: 1, _id: 0}) // 只返回name，author
const data = await bookModel.find().sort({price: 1}) // 正序
```
