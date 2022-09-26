import Layout from '@/layout'

export default {
  path: '/node',
  name: 'Node',
  component: Layout,
  meta: {
    title: '点位管理',
    icon: 'dianwei'
  },
  children: [{
    path: 'region',
    name: 'Region',
    meta: {
      title: '区域管理'
    }
  },
  {
    path: 'node',
    name: 'Node',
    meta: {
      title: '点位管理'
    }
  },
  {
    path: 'partner',
    name: 'Partner',
    meta: {
      title: '合作商管理'
    }
  }
  ]
}
