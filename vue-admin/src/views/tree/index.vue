<template>
  <div class="app-container">
    <div class="add-sort-container">
      <el-input v-model="sortName" size="small" placeholder="请输入分类名称" clearable />
      <el-button type="primary" size="small" @click="createClassify">添加</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-table :data="tableData" style="width:60%">
        <el-table-column label="分类名称" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图例" width="200">
          <template slot-scope="scope">
            <img v-if="scope.row.img" style="width: 60px;height: 60px" :src="scope.row.img" alt>
            <el-upload
              v-else
              class="avatar-uploader"
              action="http://127.0.0.1:7001/uploadImg"
              :data="scope.row.id"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.state===1"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="editClassify(scope.row.id,null,scope.row.state)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editClassify(scope.row.id,true)">添加图例</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  addClassify,
  getClassify,
  deleteClassify,
  editClassify
} from '../../api/api'

export default {
  data() {
    return {
      sortName: null,
      imageUrl: null,
      tableData: null
    }
  },
  watch: {},
  created() {
    this.getClassify()
  },
  methods: {
    createClassify() {
      const that = this
      if (that.sortName) {
        addClassify({ name: that.sortName })
          .then(res => {
            if (res.code === 20000) {
              that.$message.success({
                message: '添加成功',
                type: 'success'
              })
              that.getClassify()
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
      } else {
        that.$message.error({
          message: '分类名称不能为空',
          type: 'error'
        })
      }
    },
    getClassify() {
      const that = this
      getClassify()
        .then(res => {
          if (res.code === 20000) {
            that.tableData = res.data
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
    editClassify(id, img, state) {
      const that = this
      const form = { id }
      img ? form.img = that.imageUrl : null
      if (state !== undefined) {
        form.state = state ? 0 : 1
      }
      editClassify(form)
        .then(res => {
          if (res.code === 20000) {
            that.$message.success({
              message: '修改成功',
              type: 'success'
            })
            that.imageUrl = null
            that.getClassify()
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
    handleDelete(id) {
      const that = this
      deleteClassify({ id })
        .then(res => {
          if (res.code === 20000) {
            that.$message.success({
              message: '删除成功',
              type: 'success'
            })
            that.getClassify()
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
    handleAvatarSuccess(res) {
      this.imageUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped lang="scss">
	.el-input {
		width: auto;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 60px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		border: 1px dashed #b6bdc6;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
