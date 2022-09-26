import Layout from '@/layout'

export default {
  path: '/user',
  name: 'User',
  meta: {
    title: '人员管理',
    icon: 'renyuan'
  },
  component: Layout,
  children: [{
    path: 'index',
    name: 'Index',
    meta: {
      title: '人员列表'
    }
  },
  {
    path: 'user-task-stats',
    meta: {
      title: '人效统计'
    }
  },
  {
    path: 'user-work',
    meta: {
      title: '工作量列表'
    }
  }]
}
