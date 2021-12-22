<template>
    <div>
        <ul class="types">
            <li :class="value === '-' && 'selected'"
              @click="selectType('-')">支出</li>
            <li :class="value === '+' && 'selected'"
              @click="selectType('+')">收入</li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";

@Component
export default class Types extends Vue {

    @Prop() readonly value!: string ;


    //type = '-'与money中的元素统一  //'_'表示支出'+'表示收入 

    selectType (type: string) {//type只能是’-‘和’+‘中的一个
        if (type != '-' && type != '+'){
            throw new Error('Type is unkown!');
        }
        //this.type = type;
         this.$emit('update:value', type);


    }
    // @Watch('type')
    // onTypeChanged(value: string){
    //     this.$emit('update:value', value);
    // }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.types{
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;
    > li{
        width: 50%;
        line-height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &.selected::after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #333;
        }
        
    }
}
</style>