import Layout from '@/layout'

export default {
  path: '/policy',
  name: 'Policy',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/policy'),
    meta: {
      title: '策略管理',
      icon: 'renyuan'
    }
  }]
}
