<template>
  <div :class="name + ' editTarget picEdit low infinite animated '+ (animate && animate == 0 ? 'swing' 
        :(animate == 1 ? 'pulse' : (animate == 2 ? 'tada' : '') )) " 
        :data-name="name" :data-index="index" :data-type="type" :style='{
    width: $util.toIphoneX(picStyle.width),
    height: $util.toIphoneX(picStyle.height),
    top: $util.toIphoneX(picStyle.top),
    left: $util.toIphoneX(picStyle.left),
    backgroundColor: backgroundColor,
    backgroundImage: backgroundImage
  }' >
  
  <textEdit v-for="(item, i) in textArrbtn" :key="'info1'+i" v-show="$util.thanStstus(item.custom.status, coupon.custom.status)" :index="item.index" 
    :name="item.name" 
    :contentId="0" 
    :content="item.content0" 
    :textStyle="item.custom.style" ></textEdit>

  </div>
</template>

<script>
/**
 * 观影指南（模板）-底部广告（模块）
 * @date:19-12
 */
import textEdit from './textEdit.vue'
export default {
  data () {
      return {
        
      }
  },
  props: ['name', 'index', 'type', 'picStyle', 'backgroundColor', 'backgroundImage', "coupon", "textArrbtn", "animate"],
  watch: {
   
  },
  components: {
    textEdit
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
.picEdit {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-size: 100% 100%;
}
</style>
