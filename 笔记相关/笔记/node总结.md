# node

​					node就是搭建V8引擎的JavaScript的后端运行环境

## 一、内置模块

### 1.1、fs模块与方法

```js
//导入fs模块
const fs = require('fs');

//读取文件    fs.readFile(path,编码格式,function(err,dataStr){})
fs.readFile('./index.html','utf-8',function(err,dataStr){					//读取中文文件时 一定要设置编码格式为utf-8
    if(err)   return console.log('读取文件失败' + err.message);				//有err对象代表读取失败 返回读取失败的信息
    console.log('读取成功' + dataStr)										 //没有err对象说明读取成功 返回读取到的内容dataStr	
})

//写入文件	  fs.writeFile(path,写入的数据,function(err){})		写入的数据可以为空
fs.writeFile('./demo/aa.txt','123',function(err){				
    if(err)   return console.log('写入失败' + err.message);
    console.log('写入成功')
})

```



### 1.2、path模块与方法

```js
//导入path模块
const path = require('path');

//__dirname 是node里面自带的一个属性	返回的是当前文件所在的路径

//path.join('/a','./b','../c/d')   最终返回a/c/d	./代表和当前路径同级  ../代表是当前路径的上一个路径
path.join(__dirname,'/demo/index.html');					//解决路径的动态拼接问题

//path.basename(path,[ext])    返回的是文件夹
path.basename('a/b/c/d/index.html')							//返回的是index.html
path.basename('a/b/c/d/index.html','.html')					//返回的是index

//path.extname(path)			返回的是文件的拓展名
path.basename('a/b/c/d/index.html')							//返回的是.html
```



### 1.3、http模块与方法

```js
//导入http模块
const http = require('http');

//创建http服务
const server = http.createServer();

//监听请求事件		req是客服端传递的参数对象  res是返回给客户端对象
server.on('request',function(req,res){
    var	url = req.url;							//获取客户端的url地址
    res.end(url);								//将url信息现在到客户端上
})

//开启服务器
server.listen(80,function(){
    console.log('服务器启动成功 地址是127.0.0.1:80')
})

//注：如果通过res.end将中午返回给客户端页面 需要设置响应头为utf-8
res.setHeader('Content-Type','text/html;charset=utf-8');
```



## 二、模块化

​			将一个复杂的项目分解成多个小模块   将这些小模块组合起来就是一个完整的项目   如何需要更改相关功能   只需要更改相关模块的功能既可

​			优点：**可复用   	可维护性强		按需加载**



### 2.1、module模块

​			 module模块是在导入包的时候 都会存在的模块 其中exports是该包向我们暴露的对象

```js
const fs = require('fs');
console.log(module.exports);				//输出是fs模块暴露出来的对象
```

​			**注**：exports等价于module.exports，但我们要记住 **我们永远只导入module.exports里面的内容** 一般情况下不要在一个文件中同时使用这两个变量



## 三、包

​				Node.js 中的第三方模块又叫做包    由于 Node.js 的内置模块仅提供了一些底层的 API，导致在基于内置模块进行项目开发的时，效率很低。 包是基于内置模块封装出来的，提供了更高级、更方便的 API，极大的提高了开发效率。

###  

### 3.1、安装包

```
npm install 包名
```

之后的具体使用过程可以看当前包的文档 		官方文档： https://www.npmjs.com/



### 3.2、文件中package.json和node_module

​				在安装完包后 文件夹中会自动生成这两个文件 package.json中包含包名、版本号、作者等相关信息   node_module中包含该包中的源码。

​				**注**：在我们使用git将代码同步到云仓库中 由于node_module文件太大 影响传输效率 通常我们会在.gitignore文件中忽略掉 不去同步到云端

​						但在别人clone我们代码的使用 由于没有安装我们相关的包 是没法运行我们的项目 所以需要使用npm install去安装我们项目所需要的依赖

​						因为我们在package.json中记录的包的名称和版本号 所以可以通过npm	install进行下载

