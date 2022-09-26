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
    meta: {
      title: '设备管理'
    }
  },
  {
    path: 'status',
    meta: {
      title: '设备状态'
    }
  },
  {
    path: 'type',
    meta: {
      title: '设备类型管理'
    }
  }]
}
