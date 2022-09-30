<template>
  <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    style="width: 100%;"
    size="medium"
  >
    <el-table-column
      v-if="isIndexShow"
      label="序号"
      type="index"
      :index="indexMethod"
      width="80px"
    />
    <el-table-column
      v-for="(value,item,index) in labels"
      :key="index"
      :property="item"
      :label="value"
    >
      <template slot-scope="{row}">
        <slot :name="item" :scope="row">{{ label(row,item) }}</slot>
      </template>
    </el-table-column>

    <el-table-column
      v-if="isoperationShow"
      :label="operationName"
      :width="operationWidth"
    >
      <template slot-scope="{row}">
        <slot name="operation" :scope="row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    labels: {
      type: Object,
      required: true
    },
    currentPage: {
      type: Number,
      default: 0
    },
    operationWidth: {
      type: String,
      default: '100px'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    isIndexShow: {
      type: Boolean,
      default: true
    },
    isoperationShow: {
      type: Boolean,
      default: true
    },
    operationName: {
      type: String,
      default: '操作'
    }
  },
  computed: {
    label() {
      return (row, item) => {
        if (item.includes('.')) {
          const keys = item.split('.')
          return keys.reduce((pre, cur, index) => pre[cur], row)
        } else {
          return row[item]
        }
      }
    },
    indexMethod() {
      return (index) => (this.currentPage - 1) * this.pageSize + index + 1
    }
  }
}
</script>

<style lang="scss">
.el-table thead {
  color: #666;
  font-weight: 500;
}
.el-table td, .el-table th.is-leaf{
  border-bottom: none;
}
.has-gutter tr th{
  line-height: 1.15;
  padding: 10px 0px 9px;
  background: rgb(243, 246, 251);
}
.el-table .cell{
  color: rgb(102, 102, 102) !important;
  font-weight: 500;
}
</style>
