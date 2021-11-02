# Vue

## 一、webpack基本使用

### 1.1、yarn

​				yarn是类似于npm的包管理工具 但是它比npm更快 以后我们都使用yarn

```bash
# 安装yarn
npm install yarn -g

# 初始化 生成package.json文件 注意 ： 名字不能包括中文或者空格
yarn init

# 使用yarn下载其他包 @后面添加版本号
yarn add jquery@3.5.1

# 使用yarn卸载包
yarn remove jquery

# 安装全局依赖
yarn

# 打包命令
yarn webpack
```



### 1.2、webpack

​				webpack是第三方模块 用来打包压缩代码的   官网：https://www.webpackjs.com/concepts/

​				作用：1. 减少文件数量 2. 缩减代码体积 3. 提高浏览器打开的速度 4.实现js的降级(ES6/7/8 => ES5 )，兼容低版本的浏览器

​				**注：在webpack中万物皆模块**

```bash
# 安装 —D是代表在生产环境使用 webpack-cli是webpack包的管理工具
yarn add webpack webpack-cli -D
```

​				注:使用前需要将"scripts": { "build": "webpack",}加入到package.json中  若加入该代码 则打包命令变成yarn build

**打包的执行过程如下：**

![打包执行过程](D:\github\笔记相关\打包执行过程.png)



### 1.3、设置出入口路径

​				webpack的**默认入口**是src下的index.js文件 即所有需要打包的文件都需要在index.js文件中引入 

​				webpack的默认出口是dist文件下的main.js文件 所有打包完成后的代码都在main.js中

```js
//在文件的根目录下 创建webpack.config.js文件 在里面添加一下配置
const path = require('path')								//导入path内置模块

module.exports = {
    entry : "./src/index.js", 							//设置入口文件的路径是当前文件下src的index.js文件
    output:  {
    	path: path.resolve(__dirname, 'dist'),      	//输出的文件夹名和路径
    	filename: 'bundle.js'                       	//输出的文件名
  	}
}
```



### 1.4、简单打包js文件

```js
// src/add/add.js  一个简答的求和函数
const addFn = (a,b)=>a+b

--------------------------------

// src/index.js  根据设置的入口来
import addFn from './add/add.js'
console.log(addFn(5,2))

--------------------------------

// dist/bundle.js  打包后的内容 
(()=>{"use strict";console.log(7)})();
```

注：若原文件进行了修改 这需要再次运行打包命令 重新打包代码



### 1.5、打包html文件

​			  这里需要使用webpack中的插件——**html-webpack-plugin** 它可以帮助我们实现打包html文件的功能

```bash
# 安装
yarn add html-webpack-plugin -D
```

```js
// 配置webpack.config.js文件
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  ...其他代码
  plugins: [new HtmlWebpackPlugin({
    template:'./public/index.html'              //设置生成的html的文件模块
  })]
};
```



### 1.6、打包css和less等文件

​			  由于webpack本身只能识别js文件 只能打包js文件 我们要向打包css等相关文件 我们需要用到webpack中的loader(加载器)——**css-loader** 打包less文件与之类似 自行官网查找

```bash
# 安装 
yarn add style-loader css-loader -D
```

```js
// 配置webpack.config.js文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // ...其他代码
    module: { 	 //加载器配置
        rules: [ // loader的规则
          {
            test: /\.css$/, // 匹配所有的css文件
            // use数组里从右向左运行
            // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
            // 再用 style-loader 将样式, 把css插入到dom中
            use: [ "style-loader", "css-loader"]
          }
        ]
    }
}
```

​			**注：配置完 写完代码后需要将文件导入到入口文件中**



### 1.7、处理图片文件和字体图标文件

​			 webpack5, 使用asset module技术实现字体文件和图片文件处理, 无需配置额外loader 

```js
// 配置webpack.config.js文件
module.exports = {
    ...其他代码
    rules: [ // loader的规则
      {
        //配置处理图片的模块
        test: /\.(png|jpg|gif|jpeg)$/i,
        type: 'asset'
        //如果是asset模式下
        //若文件小于8kb 则转成base64的图片格式
        //若文件大于8kb 则将原文件引入到dist文件下 
      },
    
      { // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:6][ext]'
        }
      },
    ]
}
```



### 1.8、对js实现降级处理

​			 由于在开发的过程中 有时候需要对低版本浏览器进行支持 所以我们需要将高版本的js语法全都转换成es5的语法 这里我们使用的**babel**和**babel-loader**

​			**babel:** 一个javascript编译器, 把高版本js语法降级处理输出兼容的低版本语法

​			**babel-loader:** 可以让webpack转译打包的js代码

```bash
# 安装
yarn add -D babel-loader @babel/core @babel/preset-env
```

```js
// 配置webpack.config.js文件
module: {
  rules: [
    {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,			//忽略读取这些文件
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'] // 预设:转码规则(用bable开发环境本来预设的)
            }
        }
    }
  ]
}
```



### 1.9、webpack开发服务器

​			 由于使用webpack打包完成后 再次对代码进行更改后还需要再次进行打包 这个过程是非常耗时的 我们可以使用**webpack-dev-server**模块，它会帮我们缓存文件 每次打包只更新的内容 并自动返回

```bash
# 安装
yarn add webpack-dev-server -D

# 启动
yarn serve
```

```js
// 配置package.json文件 
scripts: {
	"build": "webpack",
	"serve": "webpack serve"
}

// 在webpack.config.js文件中可以配置端口号  默认是8080
module.exports = {
    // ...其他配置
    devServer: {
      port: 3000 // 端口号
    }
}
```



