<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons')
import resize from './mixins/resize'
import { groupNote } from '../../../api/api'

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
      noteGroup:null
    }
  },
	created(){
    this.getGroupNote()
	},
  mounted() {
    /*this.$nextTick(() => {
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
			let arr = []
			for (let v of this.noteGroup){
        arr.push(v.name)
			}
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: arr
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.noteGroup,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
