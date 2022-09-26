import request from '@/utils/request'

export const getCooperation = () => {
  return request({
    url: `/user-service/partner/count`
  })
}

