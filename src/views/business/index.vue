<template>
  <div class="dashboard-container">
    <el-card class="result">
      <lin-tabel :table-data="tableData" :labels="labels" :current-page="currentPage">
        <template #operation="{scope}">
          <span class="details" @click="getDetails(scope)">查看详情</span>
        </template>
      </lin-tabel>
      <lin-page
        :total="total"
        :current-page.sync="currentPage"
        :total-page="totalPage"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <lin-form
      :form-labels="formLabel"
      :form-data="currentData"
      :inline="true"
      :visible.sync="dialogVisible"
    >
      <template #dialogBodyTop>
        <div class="status">
          <div> <span class="el-icon-warning" /> <span>取消</span></div>
          <img src="@/assets/common/formempty.png" alt="">
        </div>
      </template>
      <template #details>
        <span class="details">补货数量</span>
      </template>
      <template #dialogFooter>
        <div class="dialogFooter">
          <el-button type="primary" class="recreate">重新创建</el-button>
        </div>
      </template>
    </lin-form>
  </div>
</template>

<script>
import LinTabel from '@/components/TabelFormPage/Table'
import LinPage from '@/components/TabelFormPage/Page'
import LinForm from '@/components/TabelFormPage/Form'
import { getOrderSearch, getJobDetails } from '@/api'
export default {
  components: {
    LinPage,
    LinTabel,
    LinForm
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      totalPage: 0,
      tableData: [],
      labels: {
        taskCode: '工单编号',
        innerCode: '设备编号',
        'taskType.typeName': '工单类型',
        createType: '工单方式',
        'taskStatusTypeEntity.statusName': '工单状态',
        userName: '运营人员',
        createTime: '创建日期'
      },
      formLabel: {
        innerCode: '设备编号',
        createTime: '创建日期',
        updateTime: '取消日期',
        userName: '运营人员',
        'taskType.typeName': '工单类型',
        'details': '补货数量',
        createType: '工单方式',
        desc: '取消原因'
      },
      currentData: {},
      dialogVisible: false
    }
  },
  created() {
    this.getOrderSearch()
  },
  methods: {
    async getOrderSearch() {
      const { data } = await getOrderSearch(this.currentPage, this.pageSize, false)
      this.tableData = data.currentPageRecords.map(item => {
        item.createType = item.createType ? '手动' : '自动'
        item.createTime = item.createTime.split('T').join(' ')
        return item
      })
      this.total = +data.totalCount
      this.totalPage = +data.totalPage
      console.log(data.totalCount)
    },
    async getJobDetails(id) {
      const { data } = await getJobDetails(id)
      this.currentData = data
      this.currentData.createType = this.currentData.createType ? '手动' : '自动'
      this.currentData.createTime = this.currentData.createTime.split('T').join(' ')
      console.log(data)
    },
    async getDetails({ taskId }) {
      await this.getJobDetails(taskId)
      this.dialogVisible = true
    },
    handleCurrentChange(val) {
      this.getOrderSearch()
    }

  }
}
</script>

<style lang="scss" scoped>
.status{
  .el-icon-warning{
  font-size: 35px;
  margin-right: 16px;
  margin-left: 22px;
  }
 > div{
  display: flex;
  align-items: center;
 }
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  margin-bottom: 25px;
  padding-right: 76px;
  background-color: hsla(0,0%,92.5%,.39)
}
.dialogFooter{
  display: flex;
  justify-content: center;
  align-items: center;
  .recreate{
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
  }

}
</style>
