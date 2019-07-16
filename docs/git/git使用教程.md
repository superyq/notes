<h1 align="center">git学习笔记</h1>

## 提交,拉取

```
创建版本库: git init
克隆远程仓库: git clone ...
拉取代码: git pull
提交到暂存区: git add
提交到版本库: git commit -m ""
提交到远程仓库: git push
```

## 查看操作

```
查看工作区修改: git status
查看工作区和版本库的不同: git diff
查看commit: git log --pretty=oneline
查看所有所有所有commit: git reflog
```

## 后悔操作

```
并且把这次撤销作为一次最新的提交: git revert ...
版本回退,修改重新放回工作区: git reset ...
版本回退,直接删修改: git reset --hard ...
丢弃工作区修改: git checkout ...
```

## 处理冲突

```
当pull远程仓库时.报冲突错误,直接合并远程仓库和本地仓库: git rebase
解决冲突之后,继续合并本地及远程仓库: git rebase --continue
规范自己的commit: git rebase -i
将工作区的修改储存起来: git stash
将储存的修改暴露出来: git stash pop
将存储的list删除: git stash drop
```

## 分支

```
创建分支: git branch ...
删除分支: git branch -d ...
查看分支: git branch
查看远程分支: git branch -r
查看本地分支及远程分支: git branch -a
切换分支: git checkout ...
合并分支: git merge ...
创建并推送至远端分支: git push origin 分支名
删除远端分支: git push origin --delete 分支名
本地分支和远端分支创建链接：git branch --set-upstream-to=origin/feat feat
```

## 进阶

```
变基同步分支commit: ... rebase ...
捡出一个 commit: git cherry-pick ... commit ...
追加到上一个提交： git commit --amend
查看一个文件的所有历史修改：git log -p 文件名
强推：git push -f
本地有 commit，pull 远端 commit 到本地 commit 之前： git pull --rebase
合并 commit 时未完成就退出后，再操作
继续：git rebase --continue
删除：git rebase --abort
跳过：git rebase --skip
```

## git flow

```
创建：git flow init
创建新功能：git flow feature start name
结束新功能：git flow feature end name
```

## 其他

```
更改文件名称：git mv oldName newName
提交格式化：yarn lint --fix
```

## git ssh添加

```
// 第一步：查看有无id_rsa.pub文件
cd ~/.ssh/

// 第二步：生成id_rsa.pub文件(重点)
ssh-keygen -t rsa -C "1234@qq.com"

// 第三步：添加id_rsa.pub文件到git上
复制里面id_rsa.pub到ssh上
```