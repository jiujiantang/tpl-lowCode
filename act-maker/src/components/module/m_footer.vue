<template>
  <div class="footer editTarget clearfix" data-type="BG_PAGE" :data-index="footer.index" :data-name="footer.name" 
    :style="Number( footer.custom.moduleBgType ) == 0  ?
    {
      backgroundColor: footer.custom.color,
      width: $util.toIphoneX(footer.custom.style.width),
      height: $util.toIphoneX(footer.custom.style.height)
    } :
    {
      backgroundImage: 'url('+  $util.path( $store.state.resPath, footer.src.path ) +')',
      width: $util.toIphoneX(footer.custom.style.width),
      height: $util.toIphoneX(footer.custom.style.height)
    }">

    <!-- 图片 B! -->
    <picEdit v-if="picArr.length > 0" v-for="(item, i) in picArr" :key="'info'+i" :index="item.index" :name="item.name" :type="item.type" 
      :picStyle="item.custom.style" 
      :backgroundColor="Number( footer.custom.moduleBgType ) == 0 ? footer.custom.btnColor : ''"
      :backgroundImage="Number( footer.custom.moduleBgType ) == 0 ? '' : 'url('+ $util.path( $store.state.resPath, footer.src.path1 ) +')'"
    ></picEdit>

    <!-- 文字 B! -->
    <textEdit v-if="textArr.length > 0" v-for="(item, i) in textArr" :key="'info1'+i" :index="item.index" :name="item.name" :contentId="0" :content="item.content0" 
      :textStyle="item.custom.style" >
    </textEdit>
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
  props: ["footer", "textArr", "picArr"],
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
.footer {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  bottom: 0;
} 
</style>
