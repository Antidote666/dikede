<template>
  <div>
    <lin-form
      ref="addFormRef"
      title="新增工单"
      :form-labels="newWorkLabel"
      :form-data="newWorkLabelFormData"
      :visible="newlyBuildVisible"
      :rules="rules"
      @update:visible="$emit('update:newlyBuildVisible', $event)"
      @confirm="submitCreate"
    >
      >
      <template #innerCode>
        <el-input
          v-model.trim="newWorkLabelFormData.innerCode"
          maxlength="15"
          show-word-limit
          placeholder="请输入"
        />
      </template>
      <template #productType>
        <el-select v-model="newWorkLabelFormData.productType" placeholder="请选择">
          <el-option label="补货工单" value="2" />
        </el-select>
      </template>
      <template #details>
        <div class="details" @click="getDetailsOfVendingMachineAisle"><span class="el-icon-tickets" /><span>补货清单</span></div>
      </template>
      <template #assignorId>
        <el-select v-model="newWorkLabelFormData.assignorId" placeholder="请选择">
          <el-option v-for="(option,index) in listOperators" :key="index" :label="option.userName" :value="option.userId" />
        </el-select>
      </template>
      <template #desc>
        <el-input
          v-model="newWorkLabelFormData.desc"
          type="textarea"
          placeholder="请输入备注(不超过40字)"
          maxlength="40"
          show-word-limit
        />
      </template>
    </lin-form>

    <lin-form :visible.sync="replenishmentVisible" title="补货详情" @confirm="onConfirm">
      <template #dialogBody>
        <div class="replenishmentVisible">
          <lin-table
            :table-data="replenishments"
            :labels="replenishmentLabels"
            :is-index-show="false"
            operation-width="200px"
            operation-name="补满能量"
          >
            <template #operation="{scope}">
              <!-- <div v-if="scope.maxCapacity!=='-'">1</div> -->
              <div v-if="scope.maxCapacity!=='-'">
                <span class="input-up"><i class="el-icon-arrow-up" /></span>
                <span class="input-down"><i class="el-icon-arrow-down" /></span>
                <el-input v-model="scope.expectCapacity" class="inputNum" />
              </div>

            </template>
          </lin-table>
        </div>
      </template>
    </lin-form>
  </div>
</template>

<script>
import LinForm from '@/components/TabelFormPage/Form'
import LinTable from '@/components/TabelFormPage/Table'
import {
  getVendingListOperators, getDetailsOfVendingMachineAisle,
  createAJob } from '@/api'
export default {
  components: {
    LinForm,
    LinTable
  },
  props: {
    newlyBuildVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newWorkLabelFormData: {
        createType: 1,
        innerCode: '',
        productType: '',
        details: [],
        userId: this.$store.getters.userId,
        assignorId: '',
        desc: ''
      },
      newWorkLabel: {
        innerCode: '设备编号：',
        productType: '工单类型：',
        details: '补货数量：',
        assignorId: '运营人员：',
        desc: '备注：'
      },
      rules: {
        innerCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        productType: [{ required: true, message: '请输入', trigger: 'blur' }],
        details: [{ required: true, message: '请输入', trigger: 'blur' }],
        assignorId: [{ required: true, message: '请输入', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      listOperators: [],
      replenishmentVisible: false,
      replenishments: [],
      replenishmentLabels: {
        channelCode: '货道编号',
        'sku.brandName': '商品名称',
        currentCapacity: '当前数量',
        maxCapacity: '还可添加'
        // expectCapacity: '补满数量'
      }
    }
  },
  watch: {
    'newWorkLabelFormData.innerCode': {
      handler(val) {
        if (val.trim() !== '') {
          this.getVendingListOperators(val)
        }
      }
    }
  },
  methods: {
    async getVendingListOperators(id) {
      const { data } = await getVendingListOperators(id)
      this.listOperators = data
    },
    getDetailsOfVendingMachineAisle() {
      try {
        this.$refs.addFormRef.$refs.formRef.validateField('innerCode', async(innerCodeValid) => {
          if (innerCodeValid !== '') return
          const { data } = await getDetailsOfVendingMachineAisle(this.newWorkLabelFormData.innerCode)
          data.forEach(item => {
            if (item.sku === null) {
              item.sku = {}
              item.sku.brandName = '-'
              item.currentCapacity = '-'
              item.maxCapacity = '-'
            }
          })
          this.replenishments = data
          this.replenishmentVisible = true
        })
      } catch (error) {
        console.log(error)
      }
    },
    onConfirm() {
      this.replenishments.forEach(item => {
        if (item.currentCapacity !== '-') {
          this.newWorkLabelFormData.details.push({
            channelCode: item.channelCode,
            expectCapacity: item.expectCapacity,
            skuId: item.sku.skuId,
            skuImage: item.sku.skuImage,
            skuName: item.sku.skuName
          })
        }
      })
    },
    async submitCreate() {
      try {
        await createAJob(this.newWorkLabelFormData)
        this.$parent.getOrderSearch()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .replenishmentVisible{
   height: 330px;
   overflow: overlay;
   &::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: hsla(0,0%,40%,.3);
    border-radius: 10px;
  }
  }
  .el-input__inner{
      padding-left: 15px;
  }
  .input-up,.input-down{
    position: absolute;
    z-index: 1;
    width: 40px;
    height: auto;
    text-align: center;
    background: #f8fafd;
    color: #606266;
    cursor: pointer;
    font-size: 13px;
    right: 11px;
    top: auto;
    left: auto;
    border-right: none;
    border-left: 1px solid #d8dde3;
    border-radius: 0 0 4px 0;
  }
  .input-up{
    border-top: 1px solid #d8dde3;
  }
  .input-down{
    bottom: 10px;
    border-bottom: 1px solid #d8dde3;
  }

</style>
