<template>
  <div id="machine">
    <div class="my-centerContainer">
        <div class="my-showWrapper">
            <div class="my-phoneMain tc">
                <div class="my-screen mt60">
                    <div class="my-toolBar" @click.stop></div>
                    <!-- my-fixedtemplate: 静态模板 -->
                    <div class="v-show my-showScreen my-fixedtemplate">
                      <!-- 蒙层 B! -->
                      <div class="mask"></div>
                      <div class="h5Bg">
                        <!-- 头图 B! -->
                        <div class="title-div editTarget" data-type="BG_IMG" data-index="0" data-name="titleBg">
                          <img class="title-bg" :src="$util.path( $store.state.resPath, $store.state.originalJson[0].titleBg.src.path)" >
                        </div>
                        <!-- 副标题 B! -->
                        <div class="subTitleBg editTarget" data-type="BG_IMG" 
                          :data-index="$store.state.originalJson[0].subTitleBg.index"
                          :data-name="$store.state.originalJson[0].subTitleBg.name"
                          :style="{backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].subTitleBg.src.path ) +')'}"
                        > </div>
                        <textEdit :index="0" :name="$store.state.originalJson[0].subTitle.name" 
                         :contentId="0" :content="$store.state.originalJson[0].subTitle.content0" 
                         :textStyle="$store.state.originalJson[0].subTitle.custom.style">
                        </textEdit>
                        <!-- 领导寄语 B! -->
                        <div class="ldjyBg editTarget" data-type="BG_IMG" 
                          :data-index="$store.state.originalJson[0].ldjyBg.index"
                          :data-name="$store.state.originalJson[0].ldjyBg.name"
                          :style="{backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].ldjyBg.src.path ) +')'}"
                        > </div>
                        <textEdit :index="0" :name="$store.state.originalJson[0].Leader.name" 
                         :contentId="0" :content="$store.state.originalJson[0].Leader.content0" 
                         :textStyle="$store.state.originalJson[0].Leader.custom.style">
                        </textEdit>
                        <div class="messageBg editTarget" data-type="BG_IMG" :data-index="$store.state.originalJson[5].messageBg.index" :data-name="$store.state.originalJson[5].messageBg.name" >
                          <img class="title-bg" :src="$util.path( $store.state.resPath, $store.state.originalJson[5].messageBg.src.path)" >
                          <div class="textWrap">
                            <textEdit :index="5" :name="$store.state.originalJson[5].message.name" :contentId="0" :content="$store.state.originalJson[5].message.content0" :textStyle="$store.state.originalJson[5].message.custom.style"></textEdit>
                          </div>
                        </div>
                        <!-- 规则 B! -->
                        <mRule :json="$store.state.originalJson[5]"></mRule>
                        <div class="ruleBg editTarget" data-type="BG_IMG" :data-index="$store.state.originalJson[5].ruleBg.index" :data-name="$store.state.originalJson[5].ruleBg.name" >
                          <img class="title-bg" :src="$util.path( $store.state.resPath, $store.state.originalJson[5].ruleBg.src.path)" >
                          <div class="textWrap">
                            <textEdit :index="5" :name="$store.state.originalJson[5].rule.name" :contentId="0" :content="$store.state.originalJson[5].rule.content0" :textStyle="$store.state.originalJson[5].rule.custom.style"></textEdit>
                          </div>
                        </div>
                        <!-- 标题 B! -->
                        <div class="titleAct editTarget" data-type="BG_IMG" data-index="0" data-name="titleAct" :style="
                        {
                          backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].titleAct.src.path ) +')'
                        }" >
                          <textEdit :index="0" :name="$store.state.originalJson[0].zt1.name" :contentId="0" :content="$store.state.originalJson[0].zt1.content0" :textStyle="$store.state.originalJson[0].zt1.custom.style"></textEdit><!-- TODO -->
                          <textEdit :index="0" :name="$store.state.originalJson[0].t1.name" :contentId="0" :content="$store.state.originalJson[0].t1.content0" :textStyle="$store.state.originalJson[0].t1.custom.style"></textEdit>
                        </div>
                        <!-- 背景 B! -->
                        <div class="main-bg editTarget" data-type="BG_IMG" data-index="0" data-name="mainBg" 
                          :style="{
                            backgroundImage: 'url('+$util.path( $store.state.resPath, $store.state.originalJson[0].mainBg.src.path)+')'}"
                        >
                          <!-- 内容 B! -->
                          <div class="wrap clearfix">
                            <!-- banner B！-->
                            <mBanner :json="$store.state.originalJson[3]"></mBanner>
                            <!-- 福利票券 B! -->
                            <mWelfare :json="$store.state.originalJson[0]"></mWelfare>
                            <!-- 薪享理财 B! -->
                            <mWelfare :json="$store.state.originalJson[1]"></mWelfare>
                            <!-- 广告 B! -->
                            <mOnlyOneBanner :json="$store.state.originalJson[2]"></mOnlyOneBanner>
                          </div>
                         </div>
                        <!-- 页脚 B!-->
                        <mfooter :footer="$store.state.originalJson[4].footer" :textArr="[$store.state.originalJson[4].footer_tip_1, $store.state.originalJson[4].footer_tip_2]" :picArr="[]"></mfooter>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template> 
<script>
import pageJson from '../../assets/star/star.json'
import textEdit from '../textEdit.vue'
import mBanner from '../module/m_banner.vue'
import mWelfare from '../module/m_welfare.vue'
import mfooter from '../module/m_footer.vue'
import mRule from '../module/m_rule.vue'
import mOnlyOneBanner from '../module/m_onlyOneBanner.vue'

export default {
  data () {
    return {
    }
  },  
  components: {
    textEdit,
    mBanner,
    mWelfare,
    mfooter,
    mRule,
    mOnlyOneBanner
  },
  watch: {
  },
  created() {
    // 模版json
    this.$store.commit('modifyStaticJson', JSON.parse(JSON.stringify( pageJson )))
    this.$store.commit('modifyOriginalJson', pageJson)
  },
  mounted() {
    // 领导寄语
    $(".ldjyBg").on("click",function(){
      $(".mask").css("height", $(".my-showScreen").css("height"))
      $(".mask, .ruleBg").fadeIn()
    })
    $(".mask").on("click",function(e){
      $(".mask, .ruleBg").fadeOut()
      $(".mask, .messageBg").fadeOut()
      e.stopPropagation() 
    })
    // 企业福利
    $(".ruleBtn").on("click",function(){
      $(".mask").css("height", $(".my-showScreen").css("height"))
      $(".mask, .messageBg").fadeIn()
    })
  },
  computed: {
  },
  methods: {
  }
};
</script>
<style lang="scss">
body,div,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,iframe,input,textarea,select,label,article,aside,footer,header,menu,nav,section,time,audio,video{margin:0;padding:0;}
article,aside,footer,header,hgroup,nav,section,audio,canvas,video{display:block;}
body{font-size:100%;font-family:'Microsoft YaHei', 'Helvitica', 'Verdana', 'Tohoma', 'Arial', 'san-serif',Helvetica,STHeiti,Droid Sans Fallback;font-size:30px; color:#333; -webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
textarea{resize:none;}
iframe,img{border:0;}
li,ul,ol{list-style:none;}
input,select,textarea{outline:0;-webkit-user-modify:read-write-plaintext-only;}
input{-webkit-appearance:none;}
a{text-decoration:none;}
*,::before,::after{padding: 0;margin: 0;-webkit-tap-highlight-color: transparent;}
.clearfix::after,
.clearfix::before{
    content: ".";
    line-height: 0;
    height: 0;
    display: block;
    visibility: hidden;
    clear: both; 
}
.textWrap::-webkit-scrollbar {width: 5px;background-color:#c1c1c1;}
.textWrap::-webkit-scrollbar-track{  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);background-color:#f1f1f1;    }
.textWrap::-webkit-scrollbar-thumb{  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);box-shadow: inset 0 0 6px rgba(0,0,0,.3);  background-color:#c1c1c1;} 
/* 
  @750( 是750的设计图 )
*/
@function to($px){
    @return $px * (375/750) * 1px ;
}
.h5Bg .titleAct {
  width: to(750);
  height: to(129);
  position: absolute;
  z-index: 9;
  background-size: 100% 100%;
  top: to(780);
  overflow: hidden;
}
.mask {
  width: to(750);
  height: to(3820);
  background: rgba(0,0,0,0.8);
  position: absolute;
  z-index: 999;
  display: none;
}
.h5Bg .ruleBg,.h5Bg .messageBg {
  width: to(643);  
  height: auto;
  background-size: contain;
  position: absolute;
  top: to(400);
  left: 50%;
  margin-left: to(-321.5);
  z-index: 9999;
  display: none;
  .textWrap {
    width: to(520);
    height: to(450);
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
    top: to(160);
    left: to(56);
  }
  img {
    width: 100%;
    height: auto;
  }
}
.h5Bg .rule {
  height: auto !important;
}
.editTarget {
  position: relative;
}
.mt38 {
  margin-top: to(30) !important;
}
.z1 {
  z-index: 1;
}
.z2 {
  z-index: 2;
}
.blank {
  width: 100%;
  height: to(100);
}
.my-showScreen {
  .h5Bg {
    position: relative;
    overflow: hidden;
  }
  .title-div {
    width: to(750);
    height: to(904);
    overflow: hidden;
  }
  .title-bg {
    width: to(750);
    height: auto;
  }
  .main-bg {
    width: to(750);
    height: auto;
    vertical-align: top;
    background-size: 100% to(2820); 
    padding-bottom: to(225);
  }
  .wrap {
    width: to(750);
    height: auto;
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .subTitleBg {
    width: to(750);
    height: to(80);
    position: absolute;
    top: to(280);
    left: 0;
    background-size: 100% 100%;
  }
  .ldjyBg {
    width: to(412);
    height: to(112);
    position: absolute;
    top: to(650);
    left: to(170);
    background-size: 100% 100%;
  }
}
.drap-resize_main {
  position: absolute;
  border: 1px dashed #009082;
  background-color: rgba(236, 250, 250, 0.3);
  display: none;
}
.drap-resize_main.active {
  display: block;
}
</style>


