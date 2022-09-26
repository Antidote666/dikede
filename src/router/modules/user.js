import Layout from '@/layout'

export default {
  path: '/user',
  name: 'User',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/user'),
    meta: {
      title: '人员管理',
      icon: 'dashboard'
    }
  }]
}
