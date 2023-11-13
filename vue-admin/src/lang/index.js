import Vue from 'vue' // 导入vue
import VueI18n from 'vue-i18n' // 引入国际化的包

import Cookies from 'js-cookie'

// 导入element-ui的语言包
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// 导入自定义语言包
import customZh from './lib/zh'
import customEn from './lib/en'

// 安装插件
Vue.use(VueI18n)
// 实例化一个i18n实例对象
const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en',
  messages: {
    // element语言包 + 自定义语言包
    'zh': {
      ...zhLocale,
      ...customZh
    },
    'en': {
      ...enLocale,
      ...customEn
    }
  }
})

// 暴露一个i18n的实例
export default i18n
