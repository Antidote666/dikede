import Layout from '@/layout'

export default {
  path: '/vm',
  name: 'Vm',
  component: Layout,
  meta: {
    title: '设备管理',
    icon: 'shebei'
  },
  children: [{
    path: 'index',
    component: () => import ('@/views/vm'),
    meta: {
      title: '设备管理'
    }
  },
  {
    path: 'status',
    component: () => import ('@/views/vm/status'),
    meta: {
      title: '设备状态'
    }
  },
  {
    path: 'type',
    component: () => import ('@/views/vm/type'),
    meta: {
      title: '设备类型管理'
    }
  }]
}
