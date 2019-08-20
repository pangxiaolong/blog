<template>
  <div class="blog-container">
    <div class="blog-tabbar">
      <span :style="{ color: sort === 1 ? '#409EFF' : '' }" @click="changeSort(2)"
        ><i class="el-icon-time"></i> 最新</span
      >
      <span :style="{ color: sort === 2 ? '#409EFF' : '' }" @click="changeSort(1)"
        ><i class="el-icon-data-line"></i> 最热</span
      >
    </div>
    <el-collapse-transition>
      <div v-if="blogList.length > 0" class="blog-list">
        <div
          v-for="(item, key) in blogList"
          :key="key"
          class="blog-list-item"
          @click="toDetail(item)"
        >
          <div class="blog-item-info">
            <div class="blog-item-title">{{ item.title }}</div>
            <div class="blog-item-span">
              <el-tag>{{ item.classifyName }}</el-tag>
              <span><i class="el-icon-user" /> 龙小胖</span>
              <span><i class="el-icon-news" /> {{ item.visited }}</span>
              <span><i class="el-icon-chat-square" /> {{ item.comment }}</span>
              <span><i class="el-icon-time" /> {{ item.create_time }}</span>
            </div>
          </div>
          <img
            src="http://wx1.sinaimg.cn/thumb300/6c1fdce6ly1g5yc8ap31oj20qo0k0755.jpg"
            alt=""
          />
        </div>
      </div>
    </el-collapse-transition>
    <el-pagination
      style="margin-top: 30px"
      background
      :current-page.sync="current"
      layout="prev, pager, next"
      @current-change="changePage"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getNote } from '../api/api'
export default {
  name: 'BlogList',
  data () {
    return {
      blogList: [],
      current: 1,
      sort: 1,
      total: 0
    }
  },
  created () {
    this.getBlog(0)
  },
  methods: {
    getBlog (num) {
      let info = {
        page: num,
        sort: this.sort
      }
      getNote(info).then(res => {
        this.blogList = res.data.list
        this.total = res.data.total
      })
    },
    changeSort (num) {
      this.sort = num === 1 ? 2 : 1
      this.getBlog(0)
      this.current = 1
    },
    changePage (page) {
      this.getBlog(page - 1)
    },
    toDetail (item) {
      this.$router.push({ path: '/blogDetail', query: { item } })
    }
  }
}
</script>

<style scoped lang="less">
.blog-container {
  width: 750px;
  margin: 20px 0 !important;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .blog-tabbar {
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #e6e6e6;
    span {
      margin: 10px;
      padding-right: 20px;
      line-height: 30px;
      font-size: 14px;
      cursor: pointer;
    }
    span:hover {
      color: #409eff;
    }
    span:first-child {
      border-right: 1px solid #e6e6e6;
    }
  }
  .blog-list {
    .blog-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 30px;
      border-bottom: 1px solid #eeeeee;
      cursor: pointer;
      &:hover {
        background: #f7f7f7;
      }
      .blog-item-info {
        padding-top: 10px;
        .blog-item-title {
          font-weight: bold;
          text-align: left;
          width: 600px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .blog-item-span {
          padding-top: 15px;
          text-align: left;
          .el-tag {
            height: 20px;
            line-height: 18px;
            font-size: 12px;
            border-radius: 10px;
            color: #409eff;
          }
          span {
            margin-right: 30px;
            font-size: 12px;
            color: darkgray;
          }
        }
      }
      img {
        width: 75px;
        height: 75px;
        border-radius: 5px;
      }
    }
  }
}
</style>
