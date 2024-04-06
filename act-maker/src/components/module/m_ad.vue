<template>
    <div class="ad mt38">
      <div class="adBg editTarget clearfix" data-type="BG_PAGE" data-index="3" data-name="adBg" :style="Number( $store.state.originalJson[3].adBg.custom.moduleBgType ) == 0  ? {backgroundColor: $store.state.originalJson[3].adBg.custom.color} : {backgroundImage: 'url('+  $util.path( $store.state.resPath, $store.state.originalJson[3].adBg.src.path ) +')'}">
        <div class="iconCat editTarget" data-type="BG_IMG" data-index="3" data-name="iconCat" :style="{ backgroundImage: 'url(' + $util.path( $store.state.resPath, $store.state.originalJson[3].iconCat.src.path ) +')' }"></div>
        <textEdit :index="3" :name="$store.state.originalJson[3].mark.name" :contentId="0" :content="$store.state.originalJson[3].mark.content0" :textStyle="$store.state.originalJson[3].mark.custom.style"></textEdit>
      </div>
    </div>
</template>
<script>
/**
 * 观影指南（模板）-底部广告（模块）
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
.ad {
  width: to(711);
  height: to(148);
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  .adBg {
    width: to(711);
    height: to(148);
    background-size: 100% 100%;
    background-repeat: no-repeat; 
    .iconCat {
      width: to(116);
      height: to(38);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
      margin-top: to(38);
      z-index: 1;
    }
  }
}
</style>
