<template>
    <div class="nav z1">
      <btnEdit :type="$store.state.originalJson[5].navigation.custom.type" :moduleBgType="$store.state.originalJson[5].navigation.custom.moduleBgType" :path="$util.path( $store.state.resPath, $store.state.originalJson[5].navigation.src.path )" :index="5" :name="$store.state.originalJson[5].navigation.name" :contentId="0" :textStyle="$store.state.originalJson[5].navigation.custom.style" :content="$store.state.originalJson[5].navigation.content0"></btnEdit>
    </div>
</template>
<script>
/**
 * 观影指南（模板）-底部广告（模块）
 * @date:19-11
 */
import btnEdit from '../btnEdit.vue'
export default {
  data() {
    return {
    }
  },
  props: [],
  components: {
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
.nav {
  width: to(366);
  height: to(70);
  margin: 0 auto;
}
</style>
