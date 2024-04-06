<template>
  <div :class="name + ' style' + (Number(type) + 1) + ' btnEdit editTarget z1'" :data-index="index" data-type="NAVIGATION" :data-name="name" :data-contentId="contentId" :style='{
    width: textStyle.width,
    height: textStyle.height + "px",
    lineHeight: textStyle.lineHeight + "px",
    fontSize: textStyle.fontSize + "px",
    color: textStyle.color,
    background: (moduleBgType == 0) ? ((type == 3 || type == 4 || type == 5) ? "none" : textStyle.background) : ("url(" + path + ")"),
    borderColor: textStyle.background ,
    borderWidth: (moduleBgType == 0) ? (textStyle.borderWidth + "px") : "0px",
    textAlign: textStyle.textAlign,
    fontWeight: textStyle.fontWeight,
    top: textStyle.top,
    left: textStyle.left,
    letterSpacing: textStyle.letterSpacing,
    transform: textStyle.transform,
    "-webkit-transform": textStyle.transform,
    borderRadius: textStyle.borderRadius,
    "-webkit-borderRadius": textStyle.borderRadius
  }' >{{content}}</div>
</template>

<script>
/**
 * 观影指南（模板）-底部广告（模块）
 * @date:19-11
 */
export default {
  data () {
      return {
      
      }
  },
  props: ['type', 'moduleBgType', 'path', 'index', 'name', 'contentId', 'textStyle', 'content'],
  watch: {
    textStyle( val ){
      this.textStyle = val
    }
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
.btnEdit {
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
}
.style2 {
    border-radius: to(10);
    -webkit-border-radius: to(10);
}
.style3 {
    border-radius: to(35);
    -webkit-border-radius: to(35);
}
.style4 {
    border-style: dashed;
}
.style5 {
    border-style: solid;
    border-radius: to(10);
    -webkit-border-radius: to(10);
}
.style6 {
    border-style: dotted;
    border-radius: to(35);
    -webkit-border-radius: to(35);
}
</style>
