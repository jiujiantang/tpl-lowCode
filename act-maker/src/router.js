import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 1.3 导入对应的路由组件
import filmGuideContainer from './components/template/filmGuide.vue'
import starContainer from './components/template/star.vue'

// 1.4 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    { path: '/', redirect: '/star' },
    { path: '/star', component: starContainer },
    { path: '/filmGuide', component: filmGuideContainer }
  ]
})

// 把路由对象暴露出去
export default router