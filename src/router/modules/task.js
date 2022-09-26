import Layout from '@/layout'

export default {
  path: '/task',
  name: 'Task',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/task'),
    meta: {
      title: '工单管理',
      icon: 'gongdan'
    }
  }]
}
