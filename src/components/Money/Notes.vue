<template>
    <label class="notes">
        <input  :class="{[classPrefix+'-tabs']: classPrefix}"
            :placeholder="placeholder"
            :value="value"
            @input="onValueChanged($event.target.value)">
    </label>
            
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
// import Icon from "../Icon.vue";

@Component
export default class Notes extends Vue {

    @Prop({default: ''}) readonly value!: string;
    // @Prop({required: true}) fileName!: string;
    @Prop() placeholder?: string;
    // @Prop() type?: string;
    @Prop() readonly classPrefix!: string ;
    x(isoString: string){
        return dayjs(isoString).format('YYYY-MM-DD');
    }

    // @Watch('value')
    onValueChanged(value: string){
        this.$emit('update:value', value);
    }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.notes{

    font-size: 14px;
    display: flex;
    // padding-left: 4px;
    align-items: center;
    input{
        // height: 40px;
        // flex-grow: 1;
        background: transparent;
        border: none;
        // border: 1px solid red;
        // padding-right: 16px;
    }
    // input[type="date"]::-webkit-inner-spin-button,input[type="date"]::-webkit-calendar-picker-indicator {
    //           display: none;
    //           -webkit-appearance: none;
    // }
}
</style>