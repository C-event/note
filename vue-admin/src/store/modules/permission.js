// vuex的权限模块
import { constantRoutes, asyncRoutes } from '@/router'
// vuex中的permission模块用来存放当前的 静态路由 + 当前用户的 权限路由
const state = {
  routes: constantRoutes // 所有人默认拥有静态路由
}
const mutations = {
  // newRoutes可以认为是 用户登录 通过权限所得到的动态路由的部分
  setRoutes(state, newRoutes) {
    // 下面这么写不对 不是语法不对 是业务不对
    // state.routes = [...state.routes, ...newRoutes]
    // 有一种情况  张三 登录 获取了动态路由 追加到路由上  李四登录 4个动态路由
    // 应该是每次更新 都应该在静态路由的基础上进行追加
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // 过滤器对应的动态路由
  filterRoutes(context, menus) {
    // asyncRoutes 本地完整的动态路由
    // ////////////////////////////////////////////////////////////////////
    // 1. 情况1是后端返回路由的标识，和本地的完整动态路由进行筛选，找出用户属于的动态路由
    // 2. 情况2是后端直接返回完整的该用户的动态路由，我们需要处理成能用的形式

    // 下面的代码是后端返回标识和路由的name进行匹配！
    // menus 登录后，获取的用户资料中的当前用户对应的角色所拥有的权限标识！
    // menus的案例数==> ["employees","settings","permissions",...]
    // 根据 menus 去 完整的本地的动态路由中 过滤出属于他的动态路由
    const routes = []
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    // ////////////////////////////////////////////////////////////////////
    // 修改  state中的  routes
    context.commit('setRoutes', routes)
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
