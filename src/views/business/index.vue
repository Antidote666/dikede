<template>
  <div class="dashboard-container">
    <el-card class="result">
      <el-row type="flex" class="operation">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="showNewlyBuild">新建</el-button>
        <el-button type="primary">工单配置</el-button>
      </el-row>

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

    <!-- 查看详情 -->
    <order-details
      :view-details-visible="viewDetailsVisible"
      :current-data="currentData"
      @update:viewDetailsVisible="viewDetailsVisible=$event"
    />

    <!-- 新建工单 -->
    <order-add :newly-build-visible="newlyBuildVisible" @update:newlyBuildVisible="newlyBuildVisible=$event" />
  </div>
</template>

<script>
import LinTabel from '@/components/TabelFormPage/Table'
import LinPage from '@/components/TabelFormPage/Page'
import OrderDetails from './components/order-details.vue'
import OrderAdd from './components/order-add.vue'
import { getOrderSearch, getJobDetails } from '@/api'
export default {
  components: {
    LinPage,
    LinTabel,
    OrderDetails,
    OrderAdd
  },
  data() {
    return {
      // table 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      totalPage: 0,
      // table 数据
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

      viewDetailsVisible: false,
      currentData: {},
      // 新增 数据
      newlyBuildVisible: false
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
      this.viewDetailsVisible = true
    },
    handleCurrentChange(val) {
      this.getOrderSearch()
    },
    showNewlyBuild() {
      this.newlyBuildVisible = true
    }

  }
}
</script>

<style lang="scss" scoped>

.operation{
  margin-bottom: 20px;
  .el-button{
    border: none;
  }
  .el-button:nth-child(1){
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
  }
  .el-button:nth-child(2){
  margin-left: 10px;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
  }
}
</style>
