<template>
    <div class="special mt38">
      <div class="head editTarget" data-type="BG_PAGE" data-index="0" data-name="specialBgT" :style="Number( $store.state.originalJson[0].specialBgT.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[0].specialBgT.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].specialBgT.src.path ) +')'}">
      </div>
      <div class="content clearfix editTarget" data-type="BG_PAGE" data-index="0" data-name="specialBgM" :style="Number( $store.state.originalJson[0].specialBgM.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[0].specialBgM.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].specialBgM.src.path ) +')'}">
          <textEdit :index="0" :name="$store.state.originalJson[0].h1.name" :contentId="0" :content="$store.state.originalJson[0].h1.content0" :textStyle="$store.state.originalJson[0].h1.custom.style"></textEdit>
            <div class="priceBtn editTarget z1" data-type="CARD_NORMAL" data-statusId="0" data-index="0" data-name="priceBtn" :style="Number( $store.state.originalJson[0].priceBtn.custom.moduleBgType ) == 0  ? { marginTop:'46px', backgroundColor: $store.state.originalJson[0].priceBtn.custom.btnColor} : ($store.state.originalJson[0].priceBtn.custom.status0 == 0 ? { marginTop:'46px',backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].priceBtn.src.path1 ) +')'} : { marginTop:'46px',backgroundImage: 'url('+ $store.state.resPath + $store.state.originalJson[0].priceBtn.src.path2 +')'}) ">
              <div class="priceBg editTarget" data-type="CARD_NORMAL" data-statusId="0" data-index="0" data-name="priceBtn" :style="Number( $store.state.originalJson[0].priceBtn.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[0].priceBtn.custom.color} :  {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].priceBtn.src.path ) +')'}   ">
                <textEdit :index="0" :name="$store.state.originalJson[0].mark.name" :contentId="0" :content="$store.state.originalJson[0].mark.content0" :textStyle="$store.state.originalJson[0].mark.custom.style"></textEdit>
                <textEdit :index="0" :name="$store.state.originalJson[0].title.name" :contentId="0" :content="$store.state.originalJson[0].title.content0" :textStyle="$store.state.originalJson[0].title.custom.style"></textEdit>
                <textEdit :index="0" :name="$store.state.originalJson[0].subTitle.name" :contentId="0" :content="$store.state.originalJson[0].subTitle.content0" :textStyle="$store.state.originalJson[0].subTitle.custom.style"></textEdit>
              </div>
              <textEdit v-show="$store.state.originalJson[0].priceBtn.custom.status0 == 0" :index="0" :name="$store.state.originalJson[0].rob.name" :contentId="0" :content="$store.state.originalJson[0].rob.content0" :textStyle="$store.state.originalJson[0].rob.custom.style"></textEdit>
              <textEdit v-show="$store.state.originalJson[0].priceBtn.custom.status0 != 0" :index="0" :name="$store.state.originalJson[0].rob1.name" :contentId="0" :content="$store.state.originalJson[0].rob1.content0" :textStyle="$store.state.originalJson[0].rob1.custom.style"></textEdit>
            </div>
            
            <div :class="'priceBtn editTarget marginBlank z1' + (+$store.state.originalJson[0].priceBtn.custom.num <= 0 ? ' hide' : '')" data-type="CARD_NORMAL" data-statusId="1" data-index="0" data-name="priceBtn" :style="Number( $store.state.originalJson[0].priceBtn.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[0].priceBtn.custom.btnColor} : ($store.state.originalJson[0].priceBtn.custom.status1 == 0 ?  {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].priceBtn.src.path1 ) +')'} :  {backgroundImage: 'url('+ $store.state.resPath + $store.state.originalJson[0].priceBtn.src.path2 +')'})">
              <div class="priceBg editTarget" data-type="CARD_NORMAL" data-statusId="1" data-index="0" data-name="priceBtn" :style="Number( $store.state.originalJson[0].priceBtn.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[0].priceBtn.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].priceBtn.src.path) +')'}">
                <textEdit :index="0" :name="$store.state.originalJson[0].mark.name" :contentId="1" :content="$store.state.originalJson[0].mark.content1" :textStyle="$store.state.originalJson[0].mark.custom.style"></textEdit>
                <textEdit :index="0" :name="$store.state.originalJson[0].title.name" :contentId="1" :content="$store.state.originalJson[0].title.content1" :textStyle="$store.state.originalJson[0].title.custom.style"></textEdit>
                <textEdit :index="0" :name="$store.state.originalJson[0].subTitle.name" :contentId="1" :content="$store.state.originalJson[0].subTitle.content1" :textStyle="$store.state.originalJson[0].subTitle.custom.style"></textEdit>
              </div>
              <textEdit v-show="$store.state.originalJson[0].priceBtn.custom.status1 == 0" :index="0" :name="$store.state.originalJson[0].rob.name" :contentId="1" :content="$store.state.originalJson[0].rob.content1" :textStyle="$store.state.originalJson[0].rob.custom.style"></textEdit>
              <textEdit v-show="$store.state.originalJson[0].priceBtn.custom.status1 != 0" :index="0" :name="$store.state.originalJson[0].rob1.name" :contentId="1" :content="$store.state.originalJson[0].rob1.content1" :textStyle="$store.state.originalJson[0].rob1.custom.style"></textEdit>
            </div>
            <div :class="'priceBtn editTarget marginBlank z1 hide' + (+$store.state.originalJson[0].priceBtn.custom.num <= 1? ' hide' : '')" data-type="CARD_NORMAL" data-statusId="2" data-index="0" data-name="priceBtn" :style="Number( $store.state.originalJson[0].priceBtn.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[0].priceBtn.custom.btnColor} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].priceBtn.src.path1 ) +')'}">
              <div class="priceBg editTarget" data-type="CARD_NORMAL" data-statusId="2" data-index="0" data-name="priceBtn" :style="Number( $store.state.originalJson[0].priceBtn.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[0].priceBtn.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].priceBtn.src.path ) +')'}">
                <textEdit :index="0" :name="$store.state.originalJson[0].mark.name" :contentId="2" :content="$store.state.originalJson[0].mark.content2" :textStyle="$store.state.originalJson[0].mark.custom.style"></textEdit>
                <textEdit :index="0" :name="$store.state.originalJson[0].title.name" :contentId="2" :content="$store.state.originalJson[0].title.content2" :textStyle="$store.state.originalJson[0].title.custom.style"></textEdit>
                <textEdit :index="0" :name="$store.state.originalJson[0].subTitle.name" :contentId="2" :content="$store.state.originalJson[0].subTitle.content2" :textStyle="$store.state.originalJson[0].subTitle.custom.style"></textEdit>
              </div>
              <textEdit :index="0" :name="$store.state.originalJson[0].rob.name" :contentId="2" :content="$store.state.originalJson[0].rob.content2" :textStyle="$store.state.originalJson[0].rob.custom.style"></textEdit>
            </div>
            <div class="line"></div>
            
            <div class="rightsBg" style="position:relative;">
              <textEdit :index="0" :name="$store.state.originalJson[0].h2.name" :contentId="0" :content="$store.state.originalJson[0].h2.content0" :textStyle="$store.state.originalJson[0].h2.custom.style"></textEdit>
              <div class="two itemWrap active" style="marginTop:60px;">
                <li :class="'item editTarget'+ (+$store.state.originalJson[0].rightsBg.custom.num == 0 ? ' hide' : '')" data-type="CARD_NORMAL" data-statusId="0" data-index="0" data-name="rightsBg" :style="Number( $store.state.originalJson[0].rightsBg.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[0].rightsBg.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].rightsBg.src.path ) +')'}">
                  <textEdit :index="0" :name="$store.state.originalJson[0].rightsMark.name" :contentId="0" :content="$store.state.originalJson[0].rightsMark.content0" :textStyle="$store.state.originalJson[0].rightsMark.custom.style"></textEdit>
                  <textEdit :index="0" :name="$store.state.originalJson[0].rightsTitle.name" :contentId="0" :content="$store.state.originalJson[0].rightsTitle.content0" :textStyle="$store.state.originalJson[0].rightsTitle.custom.style"></textEdit>
                  <textEdit :index="0" :name="$store.state.originalJson[0].rightsSubTitle.name" :contentId="0" :content="$store.state.originalJson[0].rightsSubTitle.content0" :textStyle="$store.state.originalJson[0].rightsSubTitle.custom.style"></textEdit>
                  <textEdit v-show="$store.state.originalJson[0].rightsBg.custom.status0 == 0" :index="0" :name="$store.state.originalJson[0].rightsRob.name" :contentId="0" :content="$store.state.originalJson[0].rightsRob.content0" :textStyle="$store.state.originalJson[0].rightsRob.custom.style"></textEdit>
                  <textEdit v-show="$store.state.originalJson[0].rightsBg.custom.status0 != 0" :index="0" :name="$store.state.originalJson[0].rightsRob1.name" :contentId="0" :content="$store.state.originalJson[0].rightsRob1.content0" :textStyle="$store.state.originalJson[0].rightsRob1.custom.style"></textEdit>
                </li>
                <li :class="'item editTarget'+ (+$store.state.originalJson[0].rightsBg.custom.num == 0 ? ' hide' : '')" data-type="CARD_NORMAL" data-statusId="1" data-index="0" data-name="rightsBg" :style="Number( $store.state.originalJson[0].rightsBg.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[0].rightsBg.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].rightsBg.src.path ) +')'}">
                  <textEdit :index="0" :name="$store.state.originalJson[0].rightsMark.name" :contentId="1" :content="$store.state.originalJson[0].rightsMark.content1" :textStyle="$store.state.originalJson[0].rightsMark.custom.style"></textEdit>
                  <textEdit :index="0" :name="$store.state.originalJson[0].rightsTitle.name" :contentId="1" :content="$store.state.originalJson[0].rightsTitle.content1" :textStyle="$store.state.originalJson[0].rightsTitle.custom.style"></textEdit>
                  <textEdit :index="0" :name="$store.state.originalJson[0].rightsSubTitle.name" :contentId="1" :content="$store.state.originalJson[0].rightsSubTitle.content1" :textStyle="$store.state.originalJson[0].rightsSubTitle.custom.style"></textEdit>
                  <textEdit v-show="$store.state.originalJson[0].rightsBg.custom.status1 == 0" :index="0" :name="$store.state.originalJson[0].rightsRob.name" :contentId="1" :content="$store.state.originalJson[0].rightsRob.content1" :textStyle="$store.state.originalJson[0].rightsRob.custom.style"></textEdit>
                  <textEdit v-show="$store.state.originalJson[0].rightsBg.custom.status1 != 0" :index="0" :name="$store.state.originalJson[0].rightsRob1.name" :contentId="1" :content="$store.state.originalJson[0].rightsRob1.content1" :textStyle="$store.state.originalJson[0].rightsRob1.custom.style"></textEdit>
                </li>
              </div>
              <div class="one itemWrap">
                <li :class="'item1 editTarget' + (+$store.state.originalJson[0].rightsBg.custom.num == 1 ? ' hide' : '') " data-type="CARD_NORMAL" data-statusId="0" data-index="0" data-name="rightsBg1" :style="Number( $store.state.originalJson[0].rightsBg1.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[0].rightsBg.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].rightsBg1.src.path ) +')'}">
                  <textEdit :index="0" :name="$store.state.originalJson[0].rights1Mark.name" :contentId="0" :content="$store.state.originalJson[0].rights1Mark.content0" :textStyle="$store.state.originalJson[0].rights1Mark.custom.style"></textEdit>
                  <textEdit :index="0" :name="$store.state.originalJson[0].rights1Title.name" :contentId="0" :content="$store.state.originalJson[0].rights1Title.content0" :textStyle="$store.state.originalJson[0].rights1Title.custom.style"></textEdit>
                  <textEdit :index="0" :name="$store.state.originalJson[0].rights1SubTitle.name" :contentId="0" :content="$store.state.originalJson[0].rights1SubTitle.content0" :textStyle="$store.state.originalJson[0].rights1SubTitle.custom.style"></textEdit>
                  <textEdit v-show="$store.state.originalJson[0].rightsBg1.custom.status0 == 0" :index="0" :name="$store.state.originalJson[0].rights1Rob.name" :contentId="0" :content="$store.state.originalJson[0].rights1Rob.content0" :textStyle="$store.state.originalJson[0].rights1Rob.custom.style"></textEdit>
                  <textEdit v-show="$store.state.originalJson[0].rightsBg1.custom.status0 != 0" :index="0" :name="$store.state.originalJson[0].rights1Rob1.name" :contentId="0" :content="$store.state.originalJson[0].rights1Rob1.content0" :textStyle="$store.state.originalJson[0].rights1Rob1.custom.style"></textEdit>
                </li>
              </div>
            </div>
      </div>
      <div class="bottom editTarget" data-type="BG_PAGE" data-index="0" data-name="specialBgB" :style="Number( $store.state.originalJson[0].specialBgB.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[0].specialBgB.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[0].specialBgB.src.path ) +')'}"></div>
    </div>
</template>
<script>
/**
 * 观影指南（模板）-特惠、专享权益（模块）
 * @date:19-11
 */
import textEdit from '../textEdit.vue'
export default {
  data() {
    return {
    }
  },
  props: [],
  watch: {
    
  },
  components: {
    textEdit
  },
  created() {
  },
  computed: {
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
/* 
  @750( 是750的设计图 )
*/
@function to($px){
    @return $px * (375/750) * 1px ;
}
.hide {
  display: none;
}
.special {
  width: to(700);
  height: auto;
  margin: 0 auto;
  position: relative;
  .head {
    width: to(700);
    height: to(40);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .content {
    width: to(700);
    height: auto;
    background-size: to(700) to(5);
    background-repeat: repeat-y;
    .marginBlank {
      margin-top: to(26) !important;
    }
    h1 {
      font-size: to(52);
      font-weight: 300;
      color: #FEE4C3;
      letter-spacing: to(5);
      text-align: center;
      margin-top: to(26);
    }
    .priceBtn {
      width: to(154);
      height: to(190);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-left: to(506); 
      border-radius: 9px;
      -webkit-border-radius: 9px;
    }
    .priceBg {
      width: to(527);
      height: to(190);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      left: to(-467);
      border-radius: 9px;
      -webkit-border-radius: 9px;
    } 
    .line {
      width: to(680);
      height: to(1);
      border-top: to(1) dotted #6D808E;
      margin: 0 auto;
      margin-top: to(26);
    }
    .rightsBg {
      width: to(600);
      height: auto;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      .two {
        width: to(600);
        height: auto;
        display: none; 
        .item {
          width: to(280);
          height: to(335);
          background-size: 100% 100%;
          background-repeat: no-repeat; 
        }
        .item:nth-child(1) {
          float: left;
        }
        .item:nth-child(2) {
          float: right;
        }
      }
      .one {
        width: to(600);
        height: auto;
        .item1 {
          width: to(630);
          height: to(171);
          background-size: 100% 100%;
          background-repeat: no-repeat; 
          margin-left: to(-16);
        }
      }
      .itemWrap.active {
        display: inline-block;
      }
    }
  }
  .bottom {
    width: to(700);
    height: to(40);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

}
</style>
