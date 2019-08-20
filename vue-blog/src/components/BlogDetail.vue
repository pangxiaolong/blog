<template>
  <div class="blog-detail">
    <el-page-header @back="goBack" content="文章详情">
    </el-page-header>
    <h1>{{blog.title}}</h1>
    <div class="blog-detail-info">
      <span>分类：{{blog.classifyName}}</span>
      <span>访问数：{{blog.visited}}</span>
      <span>发布时间：{{blog.create_time}}</span>
    </div>
    <mavon-editor
      :value="blog.content"
      :subfield="propPreview.subfield"
      :defaultOpen="propPreview.defaultOpen"
      :toolbarsFlag="propPreview.toolbarsFlag"
      :editable="propPreview.editable"
      :scrollStyle="propPreview.scrollStyle"
    />
  </div>
</template>

<script>
export default {
  name: 'BlogDetail',
  data () {
    return {
      blog: null
    }
  },
  created () {
    this.blog = this.$route.query.item
  },
  computed: {
    propPreview () {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return data
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.blog-detail {
  padding: 25px 200px;
  .blog-detail-info{
    padding-bottom: 30px;
    color: #8d8f94;
    font-size: 13px;
    span{
      padding: 0 10px;
    }
  }
  .v-note-wrapper .v-note-panel.shadow{
    padding: 15px;
  }
}
</style>
