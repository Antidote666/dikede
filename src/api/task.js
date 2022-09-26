import request from '@/utils/request'

export const getSummaryInformation = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}
