import router from '@/router'
import store from './store'
const white = ['/login', '/404']

router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (white.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
