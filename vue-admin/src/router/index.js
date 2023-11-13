import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 动态路由，完整的动态路由
export const asyncRoutes = []
// 读取当前目录下面的modules所有的JS文件，建议modules下面不要再创建文件夹
const routeFiles = require.context('./modules', true, /\.js$/)
// 批量导入文件，放入到asyncRoutes里面
routeFiles.keys().reduce((routes, routePath) => {
  const value = routeFiles(routePath)
  asyncRoutes.push(value.default)
}, {})

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * 静态路由
 * 不需要进行权限管理的路由
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }
  // 外链实例
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

// 创建一个路由实例的方法
const createRouter = () => new Router({
  // 模式，推荐hash模式，默认就是hash模式
  // mode: 'history', // require service support
  // 滚动条的设置
  scrollBehavior: () => ({ y: 0 }),
  // 设置路由映射
  // routes: constantRoutes   //  将来处理好了，还是要用这一句！
  // 临时的静态路由和完整的动态路由合并处理，将来需要写成上面的！
  routes: [...constantRoutes, ...asyncRoutes, { path: '*', redirect: '/404', hidden: true }]
})

// 创建一个路由实例对象
const router = createRouter()

// 重置一个路由实例对象
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
