import Layout from '@/layout'

export default {
  path: '/task',
  name: 'Task',
  meta: {
    title: '工单管理',
    icon: 'gongdan'
  },
  component: Layout,
  children: [{
    path: 'business',
    name: 'Business',
    meta: {
      title: '运营工单'
    }
  },
  {
    path: 'operation',
    name: 'Operation',
    meta: {
      title: '运维工单'
    }
  }]
}
