
import Layout from '@/layout'

export default {
  // 一级路由的地址
  path: '/exam',
  // 是用布局作为组件
  component: Layout,
  // 【名称，非常的重要，有可能是作为权限的筛选标识】
  name: 'exam',
  meta: { title: '考试管理', icon: 'table' },
  children: [
    {
      path: '',
      component: () => import('@/views/exam/question'),
      name: 'social_securitys',
      meta: {
        title: '试题管理',
        icon: 'table'
      }
    },
    {
      path: 'student',
      component: () => import('@/views/exam/paper'),
      name: 'student',
      meta: {
        title: '试卷管理',
        icon: 'table'
      }
    },
    {
      path: 'exam',
      component: () => import('@/views/exam/exam'),
      name: 'exam',
      meta: {
        title: '考试管理',
        icon: 'table'
      }
    }
  ]
}
