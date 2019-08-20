<template>
  <el-table
    ref="filterTable"
    :data="noteList"
    style="width: 100%;padding-top: 15px;"
  >
    <el-table-column
      type="index"
      width="50"
    />
    <el-table-column
      prop="title"
      label="标题"
    />
    <el-table-column
      prop="create_time"
      label="日期"
      sortable
      width="100"
      column-key="date"
    />
    <el-table-column
      prop="classify"
      label="标签"
      width="130"
    >
      <template slot-scope="scope">
        <el-tag>{{ scope.row.classifyName }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  getNote
} from '../../../api/api'
export default {
  name: 'HotTable',
  data() {
    return {
      noteList: []
    }
  },
  created() {
    this.getNote()
  },
  methods: {
    getNote() {
      const that = this
      that.listLoading = true
      getNote({ page: 0 })
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
    }
  }
}
</script>

<style scoped>

</style>
