<template>
	<el-collapse accordion="true" value="2019">
		<el-collapse-item  v-for="(item,value,key) in plan" :title="value" :name="value">
			<el-timeline>
				<el-timeline-item
						v-for="(activity, index) in item"
						:key="index"
						:color="activity.state===1?'#0bbd87':''"
						:timestamp="activity.name">
					{{activity.content}}
				</el-timeline-item>
			</el-timeline>
		</el-collapse-item>
	</el-collapse>
</template>

<script>
  export default {
    name: 'MyPlan',
    props: {
      plan: {
        type: Object,
        require: true
      }
    },
    data() {
      return {

      }
    },
    methods: {}
  }
</script>

<style scoped>
	/deep/ .el-collapse-item__header {
		color: #606266;
		padding-left: 40px;
		font-weight: bold;
	}
</style>
