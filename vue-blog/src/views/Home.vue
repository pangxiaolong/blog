<template>
  <div>
    <div class="menu-container">
      <el-menu
        :default-active="activeIndex"
        text-color="#303133"
        class="el-menu-demo"
        mode="horizontal"
        @select="menuSelect"
      >
        <el-menu-item index="1">
          <i class="el-icon-tickets"></i>
          <span slot="title">文章</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-user"></i>
          <span slot="title">关于</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-link"></i>
          <span slot="title"
            ><a href="https://github.com/pangxiaolong" target="_blank">源码</a>
          </span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content-container">
      <transition name="el-zoom-in-top">
        <div v-show="activeIndex == 1">
          <div class="content-left">
            <blog-list></blog-list>
          </div>
          <div class="content-right">
            <card-list></card-list>
          </div>
        </div>
      </transition>
      <transition name="el-zoom-in-top">
        <div v-show="activeIndex == 2">
          <about-me></about-me>
        </div>
      </transition>
    </div>
    <router-view />
    <footer class="footer-inner">
      <p>Copyright© Author龙小胖 xiaolong.pang@vip.163.com</p>
      <p>
        <a href="https://github.com/pangxiaolong" target="_blank">GitHub</a
        >&nbsp;&nbsp;&nbsp;&nbsp;<a
          href="https://me.csdn.net/weixin_42275932"
          target="_blank"
          >CSDN</a
        >
      </p>
    </footer>
  </div>
</template>

<script>
import BlogList from '../components/BlogList.vue'
import CardList from '../components/CardList.vue'
import AboutMe from '../components/AboutMe.vue'
export default {
  name: 'Home',
  components: {
    BlogList,
    CardList,
    AboutMe
  },
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    menuSelect (index) {
      // eslint-disable-next-line no-unused-expressions
      index !== '3' ? (this.activeIndex = index) : null
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .el-menu.el-menu--horizontal {
  max-width: 1000px;
  margin: 0 auto;
  border-bottom: 0;
}

/deep/ .el-menu--horizontal > .el-menu-item.is-active {
  color: #409eff !important;
}

/deep/ .el-menu-item:focus,
.el-menu-item:hover {
  color: #409eff !important;
}

.menu-container {
  border-bottom: solid 1px #e6e6e6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.content-container {
  overflow: hidden;
  padding-bottom: 50px;
  background: #f7f7f7;
  div:first-child {
    height: 1200px;
    max-width: 1000px;
    margin: 0 auto;
  }
  .content-left {
    float: left;
    max-width: 700px !important;
  }
  .content-right {
    float: right;
    max-width: 300px !important;
    padding-top: 20px;
  }
}
.footer-inner {
  padding: 0.853333rem 0.426667rem;
  text-align: center;
  font-size: 12px;
  color: #fff;
  background: #262626;
  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
