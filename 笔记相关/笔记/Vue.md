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



## 二、Vue基础

### 2.1、概念

​				Vue是渐进式javacript框架, 一套拥有自己规则的语法



**Vue使用方法：** **传统开发模式**：基于html文件开发Vue 

​						   **工程化开发方式**：在webpack环境中开发Vue，这是最推荐, 企业常用的方式



**Vue文件内容：**template  --- 放的是html代码

​						   script --- 放的是js代码

​						   style --- 放的是css文件



### 2.2、MVVM设计模型

​			设计模式: 是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结。

​			演示: 在上个代码基础上, 在devtool工具改变M层的变量, 观察V层(视图的自动同步)

+ MVVM，一种软件架构模式，决定了写代码的思想和层次
  + M：   model数据模型          (data里定义)	
  + V：    view视图                   （html页面）
  + VM： ViewModel视图模型  (vue.js源码)

- MVVM通过`数据双向绑定`让数据自动地双向同步  **不再需要操作DOM**
  - V（修改视图） -> M（数据自动同步）
  - M（修改数据） -> V（视图自动同步）

![MVVM](D:\github\笔记相关\MVVM.png)

**1. 在vue中，不推荐直接手动操作DOM！！！**  

**2. 在vue中，通过数据驱动视图，不要在想着怎么操作DOM，而是想着如何操作数据！！**(思想转变)

![双向数据绑定](D:\github\笔记相关\双向数据绑定.png)



### 2.3、Vue-cli	

​				Vue-cli又称Vue脚手架 它是第三方模块包 里面帮我们封装配置好了相关webpack 可以实现开箱即用 帮我们省去了繁琐的webpack配置

```bash
# 安装
yarn global add @vue/cli

# 检查是否安装成功
vue -V

# 使用	vue create 文件名  文件名不可以带有中文、空白、下划线等 文件名不可以是vue
vue create vueDemo

# 进入改文件下
cd vueDemo		

# 启动服务
yarn serve
```

```js
//在vue.config.js中设置端口号和自动打开
module.exports = {
  devServer: { // 自定义服务配置
    open: true, // 自动打开浏览器
    port: 3000	//端口号
  },
  lintOnSave:false  //关闭默认的代码差错功能 eslint
}
```

使用Vue-cli搭建的项目文件目录如下：

![image-20211103200324640](D:\github\笔记相关\Vue-cli项目文件目录.png)

**注：src/main.js是为webpack的打包的入口**

​		**src/App.vue是vue文件的跟组件**

​		**public/index.html是浏览器显示的页面**



### 2.4、语法

#### 2.4.1、插值表达式

```vue
<template>
	<!-- 在vue的template中必须含有一个跟标签 -->
	<div>
        <div>{{ msg }}</div>
		<div>{{ obj.name }}</div>
		<div>{{ age >= 18? '成年':'未成年'}}</div>
    </div>
</template>

<script>
export default {
	data(){
        return {
            msg:'hello,world',
            obj:{
                name:'张三'
            }，
            age:18
        }
    }
}
</script>
```



#### 2.4.2、v-bind -- 动态属性

```vue
<template>
  <div>
    <!-- 语法 v-bind:原生属性名='vue变量' -->
    <a v-bind:href="url">去百度</a>
    <!-- 简便语法 :原生属性名='vue变量' -->
    <img :src="img">
    <img :src="localImg" alt="">
  </div>
</template>

<script>
import locImg from './assets/1.gif'
export default {
    data(){
      return {
        url:'http://www.baidu.com',
        img:'https://fanyi-cdn.cdn.bcebos.com/static/translation/widget/footer/Products/img/product-desktop@2x_c85778a.png',
        localImg:locImg
      }
    }
}
</script>
```



#### 2.4.3、v-on -- 事件绑定    事件对象e  v-on -- 修饰符

```vue
<template>
  <div>
    <p>您要购买{{ count }}个苹果</p>
    <!-- 语法 ： v-on:事件名='methods里面的函数 | 要执行的简单代码' -->
    <button v-on:click="count = count + 1">+1</button>
    <button v-on:click="addFn">+1</button>
    <button v-on:click="add(5)">+5</button>
    <!-- 简单语法：@事件名='methods里面的函数 | 要执行的简单代码' -->
    <button v-on:click="del">-1</button>
  </div>
</template>

<script>
export default {
  //所有的vue变量都在data里面声明
  data(){
    return {
      count : 0
    }
  },
  //方法在methods里面声明
  methods:{
    addFn(){
      //this指向的是export default后面的{}对象 data中的数据定义完成后 会自动绑定到该对象后 所以可以使用this.访问data中的数据
      this.count++;
    },
    add(num){
      this.count = this.count + num
    },
    del(){
      this.count--
    }
  }
}
</script>
```

```vue
<template>
  <div>
    <a @click="one" href="http://www.baidu.com">百度</a>
    <hr>
    <a @click="sum(10,$event)" href="http://www.baidu.com">百度</a>
  </div>
</template>

<script>
export default {
  methods:{
    //若函数没有传递参数 则可以直接使用e才获取事件对象
    one(e){
      e.preventDefault();
    },
    //若函数传递的参数 则需要使用$event来获取事件对象 $event与e一一对应
    sum(num,e){
      e.preventDefault();
    }
  }
}
</script>
```

```vue
<template>
  <div>
    <!-- .stop 阻止冒泡
         .prevent 阻止默认行为
         .once click函数只执行一次
     -->
    <div @click="father">
      <p @click.stop="one">one</p>
      <a @click.prevent.stop href="http://www.baidu.com">百度</a>
      <p @click.once="two">two</p>
        
      <input type="text" @keydown.enter="enter">
  	  <br>
  	  <input type="text" @keydown.esc="esc">
  </div>
</template>

<script>
export default {
  methods:{
    father(){
      console.log('father');
    },
    one(){
      console.log('one');
    },
    two(){
      console.log('two');
    },
    enter(){
      console.log('enter');
    },
    esc(){
      console.log('esc');
    }
  }
}
</script>
```

注：更多修饰符查看https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6



#### 2.4.4、v-model -- 双向绑定(表单）

**基本用法：**

```js
<template>
  <div>
    <!-- 
      v-model实现了双向绑定 
      input的value -- vue变量
      目前只能用于表单元素中
     -->
    <span>用户名:</span>
    <input type="text" v-model="username">
    <br>
    <span>密码:</span>
    <input type="password" v-model="pass">
  </div>
</template>

<script>
export default {
  data(){
    return {
      username:'',
      pass:''
    }
  }
}
</script>
```

**表单元素：**

```vue
<template>
  <div>
    <div>
      <!-- 下拉框的v-model需要绑定到select上 -->
      <span>请选择:</span>
      <select v-model="address">
        <option value="北京">北京</option>
        <option value="南京">南京</option>
        <option value="上海">上海</option>
      </select>
    </div>
    <div>
      <!-- 
        复选框需要给每个表单都添加v-model属性
        若绑定的vue变量是非数组 -- 绑定的是复选框的checked值
        若绑定的vue变量是数组 -- 绑定的是复选框的value
       -->
      <span>爱好:</span>
      <input type="checkbox" v-model="hobby" value="抽烟">抽烟
      <input type="checkbox" v-model="hobby" value="喝酒">喝酒
      <input type="checkbox" v-model="hobby" value="烫头">烫头
    </div>
    <div>
      <!-- 单选框 也是需要给每个表单元素绑定v-model -->
      <span>性别:</span>
      <input type="radio" name="sex" value="男" v-model="sex">男
      <input type="radio" name="sex" value="女" v-model="sex">女
    </div>
    <div>
      <!-- 文本框要给表单元素绑定v-model -->
      <span>请输入:</span>
      <textarea v-model="intor"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      address:'',
      hobby:[],
      sex:'',
      intor:''
    }
  }
}
</script>
```

**修饰符：**

```vue
<template>
  <div>
    <div>
      <span>年龄:</span>
      <!-- 将内容转换成数字再给vue变量 -->
      <input type="text" v-model.number="age">
    </div>
    <div>
      <span>人生格言:</span>
      <!-- 突出头尾两处的空格 中间空格不去除 -->
      <input type="text" v-model.trim="motto">
    </div>
    <div>
      <span>自我介绍:</span>
      <!-- 当元素失去焦点并且内容改变才将内容给vue变量 -->
      <textarea v-model.lazy="intro"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      age: "",
      motto: "",
      intro: ""
    }
  }
}
</script>
```



#### 2.4.5、v-text与v-html -- 修改元素内容

```vue
<template>
  <div>
    <!--
      v-text 不能识别html标签
      v-html 可以识别html标签
      它们会覆盖差值表达式的内容
      -->
    <p v-text="str"></p>
    <p v-html="str">{{ 10 + 20 }}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      str:'<span>这是一个span</span>'
    }
  }
}
</script>
```



#### 2.4.6、v-for -- 循环元素

​				**口诀：谁要循环写谁身上**

```vue
<template>
  <div>
    <!-- 
      谁要循环写谁身上
     -->
    <ul>
      <li v-for="(item,index) in arr" :key="index">
        {{ index }} - {{ item }}
      </li>
    </ul>
    
    <div>
      <p v-for="obj in stuArr" :key="obj.id">
        <span>{{ obj.id }}</span>-
        <span>{{ obj.name }}</span>-
        <span>{{ obj.sex }}</span>-
        <span>{{ obj.hobby }}</span>
      </p>
    </div>

    <div>
      <p v-for="(value,key) in tObj" :key="key">
        {{ key }} : {{ value }}
      </p>
    </div>

    <!-- 遍历的元素是数字时 则会从1开始依次输出 -->
    <div>
      <span v-for="i in count" :key="i">{{ i }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      arr: ["小明", "小欢欢", "大黄"],
      stuArr: [
        {
          id: 1001,
          name: "孙悟空",
          sex: "男",
          hobby: "吃桃子",
        },
        {
          id: 1002,
          name: "猪八戒",
          sex: "男",
          hobby: "背媳妇",
        },
      ],
      tObj: {
        name: "小黑",
        age: 18,
        class: "1期",
      },
      count: 10,
    };
  },
}
</script>
```



**v-for实现页面元素变化的本质是 数组元素变化的改变**

```vue
<template>
  <div>
    <ul>
      <li v-for="(item,index) in arr" :key="index">{{ item }}</li>
    </ul>
    <!-- 更改dom的原理是导致原数组改变 -->
    <button @click="resBtn">翻转</button>
    <button @click="sliceBtn">截取前三个</button>
    <button @click="updateBtn">更改第一个值</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      arr : [1,2,3,4,5,6,7,8]
    }
  },
  methods:{
    resBtn(){
      //修改原数组 dom会改变
      this.arr.reverse();
    },
    sliceBtn(){
      //不会修改原数组 dom不会改变
      // this.arr.slice(0,3)

      //解决方法
      this.arr = this.arr.slice(0,3)
    },
    updateBtn(){
      //修改数组内容的值 不会更新dom
      // this.arr[0] = 1000

      //解决方法
      //.$set(需要更新的数组，更新的索引，更新值)
      this.$set(this.arr,0,1000)
    }
  }
}
</script>

<style>

</style>
```



#### 2.4.7、动态class和动态style

```vue
//动态设置class
<template>
  <div>
    <!-- 语法 :class{类名 : 布尔值} -->
    <!-- 注: bool值可以是判断表达式 返回布尔值-->
    <p :class="{red:bool}">动态设置类名</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      bool:true
    }
  }
}
</script>

<style scoped>
  .red{
    color:red
  }
</style>


//动态设置style
<template>
  <div>
    <!-- 语法 :style = {属性名 : 属性值} -->
    <p :style="{backgroundColor:"red"}">动态设置类名</p>
    <p :style="{backgroundColor:color}">动态设置类名</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
     	color:'red'
    }
  }
}
</script>

<style scoped>
</style>
```



#### 2.4.8、过滤器

​               转换格式, 过滤器就是一个**函数**, 传入值返回处理后的值

```js
//在mian.js中定义全局过滤器
// 全局过滤器 必须要在new Vue前面 可在全局文件中使用
Vue.filter('reverse',(val,s)=>{
  return val.split("").reverse().join(s)
})
```

```vue
<template>
  <div>
    <!-- 
      使用语法：处理的数据 | 过滤函数
     -->
    <p>使用前：{{ msg }}</p>
     <!-- 
     全局过滤器的使用
     -->
    <p>使用后：{{ msg | reverse('|')}}</p>
    <p :title="msg | toUp">鼠标停留</p>
    <!-- 
      多个过滤器的使用 
      处理的数据 | 过滤器 | 过滤器 
     -->
    <p :title="msg | toUp | reverse('|')">鼠标停留(多个过滤器使用)</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg:'hello,world'
    }
  },
  //局部过滤器 只能在当前vue文件使用
  filters:{
    toUp(val){
      return val.toUpperCase()
    }
  }
}
</script>

<style>

</style>
```



#### 2.4.9、计算属性

​                计算属性使用场景是 某个值是由多个值共同影响而产生的

```vue
//计算属性的简单用法
<template>
  <div>
    <input type="text" v-model.number="a">
    <br>
    <input type="text" v-model.number="b">
    <p>{{ num }}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      a:'',
      b:''
    }
  },
  computed:{
    //注意计算属性的名字不能与data里面的变量名相同
    num(){
      return this.a + this.b
    }
  }
}
</script>

<style>

</style>


//计算属性的完整用法
<template>
  <div>
    <p>姓名</p>
     <!-- 将表单的值与计算属性full绑定 -->
    <input type="text" v-model="full">
  </div>
</template>

<script>
export default {
  computed:{
    // 计算属性的完整写法
    // 计算属性名：{
    //   set(val){
            
    //   },
    //   get(){
            // return '值'
    //   }
    // }
    full:{
        //用来接收表单传过来的值
      set(val){
        console.log(val);
      },
        //用来修改表单的值
      get(){
        return "无名氏"
      }
    }
  }
}
</script>

<style>

</style>
```

**注：计算属性具有缓存属性 若内容没有改变 但多次进行调用了 该计算属性只执行了一次 之后的数据从缓存里面取 优化了前端的性能**

```vue
<template>
	<!-- 全选反选 -->
  <div>
    <span>全选:</span>
    <input type="checkbox" v-model="isAll"/>
    <button @click="fnChange">反选</button>
    <ul>
      <li v-for="(obj,index) in arr" :key="index">
        <input type="checkbox" v-model="obj.c"/>
        <span>{{ obj.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        {
          name: "猪八戒",
          c: false,
        },
        {
          name: "孙悟空",
          c: false,
        },
        {
          name: "唐僧",
          c: false,
        },
        {
          name: "白龙马",
          c: false,
        },
      ],
    };
  },
  computed:{
    // isAll(){
    //   return this.arr.every(obj => obj.c)
    // }
    isAll:{
      set(val){
        // 更改数组里面c的值
        this.arr.forEach(obj => obj.c = val)
      },
      get(){
        return this.arr.every(obj => obj.c)
      }
    }
  },
  methods:{
    fnChange(){
      this.arr.forEach(obj => obj.c = !obj.c)
    }
  }
};
</script>
```



#### 2.4.10、监听器

​		**简单数据监听：**

```vue
<template>
  <div>
    <input type="text" v-model="name">
  </div>
</template>

<script>
export default {
  data(){
    return {
      name:'zhangsan'
    }
  },
  // 当输入框里面的内容发生改变时 会触发监听器 所要监听的元素都写在watch中
  watch:{
    //所要监听的vue变量
    name(newVal,oldVal){
      // newVal是更新后的值 oldVal是更新后的值
      console.log(newVal,oldVal);
    }
  }
}
</script>

<style>
</style>
```



​		**复杂数据监听(深度监听)：**

```vue
<template>
  <div>
    <input type="text" v-model="user.name">
    <input type="text" v-model="user.age">
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:{
        name:'zs',
        age:20
      }
    }
  },
  // 当输入框里面的内容发生改变时 会触发监听器
  watch:{
    // 监听复杂数据类型写法 对象、数组等
    user:{
      // handler是固定写法
      handler(newVal,oldVal){
        console.log(newVal,oldVal == undefined? oldVal : oldVal.name);		//写这个判断的原因是 一开始oldVal是undefined
      },
      // 设置监听为深度监听
      deep:true,
      // 设置网页一加载就执行一次
      immediate:true
    }
  }
}
</script>

<style>
</style>
```





### 2.5、v-for更新检测原理

​				v-for的前端更新效率是非常高的 原因是它是拿**新的虚拟DOM**与**旧的虚拟DOM**采用**diff算法**进行对比 **未修改的元素继续复用 修改的元素再去更新**

![image-20211104203319518](D:\github\笔记相关\新旧虚拟DOM对比.png)



#### 2.5.1、虚拟DOM

​				虚拟DOM的本质是**存储在内存中的js对象** 在js对象中只存储有效属性 无用属性并不会去存储

```vue
// template的标签结构
<template>
    <div id="box">
        <p class="my_p">123</p>
    </div>
</template>
```

```js
//内存中的js对象
const dom = {
    type: 'div',
    attributes: [{id: 'box'}],
    children: {
        type: 'p',
        attributes: [{class: 'my_p'}],
        text: '123'
    }
}
```

以后vue数据更新

* 生成新的虚拟DOM结构
* 和旧的虚拟DOM结构对比
* 利用diff算法, 找不不同, 只更新变化的部分(重绘/回流)到页面 - 也叫打补丁

==好处1: 提高了更新DOM的性能(不用把页面全删除重新渲染)==

==好处2: 虚拟DOM只包含必要的属性(没有真实DOM上百个属性)==

**总结: 虚拟DOM保存在内存中, 只记录dom关键信息, 配合diff算法提高DOM更新的性能**

在内存中比较差异(只会同级比较)  然后给真实DOM打补丁更新上 



#### 2.5.2、diff算法(v-for中key的作用)

​				vue用diff算法, 新虚拟dom, 和旧的虚拟dom比较

##### 情况一：根元素不同 

​				直接将旧DOM整个删除 重新加载新DOM



##### 情况二：根元素相同 属性改变

​				其余元素进行复用 只更新属性值



##### 情况三：根元素相同 子元素改变 无key  以元素进行对比

​				就地更新 相同的元素进行复用 重新赋值 新增   图解如下：  **总共修改了四个元素**

![image-20211104210552597](D:\github\笔记相关\diff算法无key图解.png)



##### 情况四：根元素相同 子元素改变 有key key值为数组索引  以key值进行对比

​				实现的情况和无key值相同 就地更新 相同的元素进行复用 重新赋值 新增   图解如下：  **总共修改了四个元素**

![image-20211104211018062](D:\github\笔记相关\diff算法key为索引图解.png)

![新_vfor更细_无key_就地更新](D:\github\笔记相关\key为索引和无key-就地更新.gif)



##### 情况五：根元素相同 子元素改变 有key key值为id  以key值进行对比

​				不会就地更新 因为id的唯一性 之前的相同元素都会进行复用 只会修改新增元素

​				新DOM里数据的key存在, 去旧的虚拟DOM结构里找到key标记的标签, 复用标签

​				新DOM里数据的key存在, 去旧的虚拟DOM结构里没有找到key标签的标签, 创建

​				旧DOM结构的key, 在新的DOM结构里没有了, 则==移除key所在的标签==

图解如下：**总共修改两个元素 ** 效率更高

![image-20211104211735719](D:\github\笔记相关\diff算法key值为id图解.png)

![新_vfor更细_有key值为id_提高性能更新](D:\github\笔记相关\key为id流程.gif)



### 2.6、Vue组件化

​			将Vue分为一个一个小组件 组件内的变量互不影响 防止了变量名的冲突 组件也可以进行复用优化开发

​			**补：vue文件中style标签中scoped的作用是给当前标签添加一个哈希值 实现每个css类对应相应vue文件**



#### 2.6.1、组件通信 父 -> 子

​				父组件的信息需要传递给子组件

```vue
// 父组件(App.vue) 基础写法
<template>
  <div>
    <!-- 
      父组件（app.vue） -> 子组件（MyProuduct.vue）传递变量
     -->
     <!-- 使用组件 -->
    <MyP title="烤鸭" price='20' intro="真好吃 不打折"> </MyP>
    <MyP title="烤鸡" price='50' intro="不好吃 打8折"></MyP>
    <MyP title="炸鸡" price='10' intro="真好吃 又便宜 打11折"></MyP>
  </div>
</template>

<script>
//导入组件
import MyP from './components/MyProuduct.vue'
export default {
  //注册组件
  components:{
    MyP:MyP
  }
}
</script>

<style>
</style>

// 父->子 循环写法
<template>
  <div>
    <!-- 
      v-for循环 遍历循环组件
     -->
    <MyP v-for="obj in list" :key="obj.id"
      :title="obj.proname"
      :price="obj.proprice"
      :intro="obj.info"
    ></MyP>
  </div>
</template>

<script>
import MyP from './components/MyProuduct.vue'

export default {
  data(){
    return {
      list: [
    { id: 1, proname: "超级好吃的棒棒糖", proprice: 18.8, info: '开业大酬宾, 全场8折' },
    { id: 2, proname: "超级好吃的大鸡腿", proprice: 34.2, info: '好吃不腻, 快来买啊' },
    { id: 3, proname: "超级无敌的冰激凌", proprice: 14.2, info: '炎热的夏天, 来个冰激凌了' },
],
    }
  },
  components:{
    MyP:MyP
  }
}
</script>

<style>

</style>
```

```vue
//子组件
<template>
  <div class="my-product">
    <h3>标题: {{ title }}</h3>
    <p>价格: {{ price }}元</p>
    <p>{{ intro }}</p>
  </div>
</template>

<script>
export default {
  // 定义变量 接收父组件传递来的变量
  props: ['title', 'price', 'intro']
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```



#### 2.6.2、组件化通信 子 -> 父

 				由于组件通信之间具备**单向数据流**的特点 所以子 -> 父无法向父 -> 子那样去传递数据 需要借助**自定义事件**实现该功能

```vue
// 子组件
<template>
  <div class="my-product">
    <h3>标题: {{ title }}</h3>
    <p>价格: {{ price }}元</p>
    <p>{{ intro }}</p>
    <button @click="fn">砍一元</button>
  </div>
  
</template>

<script>
import eventBus from '../EventBus/index'

export default {
  // 定义变量 接收父组件传递来的变量
  props: ['index','title', 'price', 'intro'],

  methods:{
    // 当点击是触发该函数
    fn(){
      // 用来触发父组件自定义事件 并传递相应参数 使用$emit可以实现数据传递
      //this.$emit(自定义事件名,[...传递的相应参数])
      this.$emit('subprice',1,this.index)   //子向父组件传递
    },
  }
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

```vue
// 父组件
<template>
  <div>
    <!-- 
      v-for循环 遍历循环组件
      定义自定义事件subprice 用来改变数据 同时接收子组件传递当前的索引
     -->
    <MyP v-for="(obj,index) in list" :key="obj.id"
      :title="obj.proname"
      :price="obj.proprice"
      :intro="obj.info"
      :index='index'
      @subprice='fn'
    ></MyP>
  </div>
</template>

<script>
import MyP from './components/MyProuduct-sub.vue'

export default {
  data(){
    return {
      list: [
    { id: 1, proname: "超级好吃的棒棒糖", proprice: 18.8, info: '开业大酬宾, 全场8折' },
    { id: 2, proname: "超级好吃的大鸡腿", proprice: 34.2, info: '好吃不腻, 快来买啊' },
    { id: 3, proname: "超级无敌的冰激凌", proprice: 14.2, info: '炎热的夏天, 来个冰激凌了' },
],
    }
  },
  components:{
    MyP:MyP
  },
  methods:{
    // 自定义事件的处理函数  可以接收子组件传递过来的值
    fn(val,index){
      this.list[index].proprice > 1 && (this.list[index].proprice = (this.list[index].proprice - val).toFixed(2))
    }
  }
}
</script>

<style>

</style>
```



#### 2.6.3、组件化通信 子 -> 子

​				因为子组件与子组件之间不存在联系 无法传递数据 所以我们借用**EventBus**来实现子组件之间数据传递 

​				**EventBus原理：**是src目录下的文件夹 里面包含一个index.js文件 js文件的本质就是一个空的Vue对象

![image-20210416122123301](D:\github\笔记相关\子组件之间传递信息图解.png)

```js
//src/EventBus/index.js 文件内容
import Vue from 'vue'			//导入vue对象

export default new Vue()		//导出一个vue的空对象
```

```vue
//子组件一 
<template>
  <div class="my-product">
    <h3>标题: {{ title }}</h3>
    <p>价格: {{ price }}元</p>
    <p>{{ intro }}</p>
    <button @click="fn">砍一元</button>
  </div>
  
</template>

<script>
//导入vue空对象 EventBus 后面的index.js可以省略不写 导入时默认找文件下的index.js文件
import eventBus from '../EventBus/index'

export default {
  // 定义变量 接收父组件传递来的变量
  props: ['index','title', 'price', 'intro'],

  methods:{
    // 当点击是触发该函数
    fn(){
      // 用来触发父组件自定义事件 并传递相应参数
      //this.$emit(自定义事件名,[...传递的相应参数])
      //this.$emit('subprice',1,this.index)   //子向父组件传递
      eventBus.$emit('send',this.index,1)   //子组件与子组件进行传递
    },
  }
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

```vue
//子组件二
<template>
  <ul class="my-product">
      <li v-for="(item, index) in arr" :key="index">
          <span>{{ item.proname }}</span>
          <span>{{ item.proprice }}</span>
      </li>
  </ul>
</template>

<script>
//导入vue空对象 EventBus 后面的index.js可以省略不写 导入时默认找文件下的index.js文件
import eventBus from '../EventBus/index'

export default {
  props: ['arr'],
    // 注册组件完成 监听send事件
  created(){
    // 用来接受其他组件传来的数据 然后处理数据
    eventBus.$on('send',(index,val) => {
      this.arr[index].proprice > 1 && (this.arr[index].proprice = (this.arr[index].proprice - val).toFixed(2))
    })
  }
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```



















