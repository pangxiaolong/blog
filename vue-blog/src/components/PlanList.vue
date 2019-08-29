<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-s-promotion"></i>
        <span style="font-weight: bold">链接</span>
      </div>
      <el-collapse accordion value="2019">
        <el-collapse-item v-for="(item,value,key) in plan" :title="value" :name="value" :key="key">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in item"
              :key="index"
              :color="activity.state===1?'#0bbd87':''"
              :timestamp="activity.name"
            >{{activity.content}}</el-timeline-item>
          </el-timeline>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MyPlan",
  props: {
    plan: {
      type: Object,
      require: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="less">
.box-card {
  width: 220px;
  text-align: left;
  line-height: 25px;
  padding: 0 10px;
  /deep/.el-collapse-item__header {
    color: #606266;
    padding-left: 20px;
    font-weight: bold;
  }
  /deep/.el-card__header {
    border: 0;
  }
  /deep/.el-card__body {
    padding: 0;
  }
  /deep/.el-timeline{
    padding-left: 25px
  }
}
</style>
