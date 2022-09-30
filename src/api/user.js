import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getCode(clientToken) {
  return request({
    url: '/user-service/user/imageCode/' + clientToken,
    method: 'GET'
  })
}

export const login = (data) => {
  return request({
    url: 'user-service/user/login',
    data,
    method: 'POST'
  })
}

export const getVendingListOperators = (innerCode) => {
  return request({
    url: `/user-service/user/operatorList/` + innerCode
  })
}
