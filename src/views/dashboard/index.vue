<template>
  <div class="dashboard-container">
    <el-row type="flex" justify="space-between" :gutter="20">
      <el-col :span="18">
        <el-row type="flex" justify="space-between" align="middle" :gutter="20">
          <el-col :span="12">
            <div class="bg1 home-user-task box">
              <el-row>
                <el-col>
                  <span class="title">工单统计</span>
                  <span class="sub-title">{{ star }}-{{ end }}</span>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between" align="middle" style="flex: 1;">
                <el-col :span="6">
                  <div class="flex-clunm">
                    <div class="num">{{ workObj('total') }}</div>
                    <div class="text">工单总数(个)</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="flex-clunm">
                    <div class="num"> {{ workObj('completedTotal') }}</div>
                    <div class="text">完成工单(个)</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="flex-clunm">
                    <div class="num">{{ workObj('progressTotal') }}</div>
                    <div class="text">就行工单(个)</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="flex-clunm">
                    <div class="num">{{ workObj('total') }}</div>
                    <div class="text">取消工单(个)</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="bg2 home-user-task box">
              <el-row>
                <el-col>
                  <span class="title">销售统计</span>
                  <span class="sub-title">{{ star }}-{{ end }}</span>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-around" align="middle" style="flex: 1;">
                <el-col :span="8">
                  <div class="flex-clunm">
                    <div class="num">{{ salesTotal }}</div>
                    <div class="text">订单量(个)</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="flex-clunm">
                    <div class="num"> {{ salesIncom }}</div>
                    <div class="text">销售额(万元)</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <sale-eacharts class="sale-echarts" />
      </el-col>
      <el-col :span="6">
        <div class="box bg3 sku-sale-rank">
          <div class="header">
            <div class="title">
              商品热榜
              <span class="sub-title">{{ star }}~{{ end }}</span>
            </div>
          </div>
          <div class="body">
            <el-row v-for="(item,index) in salesTop" :key="index">
              <el-col :span="5">
                <div :class="['top','top'+(index+1)]">{{ index+1 }}</div>
              </el-col>
              <el-col :span="13" class="sku-name">{{ item.skuName }}</el-col>
              <el-col :span="6" class="count">{{ item.count }}单</el-col>
            </el-row>
          </div></div>
      </el-col>
    </el-row>
    <number-partners />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import SaleEacharts from './components/sale-eacharts.vue'
import NumberPartners from './components/number-partners.vue'
import { getSummaryInformation, getSkuTop, getSales, getIncome } from '@/api'
export default {
  name: 'Dashboard',
  components: {
    SaleEacharts,
    NumberPartners
  },
  data() {
    return {
      workOrder: [],
      salesTop: [],
      salesTotal: '',
      salesIncom: ''
    }
  },
  computed: {
    workObj() {
      return (str) => {
        return this.workOrder.reduce((pre, cur) => (pre += cur[str]), 0)
      }
    }
  },
  async created() {
    await this.getSummaryInformation()
    await this.getSkuTop()
    await this.getSales()
  },
  methods: {
    async getSummaryInformation() {
      this.star = dayjs(new Date().setDate(1)).format('YYYY-MM-DD')
      this.end = dayjs(new Date()).format('YYYY-MM-DD')
      const { data } = await getSummaryInformation(this.star + '%2000:00:00', this.end + '%2023:59:59')
      this.workOrder = data
    },
    async getSkuTop() {
      const { data } = await getSkuTop(10, this.star, this.end)
      this.salesTop = data
    },
    async getSales() {
      const { data } = await getSales(this.star + ' 00:00:00', this.end + ' 23:59:59')
      this.salesTotal = data
      const income = await getIncome(this.star + ' 00:00:00', this.end + ' 23:59:59')
      this.salesIncom = Number(income.data / 1000000).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.bg1{
    background: #e9f3ff;
    background-image: url('~@/assets/common/echart-bg.png'),url('~@/assets/common/echart-bg2.png');
    background-repeat: no-repeat,no-repeat;
    background-position: 0 0,calc(100% - 12px) 100%;

}
.bg2{
    background:#fbefe8  url('~@/assets/common/echart-bg1.png') no-repeat calc(100% - 12px) 100%;

    .num{
    color: #ff5757 !important;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    line-height: 50px;
    text-shadow: 2px 4px 7px rgb(255 99 85 / 50%) !important;
  }
  .text{
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #de9690 !important;
    line-height: 17px;
  }

    // background-repeat: no-repeat,no-repeat;
    // background-position: 0 0,calc(100% - 12px) 100%;
}
.home-user-task{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: calc(20vh - 24px);
  min-height: 166px;
  border-radius: 20px;
}
.box{
  padding: 20px;
  display: flex;
  flex-direction: column;
  .title{
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #333;
    }
  .sub-title{
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #999;
  }
  .num{
    color: #072074;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    line-height: 50px;
    text-shadow: 2px 4px 7px rgb(85 132 255 / 50%)
  }
  .flex-clunm{
    display: flex;
    flex-direction: column;
  }
  .text{
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #91a7dc;
    line-height: 17px;
  }
}
.sku-sale-rank{
  flex-direction: column;
    height: calc(60vh - 72px);
    min-height: 538px;
    background: #fff;
    border-radius: 20px;
  .top{
    display: inline-block;
    width: 16px;
    height: 20px;
    margin-left: 10px;
    background: url('~@/assets/smallicon/bg.png');
    text-align: center;
    font-size: 12px;
    font-family: zihun143-zhengkuchaojihei,zihun143;
    font-weight: 400;
    color: #e9b499;
    line-height: 14px;
  }
  .top1{
    width: 21px;
    height: 20px;
    background: url('~@/assets/smallicon/champion.png');
    color: #8e5900;
  }
  .top2{
    width: 21px;
    height: 20px;
    background: url('~@/assets/smallicon/runnerup.png');
    color: #8e5900;
  }
  .top3{
    width: 21px;
    height: 20px;
    background: url('~@/assets/smallicon/thirdplace.png');
    color: #8e5900;
  }
  .body{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    .sku-name{
      height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: #333;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    }
    .count{
      height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #737589;
    line-height: 20px;
    text-align: right;
    }
  }

}
.sale-echarts{
    margin-top: 20px;
    height: calc(40vh - 68px);
    min-height: 352px;
    background: #fff;
    border-radius: 20px;
  }
</style>
