# Linux 操作系统速通

一、安装虚拟机

1. VmWare 安装下载

[vmware workstation pro 16 下载](https://www.ddooo.com/softdown/177981.htm)

<!-- 1 -->

win + R 输入 ncpa.cpl 确保网卡正常

<!-- 2 -->

2. CentOS 系统下载

[CentOS 系统下载](https://www.centos.org/download/)

<!-- 9 -->

将 CentOS 系统安装到虚拟机

<!-- 3-8，10 -->

3. 查看虚拟机 IP

命令 ifconfig

<!-- 11 -->

4. finalShell 安装下载

[finalShell 下载](https://www.ddooo.com/softdown/165958.htm)

输入用户名一般是 root，密码，虚拟机 ip 地址，端口不用变。

<!-- 12 -->

5. 虚拟机快照

保存稳定版的虚拟机状态，如果后续虚拟机宕机不可用了，可以回退状态。

在虚拟机关机状态下，保存快照，保存的速度快很多。

<!-- 14 -->

二、Linux 基础命令

Linux 中顶级目录只有一个 /，他表示根目录。所有的文件夹、文件都是在这个根目录下的。

Home 目录表示每个用户在 Linux 系统里属于自己的文件夹目录。路径在 /home/用户名

1. 命令基础格式

command [-options] [paramter]

command：命令本身
-options：可选，控制命令行为细节
paramter：可选，指向目标

示例：ls 是命令，-l 是选项，/home 是目标，表示以列表形式展示/home 下内容

```bash
ls -l /home
```

2. 特殊路径符

.：当前工作目录
..：上级工作目录
~：home 工作目录

```bash
cd ~/demo
```

3. 命令总结

3.1 ls

列出目录下的内容

ls [-a -l -h] [路径]

ls：以平铺的形式列出当前工作目录的内容
ls -a：列出全部文件，包括隐藏文件
ls -l：以列表新式展示更多信息
ls -h：易于阅读的形式，配合-a -l 使用

```bash
ls -alh /home
```

3.2 cd

切换工作目录，当没有路径参数时，表示回到用户的 home 目录

cd [路径]

```bash
cd /home
```

3.3 pwd

展示当前工作目录

```bash
pwd
```

3.4 mkdir

创建目录

mkdir [-p] [路径]

-p：自动创建不存在的父目录

```bash
mkdir -p /www/pages
```

3.5 touch

创建文件

touch 路径

```bash
touch /www/pages/index.html
```

3.6 cat

查看文件

cat 路径

```bash
cat index.html
```

3.7 more

查看文件，支持翻页

more 路径

```bash
more index.html
```

3.8 cp

复制文件、文件夹

cp [-r] 被复制路径 复制去路径

-r：用于复制文件夹时使用，表示递归

```bash
cp -r /www/pages /www/page
```

3.9 mv

移动文件、文件夹

mv 被移动文件或文件夹 移动去文件文件夹

```mv
mv /www/page /www/pages
```

3.10 rm

删除文件、文件夹。可以使用通配符 \*，删除匹配的文件。

rm [-r -f] 路径 路径 ... 路径

-r：删除文件夹
-f：强制删除

```bash
rm -rf /www/pages/page
```

3.11 which

查看命令存放在哪里

which 命令

```bash
which ls
```

3.12 find

搜索指定文件，可是使用通配符 \* 进行搜索

find 查找路径 -name 文件名

```bash
find /www -name pages
```

find 查找路径 -size +|-n[kMG]

+|-：大于小于
n：数字
kMG：kb、mb、gb 单位

```bash
find /www -size +10M
```

3.13 grep

从文件中通过关键字过滤文件行

grep [-n] 关键字 路径

-n：可选，表示在结果中显示行号

```bash
grep -n yqcoder demo.text
```

3.14 wc

统计文件行数、单词数

wc [-c -m -l -w] 路径

-c：统计 bytes 数
-m：统计字符数
-l：统计行数
-w：统计单词数

```bash
wc -cmlw demo.text
```

3.15 管道符

管道符：|

将管道左边命令结果作为右边命令输入

```bash
ls /usr/bin | wc -l
```

3.16 echo

在命令行中输出指定内容

echo 输出内容

```bash
echo "hi yqcoder"q
```

3.17 tail

查看文件尾部内容，更新文件的最新更改

tail [-f -num] 路径

-f：持续跟踪
-num：查看尾部多少行，默认 10 行

```bash
tail -f demo.text
```

3.18 重定向符

> ：将左侧命令的结果，覆盖写入右侧的指定文件中

> > ：将左侧命令的结果，追加写入右侧的指定文件中

```bash
echo 'hi yqcoder' >> demo.text
```

3.19 反引号

反引号包裹的内容会当作命令指向

```bash
echo`pwd`
```

4. vim 文本编辑器

vim 文件路径

进入 vim 文本编译器，默认是命令模式，按 i 进入输入模式，按 esc 从输入命令模式，按 shift + : 进入底线命令模式

```bash
vim demo.text
```

4.1 命令模式

| i：插入，进入输入模式
| a：当前光标位置进入输入模式
| I：当前行头进入输入模式
| A：当前行尾进入输入模式
| o：当前行的下一行进入输入模式
| O：当前行的上一行进入输入模式
| k：光标向上
| j：光标向下
| h：光标向左
| l：光标向右
| 0：移动光标到行头
| $：移动光标到行尾
| PgUp：向上翻页
| PgDn：向下翻页
| /：进入搜索模式
| n：向下继续搜索
| N：向上继续搜索
| dd：删除整行
| ndd：n 表示数字，删除当前行下的多少行
| yy：复制当前行
| nyy：复制当前行下的多少行
| p：粘贴
| u：撤销
| ctrl + r：反向撤销
| gg：跳到行首
| G：跳到行尾
| dG：从当前行向下全删除
| dgg：从当前行开始向上全删除
| d$：从光标开始到当前行尾全删除
| d0：从光标开始到当前行头全删除

4.2 输入模式

编辑文件内容

4.3 底线命令模式

| wq：保存并退出
| w：仅保存
| q：仅退出
| q!：强制退出
| set nu：显示行号
| set paste：设置粘贴模式

三、Linux 用户和权限

root 用户为最大权限用户，普通用户没权限的操作，它都有。

1. 切换用户

1.1 su

切换用户

su [-] [用户名]

-：可选，切换用户后加载环境变量
用户名：可选，切换用户，不填切换到 root

```bash
su - ycoder
```

1.2. exit

退回上一个用户，快捷键 ctrl + d

```bash
exit
```

1.3. sudo

为普通命令授权，临时以 root 身份执行，需要给普通用户配置 sudo 认证。

sudo 认证：切换到 root，运行 visudo。在最后添加 ycoder ALL=(ALL) NOPASSWD:ALL

sudo 命令

```bash
sudo mkdir /ycoder
```

1.4 查看用户列表

```bash
ls /home
```

2. 用户/用户组权限

需要 root 用户执行

2.1 groupadd

创建用户组

groupadd 用户组名

```bash
groupadd kf
```

2.2 groupdel

删除用户组

groupdel 用户组名

```bash
groupdel kf
```

2.3 useradd

创建用户

useradd [-g -d] 用户名

-g：指定用户组
-d：指定 home 路径

```bash
useradd yqcoder -g kf -d /home/yqcoder/user
```

2.4 userdel

删除用户

userdel [-r] 用户名

-r：删除用户的 home 目录

```bash
userdel -r yqcoder
```

2.5 id

查看用户所属组

id [用户名]

```bash
id yqcoder
```

2.6 usermod

修改用户所属组

usermod -aG 用户组 用户名

```bash
usermod -aG kf yqcoder
```

2.7 getent

查看所有组

```bash
getent group
```

查看所有用户

```bash
getent passwd
```

3. 权限控制信息

[-dl][r-][w-][x-][r-][w-][x-][r-][w-][x-]

[-dl]：- 表示文件，d 表示文件夹，l 表示软连接
第一个[r-][w-][x-]：所属用户权限，r 读权限，w 写权限，x 执行权限
第二个[r-][w-][x-]：所属用户组权限
第三个[r-][w-][x-]：其他用户权限

```bash
ls -l
```

<!-- 15 -->

4. 修改权限

4.1 chmod

修改文件权限

chmod [-R] 权限 文件或文件夹

-R：对文件夹内素有内容应用相同操作

```bash
chmod -R u=rwx,g=rwx,o=rwx demo.text
```

4.2 快捷方式

将 r 记为 4，w 记为 2，x 记为 1，- 记为 0。那么上面的命令等同于：

```bash
chmod -R 777 demo.text
```

4.3 chown

修改文件所属用户和用户组权限

chown [-R] [用户][:][用户组] 文件或文件夹

-R：对文件夹内素有内容应用相同操作

```bash
chmod -R yqcoder:kf demo.text
```

四、Linux 实用操作

1. 快捷键

ctrl + c：强制停止
ctrl + d：退出登出
history：查看历史命令
!命令前缀：自动匹配上一个命令
ctrl + r：搜索历史命令
ctrl + a：光标移动到命令开始
ctrl + e：光标移动到命令结束
ctrl + 左：左跳单词
ctrl + 右：右跳单词
ctrl + l：清屏
clear：清屏

2. yum 软件安装

RPM 包软件管理器，用于安装 Linux 软件。需要使用 root 用户且联网操作。

yum [-y] [install | remove | search] 软件名称

-y：可选，无需手动确认安装或卸载
install：安装
remove：卸载
search：搜索

```bash
yum -y install wget
```

```bash
yum -y remove wget
```

```bash
yum search wget
```

3. systemctl

控制软件的启动、关闭、开机自启，能被 systemtl 管理的软件称之为服务。比如：NetworkManager 主网络服务、network 副网络服务、firewalld 防火墙服务、sshd，ssh 服务

systemctl start | stop | status | enable | disable 服务名

start：启动
stop：关闭
status：查看状态
enable：开启开机自启
disable：关闭开机自启

```bash
systemctl status firewalld
```

4. ln

创建软连接，将文件、文件夹连接到其他位置。类似于快捷键。

ln -s 被链接文件 连接目的地

-s：创建软连接

```bash
ln -s /etc/yum.conf ~/yum.conf
```

5. date

查看系统的时间

date [-d] [+格式化字符串]

-d：按照给定的字符串显示日期，一般用于日期计算。year、Month、day、hour、minute、second
格式化字符串：%Y 年、%y 年份后两位、%M 月份、%d 日、%H 小时、%M 分钟、%S 秒、%s 时间戳

```bash
date "+%Y-%m-%d %H:%M:%S"
```

计算明天的日期

```bash
date -d "+1 day"
```

6. IP 地址、主机名

6.1 IP 地址

ifconfig

6.2 主机名

查看主机名

```bash
hostname
```

修改主机名

hostnamectl set-hostname 主机名

```bash
hostnamectl set-hostname centos
```

6.3 域名解析

域名解析流程：先看本机记录 window 在 C:\Windows\System32\drivers\etc\hosts 下、Linux 在/etc/hosts 下，如果没有，联网询问 DNS。

7. 网络传输

7.1 ping

检查指定网络服务是否联通

ping [-c num] ip 或主机名

-c：检查次数

```bash
ping -c 4 baidu.com
```

7.2 wget

非交互式文件下载器，可以在命令行内下载网络文件

wget [-b] url

-b：后台下载，下载进度在 wget-log 文件

```bash
wget -b url
```

7.3 curl

发送 http 网络请求，用于下载文件，获取信息

curl [-O] url

-O：url 是下载连接时，保存文件

获取主机公网 IP

```bash
curl cip.cc
```

7.4 端口

公认端口：1-1023，用于系统内置或知名程序预留端口，如 22 SSH 服务，443 HTTPS 服务
注册端口：1024-49151，用于松散的绑定一些程序/服务
动态端口：49152-65535，临时使用

7.5 nmap

查看端口占用情况

安装

```bash
yum -y install nmap
```

使用

```
nmap 127.0.0.1
```

7.6 netstat

查看指定端口占用情况

安装

```bash
yum -y install net-tools
```

netstat -anp | grep 端口号

```bash
netstat -anp | grep 22
```

7.7 新增开放端口

```bash
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
sudo firewall-cmd --reload
```

7.8 查看开放端口

```bash
sudo firewall-cmd --zone=public --list-ports
```

8. 进程管理

8.1 ps

查看进程

进程信息表示：UD 所属用户 ID，PID 进程 ID，PPID 进程父 ID，C CUP 占用率，STIME 启动时间，TTY 终端序号，TIME 占用 CPU 时间，CMD 启动路径

ps [-e -f]

-e：显示全部进程
-f：展示更多信息

```bash
ps -ef
```

8.2 kill

关闭进程

kill [-9] 进程 ID

-9：强制关闭

```bash
kill -9 123
```

9. 主机状态

9.1 top

查看 CPU、内存占用

```bash
top
```

9.2 df

查看硬盘使用情况

df [-h]

-h：单位显示

```bash
df -h
```

9.3 iostat

查看 CUP、磁盘相关信息

iostat [-x] [num1] [num2]

-x：显示更多信息
num1：数字，刷新间隔
num2：数字，刷新几次

```bash
iostat -x 1 3
```

9.4 sar

查看网络相关统计

sar -n DEV num1 num2

-n：查看网络
DEV：查看网络接口
num1：刷新间隔
num2：时间次数

```
sar -n DEV 1 3
```

10. 环境变量

10.1 env

查看环境变量

```bash
env
```

10.2 $

获取环境变量值

```bash
echo $PATH
```

10.3 export

临时设置环境变量

export 变量名=变量值

```bash
export name=yqcoder
```

10.4 永久生效环境变量

针对用户：修改 ~/.bashrc
针对全部用户：/etc/profile

export PATH=$PATH:自定义路径

```bash
export PATH=$PATH:/root/myenv
```

11. 上传、下载

安装 lrzsz

```bash
yum -y install lrzsz
```

11.1 rz

上传

```bash
rz
```

11.2 sz

下载

sz 文件名

```bash
sz /www/dist
```

12. 压缩、解压

12.1 tar

归档文件，将多个文件组装到一个.tar 文件中，文件大小没多少变化。

tar [-c -v -x -f -z -C] 包名 路径...路径

-c：压缩
-v：查看进度
-x：解压
-f：放在最后，要压缩的文件后解压的文件
-z：gzip 格式
-C：解压目的地

将 1.txt 2.txt 压缩成 a.tar

```bash
tar -cvf a.tar 1.txt 2.txt
```

将 1.txt 2.txt 压缩成 a.tar.gz

```bash
tar -zcvf a.tar.gz 1.txt 2.txt
```

解压 a.tar 到 txt 文件夹

```bash
tar -xvf a.tar -C txt
```

解压 a.tar.gz 到 txt 文件夹

```bash
tar -zxvf a.tar.gz -C txt
```

12.2 zip

zip 压缩包

zip [-r] 路径...路径

-r：压缩文件夹是需使用

将 dist 压缩成 dist.zip

```bash
zip -r dist.zip dist
```

12.3 unzip

解压

unzip 压缩包 [-d] 路径

```bash
unzip dist.zip -d admin
```

五、安装部署软件

切换到 root 用户

1. MySQL8.0

1.1 查看是否安装 mysql

```bash
rpm -qa | grep -i mysql
```

1.2 查看 mysql 运行状态

```bash
service mysql status
```

1.3 查看 mysql 对应文件夹

```bash
find / -name mysql
```

1.4 删除安装包

```bash
rpm -ev mysql80-community-release-el7-7.noarch
```

1.5 删除系统中关联文件夹

```bash
rm -rf mysql关联文件
```

1.6 下载 mysql 安装包

```bash
wget https://dev.mysql.com/get/mysql80-community-release-el8-3.noarch.rpm
```

1.7 安装 mysql 安装包

```bash
yum install mysql80-community-release-el8-3.noarch.rpm
```

1.8 查看 mysql 安装

```bash
yum repolist all | grep mysql
```

1.9 安装 mysql 服务器

```bash
yum install mysql-community-server
```

1.10 安装服务报错执行

当执行安装 mysql 服务器报错时执行，然后再执行安装 mysql 服务器命令。

```bash
yum module disable mysql
```

1.11 启动 mysql 服务

```bash
systemctl start mysqld
```

1.12 检查 mysql 服务状态

```bash
systemctl status mysqld
```

1.13 mysql 开机自启

```bash
systemctl enable mysqld
systemctl daemon-reload
```

1.14 获取登录密码

```bash
grep 'temporary password' /var/log/mysqld.log
```

1.15 本地登录 mysql

```bash
mysql -uroot -p
```

1.16 修改密码

```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'P@ssw0rd123';
```

1.17 设置用户密码策略的安全强度

```bash
set global validate_password.policy=LOW;
```

1.18 设置密码长度不少于 4

```bash
set global validate_password.length=4;
```

1.19 查看密码策略

```bash
SHOW VARIABLES LIKE 'validate_password%';
```

1.20 刷新密码生效

```bash
flush privileges;
```

1.21 查看数据库用户

```bash
select user,host from user;
```

1.21 更改远程连接权限

```bash
update user set host='192.168.181.128' where user='root';
update user set host='%' where user='root';
```

1.22 授权 root 远程登录

```bash
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

2. Nginx

2.1 安装 EPEL 存储库

```bash
yum install epel-release
```

2.2 安装 Nginx

```bash
yum install nginx
```

2.3 启动 Nginx 服务

```bash
systemctl start nginx
```

2.4 设置 Nginx 服务开机自启

```bash
systemctl enable nginx
```

2.5 查看 Nginx 配置

```bash
cat /etc/nginx/nginx.conf
```
