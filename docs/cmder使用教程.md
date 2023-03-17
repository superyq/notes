# cmder使用教程

## cmder添加到全局变量

```
添加全局变量后，cmder使用时，就不用加具体安装位置了
此电脑-》属性-》高级设置-》环境变量-》系统变量里的path添加cmder的目录地址：d:\cmder
```

## cmder添加到鼠标右键

```
对开始菜单按钮右击，选择打开windows powershell的管理员模式，执行以下命令即可：Cmder.exe /REGISTER ALL
```      

## cmder中文乱码

```
Settings->Startup->Environment 添加set LANG=zh_CN.UTF-8、set LC_ALL=zh_CN.utf8
```

## cmder从鼠标右键删除

```
计算机\HKEY_CLASSES_ROOT\Directory\Background\shell（删除cmder）
```
