import request from '@/utils/request'

export const getSkuTop = (topValue, start, end) => {
  return request({
    url: `/order-service/report/skuTop/${topValue}/${start}/${end}`
  })
}

export const getSales = (start, end, innerCode) => {
  return request({
    url: `/order-service/report/orderCount`,
    params: {
      start, end,
      innerCode
    }
  })
}

export const getIncome = (start, end, innerCode) => {
  return request({
    url: `/order-service/report/orderAmount`,
    params: {
      start, end,
      innerCode
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

export const obtainTheSalesVolume = (innerCode, start, end) => {
  return request({
    url: `/order-service/report/skuCollect/${innerCode}/${start}/${end}`
  })
}
