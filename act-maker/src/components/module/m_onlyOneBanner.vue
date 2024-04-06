<template>
    <div class="onlyOneBanner">
       <!-- 标题 B! -->
      <div v-if="json.title" :class="json.title.name + ' title editTarget z1'" data-type="BG_IMG" :data-index="json.title.index" :data-name="json.title.name" >
        <img class="title-bg" :src="$util.path( $store.state.resPath, json.title.src.path)" >
      </div>
      <!-- 背景头部 B! -->
      <div class="head editTarget" data-name="couponT" data-type="BG_PAGE" data-index="2" 
        :style="Number( json.couponT.custom.moduleBgType ) == 0  ? {backgroundColor: json.couponT.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, json.couponT.src.path ) +')'}">
      </div>
      <!-- 背景内容 B! -->
      <div class="content clearfix editTarget" data-name="couponM" data-type="BG_PAGE" data-index="2"
        :style="Number( json.couponM.custom.moduleBgType ) == 0  ? {backgroundColor: json.couponM.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, json.couponM.src.path ) +')'}">
          <!-- banner B! -->
          <div class="ad-div z1 editTarget" data-type="BG_IMG_href" data-index="2" :data-name="json.ad.name">
            <img class="ad-bg " :src="$util.path( $store.state.resPath, json.ad.src.path)" >
          </div>
      </div>
      <!-- 背景底部 B! -->
      <div class="bottom editTarget" data-name="couponB" data-type="BG_PAGE" data-index="2"
        :style="Number( json.couponB.custom.moduleBgType ) == 0  ? {backgroundColor: json.couponB.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, json.couponB.src.path ) +')'}">
      </div>
    </div>
</template>
<script>
/**
 * 企明星（模板）- 福利票券（模块）
 * @date:19-12
 */
import textEdit from '../textEdit.vue'
import coupon from './m_coupon.vue'
export default {
  data() {
    return {
    }
  },
  props: ["json"],
  watch: {
    
  },
  components: {
    textEdit,
    coupon
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
.ad-div, .ad-bg {
  width: to(628);
  margin: 0 auto;
  vertical-align: top;
}
.hide {
  display: none;
}
.blank {
  height: to(10);
}
.onlyOneBanner {
  width: to(750);
  height: auto;
  margin: 0 auto;
  position: relative;
  .title {
    width: 100%;
    height: auto;
  }
  .head {
    width: to(706);
    height: to(34);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
  }
  .content {
    width: to(706);
    height: auto;
    background-size: to(706) to(1);
    background-repeat: repeat-y;
    margin: 0 auto;
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
    width: to(706);
    height: to(48);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
  }

}
</style>
