import { login } from '@/api'
import { Message } from 'element-ui'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    // token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.userInfo.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async loginAction({ commit }, formData) {
      const { data } = await login(formData)
      if (data.token) {
        // commit('SET_TOKEN', data.token)
        commit('SET_USER_INFO', data)
        router.push('/course')
      } else {
        Message.error(data.msg)
      }
    }
  }
}
