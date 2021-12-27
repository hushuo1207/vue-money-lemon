<template>
        <label class="notes">
            <!-- <Icon name= 'add' /> -->
            <!-- <span class="name">{{fileName}}:</span> -->
            <template v-if="type === 'date'">
                <input  :type="type || 'text'"
                    :placeholder="placeholder"
                    :value="x(value)"
                    @input="onValueChanged($event.target.value)">
            </template>
            <template v-else>
                <input  :type="type || 'text'"
                    :placeholder="placeholder"
                    :value="value"
                    @input="onValueChanged($event.target.value)">
            </template>
        </label>
            
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";
// import Icon from "../Icon.vue";

@Component
export default class NotesTest extends Vue {

    @Prop({default: ''}) readonly value!: string;
    // @Prop({required: true}) fileName!: string;
    @Prop() placeholder?: string;
    @Prop() type?: string;

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
    .icon{
        width: 12px;
        height: 12px;
    }
    font-size: 14px;
    display: flex;
    padding-left: 4px;
    align-items: center;
    .name{
        padding-right: 4px;

    }
    input{
        height: 40px;
        // flex-grow: 1;
        background: transparent;
        border: none;
        // padding-right: 16px;
    }
    // input[type="date"]::-webkit-inner-spin-button,input[type="date"]::-webkit-calendar-picker-indicator {
    //           display: none;
    //           -webkit-appearance: none;
    // }
}
</style>