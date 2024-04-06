<template>
  <div id="machine" >
    <div class="my-centerContainer">
        <div class="my-showWrapper">
            <div class="my-phoneMain tc">
                <div class="my-screen mt60">
                    <div class="my-toolBar" @click.stop></div>
                    <!-- my-fixedtemplate: 静态模板 -->
                    <div class="v-show my-showScreen my-fixedtemplate">
                      <div class="screen-bg editTarget" data-type="BG_IMG" data-index="0" data-name="screenBg" :style="{backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].screenBg.src.path ) +')'}" >
                        <div class="ruleBtn editTarget z1" data-type="BG_IMG" data-index="0" data-name="ruleBtn" :style="{backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].ruleBtn.src.path ) +')'}" ></div>
                        <div class="mask">
                          <div class="ruleBg editTarget" data-type="BG_IMG" data-index="0" data-name="ruleBg" :style="{backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].ruleBg.src.path ) +')'}" >
                            <textEdit :index="0" :name="$store.state.originalJson[0].h3.name" :contentId="0" :content="$store.state.originalJson[0].h3.content0" :textStyle="$store.state.originalJson[0].h3.custom.style"></textEdit>
                            <textEdit :index="0" :name="$store.state.originalJson[0].rule.name" :contentId="0" :content="$store.state.originalJson[0].rule.content0" :textStyle="$store.state.originalJson[0].rule.custom.style"></textEdit>
                          </div>
                        </div>
                        <div class="wrap clearfix">
                          <!-- 特惠、专享 B! -->
                          <mSpecial></mSpecial>
                          <!-- 资讯 B! -->
                          <mNews></mNews>
                          <!-- 推荐 B! -->
                          <mHot></mHot>
                          <!-- 导航 B! -->
                          <mNav></mNav>
                          <!-- 广告 B! -->
                          <mAd></mAd>
                          <!-- 黏底按钮 B! -->
                          <mStickyBtn></mStickyBtn>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import mSpecial from '../module/m_special.vue'
import mNews from '../module/m_news.vue'
import mHot from '../module/m_hot.vue'
import mNav from '../module/m_nav.vue'
import mAd from '../module/m_ad.vue'
import mStickyBtn from '../module/m_stickyBtn.vue'
import textEdit from '../textEdit.vue'

export default {
  data () {
    return {
    }
  },  
  components: {
    mSpecial,
    mNews,
    mHot,
    mNav,
    mAd,
    mStickyBtn,
    textEdit
  },
  watch: {
  },
  created() {
    
  },
  mounted() {
    $(".ruleBtn").on("click",function(){
      $(".mask").fadeIn()
    })
    $(".mask").on("click",function(e){
      $(".mask").fadeOut()
      e.stopPropagation() 
    })
  },
  computed: {
  },
  methods: {
    setBgImage() {
        var bgImage = this.$store.state.originalJson.bgImage;
        if (!bgImage) {
            return;
        }
        if (bgImage.url) {
            return 'background: url(' + bgImage.url + ') center center / cover no-repeat;';
        }
        return 'background-color: ' + bgImage.backgroundColor + ' ;';
    }
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
/* 
  @750( 是750的设计图 )
*/
@function to($px){
    @return $px * (375/750) * 1px ;
}
.mask {
  width: to(750);
  height: 100%;
  background: rgba(0,0,0,0.8);
  position: absolute;
  z-index: 999;
  display: none;
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
.ruleBtn {
  width: to(123);
  height: to(50);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: to(152);
  right: 0;
  z-index: 1000;
}
.my-showScreen {
  .screen-bg {
    width: to(750);
    height: to(3606);
    background-size: to(750) to(3606);
    background-repeat: no-repeat; 
    .wrap {
      width: to(750);
      height: auto;
      position: absolute;
      left: 0;
      top: to(500);
      z-index: 1;
    }
  }
  .ruleBg {
    width: to(616);
    height: to(590);
    background-size: 100% 100%;
    background-repeat: no-repeat; 
    margin: 0 auto;
    margin-top: to(200);
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


