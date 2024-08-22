# Nginx 代理速通

[Nginx 官网](https://nginx.org/en/download.html)，本博客展示了 Nginx 在 Linux 系统下的使用。不熟悉 Linux 系统的小伙伴可以移步[Linux 操作系统速通]()

一、安装

1. 查看是否已安装

```bash
rpm -qa | grep nginx
```

2. 卸载已安装 Nginx

2.1 停止 Nginx 服务

```bash
systemctl stop nginx
```

2.2 卸载 Nginx 软件包

```bash
yum remove nginx
```

3. 安装 Nginx

3.1 安装 EPEL 存储库

扩展软件包选择、丰富功能和应用、保持更新、支持第三方软件依赖

```bash
yum install epel-release
```

查看是否安装 EPEL 储存库

```bash
rpm -qa | grep epel-release
```

3.2 安装 Nginx

```bash
yum install nginx
```

3.3 启动 Nginx 服务

```bash
systemctl start nginx
```

3.4 查看 Nginx 进程

```bash
ps -ef | grep nginx
```

3.5 设置 Nginx 服务开机自启

```bash
systemctl enable nginx
```

3.6 查看 Nginx 配置

```bash
cat /etc/nginx/nginx.conf
```

4. 查看 Nginx 文件位置

4.1 配置文件

/etc/nginx

4.2 主程序文件

/usr/sbin/nginx

4.3 网站根目录(默认)

/usr/share/nginx/html
