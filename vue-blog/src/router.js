import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BlogDetail from './components/BlogDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blogDetail',
      name: 'blogDetail',
      component: BlogDetail
    }
  ]
})
