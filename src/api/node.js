import request from '@/utils/request'

export const nodeCollect = () => {
  return request({
    url: `/vm-service/node/nodeCollect`
  })
}

export const getCount = () => {
  return request({
    url: `/vm-service/node/count`
  })
}

export const getDetailsOfVendingMachineAisle = (innerCode) => {
  return request({
    url: `/vm-service/channel/channelList/` + innerCode
  })
}

