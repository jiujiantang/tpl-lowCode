import Vue from 'vue'
// 1.1 导入vuex的包
import Vuex from 'vuex'
// 1.2 安装vuex
Vue.use(Vuex)

// 创建状态管理对象
var store = new Vuex.Store({
    state: {
        // 初始化json数据源
        staticJson:[],
        originalJson: [],
        resPath: "mobile/",
        status: true,//true为可编辑
    }, 
    mutations: {
        modifyStaticJson(state, arr){
            state.staticJson = arr;
        },
        modifyOriginalJson(state, arr){
            state.originalJson = arr;
        },
        modifyResPath(state, res){
            state.resPath = res;
        },
        modifyStatus(state, status){
            state.status = status;
        }
    }
})

export default store