import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建要给axios实例
const service = axios.create({
  // 基础地址，读取环境变量里面的信息
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // 是否携带cookie
  // withCredentials: true, // send cookies when cross-domain requests
  // 过期时长
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 携带token，将来可能要稍微改动
    if (store.getters.token) {
      // 请求头token，注意 字段不一定是 X-Token,具体根据后端说明要求来
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 错误处理
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 这里的代码绝对要修改
    // if the custom code is not 20000, it is judged as an error.
    // 如果说状态码，不是2000，就说明有错误！
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: 非法token ; 50012: 其他地方登录 ; 50014: token过期了
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 要求重新登录
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // 清楚token代码
          store.dispatch('user/resetToken').then(() => {
            // 刷新页面
            location.reload()
          })
        })
      }
      // 抛出错误
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // 是2000 就说明数据正确
      return res
    }
  },
  // 服务器真的异常！
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
