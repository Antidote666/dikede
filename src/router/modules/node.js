import Layout from '@/layout'

export default {
  path: '/node',
  name: 'Node',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/node'),
    meta: {
      title: '点位管理',
      icon: 'dianwei'
    }
  }]
}
