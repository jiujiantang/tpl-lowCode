<template>
  <btnEdit :type="$store.state.originalJson[4].mark.custom.type" :moduleBgType="$store.state.originalJson[4].mark.custom.moduleBgType" :path="$util.path( $store.state.resPath, $store.state.originalJson[4].mark.src.path )" :index="4" :name="$store.state.originalJson[4].mark.name" :contentId="0" :textStyle="$store.state.originalJson[4].mark.custom.style" :content="$store.state.originalJson[4].mark.content0"></btnEdit>
</template>
<script>
/**
 * 观影指南（模板）-黏底按钮（模块）
 * @date:19-11
 */
import textEdit from '../textEdit.vue'
import btnEdit from '../btnEdit.vue'

export default {
  data() {
    return {
    }
  },
  props: [],
  components: {
    textEdit,
    btnEdit
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
.stickyBtn {
  width: to(710);
  height: to(124);
  overflow: hidden;
  margin: 0 auto;
  margin-top: to(2);
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
