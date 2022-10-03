<template>
  <el-card>
    <div class="header">
      <div class="title">销售数据
        <span class="sub-title">{{ star }}~{{ end }}</span>
      </div>
      <div ref="weekChange" class="week-month-year" @click="changeTime">
        <div class="ischeck bg">周</div>
        <div class="ischeck">月</div>
        <div class="ischeck">年</div>
      </div>
    </div>
    <el-row type="flex" justify="space-between" align="middle">
      <div id="left" style="width: 476px;height:278px;" />
      <div id="right" style="width: 476px;height:278px;" />
    </el-row>
  </el-card>
</template>

<script>
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import { amountCollect, regionCollect } from '@/api'
export default {
  data() {
    return {
      currTime: '周'
    }
  },
  computed: {
    star() {
      if (this.currTime === '周') {
        const date = new Date()
        if (date.getDay() === 0) {
          return dayjs().subtract(6, 'day').format('YYYY-MM-DD')
        }
        return dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
      } else if (this.currTime === '月') {
        return dayjs(new Date().setDate(1)).format('YYYY-MM-DD')
      }
      const date = new Date()
      date.setDate(1)
      date.setMonth(0)
      return dayjs(date).format('YYYY-MM-DD')
    },
    end() {
      return dayjs(new Date()).format('YYYY-MM-DD')
    }
  },
  mounted() {
    this.salesTrendChart()
    this.salesRelease()
  },
  methods: {
    async salesTrendChart() {
      // 绘制图表
      let index = 1
      if (this.currTime === '年') {
        index = 2
      }
      const { data } = await amountCollect(index, this.star, this.end)
      let asx = []
      if (this.currTime === '周') {
        const length = data.xAxis.length
        asx = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'].splice(0, length)
      } else {
        asx = data.xAxis
      }
      const serie = data.series.map(item => {
        item = item / 100
        item = item.toFixed(0)
        return item
      })
      const myChart = echarts.init(document.getElementById('left'))
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: asx
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: 80
        },
        series: [
          {
            data: serie,
            type: 'line',
            smooth: true,
            areaStyle: { // 区域填充渐变颜色
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#fec9c9' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            },
            itemStyle: {
              color: '#da4061' // 线的颜色以及头部显示的颜色
            }
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', myChart.resize)
    },
    async salesRelease() {
      const { data } = await regionCollect(this.star, this.end)
      console.log(data)
      const myChart = echarts.init(document.getElementById('right'))
      const option = {
        xAxis: {
          type: 'category',
          data: data.xAxis,
          axisLabel: {
            formatter: function(value) {
              if (value.length >= 4) {
                return `${value.slice(0, 3)}
...`
              }
              return value
            }
          }
          // data: data.xAxis
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function(value, index) {
              if (value >= 100) {
                value = value / 100
              }

              return value.toString().replace(/\d(?=(\d{3})+\b)/g, '$&,')
            }
          }
        },
        grid: {
          left: 70
        },
        series: [
          {
            data: data.series,
            type: 'bar',
            barWidth: 15,
            color: '#91b0ff'

          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', myChart.resize)
    },
    changeTime(e) {
      const weekRef = this.$refs.weekChange
      weekRef.querySelector('.bg')?.classList.remove('bg')
      e.target.classList.add('bg')
      this.currTime = e.target.innerText
      this.salesTrendChart()
      this.salesRelease()
    }
  }
}
</script>

<style>

</style>
<style lang="scss" scoped>
.sub-title{
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #999;
  }
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
  .header{
    display: flex;
  }
  .week-month-year{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 129px;
    height: 34px;
    background: rgba(233,243,255,.37);
    border-radius: 10px;
    .ischeck{

      border-radius: 7px;
      font-weight: 600;
      color: #333;
      width: 37px;
      height: 25px;
      font-size: 14px;
      color: #9ca3b4;
      cursor: pointer;
      text-align: center;
      line-height: 25px;
    }
    .bg{
      background: #fff;
      -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
      box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
    }
  }

</style>
