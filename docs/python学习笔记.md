<!-- 前言 -->

1. python 简单、易学、开发效率高
2. 适用于自动化脚本、自动化办公、web 应用程序、人工智能、大数据
3. 3.1 写代码，3.2 翻译代码到二进制
<!-- 安装 -->
4. 4.1 python.org 下载安装 python， 4.2 命令行输入 python 查看是否已全局安装
5. python 解释器 5.1 翻译代码，5.2 提交给计算机，5.3 python demo.py 运行 py 文件
6. 安装配置 PyCharm 软件
<!-- 基础 -->
7. 字面量：数字 number，字符串 string，列表 list，元组 tuple，集合 set，字典 dictionary
8. 注释：单行 # 代码，多行 """ 代码 """
9. 变量名 = 数据
10. type(数据) 查看数据类型
11. int()、str()、float()
12. 标识符：英文，中文，数字，下划线，不能以数字开头
13. 运算符：+，-，\*，/,//, %, \*\*
14. 字符串拼接："%s,%d,%f" % ('字符串', '整数', "浮点数")
15. 精度控制："%7d, %7.2f, %.2f"
16. 格式化：f"我是{name}, 今年{age}"
17. input("你是谁啊？")
18. if

```py
if 判断条件:
    为True时执行语句
elif xxx:
    xxx
else:
  xxxx
```

19. while

```py
while xxx:
  xxxx
```

20. \t 对齐
21. for

```py
for x in list
  print(x)
```

22. range(num1, num2, step)

```py
for item in range(0, 50, 1):
  pass
# 类似于
index = 0
while index < 50:
  index += 1
```

23. continue 中断本次，直接下一次，用于 for，while
24. break 直接结束所在所在循环
25. def 定义函数

```py
def fn(xx):
  xxx
  return xx
```

26. global 函数内变量升级为全局变量
27. list、tuple、str、set、dict

```py
列表 = [] 或 list([])
列表[下标] 或 列表[-下标] # 下标

列表.append(元素) # 添加
列表.extend(容器) # 添加
列表.insert(下标, 元素) # 插入
del 列表[下标] # 删除
列表.pop(下标) # 删除
列表.remove(元素) # 删除
列表.clear() # 清空
列表.count(元素) # 计算某个元素个数
列表.index(元素) # 查看下标
len(列表) # 列表长度

# 遍历列表
i = 0
while i < len(列表):
  xxx
  i += i

for item in 列表
  xxx
```

```py
# 元组不可修改
元组 = () 或 tuple(())
列表[下标] 或 列表[-下标] # 下标

元组.index(元素) # 查看下标
元组.count(元素) # 计算某个元素个数
len(元组) # 元组长度
```

```py
# 字符串 无法修改
字符串 = ""
字符串[下标] 或 字符串[-下标] # 下标

字符串.index(字符) # 指定下标
字符串.replace(字符1, 字符2) # 替换
字符串.split(字符) # 分割成新列表
字符串.strip(字符) # 移除首位空格或指定字符
字符串.count(字符) # 计算某个元素个数
len(字符串) # 元组长度
```

28. 序列：list、tuple、str
29. 序列切片: 序列[起始:结束:步长] 或 序列[起始:结束:-步长]
30. 集合 set()：不可重复，无序

```py
set.add(item)
set.remove(item)
set.pop(item) # 取出
set.clear()

set1.difference(set2) # 差集
set1.difference_update(set2) # 集合1删除集合2中元素，1变2不变
set1.union(set2) # 合并
len(set)
```

31. 字典 {}dict {}

```py
dict.pop(key) # 移除
dict.clear()
dict.keys() # 获取全部key
len(dict)
```

32. 通用方法

```py
len(容器)
max(容器)
min(容器)
sorted(容器, reverse=True) # 倒叙
sorted(容器, reverse=False) # 正叙
```

33. 函数多返回

```py
def test():
  return 1,True,'yq'

x,y,z = test()
```

34. 函数参数

```py
def test(name, age, gender):
  print(f"${name}${age}${gender}")

# 位置参数
test('yq', 18, 'man')
# 关键字参数
test(gender='man', name='yq', age=18)
# 不定长
def test1(*args):
  print(args)
# 传 1，2，3就是元组(1,2,3)
def test1(**args):
# 传{name: 'yq', age: 18}就是字典

```

35. 匿名函数

```py
def test(fun):
  result = fun(1,2)

# 1
def add(x,y):
  return x+y
test(add)

# 2
test(lambda x, y: x+y)
```

36. 文件

```py
# mode: r只读，w写入覆盖，a写入追加, r+读写
# encoding="UTF-8"
file = open(name, mode, encoding)

file.read() # 全读
file.readline() # 返回一行文件
file.readlines() # 返回全部文件内容组成的列表

# for循环读取
for line in file:
  print(line)

# 关闭
file.close()

# 自动关闭
with open() as file:
  for line in file:
    print(line)

# 写入 或 创建
file = open('demo.txt', 'w', encoding='UTF-8')
file.write("无所事事")
file.close()

# 追加 或 创建
file = open('demo.txt', 'a', encoding='UTF-8')
file.write('asdfsf')
file.close()
```

36. 捕获异常

```py
# 基础
try:
  xxx
except:
  xxx

# 指定异常
try:
  xxx
except NameError as e:
  xxx

# 合计异常
try:
  xxx
except (NameError, ZeroDivisionError) as e:
  xxx

# 完整
try:
  xxx
except:
  xxx
else:
  xxx
finally:
  xxx

```

37. 模块

```py
# [from 模块名] import [模块 | 类 | 变量 | 函数 | *] [as 别名]
from my_module import test
test(1,2)

# 或
import my_module
my_module.test(1,2)

__name__ == "__main__" # 包自我调试
__all__ = ['test']
```

38. 安装包

```py
pip install numpy
# 或
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple numpy
```

39. json

```py
json.dumps(data, ensure_ascii=False) # 转json字符串,有中文 ensure_ascii=False
json.loads() # 转列表
```

40. 对象

```py
# 基础
class Student:
  name = None
  def say_hi(self, msg):
    print(f"{self.name},{msg}")
stu_1 = Student()
stu_1.name = 'yq'
stu_1.say_hi('哇哈哈哈')

# 构造
class Student:
  name = None
  age = None
  def __init__(self, name, age):
    self.name = name
    self.age = age
stu_2 = Student('yq', 18)
stu_2.name
```

41. 类方法：魔术方法

```py
# init,str,lt,le,eq
def __init__(self, name):
  self.name = name
def __str__(self):
  return f"{self.name}"
def __lt__(self, other):
  return self.name < other.name
def __le__(self, other):
  return self.name < other.name
def __eq__(self, other):
  return self.name == other.name
```

42. 面向对象 3 大特性：封装，继承，多态

```py
# __xx 变私有
# 私有变量、私有方法无法被实例使用，可以被类自己使用

# 继承 单继承
class 类名(父类名):
  xxx
# 多继承 谁先继承谁的优先级高
class 类名(父级1, 父级2, ...):
  pass
# 覆盖后调用父级，父级1.name 或 super().name
# 覆盖后调用父级，父级1.__init__() 调用父类的构造函数

# 多态：父级抽象类，子集具体实现
class parent:
  def say(self):
    pass
class child(parent):
  def say(self):
    print("八佰伴")
def say(parent: Parent):
  parent.say()
```

43. 注解

```py
var_1: int = 10 # float, bool, str
var_2: list = [] # tuple, set, dict, str
```

44. mysql

```py
# [mysql.com](https://dev.mysql.com/downloads/installer/) 下载 mysql
# C:\Program Files\MySQL\MySQL Server 8.0\bin mysql添加到环境变量
mysql -uroot -p # 登录
show databases # 查看数据库
use 数据库名 # 使用某个数据库
show tables # 查看数据库有哪些表
exit # 退出

# https://dbeaver.io/download/ 下在 dbeaver
```

1.  sql 分 4 类

```s
# DDL: 库、表的创建，删除
# 库
show databases;
create database 库名 [charset utf8];
use 数据库名;
select database();
drop database 库名;
# 表
show tables;
create table 表名(
  列名 列类型, # int, float, varchar(10),date, timestamp
)
drop table 表名;

# DML: 数据的增，删，改
insert into 表(列1, 列2, ...) values(值1, 值2, ...), (值1, 值2, ...)
delete from 表 where 条件判断
update 表 set 列=值 where 条件判断

# DQL: 基于需求查询和计算数据
select * from 表 where 条件
select 列|聚合函数 from 表 [where 条件] group by 列 # sum(列)、avg(列)、min(列)、max(列)、count(列|*)
select 列|聚合函数* from 表 where ... group by ... order by ... [asc|desc] limit n[,m] # from > where > group by > 聚合函数 > order by > limit

# DCL: 用户的增，删，密码修改，权限管理
```

46. python 和 mysql

```py
pip install pymysql # 安装第三方库

from pymysql import Connection # 导包
conn = Connection(
  host='localhost',
  port=3306,
  user='root',
  password='123456'，
  autocommit=True # 自动提交，sql 插入
)
conn.get_server_info() # 数据库软件数据
conn.close() # 关闭链接

cursor = conn.cursor() # 获取游标
conn.select_db("test") # 选择数据库
cursor.execute("create table test_mysql(id int, info varchar(255))") # 非查询 sql 语句

cursor.execute("select * from user") # 查询 sql 语句
results = cursor.fetchall() # 获取所有查询数据

cursor.execute("insert into ad * values(1, '哈哈哈')")
```

47. 爬虫

```py
# pip install requests 安装
import requests
headers = { "User-Agent": "xxx" }
res = requests(url, headers = headers)
if res.ok:
  print(res.text)
else:
  print(xx)

# pip install bs4 安装
```
