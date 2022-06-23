# react hooks总结

### 一、定义：

​		是react在16.8版本之后新增的，用来解决函数式组件无法像类式组件一样使用state等变量问题

### 二、内置api 

这些api是react里面自带的api，引入的时候需要按需引入 即

```jsx
import { useState } from 'react'
```



##### 1、useState

​	 相当于类式组件中state

```jsx
function demo(){
  // useState里面接受的是数据的初始化变量 setArr是用来修改arr的方法
  const [arr,setArr] = useState([]);
  
  handleArr = (arr) =>{
    setArr(arr) // 修改arr里面的数据
  }
  
  return (
  	<div>{arr}</div>
  )
}
```



##### 2、useEffect 

​	 相当于类式组价中生命周期componentDidMount、componentDidUpdate的生命周期中去执行

```jsx
// 子组件 
function demo(props){
  // 第二个参数是用来监听那些元素变化了才会了执行 即props.data变化了才会打印
  // 若第二个参数为空数组则监听所有元素 相当于生命周期中的componentDidUpdate
  useEffect(()=>{
    console.log('props.data发生了变化')
  },[props.data])
  
  useEffect(()=>{
    console.log('demo组件发生了变化')
  },[])
  
  return (
  	<div>{props.data}</div>
  )
}
export default demo

// 父组件
import Demo from './demo'
function father(
	const [data,setData] = useState('')

	handleData = (val) => {
    setData(val)
  }
  
  return (
  	<div>
     {/* react 实现了vue中input的v-models */}
      <input type='text' value={data} onChange={(e) => handleData(e.target.value)}/>
    	<Demo data = {data}/>
    </div>
  )
)
```



##### 3、useContext		



##### 4、useRef

​      相当于ref，都可以操作DOM元素。但它与ref又不是完全相同，因为函数式组件每次更新的时候都会重新创建DOM元素，这就实际的情况就不一样，而useRef相当于他在全局上创建了一个对象用来存储这个DOM，导致元素并不是每次更新函数执行的时候都会去创建，但是当组件销毁时，该DOM元素也会随之销毁，无需手动销毁

```jsx
function demo(){
  const demoRef = useRef('') // 初始化ref
  
  useEffect(()=>{
    // demoRef.current相当于获取当前的input的DOM实例
    demoRef.current.focus(); // 组件初次加载的时候就自动获取到input框的焦点
  })
  return (
  	<div>
    	<input type='text' ref={demoRef}/>
    </div>
  )
}
```



##### 5、useCallBack

​	 返回一个回调函数 通常用于自定义hooks里面 用返回一个回调函数用来修改hoooks里面的值

```jsx
```



### 三、react-router-dom内置api

##### 1、useHistory （v5使用 v6被useNavigate替换）

​	用来进行路由跳转的hooks  useNavigate是useHistory的轻量版 

![image-20220408133612945](/Users/cc/Desktop/note/note/笔记相关/img/useHistory进行跳转.png)

```jsx
import {useHistory,useNavigate,useLocation} from 'react-router-dom'

 function Demo(){
   const history = useHistory()
   //const navigate = useNavigate()
   const location = useLocation()
   
   const gotoLogin = () => {
     history.push('/login')  
     //navigate('/login')
     // 可以用来传递两个参数 第一个参数是跳转到哪一个路由 第二个参数传递state
     history.push('/login',{type:1,username:'张三'})
     // 跳转页面可以通过useLocation()这个hooks来获取传递来的值
     // location.state就可以获取传递过来参数对象
   }
   
   return (
   	 <div>
     		<buttoon onClick={gotoLogin}>去登陆</buttoon>	
     </div>
   )
 }
```

##### 2、useParams

​	用来获取动态路由的参数

```jsx
// 路由配置 /user/:id
// 浏览器路径 http://localhost:3000/user/1
import { useParams } from 'react-router-dom'
import { useEffect } from 'react' 

function Demo(){
  const params = useParams()
  
  useEffect(()=>{
    console.log(params.id) // 1
  })
  
  return (
  	<div>useParams</div>
  )
}
```

##### 3、useSearchParams

​	用来获取路径？后面的查询参数 该hooks会返回一个当前值和一个set方法 要想获取当前值需要使用.get()方法获取

```jsx
import {useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'

function Demo(){
  const [searchParams,setSearchParams] = useSearchParams()
  
  useEffect(()=>{
    console.log(searchParams.get('search'))
  })
  
  const addSearch = () => {
    let search = searchParams.get('search')
    setSearchParams({"search":search+1})
  }
  
  return (
  	<div>
    	<button onClick={addSearch}>search+1</button>
    </div>
  )
}
```

##### 4、useLocation

​	用来返回当前url的location对象  其中state中放的就是传递来的参数

![image-20220408133401057](/Users/cc/Desktop/note/note/笔记相关/img/useLocation返回的location对象.png)

```jsx
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function Demo(){
  const location = useLocation()
  
  useEffect(() => {
    console.log(location)
  },[])
}
```



##### 5、useRouter (v6 新增)

