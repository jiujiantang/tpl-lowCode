<template>
  <div class="coupon editTarget z1" data-type="CARD_NORMAL" data-statusId="0" :data-index="coupon.index" :data-name="coupon.name" 
      :style="Number( coupon.custom.moduleBgType ) == 0  ? {
        backgroundColor: coupon.custom.color,
        width: $util.toIphoneX(coupon.custom.style.width),
        height: $util.toIphoneX(coupon.custom.style.height)
      } :
      {
        backgroundImage: 'url('+ $util.path( $store.state.resPath, coupon.src.path ) +')',
        width: $util.toIphoneX(coupon.custom.style.width),
        height: $util.toIphoneX(coupon.custom.style.height)
      }">
      
      <!-- 按钮图片 B! -->
      <picEdit v-for="(item, i) in picArr" :key="'info'+i" :index="item.index" :name="item.name" :type="item.type" 
        :coupon="coupon"
        :textArrbtn="textArrbtn"
        :animate="coupon.custom.animate"
        :picStyle="item.custom.style" 
        :backgroundColor="Number( coupon.custom.moduleBgType ) == 0 ? coupon.custom.btnColor : ''"
        :backgroundImage="Number( coupon.custom.moduleBgType ) == 0 ? '' : 'url('+ $util.path( $store.state.resPath, coupon.src.path1 ) +')'"
       >
       </picEdit>
    
      <!-- 文字 B! -->
      <textEdit v-for="(item, i) in textArr" :key="'info1'+i" v-show="$util.thanStstus(item.custom.status, coupon.custom.status)" :index="item.index" 
        :animate="coupon.custom.animate"
        :name="item.name" 
        :contentId="0" 
        :content="item.content0" 
        :textStyle="item.custom.style" ></textEdit>
  </div>
</template>

<script>
/**
 * 组合组件-券
 * 只包含一个按钮
 * @date:19-12
 */
import textEdit from '../textEdit.vue'
import picEdit from '../picEdit.vue'

export default {
  data () {
      return {
      
      }
  },
  props: ["coupon", "textArr", "textArrbtn", "picArr"],
  watch: {

  },
  components: {
    textEdit,
    picEdit
  },
  computed: {
      
  },
  methods: {
      
  },
  mounted () {
    
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
.coupon {
  width: to(628);
  height: to(200);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
  position: relative;
  .btn {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
  }
} 
</style>
