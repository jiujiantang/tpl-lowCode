import Vue from 'vue'

let util = {} 
util.install = function (Vue, options) {
    Vue.prototype.$util = {
        path : function(respath, path) {
            // 兼容 花儿 图片上传
            if( path.indexOf("http") != -1 ){
                return path
            }else {
                return respath + path
            }
        },
        toIphoneX : function (num){
            return num * (375/750) + "px"
        },
        than : function (a, b) {
           if(Number(a) > Number(b)) {
               return true
           }else {
               return false
           }
        },
        thanStstus : function (a, b) {
            if(typeof(a) == "undefined"){
                return true
            }else {
                if( Number(a) == Number(b) ){
                    return true
                }else {
                    return false
                }
            }
        },
        /**
         * 测试 B!
         * @param {vm实例} context 
         */
        test_modifyResPath : function(context) {
            context.$store.commit("modifyResPath", ("./src/assets" + context.$route.path + "/") );// http://newgametest.weijuju.com/res/moxiu/Template/admin/static
        },
        test_uploadSuccess : function(context, res) {
            if(res.ret == 0 ) {
                alert("图片上传成功！点击'确定'可以在左边预览哦~")
                context[ context.currControl ][ "path" + context.upControlId ] = res.model.AbsPath
            }else {
                alert(res.msg)
            }
        },
        test_save : function (context) {
            alert("活动保存成功！")
            console.log(JSON.stringify(context.$store.state.originalJson))
        }
    }
} 

export default util
