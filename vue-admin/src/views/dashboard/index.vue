<template>
  <div class="dashboard-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <!--      <el-col :xs="24" :sm="24" :lg="8">-->
      <!--        <div class="chart-wrapper">-->
      <!--          <bar-chart />-->
      <!--        </div>-->
      <!--      </el-col>-->
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <hot-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <my-plan :plan="planList" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import HotTable from './components/HotTable'
import MyPlan from './components/MyPlan'
import { getPlanList } from '@/api/api'
export default {
  name: 'Dashboard',
  components: {
    GithubCorner,
    PanelGroup,
    RaddarChart,
    PieChart,
    HotTable,
    MyPlan
  },
  data() {
    return {
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
      },
      planList: {}
    }
  },
  created() {
    this.getPlan()
  },
  methods: {
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    },
    getPlan() {
      const that = this
      getPlanList().then(res => {
        if (res.code === 20000) {
          that.planList = res.data
        } else {
          that.$message.error({
            message: res.message
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.dashboard {
		&-container {
			position: relative;
			padding: 32px;
			background-color: rgb(240, 242, 245);
			.github-corner {
				position: absolute;
				top: 0;
				border: 0;
				right: 0;
			}
			.chart-wrapper {
				background: #fff;
				padding: 16px 16px 0;
				margin-bottom: 32px;
			}
		}

		&-text {
			font-size: 30px;
			line-height: 46px;
		}
	}
	@media (max-width:1024px) {
		.chart-wrapper {
			padding: 8px;
		}
	}
</style>
