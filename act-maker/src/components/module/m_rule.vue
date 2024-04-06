<template>
    <div class="rule">
      <!-- 按钮 B! -->
      <div :class="'ruleBtn editTarget z1 slow infinite animated '+ (json.ruleBtn.custom.animate == 0 ? 'swing' 
        : (json.ruleBtn.custom.animate == 1 ? 'pulse' : 'tada') )" 
        data-type="BG_IMG" :data-index="json.ruleBtn.index" :data-name="json.ruleBtn.name" 
        :style="{
          backgroundImage: 'url('+ $util.path( $store.state.resPath, json.ruleBtn.src.path ) +')',
          width: $util.toIphoneX(json.ruleBtn.custom.style.width),
          height: $util.toIphoneX(json.ruleBtn.custom.style.height),
          top: $util.toIphoneX(json.ruleBtn.custom.style.top),
          left: $util.toIphoneX(json.ruleBtn.custom.style.left)
        }" >
      </div>
    </div>
</template>
<script>
/**
 * 企明星（模板）- 福利票券（模块）
 * @date:19-12
 */
import textEdit from '../textEdit.vue'
export default {
  data() {
    return {
    }
  },
  props: ["json"],
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
    $: function(selector) {
        return window.document.querySelector(selector);
    },
    $$: function(selector) {
        return window.document.querySelectorAll(selector);
    }
  },
  mounted() {
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
.mask {
  width: 100%;
  height: 100%;
}
.hide {
  display: none;
}
.blank {
  height: to(10);
}
.rule {
  width: 100%;
  height: 100%;
  .ruleBtn {
    position: absolute;
    background-size: 100% 100%;
  }
}
</style>