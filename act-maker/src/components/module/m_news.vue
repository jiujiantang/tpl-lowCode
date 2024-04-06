<template>
    <div class="news mt38">
      <div class="newsBg editTarget clearfix" data-type="BG_PAGE" data-index="1" data-name="newsBg" :style="Number( $store.state.originalJson[1].newsBg.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[1].newsBg.custom.color} : {backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[1].newsBg.src.path ) +')'}">
        <!-- <h1>精彩资讯</h1>  -->
        <textEdit :index="1" :name="$store.state.originalJson[1].h1.name" :contentId="0" :content="$store.state.originalJson[1].h1.content0" :textStyle="$store.state.originalJson[1].h1.custom.style"></textEdit>
        <div class="border">
          <div class="cover editTarget z1" data-type="P_VIDEO" data-index="1" data-name="cover" :style="{ backgroundImage: 'url('+ $util.path( $store.state.resPath, $store.state.originalJson[1].cover.src.path ) +')' }"></div>
          <textEdit :index="1" :name="$store.state.originalJson[1].tip.name" :contentId="0" :content="$store.state.originalJson[1].tip.content0" :textStyle="$store.state.originalJson[1].tip.custom.style"></textEdit>
        </div>
      </div>
    </div>
</template>
<script>
/**
 * 观影指南（模板）-精彩资讯（模块）
 * @date:19-11
 */
import textEdit from '../textEdit.vue'
export default {
  data() {
    return {
    }
  },
  props: [],
  components: {
    textEdit
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
.news {
  .border {
    position: relative;
    margin: 0 auto;
    margin-top: 62px;
    width: 317px;
    border-radius: 8px;
    overflow: hidden;
    height: 198px;
  }
  width: to(700);
  height: to(578);
  overflow: hidden;
  margin: 0 auto;
  position: relative; 
  .newsBg {
    width: to(700);
    height: to(578);
    background-size: 100% 100%;
    background-repeat: no-repeat; 
    h1 {
      font-size: to(52);
      font-weight: 300;
      color: #FEE4C3;
      letter-spacing: to(5);
      text-align: center;
      margin-top: to(45);
    }
    .cover {
      width: to(635);
      height: to(352);
      background-size: 100% 100%;
      background-repeat: no-repeat; 
      margin: 0 auto;
      // margin-top: to(132);
    }
  }
}
</style>
