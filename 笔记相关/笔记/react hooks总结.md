# react hooks总结

#### 一、定义：

​		是react在16.8版本之后新增的，用来解决函数式组件无法像类式组件一样使用state等变量问题

#### 二、内置api 

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
  // 若第二个参数不写则监听所有元素 相当于生命周期中的componentDidUpdate
  useEffect(()=>{
    console.log('props.data发生了变化')
  },[props.data])
  
  useEffect(()=>{
    console.log('demo组件发生了变化')
  })
  
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

