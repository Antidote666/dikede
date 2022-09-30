<template>
  <lin-form
    :form-labels="formLabel"
    :form-data="currentData"
    :inline="true"
    :visible="viewDetailsVisible"
    title="工单详情"
    @update:visible="$emit('update:viewDetailsVisible', $event)"
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
</template>

<script>
import LinForm from '@/components/TabelFormPage/Form'

export default {
  components: {
    LinForm
  },
  props: {
    viewDetailsVisible: {
      type: Boolean,
      default: false
    },
    currentData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 查看详情 数据
      formLabel: {
        innerCode: '设备编号：',
        createTime: '创建日期：',
        updateTime: '取消日期：',
        userName: '运营人员：',
        'taskType.typeName': '工单类型：',
        'details': '补货数量：',
        createType: '工单方式：',
        desc: '取消原因：'
      }
    }
  },
  methods: {
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
