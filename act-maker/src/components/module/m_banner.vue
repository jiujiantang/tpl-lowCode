<template>
    <div class="banner">
      <div id="stage" class="stage_area">
          <div id="container" class="container">
            <div id="piece1" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name"
             :style="'background-image: url(' + $util.path( $store.state.resPath, json.banner.src.path3 ) +');' " class="piece editTarget">
              
              <textEdit :index="json.banner1_title.index" :name="json.banner1_title.name" :contentId="0" :content="json.banner1_title.content0" 
              :textStyle="json.banner1_title.custom.style"></textEdit>
              <textEdit :index="json.banner1_subtTitle.index" :name="json.banner1_subtTitle.name" :contentId="0" :content="json.banner1_subtTitle.content0" 
              :textStyle="json.banner1_subtTitle.custom.style"></textEdit>
              
              <div class="ad editTarget" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name" 
                :style="{ backgroundImage: 'url(' + $util.path( $store.state.resPath, json.banner.src.path ) +')' }"></div>
            </div>
            <div id="piece2" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name"
              :style="'background-image: url(' + $util.path( $store.state.resPath, json.banner.src.path3 ) +');' " class="piece editTarget">
              <textEdit :index="json.banner2_title.index" :name="json.banner2_title.name" :contentId="0" :content="json.banner2_title.content0" 
              :textStyle="json.banner2_title.custom.style"></textEdit>
              <textEdit :index="json.banner2_subtTitle.index" :name="json.banner2_subtTitle.name" :contentId="0" :content="json.banner2_subtTitle.content0" 
              :textStyle="json.banner2_subtTitle.custom.style"></textEdit>

              <div class="ad editTarget" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name" 
                :style="{ backgroundImage: 'url(' + $util.path( $store.state.resPath, json.banner.src.path1 ) +')' }"></div>
            </div>
            <div id="piece3" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name" 
              :style="'background-image: url(' + $util.path( $store.state.resPath, json.banner.src.path3 ) +');' " class="piece editTarget">
              <textEdit :index="json.banner3_title.index" :name="json.banner3_title.name" :contentId="0" :content="json.banner3_title.content0" 
              :textStyle="json.banner3_title.custom.style"></textEdit>
              <textEdit :index="json.banner3_subtTitle.index" :name="json.banner3_subtTitle.name" :contentId="0" :content="json.banner3_subtTitle.content0" 
              :textStyle="json.banner3_subtTitle.custom.style"></textEdit>
              
              <div class="ad editTarget" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name" 
                :style="{ backgroundImage: 'url(' + $util.path( $store.state.resPath, json.banner.src.path2 ) +')' }"></div>
            </div>
            <div id="piece4" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name"
               :style="'background-image: url(' + $util.path( $store.state.resPath, json.banner.src.path3 ) +');' "  class="piece editTarget">
              <textEdit :index="json.banner1_title.index" :name="json.banner1_title.name" :contentId="0" :content="json.banner1_title.content0" 
              :textStyle="json.banner1_title.custom.style"></textEdit>
              <textEdit :index="json.banner1_subtTitle.index" :name="json.banner1_subtTitle.name" :contentId="0" :content="json.banner1_subtTitle.content0" 
              :textStyle="json.banner1_subtTitle.custom.style"></textEdit>
              
              <div class="ad editTarget" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name" 
                :style="{ backgroundImage: 'url(' + $util.path( $store.state.resPath, json.banner.src.path ) +')' }"></div>
            </div>
            <div id="piece5" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name"
              :style="'background-image: url(' + $util.path( $store.state.resPath, json.banner.src.path3 ) +');' "  class="piece editTarget">
              <textEdit :index="json.banner2_title.index" :name="json.banner2_title.name" :contentId="0" :content="json.banner2_title.content0" 
              :textStyle="json.banner2_title.custom.style"></textEdit>
              <textEdit :index="json.banner2_subtTitle.index" :name="json.banner2_subtTitle.name" :contentId="0" :content="json.banner2_subtTitle.content0" 
              :textStyle="json.banner2_subtTitle.custom.style"></textEdit>
              
              <div class="ad editTarget" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name" 
                :style="{ backgroundImage: 'url(' + $util.path( $store.state.resPath, json.banner.src.path1 ) +')' }"></div>
            </div>
            <div id="piece6" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name"
               :style="'background-image: url(' + $util.path( $store.state.resPath, json.banner.src.path3 ) +');' "  class="piece editTarget">
              <textEdit :index="json.banner3_title.index" :name="json.banner3_title.name" :contentId="0" :content="json.banner3_title.content0" 
              :textStyle="json.banner3_title.custom.style"></textEdit>
              <textEdit :index="json.banner3_subtTitle.index" :name="json.banner3_subtTitle.name" :contentId="0" :content="json.banner3_subtTitle.content0" 
              :textStyle="json.banner3_subtTitle.custom.style"></textEdit>
              
              <div class="ad editTarget" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name" 
                :style="{ backgroundImage: 'url(' + $util.path( $store.state.resPath, json.banner.src.path2 ) +')' }"></div>
            </div>
            <div id="piece7" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name"
             :style="'background-image: url(' + $util.path( $store.state.resPath, json.banner.src.path3 ) +');' "  class="piece editTarget">
              <textEdit :index="json.banner1_title.index" :name="json.banner1_title.name" :contentId="0" :content="json.banner1_title.content0" 
              :textStyle="json.banner1_title.custom.style"></textEdit>
              <textEdit :index="json.banner1_subtTitle.index" :name="json.banner1_subtTitle.name" :contentId="0" :content="json.banner1_subtTitle.content0" 
              :textStyle="json.banner1_subtTitle.custom.style"></textEdit>
              
              <div class="ad editTarget" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name" 
                :style="{ backgroundImage: 'url(' + $util.path( $store.state.resPath, json.banner.src.path ) +')' }"></div>
            </div>
            <div id="piece8" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name"
               :style="'background-image: url(' + $util.path( $store.state.resPath, json.banner.src.path3 ) +');' "  class="piece editTarget">
              <textEdit :index="json.banner2_title.index" :name="json.banner2_title.name" :contentId="0" :content="json.banner2_title.content0" 
              :textStyle="json.banner2_title.custom.style"></textEdit>
              <textEdit :index="json.banner2_subtTitle.index" :name="json.banner2_subtTitle.name" :contentId="0" :content="json.banner2_subtTitle.content0" 
              :textStyle="json.banner2_subtTitle.custom.style"></textEdit>
              
              <div class="ad editTarget" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name" 
                :style="{ backgroundImage: 'url(' + $util.path( $store.state.resPath, json.banner.src.path1 ) +')' }"></div>
            </div>
            <div id="piece9" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name"
              :style="'background-image: url(' + $util.path( $store.state.resPath, json.banner.src.path3 ) +');' "  class="piece editTarget">
              <textEdit :index="json.banner3_title.index" :name="json.banner3_title.name" :contentId="0" :content="json.banner3_title.content0" 
              :textStyle="json.banner3_title.custom.style"></textEdit>
              <textEdit :index="json.banner3_subtTitle.index" :name="json.banner3_subtTitle.name" :contentId="0" :content="json.banner3_subtTitle.content0" 
              :textStyle="json.banner3_subtTitle.custom.style"></textEdit>
              
              <div class="ad editTarget" data-type="P_BANNER" :data-index="json.banner.index" :data-name="json.banner.name" 
                :style="{ backgroundImage: 'url(' + $util.path( $store.state.resPath, json.banner.src.path2 ) +')' }"></div>
            </div>
          </div>
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
  props: ["json"],
  components: {
    textEdit
  },
  created() {
  },
  methods: {
    $: function(selector) {
        return window.document.querySelector(selector);
    },
    $$: function(selector) {
        return window.document.querySelectorAll(selector);
    },
    transform: function(element, value, key) {
      key = key || "Transform";
			["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
				element.style[prefix + key] = value;	
			});	
			
			return element;
    }
  },
  mounted() {
    var that = this,
    configW = 577,
    arrayPic = [1, 2, 3, 4, 5, 6, 7, 8, 9], rotate = 360 / arrayPic.length,
    eleStage = that.$("#stage"), eleContainer = that.$("#container"), indexPiece = 0,
    elePics = that.$$(".piece"), transZ = (configW/2) / Math.tan((rotate / 2 / 180) * Math.PI)

    arrayPic.forEach(function(i, j) {
      that.transform(that.$("#piece" + i), "rotateY("+ j * rotate +"deg) translateZ("+ (transZ + 10)/2 +"px)");	
    });

    setInterval( function () {
      that.transform(eleContainer, "rotateY("+ (-1 * rotate * ++indexPiece) +"deg)");	
    }, 2000);
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
.ad {
  position: absolute;
  width: to(174);
  height: to(120);
  background-size: cover;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  -webkit-transform: translate3d(-50%);
}
.z1 {
  z-index: 1;
}
.banner {
  width: to(750);
  height: to(360);
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  margin-top: to(-100);
  .title {
    width: 100%;
    height: to(144);
    background-size: auto to(144);
    background-repeat: no-repeat;
    background-position: center top;
  }
}
#stage {
  position: absolute;
  top: to(-280);
  left: 50%;
  transform: translateX( -50% );
  -webkit-transform: translateX( -50% );
  width: to(750);
  min-height: to(100);
  margin-left: auto;
  margin-right: auto;
  -webkit-perspective: to(1200);
  -moz-perspective: to(1200);
  perspective: to(12000);
  -webkit-transition: top .5s;
  transition: top .5s;
  -webkit-perspective-origin: 50% -7000%;
  perspective-origin: 50% -7000%;

  .container {
    width: to(577);
    height: to(100);
    -webkit-transition: -webkit-transform 1s;
    -moz-transition: -moz-transform 1s;
    transition: transform 1s;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    position: absolute;
    left: 50%;
    margin-left: to(-288.5);    
    .piece {
      width: to(577);
      height: to(202.4);
      background-size: 100% 100%;
      -webkit-transition: opacity 1s, -webkit-transform 1s;
      -moz-transition: opacity 1s, -moz-transform 1s;
      transition: opacity 1s, transform 1s;
      position: absolute;
      bottom: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
  }

  .show{padding-bottom:20px;}
  .show h5{font-size:13px; line-height:20px; padding:10px 0 2px 2px; margin:0 0 0 8px;}
  .demo{padding:10px; *zoom:1;}
  .demo:after{display:table; content:""; clear:both;}
  .demo .remind{color:gray;font-size:12px}
  pre{font:14px/1.3 Consolas, Monaco, monospace;padding:5px 10px;margin:0;white-space:pre-wrap;word-wrap:break-word}
}
</style>
