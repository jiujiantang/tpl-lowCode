<template>
    <div class="flv">
        <div class="h5maker_form_item">
            <div class="label">标题内容</div>
            <div class="h5maker_input_box">
                <input type="text" class="h5maker_input" v-model="data.value" @input="changeValue('value')" />
            </div>
        </div>
        <div class="h5maker_form_item">
            <div class="label">字体颜色 {{ data.styles.color }}</div>
            <div class="h5maker_input_box">
                <input type="text" class="h5maker_input" v-model="data.styles.color" @input="changeValue('styles.color')" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
const props = defineProps(["data", "onChange"]);
// const value = ref(data.value);
function changeValue(key) {
    props.onChange(key, props.data[key]);
}
</script>
