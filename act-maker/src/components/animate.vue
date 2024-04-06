<template>
  <div class="control-group">
    <h2 class="mx-subtitle"><span class="mx-maroon">*</span>按钮动画效果<span class="help-inline"></span></h2>
    <div class="">
        <select name="animateType" class="span2" data-editable="false" v-model="currValue" @change="updataValue">
            <option value="0">swing</option>
            <option value="1">pulse</option>
            <option value="2">tada</option>
            <option value="-1">没有动效</option>
        </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 当前动画效果
    value: {
    required: true
    }
  },
  data () {
    return {
      currValue: this.value
    }
  },
  watch: {
    value: {
      handler(newVal){
        this.currValue = newVal
      }
    }
  },
  computed: {
      
  },
  methods: {
    // 更新组件的值 currValue
    updataValue () {
      this.$emit('input', this.currValue)
      this.$emit('change', this.currValue)
    }
  },
  mounted () {
  }
};
</script>

<style lang="scss" scoped>
.mx-subtitle {font-size: 14px;font-weight: normal;color: #565656;height: 40px !important;line-height: 40px !important;}
input, select {border-width: 1px;color: #858585;border: 1px solid #cccccc;padding: 10px 25px 10px 10px;vertical-align: top;}
select {height: 40px;}
</style>
