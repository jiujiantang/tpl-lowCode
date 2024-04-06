<template>
  <div :class="name + ' editTarget textEdit'" data-type="P_WORD" :data-index="index" :data-name="name" :data-defaultColor="textStyle.color" :data-contentId="contentId" :style='{
    width: $util.toIphoneX(textStyle.width),
    height: $util.toIphoneX(textStyle.height),
    lineHeight: $util.toIphoneX(textStyle.lineHeight),
    fontSize: $util.toIphoneX(textStyle.fontSize),
    color: textStyle.color,
    background: textStyle.background,
    textAlign: textStyle.textAlign,
    fontWeight: textStyle.fontWeight,
    paddingLeft: $util.toIphoneX(textStyle.paddingLeft),
    paddingRight: $util.toIphoneX(textStyle.paddingRight),
    top: $util.toIphoneX(textStyle.top),
    left: $util.toIphoneX(textStyle.left),
    letterSpacing: $util.toIphoneX(textStyle.letterSpacing),
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
  props: ['index', 'name', 'contentId', 'content', 'textStyle'],
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
.textEdit {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  box-sizing: border-box;
  word-break: break-all;
}
</style>
