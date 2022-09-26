import request from '@/utils/request'

export const getSummaryInformation = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}

export const getSkuTop = (topValue, start, end) => {
  return request({
    url: `/order-service/report/skuTop/${topValue}/${start}/${end}`
  })
}

export const getSales = (start, end) => {
  return request({
    url: `/order-service/report/orderCount`,
    params: {
      start, end
    }
  })
}

export const getIncome = (start, end) => {
  return request({
    url: `/order-service/report/orderAmount`,
    params: {
      start, end
    }
  })
}

export const amountCollect = (collectType, start, end) => {
  return request({
    url: `/order-service/report/amountCollect/${collectType}/${start}/${end}`
  })
}

export const regionCollect = (start, end) => {
  return request({
    url: `/order-service/report/regionCollect/${start}/${end}`
  })
}

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

export const getCooperation = () => {
  return request({
    url: `/user-service/partner/count`
  })
}

