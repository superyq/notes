# git 笔记

### 提交,拉取

```
创建版本库: git init
克隆远程仓库: git clone ...
拉取代码: git pull
提交到暂存区: git add
提交到版本库: git commit -m ""
提交到远程仓库: git push
```

### 查看操作

```
查看工作区修改: git status
查看工作区和版本库的不同: git diff
查看commit: git log --pretty=oneline
查看所有所有所有commit: git reflog
```

### 后悔操作

```
版本回退,修改重新放回工作区: git reset ...
版本回退,直接删修改: git reset --hard ...
丢弃工作区修改: git checkout ...

```

### 处理冲突

```
当pull远程仓库时.报冲突错误,直接合并远程仓库和本地仓库: git rebase
解决冲突之后,继续合并本地及远程仓库: git rebase --continue
规范自己的commit: git rebase -i
将工作区的修改储存起来: git stash
将储存的修改暴露出来: git stash pop
将存储的list删除: git stash drop
```

### 分支

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
```

### 修改文件名

```
git mv oldName newName /*更改文件名称*/
```

### 提交格式化

```
yarn lint --fix
```

### 进阶

- 从本地分支切换创建分支: git flow feature start fix
- 变基: feature-fix rebase dev
- 从其他分支捡出一个 commit: git cherry-pick feature-fix commit 名
- 合并 commit 时未完成就退出后，再操作

```
git rebase --continue
git rebase --abort
git rebase --skip
```

- 追加修改到上一个提交或修改上一个提交的 message： git commit --amend
- 查看一个文件的所有历史修改：git log -p 文件名
- 合并一个 commit：git cherry-pick \$commit
- 强推：git pull -f
