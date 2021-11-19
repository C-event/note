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



#### 2.4.3、v-on -- 事件绑定、事件对象e 、v-on -- 修饰符

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

```vue
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
//在main.js中定义全局过滤器
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



#### 2.4.11、计算属性(computed)与监听器(watch)的区别

​	**计算属性computed：**

- 支持缓存，只有依赖数据发生改变，才会重新进行计算
- 不支持异步，当computed内有异步操作时无效，无法监听数据的变化
- computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值
- 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed
- 如果computed属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。



​	**侦听属性watch：**

- 不支持缓存，数据变，直接会触发相应的操作；

- watch支持异步；

- 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；

- 当一个属性发生变化时，需要执行对应的操作；一对多；

- 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数：

  **immediate：组件加载立即触发回调函数执行**

  **deep: 深度监听数据变化 即监听复杂数据类型变化**



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

​				**注：父向子传递数据的时候 若传递的是简答数据类型是直接传值过去 子组件更改会报出警告 若传递的是复杂数据类型 则传递的是地址 子组件可以修改 						同时父组件内容也会改变**

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



### 2.7、vue的生命周期

​				一个vue组件从创建到销毁的过程 就是vue的生命周期 其中vue生命周期一共包括**四个阶段 八个函数**

**初始化阶段  ： beforeCreate()     created()**

**捕获阶段：beforeMount()  mounted()**

**更新阶段：beforeUpdate()  updated()**

**销毁阶段：beforeDestroy()  destroyed()**

<img src="D:\github\笔记相关\vue生命周期图解.png" alt="Day03" style="zoom:50%;" />



### 2.8、钩子函数

作用: 特定的时间点，执行特定的操作

场景: 组件创建完毕后，可以在created 生命周期函数中发起Ajax 请求，从而初始化 data 数据



| **阶段** | **方法名**    | **方法名** |
| -------- | ------------- | ---------- |
| 初始化   | beforeCreate  | created    |
| 挂载     | beforeMount   | mounted    |
| 更新     | beforeUpdate  | updated    |
| 销毁     | beforeDestroy | destroyed  |



**注：其中初始化和挂载阶段的钩子函数在都带一定时间后 都会自动执行  但是更新的钩子需要在需要数据触发 才会执行  而销毁阶段函数 需要vue组件被销毁才会执行** 

```vue
//子组件  list.vue
<template>
  <div>
    <p>{{ msg }}</p>
    <ul id="myUL">
      <li v-for="(itme, index) in arr" :key="index">{{ itme }}</li>
    </ul>
    <button @click="arr.push(100)">加</button>
  </div>
</template>

<script>
//export default之后的{}就是一个vue的实例化对象
export default {
  data() {
    return {
      msg: "hello",
      arr: [1, 2, 3, 4, 5],
      timer: null,
    };
  },
  //一、初始化
  //执行时间：在vue对象实例化后 --- 给vue对象挂载属性和方法之间执行
  beforeCreate() {
    console.log("beforeCreate -- 执行");
    console.log(this.msg); // undefined
  },
  //执行时间：给vue对象挂载属性和方法初始化之后
  //使用场景 ：网络请求 全局的事件(滚动事件等)
  created() {
    console.log("created -- 执行");
    console.log(this.msg);
    this.timer = setInterval(() => {
       console.log("haha");
    }, 1000);
  },

  // 二、挂载
  //执行时间：属性和方法初始化完成后 真实DOM挂在之前
  //使用场景：预处理data数据
  beforeMount() {
    console.log("beforeMount -- 执行");
    console.log(document.getElementById("myP"));
  },
  //执行时间：真实DOM挂载之后
  //使用场景: 获取真实DOM元素操作DOM
  mounted() {
    console.log("mounted -- 执行");
    console.log(document.getElementById("myP"));
  },

  // 三、更新（数据发生改变才触发）
  // 执行时间： 更新之前(获取不到新增元素)
  beforeUpdate() {
    console.log("beforeUpdate -- 执行");
    console.log(document.querySelectorAll("#myUL>li")[5]); //undefined
  },
  // 执行时间： 更新之后(可以获取到新增元素)
  updated() {
    console.log("updated -- 执行");
    console.log(document.querySelectorAll("#myUL>li")[5]);
  },

  // 四、销毁
  //执行时间： v-if=false销毁vue实例
  //使用场景： 释放全局时间 定时器 计时器 全局事件等 (在两个事件那个里面执行都行)
  beforeDestroy() {
    console.log("beforeDestroy -- 执行");
    clearInterval(this.timer); // 销毁全局定时器
  },
  destroyed() {
    console.log("destroyed -- 执行");
  },
};
</script>

<style>
</style>
```

```vue
//父组件 App.vue
<template>
  <div>
    <h1 id="myP">1、生命周期</h1>
    <Life v-if="a"></Life>
    <button @click="a = false">销毁组件</button>
  </div>
</template>

<script>
import Life from "./components/life.vue";

export default {
  data() {
    return {
      a: true,
    };
  },
  components: {
    Life,
};
</script>

<style>
</style>
```



### 2.9、Vue中获取DOM元素和$nextTick的作用

**Vue中获取DOM元素：$refs**

```vue
<template>
  <div>
    <p>1、获取DOM元素</p>
    <h1 id="h" ref="myH">我是一个孤独可怜又能吃的h1</h1>
    <hr />
    <p>2、获取组件对象 -- 可以使用里面的属性和方法</p>
    <Demo ref="de"></Demo>
    <hr />
    <p>3. vue更新DOM是异步的</p>
    <p ref="myP">{{ count }}</p>
    <button @click="btn">点击count+1, 马上提取p标签内容</button>
  </div>
</template>

<script>
import Demo from "./Child/demo.vue";
export default {
  data() {
    return {
      count: 0,
    };
  },
  // 在真实dom挂载完成后获取元素
  mounted() {
    console.log(document.getElementById("h")); // h1
    console.log(this.$refs.myH); // h1

    //获取组件Demo 并执行fn函数
    this.$refs.de.fn();
  },
  components: {
    Demo,
  },
  methods: {
    btn() {
      this.count++;
      //因为vue中修改dom中的值是个异步操作 所以打印结果是0
      // console.log(this.$refs.myP.innerHTML);

      // DOM更新完成会挨个触发$nextTick里的函数体
      this.$nextTick(() => {
        console.log(this.$refs.myP.innerHTML);
      });
    },
  },
};
</script>

<style>
</style>
```

**Vue中$nextTick的作用**

```vue
<template>
  <div>
    <input ref="myInp" type="text" placeholder="这是一个输入框" v-if="isShow" />
    <button v-else @click="btn">点击我进行搜索</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    btn() {
      this.isShow = true;
      //因为vue操作dom是异步操作  所以获取不到该dom元素 这段代码会报错
      // this.$refs.myInp.focus();

      //解决方法一： 使用$nextTick
      this.$nextTick(() => {
        this.$refs.myInp.focus();
      });
    },
    // async btn() {
    //   this.isShow = true;
    //   // 解决方法二：因为$nextTick返回的是一个promise对象 所以可以使用await和async解决
    //   await this.$nextTick();
    //   this.$refs.myInp.focus();
    // },
  },
};
</script>

<style>
</style>
```



### 2.10、组件中name的作用

​				组件中的name可以当做组件的别名使用

```vue
// 子组件
<template>
  <div>
    <p>我是一个Com组件</p>
  </div>
</template>

<script>
export default {
  name: "ComNameHaHa", // 注册时可以定义自己的名字
};
</script>

<style>
</style>

-----------------------------------------------------------------

// 父组件
<template>
  <div>
    <h1>组件中name的作用</h1>
    <ComNameHaHa></ComNameHaHa>
  </div>
</template>

<script>
import Com from "./components/Com.vue";

export default {
  components: {
    [Com.name]: Com, //注册时要是用[组件名.name]：组件名来设置
    //等价于: 'ComNameHaHa' : Com
  },
};
</script>

<style>
</style>
```



### 2.11、动态组件

​				多个组件使用同一个挂载点，并动态切换，这就是动态组件 其中要使用**component**来设置挂载点 

```vue
<template>
  <div>
    <button @click="comName = 'UserName'">账号密码填写</button>
    <button @click="comName = 'UserInfo'">个人信息填写</button>

    <p>下面显示注册组件-动态切换:</p>
    <div style="border: 1px solid red">
      <!-- 设置挂载点 -->
      <component :is="comName"></component>
    </div>
  </div>
</template>

<script>
// 导入组件
import UserName from "../components/01/UserName";
import UserInfo from "../components/01/UserInfo";

export default {
  data() {
    return {
      comName: "UserName",
    };
  },
  components: {
    UserName,
    UserInfo,
  },
};
</script>

<style>
</style>

--------------------------------------------------------

//UserName.vue
<template>
  <div>
      <div>
          <span>用户名:</span>
          <input type="text">
      </div>
      <div>
          <span>密码:</span>
          <input type="password">
      </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>

------------------------------------------------------

// UserInfo.vue
<template>
  <div>
      <div>
          <span>人生格言:</span>
          <input type="text">
      </div>
      <div>
          <span>个人简介:</span>
          <textarea></textarea>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```



#### 2.11.1、动态组件的缓存

​			**动态组件的原理**：由于动态组件的切换来设置该vue实例的添加和销毁 性能并不是很高  所以我们使用**keep-alive**来实现动态组件的缓存 同时使用缓存后 该组件会多出**两个钩子函数 activated 和 deactivated 来监听组件是获取激活还是失去激活**

```vue
<template>
  <div>
    <button @click="comName = 'UserName'">账号密码填写</button>
    <button @click="comName = 'UserInfo'">个人信息填写</button>

    <p>下面显示注册组件-动态切换:</p>
    <div style="border: 1px solid red">
      <!-- 使用keep-alive包裹起来的的组件 它会进行缓存 -->
      <keep-alive>
        <component :is="comName"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import UserName from "../components/02/UserName";
import UserInfo from "../components/02/UserInfo";

export default {
  data() {
    return {
      comName: "UserName",
    };
  },
  components: {
    UserName,
    UserInfo,
  },
};
</script>

<style>
</style>

-----------------------------------------------------------------

//UseName.vue
<template>
  <div>
    <div>
      <span>用户名:</span>
      <input type="text" />
    </div>
    <div>
      <span>密码:</span>
      <input type="password" />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log("创建了");
  },
  destroyed() {
    console.log("销毁了");
  },
  // 被缓存的组件会多了两个钩子函数
  activated() {					//获得激活时触发
    console.log("Username-激活了");
  },
    
  deactivated() {				//失去激活时触发
    console.log("UserInfo-切走了");
  },
};
</script>

<style>
</style>
```



### 2.12、组件插槽

​				vue提供组件插槽能力, 允许开发者在封装组件时，把不确定的部分定义为插槽(slot)

#### 2.12.1、组件插槽的基本使用

```vue
// 子组件
<template>
  <div>
    <!-- 按钮标题 -->
    <div class="title">
      <h4>芙蓉楼送辛渐</h4>
      <span class="btn" @click="isShow = !isShow">
        {{ isShow ? "收起" : "展开" }}
      </span>
    </div>
    <!-- 下拉内容 -->
    <div class="container" v-show="isShow">
      <!-- 插槽的占位符 里面的内容是默认的内容 若不传值则显示默认内容 -->
      <slot>默认内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
};
</script>

-----------------------------------------------------------------------

// 父组件
<template>
  <div id="container">
    <div id="app">
      <h3>案例：折叠面板</h3>
      <Pannel>
        <img src="../assets/mm.gif" alt="" />
        <span>我是span</span>
      </Pannel>
      <Pannel>
        <!-- 可以根据自己想要的内容更换插槽中的内容 -->
        <p>寒雨连江夜入吴,</p>
        <p>平明送客楚山孤。</p>
        <p>洛阳亲友如相问，</p>
        <p>一片冰心在玉壶。</p>
      </Pannel>
      <Pannel> </Pannel>
    </div>
  </div>
</template>

<script>
// 导入组件
import Pannel from "../components/03/Pannel.vue";
export default {
  // 注册组件
  components: {
    Pannel,
  },
};
</script>
```



#### 2.12.2、具名插槽

​					当一个组件中 有多个不确定部分时 就需要使用具名插槽 即给每个插槽设置一个name属性 开发者根据name属性来实现内容和插槽的对应

```vue
// 父组件
<template>
  <div id="container">
    <div id="app">
      <h3>案例：折叠面板</h3>
      <Pannel>
        <!-- 使用v-slot来指定插槽 -->
        <template v-slot:title>
          <span>你好啊</span>
        </template>
        <template v-slot:content>
          <img src="../assets/mm.gif" alt="" />
          <span>我是span</span>
        </template>
      </Pannel>

      <Pannel>
        <!-- v-slot的简写方法 #name名-->
        <template #title>
          <span>hello</span>
        </template>
        <template #content>
          <p>寒雨连江夜入吴,</p>
          <p>平明送客楚山孤。</p>
          <p>洛阳亲友如相问，</p>
          <p>一片冰心在玉壶。</p>
        </template>
      </Pannel>

      <Pannel>
        <template #title>
          <span>hi</span>
        </template>
          <!-- 若有插槽不传值 则显示默认值 -->
      </Pannel>
    </div>
  </div>
</template>

<script>
import Pannel from "../components/04/Pannel.vue";
export default {
  components: {
    Pannel,
  },
};
</script>

--------------------------------------------------------------------------------------------

// 子组件
<template>
  <div>
    <!-- 按钮标题 -->
    <div class="title">
      <slot name="title"></slot>
      <span class="btn" @click="isShow = !isShow">
        {{ isShow ? "收起" : "展开" }}
      </span>
    </div>
    <!-- 下拉内容 -->
    <div class="container" v-show="isShow">
      <!-- 插槽的占位符 里面的内容是默认的内容-->
      <slot name="content">默认内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
};
</script>
```



#### 2.12.3、作用域插槽

​					子组件里值, 在给插槽赋值时在父组件环境下使用

```vue
// 父组件
<template>
  <div id="container">
    <div id="app">
      <h3>案例：折叠面板</h3>
      <Pannel>
        <!-- 使用v-slot="scope"可以获取到slot插槽中绑定的内容{row:defaultObj} -->
        <template v-slot="scope">
          <span>{{ scope.row.defaultTwo }}</span>			// 修改子组件的内容
        </template>
      </Pannel>
    </div>
  </div>
</template>

<script>
import Pannel from "../components/05/Pannel.vue";
export default {
  components: {
    Pannel,
  },
};
</script>

-----------------------------------------------------------------------------

// 子组件
<template>
  <div>
    <div class="title">
      <h1>芙蓉楼送辛渐</h1>
      <span class="btn" @click="isShow = !isShow">
        {{ isShow ? "收起" : "展开" }}
      </span>
    </div>
    <div class="container" v-show="isShow">
        <!-- 使用:属性名=‘属性值’  可以让父组件v-slot获取到该对象 -->
      <slot :row="defaultObj">{{ defaultObj.defaultOne }}</slot>		// 若无传值这显示该默认信息
    </div>
  </div>
</template>

<script>
export default {
  // 作用域插槽使用场景：使用插槽时 需要使用插槽中的变量
  data() {
    return {
      isShow: false,
      defaultObj: {
        defaultOne: "无名氏",
        defaultTwo: "小传同学",
      },
    };
  },
};
</script>
```



### 2.13、自定义指令

​				  由于vue里面的内置指令有些无法满足我们的需求 所以我们可以自定义属性 来实现我们想要的功能

```js
// 全局自定义指令
Vue.directive('gfouce',{
    inserted(el){
        el.focus();
    }
})

// 定义另一个自定义指令 里面的update可以监听vue变量的变化 其中el是该DOM元素 binding是用来接收传递的参数 
Vue.directive('color',{
    inserted(el,binding){
        el.style.color = binding.value
    },
    // 变量改变的时候触发
    update(el,binding){
        el.style.color = binding.value
    }
})
```

```vue
<template>
  <div>
    <!-- <input type="text" v-gfouce /> -->
    <input type="text" v-focus />
    <!-- 自定义指令 -->
    <!-- <p v-color="'red'">修改文字颜色</p> -->
    <p v-color="colorStr">修改文字颜色</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorStr: "red",
    };
  },
  // 局部自定义指令
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style>
</style>
```



## 三、axios使用

特点

* 支持客户端发送Ajax请求
* 支持服务端Node.js发送请求
* 支持Promise相关用法
* 支持请求和响应的拦截器功能
* 自动转换JSON数据
* axios 底层还是原生js实现, 内部通过Promise封装的

**注：使用axios 最终给我们返回的是一个Promise实例 可通过.then、.catch获取成功和失败的结果**

```bash
# 在项目中安装安装
yarn add axios
```

```js
// 项目中到导入
import axios from 'axios'
// 全局配置根路径
axios.defaults.baseURL = "http://123.57.109.30:3006";
```

```js
// 使用
// GET请求
 axios({
        url: "/api/getbooks",
        // url: "http://123.57.109.30:3006/api/getbooks?bookname=" + this.bname,
        method: "GET",
        params: {
          bookname: this.bname,
        },
    .then((res) => console.log(res)) 			//打印成功结果
	.catch(err => console.log(err))				//打印错误信息

// POST请求
axios({
        url: "/api/addbook",
        method: "POST",
        data: {
          appkey: "7250d3eb-18e1-41bc-8bb2-11483665535a",
          ...this.bookObj,								//js高级语法 拓展运算符 将对象解析出来
        },
    .then(res => console.log(res)) 			//打印成功结果
	.catch(err => console.log(err))				//打印错误信息
```



## 四、Vue路由(vue-router)

注：vue-router中自带的两个对象 **$route**和**$router**  前者用来**获取当前的路由**  而后者**获取的全局的路由**(本质是个vue实例对象) 我们可以对它使用相应方法

### 4.1、基本使用

​			实现页面与组件之间的映射  

优点：

* 整体不刷新页面，用户体验更好
* 数据传递容易, 开发效率高
* 可以实现局部刷新 不会全局刷新

缺点：

* 开发成本高(需要学习专门知识)
* 首次加载会比较慢一点。不利于seo

```bash
# 安装 
yarn add vue-router
```

```js
// main.js中导入
import VueRouter from "vue-router"
// 导入组件
import My from '@/views/My'						// @ 在vue中代表当前文件下src的绝对路径
import Part from '@/views/Part'

// 全局注册
Vue.use(VueRouter)

// 定义规则 页面与组件的相互对应
const routes = [
    {
        path:'/find',
        component: Find
    },
    {
        path:'/my',
        component:My
    },
]

// 生成路由对象
const router = new VueRouter({
    routes:routes;						//路由对象中 routes是key(必须)  这边可以简写为routes
})

// 将路由对象添加到vue实例中
new Vue({
    router:router,             //这边可以简写为router
    render: h => h(App),
}).$mount('#app')

// 在vue文件中 导入router-view标签占位
//<router-view></router-view>
```



### 4.2、重定向

​			 当用户访问某个页面时 让页面跳转到另一个页面

```js
// 在定义规则中写
const routes = [
    {
        path:'/'			//即访问的根路径
        redirect:'/find'	//当用户访问根路径时 自动定向到find页面
    },
    {
        path:'/find',
        component: Find
    },
    {
        path:'/my',
        component:My
    },
]
```



### 4.3、错误404设置

​			  当用户访问不存在的路由是 回事一个空白页面 并且控制台会报错 所以这是我需要设置404页面来提醒用户

```js
//在mian.js的规则中定义

// 导入404组件
import NotFound from '@/views/NotFound'

const routes = [
    {
        path:'/'			
        redirect:'/find'	
    },
    {
        path:'/find',
        component: Find
    },
    {
        path:'/my',
        component:My
    },
    // 切记这段要写在最后面 因为路由的查找是从上到下依次查找
    {		
        path:'*',						// * 代表没有规则 任何路径都可以匹配
        component:NotFound
    },
]
```



### 4.4、路由模式的修改

​			  由于路由模式默认的是hash模式 在路径上会自带一个# 看起来不好看 所以我们可以在实例化vuerouter对象时 进行更改

```js
const router = new VueRouter({
    routes,
    mode:'history'						//设置路由模式为history  但部署到服务器上时需要进行设置 因为服务器上这个默认访问的是文件夹
})
```



### 4.5、声明式导航-渲染

​				当我们使用a链接实现页面的转换切换时  我们可以使用**router-link**实现声明式渲染 它会自动帮我们给当前激活的标签添加两个类 我们可以自行对该类进行设置 

**注：router-link-exact-active  (精确匹配) url中hash值路径, 与href属性值完全相同, 设置此类名**

​		**router-link-active             (模糊匹配) url中hash值,    包含href属性值这个路径**

```vue
<template>
  <!-- 声明式导航 
  router-link是vue-router中自带的全局组件的 可以帮助我们实现声明式导航
  我们点击时 会自动为该元素添加两个激活类 我们可以自行对激活进行设置

  语法: <router-link to='路径地址'>标题名</router-link>

  -->
  <div>
    <div class="footer_wrap">
      <router-link to="/find">发现音乐</router-link>
      <router-link to="/my">我的音乐</router-link>
      <router-link to="/part">朋友</router-link>
    </div>
    <div class="top">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer_wrap {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  text-align: center;
  background-color: #333;
  color: #ccc;
}
.footer_wrap a {
  flex: 1;
  text-decoration: none;
  padding: 20px 0;
  line-height: 20px;
  background-color: #333;
  color: #ccc;
  border: 1px solid black;
}
.footer_wrap a:hover {
  background-color: #555;
}
.top {
  padding-top: 62px;
}

/* 对激活类的设置 */
.footer_wrap .router-link-active {
  color: white;
  background: black;
}
</style>
```

### 4.6、声明式导航-传值

​				在拼接的路径后面添加数据 该路由组件可以通过**$route.query.属性名** 和 **$route.params.属性名** 来获取到值数据

```js
// 使用$route.params.属性名来传值时要在main.js 的配置 规则
const routes = [
    {   
        // 传值方法二 ：需要设置 路径(可以拼接多个组件) /:属性名/:属性名/...
        path: '/part/:username/:id', 
        component: Part 
    },
]
```

```vue
// App.vue中
<template>
  <div>
    <div class="footer_wrap">
      <router-link to="/find">发现音乐</router-link>
      <router-link to="/my">我的音乐</router-link>
      <router-link to="/part">朋友</router-link>
      <!-- 传值方法一 后面拼接 ?属性名=值 -->
      <router-link to="/part/?name=小明">朋友小明</router-link>
      <!-- 传值方法二 后面直接拼接值 但需要在main.js中设置 -->
      <router-link to="/part/小红">朋友小红</router-link>
    </div>
    <div class="top">
      <router-view></router-view>
    </div>
  </div>
</template>

// 路由组件
<template>
  <div>
    <!-- 通过$route.query.属性名 可以获取到方法一的值
         通过$route.params.属性名 可以获取到方法二的值
     -->
    <p>
      人名：{{ $route.query.name }}--{{ $route.params.username
      }}{{ $route.params.id }}
    </p>
  </div>
</template> 
```



### 4.7、编程式导航

​			  我们除了可以使用vue-router中自带的router-link来实现声明式导航  我们也可以使用原生的方法来实现导航 即**编程式导航**

```vue
// App.vue
<template>
  <!-- 声明式导航 
  router-link是vue-router中自带的全局组件的 可以帮助我们实现声明式导航
  我们点击时 会自动为该元素添加两个激活类 我们可以自行对激活进行设置
  -->
  <div>
    <div class="footer_wrap">
      <span @click="btn('/find', 'Find')">发现音乐</span>
      <span @click="btn('/my', 'My')">我的音乐</span>
      <span @click="btn('/part', 'Part')">朋友小明</span>
    </div>
    <div class="top">
      <!-- 路由挂载点 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 使用this.$router.push({path:路径名})
    // 使用this.$router.push({name:name名})  使用name名是需要在规则中声明
    // 使用name时 路径上还是使用的path 使用name所以跟方便日后修改(更改路径中的path name不会修改)
    btn(path, name) {
      this.$router.push({
        // path: path,
        name: name,
      });
    },
  },
};
</script>
```



### 4.8、编程式导航-传值

```vue
<template>
  <div>
    <div class="footer_wrap">
      <span @click="one">朋友小智</span>
    </div>
    <div class="top">
      <!-- 路由挂载点 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 注:使用path传值的时候会忽略params 所以推荐使用name+query的方式传递 
    // 当路径上的hash值与你要跳转的hash一直 会报出冗余问题 不会进行路径跳转
    // 若这边使用query传值 则接收方也需要使用$route.query.属性名接收
    one() {
      this.$router.push({
        // path: "/part",
        name: "Part",
        query: {
          name: "小智", //使用属性名和属性值的传值方式
        },
        params: {
          username: "小智",
        },
      });
    },
  },
};
</script>
```



### 4.9、路由嵌套

​			 若在当前路由下 还需要进行切换页面 只需要在里面在嵌套一个路由即可 vue文件里面的写法相同 但需要在main.js配置

```js
// main.js
const routes = [
    ...
    
    {
        path:"/find",
        name:'Find',
        component:Find,
        children:[     //路由里面在嵌套一个路由
            {
                path:'recommend',
                component:Recommend
            },
            {
                path:'ranking',
                component:Ranking
            },
            {
                path:'songlist',
                component:SongList
            }
        ]
    },
    ...
]
```



### 4.10、路由守卫

​				当用户访问某个路由时  我们需要对此进行权限设置 这时候我们就需要使用到**路由守卫**

```js
// main.js
...
// 路由守卫 用户访问路由时 需要进行权限认证的时候使用
const isLogin = false;  //登录状态
router.beforeEach((to, from, next) => {
    // to 代表要去那个路由
    // from 代表从那个路由来
    // next是一个函数 next() 代表正常放行 next(false)代表停在当前页面 next('路径名')代表要强制跳转到对应路由
    // 注意: 若next不写 则会默认停在原地
    if(to.path=='/my' && isLogin == false){
        alert("请先登录")
        next(false);
    }else{
        next()
    }
})
...
```



## 五、vue移动端组件库 - vant

详情请看：https://element.eleme.cn/#/zh-CN/

### 5.1、vant自动适配组件

​		**postcss postcss-pxtorem**

* postcss – 配合webpack翻译css代码
* postcss-pxtorem – 配合webpack, 自动把px转成rem
* 新建postcss.config.js – 设置相关配置
* 重启服务器, 再次观察Vant组件是否适配

```bash
# 安装  postcss-pxtorem@5.1.1用来适配vue-cli 2.0
yarn add postcss postcss-pxtorem@5.1.1    
```

在postcss.config.js的添加一下配置

```js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 能够把所有元素的px单位转成Rem
      // rootValue: 转换px的基准值。
      // 例如一个元素宽是75px，则换成rem之后就是2rem。
      rootValue: 37.5,				//
      propList: ['*']
    }
  }
}
```



## 六、vuex - 集中式数据状态管理器

### 6.1、使用配置

```bash
# 安装
yarn add vuex || npm install vuex
```

```js
// src/store/index.js 进行配置
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    // 共享数据仓库
    state:{},
    // 数据处理 类似于vue中的computed
    getters:{},
    // 编写异步程序 间接修改state仓库中的数据
    actions:{},
    // 编写同步程序 唯一直接修改state仓库中数据的方法
    mutations:{},
    modules:{}
})
```

```js
// 全局注册（main.js）
new Vue({
  render: h => h(App),
  store                 // 当仓库在全局中注册之后 每个vue组件中都会有一个$store对象
}).$mount('#app')
```



### 6.2、store中每个对象的具体使用方法

​			 **每个对象用法的图解**

![image-20211115205153978](D:\github\笔记相关\vuex里面各个对象用法图解.png)

#### 6.2.1、state的使用

​				**作用：用来存储共享数据的仓库**

```vue
<template>
  <div class="add">
    <!-- 方法一：$store.state.key -->
    <h3>仓库中num的值为 {{ $store.state.num }}</h3>
    <h3>仓库中num的值为 {{ num }}</h3>
  </div>
</template>

<script>
// 方法二：导入辅助函数
import { mapState } from "vuex";
export default {
  // 建议给每个组件都起一个名字 方便在vue调试器中查找使用
  name: "Reduce",
  computed: {
    ...mapState(["num"]), // 将仓库里面的数据映射到计算属性中 映射后 可以直接通过num来访问
  },
};
</script>
```



#### 6.2.2、mutations的使用

​				**作用：唯一修改state里面数据的方法**

​				**注：里面只能编写同步代码**

```js
// src/store/index.js
let store = new Vuex.Store({
  // 开启严格模式
  strict:true,
  
  state:{
    // 用来存储共享数据数据
    num:1000,
  },

  // 唯一用来更改state里面数据的方法
  // 注意：mutations里面只能放 同步代码  异步代码放到actions里面
  mutations:{
    changeNum(state,data){
      // console.log(state);  表示仓库数据
      // console.log(data);   传递来的实参
      state.num += data
    },
  }
})
```

```vue
<template>
  <div class="add">
    <p>
      <button @click="$store.state.num = 300">错误示范</button>
        <!-- vue调试无法捕获到变化
           严格模式下会抛出错误
       -->
       <!-- 方法一 -->
      <button @click="$store.commit('changeNum', 10)">num递增10</button>
      
      <button @click="changeNum(-10)">num递减10</button>
    </p>
  </div>
</template>

<script>
// 方法二：导入辅助函数
import { mapMutations } from "vuex";
export default {
  // 建议给每个组件都起一个名字 方便在vue调试器中查找使用
  name: "Reduce",
  methods: {
    ...mapMutations(["changeNum"]),
  },
};
</script>
```



#### 6.2.3、action的使用

​				**作用：异步间接修改state数据**

```js
// src/store/index.js
let store = new Vuex.Store({
  // 开启严格模式
  strict:true,
  
  state:{
    // 用来存储共享数据数据
    num:1000,
  },
    
  // 唯一用来更改state里面数据的方法
  // 注意：mutations里面只能放 同步代码  异步代码放到actions里面
  mutations:{
    changeNum(state,data){
      // console.log(state);  表示仓库数据
      // console.log(data);   传递来的实参
      state.num += data
    },
  }

  // 异步修改state  原理 ： 通过context.commit(方法名，实参)调用mutations里面的函数
  actions:{
    changeNumAsync(context,data){
      // console.log(context);  上下文实例对象 可以理解为仓库实例
      // console.log(data);   传递过来的实参
      setTimeout(()=>{
        context.commit('changeNum',data)
      },2000)
    },
  }
})
```

```vue
<template>
  <div class="add">
    <p>
       <!-- 方法一 -->
      <button @click="$store.dispatch('changeNumAsync', 10)">异步递增10</button>
      
      <button @click="changeNumAsync(-5)">异步num递减5</button>
    </p>
  </div>
</template>

<script>
// 方法二：导入辅助函数
import { mapActions } from "vuex";
export default {
  // 建议给每个组件都起一个名字 方便在vue调试器中查找使用
  name: "Reduce",
  methods: {
    ...mapActions(["changeNumAsync"]),
  },
};
</script>
```



#### 6.2.4、getters的使用

​				**作用：将数据进行处理并且返回**

```js
// src/store/index.js
let store = new Vuex.Store({
  // 开启严格模式
  strict:true,
  
  state:{
    // 用来存储共享数据数据
    num:1000,
  },
    
   // 对数据进行处理 类型于vue中的computed
  getters:{
    // state是仓库中的state
    nickname(state){
      return state.userInfo.nickname
    },
    // 箭头函数的简便写法
    mobile:state=>state.userInfo.mobile
  },
})
```

```vue
<template>
  <div class="add">
    <p>
       <!-- 方法一 -->
    <h3>用户的手机号是：{{ $store.getters.mobile }}, 用户的昵称是：{{ $store.getters.nickname }}</h3>
      
    <h3>用户的手机号是：{{ mobile }}, 用户的昵称是：{{ nickname }}</h3>
      
    </p>
  </div>
</template>

<script>
// 方法二：导入辅助函数
import { mapGetters } from "vuex";
export default {
  // 建议给每个组件都起一个名字 方便在vue调试器中查找使用
  name: "Reduce",
  computed: {
    ...mapGetters(["nickname", "mobile"]),
  },
};
</script>
```



### 6.3、案例：vuex的简单使用

```js
// src/store/index.js
// 全局配置vuex

import Vue from "vue"
import Vuex from 'vuex'

import {UserDate} from '../api/user';

// 在vue中安装vuex插件
Vue.use(Vuex)

// 创建仓库实例
let store = new Vuex.Store({
  // 开启严格模式
  strict:true,
  
  state:{
    // 用来存储共享数据数据
    num:1000,
    userInfo:JSON.parse(localStorage.getItem('userInfo')) || {}
  },

  // 唯一用来更改state里面数据的方法
  // 注意：mutations里面只能放 同步代码  异步代码放到actions里面
  mutations:{
    changeNum(state,data){
      // console.log(state);  表示仓库数据
      // console.log(data);   传递来的实参
      state.num += data
    },
    setUserInfo(state,data){
      // 将数据存储到仓库中
      state.userInfo = data
      //数据的持久化
      localStorage.setItem('userInfo',JSON.stringify(data))
    }
  },

  // 异步修改state  原理 ： 通过context.commit(方法名，实参)调用mutations里面的函数
  actions:{
    changeNumAsync(context,data){
      // console.log(context);  上下文实例对象 可以理解为仓库实例
      // console.log(data);   传递过来的实参
      setTimeout(()=>{
        context.commit('changeNum',data)
      },2000)
    },
    
    // 发起ajax请求
   async login(context,data){
      let {data:res} = await UserDate(data)
      // console.log(res);
      context.commit('setUserInfo',res.data.userInfo)
    }
  },

  // 对数据进行处理 类型于vue中的computed
  getters:{
    // state是仓库中的state
    nickname(state){
      return state.userInfo.nickname
    },
    // 箭头函数的简便写法
    mobile:state=>state.userInfo.mobile
  },
  modules:{}
})

// 向外导出实例对象
export default store
```

```vue
// app.vue
<template>
  <div class="app">
    <div class="box">
      <p>用户名：<input v-model="formData.mobile" type="text" /></p>
      <p>密码： <input v-model="formData.password" type="text" /></p>
      <p><button @click="login">登录</button></p>
      <hr />
      <!-- 传一个空对象 相当于退出功能 -->
      <p><button @click="$store.commit('setUserInfo', {})">退出</button></p>
    </div>
    <div class="flex-box">
      <Add></Add>
      <Reduce></Reduce>
    </div>
  </div>
</template>

<script>
// 导入组件
import Add from "./components/Add.vue";
import Reduce from "./components/Reduce.vue";
export default {
  components: {
    Add,
    Reduce,
  },
  data() {
    return {
      formData: {
        mobile: "17342065909",
        password: "admin888",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.formData);
    },
  },
};
</script>

<style>
.box {
  width: 1200px;
  border: 2px solid blue;
  min-height: 100px;
  margin: 10px auto;
}
.flex-box {
  width: 1200px;
  display: flex;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #aaa;
}
</style>
```

```vue
// 组件Add.vue
<template>
  <div class="add">
    <p>这是一个增加组件</p>
    <!-- 方法一：$store.state.key -->
    <h3>仓库中num的值为 {{ $store.state.num }}</h3>
    <h3>
      用户的手机号是：{{ $store.getters.mobile }}, 用户的昵称是：{{
        $store.getters.nickname
      }}
    </h3>
    <p>
      <!-- vue调试无法捕获到变化
           严格模式下会抛出错误
       -->
      <button @click="$store.state.num = 300">错误示范</button>
      <button @click="$store.commit('changeNum', 10)">num递增10</button>
      <button @click="$store.dispatch('changeNumAsync', 10)">异步递增10</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "Add",
  created() {
    console.log(this.$store);
  },
};
</script>

<style scoped>
.add {
  width: 600px;
  background-color: pink;
  min-height: 200px;
}
</style>
```

```vue
// 组件Reduce.vue
<template>
  <div class="reduce">
    <p>这是一个减少组件</p>
    <h3>仓库中num的值为 {{ num }}</h3>
    <h3>用户的手机号是：{{ mobile }}, 用户的昵称是：{{ nickname }}</h3>
    <p>
      <button @click="changeNum(-10)">num递减10</button>
      <button @click="changeNumAsync(-5)">异步num递减5</button>
    </p>
  </div>
</template>

<script>
// 方法二：导入辅助函数
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  // 建议给每个组件都起一个名字 方便在vue调试器中查找使用
  name: "Reduce",
  computed: {
    ...mapState(["num"]), // 将仓库里面的数据映射到计算属性中 映射后 可以直接通过num来访问
    ...mapGetters(["nickname", "mobile"]), // 将getters里面的方法映射到计算属性中
  },
  methods: {
    // 将仓库里面mutations的方法映射到methods里面 可以直接通过函数名调用
    ...mapMutations(["changeNum"]),

    // 将actions里面的方法映射到methods里面
    ...mapActions(["changeNumAsync"]),
  },
};
</script>

<style scoped>
.reduce {
  width: 600px;
  background-color: skyblue;
  min-height: 200px;
}
</style>
```

