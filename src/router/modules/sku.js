import Layout from '@/layout'

export default {
  path: '/sku',
  name: 'sku',
  meta: {
    title: '商品管理',
    icon: 'shangpin'
  },
  component: Layout,
  children: [{
    path: 'sku-class',
    meta: {
      title: '商品类型'
    }
  },
  {
    path: 'sku',
    meta: {
      title: '商品管理'
    }
  }
  ]
}
