
import Layout from '@/layout'

export default {
  // 一级路由的地址
  path: '/class',
  // 是用布局作为组件
  component: Layout,
  // 【名称，非常的重要，有可能是作为权限的筛选标识】
  name: 'class',
  meta: { title: '班级管理', icon: 'table' },
  children: [
    {
      path: '',
      component: () => import('@/views/class/class'),
      name: 'social_securitys',
      meta: {
        title: '班级管理',
        icon: 'table'
      }
    },
    {
      path: 'student',
      component: () => import('@/views/class/student'),
      name: 'student',
      meta: {
        title: '学生管理',
        icon: 'table'
      }
    }
  ]
}
