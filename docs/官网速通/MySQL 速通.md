# MySQL 速通

一、安装

1. MySQL 安装

[下载地址](https://downloads.mysql.com/archives/community/)

<!-- 1 -->

安装成功后你们的数据库名可能是 MqSQl80，端口是 3306，如果是第一次安装数据库，没有修改默认配置的情况下。因为之前安装过一次，忘了版本和密码，又重新安装了一个 Mysql8.0 版本的。默认端口是 3306，但是被之前的占了，所以现在我的是 3307 端口。

查看已安装 Mysql 服务 ，window 系统下 Win + R 输入 services.msc 打开服务窗口，找到 mysql 可以通过鼠标右键开启/关闭数据库服务。

<!-- 6 -->

1.1 配置环境变量

<!-- 2 -->

<!-- 3 -->

1.2 开启/关闭/登录数据库服务

需要以[超级管理员权限运行命令](https://blog.csdn.net/weixin_64684095/article/details/140508733)。

1.2.1 开启数据库服务

net start 服务器名

```bash
net start MySQL82
```

1.2.2 关闭数据库服务

net stop 服务器名

```bash
net stop MySQL82
```

1.2.3 登录数据库服务

输入命令后，会继续让你输入密码，输入后回车，登录成功。

mysql -u<username> -p -h<hostname> -P<port>

```bash
mysql -uroot -p -h127.0.0.1 -P3307
```

<!-- 4 -->

2. SQLyog 下载

数据库可视化工具 [SQLyog 下载](https://s3.amazonaws.com/SQLyog_Community/SQLyog+13.2.0/SQLyog-13.2.0-0.x64Community.exe)

2.1 连接数据库

创建连接，输入连接名，数据库地址，账号，密码，端口。确保已经启动数据库服务，点击测试连接，连接成功后，
点击连接。

<!-- 7 -->

成功连接到数据库服务。可以对数据库进行操作了。

<!-- 5 -->

二、命令

操作数据库命令分为：数据定义 DDL、数据操纵 DML、数据查询 DQL、数据控制 TCL、事务控制 DCL。

1. SQL 命名规范

1.1 规定

```
| 数据库名不得超过 30 个字符。
| 命名只能包括 A-Z、a-z、1-9、_。
| 数据库名/表名/字段名，中间不能有空格。
| 数据库不能同名。同一个库，表不能重名。同一个表，字段不能同名。
| 命名不能和关键字一样。
```

1.2 规范

```
| 小写字母使用 _ 连接。
| 库名与程序名一致。
| 表名遵守"业务名_表"。
| 列名遵守"表实体_属性"
```

2. 数据定义 DDL

创建和修改盛放数据的容器。DDL 关键字：CREATE、ALTER、DROP

2.1 数据库操作

2.1.1 查看数据库版本

```bash
SELECT VERSION();
```

2.1.2 创建库

CREATE DATABSE IF NOT EXISTS 数据库名 CHARACTER SET 字符集 COLLATE 排序规则

```bash
CREATE DATABASE IF NOT EXISTS yqcoder CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;
```

2.1.3 查看所有库

```bash
SHOW DATABASES;
```

2.1.4 查看当前库

```bash
SELECT DATABASE();
```

2.1.5 查看指定库下所有表

SHOW TABLES FROM 库名

```bash
SHOW TABLES FROM yqcoder
```

2.1.6 切换库/选中库

USE 库名

```bash
USE yqcoder
```

2.1.7 修改库

只能修改字符集和排序方式，数据库名不能改名

ALTER DATABASE 库名 CHARACTER SET 字符集 COLLATE 排序规则

```bash
ALTER DATABASE yqcoder CHARACTER SET utf8mb3 COLLATE utf8mb3_0900_as_cs
```

2.1.8 删除库

DROP DATABASE IF EXISTS 库名

```bash
DROP DATABASE IF EXISTS yqcoder
```

2.1.9 查看字符集

```bash
SHOW VARIABLES LIKE 'character_set_database'
```

2.1.10 查看排序方式

```bash
SHOW VARIABLES LIKE 'character_set_database'
```

2.1.11 查看创库信息

SHOW CREATE DATABASE 库名

```bash
SHOW CREATE DATABASE yqcoder
```

2.2 表操作

2.2.1 列类型

整数、浮点数、定点数、字符串、日期时间、枚举、set 等。

添加 unsigned 变成无负号类型，值从 0 开始。

mysql 中一行数据最多占有 65535 字节，除了 TEXT or BLOBs 类型的列。

参考文档：[mysql 整数类型](https://blog.csdn.net/weixin_64684095/article/details/140536103)、[mysql 浮点数类型](https://blog.csdn.net/weixin_64684095/article/details/140562268)、[mysql 字符串类型](https://blog.csdn.net/weixin_64684095/article/details/140583524)、[mysql 时间类型](https://blog.csdn.net/weixin_64684095/article/details/140583533)

整数：TINYINT、SMALLINT、MEDIUMINT、INT、BIGINT
浮点数：FLOAT(M, D)、DOUBLE(M, D)、DECIMAL(M, D)
字符串：CHAR(M)、VARCHAR(M)、TEXT
时间：YEAR、TIME、DATE、DATETIME、TIMESTAMP
枚举：ENUM(值,值)
SET：SET(值,值)

M 数字长度，D 小数位，M 固定长度

2.2.2 创建表

CREATE TABLE [IF NOT EXISTS] 表名 (
列名 类型 [列可选约束] [COMMENT '列可选注释']
) [表可选约束] [COMMENT '表可选注释']

```bash
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(10) COMMENT '姓名',
  age TINYINT COMMENT '年龄',
  height FLOAT(4, 1) COMMENT '身高',
  sex ENUM('男', '女') COMMENT '性别',
  loves SET('电影', '小说', '运动') COMMENT '爱好',
  created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT '用户表'
```

2.2.3 查看表结构

DESC 表名/DESCRIBE 表名

```bash
DESC users;
```

2.2.3 修改表中列

| 添加列

ALTER TABLE 表名 ADD 字段名 类型 [FIRST|AFTER 字段名]

```bash
ALTER TABLE users ADD money FLOAT AFTER sex
```

| 修改列名

ALTER TABLE 表名 CHANGE 原字段名 新字段名 新类型 [FIRST|AFTER 字段名]

```bash
ALTER TABLE users CHANGE money moneys FLOAT
```

| 修改列类型

ALTER TABLE 表名 MODIFY 字段名 新类型 [FIRST|AFTER 字段名]

```bash
ALTER TABLE users MODIFY moneys INT
```

| 删除列

ALTER TABLE 表名 DROP 字段名

```bash
ALTER TABLE users DROP moneys
```

2.2.4 修改表名

ALTER TABLE 表名 RENAME [TO] 新表名

```bash
ALTER TABLE users RENAME _users
```

2.2.5 删除表

DROP TABLE [IF EXISTS] 数据表 1[, 数据表 2]

```bash
DROP TABLE IF EXISTS users
```

2.2.6 清空表数据

TRUNCATE TABLE 表名

```bash
TRUNCATE TABLE users
```

3. 数据操纵 DML

INSERT 插入、UPDATE 更新、DELETE 删除，最基本单位 '行'，按 '行' 进行增删改查。

3.1 插入

3.1.1 插入所有字段数据

INSERT INTO 表名 VALUES (value1, value2...)

```bash
INSERT INTO users VALUES (1, 'yqcoder', 18, 175.2, '男', '小说', 1000000, '2024-12-12')
```

3.1.2 插入指定字段数据

INSERT INTO 表名 (列名 1, 列名 2...) VALUES (value1, value2...)

```bash
INSERT INTO users (user_name, age) VALUES ('yy', 20)
```

3.1.3 插入多条数据

INSERT INTO 表名 (列名 1, 列名 2...) VALUES (value1, value2...),...,(value1, value2)

```bash
INSERT INTO users (user_name, age) VALUES ('zs', 12), ('lisi', 22)
```

3.2 更新

3.2.1 全表修改

UPDATE 表名 SET 列名=值,列名=值,...,列名=值

```bash
UPDATE users SET age = 20, sex = '男'
```

3.2.2 条件修改

UPDATE 表名 SET 列名=值,...,列名=值 WHERE 条件

```bash
UPDATE users SET age = 18 WHERE user_id = 1
```

3.3 删除

3.3.1 全表删除

DELETE FROM 表名

```bash
DELETE FROM users
```

3.3.2 条件删除

DELETE FROM 表名 WHERE 条件

```bash
DELETE FROM users WHERE user_name = 'zs'
```

4. 数据查询 DQL

关键字 SELECT

4.1 基础 SELECT 语法

4.1.1 非表查询

直接输出结果

```bash
SELECT 9/2;
SELECT VERSION();
SELECT NOW();
```

4.1.2 指定表

查询表中全部或者某些列

SELECT 列名, 列名 FROM 表名

```bash
# 全列查
SELECT * FROM users;
# 只查 user_name,age 列
SELECT user_name,age FROM users
```

4.1.3 查询列起别名

简化列名

SELECT 列名 别名, 列名 别名 FROM 表名

```bash
SELECT user_name 姓名, age 年龄 FROM users
```

4.1.4 去除重复行

SELECT DISTINCT 列名 FROM 表名

```bash
SELECT DISTINCT age FROM users
```

4.1.5 查询常数

人造列，表中没有这个列，查询时人造列放在查询结果中

SELECT '标题' as corporation 列名 FROM 表名

```bash
SELECT '清华' AS school FROM users
```

4.1.6 查询运算

通过表中已有列，计算出没有的列，如果为 NULL，使用 IFNULL(列名, 0)，赋值为 0。

SELECT IFNULL(列名, 为 null 时默认值) 别名 FROM 表名

```bash
SELECT IFNULL(age, 0)+ 10 ten_age FROM users
```

4.2 运算符

IS NULL、IS NOT NULL、BETWEEN ... AND ...、NOT BETWEEN ... AND...、IN()、NOT IN()、LIKE()、NOT LIKE()

4.2.1 区间查询

SELECT \* FROM 表名 WHERE 列名 BETWEEN 区间值 AND 区间值

```bash
SELECT * FROM users WHERE created_time BETWEEN '2024-07-16' AND '2024-07-19'
```

4.2.2 组别查询

SELECT \* FROM 表名 WHERE 列名 IN(区间值)

```bash
SELECT * FROM users WHERE age IN(18)
```

4.2.3 模糊查询

% 匹配 0 或多个字符，\_ 只能匹配一个字符

SELECT \* FROM 表名 WHERE 列名 LIKE 'xxx%'

```bash
SELECT * FROM users WHERE user_name LIKE 'yq%'
```

4.3 逻辑运算符

AND, &&：逻辑且
NOT, !：否定值
OR, ||：逻辑或
XOR：逻辑异或

4.4 单行函数

数值函数、字符串函数、时间函数、日期函数、流程函数、信息函数

4.4.1 数值函数

ABS(x)：返回 x 的绝对值。例如，ABS(-5) 返回 5 。
CEIL(x)：返回大于或等于 x 的最小整数。例如，CEIL(3.1) 返回 4 。
FLOOR(x)：返回小于或等于 x 的最大整数。例如，FLOOR(3.9) 返回 3 。
RAND()：返回一个随机的浮点数，范围在 0 到 1 之间。
ROUND(x, d)：将 x 四舍五入到指定的小数位数 d 。如果 d 为负数，则将 x 四舍五入到小数点左边相应的位数。例如，ROUND(3.14159, 2) 返回 3.14 ，ROUND(123.45, -1) 返回 120 。
TRUNCATE(x, d)：将 x 截断到指定的小数位数 d 。例如，TRUNCATE(3.14159, 2) 返回 3.14 。
POWER(x, y)：返回 x 的 y 次幂。例如，POWER(2, 3) 返回 8 。
SQRT(x)：返回 x 的平方根。例如，SQRT(9) 返回 3

```bash
SELECT * FROM users ORDER BY RAND() LIMIT 1;
```

4.4.2 字符串函数

CONCAT(s1, s2,...)：用于连接多个字符串。例如，CONCAT('Hello', ', 'World') 返回 Hello World 。
SUBSTRING(str, start, length)：提取字符串的子串。例如，SUBSTRING('HelloWorld', 1, 5) 返回 Hello 。
TRIM(str)：去除字符串两端的空格。
LOWER(str)：将字符串转换为小写。例如，LOWER('HELLO') 返回 hello 。
UPPER(str)：将字符串转换为大写。例如，UPPER('hello') 返回 HELLO 。
LENGTH(str)：返回字符串的长度。
LOCATE(substr, str, [start])：在字符串中查找子串的位置。

```bash
SELECT UPPER(user_name) AS upper_name, LENGTH(user_name) AS name_length FROM users;
```

4.4.3 时间函数

NOW()：返回当前的日期和时间，格式为 'YYYY-MM-DD HH:MM:SS' 。
CURDATE()：返回当前的日期，格式为 'YYYY-MM-DD' 。
CURTIME()：返回当前的时间，格式为 'HH:MM:SS' 。
DATE_FORMAT(date, format)：根据指定的格式字符串格式化日期/时间值。例如，DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s') 。
TIME_FORMAT(time, format)：类似于 DATE_FORMAT ，但用于格式化时间部分。
YEAR(date)：返回日期中的年份。
MONTH(date)：返回日期中的月份（1 到 12）。
DAY(date)：返回日期中的日（1 到 31）。
HOUR(time)：返回时间中的小时（0 到 23）。
MINUTE(time)：返回时间中的分钟（0 到 59）。
SECOND(time)：返回时间中的秒（0 到 59）。

```bash
SELECT *, YEAR(created_time) AS created_year FROM users
```

4.4.4 流程函数

IF(condition, value_if_true, value_if_false)：根据条件判断返回不同的值。

```bash
SELECT *, IF(age > 18, 'y', 'n') AS '成年了吗' FROM users
```

CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2... ELSE default_result END：用于多条件判断。

```bash
SELECT
*,
CASE
WHEN age <= 18 THEN 'Minor'
WHEN age > 18 AND age < 60 THEN 'Adult'
ELSE 'Senior'
END AS age_group
FROM users;
```

IFNULL(expr1, expr2)：如果 expr1 为 NULL ，则返回 expr2 ，否则返回 expr1 。

```bash
SELECT *, IFNULL(height, 0) FROM users
```

COALESCE(expr1, expr2,...)：返回第一个非 NULL 的表达式的值。

```bash
SELECT *, COALESCE(height) FROM users
```

4.5 多行函数

4.5.1 聚合函数

COUNT(\*) 或 COUNT(column_name) ：用于计算行数或非 NULL 值的数量。

```bash
SELECT COUNT(*) AS total FROM users;
SELECT COUNT(height) AS non_null_count FROM users;
```

SUM(column_name) ：返回指定列的总和。

```bash
SELECT SUM(age) FROM users
```

AVG(column_name) ：计算指定列的平均值。

```bash
SELECT AVG(age) FROM users
```

MIN(column_name) ：获取指定列的最小值。

```bash
SELECT MIN(age) FROM users
```

MAX(column_name) ：获取指定列的最大值。

```bash
SELECT MAX(age) FROM users
```

4.6 高级查询处理

4.6.1 分组查询

使用 GROUP BY 子句结合聚合函数来实现

假设有一个销售表 sales ，包含列 product_id（产品 ID）、sales_amount（销售金额）。

```bash
SELECT product_id, SUM(sales_amount) AS total_sales
FROM sales
GROUP BY product_id;
```

上述查询按照 product_id 对数据进行分组，并使用 SUM 函数计算每个分组的销售总额。

可以在分组查询中添加 HAVING 子句来过滤分组的结果。HAVING 子句类似于 WHERE 子句，但它用于过滤分组后的结果，而 WHERE 子句用于过滤分组前的行。

例如，只获取销售总额大于 1000 的分组：

```bash
SELECT product_id, SUM(sales_amount) AS total_sales
FROM sales
GROUP BY product_id
HAVING SUM(sales_amount) > 1000;
```

4.6.2 排序查询

使用 ORDER BY 子句来实现。

假设您有一个学生表 students ，包含列 id 、 name 、 age 和 grade 。按照年龄升序排序（从小到大）：

```bash
SELECT * FROM students ORDER BY age;
```

按照年龄降序排序（从大到小）：

```bash
SELECT * FROM students ORDER BY age DESC;
```

先按照年级升序排序，如果年级相同，再按照年龄降序排序：

```bash
SELECT * FROM students ORDER BY grade ASC, age DESC;
```

还可以结合 LIMIT 子句进行分页和排序，例如获取年龄最大的前 10 名学生：

```bash
SELECT * FROM students ORDER BY age DESC LIMIT 10;
```

4.6.3 分页查询

使用 LIMIT 关键字来实现分页查询。

假设您有一个名为 employees 的表，并且您想要进行分页查询。

```bash
SELECT * FROM employees LIMIT 0, 10;
```

其中 0 代表要跳过的行数 0 行，10 代表每页显示 10 行数据。

4.7 SELECT 关键字顺序

SELECT ... FROM ... WHERE ... AND... GROUP BY ... HAVING ... ORDER BY ... LIMIT

5. 数据库约束

5.1 主键约束（Primary Key Constraint）

确保表中的某一列或列组合的值具有唯一性，且不为空。

CREATE TABLE 表名 (列名 类型 PRIMARY KEY, 列名 类型)

```bash
CREATE TABLE students (id INT PRIMARY KEY, name VARCHAR(50))
```

5.2 唯一约束（Unique Constraint）

保证列中的值是唯一的，但可以有空值。

CREATE TABLE 表名 (列名 类型 UNIQUE)

```bash
CREATE TABLE users (email VARCHAR(100) UNIQUE)
```

5.3 非空约束（Not Null Constraint）

要求列不允许包含空值。

CREATE TABLE 表名 (列名 类型 NOT NULL)

```bash
CREATE TABLE products (name VARCHAR(50) NOT NULL)
```

5.4 默认值约束（Default Constraint）

为列指定默认值，如果插入数据时未提供该列的值，则使用默认值。

CREATE TABLE 表名 (列名 类型 DEFAULT 默认值)

```bash
CREATE TABLE orders (status VARCHAR(20) DEFAULT 'Pending')
```

5.5 检查约束（Check Constraint）

定义一个条件，插入或更新的数据必须满足该条件。

CREATE TABLE 表名 (列名 类型 CHECK (自定义条件))

```bash
CREATE TABLE employees (age INT CHECK (age >= 18))
```

5.6 外键约束（Foreign Key Constraint）

建立表之间的关联，确保引用的完整性。

假设存在 students 表（id 为主键）和 courses 表（student_id 为外键引用 students 表的 id ）：

CREATE TABLE 表名 (
主键 INT PRIMARY KEY,
外键 INT,
FOREIGN KEY (外键) REFERENCES 表名(主键)
)

```bash
CREATE TABLE courses (
course_id INT PRIMARY KEY,
student_id INT,
FOREIGN KEY (student_id) REFERENCES students(id)
)
```

5.6.1 外键约束等级

CASCADE：当父表中的记录被删除或更新时，子表中相关的记录也会相应地被删除或更新。
SET NULL：当父表中的记录被删除或更新时，子表中相关记录的外键字段被设置为 NULL ，前提是该外键字段允许为 NULL 。
RESTRICT（默认）：如果子表中存在与父表相关联的记录，则不允许在父表中删除或更新相关记录。
NO ACTION：与 RESTRICT 类似，但在某些数据库系统中可能会有细微差别。

假设我们有两个表，parent_table 和 child_table ，其中 child_table 中的 parent_id 列引用 parent_table 中的 id 列。

```bash
CREATE TABLE parent_table (
id INT PRIMARY KEY,
name VARCHAR(50)
);
```

```bash
CREATE TABLE child_table (
id INT PRIMARY KEY,
parent_id INT,
FOREIGN KEY (parent_id) REFERENCES parent_table(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

5.7 自增长约束

通过 AUTO_INCREMENT 关键字来实现。假设有一个名为 students 的表，其中 id 列被设置为自增长：

CREATE TABLE 表名 (主键 INT PRIMARY KEY AUTO_INCREMENT);

```bash
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    age INT
);
```

6. 数据库多表

6.1 多表关系

6.1.1 一对一关系（One-to-One Relationship）

一个表中的一条记录与另一个表中的一条记录精确对应。

实现方式：通常在其中一个表中添加一个外键，并设置唯一性约束。

主表：员工表

```bash
CREATE TABLE emp (
e_id INT PRIMARY KEY AUTO_INCREMENT,
e_name VARCHAR(20) NOT NULL,
e_age INT DEFAULT 10,
e_gender ENUM('男', '女')
)
```

子表：档案表 1（外键唯一）

```bash
CREATE TABLE profile1 (
p_id INT PRIMARY KEY AUTO_INCREMENT,
p_address VARCHAR(100) NOT NULL,
p_level INT DEFAULT 10,
e_id INT UNIQUE,
CONSTRAINT s_p_1 FOREIGN KEY(e_id) REFERENCES emp(e_id)
);
```

子表：档案表 2（共用主键）

```bash
CREATE TABLE profile2 (
e_id INT PRIMARY KEY,
p_level INT DEFAULT 10,
CONSTRAINT s_p_2 FOREIGN KEY(e_id) REFERENCES emp(e_id)
);
```

6.1.2 一对多关系（One-to-Many Relationship）

一个表中的一条记录与另一个表中的多条记录相关。

实现：在“多”的那一方添加外键，引用“一”的那一方的主键。

比如，一个部门有多个员工，而一个员工只属于一个部门。

```bash
CREATE TABLE departments (
department_id INT PRIMARY KEY,
department_name VARCHAR(50)
);
```

```bash
CREATE TABLE employees (
employee_id INT PRIMARY KEY,
employee_name VARCHAR(50),
department_id INT,
FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
```

6.1.3 多对多关系（Many-to-Many Relationship）

一个表中的多条记录与另一个表中的多条记录相关。

实现：需要创建一个中间表，中间表包含两个外键，分别引用两个相关表的主键。

例如，一个学生可以选择多门课程，一门课程也可以被多个学生选择。

```bash
CREATE TABLE students (
student_id INT PRIMARY KEY,
student_name VARCHAR(50)
);
```

```bash
CREATE TABLE courses (
course_id INT PRIMARY KEY,
course_name VARCHAR(50)
);
```

```bash
CREATE TABLE student_course (
student_id INT,
course_id INT,
PRIMARY KEY (student_id, course_id),
FOREIGN KEY (student_id) REFERENCES students(student_id),
FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```

6.2 多表维护

维护多表关系涉及到数据的插入、更新和删除操作，同时要确保数据的完整性和一致性。

6.2.1 数据插入

对于一对多或多对多关系，需要先插入“一”方或关联表之外的表的数据，然后再插入关联表的数据。

例如，部门和员工的一对多关系，先插入部门数据：

```bash
INSERT INTO departments (department_id, department_name)
VALUES (1, '研发部');
```

再插入员工数据并关联部门：

```bash
INSERT INTO employees (employee_id, employee_name, department_id)
VALUES (1, '张三', 1);
```

6.2.2 数据更新

更新操作要注意外键约束，如果更新了父表中的主键值，可能会影响到子表中的关联数据。

比如，更新部门表中的部门 ID 时，需要同时考虑员工表中的关联数据。

6.2.3 数据删除

在删除数据时，如果存在外键关联，需要根据设置的级联操作来处理。

如果是 CASCADE 级联删除，删除父表中的记录会自动删除子表中的相关记录。

如果是 RESTRICT 或 NO ACTION ，则在子表中存在关联数据时，不允许直接删除父表中的记录。

另外，定期检查数据的完整性和一致性也是很重要的。可以通过查询和统计来确保关联数据的准确性。

例如，检查每个部门的员工数量：

```bash
SELECT d.department_name, COUNT(e.employee_id) AS employee_count
FROM departments d
JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_name;
```

6.3 多表查询

通过合并语法将多张表合并成一张虚拟表进行查询。有垂直合并、水平合并。

6.3.1 垂直合并查询

要实现多表查询的垂直合并，可以使用 UNION 或 UNION ALL 操作符。

UNION 操作符用于合并两个或多个 SELECT 语句的结果集，它会去除重复的行。

```bash
SELECT column1, column2 FROM table1
UNION
SELECT column1, column2 FROM table2;
```

UNION ALL 操作符与 UNION 类似，但它不会去除重复的行。

```bash
SELECT column1, column2 FROM table1
UNION ALL
SELECT column1, column2 FROM table2;
```

6.3.2 水平合并查询

有内连接（INNER JOIN）、左连接（LEFT JOIN）、右连接（RIGHT JOIN）、自然连接、自连接

内连接（INNER JOIN）

返回两个表中连接字段相等的行。

SELECT \* FROM 表一 [INNER] JOIN 表二 ON 表一.列名 = 表二.列名;

```bash
SELECT s.student_name, c.course_name
FROM students s
INNER JOIN student_courses sc ON s.student_id = sc.student_id
INNER JOIN courses c ON sc.course_id = c.course_id;
```

左连接（LEFT JOIN）

返回左表（table1）中的所有行以及右表（table2）中与连接条件匹配的行。如果右表中没有匹配的行，则结果中右表的列值为 NULL。

SELECT \* FROM 表一 LEFT JOIN 表二 ON 表一.列名 = 表二.列名;

```bash
SELECT s.student_name, c.course_name
FROM students s
LEFT JOIN student_courses sc ON s.student_id = sc.student_id
LEFT JOIN courses c ON sc.course_id = c.course_id;
```

右连接（RIGHT JOIN）

与左连接相反，返回右表中的所有行以及左表中与连接条件匹配的行。如果左表中没有匹配的行，则结果中左表的列值为 NULL。

SELECT \* FROM 表一 RIGHT JOIN 表二 ON 表一.列名 = 表二.列名;

```bash
SELECT s.student_name, c.course_name
FROM students s
RIGHT JOIN student_courses sc ON s.student_id = sc.student_id
RIGHT JOIN courses c ON sc.course_id = c.course_id;
```

自然连接（Natural Join）

是一种基于共同列自动进行连接的方式。它会自动匹配两个表中名称和数据类型都相同的列，并将这些列作为连接条件。

SELECT \* FROM students 表一 JOIN 表二;

```bash
SELECT * FROM students NATURAL JOIN scores;
```

自连接

是指一个表与其自身进行连接操作。

SELECT 别名.列名, 别名.列名 FROM 表名 别名 LEFT JOIN 表名 别名 ON 别名.列名 = 别名.列名 WHERE 条件

```bash
SELECT e1.eid, e1.name, e1.mid, e2.name FROM t_employee e1 LEFT JOIN t_employee e2 ON e1.mid = e2.eid WHERE e1.eid = 5
```

6.3.3 子查询（嵌套查询）

标量子查询：返回单行单列

SELECT \* FROM 表名 WHERE 列名 = (SELECT 嵌套查询结果为标量)

```bash
SELECT * FROM t_employee WHERE did = (SELECT did FROM t_department WHERE dname = '研发部')
```

行子子查询：返回一行多列

SELECT \* FROM 表名 WHERE (列名, 列名) IN (SELECT 嵌套查询结果为单行多列)

```bash
SELECT * FROM t_employee WHERE (gender, did) IN (SELECT gender,did FROM t_employee WHERE ename = '白路')
```

列子子查询：返回一列多行

SELECT \* FROM 表名 WHERE 列名 IN (SELECT 嵌套查询结果为多行单列)

```bash
SELECT * FROM t_employee WHERE did IN (SELECT did FROM t_employee WHERE ename IN ['白路', '柏芝'])

SELECT * FROM t_employee WHERE did NOT IN (SELECT did FROM t_employee WHERE ename IN ['白路', '柏芝'])

SELECT * FROM t_employee WHERE did = ANY(SELECT did FROM t_employee WHERE ename IN ['白路', '柏芝'])
```

婊子子查询：返回多行多列

SELECT 别名.列名, 别名.列名 FROM 表名 别名 LEFT JOIN (SELECT 嵌套查询结果为多行多列) AS 别名 ON 别名.列名 = 别名.列名

```bash
SELECT d.did, d.dname, temp.avs FROM t_department d LEFT JOIN (SELECT did, AVG(salary) avs FROM t_employee GROUP BY did) as temp ON d.did = temp.did
```

7. 数据库高级和新特性

7.1 数据库事务

7.1.1 基本概念

事务是一组逻辑相关的操作，这些操作要么全部成功执行，要么全部不执行，以确保数据的一致性和完整性。

事务具有以下四个重要特性，通常称为 ACID 特性：

1. **原子性（Atomicity）**：事务中的所有操作要么全部成功，要么全部失败回滚。如果事务中的某个操作失败，整个事务就会回滚到事务开始之前的状态，就好像整个事务从未执行过一样。

2. **一致性（Consistency）**：事务必须始终保持数据库处于一致的状态。这意味着在事务开始之前和事务完成之后，数据库中的数据都必须符合所有的完整性约束（例如主键约束、外键约束、唯一性约束等）。

3. **隔离性（Isolation）**：多个事务并发执行时，它们之间相互隔离，一个事务的执行不能被其他事务干扰。每个事务都感觉不到其他并发事务的存在。

4. **持久性（Durability）**：一旦事务成功提交，其对数据库的更改就会永久保存，即使系统出现故障也不会丢失。

在 MySQL 中，可以使用以下语句来控制事务：

1. `START TRANSACTION` 或 `BEGIN` ：开启一个事务。

2. `COMMIT` ：提交事务，使事务中的更改永久生效。

3. `ROLLBACK` ：回滚事务，撤销事务中所做的所有更改。

下面是一个简单的事务示例：

```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;
```

在上述示例中，如果在两个更新操作之间出现错误，比如第二个更新因为某种原因失败，那么可以执行 `ROLLBACK` 来撤销第一个更新操作，以保证数据的一致性。

事务在处理关键业务逻辑、确保数据一致性和可靠性方面非常重要，例如银行转账、库存管理等场景。

7.1.2 手动提交模式

MySql 默认是自动提交事务。

取消自动提交

```bash
SET autocommit = false;
```

开启自动提交

```bash
SET autocommit = true;
```

查看是否自动提交

```bash
SHOW VARIABLES LIKE 'autocommit';
```

7.1.3 独立事务

不管自动提交还是手动提交，都可以使用 `START TRANSACTION` 或 `BEGIN` 开启独立事务。

```bash
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;
```

7.1.4 事务特性

隔离性（Isolation），MySQL 支持以下四种隔离级别：

1. **读未提交（Read Uncommitted）**：

   - 这是最低的隔离级别。在这个级别下，一个事务可以读取到另一个未提交事务修改的数据，这可能导致脏读（Dirty Read）的问题。
   - 例如，事务 A 修改了一条数据但未提交，事务 B 此时能够读取到事务 A 未提交的修改，而如果事务 A 最终回滚，事务 B 读取到的数据就是不正确的，即脏数据。

2. **读已提交（Read Committed）**：

   - 一个事务只能读取到已经提交的数据，解决了脏读问题，但可能导致不可重复读（Non-Repeatable Read）和幻读（Phantom Read）的问题。
   - 比如，事务 A 多次读取同一数据，在这期间事务 B 提交了对该数据的修改，那么事务 A 每次读取的结果可能不同，出现不可重复读。

3. **可重复读（Repeatable Read）**：

   - 这是 MySQL 的默认隔离级别。在同一个事务中多次读取相同的数据结果是一致的，解决了脏读和不可重复读的问题，但仍可能出现幻读。
   - 幻读的情况例如，事务 A 按照某个条件进行查询，事务 B 插入了符合条件的数据并提交，然后事务 A 再次按照相同条件查询时，会得到不同的结果集。

4. **串行化（Serializable）**：
   - 这是最高的隔离级别，事务串行执行，完全避免了脏读、不可重复读和幻读问题，但性能开销较大。
   - 相当于事务一个接一个地顺序执行，不会出现并发执行的情况。

查看当前数据库的隔离级别：

```sql
SELECT @@transaction_isolation;
```

设置隔离级别：

其中 `<隔离级别>` 可以是 `READ UNCOMMITTED` 、 `READ COMMITTED` 、 `REPEATABLE READ` 或 `SERIALIZABLE` 。

```sql
SET SESSION TRANSACTION ISOLATION LEVEL <隔离级别>;
```

7.2 用户权限控制管理

7.2.1 创建用户

create user '账号'@'访问主机地址 localhost | ip 地址 | %' identified by '密码'

```bash
CREATE USER 'zhangshan'@'%' IDENTIFIED BY '123456';
```

7.2.2 赋予权限

grant 权限, 权限 on 库名.表名(\* 任何库或表) to '账号'@'主机地址'

```bash
GRANT SELECT,INSERT ON table_name.* TO 'zhangshan'@'%'
```

7.2.3 回收权限

revoke 权限, 权限 on 库名.表名(\* 任何库或表) from '账号'@'主机地址'

```bash
REVOKE INSERT ON table_name.* FROM 'zhangshan'@'%'
```

7.2.4 删除用户

drop user '用户名'

```bash
DROP USER 'zhangshan'
```

7.2.5 查看用户和权限

查看用户：select user,host from mysql.user

```bash
SELECT USER,HOST FROM mysql.user
```

查看权限：show grants for '账号'@'主机地址'

```bash
SHOW GRANTS FOR 'root'@'localhost'
```

7.3 数据备份和还原

数据备份和还原是非常重要的操作，以防止数据丢失或损坏。

7.3.1 备份单个数据库

执行命令时会提示输入密码， `username` 是用户名， `database_name` 是要备份的数据库名称。

mysqldump -u username -p -Pport database_name > backup.sql

```bash
mysqldump -u root -p -P3307 yqcoder > d:\yqcoder.sql
```

7.3.2 备份多个数据库

mysqldump -u username -p -Pport --databases database_name database_name > backup.sql

```bash
mysqldump -u root -p -P3307 --databases yqcoder ad > d:\yqcoder.sql
```

7.3.3 备份所有数据库

mysqldump -u username -p -Pport --all-databases > backup.sql

```bash
mysqldump -u root -p -P3307 --all-databases > d:\yqcoder.sql
```

7.3.4 备份表

mysqldump -u username -p -Pport database_name 表名 表名 > backup.sql

```bash
mysqldump -u username -p -P3307 yqcoder users books > d:\yqcoder.sql
```

7.3.5 数据还原

需要备份的数据库和迁移的数据库版本相同。

mysql -u username -p -Pport database_name < backup.sql

```bash
mysql -u root -p -P3307 demo < d:\yqcoder.sql
```

7.3.6 Binlog 日志

当我们误删除了数据库数据时，可以通过 Binlog 日志去恢复。Binlog 日志记录了你操作数据库的记录。默认是开启状态，存放位置 C:\ProgramData\MySQL\MySQL Server 8.2\my.ini。

清空原有 Binlog 文件

```bash
RESET MASTER
```

创建新的日志文件

```bash
FLUSH LOGS
```

查看日志清单

```bash
SHOW BINARY LOGS
```

查看日志文件信息

SHOW BINLOG EVENTS [IN 指定清单文件 FROM Pos 值 LIMIT OFFSET,ROW_COUNT]

```bash
SHOW BINLOG EVENTS IN 'YQCODER-bin.000002' FROM 126 LIMIT 0, 3;
```

将 Binlog 日志导出成 sql 脚本

完整日志导出

```bash
mysqlbinlog YQCODER-bin.000001 > d:/bin001.sql
```

误删除记录前的记录导出

```bash
mysqlbinlog --stop-position=126 YQCODER-bin.000002  > d:/bin002.sql
```

误删除记录后的记录导出

```bash
mysqlbinlog --start-position=126 YQCODER-bin.000002  > d:/bin003.sql
```

7.4 数据库新特性

7.4.1 窗口函数

允许在结果集中执行聚合、分析和排序操作，而不会改变查询结果的行数。

多行函数 over (partition by 列名 order by 列名 desc | asc)

```bash
SELECT id, name AVG(price) OVER () FROM goods
```

查询商品的名称和类别平均价格。

```bash
SELECT id, name AVG(price) OVER (PARTITION BY categroy) FROM goods
```
