import Layout from '@/layout'

export default {
  path: '/vm',
  name: 'Vm',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/vm'),
    meta: {
      title: '设备管理',
      icon: 'shebei'
    }
  }]
}
