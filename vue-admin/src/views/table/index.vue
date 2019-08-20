<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="noteList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.classifyName }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="访问量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.visited }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="danger" @click="delNote(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getNote,
  delNote
} from '../../api/api'
export default {
  data() {
    return {
      noteList: null,
      listLoading: true
    }
  },
  created() {
    this.getNote()
  },
  methods: {
    getNote() {
      const that = this
      that.listLoading = true
      getNote()
        .then(res => {
          if (res.code === 20000) {
            that.noteList = res.data
            that.listLoading = false
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
    delNote(id) {
      const that = this
      that.listLoading = true
      delNote({ id })
        .then(res => {
          if (res.code === 20000) {
            that.$message.success({
              message: '删除成功'
            })
            this.getNote()
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
  }
}
</script>
