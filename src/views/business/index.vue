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

  </div>
</template>

<script>
import LinTabel from '@/components/TabelFormPage/Table'
import LinPage from '@/components/TabelFormPage/Page'
import { getOrderSearch } from '@/api'
export default {
  components: {
    LinPage,
    LinTabel
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
      }
      // operation: '操作'
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
    getDetails(scoped) {
      console.log(scoped)
    },
    handleCurrentChange(val) {
      this.getOrderSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
.result{
  padding: 20px 15px 19px 17px;
    background-color: #fff;
}
.dashboard {
  &-container {
    margin: 20px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.details{
  color: #5f84ff;
}
</style>
