



# JS基础

#### 1、js简介

​			Js是运行在客户端的脚本语言，它是由ECMAScript语法、DOM、BOM一起组成的。

![](C:\Users\12286\Desktop\我的文件\笔记相关\js的组成.png)

**ECMAScript语法**：是由ECMA 国际（ 原欧洲计算机制造商协会）进行标准化的一门编程语言，这种语言在万维网上应用广 泛，它往往被称为 JavaScript 或 JScript，但实际上后两者是 ECMAScript 语言的实现和扩展。ECMAScript 规定了JS的编程语法和基础核心知识，是所有浏览器厂商共同遵守的一套JS语法工业标准。

**DOM**：文档对象模型，是W3C组织推荐的处理可扩展标记语言的标准编程接口。 通过 DOM 提供的接口可以对页面上的各种元素进行操作（大小、位置、颜色等），网页中的元素都是DOM，**例如div、a等**。

**BOM**：是指浏览器对象模型，它提供了独立于内容的、可以与浏览器窗口进行 互动的对象结构。通过BOM可以操作浏览器窗口，**比如弹出框、控制浏览器跳转、获取分辨率等。**

#### 2、js数据类型

​		**基本数据类型**：String、Number、Boolean、undefined、null、symbol（es6新增）

​		**引用数据类型**：Object、Array、Function。

​		

##### 		2.1、如何判断数据类型 	typeof 	instanceof

​			**typeof**可以判断所有的基础数据类型(除了null)，复杂数据类型只能判断function，其他全部返回object。

```js
typeof 1;							//Number
typeof "1";							//String
typeof true;						//Boolean
typeof undefined; 					//undefined
typeof null;						//Object
typeof sort();						//Function
typeof [];							//Object
typeof {};							//Object							
typeof console;						//Object
typeof console.log;					//Function
```

​			

​			**instanceof**是用来检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上，只能用来判断复杂数据类型，无法判断简单数据类型，返回的是								布尔值。

```js
var arr = [];
arr instanceof Array;					//true

var obj {};
obj instanceof Object;					//true

function move(){};
move instanceof Function;				//true

var num = 1;
num instanceof Number;					//false

var num = new Number(1);
num instanceof Number;					//true
```

​	**区别：1、typeof会返回一个变量的基本类型，instanceof返回的是一个布尔值**

​				**2、instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型**

​				**3、而typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了function 类型以外，其他的也无法判断 都返回						Object**

​		

​	**Object.prototype.toString().call()**可以判断所有元素类型，包括null,Math,Date等。 返回的是[Object，数据类型]



#### 3、数据类型转换

##### 		3.1、隐式转换（通用）

​				通过+、-、*、%、>=、<=、！=等运算，会将元素进行隐式转换，转换后的元素类型默认是字符型，若用是比较大小则默认为数字型。例子如下：

```js
var str="12";
str=str+12  //str=1212; 后面的数字被隐式转换成字符型。
```

​		

##### 		3.2、转换成字符型

​				.toString;

​				String();

```js
var num = 12; 	//数字型
var newstr = num.toString;	//方法一
var newstr2 = String(num);	//方法二
```



##### 3.3、转换成数字型

​				parseInt();   将元素转换成整型，若有小数则值保留前面的整数。

​				parseFloat();  将元素转换成浮点型，浮点型和整型都可以保留。（常用）。

​				Number(); 将元素转换成数字型，浮点型和整型都可以保留和parsefloat()类似,推荐使用parsefloat();

```js 
var str = "123.456";
var num = parseInt(str);	//num=123;
var newnum = parseFloat(str);	//newnum=123.456;
var newnum2 = Number(str);	//newnum2=123.456;
```

**注；Number中有一个变量NaN 它是判断的这个数是不是一个数字 可以使用isNaN()方法 判断这个数是不是数字 若是数字返回的是false 若不是返回的是true**



##### 3.4、转成成布尔型

​				Boolean();	将元素转换成布尔型，转换规则：0、null、undefined、NaN转换成布尔型都为false，其他元素转换都为true。

``` js
var str ;
var boolean = Boolean(str); // boolean = false; 
var newstr = "null";
var boolean2 = Boolean(str) // boolean2 = true;
```



#### 4、运算符

##### 4.1、算数运算符

​		+、-、*、%（取余数）、/（除，保留小数）等。

![](C:\Users\12286\Desktop\我的文件\笔记相关\算数运算符.png)

**自增、自减、前置增（减）、后置增（减）；**

```js
var num = 1;
num++;	// num = 2
++num;	//num = 3
var newnum = num++ + ++num;	//num = 8 后增（减）：延后加，在下步才会执行加（减）。前置加（减），直接执行。
```



##### 4.2、比较运算符

![](C:\Users\12286\Desktop\我的文件\笔记相关\比较运算符.png)



##### 4.3、逻辑运算符

​						**逻辑与比逻辑非优先级高 逻辑非优先级最高**

![](C:\Users\12286\Desktop\我的文件\笔记相关\逻辑运算符.png)



#### 5、分支语句和循环语句

##### 5.1、分支语句

​		if(条件判断){

​			满足条件执行语句

​		}else{

​			不满足条件执行语句

​		}

```js
var week = prompt("请输入日期");
    if (week % 7 == 0) {
      alert("这是周日");
    }
    else if (week % 7 == 1) {
      alert("这是周一");
    }
    else if (week % 7 == 2) {
      alert("这是周二");
    }
    else if (week % 7 == 3) {
      alert("这是周三");
    }
    else if (week % 7 == 4) {
      alert("这是周四");
    }
    else if (week % 7 == 5) {
      alert("这是周五");
    }
    else if (week % 7 == 6) {
      alert("这是周六");
    }						//ifelse 于elseif类似
```



##### 5.2、循环语句

​		for(循环判断){

​			满足执行语句

​		}

​		**双for循环是先执行完里面的循环，再去执行外面的循环。会使用双for实现正三角型**

​		while（循环判断）{

​			满足执行语句

​		}

```js
//for循环 
var str = "";
    for (var i = 1; i <= 5; i++) {
      for (var j = 1; j <= i; j++) {
        str += "☆";
      }
      str += "\n"
    }
    console.log(str);
//冒泡排序
for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
      }

//while循环
 var i = 0;
    var count = 0;
    while (true) {
      i++;
      if (i % 7 == 0 && i % 3 == 0) {
        // console.log(i);
        count++;
        if (count == 35) {
          console.log(i);
          break;
        }
      }
    }
```

​		**break与continue的区别：break直接退出整个循环，continue是跳出当前循环执行下一次的循环。**

​		

#### 6、数组

##### 6.1、定义

​		方法一：new Array();

​		方法二：var arr = a[];

​	**注：数组里面的元素没有类型限制，存储任何类型都可以(对象、数组)**



##### 6.2、遍历数组

```js
 var arr = [1, 2, 3, 4, 5];
    for (var i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
```

##### 6.3、内置方法★

```js
//详细见内置方法中的Array
```



##### 6.4、数组去重★

```js
//使用indexOf去重
var arr = [1,1,1,2,3,4,4,4,5];
var newArr = [];
for(var i = 0;i < arr.length;i++){
    if(newArr.indexOf(arr[i]) == -1){
        newArr.push(arr[i]);
    }
}

//使用双for去重
for(var i = 0;i < arr.length;i++){
    var flag= true;
    for(var j = 0;j < newArr.length;j++){
        if(arr[i] == newArr[j]){
            flag = false;
            break;
        }
    }
    if(flag){
        newArr.push(arr[i]);
    }
}

//使用filter去重	原理 使用indexof返回元素的第一个索引号 判断第一个索引是否等于当前索引实现去重
var newarr = arr.filter(functiton(value,index,array){
	return arrat.indexOf(value) == index;                        
})
```



#### 7、函数

##### 	7.1、变量：是使用关键字在内存中开辟空间用来存储数据使用的。

​					关键字：var(es5)；let、const（es6新增）

```js
var num = 0;
let num1 = 1;
const num2 = 2;//const 声明的是一个常量 简单数据类型是不可以修改它的值 复杂数据类型只要不修改他的地址 里面内容可以随意修改
```

##### 7.2、定义

function 变量名（形参）{

​			代码段；

}

变量名（实参）；（函数的调用）

```js
function max(a, b) {
      return a > b ? a : b;
}
alert(max(5,4));		//5
```



##### 	7.3、作用域

​			**全局作用域（全局变量）**：全局作用域就是在整个script标签里，或者整个js文件里面所使用的范围。全局变量就是在全局作用域定义的变量，在整个作用														  域都可以使用。

​			**局部作用域（局部变量）**：在局部范围里（例如function里面）。局部变量就是在局部范围内创建的变量，只能在局部作用域使用，全局变量和局部变量互														  不影响。

​			**块级作用域（块级变量：es6新增）**：在if else 、for、while等范围内被{}括起来的称为块级作用域。块级变量需要用let定义，使用var会使变量作用域进行																			提升，**详情见js高级中es6新增**。



##### 7.4、作用域链

​			定义：从使用的变量的语句一步步往上找，直到找到为止。优先找离自己近的。

```js
function f1() {
            var num = 123;

            function f2() {
                var num = 0;
                console.log(num); // 站在目标出发，一层一层的往外查找 num=0
            }
            f2();
        }
var num = 456;
f1();
```

##### 7.5、预解析

​				定义：执行js代码前，会将所有变量和函数的声明提到文件的最前面，但仅仅只提前声明不提前赋值。

```js
        // 案例
        var num = 10;

        function fn() {
            console.log(num);		//undefined
            var num = 20;
            console.log(num);		//20
        }
        fn();
        // 相当于以下代码
        var num;

        function fn() {
            var num;
            console.log(num);
            num = 20;
            console.log(num);
        }
        num = 10;
        fn();
```



#### 8、对象

​	对象：就是具体事物，它可以具备一些属性和一些方法,他的存储方式是键值对的形式。

​	**定义**：

##### 8.1、声明

​	方法一：使用大括号直接声明

```js
var	student = {
    key1：value1,
    key2：value2,
    key3：value3,		//value可以是值，也可以是方法
    ...
			}
```

​	方法二：使用object声明对象

```js
var student = new Object();
student.key1=value1;
student.key2=value2;
student.key3=value3;		//value可以是值，也可以是方法
....;
```

​	方法三：使用构造函数创建对象★

```js
function Student(value1,value2,value3...){
    this.key1=value1;
    this.key2=value2;
    this.kty3=value3;		//value可以是值，也可以是方法
    ....
}
var student = new Student(value1,value2.value3...);
```

#####  8.2、遍历与获取属性值

```js
//利用for-in去遍历对象
for(var k in obj){
    console.log(obj[k]);
}

//获取对象的属性值
obj.value;
obj[value];
```



#### 9、内置对象与方法★

​		内置对象：即js里面已经帮我们自动封装好的对象，我们可以拿来直接使用。内置对象分为：Date、Array、Math、String等(这几个最常用)。



##### 			Date对象和方法：

```js
var date = new Date();		//声明Date对象 获取的事件默认是当前时间 可以给它传入时间(字符串和数学都行)，传数字需要至少传年份和月份 而且月份会自动加一
date.getFullYear(); 		//获得当时时间对象的年份
date.getMonth();			//获得当前时间对象的月份(月份是从0开始的)
date.getDate();				//获得当前时间对象的日期(月份中的天数)
date.getDay();				//获得当前时间对象的星期(星期日是0 星期六是6)
date.getHours();			//获得当前时间对象的小时数		
date.getSeconds();			//获得当前时间对象的秒数
date.getMinutes();			//获得当前时间对象的分钟数
date.getTime();				//获取1970.1.1 8:00:00到现在的毫秒数
```

​				**时间戳：是从1970.1.1 8:00:00到当前时间的毫秒数。**

```js
//获取时间戳的几种方法★
var	getTime = +new Date();// 方法一
var date = new Date();
date.getTime();			//方法二
date.valueOf();			//方法三
date,now();				//方法四(html5新增 支持ie9以上版本)

//格式化时间
var date = new Date();
    var arr = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"];
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dates = date.getDate();
    var day = date.getDay();
    console.log("今天是：" + year + "年" + month + "月" + dates + "日 " + arr[day]);
```

​				

##### 				Array对象及方法:

```js
var arr = new Array(7,8);		//声明数组
var newarr = [1,2,3,4,5,6];		//声明数组并且给其赋值
newarr.push("7");				//向数组末尾添加元素 返回的是新数组的长度
newarr.unshift("0");			//向数组前面添加元素 返回的是新数组的长度
newarr.shift("0");				//把数组第一个元素给删除，返回的是删除的元素
newarr.pop("7")					//把数组最后一个元素删除，返回的是删除的元素
newarr.join("-")				//将数组元素用"-"来拼接成字符，返回的是拼接完成的字符串。
★arr.slice([begin[, end]])	    //返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝(包括 begin，不包括end)。原始数组不会								  被改变。
★newarr.splice(2)				//newarr.splice(索引号,删除的个数，替换的元素) 通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返									  回被修改的内容。此方法会改变原数组。
newarr.concat(arr)				//将arr加入到newarr数组中 返回的是新数组需要用变量保存
★arr.indexOf(searchValue);		//获取searchValue在数组arr中第一次出现的索引，若存在返回该索引，不存在返回-1
arr.sort((a,b)=>a-b);			//数组排序 return是a-b返回得数组是升序  return是b-a返回得数组是降序
```



##### Math对象及方法

```js
Math.PI;						//获取圆周率
Math.random();					//在0,1之间生成随机数  包括0 不包括1
Math.abs();						//求绝对值
Math.sqrt();					//求平方根
```



**相关舍入**

![](C:\Users\12286\Desktop\我的文件\笔记相关\math相关舍入.png)

注：在使用round的时候，0.5需要注意，它是会往大的数取，**即1.5会取2，-1.5会取-1**； 



##### String对象及方法

```js
var str = "abcc";
str.substr("2",1);						//截取字符串 从索引号2开始，向后截取1一个元素 返回的是截取的字符串
str.replace("c",d);						//替换字符串 从头开始c 把找到的第一个元素的设置为d 并返回一个新的字符串
var newstr = "c";				
newstr.concat(str);						//和数组方法相同  将str加入到newstr中 返回的是新字符串 需要用变量来接收
★str.split("");							//将字符串转换成数组 	传入的是分隔符
★str.slice(beginIndex[, endIndex])		//提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串
★str.indexOf(searchValue [, fromIndex])	//返回searchValue第一次出现在str中的索引 从fromIndex开始 不存在则返回-1
str.includes(searchString[, position])	//判断searchString是否在str中 若存在返回true 不存在返回false position是判断开始的位置
```



##### **splice slice split的区别**★

​			**slice:**这个方法**数组、字符串**中都可以使用，用来截取元素的，里面传的值一个是开始元素的索引(包含)，一个是结束元素的索引(不包含)，**返回的都是截取					 后的字符串，并且不会改变原数组。**

```js
var str = "abcdefg";
var arr = [1,2,3,4,5,6];
str.slice(1,4);						//返回字符串是bcd  		原字符串不改变
arr.slice(1,4);						//返回的数组是[2,3,4] 	原数组不改变
```



​			**splice：**这个方法是数组的专属方法，用来截取数组，它与slice最大的区别就是它会**改变原数组**，而slice不会改变。它里面最多可以传三个参数，具体代码						  如下。

```js
var arr = [1,2,3,4,5,6,7,8,9,10];
arr.splice(8);				//返回新数组[9,10]; arr=[1,2,3,4,5,6,7,8];
arr.splice(1,2);			//返回新数组[2,3];  arr=[1,4,5,6,7,8];
arr.splice(1,2,2,3);		//返回新数组是添加元素的数组[2,3]	arr=[1,2,3,6,7,8]		
```



​			**split**：这个方法是字符串中的专属方法，用来将字符串转换成数组，传入的参数是你用什么分割符分割

```js
var str = "abcdef";
str.split("");				//将字符串转换成数组[a,b,c,d,e,f]   原字符串不会改变
```



**字符串操作方法总结**

|                    用法                     |             作用             | 是否改变原数据 |         返回值         |
| :-----------------------------------------: | :--------------------------: | :------------: | :--------------------: |
|          str.substr(start,length)           |     截取字符串(逐渐废弃)     |       否       |      截取的字符串      |
|     str.substring(indexstart,indexend)      |    截取字符串(代替substr)    |       否       |      截取的字符串      |
| str.replace(reg\|substr,newsubstr\|fuction) |          替换字符串          |       否       |   替换完成后的字符串   |
|         str.concat(newstr,[..str])          | 将多个字符串合并成一个字符串 |       否       |   合并完成后的字符串   |
|             str.split('分割符')             |       字符串分割成数组       |       否       |    返回分割后的数组    |
|      str.slice(beginIndex,[EndIndex])       |  提取字符串(不包换EndIndex)  |       否       |      提取的字符串      |
|      str.indexOf(seachStr,[fromIndex])      | 判断searchstr在str中是否存在 |       否       | 当前索引 \| -1(不存在) |
|     str.includes(searchStr,[position])      | 判断searchstr在str中是否存在 |       否       | 布尔值(true \| false)  |
|                 str.trim()                  |      删除字符串两端空格      |       否       | 去重两端空格后的字符串 |



**数组简单操作方法总结**

|                           用法                            |              作用              | 是否改变原数据 |         返回值         |
| :-------------------------------------------------------: | :----------------------------: | :------------: | :--------------------: |
|         arr.push\|pop\|shift\|unshift(...element)         |  数组的后加、后删、前删、前加  |       是       |       修改的元素       |
|                    arr.join('合并符')                     |       将数组转化成字符串       |       否       |     合并后的字符串     |
|             arr.slice(beginIndex,[EndIndex])              |        截取数组(浅拷贝)        |       否       |     截取后的字符串     |
| arr.splice(start[, deleteCount[, item1[, item2[, ...]]]]) | 删除、替换、添加元素来修改数组 |       是       |   删除元素组成的数组   |
|          arr.indexOf(searchValue [, fromIndex])           |     查询元素在数组中的索引     |       否       | 当前索引 \| -1(不存在) |
|                   arr.concat(...value)                    |          合并多个数组          |       否       |    合并完成的新数组    |
|                       arr.reverse()                       |            翻转数组            |       是       |      颠倒后的数组      |
|                   arr.sort((a,b)=>a-b)                    |   数组排序(a-b升序  b-a降序)   |       是       |      排序后的数组      |



**数组复杂方法总结**

 

|                    用法                    |     作用     |    执行次数    |         返回值         |
| :----------------------------------------: | :----------: | :------------: | :--------------------: |
| arr.forEach(function(value,index,array){}) |   遍历数组   |   数组的长度   |    遍历处理后的数组    |
| arr.filter(function(value,index,array)}{}) |   筛选数组   |   数组的长度   | 满足条件元素组成的数组 |
|  arr.some(function(value,index,array){})   | 判断数组元素 | 满足条件就停止 | 布尔值(true \| false)  |
|  arr.every(function(value,index,array){})  | 判断数组元素 |    数组长度    | 布尔值(true \| false)  |



#### 10、堆和栈★

​			栈：由操作系统自动分配释放存放函数的参数值、局部变量的值等。其操作方式类似于数据结构中的栈，简单数据类型存放到栈里面。

​			堆：存储复杂类型(对象)，一般由程序员分配释放，若程序员不释放，由垃圾回收机制回收。复杂数据类型存放到堆里面

![](C:\Users\12286\Desktop\我的文件\笔记相关\栈和堆图解.png)

​	

​	**简单数据类型存储**：首先在栈中开辟一个空间，里面存放的简单数据类型的值，此时这个变量就指向这个内存，每次调用的时候都去从这个内存中取。图解如下

![](C:\Users\12286\Desktop\我的文件\笔记相关\简单数据存储.png)

​		**复杂数据类型存储**：首先复杂类型都是存储在堆中，现在堆中开辟一个空间，存放着是复杂数据类型，其次再在栈中开辟一个空间里面存放的是这个复杂数据在堆中地址，最终这个变量还是指向栈中的地址。图解如下

![](C:\Users\12286\Desktop\我的文件\笔记相关\复杂数据类型存储.png)



# Web Apis

## 一、DOM(文档对象模型)

​		文档对象模型（Document Object Model，简称 DOM），是 W3C 组织推荐的处理可扩展标记语言（HTML或者XML）的标准编程接口。W3C 已经定义了一系列的 DOM 接口，通过这些 DOM 接口可以改变网页的内容、结构和样式。

​		操作DOM的三部曲：**事件源、事件动作、事件执行代码段**

#### 一、获取事件源的方法

###### 	1.1获取方法

```js
//获取dom元素
Document.getElementById()				//根据元素的ID值来获取元素 返回的是当前的元素
Document.getElementsByTagName()			//根据元素的标签名来获取元素 返回带有指定标签名的对象的集合
Document.getElementsByClassName()		//根据元素的类名来获取元素 返回一个包含了所有指定类名的子元素的类数组对象
Document.querySelector();				//H5新增的方法 可以通过类名、标签名、id等来获取元素，返回的是查找当前元素的第一个
Document.querySelectorAll();			//和querySlectorAll（）相同，但返回的是查找到的所以元素，返回的是伪数组

//根据元素的指定属性获取元素
Element.getAttribute("data_index")		//根据元素的date_index属性来获取元素
Element.setAttribute("data_index",1)	//设置元素的date_index属性为1
Element.removeAttribute("date_index"）  //移除元素属性里面的date_index属性
document.createElement(element)			//在页面中创建元素element

//操作节点
Element.children						//获得的是该元素所有的子节点，返回的类型类似伪数组
Node.parentNode							//获得当前节点的父节点 只返回最近的那个父节点
Node.removeChild(index)					//删除当前节点的子节点 index是删除节点的索引 返回的是删除的元素
Node.cloneNode(deep)					//克隆node节点 deep是判断是深克隆(true,包含该节点和所有子节点)还是浅克隆(false，只克隆该节点本身)
Node.appendChild(element)				//将element加到node的最后
Node.previousSibling()					//返回当前节点的前一个节点 没有则返回null
Node.nextSibling()						//返回当前节点的后一个节点 没有则返回null
```

###### 	

###### 	1.2修改内容样式

```js
Element.style.left					//修改元素左边的值	需要给元素设置定位 不然没有效果	top同理
Element.style.top					//修改元素上边的值	
Element.style.className				//修改元素的类名
Element.classList					//向元素的类名中添加新类名
Element.style.innerHTML				//设置或获取HTML语法表示的元素的后代
Element.style.innerText				//属性表示一个节点及其后代的“渲染”文本内容
Element.style.display				//用来设置元素显示(block)与隐藏(none)
```

​			**注：innerHTML是从对象的起始位置到终止位置的全部内容,包括HTML标签，而innerText是从起始位置到终止位置的内容,但它去除HTML标签。**



###### 1.3、创建元素

```js
//方法一:通过创建节点添加元素
var li = document.creatELement("li");
ul.appendChild(li);

//方法二:通过字符串创建html代码段加入
var str = "<li>123</li>";
ul.innerHTML(str);
```

**注：如果说我们使用innerHTML,采用数组的方式，执行效率要高于创建节点的方式 。如果说我们使用innerHTML，采用字符串拼接的方式，那么执行效率要低于创建节点的方式**



#### 二、事件动作

![](C:\Users\12286\Desktop\我的文件\笔记相关\js中的事件.png)

​			**事件中只有四个事件不会触发冒泡：mouseenter mouseleave onfocus onblur**



#### 三、绑定事件

##### 3.1、方法一：匿名函数

```js
/*
element.事件=function(){
	执行代码段
}
*/

var btn = document.querySelector("button");
btn.onclick=function(){						//这种绑定事件的方法 只能给同样的元素绑定一个事件 
    alert("点击");
}
```



##### 3.2、方法二：事件监听

```js
/*
target.addEventListener(type(执行事件), listener(执行函数), options(判断事件是捕获阶段还是冒泡阶段,true是捕获阶段，false是冒泡阶段));
*/

//给元素添加事件监听
var btn = document.querySelector("button");
function clickthis(){
		alert("点击");                     
}
btn.addEventListener("click",clickthis,true);			//事件监听给元素绑定事件 可以给元素绑定多个事件

//移除元素的事件
btn.removeEventListener("click",clickthis);
```



#### 四、DOM事件流

​			事件流描述的是从页面中接收事件的顺序。事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即 **DOM 事件流**。

​			**DOM事件流三个阶段**：

​				1、捕获阶段

​				2、当前目标阶段

​				3、冒泡阶段

![](C:\Users\12286\Desktop\我的文件\笔记相关\DOM事件流.png)

​			**如何判断事件是捕获阶段还是冒泡阶段**

```js
element.addEventListener(type,listener,option)
// 其中option是判断事件是冒泡阶段还是捕获阶段 true为捕获阶段 false是冒泡阶段 option默认是false。

//捕获阶段 如果addEventListener 第三个参数是 true 那么则处于捕获阶段  document -> html -> body -> father -> son
var son = document.querySelector('.son');
    son.addEventListener('click', function () {
      alert('son');
    }, true);
    var father = document.querySelector('.father');
    father.addEventListener('click', function () {
      alert('father');
    }, true);


// 冒泡阶段 如果addEventListener 第三个参数是 false 或者 省略 那么则处于冒泡阶段  son -> father ->body -> html -> document
		 var son = document.querySelector('.son');
         son.addEventListener('click', function() {
            alert('son');
         }, false);
         var father = document.querySelector('.father');
         father.addEventListener('click', function() {
             alert('father');
         }, false);
         document.addEventListener('click', function() {
             alert('document');
         })
```

​			·

​			**如何阻止事件冒泡和阻止默认事件行为**

```js
 var son = document.querySelector('.son');
    son.addEventListener('click', function (e) {
      alert('son');

      e.stopPropagation();  //阻止事件的冒泡 只能阻止当前元素的冒泡 若要阻止多个冒泡事件 需要给事件都添加

    }, false);


var a = document.querySelector('a');
    a.addEventListener('click', function (e) {
      e.preventDefault(); 	//阻止事件的默认行为
    })
```



#### 五、事件委托

​			原理 ：是利用事件冒泡的原理，给父元素绑定事件，子元素同样适用。

​			优点：减少代码量 优化开发        新添的子元素一样可以使用该事件

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

```js
var ul = document.querySelector("ul");
ul.addEventListener("click",function(e){
    e.target.diaplay="none";					//e.target是当前点击的元素 不能使用this  this在这里指向的是ul
})
```



## 二、BOM(浏览器对象模型)

​			BOM（Browser Object Model）即**浏览器对象模型**，它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是 window。BOM 由一系列相关的对象构成，并且每个对象都提供了很多方法与属性。**BOM包含DOM**



### 1、Window常见事件

##### 		1.1、加载事件(onload)

```js
//等页面元素全部加载完全后在执行里面的代码段(包括图片、音频、视频等)
window.addEventListener("load",function(){
    //执行代码段
})

window.onload=function(){
    //执行代码段
}

//等页面框架渲染完成后再去执行里面的代码(不会加载图片等)
document.addEventListener("DOMContentLoaded",function(){
    //执行代码段
})
```



##### 1.2、窗口调整大小事件

```js
//等窗口页面大小变化时会会触发里面的代码

      var div = document.querySelector("div");
      	window.addEventListener("resize", function () {
        	if (window.innerWidth <= 800) {
          		div.style.display = "none";
        	}
        	else {
          		div.style.display = "block";
        	}
      	})

```



##### 1.3、定时器

​	**生成定时器**

```js
//单次定时器	setTimeout(function(){},time)		time的单位是ms

//一秒钟之后打印11
var timer1 = setTimeout(function(){
    console.log("11")
},1000)

//反复执行定时器	不主动关闭不会停止 setInterval(function(){},time)

//每隔一秒钟打印11
var timer2 = setInterval(function(){
    console.log("11")
},1000)
```

​	**清除定时器**

```js
clearTimeout(timer1);			//删除单次定时器
clearInterval(timer2);			//删除多次执行定时器
```



##### 1.4、location事件

​		location对象的相关属性：

![](C:\Users\12286\Desktop\我的文件\笔记相关\location对象属性.png)

​				**注意：需要重点了解href和search。**



​		location对象的方法：

![](C:\Users\12286\Desktop\我的文件\笔记相关\location对象方法.png)



##### 1.5、navigator 对象

​		navigator 对象包含有关浏览器的信息，它有很多属性，我们最常用的是 userAgent，该属性可以返回由客户机发送服务器的 user-agent 头部的值。

```js
//判断打开页面的手机类型
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.location.href = "";     //手机跳转某个页面
 } else {
    window.location.href = "";     //电脑跳转某个页面
 }
```



##### 1.6、history 对象

![](C:\Users\12286\Desktop\我的文件\笔记相关\history对象相关方法.png)



##### 1.7、window常见属性

```js
window.pageYOffset;			//返回浏览器被卷去的高度 PageXOffset同理
window.pageX;				//返回的是鼠标(手指)在页面x轴上的距离
window.pageY;				//返回的是鼠标(手指)在页面y轴上的距离
```



### 2、js执行队列★

​		JavaScript 语言的一大特点就是**单线程**，也就是说，同一个时间只能做一件事。单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。这样所导致的问题是： 如果 JS 执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞的感觉。

##### 2.1、同步

​		从上到下按照顺序依次执行。前一个任务不完成，后面任务不会执行

##### 2.2、异步

​		异步事件主要包括**普通事件(click、resize等)**、**资源加载(load、error等)**、**定时器(setTImeout、setInterval等)**、**Ajax(post、get等)**

​		

​		**执行过程**：当有异步事件的时候，先将事件交给对应的异步处理程序取处理，当异步处理程序完成后，将异步事件加入到事件队列，事件队列的顺序是按进来的前后排序的，当主线程上的同步任务完成后再去从事件队列中取事件，依次执行。具体的执行过程如下图所示：

![](C:\Users\12286\Desktop\我的文件\笔记相关\js执行机制.png)

##### 2.3、事件循环(event loop)

​			主线程执行完毕，查询任务队列，取出一个任务，推入主线程处理。重复这个行为就是事件循环



## 三、this指向★

​		一般情况下，this指向的基本都是指向它的直接调用者。

### 3.1、指向window

```js
console.log(this);			//全局作用域中的this是指向window

function fn(){
    console.log(this);
}
window.fn();	

window.setInterval(function(){
    console.log(this);
},1000);		//定时器和函数使用是用window使用的 但是一般情况下不写 所以定时器和函数中的this一样都是指向window

```



### 3.2、方法调用中的this

```js
	var o = {
      sayHi: function () {
        console.log(this); // this指向的是 o 这个对象

      }
    }
    o.sayHi();

    var btn = document.querySelector('button');
     btn.onclick = function() {
         console.log(this); // this指向的是btn这个按钮对象

     }
    btn.addEventListener('click', function () {
      console.log(this); // this指向的是btn这个按钮对象

    })
```



### 3.3、构造函数中的this指向构造函数的实例

```js
	function Fun() {
      console.log(this); // this 指向的是fun 实例对象

    }
    var fun = new Fun();
```



## 四、pc端网页特效

### 4.1、偏移属性offset

```js
element.offsetLeft			//返回距离带有定位的父元素的左边框的距离 若父级没有 则是相对body的
element.offsetTop			//返回距离带有定位的父元素的上边框的距离 若父级没有 则是相对body的
element.offsetWidth			//返回元素的宽度 包括padding和border
element.offsetHeight		//返回元素的高度 包括padding和border
```

![](C:\Users\12286\Desktop\我的文件\笔记相关\offset常见属性.png)



### 4.2、元素可视区client

```js
element.clientLeft			//返回左边框的距离
element.clientTop			//返回上边框的距离
element.clientWidth			//返回元素的宽度 包括padding 不包括border
element.clientHeight		//返回元素的高度 包括padding 不包括border
```

![](C:\Users\12286\Desktop\我的文件\笔记相关\client相关属性.png)

client 和 offset图解：

![](C:\Users\12286\Desktop\我的文件\笔记相关\client和offset图解.png)



### 4.3、元素滚动事件scroll

```js
element.scrollLeft			//返回元素滑动了x轴距离
element.scrollTop			//返回元素华东路Y轴距离
element.scrollWidth			//返回自身实际的宽度 包括padding 不包括border
element.scrollHeight		//返回自身实际的高度 包括padding 不包括border
```

![](C:\Users\12286\Desktop\我的文件\笔记相关\scroll相关属性.png)

具体图解如下：

![](C:\Users\12286\Desktop\我的文件\笔记相关\scroll图解.png)



### 4.4、js实现缓动动画原理

```js
function animation(obj, target, callback) {
      clearInterval(obj.timer);				//	开启前先关闭定时器 确保只有一个定时器在执行
      obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
          clearInterval(obj.timer);
          if (callback) {
            callback();
          }
        }
        obj.style.left = obj.offsetLeft + step + "px";
      }, 15)
    }
```



## 五、移动端页面特效

### 	5.1、移动端事件

```js
touchstart;			//手指按下事件
touchmove;			//手指在屏幕上移动事件
touchend;			//手指离开事件


//事件对象
e.paegX;			//获取手指在屏幕上x轴的距离
e.pageY;			//获取手指在屏幕上Y轴的距离
e.touches;			//获取触摸屏幕的手指列表
e.targettouches;	//获取触摸DOM元素的手指列表
e.changedtouches;	//获取触摸屏幕变化的手指列表
```



### 5.2、移动端解决按钮300ms延迟的问题★

​			原因：移动端会有双击缩放图片事件 300ms是判断用户在改时间类是否点击两次 若没有则认定为点击事件  这就是300ms产生的原因。

​	**方法一**：

```html
<!-- 给meta标签添加user-scalable=no属性,不允许用户缩放即可 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
```



​	**方法二**：

```js
//自己用touch事件封装函数,记录手指触摸时间(离开的时间-触摸的时间)<150ms,并且没有滑动,即可以定义为点击事件 缺点：自己写的兼容性不强，多个事件调用繁琐

//封装tap，解决click 300ms 延时
function tap (obj, callback) {
        var isMove = false;
        var startTime = 0; // 记录触摸时候的时间变量
        obj.addEventListener('touchstart', function (e) {
            startTime = Date.now(); // 记录触摸时间
        });
        obj.addEventListener('touchmove', function (e) {
            isMove = true;  // 看看是否有滑动，有滑动算拖拽，不算点击
        });
        obj.addEventListener('touchend', function (e) {
            if (!isMove && (Date.now() - startTime) < 150) {  // 如果手指触摸和离开时间小于150ms 算点击
                callback && callback(); // 执行回调函数
            }
            isMove = false;  //  取反 重置
            startTime = 0;
        });
}
//调用  
  tap(div, function(){   // 执行代码  });
```



​	**方法三**：

```js
//利用插件fastclick.js解决 优点:引入之后全部元素都可以适用 兼容性很强		详情：https://github.com/ftlabs/fastclick

//先提前引入插件
<script src="js/fastclick.js"></script>			

//在使用规定的语法格式
if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function() {
                       FastClick.attach(document.body);
            }, false);
}
```



## 六、本地存储

### 6.1、会话存储(sessionStorage)

​			 sessionStorage是浏览器用来存储数据的 只有**当前浏览器窗口关闭数据才被删除**。

```js
sessionStorage.setItem("key","value");				//设置会话存储 存储形式是键值对
sessionStorage.getItem("key");						//获取当前浏览器会话存储中键名为key的数据
sessionStorage.removeItem("key");					//删除当前浏览器会话存储中键名为key的数据
sessionStorage.clear();								//删除会话存储中所有的数据
```



### 6.2、本地存储(localStorage)

​				localStorage是浏览器用来存储数据的 它与sessionStorage不同点就是**他不会主动删除 只要不主动删除就永远不会消失**

```js
localStorage.setItem("key","value");				//设置本地存储 存储形式是键值对
localStorage.getItem("key");						//获取当前浏览器本地存储中键名为key的数据
localStorage.removeItem("key");						//删除当前浏览器本地存储中键名为key的数据
localStorage.clear();								//删除本地存储中所有的数据
```

**注：本地存储和会话存储在浏览器中保存形式都是JSON的字符串，在js中我们通常使用JSON.stringify(obj)将对象转化为JSON字符串进行保存，在我们取本地数据时，需要使用JSON.parse(json)，将JSON字符串转换成对象，方便我们处理**



# JQuery

​		jquery是一个JavaScript库，它将原生js进行封装，方便我们开发使用，快速开发。

​		**详情方法可以参考：**https://jquery.cuishifeng.cn/index.html

## 一、JQuery获取元素

```js
//jquery获取元素可以用jquery和$ 产生的效果都一样 一般我们使用$
<div class = "text",id = "one"></div>

$("div");							 //获取页面中所有div对象	返回的伪数组
$(".text");							 //获取页面中所有class属性是text的对象 返回的是伪数组
$("#one");							 //获取页面中所有id属性是one的对象 返回的是伪数组

$(元素).parent();						//获取当前元素最近的父元素						
$(元素).children();					//获取当前元素所有的子元素 不包括子元素的子元素
$(元素).find();						//获取当前元素所有的子元素	包括子元素的子元素
$(元素).siblings();					//获取当前元素所有的兄弟元素 不包括自己
$(元素).eq(index);					//获取当前索引号为index的元素
```



## 二、JQuery对象和DOM对象

​			JQuery对象是通过JQuery和$获取的对象，DOM对象是通过原生js获取的对象，**它们之间的方法不可以跨对象使用**，即JQuery对象不能使用原生的js方法，DOM对象不能使用JQuery的方法。但他们之间可以相互转换就可以使用了

```js
//JQuery对象转换成DOM对象
$("div")[0]		/	 $("div").get(0);				//获取JQuery对象中div下索引号为0的元素


//DOM对象转成JQuery对象
var div = document.querySeletor("div");
$(div);												//将获取的DOM对象转成JQuery对象
```



## 三、获取和操作

```js
//获取属性
$(元素).prop(属性名);					//获取元素的内置属性 如type、title、alt、href等 属性名后再加值 可以设置该属性
$(元素).attr(属性名);					//获取元素的设置属性 如data-index、index、id等 属性名后再加值 可以设置该属性 
$(元素).data(属性名);					//获取元素h5设置属性data—* 如获取data-index =>	$(元素).("index") 属性名后再加值 可以设置该属性 该方法											不会给h5元素添加属性 它是将属性保存到DOM对象上

//获取文本
$(元素).html();						  //获取元素内容 包括html标签和文本 类似于原生中的innerHTML		里面填写值可以修改元素内容
$(元素).text();						  //获取元素内容 只获取文本 不包括html标签 类似原生中的innerText		里面填写值可以修改元素内容
$(元素).val();						  //获取表单里面的值		里面填写值可以修改元素内容

//操作类名
$(元素).addClass();					  //增加类 不会覆盖原来的类
$(元素).removeClass();				  //移除类
$(元素).toggleClass();				  //切换类

//获取元素大小
$(元素).width();							//获取元素内容的宽度  	content
$(元素).innerWidth();						//获取元素内容的宽度和内边距		content+padding
$(元素).outerWidth();						//获取元素内容的宽度、内边距、边框		content+padding+border
$(元素).outerWidth(true);					//获取元素内容的宽度、内边距、边框、外边距		content+padding+border+margin

//获取元素距离
$(元素).offset();							//返回的是元素距文档距离的对象 包含top和left		可以通过.top(left)获取
$(元素).position();						//返回的是元素距带有定位的父元素距离的对象 若父元素都没有定位 返回文档距离的对象 也可以通过.top(left)获取
$(document).scrollTop();				 //返回的是当前页面被卷去的距离	等价于window.pageYOffset()

//创建、添加、删除节点
var	li = $("<li>新创建li</li>");			//创建新元素li 并保存到变量li中
var	div = $("<div>新创建div</div>");		//创建新元素div 并保存到变量div中
$("ul").append(li);							//在ul的末尾添加新创建的li
$("ul").prepend(li);						//在ul的开头添加新创建的li
$("div").after(div);						//在div之后添加新创建的div
$("div").before(div);						//在div之前添加新创建的div
$("ul").remove();							//将ul元素删除 包括本身和子元素
$("ul").empty();							//将ul的子元素删除 不包括本身。
```



## 四、动画效果

```js
//speep是运行速度 单位是ms 	easing是运动曲线 默认是swing 还可以设置为linear	fn是回调函数
$(元素).show([speed],[easing],[fn]);							//将元素显示
$(元素).hide([speed],[easing],[fn]);							//将元素隐藏
$(元素).fadeIn([speed],[easing],[fn]);						//元素淡入
$(元素).fadeOut([speed],[easing],[fn]);						//元素淡出
$(元素).fadeToggle([speed],[easing],[fn]);					//切换元素淡入淡出
$(元素).fadeTo([speed],opacity,[easing],[fn]);				//指定元素停到特定的透明度 opacity是必填属性 代表最终停止的透明度
$(元素).slideDown([speed],[easing],[fn]);						//元素下拉显示
$(元素).slideUp([speed],[easing],[fn]);						//元素上拉隐藏
$(元素).slideToggle([speed],[easing],[fn]);					//切换元素上拉下拉
$(元素).animate(params,[speed],[easing],[fn]);				//给元素设置自定义动画 params是元素最终停止的样子 必填 不支持修改背景颜色
$(元素).stop();												//停止动画队列
```



## 五、遍历

### 1、遍历对象

```js
// 模板：	$(元素).each(function(index,domEle){})		其中index返回的是当前元素的索引 domEle返回的是DOM对象 需要转换为jq对象

var arr = ["red","green","blue"...];
$("li").each(function(i,ele){
    $(ele).css("color",arr[i]);					//将li的元素的颜色按照顺便依次添加
})
```



### 2、遍历数据

```js
//模板：	$.each(obj,function(index,domEle){})		  它可以遍历对象和数据 遍历对象和上个方法相同 遍历数组index => key domEle => value

var obj = {name: "zs" , age: 18};
$.each(obj,function(i,ele){
    console.log(i,ele);			//name zs 和 age 18			
})
```





# JS高级

## 一、编程思想

#### 1.1面向过程

​						面向过程是将一个程序通过顺序，从头到尾，按照顺序一步一步的写完该程序。

​					   **优点：**性能比面向对象高，适合和硬件连接很密切的东西。

​					   **缺点：**不易复用，不易维护，不易拓展。

​				

#### 1.2面向对象

​						面向对象就是将所用事务分成一个一个对象，各个对象之前相互协作，完成一系列事情。

​						**优点：**易复用，易维护，易拓展，低耦合

​						**缺点：**性能比面向过程低



## 二、类★

​				es6新增属性，代表的是一系列的事务，泛指的是某一类型。而对象则是该类具体的实例化对象。es6中没有变量提升，所以要先声明class，再实例化它的对象，其实它的本质就是构造函数

```js
//class执行时是一定会执行构造函数里面的类 至于方法不调用不执行 可以将初始化函数放到构造函数中 让他初始化就执行
class Phone{
    constructor(形参){				//相当于构造函数
        ....;
    }
    方法名(){							//相对于某个具体的行为封装成方法
        ....;
    }
}
var iphone = new Phone(实参);			//将类具体实例化 并存储在iPhone中 可以使用iPhone.方法名() 调用里面的函数
```



## 三、类的继承

​			 使用extends关键字可以使子类继承父类属性和方法 它继承等价于**es5中原型+构造函数的继承**  它是es6中的语法糖

```js
var that;
class Phone {
      constructor(color) {
        that=this;
        this.color = color;							
      }
      lister() {
        console.log(this.color);					
      }
    }

class Miphone extends Phone{
    constructor(color,size){
        super(color);							//super()方法相当于去执行父类中constructor
        this.size = size;						//子类中自己的属性
        console.log(this);						//输出的是Mi {color: 'white', size: '小米6'}对象
    }
    lister(){
        console.log(this.color);
      //super.call();							//这是子类调用父类中的方法
    }
}
var m = new Miphone("white","小米11");
m.lister();										//当父类和子类中都有相同的方法时 就近原则 优先调用自己方法 如果没有就用父类中的方法
```

**注：子类中没有this，只有当在子类中使用super方法后，才会有自己的this，子类中的this指向子类实例化出来的对象**



## 四、类中this指向★

```html
<body>
  <button>点击</button>
  <script>
    var that;
    class Phone {
      constructor(color, size) {
        that=this;
        this.color = color;							//这里的this指向当前的实例化对象 iphone
        this.size = size;
        var btn = document.querySelector("button");
        btn.onclick = this.call;					//这里的this指向是btn 所以call里面的方法中this就指向了btn 输入undefined
      }
      call() {
        console.log(this.color);					//这里的this指向当前的实例化对象 iphone 输出red
      }
    }
    var iphone = new Phone("red", "iphone");
    iphone.call();									//这里的this指向当前实例化对象 iPhone 所以call方法里面的对象就指向iPhone 输出red
  </script>
</body>
```



## 五、原型与原型链(面试重点)★

#### 1、静态成员与实例成员

​			**静态成员**是在类上面添加相关属性，只有静态方法可以访问

​			**实例成员**是在实例对象上的相关属性，只有实例方法可以访问

```js
    function Star(uname, age) {
      this.uname = uname;              //实例成员       只有实例对象可以访问
      this.age = age;
    }

    // 静态成员
    Star.sex = "男";                    //静态成员      只有静态对象可以访问

    var ldh = new Star("刘德华", 18);
    console.log(ldh.uname);
    console.log(Star.uname);
    console.log(ldh.sex);
```



#### 2、原型

##### 2.1、原型对象

​		原型对象是每个构造函数都可具有的对象，通过**构造方法.prototype**指向该原型对象，原型对象可以通过**构造函数.prototype.constructor**指向该构造函数

![](C:\Users\12286\Desktop\我的文件\笔记相关\原型对象图解.png)



##### 2.2、对象原型

​			构造函数通过new创造出来的实力化对象可以通过**实例对象.`__proto__`**取指向该构造函数的原型对象

![](C:\Users\12286\Desktop\我的文件\笔记相关\原型图解.png)



##### 2.3、原型实现继承

###### 		2.3.1、继承属性

```js
function Father(uname,age){
    this.uname = uname;
    this.age = age;
}

function Son(uname,age,score){
    //call()方式是每个函数自带方法 里面可以传入的值为 构造函数的指向、传递的参数.
    Father.call(this,uname,age);			//Father函数的默认指向是window，这里将它的指向改变为Son中this 所有Son中也可以使用父类中的属性
    this,score = score;
}

var son = new Son("张三",18,99);					//返回的是son{uname:"张三",age:18,score:99}
```

​	

###### 		2.3.2、继承方法

```js
function Father(uname,age){
    this.uname = uname;
    this.age = age;
}
Father.prototype.money=function(){
    console.log(1000);						//在父类的原型对象添加money方法
}

function Son(uname,age,score){
    Father.call(this,uname,age);			
    this,score = score;
}
//Son.prototype=Father.prototype 这种也可以实现继承Father方法 但是这个方法是将Father方法的地址传给Son 这时候Son里面方法添加改变也会Father里面方法

Son.prototype=new Father();		//这种是将Father的实例对象传给Son的原型对象 这时候就可以调用里面的方法 但是有个缺点:Son原型对象的指向也改变
Son.prototype.constructor=Son;	//若不写 Son的原型对象的constructor属性则指向Father构造函数 我们需要手动将他指回Son

var son = new Son("张三",18,99);					
```

图解如下：

![](C:\Users\12286\Desktop\我的文件\笔记相关\原型继承方法图解.png)



##### 2.4、原型链

​			就是在通过原型继承的过程的中，通过`__proto__`一步一步向上查找的过程，最终找到了Object对象，而Object.`__proto__`的对象原型则返回null

![](C:\Users\12286\Desktop\我的文件\笔记相关\原型链图解.png)

```js
function Star(uname,age){
    this.uname = uname;
    this.age = age;
}
Star.prototype.sing = function(){
    console.log("我会唱歌");
}

var ldh = new Star("刘德华",18);
console.log(ldh.__proto__);							//指向的是Star.prototype
console.log(Star.prototype.__proto__);				//指向的是Object.prototype
console.log(Object.prototype.__proto__);			//指向的是null
```

**注：new执行过程：1、向内存中创建一个新对象**

​								   **2、将构造函数中的this指向该该对象**

​								   **3、给该对象添加属性和方法**

​								   **4、返回这个对象**



#### 3、原型面试题

```js
function Foo(){};

Function.prototype.a=function();
Object.prototype.b=function();

var o = new Foo();		//问o实例可以访问a，b的那个函数	答：只能访问到object上的b方法 访问不到a方法 图解如下
```

![](C:\Users\12286\Desktop\我的文件\笔记相关\原型面试题图解.png)

**注：1、所有构造函数(Array、Object等)的`__proto__`都是等于Function.prototype   而Function.`__proto__`也等于Function.prototype**

​		**2、所有函数的原型对象(.protorype)的`__proto__`都是指向Object.prototype**



## 六、ES5中新增方法

#### 1、数组方法(foreach、filter、map、some、every、trim)

```js
var arr = [1,2,3,4,5,6,7];
//foreach()
arr.foreach(function(value,index,array){
    console.log(value);					//遍历数组里面所有元素的值 
    console.log(index);					//遍历数组里面所有元素值的索引号
    console.log(array);					//返回当前数组本身
})

//filter()
var newarr = arr.filter(function(value,index,array){
    return value>3;							//返回的是新数组 里面存储的是value大于3的值(它会遍历完所有值) 需要用新变量来存储 
})

//map()
var newarr1 = arr.map(function(currentValue,index,array){
    return 1;								//返回的是新数组 里面存储的是1 它将所有元素都转成1(它会遍历完所有值) 需要用新变量来存储
})

//some()
var flag = arr.some(function(value,index,array){
    return value == 5;						//返回的是布尔值 只要能查找到当前元素就返回true 并且停止遍历 若不存在就返回false
})

//every()
var flag2 = arr.every(function(value,index,array){
    return value == 0;						//返回的是布尔值 遍历完所有元素 若全都满足条件就返回true  若不满足就返回false 并且停止遍历
})

//trim()
var str = "  an dy  ";
var newstr = str.trim();					//返回的是新字符串 它会去除原来字符串开头和结尾的空格 但不会去除字符串中间的空格 不会改变原str
```

**filter、map、some、every区别：**

​				filter和map类似都会返回新数组 原数组的值也不会被改变 并且**会遍历完所有对象** 

​				some和every类似都返回的是布尔值 根据条件判断 若**满足相应条件会不在遍历所有对象**



#### 2、函数方法(call、apply、bind★)

```js
//Function.call(thisArg, arg1, arg2, ...) thisArg是改变当前函数的指向 并且会立即执行该函数 arg1等是传递的参数 只能通过参数一个一个传递
var obj = {
    name: "张三",
    age:18
}
function o(){};
o.call(obj);					//会将函数实例o指向obj对象 也会包含里面的相关属性 是es5中继承属性的使用方法



//Function.apply(thisArg, [array]) thisArg是改变当前函数的指向 并且会立即执行该函数 array是以数组的形式传递参数 只能以数组的形式传递
var arr = [1,2,3,4,5,6]
var max = Math.max.apply(Math,arr);	//会返回数组中的最大值6 可以向Math对象传递数组进行判断 this指向Math也可以改成null 但在严格模式下会出错



//Function.bind(thisArg,arg1,arg2,...) thisArg是改变当前函数的指向 不会立即执行该函数 等调用是在执行 并返回的是一个新函数 传参形式和call相同
var btn = document.querySelector("button");
    btn.addEventListener("click", function () {
      this.disabled = true;
      setTimeout(function () {
        this.disabled = false;
      }.bind(this), 3000)           //改变函数里面this的指向 它不会立马执行函数 当调用是在执行
    })
```



#### 3、对象方法

```js
var obj = {
   id: 1,
   pname: "小米",
   price: 1999
}
//它们都是挂载到Object上的静态方法 只能使用Object调用
//Object.keys(obj)				返回对象值所有键值 返回的是数组
var arr = Object.keys(obj);				//["id","pname","price"]

//Object.values(obj)			返回对象值所有值 返回的是数组
var arr1 = Object.value(obj);			//[1,"小米",1999]

//Object.entries(obj);			返回对象的键值对的数组 返回的是数组
var arr2 = Object.entries(obj);			//[["id",1],["pname","小米"],["price",1999]]
 
//Object.defineProperty(obj, prop, descriptor)	会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象 是vue实现数据显示原理
Object.defineProperty(obj,"value",{
    value:123,							//给obj对象新添加一个value属性，值是123
    writable:false,						//设置value是否可以修改 false是不可以修改 true是可以修改 默认为false
    enumerable:false,					//设置value是否可以被遍历到 false是不可以遍历 true是可以遍历 默认是false
    configurable:false					//设置value属性或者其他特性(writable、value、enumerable、configurable)是否可以被修改 默认是false
})
```



## 七、闭包与递归(面试重点)★

### 7.1、闭包

​				定义：在函数内部嵌套一个函数 内层函数引用外层函数的变量 导致局部变量不会被删除，闭包的本质是作用域，作用域的查找规则从内向外(局-闭包-全)

​				优点：1、拓展了局部变量的应用范围      2、减少全局变量的污染

​				缺点：内存泄漏

```js
//使用闭包实现点击输出每个li的索引
var lis = document.querySelectorAll("li");
    for (var i = 0; i < lis.length; i++) {
      //方法一
      (function (num) {
         lis[num].onclick = function () {
           console.log(num);
         }
       })(i)
      //方法二
      lis[i].onclick = (function (i) {
        return function () {
          console.log(i);
        }
      })(i);
    }
```



### 7.2、递归

​				定义：在函数中调用自己 实现反复执行某个代码块 **切记要写结束判断 不然会报出栈溢出错误**

```js
//使用递归求1~n之间所有奇数的和
function sum(n){
    if(n==1){
        return 1;
    }else if(n%2==0){
        return sum(n-1);
    }else{
        return n+sum(n-1);
    }
}

//使用递归遍历数组中的对象
var obj = {
    name: "zs",
    age:18,
    hobby:{
        sing:"cg",
        dance:"tw"
    }
}

function each(obj,key){
    var o = {};
    obj.some(function(value){				//使用some效率比forEach效率高 当查到就返回true 并停止遍历 而forEach会遍历所有 不会停止
        if(value.name == key){
            o = value
            return true;
        }else if(value.hobby && value.hobby.length > 0){
            o = each(value.hobby,key);
            return true;
        }
    })
    return o;
}
```



## 八、浅拷贝与深拷贝

### 8.1、浅拷贝

​				定义：在对象中的属性值为复杂数据类型(Array、Object)时，进行浅拷贝会将该复杂数据类型的地址保存过去，这会导致修改目标对象里面的复杂数据							类型，源对象里面的相应数据也会改变。

```js
var obj = {
    name: "zs",
    age:18,
    hobby:{
        sing:"cg",
        dance:"tw"
    }
}
var o = {};
//浅拷贝的三种形式
//方式一
o = obj;					//若修改o中的相关属性值 obj中也会发成改变	不管是简单数据类型还是复杂数据类型	

//方式二 for-in遍历赋值
for(k in obj){
    o[k] = obj[k];			//不能使用o.k = obj.k 它会将k当做属性值 最后o中只有{k:value} 若改变属性值不是复杂属性类型 原数组数据不改变
}

//方式三 es6新增的方法
Object.assign(o,obj);		//o为目标对象 obj为源对象
o = {...obj};				//...为展开运算符
```



### 8.2、深拷贝

​				原理：在对象中属性值为复杂数据类型时，使用递归将该复杂类型在进行浅拷贝(浅拷贝的浅拷贝)

```js
//使用递归实现深拷贝
function deepclone(newobj,oldobj){
    for(k in oldobj){
        var obj = oldobj[k];
        if(obj instanceof Array){				//判断Array一定要写在Object上面 因为数组也属于Object
            
            newobj[k] = [];
            deepclone(newobj[k],obj);
            
        }else if(obj instanceof Object){
            
            newobj[k] = {};
            deepclone(newobj[k],obj);
            
        }else{
            newobj[k] = obj;
        }
    }
}
```



## 九、正则表达式

### 9.1、边界符

​			用来设置正则字符串的开头和结尾的限制  其中**^是设置字符串以什么开头 $是设置字符串以什么结尾** 他们通常结合起来一起使用

```js
var rg = /^123$/;							//字符串只能是123 多一个少一个都不可以
console.log(rg.test("123"));                //true
console.log(rg.test("123123"));             //false
```



### 9.2、字符类

​			用来规定字符串匹配的范围

```js
var reg = /[a-zA-Z]/;				//只要字符串中有a-z或者A-Z里面的字符都返回true 不然为false
console.log(reg.test("a"));         //true
console.log(reg.test("ab"));        //true

var reg2 = /^[a-zA-Z]$/;			//字符串只能有a-z或者A-Z中的一个 才会返回true 包含多个会返回false
console.log(reg2.test("a"));        //true
console.log(reg2.test("ab"));       //false
```



### 9.3、量词符

​			用来限制字符出现的次数

```js
//出现0次或者更多次
var reg = /^[a-z]{0,}$/;			//a-z中的字符可以出现任意次 也可使用*代替

//出现1次或者更多次
var reg = /^[a-z]{1,}$/;			//a-z中的字符可以出现一个或者更多 也可使用+代替

//只出现0次或者1次
var reg =  /^[a-z]{0,1}$/			//a-z中的字符只能出现零次或者一次 也可以使用？代替

//出现任意次数
var reg =  /^[a-z]{3,6}$/			//a-z中的字符只能出现3-6次
```



### 9.4、替换

```js
var str = "123456789";
var newstr = str.replace("/12|89/gi","**");			//将str中的12和89换成**  g为全局匹配将全局满足条件都选出来 i部分字母大小写 

div.innerHTML = txa.value.replace(/激情|gay/gi, "<span style= 'color:red'>$&</span>");     //$&是获取当前匹配的字符串
```



其他相关图解如下：

![](C:\Users\12286\Desktop\我的文件\笔记相关\正则表达式相关.png)



## 十、es6新增

### 10.1、声明关键字

​					var		是es5中声明变量的方法 	只有局部作用域和全局作用域	还会进行变量提升	

​					let		 是es6新增声明变量的方法		它包括局部作用域、全局作用域、会计作用域(if、for的花括号中的区域)		不会进行变量提升

​					const	是es6新增声明常量的方法 		只要声明	该常量是不可以改变的

![](C:\Users\12286\Desktop\我的文件\笔记相关\es6变量声明关键字.png)



```js
//用let声明变量时 在块级作用域中会产生暂时性死区	在整个块级作用域中都会与该变量绑定
var num = 10;
if(true){
    console.log(num);				//会报错 因为在块级作用域中声明num变量 而let又不存在作用域提升				
    let num = 20;
}
```



### 10.2、对象解构

​					ES6中允许从数组中提取值，按照对应位置，对变量赋值，对象也可以实现解构

```js
//数组解构 常用于数据交换
let [a,b,c] = [1,2,3];
console.log(a);				//1
console.log(b);				//2
console.log(c);				//3
[arr[j],arr[j+1]] = [arr[j+1],arr[j]			//实现数组中j和j+1实现数值交换
                     
//对象解构
let obj = {person:'张三',age:22};
let {name,age} = obj;
console.log(name);		//张三
console.log(age);		//22

let {name:myname,age:myage} = obj; 				//将person的值存到myname中 将age的值存到myage中
```



### 10.3、箭头函数

​					ES6中新增的函数的定义方式，可以简化函数写法

```js
//()=>{}   这就是简单的箭头函数 其中()里面放的是形参 若形参只有一个()可以省略 {}放的是执行代码块 若只有一句代码{}也可以省略
let fn = (a,b)=>{
    return a+b;
}
```

**注：箭头函数中的this指向只在声明的时候就决定了，之后不会在改变，若在全局中定义的，this则指向window**



### 10.4、模板字符串

​				使用反引号(``)，将字符串包含起来，里面变化的内容可以使用${}动态添加变化，模板字符串可以简化动态添加，比字符串拼接简答很多

```js
var name = 'zs';
var age = 22;
var str = `${name}今年${age}岁`; 			//zs今年22岁   
```



guh

### 10.5、拓展运算符

```js
//... 可以通过拓展运算符接受传过来的多个参数
function sum(item,...args){
    console.log(item);			//1
    console.log(args);			//[2,3,4,5,6]
}
sum(1,2,3,4,5,6);
```



# Ajax

## 一、客户端与服务器

​			**客户端：**在上网过程中，负责 **获取和消费资源** 的电脑，叫做**客户端**

​			**服务器：**上网过程中，负责 **存放和对外提供资源** 的电脑，叫做**服务器**



## 二、jq中ajax请求

### 2.1、get请求

​				从服务器上面获取数据

```js
//$.get(url,[data],[callback])	url是请求的路径 data是传输的数据 callback是成功时返回的回调函数
$.get("http://www.liulongbin.top:3006/api/getbooks",{id:1},function(res){		//向服务器中获取id为1的数据
    console.log(res);				//res是服务器端返回的数据对象
})
```



### 2.2、post请求

​			 向服务器上传递数据

```js
//$.post(url,[data],[callback]) url是请求的数据 data是传输的数据 callback是成功时返回的回调函数
$.post("http://www.liulongbin.top:3006/api/addbook",{bookname:123,author:123,publisher:123},function(res){
    console.log(res);			//服务器返返回数据对象，里面包含操作是否成功等
})
```



### 2.3、ajax请求

​				是get请求和post请求的集合

```js
//$.ajax({url,[settings]})	里面传的是数据对象 url是服务器中的地址 
//settings包含type(请求的类型)、data(传输的数据)、success:function(){}(成功时返回的函数)等
$.ajax({
    url;"http://www.liulongbin.top:3006/api/getbooks",
    type:"GET",
    data:{
    	bookname:"哈利波特",
    	author:"杰克罗琳",
    	pushlisher:"xx出版社"
	},
    success:function(res){
    	console.log(res);				//请求成功返回的参数
	}
})
```

**注意：我们在执行ajax前  都会先执行  ajaxPrefilter 函数  这样我们在进行ajax请求进行身份认证时  我们可以将身份参数(token)   写在该函数里面  减少了每次请求时都需要进行token的设置** 

```js
$.ajaxPrefilter(function (options) {
    //添加ajax的根目录  之后在ajax中我只需要写接口的路径即可
  options.url = "http://www.liulongbin.top:3008" + options.url;
	
    //判断请求的接口是否需要携带token 需要的化会自动携带请求头 
  if (options.url.indexOf('/my') !== -1) {
    options.headers = {
        //从浏览器中取token中 若有就传递 若没有就传递一个空字符串
      Authorization: localStorage.getItem("token") || ''
    }
  };
	
    //判断用户身份信息是否正确 不正确就删除本地的token值  并且回到登录页
  options.complete = function (res) {
    if (res.responseJSON.code == 1 && res.responseJSON.message == "身份认证失败！") {
      localStorage.removeItem("token");
      location.href = '/login.html'
    }
  }
})
```

  

## 三、form中相关属性

### 3.1、action属性

​			 表单提交的地址

```html
<form action = "http://www.liulongbin.top:3006/api/addbook">	<--当点击提交按钮后，会将form表单中的内容提交给服务器-->
    <input type = 'text' , name = 'username'>
</form>
<button type = "submit">提交</button>
```



### 3.2、target属性

​			  控制表单提交后 是在新窗口打开还是在当前窗口打开 默认是在当前窗口打开(_self)

```html
<--默认是_self(在当前页面打开)-->
<form action = "http://www.liulongbin.top:3006/api/getbooks" target = '_blank'>	
    <input type = 'text' , name = 'username'>
</form>
<button type = "submit">提交</button>
```

![](C:\Users\12286\Desktop\我的文件\笔记相关\form表单target属性.png)



### 3.3、method属性

​				用来设置form表单的提交方式 是get还是post 默认是get 不区分大小写

```html
<--使用post向服务器发出请求-->
<form action = "http://www.liulongbin.top:3006/api/addbook" target = '_blank' method = 'POST'>	
    <input type = 'text' , name = 'username'>
</form>
<button type = "submit">提交</button>
```



### 3.4、enctype属性

​				用来规定在发送表单数据之前如何对数据进行编码 默认是application/x-www-form-urlencoded  表示在发送前编码所有字符

```html
<form action = "http://www.liulongbin.top:3006/api/addbook" method = 'POST' enctype = 'application/x-www-form-urlencoded'>	
    <input type = 'text' , name = 'username'>
</form>
<button type = "submit">提交</button>
```

![](C:\Users\12286\Desktop\我的文件\笔记相关\form表单enctype属性.png)



### 3.5、获取表单提交事件和阻止默认提交事件

```html
<form action = "http://www.liulongbin.top:3006/api/addbook" id = 'usersubmit'>	
    <input type = 'text' , name = 'username'>
</form>
<button type = "submit">提交</button>
```



```js
//通过sumbit事件可以获取到form的提交事件	事件绑定是绑定到form标签上
$("#usersubmit").on("submit",function(e){				
    e.preventDefault();		  //方法一					
    //return false;				方法二
    
    var str = $(this).serialize(); 		//jq中serialize()方法可以获得form标签内所有input框里面的值并返回一个字符串 	username=zs&age=22	
    $("#usersubmit")[0].reset();		//原生方法中reset可以将form中所有input值清空
})
```



## 四、模板引擎 

​				模板引擎，它可以根据程序员指定的 模板结构 和 数据，自动生成一个完整的HTML页面

​				**优点：减少了字符串的拼接操作 使代码结构更清晰 使代码更易于阅读与维护** 

​				使用：art-template模板引擎  它是一个js库 应用前需要引入

```html
<div id = "body"></div>
<script type = 'text/html' id = 'user'>

	//直接输入name和age
	<div>{{name}}</div>	
	<div>{{age}}</div>	
	
	//转换html标签
	{{@ test}}
	
	//条件判断输出不同的值
	<div>{{if score > 80}}					
	优
	{else if score > 60}
	良
	{{else}}
	差
	{{/if}}</div>	
	
	//遍历元素输出
	<ul>{{each arr}}
		<li>{{$value}}</li>
		{{/each}}
    </ul>
    
    //将date数据进行处理后再显示
	<div>{{date | dataformat}}</div>		
</script>

<script>
     var data = {
      name: 'zs',
      age: 20,
      score: 90,
      test: '<div>aaaa</div>',
      arr: [1, 2, 3, 45, 6],
      date: new Date()
     }
     var htmlstr = template("user",data);							//将user中的模板引擎进行数据实例化		
     document.getELementById("body").innerHTML = htmlstr;			//将id为body的类名加入html标签
    
     //将模板引擎格式化函数 函数名是dataformat
     template.defaults.imports.dateformat = function (date) {
      var x = date.getFullYear();
      var y = date.getMonth() + 1;
      var z = date.getDate();
      return x + "-" + y + "-" + z
    }
</script>
```



### 4.1、模板引擎原理(定义自己的模板引擎)

#### 4.2、exec函数

​				函数用于检索字符串中的正在表达式的匹配 如果字符串中又匹配的值，则返回该匹配值，否则返回 null

```js
var str = ‘{{name}}今年{{age}}岁’;
var pattern = /{{\s*([a-zA-Z]+)\s*}}/;
var res = pattern.exec(str);					//根据正则表达式返回匹配的数据 这里返回的是[{{name}},name] 

//通过replace将{{name}}替换成name 并重新赋值给str
str = str.replace(res[0],res[1]);

//通过循环来实现多次匹配字符串 若最终没找到则返回null
var parres = null;
while(parres = pattern.exec(str)){
    str = str.replace(parres[0].parres[1]);					//最终str变成name今年age岁
}
```



#### 4.3、具体实现

```js
//封装template函数
function template(id,data){
    var str = doucment.getElementById(id).innerHTML;
    var pattern = /{{\s*([a-zA-Z]+)\s*}}/;
    
    var parres = null;
	while(parres = pattern.exec(str)){
    	str = str.replace(parres[0],data[parres[1]]);					
	}
    
    return str
}

var data = {
    name;'zs',
    age;11
}

var htmlstr = template("user",data);
document.getELementById("body").innerHTML = htmlstr;
```



## 五、原生js实现ajax

### 5.1、XMLHttpRequest

​				XMLHttpRequest （简称 xhr ）是浏览器提供的 Javascript 对象，通过它，可以请求服务器上的数据资源。

```js
//通过new关键字进行实例化对象
var xhr = new XMLHttpRequest();
```



### 5.2、get请求

​				步骤：1、先实例化XMLHttpRequest()对象

​							2、使用open()方法配置传输路径等，**传递的查询字符串加在url后**

​							3、使用send()方法发送请求

​							4、通过监听onreadystatechange事件  查看请求成功与否

```js
var xhr = new XMLHttpRequest();
xhr.open("GET",'http://www.liulongbin.top:3006/api/getbooks?id=1&name=zs')
xhr.send();
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){				//判断请求是否完成 服务器是否成功响应
        console.log(xhr.responseText);							//打印服务器返回给我们的JSON字符串
    }
}
```





### 5.3、post请求

​					步骤：1、先实例化XMLHttpRequest()对象

​								2、使用open()方法配置传输路径等

​								**3、设置setRequestHeader请求头属性**

​								4、使用send()方法发送请求 **参数写在send方法里  传递的参数必须是查询字符串形式**

​								5、通过监听onreadystatechange事件  查看请求成功与否



```js
var xhr = new XMLHttpRequest();
xhr.open("POST",'http://www.liulongbin.top:3006/api/addbook');
xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');		//Content-Type默认是formdata  
xhr.send("name=zs&age=22");
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){				//判断请求是否完成 服务器是否成功响应
        console.log(xhr.responseText);							//打印服务器返回给我们的JSON字符串
    }
}
```



### 5.4、封装自己的ajax函数

```js
//将数据处理成查询字符串格式
	function doData(data) {
      var arr = [];
      for (var k in data) {
        var str = `${k}=${data[k]}`;
        arr.push(str);
      }
      return arr.join("&");
    }

//封装自己的ajax函数
    function myAjax(options) {
      var xhr = new XMLHttpRequest();
      var qs = doData(options.data);
		
      //判断是get请求还是post请求 根据请求的不同发不出的请求
      if (options.type.toUpperCase() === "GET") {
        xhr.open("get", options.url + "?" + qs);
        xhr.send();
      } else if (options.type.toUpperCase() === "POST") {
        xhr.open("post", options.url);
        xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
        xhr.send(qs)
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var re = JSON.parse(xhr.responseText);
          options.success(re);
        }
      }
    }

    myAjax({
      type: 'POST',
      url: 'http://www.liulongbin.top:3006/api/addbook',
      data: {
        bookname: "爱在黎明破晓前",
        author: "dkashd",
        publisher: "gfaj"
      },
      success: function (res) {
        console.log(res);
      }
    })
```



## 六、数据传输形式

### 6.1、XML形式

​				XML 的英文全称是 EXtensible Markup Language ，即**可扩展标记语言**。因此， XML 和 HTML 类似，也是一种标记语言

​				**XML和HTML区别**： XML 和 HTML 虽然都是标记语言，但是，它们两者之间没有任何的关系。

​													HTML 被设计用来描述网页上的**内容**，是网页内容的载体

​													XML 被设计用来**传输和存储数据**，是数据的载体

​													XML 格式臃肿，和数据无关的代码多，体积大，传输效率低

​													在 Javascript 中解析 XML 比较麻烦



### 6.2、JSON形式

​					**概念：**`JSON` 的英文全称是 `JavaScript Object Notation`，即“**JavaScript 对象表示法**”。简单来讲，`	JSON` 就是 `Javascript` 对象和数组的字								 符串表示法，它使用文本表示一个 `JS` 对象或数组的信息，因此，**`JSON` 的本质是字符串**。

​					**作用：**`JSON` 是一种轻量级的文本数据交换格式，在作用上类似于 `XML`，专门用于存储和传输数据，但是 `JSON` 比 `XML` 更小、更快、更易解析。        

​					**两种结构：**对象结构，使用{}包裹		可以存储**string、number、boolean、null、数组、对象**这六种数组类型

​									   数组结构，使用[]包裹		可以存储**string、number、boolean、null、数组、对象**这六种数组类型

​					**序列化和反序列化：**将数据对象转化成json字符串的过程叫做**序列化**(JSON.stringify)   将json字符串转换成数据对象的过程叫做**反序列化**(JSON.parse)



### 6.2、XMLHttpRequest Level2`的新功能★

- 可以设置 HTTP 请求的时限

- 可以使用 `FormData` 对象管理表单数据

- 可以上传文件

- 可以获得数据传输的进度信息

#### 设置`HTTP`请求时限

有时，`Ajax` 操作很耗时，而且无法预知要花多少时间。如果网速很慢，用户可能要等很久。新版本的 `XMLHttpRequest` 对象，增加了 `timeout` 属性，可以设置 `HTTP` 请求的时限：

![](E:/前端资料/Ajax资料/Day03/02.笔记/images/超时时间.png)

上面的语句，将最长等待时间设为 3000 毫秒。过了这个时限，就自动停止HTTP请求。与之配套的还有一个

`timeout` 事件，用来指定回调函数：

![](E:/前端资料/Ajax资料/Day03/02.笔记/images/超时回调.png)

```javascript
<script>
  var xhr = new XMLHttpRequest()
  // 设置 超时时间
  xhr.timeout = 30
  // 设置超时以后的处理函数
  xhr.ontimeout = function () {
    console.log('请求超时了！')
  }
  xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText)
    }
  }
</script>
```

#### `FormData`对象管理表单数据Ajax 操作往往用来提交表单数据。为了方便表单处理，`HTML5` 新增了一个 `FormData` 对象，可以模拟表单操作：

```javascript
 // 1. 新建 FormData 对象
 var fd = new FormData()
 // 2. 为 FormData 添加表单项
 fd.append('uname', 'zs')
 fd.append('upwd', '123456')
 // 3. 创建 XHR 对象
 var xhr = new XMLHttpRequest()
 // 4. 指定请求类型与URL地址
 xhr.open('POST', 'http://www.liulongbin.top:3006/api/formdata')
 // 5. 直接提交 FormData 对象，这与提交网页表单的效果，完全一样
 xhr.send(fd) //send方法可以接收查询字符串，也可以接收FormData对象
```

#### `FormData`对象管理表单数据

`FormData`对象也可以用来获取网页表单的值，示例代码如下：

```javascript
// 获取表单元素
var form = document.querySelector('#form1')
// 监听表单元素的 submit 事件
form.addEventListener('submit', function(e) {
 e.preventDefault()
 // 根据 form 表单创建 FormData 对象，会自动将表单数据填充到 FormData 对象中
 var fd = new FormData(form)
 var xhr = new XMLHttpRequest()
 xhr.open('POST', 'http://www.liulongbin.top:3006/api/formdata')
 xhr.send(fd)
 xhr.onreadystatechange = function() {}
})
```

#### 上传文件

新版 `XMLHttpRequest` 对象，不仅可以发送文本信息，还可以上传文件。

**实现步骤：**

① 定义 `UI` 结构

② 验证是否选择了文件

③ 向 `FormData` 中追加文件

④ 使用 `xhr` 发起上传文件的请求

⑤ 监听 `onreadystatechange` 事件

#### 定义`UI`结构

```html
 <!-- 1. 文件选择框 -->
 <input type="file" id="file1" />
 <!-- 2. 上传按钮 -->
 <button id="btnUpload">上传文件</button>
 <br />
 <!-- 3. 显示上传到服务器上的图片 -->
 <img src="" alt="" id="img" width="800" />
```

#### 验证是否选择了文件

```javascript
// 1. 获取上传文件的按钮
var btnUpload = document.querySelector('#btnUpload')
// 2. 为按钮添加 click 事件监听
btnUpload.addEventListener('click', function() {
 // 3. 获取到选择的文件列表
 var files = document.querySelector('#file1').files
 if (files.length <= 0) {
 return alert('请选择要上传的文件！')
 }
 // ...后续业务逻辑
})
```

#### 向`FormData`中追加文件

```javascript
// 1. 创建 FormData 对象
var fd = new FormData()
// 2. 向 FormData 中追加文件
fd.append('avatar', files[0])
```

#### 使用 `xhr` 发起上传文件的请求

```javascript
// 1. 创建 xhr 对象
var xhr = new XMLHttpRequest()
// 2. 调用 open 函数，指定请求类型与URL地址。其中，请求类型必须为 POST
xhr.open('POST', 'http://www.liulongbin.top:3006/api/upload/avatar')
// 3. 发起请求
xhr.send(fd)
```

####  监听`onreadystatechange`事件

```javascript
xhr.onreadystatechange = function() {
 if (xhr.readyState === 4 && xhr.status === 200) {
 	 var data = JSON.parse(xhr.responseText)
     if (data.status === 200) { // 上传文件成功
     // 将服务器返回的图片地址，设置为 <img> 标签的 src 属性
        document.querySelector('#img').src = 'http://www.liulongbin.top:3006' + data.url
     } else { // 上传文件失败
         console.log(data.message)
     }
 }
}
```

#### 显示文件上传进度

##### 计算文件上传进度新版本的 `XMLHttpRequest` 对象中，可以通过监听 `xhr.upload.onprogress` 事件，来获取到文件的上传进度。语法格式如下：

```javascript
// 创建 XHR 对象
var xhr = new XMLHttpRequest()
// 监听 xhr.upload 的 onprogress 事件
xhr.upload.onprogress = function(e) {
     // e.lengthComputable 是一个布尔值，表示当前上传的资源是否具有可计算的长度
     if (e.lengthComputable) { 
         // e.loaded 已传输的字节
         // e.total 需传输的总字节
         var percentComplete = Math.ceil((e.loaded / e.total) * 100)//这里用ceil或者floor都可以，只是取个整
     }
 }
// computable : 可计算的，lengthComputable理解：如果长度可计算，说明有长度，那么才能计算上传的进度
```

##### 导入需要的库

```html
<link rel="stylesheet" href="./lib/bootstrap.css" />
<script src="./lib/jquery.js"></script>
```

##### 基于`Bootstrap`渲染进度条

```html
 <!-- 进度条 -->
 <div class="progress" style="width: 500px; margin: 10px 0;">
     <div class="progress-bar progress-bar-info progress-barstriped active" id="percent" style="width: 0%">
     0%
     </div>
 </div>
```

##### 动态设置到进度条上

```javascript
xhr.upload.onprogress = function(e) {
     if (e.lengthComputable) {
         // 1. 计算出当前上传进度的百分比 （percent：百分比，complete：完成）
         var percentComplete = Math.ceil((e.loaded / e.total) * 100)
         $('#percent')
         // 2. 设置进度条的宽度
         .attr('style', 'width:' + percentComplete + '%')
         // 3. 显示当前的上传进度百分比
         .html(percentComplete + '%')
     }
}
```

##### 监听上传完成的事件

```javascript
xhr.upload.onload = function() {
     $('#percent')
     // 移除上传中的类样式
     .removeClass()
     // 添加上传完成的类样式
     .addClass('progress-bar progress-bar-success')
}
```



## 七、同源与跨域

### 7.1、同源

​			如果两个页面协议、域名、端口都相同，我们就说这两个页面同源

![](C:\Users\12286\Desktop\我的文件\笔记相关\同源判断.png)



**同源策略：**是浏览器提供的一个安全功能 MDN 官方给定的概念：同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行 交互。这是一个					用于隔离潜在恶意文件的重要安全机制 通俗的理解：浏览器规定，A 网站的 JavaScript，不允许和非同源的网站 C 之间，进行资源的交互，

​					例 如： ①无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB 

​								 ② 无法接触非同源网页的 DOM

​								 ③ 无法向非同源地址发送 Ajax 请求



### 7.2、跨域

​				同源指的是两个 URL 的协议、域名、端口一致，反之，则是**跨域** 

​				**出现跨域的根本原因**：浏览器的同源策略不允许非同源的 URL 之间进行资源的交互



**解决跨域的两种方法：**JSONP和CORS



#### 7.2.1、JSONP

​				JSONP ( JSON with Padding ) 是 JSON 的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的 问题。

​				**实现原理**就是利用script标签中src属性不受同源策略影响

```js
//jq实现JSONP
$.ajax({
		url: 'http://ajax.frontend.itheima.net:3006/api/jsonp?name=zs&age=20',
		dataType: 'jsonp',
		jsonp: 'callback',					// 发送到服务端的参数名称，默认值为 callback  一般省略不写
		jsonpCallback: 'abc',				// 自定义的回调函数名称，默认值为 jQueryxxx 格式  一般省略不写
		success: function(res) {
		console.log(res)
		}
})
```

**缺点**：由于 `JSONP` 是通过 `<script>` 标签的 `src` 属性，来实现跨域数据获取的，所以，`JSONP` 只支持 `GET` 数据请求，不支持 POST 请求。

​			**因为script本意是引入资源，也就是获取某个js文件，所以只能获取数据，只支持get**

**注意：** **`JSONP` 和 Ajax 之间没有任何关系**，不能把 `JSONP` 请求数据的方式叫做 Ajax，因为 `JSONP` 没有用到`XMLHttpRequest` 这个对象



#### 7.2.2、CORS

​				官方提供的一种解决跨域方法    是现在解决跨域的主流方法

```
#安装cors
npm install cors
```

```js
//导入cors包
const cors = require('cors');

//注册全局cors		注册完成后即可解决跨域		简单粗暴解决跨域问题
app.use(cors());
```

**注意：**① CORS 主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了 CORS 的接口。 

​		   ② CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服 务端接口（例如：IE10+、Chrome4+、				 FireFox3.5+）。



**CORS 响应头部 - Access-Control-Allow-Origin**：

```js
//只允许http://49.233.47.249客户端进行跨域请求 如要设置全都可以访问 可以写入*符号  但一般不建议 会造成安全问题(cors攻击)
res.setHeader('Access-Control-Allow-Origin','http://49.233.47.249')			
```



**CORS 响应头部 - Access-Control-Allow-Headers:**

​			默认情况下，CORS 仅支持客户端向服务器发送如下的 **9 个请求头**： 

​			Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、 Content-Type （值仅限于 text/plain、			multipart/form-data、application/x-www-form-urlencoded 三者之一）

​			 如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 			Access-Control-Allow-Headers 对额外 的请求头进行声明，否则这次请求			会失败！

```js
//允许客户端额外向服务器发送Content-type请求头和X-Custom-Header请求头
//多个请求头要用逗号分割
res.setHeader('Access-Control-Allow-Headers','Content-type, X-Custom-Header')
```



**CORS 响应头部 - Access-Control-Allow-Methods**

​			默认情况下，CORS 仅支持客户端发起 **GET、POST、HEAD** 请求。 

​			如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Alow-Methods 来指明实际请求所允许使用的 			HTTP 方法。			

```js
//只允许发起get、post、delete、head请求
res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,HEAD');

//允许发起任何请求
res.setHeader('Access-Control-Allow-Methods','*')
```



**简单请求：**

同时满足以下两大条件的请求，就属于简单请求： 

① 请求方式：GET、POST、HEAD 三者之一 

② HTTP 头部信息不超过以下几种：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、	Width 、Content-Type（只有三个值application/x-www-formurlencoded、multipart/form-data、text/plain）

特点：客户端向服务器中只发起**一次请求**



**预检请求：**

只要符合以下任何一个条件的请求，都需要进行预检请求： 

① 请求方式为 GET、POST、HEAD 之外的请求 Method 类型 

② 请求头中包含自定义头部字段 

③ 向服务器发送了 application/json 格式的数据

特点：客户端向服务器中发起**两次请求 **  即在浏览器与服务器正式通信之前，浏览器会先发送 **OPTION 请求**进行预检，以获知服务器是否允许该实际请求，所以这一 次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。



## 八、防抖与节流

### 8.1、防抖

​				**防抖策略**是当事件被触发后，延迟 n 秒后再执行回调，如果在这 n 秒内事件又被触 发，则重新计时。

​				应用场景：输入框输入时需要防抖

```js
	  var timer = null
      // 定义全局缓存对象
      var cacheObj = {} 
	  function debounceSearch(kw) {
        timer = setTimeout(function () {
          getSuggestList(kw)
        }, 500)
      }

      // 为输入框绑定 keyup 事件
      $('#ipt').on('keyup', function () {
        // 3. 清空 timer
        clearTimeout(timer)
        var keywords = $(this).val().trim()
        if (keywords.length <= 0) {
          return $('#suggest-list').empty().hide()
        }

        // 先判断缓存中是否有数据
        if (cacheObj[keywords]) {
          return renderSuggestList(cacheObj[keywords])
        }

        // TODO:获取搜索建议列表
        // console.log(keywords)
        // getSuggestList(keywords)
        debounceSearch(keywords)
      })

      function getSuggestList(kw) {
        $.ajax({
          url: 'https://suggest.taobao.com/sug?q=' + kw,
          dataType: 'jsonp',
          success: function (res) {
            // console.log(res)
            renderSuggestList(res);						//渲染页面 并存储缓存
          }
        })
      }
```



### 8.2、节流

​				**节流策略**就是控制事件在某一段事件内，只能触发一次

​				**应用场景：**① 鼠标连续不断地触发某事件（如点击），只在单位时间内只触发一次；

​									② 懒加载时要监听计算滚动条的位置，但不必每次滑动都触发，可以降低计算的频率，而不必去浪费 CPU 资源；

```js
$(function() {
     var angel = $('#angel')
     var timer = null // 1.预定义一个 timer 节流阀
     $(document).on('mousemove', function(e) {
     if (timer) { return } // 3.判断节流阀是否为空，如果不为空，则证明距离上次执行间隔不足16毫秒
     timer = setTimeout(function() {
     $(angel).css('left', e.pageX + 'px').css('top', e.pageY + 'px')
     timer = null // 2.当设置了鼠标跟随效果后，清空 timer 节流阀，方便下次开启延时器
     }, 16)
     })
})
```



**总结**：**防抖**：如果事件被频繁触发，防抖能保证只有最有一次触发生效！前面 N 多次的触发都会被忽略！

​			**节流**：如果事件被频繁触发，节流能够减少事件触发的频率，因此，节流是有选择性地执行一部分事件！