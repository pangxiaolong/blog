<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { groupNote } from '../../../api/api'
const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      noteGroup: null
    }
  },
  created() {
    this.getGroupNote()
  },
  mounted() {
    /* this.$nextTick(() => {
      this.initChart()
    })*/
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getGroupNote() {
      const that = this
      groupNote().then(res => {
        if (res.code === 20000) {
          that.noteGroup = res.data
          that.$nextTick(() => {
            that.initChart()
          })
        } else {
          that.$message.error({
            message: res.message
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      const arr = []
      const valueArr = []
      this.noteGroup.forEach((v, i) => {
        arr[i] = {
          name: v.name,
          max: 10
        }
        valueArr.push(v.value)
      })
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: arr
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: valueArr
            }
          ],
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
