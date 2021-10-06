# git使用

### 一、git简介

​			**Git** 是一个开源的分布式版本控制系统，是目前世界上最先进、最流行的版本控制系统。可以快速高 效地处理从很小到非常大的项目版本管理。 特点：项目越大越复杂，协同开发者越多，越能体现出 Git 的高性能和高可用性！

​			GIt分为三个区域：**工作区	暂存区	仓库区**



### 二、git相关使用

#### 2.1、设置用户名和邮箱

​			刚启动时就需要进行设置

```
git config --global user.name 'username'						//用来设置用户名
git config --global user.email '1228617366@qq.com'				//用来设置电子邮箱
```

**注：**可以通过c盘下用户名.gitconfig查看用户名和邮箱  也可以使用以下代码进行查看

```
git config --list			//查看所有的配置
git config user.name		//查看用户名
git config user.email		//查看电子邮箱
```



#### 2.2、初始化

```
git init					//将该文件夹变成git仓库 并在该文件下生成一个.git的隐藏文件
```



#### 2.3、查看仓库下文件的状态

```
git status					//查看当前仓库下的文件状态		完整显示
git status					//查看当前仓库下的文件状态		简介显示
```



#### 2.4、将未监听的文件加入暂存区

```
git add index.html			//将新建的index.html文件加入到暂存区   也可以将修改后的文件 加入到暂存区
git add .					//将工作区所有的文件都加入到暂存区
```



#### 2.5、提交到仓库区

```
git commit -m '描述文字'		//将暂存区所有的文件都添加到仓库区
```



#### 2.6、删除工作区中的文件

```
git rm -f index.html			//将index.html文件从仓库区和工作区都删除
git rm -cached index.html		//只将index.html文件从仓库区删除 工作区的文件还保存
```



#### 2.7、查看提交历史并回退到相应版本

```
//查看提交历史
git log							//查看当前版本之前的提交历史
git log -2 --pretty=oneline		//查看最近的两条历史记录 并且在一行显示
git reflog						//查看所有的提交历史

//回退到之前的版本
git reset --hard 版本号			//回退到输入的版本号那个版本
```

