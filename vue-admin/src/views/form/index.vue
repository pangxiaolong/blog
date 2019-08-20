<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" placeholder="请输入文章标题" />
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="form.classify_id" placeholder="请选择分类">
          <el-option v-for="(item,key) in classifyList" :key="key" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity form">
        <markdown-editor v-model="form.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getClassify,
  addNote
} from '../../api/api'
import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  components: {
    MarkdownEditor
  },
  data() {
    return {
      classifyList: null,
      form: {
        title: '',
        classify_id: '',
        content: ''
      }
    }
  },
  methods: {
    getClassify() {
      const that = this
      getClassify()
        .then(res => {
          if (res.code === 20000) {
            that.classifyList = res.data
          } else {
            that.$message.error({
              message: res.message,
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit() {
      const that = this
      addNote(that.form)
        .then(res => {
          if (res.code === 20000) {
            that.$message.success({
              message: '发布成功'
            })
          } else {
            that.$message.error({
              message: res.message
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
	created() {
    this.getClassify()
  }
}
</script>

<style scoped>
	.line {
		text-align: center;
	}
</style>

