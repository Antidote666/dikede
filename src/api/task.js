import request from '@/utils/request'

export const getSummaryInformation = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}

export const getOrderSearch = (pageIndex, pageSize, isRepair) => {
  return request({
    url: `/task-service/task/search`,
    params: {
      pageIndex,
      pageSize,
      isRepair
    }
  })
}

export const getJobDetails = (taskId) => {
  return request({
    url: `/task-service/task/taskInfo/` + taskId
  })
}

export const createAJob = (data) => {
  return request({
    url: `/task-service/task/create`,
    data
  })
}
