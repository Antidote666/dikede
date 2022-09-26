import { login } from '@/api'
import { Message } from 'element-ui'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async loginAction({ commit }, formData) {
      const { data } = await login(formData)
      if (data.token) {
        commit('SET_TOKEN', data.token)
        router.push('/course')
      } else {
        Message.error(data.msg)
      }
    }
  }
}
