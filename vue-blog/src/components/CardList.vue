<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-s-promotion"></i>
        <span style="font-weight: bold"> 链接</span>
      </div>
      <div v-for="o in linkList" :key="o">
        <el-link type="info" :href="o.url" target="_blank">{{o.title}}</el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CardList',
  data () {
    return {
      linkList: [
        {
          title: '掘金',
          url: 'https://juejin.im/user/59e63038f265da43283fef1d'
        },
        {
          title: 'CSDN',
          url: 'https://me.csdn.net/weixin_42275932'
        },
        {
          title: 'GiHub',
          url: 'https://github.com/pangxiaolong'
        },
        {
          title: 'Resume',
          url: 'http://pcs.baidu.com/rest/2.0/pcs/file?method=download&path=%2F%E9%80%84%E6%99%93%E9%BE%99%E5%89%8D%E7%AB%AF%E7%AE%80%E5%8E%86.pdf&random=0.2831764530915082&app_id=498065'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.box-card{
  width: 220px;
  text-align: left;
  line-height: 25px;
  padding: 0 10px;
  /deep/.el-card__header{
    padding: 15px 20px;
    line-height:normal;
  }
  /deep/.el-divider__text, .el-link{
    font-size: 13px;
  }
}
</style>
