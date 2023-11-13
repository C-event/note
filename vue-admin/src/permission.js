import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进入进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 读取token
import getPageTitle from '@/utils/get-page-title' // 读取网页标题

NProgress.configure({ showSpinner: false }) // NProgress 的配置

const whiteList = ['/login'] // 不需要权限验证的白名单

router.beforeEach(async(to, from, next) => {
  // 进度条开始
  NProgress.start()

  // 设置网页标题
  document.title = getPageTitle(to.meta.title)

  // 读取token，从而判断是否已经登录
  const hasToken = getToken()
  // 判断是否登录
  if (hasToken) {
    // 登录了，但是要去登录页，跳转到首页
    if (to.path === '/login') {
      // 如果登录了，就跳转到首页去
      next({ path: '/' })
      NProgress.done()
    } else {
      // 登录了，不去登录页面，也就说进入系统！
      // 读取getters里面是否有name，也就是判断是否有用户资料
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        // 有用户资料就放行
        next()
      } else {
        // 没有用户资料，就去拉取用户资料
        try {
          // /////////////////////权限，路由需要处理的位置//////////////////////////////
          await store.dispatch('user/getInfo')
          next()

          // 将来要根据自己的业务逻辑，来判断这里，读取的信息
          // 调用user模块下的 getInfo 这个action方法
          // const { roles } = await store.dispatch('user/getInfo')
          // 筛选出属于当前用户的动态路由映射数组
          // const routes = await store.dispatch('permission/filterRoutes', roles.menus)
          // 添加到路由实例中去
          // router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
          // 重点，难点： router.addRoutes 调用之后不能用next() ，而要用next(to.path)
          // next() 表示直接进入页面； next(地址)  要再次走一次导航守卫，然后再出去
          // next(to.path)

          // //////////////////////权限，路由需要处理的位置/////////////////////////////
        } catch (error) {
          // 拉取用户资料出错，说明token过期，需要重置token，并且退出
          await store.dispatch('user/resetToken')
          // 提示错误消息
          Message.error(error || 'Has Error')
          // 跳转到登录页，并且携带重定向地址
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有登录
    // 判断是否去的地址在白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单中就方向
      next()
    } else {
      // 不在说明就是没有登录，还想进入系统里面的一些页面，想得美！拦截，去登录，并且传给登录重定向地址
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
