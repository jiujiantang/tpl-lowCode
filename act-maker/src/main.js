// 入口文件
import Vue from 'vue'

// 导入 router.js 路由模块
import router from './router.js'
// 导入 store.js 状态管理模块
import store from './store.js'
// 导入 axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 导入 util.js 工具模块
import util from './util.js'
Vue.use(util)

// 按需导入全局组件
import colorPicker from './components/colorPicker.vue'
Vue.component('my-color-picker', colorPicker)
import animate from './components/animate.vue'
Vue.component('my-animate', animate)
import animateCss from 'animate.css' 
Vue.use(animateCss)
import $ from 'jquery'
import Element from 'element-ui'
Vue.use(Element, { size: 'small' })

// 导入字体
import './assets/font/font.css'

// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, // 挂载路由对象到 VM 实例上
  store // 挂载路由对象到 VM 实例上
})