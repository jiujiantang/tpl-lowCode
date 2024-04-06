<template>
    <div class="hot mt38">
      <textEdit :index="2" :name="$store.state.originalJson[2].h1.name" :contentId="0" :content="$store.state.originalJson[2].h1.content0" :textStyle="$store.state.originalJson[2].h1.custom.style"></textEdit>
      <ul style="margin-top:65px;">
        <li class="hotLeft mt60 editTarget" data-type="CARD_IMG" data-index="2" data-name="hotLeft" :style="{ backgroundImage: 'url('+ ($store.state.originalJson[2].hotLeft.custom.moduleBgType == 0 ? $util.path( $store.state.resPath, $store.state.originalJson[2].hotLeft.src.path) : $util.path( $store.state.resPath, $store.state.originalJson[2].hotLeft.src.path1))   +')' }">
          <div class="ad adstyle editTarget" data-type="BG_IMG" data-index="2" data-name="ad" :style="{
            backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[2].ad.src.path )+')',
            left: ($store.state.originalJson[2].hotLeft.custom.moduleBgType == 0 ?'0px':'155px'),
            top: ($store.state.originalJson[2].hotLeft.custom.moduleBgType == 0 ?'0px':'18px')
            }" ></div>
          <textEdit :index="2" :name="$store.state.originalJson[2].mark.name" :contentId="0" :content="$store.state.originalJson[2].mark.content0" :textStyle="$store.state.originalJson[2].hotLeft.custom.moduleBgType == 1 ? $store.state.originalJson[2].mark.custom.styleL : $store.state.originalJson[2].mark.custom.style"></textEdit>
          <textEdit :index="2" :name="$store.state.originalJson[2].title.name" :contentId="0" :content="$store.state.originalJson[2].title.content0" :textStyle="$store.state.originalJson[2].hotLeft.custom.moduleBgType == 1 ? $store.state.originalJson[2].title.custom.styleL : $store.state.originalJson[2].title.custom.style"></textEdit>
          <textEdit :index="2" :name="$store.state.originalJson[2].subTitle.name" :contentId="0" :content="$store.state.originalJson[2].subTitle.content0" :textStyle="$store.state.originalJson[2].hotLeft.custom.moduleBgType == 1 ? $store.state.originalJson[2].subTitle.custom.styleL : $store.state.originalJson[2].subTitle.custom.style"></textEdit>
          <btnEdit :type="$store.state.originalJson[2].btn.custom.type" :moduleBgType="$store.state.originalJson[2].btn.custom.moduleBgType" :path="$util.path( $store.state.resPath, $store.state.originalJson[2].btn.src.path)" :index="2" :name="$store.state.originalJson[2].btn.name" :contentId="0" :textStyle="$store.state.originalJson[2].hotLeft.custom.moduleBgType == 1 ? $store.state.originalJson[2].btn.custom.styleL : $store.state.originalJson[2].btn.custom.style" :content="$store.state.originalJson[2].btn.content0"></btnEdit>
        </li>
        <li class="hotRight mt60 editTarget" data-type="CARD_IMG" data-index="2" data-name="hotRight" :style="{ backgroundImage: 'url('+ ($store.state.originalJson[2].hotRight.custom.moduleBgType == 0 ? $util.path( $store.state.resPath, $store.state.originalJson[2].hotRight.src.path) : $util.path( $store.state.resPath, $store.state.originalJson[2].hotRight.src.path1))   +')' }">
          <div class="ad1 adstyle editTarget" data-type="BG_IMG" data-index="2" data-name="ad1" :style="{
            backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[2].ad1.src.path) +')',
            left: ($store.state.originalJson[2].hotRight.custom.moduleBgType == 0 ?'0px':'155px'),
            top: ($store.state.originalJson[2].hotRight.custom.moduleBgType == 0 ?'0px':'18px')
            }" ></div>
          <textEdit :index="2" :name="$store.state.originalJson[2].mark1.name" :contentId="0" :content="$store.state.originalJson[2].mark1.content0" :textStyle="$store.state.originalJson[2].hotRight.custom.moduleBgType == 1 ? $store.state.originalJson[2].mark1.custom.styleL : $store.state.originalJson[2].mark1.custom.style"></textEdit>
          <textEdit :index="2" :name="$store.state.originalJson[2].title1.name" :contentId="0" :content="$store.state.originalJson[2].title1.content0" :textStyle="$store.state.originalJson[2].hotRight.custom.moduleBgType == 1 ? $store.state.originalJson[2].title1.custom.styleL : $store.state.originalJson[2].title1.custom.style"></textEdit>
          <textEdit :index="2" :name="$store.state.originalJson[2].subTitle1.name" :contentId="0" :content="$store.state.originalJson[2].subTitle1.content0" :textStyle="$store.state.originalJson[2].hotRight.custom.moduleBgType == 1 ? $store.state.originalJson[2].subTitle1.custom.styleL : $store.state.originalJson[2].subTitle1.custom.style"></textEdit>
          <btnEdit :type="$store.state.originalJson[2].btn1.custom.type" :moduleBgType="$store.state.originalJson[2].btn1.custom.moduleBgType" :path="$util.path( $store.state.resPath, $store.state.originalJson[2].btn1.src.path)" :index="2" :name="$store.state.originalJson[2].btn1.name" :contentId="0" :textStyle="$store.state.originalJson[2].hotRight.custom.moduleBgType == 1 ? $store.state.originalJson[2].btn1.custom.styleL : $store.state.originalJson[2].btn1.custom.style" :content="$store.state.originalJson[2].btn1.content0"></btnEdit>
        </li>
        <li class="hotLeft2 mt60 editTarget" data-type="CARD_IMG" data-index="2" data-name="hotLeft2" :style="{ backgroundImage: 'url('+ ($store.state.originalJson[2].hotLeft2.custom.moduleBgType == 0 ? $util.path( $store.state.resPath, $store.state.originalJson[2].hotLeft2.src.path) : $util.path( $store.state.resPath, $store.state.originalJson[2].hotLeft2.src.path1))   +')' }">
          <div class="ad2 adstyle editTarget" data-type="BG_IMG" data-index="2" data-name="ad2" :style="{

            backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[2].ad2.src.path) +')',
            left: ($store.state.originalJson[2].hotLeft2.custom.moduleBgType == 0 ?'0px':'155px'),
            top: ($store.state.originalJson[2].hotLeft2.custom.moduleBgType == 0 ?'0px':'18px')
            }" ></div>
          <textEdit :index="2" :name="$store.state.originalJson[2].mark2.name" :contentId="0" :content="$store.state.originalJson[2].mark2.content0" :textStyle="$store.state.originalJson[2].hotLeft2.custom.moduleBgType == 1 ? $store.state.originalJson[2].mark2.custom.styleL : $store.state.originalJson[2].mark2.custom.style"></textEdit>
          <textEdit :index="2" :name="$store.state.originalJson[2].title2.name" :contentId="0" :content="$store.state.originalJson[2].title2.content0" :textStyle="$store.state.originalJson[2].hotLeft2.custom.moduleBgType == 1 ? $store.state.originalJson[2].title2.custom.styleL : $store.state.originalJson[2].title2.custom.style"></textEdit>
          <textEdit :index="2" :name="$store.state.originalJson[2].subTitle2.name" :contentId="0" :content="$store.state.originalJson[2].subTitle2.content0" :textStyle="$store.state.originalJson[2].hotLeft2.custom.moduleBgType == 1 ? $store.state.originalJson[2].subTitle2.custom.styleL : $store.state.originalJson[2].subTitle2.custom.style"></textEdit>
          <btnEdit :type="$store.state.originalJson[2].btn2.custom.type" :moduleBgType="$store.state.originalJson[2].btn2.custom.moduleBgType" :path="$util.path( $store.state.resPath, $store.state.originalJson[2].btn2.src.path)" :index="2" :name="$store.state.originalJson[2].btn2.name" :contentId="0" :textStyle="$store.state.originalJson[2].hotLeft2.custom.moduleBgType == 1 ? $store.state.originalJson[2].btn2.custom.styleL : $store.state.originalJson[2].btn2.custom.style" :content="$store.state.originalJson[2].btn2.content0"></btnEdit>
        </li>
      </ul>
    </div>
</template>
<script>
/**
 * 观影指南（模板）-热映推荐（模块）
 * @date:19-11
 */
import textEdit from '../textEdit.vue'
import btnEdit from '../btnEdit.vue'

export default {
  data() {
    return {
    }
  },
  props: [],
  components: {
    textEdit,
    btnEdit
  },
  created() {
  },
  methods: {
  },
  
};
</script>
<style lang="scss" scoped>
/* 
  @750( 是750的设计图 )
*/
@function to($px){
    @return $px * (375/750) * 1px ;
}
.hot {
  .adstyle {
    width: to(390);
    height: to(215);
    background-size: 100% 100%;
    background-repeat: no-repeat;   
    position: absolute;
  }
  width: to(700);
  height: to(1000);
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  .mt60 {
    margin: 0 auto;
    margin-top: to(30);
  }
  .mt25 {
    margin: 0 auto;
    margin-top: to(25);
  }
  h1 {
    font-size: to(52);
    font-weight: 300;
    color: #FEE4C3;
    letter-spacing: to(5);
    text-align: center;
  }
  .hotLeft, .hotLeft2{
    width: to(697);
    height: to(251);
    background-size: 100% 100%;
    background-repeat: no-repeat; 
  }
  .hotRight {
    width: to(697);
    height: to(252);
    background-size: 100% 100%;
    background-repeat: no-repeat; 
  }
}
</style>
