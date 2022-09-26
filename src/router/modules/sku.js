import Layout from '@/layout'

export default {
  path: '/sku',
  name: 'sku',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/sku'),
    meta: {
      title: '商品管理',
      icon: 'dashboard'
    }
  }]
}
