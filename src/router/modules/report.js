import Layout from '@/layout'

export default {
  path: '/report',
  name: 'Report',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/report'),
    meta: {
      title: '对账统计',
      icon: 'zhangdan'
    }
  }]
}
