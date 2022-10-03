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

export const vendingMachineList = (params) => {
  return request({
    url: `/vm-service/vm/search`,
    params
  })
}

export const vendingMachineTypeList = (params) => {
  return request({
    url: `/vm-service/vmType/search`,
    params
  })
}

export const pointSearch = (params) => {
  return request({
    url: `/vm-service/node/search`,
    params
  })
}

export const newVendingAircraft = (data) => {
  return request({
    url: `/vm-service/vm`,
    method: 'POST',
    data
  })
}

export const getPolicyList = () => {
  return request({
    url: `/vm-service/policy`
  })
}

export const getApplicationStrategy = (data) => {
  return request({
    url: `/vm-service/vm/applyPolicy`,
    method: 'PUT',
    data
  })
}

export const getVendingTypeDetails = (typeId) => {
  return request({
    url: `/vm-service/vmType/` + typeId
  })
}

export const getBusinessDistrictList = (typeId) => {
  return request({
    url: `/vm-service/businessType` + typeId
  })
}

export const getReplenishmentRecommendation = (businessId) => {
  return request({
    url: `/vm-service/sku/businessTop10/` + businessId
  })
}

export const productSearch = (params) => {
  return request({
    url: `/vm-service/sku/search`,
    params
  })
}

export const freightLaneConfiguration = (data) => {
  return request({
    url: `/vm-service/channel/channelConfig`,
    method: 'PUT',
    data
  })
}

export const queryVendingMachinePolicy = (innerCode) => {
  return request({
    url: `/vm-service/policy/vmPolicy/` + innerCode
  })
}

export const cancelPolicy = (innerCode, policyId) => {
  return request({
    url: `/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: 'PUT'
  })
}
export const modifyVendingMachinePoint = (id, nodeId) => {
  return request({
    url: `/vm-service/vm/${id}/${nodeId}`,
    method: 'PUT'
  })
}

export const uploadImg = (data) => {
  return request({
    url: `/vm-service/sku/fileUpload`,
    method: 'POST',
    data
  })
}

export const newVendingMachineType = (data) => {
  return request({
    url: `/vm-service/vmType`,
    method: 'POST',
    data
  })
}
export const vendingMachineTypeModification = (typeId, data) => {
  return request({
    url: `/vm-service/vmType/` + typeId,
    method: 'PUT',
    data
  })
}

export const vendingMachineTypeDeletion = (typeId) => {
  return request({
    url: `/vm-service/vmType/` + typeId,
    method: 'DELETE'
  })
}
