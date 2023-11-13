import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from '@/lang' // 导入语言包实例

import '@/icons' // 导入所有的icon图标
import '@/permission' // 导航权限守卫逻辑
import checkPermission from '@/mixins/checkPermission'
import * as directives from '@/directives'
import * as filters from '@/filters'

// 批量注册指令
Object.keys(directives).forEach(val => {
  Vue.directive(val, directives[val])
})
// 批量注册过滤器
Object.keys(filters).forEach(val => {
  Vue.filter(val, filters[val])
})
// 设置全局的混入
Vue.mixin(checkPermission)

// 根据i8n的情况自动调整语言版本
Vue.use(ElementUI, {
  // 设置语言
  i18n: (key, value) => i18n.t(key, value),
  // 设置尺寸
  size: Cookies.get('size') || 'medium'
})

/**
设置mock
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
