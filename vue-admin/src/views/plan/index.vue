<template>
	<div class="app-container" style="display: flex;justify-content: space-around">
		<div style="width: 48%">
			<el-card class="box-card" header="添加计划">
				<div style="margin-top: 20px">
					<el-select v-model="year" placeholder="请选择年份" size="small">
						<el-option
								v-for="item in options"
								:key="item"
								:label="item"
								:value="item"
						/>
					</el-select>
					<el-input v-model="title" placeholder="计划内容" size="small"/>
					<el-button type="primary" size="small" @click="createPlan">添加计划</el-button>
				</div>
			</el-card>
		</div>
		<div style="width: 48%">
			<el-card class="box-card" header="计划编辑">
				<el-collapse accordion="true" value="2019">
					<el-collapse-item v-for="(item,value,key) in planList" :title="value" :name="value">
						<el-timeline>
							<el-timeline-item
									v-for="(activity, index) in item"
									:key="index"
									:color="activity.state===1?'#0bbd87':''"
									:timestamp="activity.create_time"
							>
								<el-input v-model="activity.name" placeholder="请输入内容" size="mini"
													@blur="changePlanState(activity.id,activity.name)"/>
								<el-switch
										v-model="!!activity.state"
										active-color="#13ce66"
										inactive-color="#ff4949"
										@change="changePlanState(activity.id,activity.state)"
								/>
								<el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deletePlan(activity.id)"/>
							</el-timeline-item>
						</el-timeline>
					</el-collapse-item>
				</el-collapse>
			</el-card>
		</div>
	</div>
</template>

<script>
  import { getPlanList, addPlan, editPlan, deletePlan } from '../../api/api'

  export default {
    name: 'Index',
    data() {
      return {
        options: [],
        year: null,
        title: '',
        planList: {},
        activities: []
      }
    },
    created() {
      this.getYearList()
      this.getPlan()
    },
    methods: {
      getYearList() {
        let date = new Date().getFullYear() - 2
        for (const i of [1, 1, 1, 1]) {
          this.options.push(date++)
        }
        this.year = this.options[0]
      },
      createPlan() {
        const that = this
        if (that.title) {
          addPlan({
            name: that.title,
            year: that.year
          }).then(res => {
            if (res.code === 20000) {
              that.$message({
                message: '添加成功',
                type: 'success'
              })
              that.getPlan()
            } else {
              that.$message({
                message: '添加失败',
                type: 'error'
              })
            }
          }).catch(err => {
            reject(err)
          })
        } else {
          that.$message({
            message: '计划不能为空',
            type: 'error'
          })
        }
      },
      changePlanState(id, value) {
        const that = this
        const info = { id }
        if (typeof value === 'number') {
          info.state = value ? 0 : 1
        } else {
          info.name = value
        }
        editPlan(info).then(res => {
          if (res.code === 20000) {
            that.$message({
              message: '修改成功',
              type: 'success'
            })
            that.getPlan()
          } else {
            that.$message({
              message: '修改失败',
              type: 'error'
            })
          }
        }).catch(err => {
          reject(err)
        })
      },
      deletePlan(id) {
        const that = this
        deletePlan({ id }).then(res => {
          if (res.code === 20000) {
            that.$message({
              message: '删除成功',
              type: 'success'
            })
            that.getPlan()
          } else {
            that.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        }).catch(err => {
          reject(err)
        })
      },
      getPlan() {
        getPlanList().then(res => {
          if (res.code === 20000) {
            this.planList = res.data
          }
        }).catch(err => {
          reject(err)
        })
      }
    }
  }
</script>

<style scoped>
	.el-input {
		width: auto;
	}

	/deep/ .el-timeline-item__wrapper {
		top: 0;
	}
</style>
